let examples = require("./examples.json");
let driver = require("./modbus_no_header.js");

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