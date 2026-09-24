let examples = require("./examples.json");
let driver = require("./main.js").driver;

describe("Decode uplink", () => {
    examples.forEach((example) => {
        if (example.type === "uplink") {
            it(example.description, () => {
                const result = driver.decodeUplink({
                    bytes: Buffer.from(example.input.bytes, "hex"),
                    fPort: example.input.fPort,
                    recvTime: example.input.recvTime
                });
                expect(result).toStrictEqual(example.output);
            });
        }
    });
});
