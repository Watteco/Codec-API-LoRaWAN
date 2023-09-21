## utilisation

<p>Le fichier <code>[device].js</code>est le point d'entrée des .js. Il prend un objet <code>input</code> contenant le payload sous forme de liste d'octets converti en décimal, le port et la date de reception.<br>
La sortie est décrite dans le fichier<code>uplink.schema.json</code>.<br>

## webpack

<p>Afin de respecter la contrainte d'un seul fichier final pour le codec, on utilise webpack pour compiler les fichiers en un seul.</p>

<p>Il faut installer webpack cli comme cela:</p>

    npm install webpack webpack-cli --save-dev

<p>On peut alors écrire notre fichier <strong>webpack.config.js</strong>, et l'exécuter comme ceci:</p>

    npx webpack --config webpack.config.js

<p>Il faudra s'assurer que les dossier spécifiés existes.</p>

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

<p>Les test sont fait indirectement avec les fichiers séparé comme le montre le point d'entrée du driver qui est le fichier spécifique au capteur :</p>

    let driver = require("./[captor].js");

<p>Cependant notre packaging webpack crée un fichier main.js qui fonctionne de la même manière.<br>
Cette séparation est dûe à la compression du code dans main.js qui casse les liens logiques entres les fichiers, ainsi que le nom des fonctions ; JEST ne le supporte pas.</p>

## debug

<p>Le fichier <code>debug.js</code> permet d'observer l'entrée et la sortie du codec dans la console.<br>
On l'execute comme un capteur mais en rajoutant l'argument <code>device</code> avant:</p>

    node ./codec/debug.js <device> <port> <payload> <date>

<p>Il execute le .js du device choisit se trouvant dans le dossier <code>devices</code><br>
Si des modifications dans l'arborescance sont effectués, assurez-vous que le chemin d'appel ait encore du sens.</p>

La liste des device est la suivant :

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

## rebuild_mains

<p> Le fichier <code>rebuild_mains.js</code> permet de recompilé le <code>main.js</code> de tous les devices.<br>
Il utilise un script <code>rebuild.js</code> dans le dossier <code>scripts</code>.<br>
On rajoute l'utilisation du script dans le <code>package.json</code> de chaque device, sous le nom rebuild.<br>
Il faut aussi rajouter le nom du capteur dans la liste <code>devices</code><br>
Son execution doit être faite dans le dossier <code>utilities</code>, car le chemin écrit dans le <code>execSync()</code> est relatif à notre positon:</p>

    node rebuild_mains.js

## run_tests

<p> le fichier <code>run_tests.js</code> permet de lancer tous les test jest à la suite.<br>
Il faut aussi le nom du capteur dans la liste <code>devices</code> pour un nouveau capteur<br>
Son execution doit être faite dans le dossier <code>utilities</code>, car le chemin écrit dans le <code>execSync()</code> est relatif à notre positon:</p>

    node run_tests.js
