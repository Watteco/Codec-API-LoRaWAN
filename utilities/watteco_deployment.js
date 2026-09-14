/**
 * Publish rebuilt device artifacts from devices/ to distrib/.
 *
 * Usage:
 *   node watteco_deployment.js <watteco_path> [devices_filter] [--force-version] [--yes]
 *
 * The current Git HEAD is the source commit recorded in each generated
 * distrib/<device>/manifest.json. To keep that reference meaningful, the
 * repository must be clean before publication.
 */

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { execFileSync } = require("child_process");
const tools = require("./_CommonTools.js");

const MANIFEST_FILE = "manifest.json";

function runGit(repositoryPath, args) {
  return execFileSync("git", ["-C", repositoryPath, ...args], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

function normalizeRepositoryUrl(repositoryUrl) {
  if (!repositoryUrl) return null;

  let normalized = repositoryUrl.trim();
  const githubSshMatch = normalized.match(/^git@github\.com:(.+)$/);
  if (githubSshMatch) normalized = `https://github.com/${githubSshMatch[1]}`;

  return normalized.replace(/\.git$/, "");
}

function getSourceInformation(repositoryPath) {
  const repositoryRoot = path.resolve(runGit(repositoryPath, ["rev-parse", "--show-toplevel"]));
  const requestedRoot = path.resolve(repositoryPath);

  if (repositoryRoot !== requestedRoot) {
    throw new Error(
      `Watteco path must be the repository root. Expected '${repositoryRoot}', got '${requestedRoot}'.`
    );
  }

  const dirtyFiles = runGit(repositoryRoot, ["status", "--porcelain", "--untracked-files=all"]);
  if (dirtyFiles) {
    throw new Error(
      "The repository contains uncommitted files. Rebuild and commit the sources and generated main.js files before publishing:\n" +
      dirtyFiles
    );
  }

  const commit = runGit(repositoryRoot, ["rev-parse", "HEAD"]);
  let repository = null;
  try {
    repository = normalizeRepositoryUrl(runGit(repositoryRoot, ["remote", "get-url", "origin"]));
  } catch (_) {
    // A local repository without an origin remains deployable; the commit is authoritative.
  }

  return { commit, repository };
}

function compareSemanticVersions(candidateVersion, publishedVersion) {
  const versionPattern = /^(\d+)\.(\d+)\.(\d+)$/;
  const candidateMatch = String(candidateVersion).match(versionPattern);
  const publishedMatch = String(publishedVersion).match(versionPattern);

  if (!candidateMatch) {
    throw new Error(`Invalid candidate version '${candidateVersion}'. Expected major.minor.patch.`);
  }
  if (!publishedMatch) {
    throw new Error(`Invalid published version '${publishedVersion}'. Expected major.minor.patch.`);
  }

  for (let index = 1; index <= 3; index++) {
    const difference = Number(candidateMatch[index]) - Number(publishedMatch[index]);
    if (difference !== 0) return Math.sign(difference);
  }

  return 0;
}

function readDeviceIdentity(wattecoPath, distribPath, device, forceVersion = false) {
  const packagePath = path.join(wattecoPath, "devices", device, "package.json");
  if (!fs.existsSync(packagePath)) {
    throw new Error(`Missing package.json for ${device}: ${packagePath}`);
  }

  const packageData = JSON.parse(fs.readFileSync(packagePath, "utf8"));
  if (!packageData.version) {
    throw new Error(`Missing version in ${packagePath}`);
  }

  const metadataPath = path.join(wattecoPath, "devices", device, "metadata.json");
  let metadata = {};
  if (fs.existsSync(metadataPath)) {
    metadata = JSON.parse(fs.readFileSync(metadataPath, "utf8"));
  }

  const previousManifestPath = path.join(distribPath, device, MANIFEST_FILE);
  let previousVersion = null;
  if (fs.existsSync(previousManifestPath)) {
    try {
      previousVersion = JSON.parse(fs.readFileSync(previousManifestPath, "utf8")).version || null;
    } catch (error) {
      throw new Error(`Cannot read existing manifest for ${device}: ${error.message}`);
    }
  } else {
    const previousMetadataPath = path.join(distribPath, device, "metadata.json");
    if (fs.existsSync(previousMetadataPath)) {
      previousVersion = JSON.parse(fs.readFileSync(previousMetadataPath, "utf8")).version || null;
    }
  }

  if (previousVersion !== null) {
    const versionComparison = compareSemanticVersions(packageData.version, previousVersion);
    if (versionComparison === 0 && !forceVersion) {
      throw new Error(
        `${device} version ${packageData.version} is already published. Published versions are immutable; rebuild with a newer version or use --force-version as an exceptional override.`
      );
    }
    if (versionComparison < 0 && !forceVersion) {
      throw new Error(
        `${device} version ${packageData.version} is older than published version ${previousVersion}. Rebuild with a newer version or use --force-version as an exceptional override.`
      );
    }
  }

  return {
    name: packageData.displayName || metadata.name || device,
    version: packageData.version,
    description: metadata.description || packageData.description || `Driver for ${device} sensor`,
    previousVersion,
    versionOverride: previousVersion !== null &&
      compareSemanticVersions(packageData.version, previousVersion) <= 0,
  };
}

function confirmPublication(message) {
  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    return Promise.reject(new Error("Interactive confirmation is unavailable. Use --yes for an automated run."));
  }

  const terminal = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    terminal.question(`${message} [y/N] `, (answer) => {
      terminal.close();
      resolve(/^y(?:es)?$/i.test(answer.trim()));
    });
  });
}

