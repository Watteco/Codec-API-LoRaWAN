# English
[→ Français](#français)
## Use

The called function is `DecodeUplink()`:  

```javascript
    DecodeUplink(input){
        return output
    }
```

The `input` object is built like this:  

```javascript
    input:{
        "bytes": [17, 10, 4, 2, 0, 0, 41, 11, 137],  // The frame in a bytes list
        "fPort": 125,                                // The port (Watteco always use 125)
        "recvTime": "2023-07-19T07:51:31.598957793Z" // The date in ISO 8601 format
    }
```

`bytes` is a decimal values list.  
`fPort` is the decimal value of the sender port.  
`recvTime` is the time in a string of the ISO 8601 date format.

The `output` without errors is like this:  

```javascript
    output:{
        data:[{
            "variable": "temperature",
            "value": 29.53,
            "date": "2023-07-19T07:51:31.598957793Z"
        }]
        warning:[]
    }
```

`data` is a formatted objects list ; each object contains the fields `variable`,`value`,`date`.  

`variable` contains a string of the name. [(see *variables*)](#variables)
`value` contains the data value in its corresponding format (uint, int, float, ...).   
`date` is a string in the ISO 8601 date format. It is the input date for standard report or at last input date for batch report.  

`warning` contains the alarms you configured on the reports.  

The `output` with errors is like this:  

```javascript
    output:{
        error:""
        warning:[]
    }
```

As the try/catch method is used, error contains the first error encountered and cut the processing.  

## Npm

If you wish to get the device via npm, you need to do this:

```bash
    npm install <npm-package>
```

Our current packages are: (You can also see [the list on the npm website](https://www.npmjs.com/~watteco))

|             name             | version |
|:----------------------------:|:-------:|
|        watteco-atm_o         |  1.0.0  |
|        watteco-clos_o        |  1.0.0  |
|       watteco-flash_o        |  1.0.0  |
|         watteco-in_o         |  1.0.0  |
|       watteco-inclin_o       |  1.0.0  |
|  watteco-indoor_temperature  |  1.0.0  |
|       watteco-intens_o       |  1.0.0  |
|        watteco-lev_o         |  1.0.0  |
|        watteco-modbus        |  1.0.0  |
|       watteco-monit_o        |  1.0.0  |
|        watteco-move_o        |  1.0.0  |
| watteco-outdoor_temperature  |  1.0.0  |
|      watteco-pilot_wire      |  1.0.0  |
|       watteco-press_o        |  1.0.0  |
|     watteco-pulse_sens_o     |  1.0.0  |
|  watteco-pulse_sens_o_atex   |  1.0.0  |
|  watteco-remote_temperature  |  1.0.0  |
| watteco-remote_temperature_2 |  1.0.0  |
|      watteco-smartplug       |  1.0.0  |
|          watteco-th          |  1.0.3  |
|        watteco-tics_o        |   NP    |
|     watteco-toran_o_atex     |   NP    |
|      watteco-triphas_o       |   NP    |
|        watteco-vaqa_o        |   NP    |
|      watteco-vaqa_o_lt       |   NP    |
|  watteco-vaqa_o_sensor_plus  |  1.0.0  |
|       watteco-ventil_o       |   NP    |  
  

# Using the Watteco codec API with NodeRED (>`1.3.0`)
[→ Français](#utilisation-de-lapi-codec-watteco-avec-nodered-130)

The first step is to set-up a Javascript node to import the module you need via npm.  
You'll find the modules list [here](https://www.npmjs.com/~watteco) or in the table [above](#npm).  
To set that up, add the module in the "Setup" tab of the Javascript node.  

![Setup tab](/sources_readme/wattecoConfNodeRedEn.png)

You will then be able to call it from the node like this:
`moduleName.driver.decodeUplink(input)`  
with the input being in the format:

```javascript
{
    "bytes": [17, 10, 4, 2, 0, 0, 41, 11, 137],  // The frame in a bytes list
    "fPort": 125,                                // The port (Watteco always use 125)
    "recvTime": "2023-07-19T07:51:31.598957793Z" // The date in ISO 8601 format
}
```

You'll find an example of decoding a base64 Vaqa'o+ batch frame below, you can directly import it to NodeRED via the `Import` button in the right menu.

<details>
<summary>Vaqa'o+ NodeRED decoding example</summary>

```json
[
    {
        "id": "40642e89c9349958",
        "type": "tab",
        "label": "Vaqa'o+ decoding example",
        "disabled": false,
        "info": "",
        "env": []
    },
    {
        "id": "6e327578ec437d82",
        "type": "inject",
        "z": "40642e89c9349958",
        "name": "Sample Vaqa'o+ batch base64 frame",
        "props": [
            {
                "p": "payload.data",
                "v": "cAYAAOJ2AJDPwAFbAoQj+wMnKRmATBIcAD68W9aJXwBAAAtotywnoN203IB225IMaLcsGWBbBA==",
                "vt": "str"
            },
            {
                "p": "payload.time",
                "v": "",
                "vt": "date"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "x": 200,
        "y": 100,
        "wires": [
            [
                "adb486ffd01f5a71"
            ]
        ]
    },
    {
        "id": "bcdb552b5eca5eda",
        "type": "debug",
        "z": "40642e89c9349958",
        "name": "Output",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 550,
        "y": 100,
        "wires": []
    },
    {
        "id": "adb486ffd01f5a71",
        "type": "function",
        "z": "40642e89c9349958",
        "name": "decode",
        "func": "// You must import the sensor decoder from npm via the configuration tab above\n// Don't forget to set \"functionExternalModules: true,\" in your \"settings.js\" file\n\nif (msg.payload.data && typeof msg.payload.data === 'string') {\n\n    const buffer = Buffer.from(msg.payload.data, 'base64'); // The frame arrives in base64 in msg.payload.data\n\n    var date = new Date(msg.payload.time); // The date is recuperated from msg.payload.time\n                                          // under any format and is transformed to ISO 8601\n    var inputObject = {\n        \"bytes\": buffer, // The frame in a bytes list\n        \"fPort\": 125,    // The port (Watteco always use 125)\n        \"recvTime\": date // The date in ISO 8601 format\n    }\n\n} else {\n    node.error(\"The message doesn't carry a Base64 frame\");\n    return null;\n}\n\nmsg.payload = wattecoVaqaOSensorPlus.driver.decodeUplink(inputObject);\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [
            {
                "var": "wattecoVaqaOSensorPlus",
                "module": "watteco-vaqa_o_sensor_plus"
            }
        ],
        "x": 420,
        "y": 100,
        "wires": [
            [
                "bcdb552b5eca5eda"
            ]
        ]
    }
]
```

</details>

## Cluster table

|      | atm'o | clos'o | flash'o | in'o | inclin'o | indoor_temperature | intens'o | lev'o | modbus | monit'o | move'o | outdoor_temperature | pilot_wire | press'o | pulse_sens'o_atex | pulse_sens'o | remote_temperature | remote_temperature_2 | smartplug | TH | tics'o | toran'o_atex | triphas'o | vaqa'o_lt | vaqa'o | vaqa'o_plus | ventil'o |
|:----:|:-----:|:------:|:-------:|:----:|:--------:|:------------------:|:--------:|:-----:|:------:|:-------:|:------:|:-------------------:|:----------:|:-------:|:-----------------:|:------------:|:------------------:|:--------------------:|:---------:|:--:|:------:|:------------:|:---------:|:---------:|:------:|:-----------:|:--------:|
| 0000 |   X   |   X    |    X    |  X   |    X     |         X          |    X     |   X   |   X    |    X    |   X    |          X          |     X      |    X    |         X         |      X       |         X          |          X           |     X     | X  |   X    |      X       |     X     |     X     |   X    |      X      |    X     |
| 0006 |       |        |         |  X   |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |     X     |    |        |              |     X     |           |        |             |          |
| 000C |       |        |         |      |    X     |                    |    X     |   X   |        |    X    |        |                     |            |    X    |                   |              |                    |                      |           |    |        |      X       |           |           |        |             |          |
| 000F |   X   |   X    |    X    |  X   |          |                    |          |       |        |         |        |                     |            |    X    |         X         |      X       |                    |                      |           | X  |        |      X       |     X     |     X     |   X    |      X      |    X     |
| 0013 |       |        |         |      |          |                    |          |       |        |         |        |                     |     X      |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
| 0050 |   X   |   X    |    X    |  X   |    X     |         X          |    X     |   X   |   X    |    X    |   X    |          X          |            |    X    |         X         |      X       |         X          |          X           |     X     | X  |   X    |      X       |     X     |     X     |   X    |      X      |    X     |
| 0052 |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |     X     |    |   X    |              |           |           |        |             |          |
| 0053 |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |   X    |              |           |           |        |             |          |
| 0054 |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |   X    |              |           |           |        |             |          |
| 0056 |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |   X    |              |           |           |        |             |          |
| 0057 |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |   X    |              |           |           |        |             |          |
| 0400 |       |        |         |      |          |                    |          |       |        |         |   X    |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |      X      |          |
| 0402 |   X   |        |         |      |          |         X          |          |       |        |         |   X    |          X          |            |         |                   |              |         X          |          X           |           | X  |        |              |           |     X     |   X    |      X      |    X     |
| 0403 |   X   |        |         |      |          |                    |          |       |        |         |   X    |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |   X    |      X      |          |
| 0405 |   X   |        |         |      |          |                    |          |       |        |         |   X    |                     |            |         |                   |              |                    |                      |           | X  |        |              |           |     X     |   X    |      X      |          |
| 0406 |       |        |         |      |    X     |                    |          |       |        |         |   X    |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |      X      |          |
| 8004 |   X   |   X    |    X    |  X   |    X     |         X          |    X     |   X   |   X    |    X    |   X    |          X          |     X      |    X    |         X         |      X       |         X          |          X           |     X     | X  |   X    |      X       |     X     |     X     |   X    |      X      |    X     |
| 8005 |       |        |         |  X   |          |                    |          |       |        |         |        |                     |            |         |         X         |      X       |                    |                      |           |    |        |      X       |           |           |        |             |          |
| 8006 |       |        |         |      |          |                    |          |       |   X    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
| 8007 |       |        |         |      |          |                    |          |       |   X    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
| 8008 |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |    X     |
| 8009 |       |        |         |      |          |                    |          |       |   X    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
| 800A |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     X     |           |        |             |          |
| 800B |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     X     |           |        |             |          |
| 800C |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |     X     |   X    |      X      |          |
| 800D |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     X     |           |        |             |          |
| 800F |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
| 8010 |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     X     |           |        |             |          |
| 8052 |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |     X     |    |        |              |           |           |        |             |          |

## Cluster name
|                name                |  ID  |
|:----------------------------------:|:----:|
|            analog input            | 000C |
|               basic                | 0000 |
|            binary input            | 000F |
|           configuration            | 0050 |
|           concentration            | 800C |
|       differential pressure        | 8008 |
|     energy and power metering      | 800A |
|  energy and power multi metering   | 8010 |
|            illuminance             | 0400 |
|              lorawan               | 8004 |
|        multi binary inputs         | 8005 |
|     multi master/slave answers     | 8009 |
|         multi state output         | 0013 |
|             occupancy              | 0406 |
|               ON/OFF               | 0006 |
|              pressure              | 0403 |
|           power quality            | 8052 |
|         relative humidity          | 0405 |
|          serial interface          | 8006 |
|    serial master/slave protocol    | 8007 |
|        simple metering like        | 0052 |
|            temperature             | 0402 |
|                tic                 |      |
|            volume meter            | 8002 |
|    voltage and current metering    | 800B |
| voltage and current multi metering | 800D |

## Variables
| cluster |                                          |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|:-------:|:----------------------------------------:|:-----:|:------:|:-------:|:----:|:--------:|:------------------:|:--------:|:-----:|:------:|:-------:|:------:|:-------------------:|:----------:|:-------:|:-----------------:|:------------:|:------------------:|:--------------------:|:---------:|:--:|:------:|:------------:|:---------:|:---------:|:------:|:-----------:|:--------:|
|         |                  device                  | atm'o | clos'o | flash'o | in'o | inclin'o | indoor_temperature | intens'o | lev'o | modbus | monit'o | move'o | outdoor_temperature | pilot_wire | press'o | pulse_sens'o_atex | pulse_sens'o | remote_temperature | remote_temperature_2 | smartplug | TH | tics'o | toran'o_atex | triphas'o | vaqa'o_lt | vaqa'o | vaqa'o_plus | ventil'o |
|         |                 variable                 |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|  0000   |                                          |   X   |   X    |    X    |  X   |    X     |         X          |    X     |   X   |   X    |    X    |   X    |          X          |     X      |    X    |         X         |      X       |         X          |          X           |     X     | X  |   X    |      X       |     X     |     X     |   X    |      X      |    X     |
|         |                 firmware                 |   O   |   O    |    O    |  O   |    O     |         O          |    O     |   O   |   O    |    O    |   O    |          O          |     O      |    O    |         O         |      O       |         O          |          O           |     O     | O  |   O    |      O       |     O     |     O     |   O    |      O      |    O     |
|         |                  kernel                  |   O   |   O    |    O    |  O   |    O     |         O          |    O     |   O   |   O    |    O    |   O    |          O          |     O      |    O    |         O         |      O       |         O          |          O           |     O     | O  |   O    |      O       |     O     |     O     |   O    |      O      |    O     |
|         |               manufacturer               |   O   |   O    |    O    |  O   |    O     |         O          |    O     |   O   |   O    |    O    |   O    |          O          |     O      |    O    |         O         |      O       |         O          |          O           |     O     | O  |   O    |      O       |     O     |     O     |   O    |      O      |    O     |
|         |                  model                   |   O   |   O    |    O    |  O   |    O     |         O          |    O     |   O   |   O    |    O    |   O    |          O          |     O      |    O    |         O         |      O       |         O          |          O           |     O     | O  |   O    |      O       |     O     |     O     |   O    |      O      |    O     |
|         |                   date                   |   O   |   O    |    O    |  O   |    O     |         O          |    O     |   O   |   O    |    O    |   O    |          O          |     O      |    O    |         O         |      O       |         O          |          O           |     O     | O  |   O    |      O       |     O     |     O     |   O    |      O      |    O     |
|         |                 position                 |   O   |   O    |    O    |  O   |    O     |         O          |    O     |   O   |   O    |    O    |   O    |          O          |     O      |    O    |         O         |      O       |         O          |          O           |     O     | O  |   O    |      O       |     O     |     O     |   O    |      O      |    O     |
|         |             application_name             |   O   |   O    |    O    |  O   |    O     |         O          |    O     |   O   |   O    |    O    |   O    |          O          |     O      |    O    |         O         |      O       |         O          |          O           |     O     | O  |   O    |      O       |     O     |     O     |   O    |      O      |    O     |
|  0006   |                                          |       |        |         |  X   |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |     X     |    |        |              |     X     |           |        |             |          |
|         |                  output                  |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |     O     |    |        |              |     O     |           |        |             |          |
|         |                 output_1                 |       |        |         |  O   |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |                 output_2                 |       |        |         |  O   |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |                 output_3                 |       |        |         |  O   |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |                 output_4                 |       |        |         |  O   |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|  000C   |                                          |       |        |         |      |    X     |                    |    X     |   X   |        |    X    |        |                     |            |    X    |                   |              |                    |                      |           |    |        |      X       |           |           |        |             |          |
|         |                  analog                  |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |                  angle                   |       |        |         |      |    O     |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |                   Irms                   |       |        |         |      |          |                    |    O     |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |                 4-20_mA                  |       |        |         |      |          |                    |          |   O   |        |         |        |                     |            |    O    |                   |              |                    |                      |           |    |        |      O       |           |           |        |             |          |
|         |                  0-10_V                  |       |        |         |      |          |                    |          |   O   |        |         |        |                     |            |    O    |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |                 0-100_mV                 |       |        |         |      |          |                    |          |       |        |    O    |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |                  0-70_V                  |       |        |         |      |          |                    |          |       |        |    O    |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |                 0-5_V_1                  |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |      O       |           |           |        |             |          |
|         |                 0-5_V_2                  |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |      O       |           |           |        |             |          |
|         |           ratiometric_0-5_V_1            |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |      O       |           |           |        |             |          |
|         |           ratiometric_0-5_V_2            |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |      O       |           |           |        |             |          |
|         |                   type                   |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |              power_duration              |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |                   mode                   |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |                frequency                 |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |                  range                   |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|  000F   |                                          |   X   |   X    |    X    |  X   |          |                    |          |       |        |         |        |                     |            |    X    |         X         |      X       |                    |                      |           | X  |        |      X       |     X     |     X     |   X    |      X      |    X     |
|         |                  index                   |       |   O    |    O    |      |          |                    |          |       |        |         |        |                     |            |    O    |                   |              |                    |                      |           | O  |        |              |     O     |           |        |             |    O     |
|         |                 index_1                  |   O   |        |         |  O   |          |                    |          |       |        |         |        |                     |            |         |         O         |      O       |                    |                      |           |    |        |      O       |           |           |        |             |          |
|         |                 index_2                  |   O   |        |         |  O   |          |                    |          |       |        |         |        |                     |            |         |         O         |      O       |                    |                      |           |    |        |      O       |           |           |        |             |          |
|         |                 index_3                  |       |        |         |  O   |          |                    |          |       |        |         |        |                     |            |         |         O         |      O       |                    |                      |           |    |        |      O       |           |           |        |             |          |
|         |                 index_4                  |       |        |         |  O   |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |                 index_5                  |       |        |         |  O   |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |                 index_6                  |       |        |         |  O   |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |                 index_7                  |       |        |         |  O   |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |                 index_8                  |       |        |         |  O   |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |                 index_9                  |       |        |         |  O   |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |                 index_10                 |       |        |         |  O   |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |                pin_state                 |       |        |    O    |      |          |                    |          |       |        |         |        |                     |            |    O    |                   |              |                    |                      |           |    |        |              |           |           |        |             |    O     |
|         |           violation_detection            |       |   O    |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |     O     |   O    |      O      |          |
|         |                   open                   |       |   O    |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |               pin_state_1                |   O   |        |         |  O   |          |                    |          |       |        |         |        |                     |            |         |         O         |      O       |                    |                      |           |    |        |      O       |           |           |        |             |          |
|         |               pin_state_2                |   O   |        |         |  O   |          |                    |          |       |        |         |        |                     |            |         |         O         |      O       |                    |                      |           |    |        |      O       |           |           |        |             |          |
|         |               pin_state_3                |       |        |         |  O   |          |                    |          |       |        |         |        |                     |            |         |         O         |      O       |                    |                      |           |    |        |      O       |           |           |        |             |          |
|         |               pin_state_4                |       |        |         |  O   |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |               pin_state_5                |       |        |         |  O   |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |               pin_state_6                |       |        |         |  O   |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |               pin_state_7                |       |        |         |  O   |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |               pin_state_8                |       |        |         |  O   |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |               pin_state_9                |       |        |         |  O   |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |               pin_state_10               |       |        |         |  O   |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |                 polarity                 |   O   |   O    |    O    |  O   |          |                    |          |       |        |         |        |                     |            |    O    |         O         |      O       |                    |                      |           |    |        |              |           |           |        |             |          |
|         |              edge_selection              |   O   |   O    |    O    |  O   |          |                    |          |       |        |         |        |                     |            |    O    |         O         |      O       |                    |                      |           |    |        |              |           |           |        |             |          |
|         |             debounce_period              |   O   |   O    |    O    |  O   |          |                    |          |       |        |         |        |                     |            |    O    |         O         |      O       |                    |                      |           |    |        |              |           |           |        |             |          |
|         |               poll_period                |   O   |   O    |    O    |  O   |          |                    |          |       |        |         |        |                     |            |    O    |         O         |      O       |                    |                      |           |    |        |              |           |           |        |             |          |
|         |               force_notify               |   O   |   O    |    O    |  O   |          |                    |          |       |        |         |        |                     |            |    O    |         O         |      O       |                    |                      |           |    |        |              |           |           |        |             |          |
|  0013   |                                          |       |        |         |      |          |                    |          |       |        |         |        |                     |     X      |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |               output_value               |       |        |         |      |          |                    |          |       |        |         |        |                     |     O      |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|  0050   |                                          |   X   |   X    |    X    |  X   |    X     |         X          |    X     |   X   |   X    |    X    |   X    |          X          |     X      |    X    |         X         |      X       |         X          |          X           |     X     | X  |   X    |      X       |     X     |     X     |   X    |      X      |    X     |
|         |              configuration               |   O   |   O    |    O    |  O   |    O     |         O          |    O     |   O   |   O    |    O    |   O    |          O          |     O      |    O    |         O         |      O       |         O          |          O           |     O     | O  |   O    |      O       |     O     |     O     |   O    |      O      |    O     |
|         |         main_or_external_voltage         |       |        |         |  O   |          |                    |          |       |   O    |         |        |                     |            |    O    |                   |              |                    |                      |           |    |   O    |              |           |           |   O    |      O      |    O     |
|         |       rechargeable_battery_voltage       |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |        disposable_battery_voltage        |   O   |   O    |    O    |  O   |    O     |         O          |    O     |   O   |   O    |    O    |   O    |          O          |            |    O    |         O         |      O       |         O          |          O           |           | O  |        |      O       |           |           |        |             |          |
|         |         solar_harvesting_voltage         |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |     O     |   O    |      O      |    O     |
|         |          tic_harvesting_voltage          |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |   O    |              |           |           |        |             |          |
|  0052   |                                          |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |     X     |    |   X    |              |           |           |        |             |          |
|         |              active_energy               |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |     O     |    |   O    |              |           |           |        |             |          |
|         |             reactive_energy              |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |     O     |    |   O    |              |           |           |        |             |          |
|         |                nb_samples                |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |     O     |    |   O    |              |           |           |        |             |          |
|         |               active_power               |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |     O     |    |   O    |              |           |           |        |             |          |
|         |              reactive_power              |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |     O     |    |   O    |              |           |           |        |             |          |
|  0053   |                                          |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |   X    |              |           |           |        |             |          |
|  0054   |                                          |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |   X    |              |           |           |        |             |          |
|  0056   |                                          |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |   X    |              |           |           |        |             |          |
|  0057   |                                          |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |   X    |              |           |           |        |             |          |
|  0400   |                                          |       |        |         |      |          |                    |          |       |        |         |   X    |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |      X      |          |
|         |               illuminance                |       |        |         |      |          |                    |          |       |        |         |   O    |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |      O      |          |
|  0402   |                                          |   X   |        |         |      |          |         X          |          |       |        |         |   X    |          X          |            |         |                   |              |         X          |          X           |           | X  |        |              |           |     X     |   X    |      X      |    X     |
|         |               temperature                |   O   |        |         |      |          |         O          |          |       |        |         |   O    |          O          |            |         |                   |              |         O          |                      |           | O  |        |              |           |           |        |             |    O     |
|         |              temperature_1               |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |          O           |           |    |        |              |           |     O     |   O    |      O      |          |
|         |              temperature_2               |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |          O           |           |    |        |              |           |     O     |   O    |      O      |          |
|  0403   |                                          |   X   |        |         |      |          |                    |          |       |        |         |   X    |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |   X    |      X      |          |
|         |                 pressure                 |   O   |        |         |      |          |                    |          |       |        |         |   O    |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |   O    |      O      |          |
|  0405   |                                          |   X   |        |         |      |          |                    |          |       |        |         |   X    |                     |            |         |                   |              |                    |                      |           | X  |        |              |           |     X     |   X    |      X      |          |
|         |                 humidity                 |   O   |        |         |      |          |                    |          |       |        |         |   O    |                     |            |         |                   |              |                    |                      |           | O  |        |              |           |           |        |             |          |
|         |                humidity_1                |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |     O     |   O    |      O      |          |
|         |                humidity_2                |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |     O     |   O    |      O      |          |
|  0406   |                                          |       |        |         |      |    X     |                    |          |       |        |         |   X    |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |      X      |          |
|         |                occupancy                 |       |        |         |      |    O     |                    |          |       |        |         |   O    |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |      O      |          |
|  8004   |                                          |   X   |   X    |    X    |  X   |    X     |         X          |    X     |   X   |   X    |    X    |   X    |          X          |     X      |    X    |         X         |      X       |         X          |          X           |     X     | X  |   X    |      X       |     X     |     X     |   X    |      X      |    X     |
|         |               message_type               |   O   |   O    |    O    |  O   |    O     |         O          |    O     |   O   |   O    |    O    |   O    |          O          |     O      |    O    |         O         |      O       |         O          |          O           |     O     | O  |   O    |      O       |     O     |     O     |   O    |      O      |    O     |
|         |                 nb_retry                 |   O   |   O    |    O    |  O   |    O     |         O          |    O     |   O   |   O    |    O    |   O    |          O          |     O      |    O    |         O         |      O       |         O          |          O           |     O     | O  |   O    |      O       |     O     |     O     |   O    |      O      |    O     |
|         |          automatic_association           |   O   |   O    |    O    |  O   |    O     |         O          |    O     |   O   |   O    |    O    |   O    |          O          |     O      |    O    |         O         |      O       |         O          |          O           |     O     | O  |   O    |      O       |     O     |     O     |   O    |      O      |    O     |
|         |                data_rate                 |   O   |   O    |    O    |  O   |    O     |         O          |    O     |   O   |   O    |    O    |   O    |          O          |     O      |    O    |         O         |      O       |         O          |          O           |     O     | O  |   O    |      O       |     O     |     O     |   O    |      O      |    O     |
|         |             ABP_dev_address              |   O   |   O    |    O    |  O   |    O     |         O          |    O     |   O   |   O    |    O    |   O    |          O          |     O      |    O    |         O         |      O       |         O          |          O           |     O     | O  |   O    |      O       |     O     |     O     |   O    |      O      |    O     |
|         |               OTA_app_EUI                |   O   |   O    |    O    |  O   |    O     |         O          |    O     |   O   |   O    |    O    |   O    |          O          |     O      |    O    |         O         |      O       |         O          |          O           |     O     | O  |   O    |      O       |     O     |     O     |   O    |      O      |    O     |
|  8005   |                                          |       |        |         |  X   |          |                    |          |       |        |         |        |                     |            |         |         X         |      X       |                    |                      |           |    |        |      X       |           |           |        |             |          |
|         |               pin_state_1                |       |        |         |  O   |          |                    |          |       |        |         |        |                     |            |         |         O         |      O       |                    |                      |           |    |        |      O       |           |           |        |             |          |
|         |               pin_state_2                |       |        |         |  O   |          |                    |          |       |        |         |        |                     |            |         |         O         |      O       |                    |                      |           |    |        |      O       |           |           |        |             |          |
|         |               pin_state_3                |       |        |         |  O   |          |                    |          |       |        |         |        |                     |            |         |         O         |      O       |                    |                      |           |    |        |      O       |           |           |        |             |          |
|         |               pin_state_4                |       |        |         |  O   |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |               pin_state_5                |       |        |         |  O   |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |               pin_state_6                |       |        |         |  O   |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |               pin_state_7                |       |        |         |  O   |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |               pin_state_8                |       |        |         |  O   |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |               pin_state_9                |       |        |         |  O   |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |               pin_state_10               |       |        |         |  O   |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |                    NA                    |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |         O         |      O       |                    |                      |           |    |        |      O       |           |           |        |             |          |
|  8006   |                                          |       |        |         |      |          |                    |          |       |   X    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |                  speed                   |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |                 data_bit                 |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |                  parity                  |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |                 stop_bit                 |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|  8007   |                                          |       |        |         |      |          |                    |          |       |   X    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |              modbus_payload              |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |            modbus_payload_EP0            |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |            modbus_payload_EP1            |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |            modbus_payload_EP2            |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |            modbus_payload_EP3            |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |            modbus_payload_EP4            |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |            modbus_payload_EP5            |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |            modbus_payload_EP6            |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |            modbus_payload_EP7            |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |            modbus_payload_EP8            |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |            modbus_payload_EP9            |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |              modbus_slaveID              |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |            modbus_slaveID_EP0            |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |            modbus_slaveID_EP1            |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |            modbus_slaveID_EP2            |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |            modbus_slaveID_EP3            |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |            modbus_slaveID_EP4            |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |            modbus_slaveID_EP5            |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |            modbus_slaveID_EP6            |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |            modbus_slaveID_EP7            |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |            modbus_slaveID_EP8            |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |            modbus_slaveID_EP9            |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |              modbus_fnctID               |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |            modbus_fnctID_EP0             |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |            modbus_fnctID_EP1             |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |            modbus_fnctID_EP2             |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |            modbus_fnctID_EP3             |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |            modbus_fnctID_EP4             |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |            modbus_fnctID_EP5             |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |            modbus_fnctID_EP6             |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |            modbus_fnctID_EP7             |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |            modbus_fnctID_EP8             |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |            modbus_fnctID_EP9             |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |             modbus_datasize              |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |           modbus_datasize_EP0            |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |           modbus_datasize_EP1            |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |           modbus_datasize_EP2            |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |           modbus_datasize_EP3            |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |           modbus_datasize_EP4            |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |           modbus_datasize_EP5            |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |           modbus_datasize_EP6            |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |           modbus_datasize_EP7            |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |           modbus_datasize_EP8            |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |           modbus_datasize_EP9            |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|  8008   |                                          |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |    X     |
|         |          differential_pressure           |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |    O     |
|  8009   |                                          |       |        |         |      |          |                    |          |       |   X    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |         modbus_frame_series_sent         |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |       modbus_frame_number_in_serie       |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |        modbus_last_frame_of_serie        |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |                modbus_EP0                |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |                modbus_EP1                |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |                modbus_EP2                |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |                modbus_EP3                |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |                modbus_EP4                |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |                modbus_EP5                |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |                modbus_EP6                |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |                modbus_EP7                |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |                modbus_EP8                |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |                modbus_EP9                |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         | + 8007 cluster structure for each "true" |       |        |         |      |          |                    |          |       |   O    |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|  800A   |                                          |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     X     |           |        |             |          |
|         |          positive_active_energy          |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |         positive_active_energy_a         |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |         positive_active_energy_b         |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |         positive_active_energy_c         |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |        positive_active_energy_abc        |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |          negative_active_energy          |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |         negative_active_energy_a         |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |         negative_active_energy_b         |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |         negative_active_energy_c         |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |        negative_active_energy_abc        |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |         positive_reactive_energy         |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |        positive_reactive_energy_a        |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |        positive_reactive_energy_b        |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |        positive_reactive_energy_c        |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |       positive_reactive_energy_abc       |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |         negative_reactive_energy         |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |        negative_reactive_energy_a        |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |        negative_reactive_energy_b        |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |        negative_reactive_energy_c        |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |       negative_reactive_energy_abc       |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |          positive_active_power           |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |         positive_active_power_a          |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |         positive_active_power_b          |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |         positive_active_power_c          |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |        positive_active_power_abc         |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |          negative_active_power           |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |         negative_active_power_a          |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |         negative_active_power_b          |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |         negative_active_power_c          |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |        negative_active_power_abc         |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |         positive_reactive_power          |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |        positive_reactive_power_a         |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |        positive_reactive_power_b         |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |        positive_reactive_power_c         |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |       positive_reactive_power_abc        |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |         negative_reactive_power          |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |        negative_reactive_power_a         |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |        negative_reactive_power_b         |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |        negative_reactive_power_c         |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |       negative_reactive_power_abc        |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|  800B   |                                          |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     X     |           |        |             |          |
|         |                   Vrms                   |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |                  Vrms_a                  |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |                  Vrms_b                  |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |                  Vrms_c                  |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |                   Irms                   |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |                  Irms_a                  |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |                  Irms_b                  |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |                  Irms_c                  |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |                  angle                   |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |                 angle_a                  |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |                 angle_b                  |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |                 angle_c                  |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|  800C   |                                          |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |     X     |   X    |      X      |          |
|         |              concentration               |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |                   TVOC                   |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |     O     |   O    |      O      |          |
|         |                   CO2                    |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |     O     |   O    |      O      |          |
|  800D   |                                          |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     X     |           |        |             |          |
|         |                  Vrms_a                  |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |                  Vrms_b                  |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |                  Vrms_c                  |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |                  Irms_a                  |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |                  Irms_b                  |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |                  Irms_c                  |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |                 angle_a                  |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |                 angle_b                  |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |                 angle_c                  |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|  800F   |                                          |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |                   last                   |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |                  params                  |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|         |              working_modes               |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |
|  8010   |                                          |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     X     |           |        |             |          |
|         |             active_energy_a              |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |            reactive_energy_a             |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |             active_energy_b              |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |            reactive_energy_b             |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |             active_energy_c              |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |            reactive_energy_c             |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |            active_energy_abc             |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |           reactive_energy_abc            |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |              active_power_a              |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |             reactive_power_a             |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |              active_power_b              |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |             reactive_power_b             |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |              active_power_c              |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |             reactive_power_c             |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |             active_power_abc             |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|         |            reactive_power_abc            |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |     O     |           |        |             |          |
|  8052   |                                          |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |     X     |    |        |              |           |           |        |             |          |
|         |                frequency                 |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |     O     |    |        |              |           |           |        |             |          |
|         |              frequency_min               |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |     O     |    |        |              |           |           |        |             |          |
|         |              frequency_max               |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |     O     |    |        |              |           |           |        |             |          |
|         |                   Vrms                   |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |     O     |    |        |              |           |           |        |             |          |
|         |                 Vrms_min                 |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |     O     |    |        |              |           |           |        |             |          |
|         |                 Vrms_max                 |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |     O     |    |        |              |           |           |        |             |          |
|         |                  Vpeak                   |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |     O     |    |        |              |           |           |        |             |          |
|         |                Vpeak_min                 |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |     O     |    |        |              |           |           |        |             |          |
|         |                Vpeak_max                 |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |     O     |    |        |              |           |           |        |             |          |
|         |               over_voltage               |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |     O     |    |        |              |           |           |        |             |          |
|         |               sag_voltage                |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |     O     |    |        |              |           |           |        |             |          |
|         |                                          |       |        |         |      |          |                    |          |       |        |         |        |                     |            |         |                   |              |                    |                      |           |    |        |              |           |           |        |             |          |

___

# Français
[→ English](#english)
## Utilisation
La fonction à appeler est `DecodeUplink()` :  

```javascript
    DecodeUplink(input){
        return output
    }
```

L'entrée doit être un objet `input` de la forme :  

```javascript
    input:{
        "bytes": [17, 10, 4, 2, 0, 0, 41, 11, 137],  // La trame sous forme de liste d'octets
        "fPort": 125,                                // Le port (Watteco utilise toujours 125)
        "recvTime": "2023-07-19T07:51:31.598957793Z" // La date au format ISO 8601
    }
```

`bytes` est une liste de valeurs hexadécimales convertit en valeurs décimales.  
`fport` contient le port d'envoi en décimal.  
`recvTime` est la date de reception en string mais au format date ISO 8601.  

La sortie est un objet `output` qui, si le traitement ne retourne pas d'erreur, a la forme:   

```javascript
    output:{
        data:[{
            "variable": "temperature",
            "value": 29.53,
            "date": "2023-07-19T07:51:31.598957793Z"
        }]
        warning:[]
    }
```

`data` est une liste d'objets formatés contenants `variable`,`value`,`date`. En standard, la majorité des clusters ne retournent qu'un objet ; mais certains retourne plusieurs objets en un payload. En batch il y a plusieurs objets.  

`variable` contient le nom de la donnée en string. [(voir *variables*)](#variables) 
`value` contient la valeur de la donnée dans le format de la donnée (int, uint, float, ...).  
`date` contient la date en string au format date ISO 8601. C'est la date d'entrée pour un standard, pour un batch c'est la date de mesure qui peut être soit la date d'envoi de la trame (donc la date d'entrée), soit une date antérieure à la date d'envoi.  

`warning` est une liste qui est vide pour la majorité des payload traitables, elle ne se remplit qu'avec les alarmes configurables sur le cluster associé, sous forme de messages string formatés.  

Si le traitement retourne une erreur, `output` a la forme :  

```javascript
    output:{
        error:""
        warning:[]
    }
```

L'erreur retournée est la première rencontrée, ce qui coupe le traitement. Elle est sous forme de string.  

## Npm 

Pour télécharger le capteur via npm, on fait :

```bash
    npm install <npm-package>
```

Nos packages actuels sont :

Voir tableau [ici](#npm) ou [la liste sur le site npm](https://www.npmjs.com/~watteco)

# Utilisation de l'API codec Watteco avec NodeRED (>`1.3.0`)
[→ English](#using-the-watteco-codec-api-with-nodered-130)

La première étape consiste à configurer un nœud JavaScript pour importer le module dont vous avez besoin via npm.  
Vous trouverez la liste des modules [ici](https://www.npmjs.com/~watteco) ou dans le tableau [ci-dessus](#npm).  
Pour le configurer, ajoutez le module dans l'onglet "Configuration" du nœud JavaScript.

![Onglet Configuration](/sources_readme/wattecoConfNodeRedFr.png)

Vous pourrez ensuite l'appeler depuis le nœud de la manière suivante :
`nomDuModule.driver.decodeUplink(entrée)`
avec l'entrée étant au format :

```javascript
{
    "bytes": [17, 10, 4, 2, 0, 0, 41, 11, 137],  // La trame sous forme de liste d'octets
    "fPort": 125,                                // Le port (Watteco utilise toujours 125)
    "recvTime": "2023-07-19T07:51:31.598957793Z" // La date au format ISO 8601
}
```
Vous trouverez un exemple de décodage d'une trame batch Vaqa'o+ en base64 ci-dessous, que vous pouvez importer directement dans NodeRED via le bouton `Importer` dans le menu de droite.

<details>
<summary>Exemple de décodage Vaqa'o+ NodeRED</summary>

```json
[
    {
        "id": "1a97c11010c7ed96",
        "type": "tab",
        "label": "Exemple décodage Vaqa'o+",
        "disabled": false,
        "info": "",
        "env": []
    },
    {
        "id": "16fda4bf7147d143",
        "type": "inject",
        "z": "1a97c11010c7ed96",
        "name": "Exemple de trame base64 batch Vaqa'o+",
        "props": [
            {
                "p": "payload.data",
                "v": "cAYAAOJ2AJDPwAFbAoQj+wMnKRmATBIcAD68W9aJXwBAAAtotywnoN203IB225IMaLcsGWBbBA==",
                "vt": "str"
            },
            {
                "p": "payload.time",
                "v": "",
                "vt": "date"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "x": 220,
        "y": 100,
        "wires": [
            [
                "da725e636ee88c77"
            ]
        ]
    },
    {
        "id": "8a0459069140422f",
        "type": "debug",
        "z": "1a97c11010c7ed96",
        "name": "Sortie",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 590,
        "y": 100,
        "wires": []
    },
    {
        "id": "da725e636ee88c77",
        "type": "function",
        "z": "1a97c11010c7ed96",
        "name": "décodage",
        "func": "// Vous devez importer le décodeur du capteur depuis npm via l'onglet configuration ci-dessus\n// N'oubliez pas de définir \"functionExternalModules: true,\" dans votre fichier \"settings.js\"\n\nif (msg.payload.data && typeof msg.payload.data === 'string') {\n\n    const buffer = Buffer.from(msg.payload.data, 'base64'); // La trame arrive en base64 dans msg.payload.data\n\n    var date = new Date(msg.payload.time); // La date est récupérée depuis msg.payload.time\n                                          // sous n'importe quel format et est transformée en ISO 8601\n    var inputObject = {\n        \"bytes\": buffer, // La trame sous forme de liste de bytes\n        \"fPort\": 125,    // Le port (Watteco utilise toujours 125)\n        \"recvTime\": date // La date au format ISO 8601\n    }\n\n} else {\n    node.error(\"Le message ne contient pas de trame en Base64\");\n    return null;\n}\n\nmsg.payload = wattecoVaqaOSensorPlus.driver.decodeUplink(inputObject);\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [
            {
                "var": "wattecoVaqaOSensorPlus",
                "module": "watteco-vaqa_o_sensor_plus"
            }
        ],
        "x": 460,
        "y": 100,
        "wires": [
            [
                "8a0459069140422f"
            ]
        ]
    }
]
```

</details>

## Tableau des clusters
Voir [cluster table](#cluster-table)

## Noms des clusters
Voir [cluster name](#cluster-name)

## Variables
Voir [variables](#variables)