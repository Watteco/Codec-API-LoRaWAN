## Mise à jour codec

<p>S'il faut changer le codec, la marche à suivre est la suivante: (sujet à évolution)</p>

### Changement du cœur du codec

<p>La plupart du temps le changement sera dans <code>standard.js</code> ou le <code>[device].js</code></p>

### build mains

On lance <code>rebuild_mains.js</code> [ici](#rebuild-mains).

### jest tests

On lance <code>run_tests.js</code> [ici](#run-tests) pour lancer les tests jest sur chaque capteur l'un après l'autre, il plante au premier capteur ayant un payload qui ne fonctionne pas.<br>
c'est là qu'on se sert de <code>debug.js</code> [ici](#debug) afin de tester le payload, puis mettre à jour <code>examples.json</code>. 

Si on rencontre un problème entre le decoder et la normalisation, il faudra log des étapes intermédiaires dans le cœur du codec et on utilisera <code>debug_in.js</code> [ici](#debug-in)

### déploiement

#### actility

On doit effectuer un fork de la main branch d'actility dans laquelle on modifie les .js du codec dans devices et les .js spécifique dans le dossier <code>[device]_v4</code>, ainsi que <code>example.json</code>.<br>
On push et on ouvre une pull request une fois sûr que le tout fonctionne.

#### ttn

On doit effectuer un fork de la main branch de ttn, puis il suffit de remplacer le <code>[device].js</code> par le <code>main.js</code>, qu'il faut renommer.<br>
On push et on ouvre une pull request une fois sûr que le tout fonctionne.

## debug

<p>Le fichier <code>debug.js</code> permet d'observer l'entrée et la sortie du codec dans la console.<br>
On l'exécute comme un capteur, mais en rajoutant l'argument <code>device</code> avant:</p>

    node ./codec/debug.js <device> <port> <payload> <date>

<p>Il exécute le .js du capteur choisit se trouvant dans le dossier <code>distrib</code><br>
Si des modifications dans l'arborescance sont effectués, assurez-vous que le chemin d'appel ait encore du sens.</p>

La liste des device est la suivante :

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

## debug in

<p>Le fichier <code>debug.js</code> permet d'observer l'entrée et la sortie du codec dans la console.<br>
On l'exécute comme un capteur, mais en rajoutant l'argument <code>device</code> avant:</p>

    node ./codec/debug_in.js <device> <port> <payload> <date>

<p>Il exécute le .js du capteur choisit se trouvant dans le dossier <code>devices</code><br>
Si des modifications dans l'arborescance sont effectués, assurez-vous que le chemin d'appel ait encore du sens.</p>

La liste des device est la suivante :

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

## rebuild mains

<p> Le fichier <code>rebuild_mains.js</code> permet de recompilé le <code>main.js</code> de tous les devices.<br>
Il utilise un script <code>rebuild.js</code> dans le dossier <code>scripts</code>.<br>
On rajoute l'utilisation du script dans le <code>package.json</code> de chaque device, sous le nom rebuild.<br>
Il faut aussi rajouter le nom du capteur dans la liste <code>devices</code><br>
Son execution doit être faite dans le dossier <code>utilities</code>, car le chemin écrit dans le <code>execSync()</code> est relatif à notre positon:</p>

    node rebuild_mains.js

## run tests

<p> Le fichier <code>run_tests.js</code> permet de lancer tous les test jest à la suite.<br>
Il faut aussi le nom du capteur dans la liste <code>devices</code> pour un nouveau capteur<br>
Son execution doit être faite dans le dossier <code>utilities</code>, car le chemin écrit dans le <code>execSync()</code> est relatif à notre positon:</p>

    node run_tests.js

## copy

<p> Le fichier <code>copy.js</code> permet de copier les fichiers souhaités de devices à distrib pour tous les capteurs.<br>
On peut rajouter un autre fichier en rajoutant une autre ligne :</p>

    fs.copyFile(source+"/[file]", dest+"/[file]", (err) => {
        if (err) throw err;
        console.log('[file] was copied to destination');
    })

<p>On peut aussi changer de repertoire en modifiant source ou destination. Le chemin est relatif à la position d'exécution, il faut donc ce trouvé dans le répertoire utilities pour que cela fonctionne : </p>

    node copy.js

## install dependencies

permet d'installer webpack, webpack-cli et jest pour chaque capteur sans le faire à la main

    node install_dependencies.js 