function sha256(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function copyRequiredFile(sourcePath, destinationPath) {
  if (!fs.existsSync(sourcePath)) throw new Error(`Required file not found: ${sourcePath}`);
  fs.copyFileSync(sourcePath, destinationPath);
}

function copyOptionalFile(sourcePath, destinationPath, label) {
  if (!fs.existsSync(sourcePath)) {
    console.log(`  - No ${label} found`);
    return false;
  }

  fs.copyFileSync(sourcePath, destinationPath);
  console.log(`  - Copied ${label}: ${path.basename(destinationPath)}`);
  return true;
}

function copyAndDeployFiles(wattecoPath, distribPath, devices) {
  for (const device of devices) {
    const devicePath = path.join(wattecoPath, "devices", device);
    const distribDevicePath = path.join(distribPath, device);
    fs.mkdirSync(distribDevicePath, { recursive: true });

    console.log(`Processing ${device} ...`);

    copyRequiredFile(path.join(devicePath, "main.js"), path.join(distribDevicePath, "main.js"));
    copyOptionalFile(
      path.join(devicePath, "main-thingsboard.js"),
      path.join(distribDevicePath, "main-thingsboard.js"),
      "ThingsBoard main file"
    );
    copyRequiredFile(path.join(devicePath, "examples.json"), path.join(distribDevicePath, "examples.json"));
    copyRequiredFile(
      path.join(devicePath, "uplink.schema.json"),
      path.join(distribDevicePath, "uplink.schema.json")
    );

    const metadataSource = path.join(devicePath, "metadata.json");
    const metadataDestination = path.join(distribDevicePath, "metadata.json");
    if (copyOptionalFile(metadataSource, metadataDestination, "metadata file")) {
      tools.updateJSON_name_description(metadataDestination, device, `Driver for ${device} sensor`);
    }

    const multitechFileName = `${device.replace(/'/g, "")}-multitechBacnet-definition.json`;
    copyOptionalFile(
      path.join(devicePath, multitechFileName),
      path.join(distribDevicePath, multitechFileName),
      "Multitech BACnet definition"
    );

    const milesightFileName = `${device.replace(/'/g, "")}-milesight-object-mapping.json`;
    copyOptionalFile(
      path.join(devicePath, milesightFileName),
      path.join(distribDevicePath, milesightFileName),
      "Milesight object mapping"
    );
  }
}

function generateManifest(wattecoPath, distribPath, device, identity, source) {
  const distribDevicePath = path.join(distribPath, device);
  const artifacts = {};

  const thingsboardFilename = "main-thingsboard.js";
  const thingsboardPath = path.join(distribDevicePath, thingsboardFilename);
  const expectedThingsboardHeader = `/*${device} v${identity.version}*/`;
  const includeThingsboard = !fs.existsSync(thingsboardPath) ||
    fs.readFileSync(thingsboardPath, "utf8").startsWith(expectedThingsboardHeader);

  if (fs.existsSync(thingsboardPath) && !includeThingsboard) {
    console.log(
      `  - Excluded ${thingsboardFilename} from ${MANIFEST_FILE}: it was not rebuilt for version ${identity.version}`
    );
  }

  const artifactFiles = fs.readdirSync(distribDevicePath, { withFileTypes: true })
    .filter((entry) =>
      entry.isFile() &&
      entry.name !== MANIFEST_FILE &&
      (entry.name !== thingsboardFilename || includeThingsboard)
    )
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right));

  for (const filename of artifactFiles) {
    const artifactPath = path.join(distribDevicePath, filename);
    artifacts[filename] = {
      sha256: sha256(artifactPath),
      size: fs.statSync(artifactPath).size,
    };
  }

  const sourceMainPath = path.join(wattecoPath, "devices", device, "main.js");
  if (!artifacts["main.js"] || sha256(sourceMainPath) !== artifacts["main.js"].sha256) {
    throw new Error(`Published main.js for ${device} differs from the main.js in source commit ${source.commit}.`);
  }

  const manifest = {
    schemaVersion: 1,
    name: identity.name,
    version: identity.version,
    description: identity.description,
    source: {
      repository: source.repository,
      commit: source.commit,
      path: `devices/${device}`,
    },
    artifacts,
  };

  if (!manifest.source.repository) delete manifest.source.repository;

  const manifestPath = path.join(distribDevicePath, MANIFEST_FILE);
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  console.log(`  - Generated ${path.relative(wattecoPath, manifestPath)}`);

  const writtenManifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  for (const [filename, expected] of Object.entries(writtenManifest.artifacts)) {
    const artifactPath = path.join(distribDevicePath, filename);
    if (!fs.existsSync(artifactPath) || sha256(artifactPath) !== expected.sha256) {
      throw new Error(`Integrity verification failed for ${device}/${filename}`);
    }
  }
}

