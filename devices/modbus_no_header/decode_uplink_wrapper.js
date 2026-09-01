driver.decodeUplinkInter = driver.decodeUplink;

function decodeUplink(input) {
    var output = driver.decodeUplinkInter(input);

    if (output.errors) {
        return output;
    }

    return driver.decodeModbusWithoutHeader(input, output);
}

driver.decodeUplink = decodeUplink;
(typeof globalThis !== "undefined" ? globalThis : this).decodeUplink = decodeUplink;