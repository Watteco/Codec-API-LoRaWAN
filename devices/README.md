## Utilisation

Le fichier `[device].js` est le point d'entrée du Javascript. Il prend un objet `input` contenant le payload sous forme de liste d'octets converti en décimal, le port et la date de réception.  
La sortie est décrite dans le fichier `uplink.schema.json`.  

## Fichiers codec

Le corps des codec (decode_uplink.js,standard.js et batch.js) provient du répertoire '../codec'

## Webpack

Afin de respecter la contrainte d'un seul fichier final pour le codec, on utilise webpack pour compiler les fichiers en un seul.  

Ces commandes doivent être exécutées dans le dossier du fichier.  
  
Il faut installer webpack cli :  

```bash
    npm install webpack webpack-cli --save-dev
```

On peut alors écrire notre fichier **webpack.config.js**, et l'exécuter comme ceci :  

```bash
    npx webpack --config webpack.config.js
```

Il faudra s'assurer que le fichier entry existe.  
Le chemin est relatif à la position du fichier **webpack.config.js**  

Notre **webpack.config.js** est spécifique au capteur associé :  

```javascript
const path = require("path");

module.exports = {
    target: "node",
    mode: "production",
    entry: "./[device].js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "."),
        library: "driver",
    },
};
```

## JEST
Dans package.json :  

```javascript
    "scripts": {
        "test": "jest --collectCoverage"
    }
```

Lancer les tests  : 

```bash
    npm run test
```

Les tests sont fait indirectement avec les fichiers séparés comme le montre le point d'entrée du driver qui est le fichier spécifique au capteur :  

```javascript
    let driver = require("./[device].js");
```

Cependant notre packaging webpack crée un fichier main.js qui fonctionne de la même manière.  
Cette séparation est due à la compression du code dans main.js qui casse les liens logiques entre les fichiers, ainsi que le nom des fonctions ; JEST ne le supporte pas.  


# TODO

- ajout champ `unit`
- error sur `cmdID`/`clustID`/`attID` inconnus
- alarm function unique