function parseArguments(argv) {
  const assumeYes = argv.includes("--yes") || argv.includes("-y");
  const forceVersion = argv.includes("--force-version");
  const positional = argv.filter((argument) =>
    argument !== "--yes" && argument !== "-y" && argument !== "--force-version"
  );

  if (!positional[0]) {
    throw new Error(
      "Usage: node watteco_deployment.js <watteco_path> [devices_filter] [--force-version] [--yes]"
    );
  }

  return {
    wattecoPath: path.resolve(positional[0]),
    sensorFilter: positional[1],
    assumeYes,
    forceVersion,
  };
}

async function main() {
  const { wattecoPath, sensorFilter, assumeYes, forceVersion } = parseArguments(process.argv.slice(2));
  const distribPath = path.join(wattecoPath, "distrib");
  const { devices } = tools.getDevices(sensorFilter);
  if (devices.length === 0) return;

  const source = getSourceInformation(wattecoPath);
  const identities = new Map(
    devices.map((device) => [
      device,
      readDeviceIdentity(wattecoPath, distribPath, device, forceVersion),
    ])
  );
  const overriddenDevices = devices.filter((device) => identities.get(device).versionOverride);

  console.log(`Watteco path: ${wattecoPath}`);
  console.log(`Distrib path: ${distribPath}`);
  console.log(`Source commit: ${source.commit}`);
  console.log("Devices to publish:");
  for (const device of devices) {
    const identity = identities.get(device);
    const transition = identity.previousVersion
      ? `${identity.previousVersion} -> ${identity.version}`
      : identity.version;
    console.log(`  - ${device}: ${transition}${identity.versionOverride ? " [FORCED]" : ""}`);
  }

  if (overriddenDevices.length > 0) {
    console.warn("WARNING: --force-version is overriding immutable published versions for:");
    for (const device of overriddenDevices) {
      const identity = identities.get(device);
      console.warn(`  - ${device}: ${identity.previousVersion} -> ${identity.version}`);
    }
    console.warn(
      "This is strongly discouraged for an already public release. Use it only for an unpublished correction or manifest migration."
    );
  }

  if (!assumeYes) {
    const confirmationMessage = overriddenDevices.length > 0
      ? "Force this version override and publish to distrib anyway?"
      : "Confirm that rebuild_mains.js was run with the intended version and that the sources and generated main.js files were committed. Publish to distrib?";
    const confirmed = await confirmPublication(confirmationMessage);
    if (!confirmed) {
      console.log("Publication cancelled.");
      return;
    }
  }

  copyAndDeployFiles(wattecoPath, distribPath, devices);

  tools.generateDeviceDriverInfoMarkdown(
    path.join(wattecoPath, "devices"),
    distribPath,
    path.join(distribPath, "DRIVERS.md")
  );

  for (const device of devices) {
    generateManifest(wattecoPath, distribPath, device, identities.get(device), source);
  }

  console.log(`Publication candidate generated from source commit ${source.commit}.`);
  console.log("Review and commit the distrib changes to create the distribution commit.");
}

if (require.main === module) {
  main().catch((error) => {
    console.error(`Deployment failed: ${error.message}`);
    process.exit(1);
  });
}

module.exports = {
  compareSemanticVersions,
  generateManifest,
  getSourceInformation,
  normalizeRepositoryUrl,
  parseArguments,
  readDeviceIdentity,
  sha256,
};
