## Mise à jour codec

S'il faut modifier le codec, la marche à suivre est la suivante: (sujet à évolution)  


### Exemple de modification d'un ou plusieus codecs

Les modifications sont faites dans `../codec/standard.js`, `../codec/batch.js` ou dans les `../devices/[device]/[device].js`. Le cas échéant un nouveau capteur peut être créé en créant le nouveau répertoire dans `../devices`, basé sur le contenu d'un existant.

Il faut ensuite reconstruire et tester le ou les capteurs concernés puis les distribuer. 
Par exemple, pour les différents vaqa'o on lancerait:
```bash
    cd utilities
    node rebuild_mains.js "vaqa.*"
    node run_tests.js "vaqa.*"
    node copy.js "vaqa.*"
```

Il est alors possible de le déployer sur un fork d'actility avec:
```bash
    node actility_deployement.js <watteco-path> <actility-path> "vaqa.*"
```

Voir les chapitres suivants pour distribution `TTN` et `npm`.

### build mains

On lance `rebuild_mains.js` [ici](#rebuild-mains).

### jest tests

On lance `run_tests.js` [ici](#run-tests) pour lancer les tests jest sur chaque capteur l'un après l'autre, il plante au premier capteur ayant un payload qui ne fonctionne pas.  
c'est là qu'on se sert de `debug.js` [ici](#debug) afin de tester le payload, puis mettre à jour `examples.json`. 

Si on rencontre un problème entre le decoder et la normalisation, il faudra log des étapes intermédiaires dans le cœur du codec et on utilisera `debug_in.js` [ici](#debug-in).

### déploiement

#### distrib

On exécute `copy.js` [ici](#copy).

#### actility

On doit effectuer un fork de la main branch d'actility dans laquelle on modifie les fichiers javascript du codec dans devices et les fichiers javascript spécifiques dans le dossier `[device]_v4`, ainsi que `example.json`.  
On push et on ouvre une pull-request une fois sûr que le tout fonctionne.
Le script `actility_deployement.js` facilite cela [ici](#actility-deployement).

Application repository on Actility: https://github.com/actility/device-catalog/tree/main/vendors/watteco  

#### ttn

On doit effectuer un fork de la branche `main` de ttn, puis il suffit de remplacer le `[device].js` par le `main.js`, qu'il faut renommer.  
On push et on ouvre une pull-request une fois sûr que le tout fonctionne.

Application repository on TTN: https://github.com/TheThingsNetwork/lorawan-devices/tree/master/vendor/watteco

#### npm

On se connecte avec le compte watteco :

```bash 
    npm login
```

Pour la première publication (après avoir fait un `package.json` correct. [→ voir ici](https://github.com/actility/device-catalog/blob/main/template/sample-vendor/drivers/README.md#packaging)) :

```bash
    npm publish
```

Si le package existe déjà sur le compte watteco, il faut faire une nouvelle révision (patch/minor/major):

```bash
    npm version <révision>
```

On peut ensuite refaire un publish.

Pour télécharger le package, on fait :

```bash
    npm install <npm-package>
```

La liste des packets npm est disponible [ici](/distrib/README.md#npm) ou sur [la liste sur le site npm](https://www.npmjs.com/~watteco).

## debug

Le fichier `debug.js` permet d'observer l'entrée et la sortie du codec dans la console.  
On l'exécute comme un capteur, mais en rajoutant l'argument `device` avant :  

```bash
    node ./debug.js <device> <port> <payload> <date>
```

Il exécute le fichier javascript du capteur choisit se trouvant dans le dossier `distrib`.  
Si des modifications dans l'arborescance sont effectués, assurez-vous que le chemin d'appel ait encore du sens. 
Pensez à encadrer les noms de répertoire contenant des caractères spéciaux entre double cotes. Ex: "vaqa'o" 


## debug in

Le fichier `debug.js` permet d'observer l'entrée et la sortie du codec dans la console.  
On l'exécute comme un capteur, mais en rajoutant l'argument `device` avant:  

```bash
    node ./debug_in.js <device> <port> <payload> <date>
```

Il exécute le .js du capteur choisit se trouvant dans le dossier `devices`.  
Si des modifications dans l'arborescance sont effectués, assurez-vous que le chemin d'appel ait encore du sens.  
Pensez à encadrer les noms de répertoire contenant des caractères spéciaux entre double cotes. Ex: "vaqa'o" 


## rebuild mains

Le fichier `rebuild_mains.js` permet de recompiler le `main.js` d'un ou plusieurs device(s) (sans option c'est tous). 
Il utilise un script `rebuild.js` dans le dossier `scripts`.  
On rajoute l'utilisation du script dans le `package.json` de chaque device, sous le nom *rebuild*.  
Il faut aussi rajouter le nom du capteur dans la liste `_constansts.js.devices`.  
Son execution doit être faite dans le dossier `utilities`, car le chemin écrit dans le `execSync()` est relatif à notre positon : 

```bash
    node rebuild_mains.js [<devices_to_process>]
```

## run tests

Le fichier `run_tests.js` permet de lancer le s tests d'un ou plusieurs device(s) (sans option c'est tous) 
Il faut aussi rajouter le nom du capteur dans la liste `_constansts.js.devices` pour un nouveau capteur.  
Son execution doit être faite dans le dossier `utilities`, car le chemin écrit dans le `execSync()` est relatif à notre positon :  

```bash
    node run_tests.js [<devices_to_process>]
    where
    <devices_to_process>: Regular expression like "vaqao*" or "flash'o|intens'o|vaqa'o" or "Vaqao*|flash'o"
```

## copy

Le fichier `copy.js` permet de copier les fichiers souhaités de devices à distrib pour un ou plusieurs device(s) (sans option c'est tous)  
On peut rajouter un autre fichier en rajoutant une autre ligne :  

```javascript
    fs.copyFile(source+"/[file]", dest+"/[file]", (err) => {
        if (err) throw err;
        console.log('[file] was copied to destination');
    })
```

On peut aussi changer de répertoire en modifiant *source* ou *destination*. Le chemin est relatif à la position d'exécution, il faut donc se trouver dans le répertoire `utilities` pour que cela fonctionne :  

```bash
    node copy.js [<devices_to_process>]
    where
    <devices_to_process>: Regular expression like "vaqao*" or "flash'o|intens'o|vaqa'o" or "Vaqao*|flash'o"
```

## install dependencies

Permet d'installer *webpack*, *webpack-cli* et *jest* pour chaque capteur sans le faire à la main :

```bash
    node install_dependencies.js 
```

## actility deployement

Il faut donner le chemin **absolu** du repo watteco puis celui du fork actility sur votre machine :
Un ou plusieurs device(s) peuvent être déployés (sans option c'est tous).

```bash
    node actility_deployement <watteco-path> <actility-path> [<devices_to_process>]
    where
    <devices_to_process>: Regular expression like "vaqao*" or "flash'o|intens'o|vaqa'o" or "Vaqao*|flash'o"
```

Une liste d'équivalences `actility_devices` est définie par la fonction `getDevices()` du fichier `_CommonTools.js`. Elle est imposée par le changement de nom qu'a fait actility sur certains dossiers (ex: `outdoor-temperature`). 