driver.decodeUplinkInter = driver.decodeUplink;

driver.decodeUplink = function (input) {
    var output = driver.decodeUplinkInter(input);

    if (output.errors) {
        return output;
    }

    return driver.decodeModbusWithoutHeader(input, output);
};

(typeof globalThis !== "undefined" ? globalThis : this).decodeUplink = driver.decodeUplink;
