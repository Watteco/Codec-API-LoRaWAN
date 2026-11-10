const fs = require("fs");
const path = require("path");
const vm = require("vm");

const codec = require("../../codec/decode_uplink.js");
const tools = require("../../utilities/_CommonTools.js");

function evaluateWrapper(wrapper) {
    const context = {};
    vm.createContext(context);
    vm.runInContext(`
        var driver = {
            decodeUplink: function (input) {
                return { data: { value: input.value }, warnings: [] };
            },
            decodeModbusWithoutHeader: function (_input, output) {
                return output;
            }
        };
        this.decodeUplink = driver.decodeUplink;
        ${wrapper}
    `, context);
    return context;
}

describe("ChirpStack regressions", () => {
    it.each([
        ["missing input", undefined],
        ["empty byte array", { bytes: [], fPort: 125 }],
        ["empty hexadecimal string", { bytes: "", fPort: 125 }],
        ["LoRaWAN port 0", { bytes: [1, 2, 3], fPort: 0 }],
    ])("ignores %s", (_description, input) => {
        expect(codec.watteco_decodeUplink(input, [], {}, {})).toStrictEqual({
            data: {},
            warnings: [],
        });
    });

    it("installs the default readable wrapper in a global-script context", () => {
        const context = evaluateWrapper(tools.DEFAULT_DECODE_UPLINK_WRAPPER);

        expect(context.decodeUplink).toBe(context.driver.decodeUplink);
        expect(context.decodeUplink).not.toBe(context.driver.decodeUplinkInter);
        expect(context.decodeUplink({ value: 42 }).data.value).toBe(42);
    });

    it.each([
        "modbus_leaf'o",
        "modbus_no_header",
        "modbus_soil'o",
    ])("installs the %s wrapper in a global-script context", (device) => {
        const wrapperPath = path.resolve(
            __dirname,
            "..",
            device,
            "decode_uplink_wrapper.js"
        );
        const context = evaluateWrapper(fs.readFileSync(wrapperPath, "utf8"));

        expect(context.decodeUplink).toBe(context.driver.decodeUplink);
        expect(context.decodeUplink).not.toBe(context.driver.decodeUplinkInter);
    });
});
