## fonctionnement

<p>on va mettre dans un objet <code>input</code> les paramètres d'entrés, qui seront envoyés à la fonction <code>watteco_decodeUplink()</code></p>

<p>cette fonction va, dans un premier temps traiter le payload comme si c'était un standard, à l'aide la fonction <code>normalisation()</code> de <strong>standard.js</strong>.<br>
Dans le cas d'un payload standard, on modifie le résultat de <code>Decoder()</code> pour retourner les donnés dans un format souhaité.<br>
Si le payload est en fait un batch, on retourne le payload, qui est envoyé dans la fonction <code>normalisation()</code> de <strong>batch.js</strong>.
De même, on modifie le résultat de <code>brUncompress()</code> pour retourner les donnés dans un format souhaité.</p> 

les fichiers examples.json contiennent des couples entrée-sortie effectuer avec le codec.<br>
on peut observer leur exactitude en lançant un test JEST comme expliqué [ici](#jest)

## webpack

<p>afin de respecter la contrainte d'un seul fichier final pour le codec, on utilise webpack pour compiler les fichiers en un seul.</p>

<p>il faut installer webpack cli comme cela:</p>

    npm install webpack webpack-cli --save-dev

<p>on peut alors écrire notre fichier <strong>webpack.config.js</strong>, et l'exécuter comme ceci:</p>

    npx webpack --config webpack.config.js

<p>il faudra s'assurer que les dossier spécifiés existes.</p>

<p>notre <strong>webpack.config.js</strong> est spécifique au capteur associé :</p>

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
<p>dans package.json:</p>

    "scripts": {
        "test": "jest --collectCoverage"
    }

<p> lancer les tests</p>

    npm run test

<p>les test sont fait indirectement avec les fichiers séparé comme le montre le point d'entrée du driver qui est le fichier spécifique au capteur :</p>

    let driver = require("./[captor].js");

<p>cependant notre packaging webpack crée un fichier main.js qui fonctionne de la même manière.<br>
cette séparation est dûe à la compression du code dans main.js qui casse les liens logiques entres les fichiers, ainsi que le nom des fonctions ; JEST ne le supporte pas.</p>

## debug

<p> le fichier <code>debug.js</code> permet d'observer l'entrée et la sortie du codec dans la console.<br>
on l'execute comme un capteur mais en rajoutant l'argument <code>device</code> avant:</p>

    node ./codec/debug.js <device> <port> <payload> <date>

<p>il execute le .js du device choisit se trouvant dans le dossier <code>devices</code><br>
Si des modifications dans l'arborescance sont effectués, assurez-vous que le chemin d'appel ait encore du sens.</p>

la liste des device est la suivant :

|         name         |
|:--------------------:|
|        atm'o         |
|        clos'o        |
|       flash'o        |
|         in'o         |
|       inclin'o       |
|  indoor_temperature  |
|       intens'o       |
|        lev'o         |
|        modbus        |
|       monit'o        |
|        move'o        |
| outdoor_temperature  |
|      pilot_wire      |
|       press'o        |
|     pulse_sens'o     |
|  pulse_sens'o_atex   |
|  remote_temperature  |
| remote_temperature_2 |
|      smartplug       |
|          th          |
|        tics'o        |
|     toran'o_atex     |
|      triphas'o       |
|        vaqa'o        |
|      vaqa'o_lt       |
|     vaqa'o_plus      |
|       ventil'o       |

