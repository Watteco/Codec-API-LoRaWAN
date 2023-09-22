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

<p> Le fichier <code>run_tests.js</code> permet de lancer tous les test jest à la suite.<br>
Il faut aussi le nom du capteur dans la liste <code>devices</code> pour un nouveau capteur<br>
Son execution doit être faite dans le dossier <code>utilities</code>, car le chemin écrit dans le <code>execSync()</code> est relatif à notre positon:</p>

    node run_tests.js

## copy.js 

<p> Le fichier <code>copy.js</code> permet de copier les fichier souhaités de devices a ready_to_use pour tous les capteurs.<br>
On peut rajouter un autre fichier en rajoutant une autre ligne:</p>

    fs.copyFile(source+"/[file]", dest+"/[file]", (err) => {
        if (err) throw err;
        console.log('[file] was copied to destination');
    })

<p>On peut aussi changer de repertoire en modifiant source ou destination. Le chemin est relatif à la position d'exécution, il faut donc ce trouvé dans le répertoire utilities pour que cela fonctionne : </p>

    node run copy.js