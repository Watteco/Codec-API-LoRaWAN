const { execSync } = require("child_process");

const dependencies = [
    "webpack",
    "webpack-cli",
    "jest",
    "@babel/plugin-transform-object-assign",
    "@babel/core",
    "@babel/cli",
    "@babel/preset-env",
    "terser",
    "deasync"
];

const command = `npm --prefix .. install --save-dev ${dependencies.join(" ")}`;

console.log("Running:", command);

try {
    execSync(command, { stdio: "inherit" });
    console.log("Dependencies installed successfully!");
} catch (error) {
    console.error("Error installing dependencies:", error.message);
}