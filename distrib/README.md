# English
[→ Français](#français)

The drivers are provided as `main.js` files, with one file per sensor type. Each driver, regardless of the sensor, offers a simple API that complies with the  
[TSO13-1.0.0 Payload Codec API](https://resources.lora-alliance.org/technical-specifications/ts013-1-0-0-payload-codec-api) specifications.

You can consult the [list of drivers](DRIVERS.md) provided by Watteco, which also includes the "variables" that each driver can return.

## Usage

Calling driver API:

```javascript
    output = driver.decodeUplink(input)
```

The `input` object is built like this:  

```javascript
    input:{
        //"bytes": [17, 10, 4, 2, 0, 0, 41, 11, 137], // The frame should be a 'bytes array'  
        "bytes": "110A04020000290B89"                 // however it can be given as 'hex string'
        "fPort": 125,                                 // The port (Watteco always use 125)
        "recvTime": "2023-07-19T07:51:31.598957793Z"  // The date in ISO 8601 format
    }
```

`bytes` is a byte array (or hex string) containing the Applicative layer of the frame to decode.  
`fPort` is the decimal value of the sender port.  
`recvTime` is the time in a string of the ISO 8601 date format.

The `output` without errors is like this:  

```javascript
    output:{
        data:{ 
            samples: [ // This array could contain multiple samples of multiple variables (here only one variable, one sample)
                {
                    "variable": "temperature",
                    "value": 29.53,
                    "date": "2023-07-19T07:51:31.598957793Z"
                }
            ]
        },
        // To ease output usage in some infrastructures, LAST sample of each variable is duplicated directly 
        // under data as a "<variable>" : "<value"> object
        "temperature": 29.53  
        warning:[]
    }
```

`data.samples` is a formatted objects list ; each object contains the fields `variable`,`value`,`date`.  

- `variable` contains a string of the name. [(see possible *variables* from our drivers list)](DRIVERS.md).
- `value` contains the data value in its corresponding format (uint, int, float, ...).   
- `date` is a string in the ISO 8601 date format. It is the input date for standard report or at last input date for batch report.  

`warning` contains the alarms you configured on the reports.  

Last sample of each variable is also extracted in a different format directly under data. ( here: "temperature": 29.53)

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

Our current modules can be listed : 
- From current Watteco repository [drivers from'distrib' directory](DRIVERS.md)
- From [the list of published drivers on the npm website](https://www.npmjs.com/~watteco)


## Using the Watteco codec API with NodeRED (>`1.3.0`)
[→ Français](#utilisation-de-lapi-codec-watteco-avec-nodered-130)

The first step is to set-up a Javascript node to import the module you need via npm.  
You'll find the modules list [above](#npm).  
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

Here is an example, assuming the input is coming in base64:

```javascript
// You must import the sensor decoder from npm via the configuration tab
// Don't forget to set "functionExternalModules: true," in your "settings.js" file

if (msg.payload.data && typeof msg.payload.data === 'string') {

    const buffer = Buffer.from(msg.payload.data, 'base64'); // The frame arrives in base64 in msg.payload.data

    var date = new Date(msg.payload.time); // The date is recuperated from msg.payload.time
                                          // under any format and is transformed to ISO 8601
    var inputObject = {
        "bytes": buffer, // The frame in a bytes list
        "fPort": 125,    // The port (Watteco always use 125)
        "recvTime": date // The date in ISO 8601 format
    }

} else {
    node.error("The message doesn't carry a Base64 frame");
    return null;
}

msg.payload = wattecoVaqaOPlus.driver.decodeUplink(inputObject);
return msg;
```

You can download this [NodeRED example (exported in JSON)](/sources_readme/VaqaoDecodingExampleNpmEn.json). It decodes a base64 Vaqa'o batch frame. Once downloaded, you can directly import it to NodeRED via the `Import` button in the right menu.


## Using the Watteco codec API with NodeRED (<`1.3.0`)
[→ Français](#utilisation-de-lapi-codec-watteco-avec-nodered-130-1)

On these former nodered version of NodeRED, `npm` is not available. Then, the first step is to import manually the codec into a Javascript node.  
You'll find all the codecs, by sensor, [here](https://github.com/Watteco/Codec-API-LoRaWAN/tree/main/distrib).  
Choose your sensor, then copy the content of the corresponding `main.js` file and simply paste it at the beginning of your javascript node.  

You will then be able to call it from the node like this:
`driver.decodeUplink(input)`  
with the input being in the format:

```javascript
{
    "bytes": [17, 10, 4, 2, 0, 0, 41, 11, 137],  // The frame in a bytes list
    "fPort": 125,                                // The port (Watteco always use 125)
    "recvTime": "2023-07-19T07:51:31.598957793Z" // The date in ISO 8601 format
}
```

Download this [NodeRED example (exported in JSON)](/sources_readme/VaqaoDecodingExampleNoNpmEn.json). It decodes a base64 Vaqa'o batch frame. Once downloaded, you can directly import it to NodeRED via the `Import` button in the right menu.

## Using the Watteco codec API with Chirpstack
[→ Français](#utilisation-de-lapi-codec-watteco-avec-chirpstack)

The first step is to import manually the codec into your Chirpstack interface. 
You'll find all the codecs, by sensor, [here](https://github.com/Watteco/Codec-API-LoRaWAN/tree/main/distrib).  
Choose your sensor, then copy the content of the corresponding `main.js` file then simply paste into the "Codec" section of the Chirpstack interface.  
 
*With our former codecs, you may also have to replace ",exports.driver=driver;" by ";" at the end of the compressed codec line.*
*In recent codec ( >= v1.1.0) the exports is conditionally done according to you JS env capability. Change is not necessary.*

```javascript
var driver ....../* Big copied line containing the driver */.......
function Decode (fPort, bytes)
{
  _input = {
    "bytes": bytes,
    "fPort": fPort,
    "recvTime": "2024-01-16T09:11:00.000Z" // time is in ISO 8601 format (could be calcultaed according to current Date())
  }
  return driver.decodeUplink(_input);
}
```
  
Your Chirpstack installation is now able to decode your sensor's frames.


# Français
[→ English](#english)

Les drivers sont fournis sous forme de fichiers `main.js`, un fichier par type de capteur.  
Chaque driver, quel que soit le capteur, offre une API simple conforme aux spécifications de la  
[TSO13-1.0.0 Payload Codec API](https://resources.lora-alliance.org/technical-specifications/ts013-1-0-0-payload-codec-api).

Vous pouvez consulter la [liste des drivers](DRIVERS.md)  
mise à disposition par Watteco, qui inclut également les "variables" pouvant être retournées par chaque driver.


## Utilisation

La fonction appelée est :  

```javascript
    output = driver.decodeUplink(input)
```

L'objet `input` est construit comme ceci:  

```javascript
    input:{
        //"bytes": [17, 10, 4, 2, 0, 0, 41, 11, 137], // La trame doit être un 'tableau d'octets'  
        "bytes": "110A04020000290B89"                 // mais elle peut être fournie sous forme de 'chaîne hexadécimale'
        "fPort": 125,                                 // Le port (Watteco utilise toujours 125)
        "recvTime": "2023-07-19T07:51:31.598957793Z"  // La date au format ISO 8601
    }
```

`bytes` est un tableau d'octets (ou une chaîne hexadécimale) contenant la couche applicative de la trame à décoder.  
`fPort` est la valeur décimale du port de l'émetteur.  
`recvTime` est l'heure sous forme de chaîne au format de date ISO 8601.

La sortie `output` sans erreurs ressemble à ceci :  

```javascript
    output:{
        data:{ 
            samples: [ // Ce tableau peut contenir plusieurs échantillons de plusieurs variables (ici une seule variable, un seul échantillon)
                {
                    "variable": "temperature",
                    "value": 29.53,
                    "date": "2023-07-19T07:51:31.598957793Z"
                }
            ]
        },
        // Pour faciliter l'utilisation de la sortie dans certaines infrastructures, le DERNIER échantillon de chaque variable est dupliqué 
        // directement sous data en tant qu'objet "<variable>" : "<valeur>"
        "temperature": 29.53  
        warning:[]
    }
```

`data.samples` est une liste d'objets formatés ; chaque objet contient les champs `variable`,`value`,`date`.  

- `variable` contient une chaîne avec le nom. [(voir les *variables* possibles dans notre liste de drivers)](DRIVERS.md).
- `value` contient la valeur des données dans son format correspondant (uint, int, float, ...).   
- `date` est une chaîne au format de date ISO 8601. Il s'agit de la date d'entrée pour un rapport standard ou de la dernière date d'entrée pour un rapport de type batch.  

`warning` contient les alarmes que vous avez configurées sur les rapports.  

Le dernier échantillon de chaque variable est également extrait dans un format différent directement sous data. (ici : `"temperature": 29.53`)

La sortie `output` en cas d'erreurs est comme ceci :  

```javascript
    output:{
        error:""
        warning:[]
    }
```

Comme la méthode try/catch est utilisée, `error` contient la première erreur rencontrée et interrompt le traitement.  

## Npm

Si vous souhaitez obtenir le module via npm, vous devez exécuter :

```bash
    npm install <npm-package>
```

Nos modules actuels sont listés : 
- Depuis le dépôt Watteco [drivers du répertoire 'distrib'](DRIVERS.md)
- Depuis [la liste des drivers publiés sur le site npm](https://www.npmjs.com/~watteco)

## Utilisation de l'API codec Watteco avec NodeRED (>`1.3.0`)
[→ English](#using-the-watteco-codec-api-with-nodered-130)

La première étape consiste à configurer un nœud JavaScript pour importer le module nécessaire via npm.  
Vous trouverez la liste des modules [ci-dessus](#npm).  
Pour configurer cela, ajoutez le module dans l'onglet "Setup" du nœud JavaScript.  

![Onglet Setup](/sources_readme/wattecoConfNodeRedFr.png)

Vous pourrez ensuite l'appeler depuis le nœud comme ceci :
`moduleName.driver.decodeUplink(input)` 

avec l'entrée au format :

```javascript
{
    "bytes": [17, 10, 4, 2, 0, 0, 41, 11, 137],  // La trame sous forme de liste d'octets
    "fPort": 125,                                // Le port (Watteco utilise toujours 125)
    "recvTime": "2023-07-19T07:51:31.598957793Z" // La date au format ISO 8601
}
```

Téléchargez cet [exemple NodeRED (exporté en JSON)](/sources_readme/VaqaoDecodingExampleNpmFr.json).  
Il décode une trame batch Vaqa'o encodée en base64.  
Une fois téléchargé, vous pouvez l'importer directement dans NodeRED via le bouton `Importer` du menu de droite.


## Utilisation de l'API codec Watteco avec NodeRED (<`1.3.0`)
[→ English](#using-the-watteco-codec-api-with-nodered-130-1)

Dans ces anciennes versions de NodeRED, `npm` n'est pas disponible.  
La première étape consiste donc à importer manuellement le codec dans un nœud JavaScript.  
Vous trouverez tous les codecs, classés par capteur, [ici](https://github.com/Watteco/Codec-API-LoRaWAN/tree/main/distrib).  
Choisissez votre capteur, puis copiez le contenu du fichier `main.js` correspondant et collez-le simplement au début de votre nœud JavaScript.  

Vous pourrez ensuite l'appeler depuis le nœud comme ceci :
`driver.decodeUplink(input)`  
avec l'entrée au format :

```javascript
{
    "bytes": [17, 10, 4, 2, 0, 0, 41, 11, 137],  // La trame sous forme de liste d'octets
    "fPort": 125,                                // Le port (Watteco utilise toujours 125)
    "recvTime": "2023-07-19T07:51:31.598957793Z" // La date au format ISO 8601
}
```

Téléchargez cet [exemple NodeRED (exporté en JSON)](/sources_readme/VaqaoDecodingExampleNoNpmFr.json).  
Il décode une trame batch Vaqa'o encodée en base64.  
Une fois téléchargé, vous pouvez l'importer directement dans NodeRED via le bouton `Importer` du menu de droite.

## Utilisation de l'API codec Watteco avec Chirpstack
[→ English](#using-the-watteco-codec-api-with-chirpstack)

La première étape consiste à importer manuellement le codec dans votre interface Chirpstack.  
Vous trouverez tous les codecs, classés par capteur, [ici](https://github.com/Watteco/Codec-API-LoRaWAN/tree/main/distrib).  
Choisissez votre capteur, puis copiez le contenu du fichier `main.js` correspondant et collez-le simplement dans la section "Codec" de l'interface Chirpstack.  
 
*Avec nos anciens codecs, vous devrez peut-être remplacer `,exports.driver=driver;` par `;` à la fin de la ligne du codec compressé.*
*Dans les codecs récents (>= v1.1.0), l'exportation est conditionnellement réalisée selon votre environnement JS. Cette modification n'est donc pas nécessaire.*

```javascript
var driver ....../* BGrande ligne contenant le driver */.......
function Decode (fPort, bytes)
{
  _input = {
    "bytes": bytes,
    "fPort": fPort,
    "recvTime": "2024-01-16T09:11:00.000Z" // L'heure est au format ISO 8601 (peut être calculée en fonction de la date actuelle)
  }
  return driver.decodeUplink(_input);
}
```
  
Votre installation Chirpstack est maintenant capable de décoder les trames de votre capteur.
