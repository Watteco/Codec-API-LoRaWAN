## utilisation

<p>Le fichier <code>[device].js</code>est le point d'entrée des .js. Il prend un objet <code>input</code> contenant le payload sous forme de liste d'octets converti en décimal, le port et la date de reception.<br>
La sortie est décrite dans le fichier<code>uplink.schema.json</code>.<br>

## fichiers codec

Il ne faut pas toucher aux fichier codec se trouvant dans devices, il seront écraser par ceux dans codec lorsque vous exécuterez ```rebuild_mains.js``` dans utilities.

## webpack

<p>Afin de respecter la contrainte d'un seul fichier final pour le codec, on utilise webpack pour compiler les fichiers en un seul.</p>

<p>ces commandes doivent être exécutés dans le dossier du fichier</p>
<p>Il faut installer webpack cli:</p>

    npm install webpack webpack-cli --save-dev

<p>On peut alors écrire notre fichier <strong>webpack.config.js</strong>, et l'exécuter comme ceci:</p>

    npx webpack --config webpack.config.js

<p>Il faudra s'assurer que le fichier entry existe.<br>
le chemin est relatif à la position du fichier webpack.config.js</p>

<p>Notre <strong>webpack.config.js</strong> est spécifique au capteur associé :</p>

    const path = require("path");

    module.exports = {
    target: "node",
    mode: "production",
    entry: "./[captor].js",
    output: {
    filename: "main.js",
    path: path.resolve(__dirname, "."),
    library: "driver",
        },
    };

## JEST
<p>Dans package.json:</p>

    "scripts": {
        "test": "jest --collectCoverage"
    }

<p>Lancer les tests</p>

    npm run test

<p>Les tests sont fait indirectement avec les fichiers séparés comme le montre le point d'entrée du driver qui est le fichier spécifique au capteur :</p>

    let driver = require("./[captor].js");

<p>Cependant notre packaging webpack crée un fichier main.js qui fonctionne de la même manière.<br>
Cette séparation est dûe à la compression du code dans main.js qui casse les liens logiques entre les fichiers, ainsi que le nom des fonctions ; JEST ne le supporte pas.</p>


# TODO

- ajout champ unit
- error sur cmdID/clustID/attID inconnus
- alarm function unique