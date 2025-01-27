## Procédure générale de mise à jour de codec(s)

S'il faut modifier un codec (création, correctif, amélioration,...), la marche à suivre est, en général, la suivante: 

### Edition du (des) codec(s) Watteco:

- Si besoin créer le nouveau répertoire dans `../devices/[nouveau]`, basé sur le contenu d'un existant.

- On créé ou modifie les sources nécessaires pour le (ou les) sources et capteur(s) concerné(s):

  - Sources javascript commun: `../codec/standard.js`, `../codec/batch.js` ou `codec\decode_uplink.js`.
  - Sources javascript capteur: `../devices/[device]/[device].js`.
  - Sources recopiés (sans modificaion): (`.gitignore, driver-examples.spec.js, driver-build-examples.spec.js, package-lock.json`).
  - Sources recopiés et modifiés: (`.npmignore, examples.json, package.json`).
  - Image produit: (`*.png` fond transparent).

- Reconstruire et tester le ou les capteurs concernés puis les distribuer. 

  Par exemple, pour une mise à jour concernant les différents vaqa'o on lancerait:
  
```bash
  cd utilities
  node rebuild_mains.js "vaqa.*" [-v patch]
  # L'option -v ne doit être utilisée que lorsqu'on est certain de vouloir faire évoluer la version du package.son
  node run_tests.js "vaqa.*"
```

### Distribution/déploiement du (des) codec(s) validés

- Distribuer le référentiel Watteco *(suivi d'un commit/push sur le référentiel)*
```bash
  node watteco_deployment.js .. "vaqa.*"
```

- Déployer pour NPM *(après login npm sur compte watteco)*:

  *Note: Lors d'un déploiement NPM il faut penser à avoir fait évoluer les versions (Cf. rebuild_main.js -v)*
```bash
  node npm_deployment.js .. "vaqa.*"
```

- Déployer pour ACTILITY *(sur un fork du référentiel actility, et suivi d'un pull request pour Actility)*:
  
  *Note: En cas de création du codec pour un nouveau capteur on créé/copie sa structure (watteco/models/[device]/ et watteco/drivers[device]/) à parir d'un modèle équivalent*
```bash
  node actility_deployment.js .. <actility-fork-path> "vaqa.*"
```

- Déployer pour TTN *(sur un fork du référentiel TTN, et suivi d'un pull request pour TTN)*:
  ```bash
   node ttn_deployment.js .. <ttn-fork-path> "vaqa.*"
  ```
  *Notes:*
  - L'utilitaire de déploiement ne fait QUE la mise à jour des fichiers `device.js` et `*.png` dans le fork TTN
  - En cas de création du codec pour un nouveau capteur on créé/copie sa structure (watteco/[device]/*.*) à parir d'un modèle équivalent puis on adapte tous les fichiers yaml*
  - La ligne suivante créée les YAML àpartir des JSON examplescela peut aider pour l'intégration d'example dans les fichier device-codec.yaml de TTN :
  ```bash
    for dir in ../devices/*/; do   (echo $dir; cd "$dir" && node ../../exampleJSONtoYAML.js); done
  ```

**ATTENTION:** 
- Avant d'exploiter les commandes de déploiements décrites ci-avant, il faut créer ou maintenir "manuellement" différents fichiers "descriptifs" des modèles de capteur ou Driver en conformité avec les modèles ou driver dèjà existants dans les référentiels cible TTN et actility.
  - *Actility* :  
    - `vendors/watteco/models/[device]/model.yaml`
    - `vendors/watteco/drivers/[device]/(.gitignore, .npmignore, driver-examples.spec.js, driver.yaml, package.json, package-lock.json)`
  - *TTN* :  
    - `vendor/watteco/index.yaml`
    - `vendor/watteco/[device]-codec.yaml`
    - `vendor/watteco/[device]-profile.yaml`
    - `vendor/watteco/[device].yaml`

## Référentiels concernés

### Référentiel watteco ([ici](https://github.com/Watteco/Codec-API-LoRaWAN.git))
Il s'agit du présent référentiel.
Il contient les pricipaux sources communs à tous les driver de capteurs. Ainsi ques-uns des fichiers utilisés pour la descriptions des package.

Le répertoire `distrib` contient les 4 principaux fichier conformes au standard [TS013-1.0.0](https://resources.lora-alliance.org/technical-specifications/ts013-1-0-0-payload-codec-api) tel que défini par l'aliance LoRaWAN.

Le script `watteco_deployment.js` permet de produire/mettre à kjour le répertoire distrib.

On push une fois sûr que le tout fonctionne.


### Référentiel actility ([ici](https://github.com/actility/device-catalog.git))

On doit effectuer un fork de la main branch d'actility dans laquelle on modifie les fichiers dans les sous-répertoire:
- device-catalog\vendors\watteco\drivers
- device-catalog\vendors\watteco\models

Le script `actility_deployment.js` facilite cela [ici](#actility-deployment).

On push et on ouvre une pull-request une fois sûr que le tout fonctionne.

*Watteco on Actility repository: /vendors/watteco*

### Référentiel ttn ([ici](https://github.com/TheThingsNetwork/lorawan-devices.git))

Pour pouvoir livrer TTN il faut effectuer un fork de la branche `main` de ttn, puis il faut mettre à jour le `[device].js` à patir du `main.js` du référentiel Watteco.

Le script `actility_deployment.js` facilite cela [ici](#actility-deployment).

On push et on ouvre une pull-request une fois sûr que le tout fonctionne.

*Watteco on TTN repository: vendor/watteco*

### Référentiel npm ([ici](https://www.npmjs.com/~watteco))


## Utilitaires disponibles

### debug

Le fichier `debug.js` permet d'observer l'entrée et la sortie du codec dans la console.  
On l'exécute comme un capteur, mais en rajoutant l'argument `device` avant :  

```bash
    node ./debug.js <device> <port> <payload> <date>
```

Il exécute le fichier javascript du capteur choisit se trouvant dans le dossier `distrib`.  
Si des modifications dans l'arborescance sont effectués, assurez-vous que le chemin d'appel ait encore du sens. 
Pensez à encadrer les noms de répertoire contenant des caractères spéciaux entre double cotes. Ex: "vaqa'o" 


### debug in

Le fichier `debug.js` permet d'observer l'entrée et la sortie du codec dans la console.  
On l'exécute comme un capteur, mais en rajoutant l'argument `device` avant:  

```bash
    node ./debug_in.js <device> <port> <payload> <date>
```

Il exécute le .js du capteur choisit se trouvant dans le dossier `devices`.  
Si des modifications dans l'arborescance sont effectués, assurez-vous que le chemin d'appel ait encore du sens.  
Pensez à encadrer les noms de répertoire contenant des caractères spéciaux entre double cotes. Ex: "vaqa'o" 


### rebuild mains

Le fichier `rebuild_mains.js` permet de recompiler le `main.js` d'un ou plusieurs device(s) (sans option c'est tous les devices). 
Il utilise un script `rebuild.js` dans le dossier `scripts`.  
La liste des devices traités dépend des sous-répertoire de `devices` et du `<devices_filter>` utilisé. 
On rajoute l'utilisation du script dans le `package.json` de chaque device, sous le nom *rebuild*.  
Son execution doit être faite dans le dossier `utilities`, car le chemin écrit dans le `execSync()` est relatif à notre positon : 
L'option facultative -v (--version) permet de faire évoluer la version du package et metadata.
```bash
    node rebuild_mains.js [<devices_filter>] [-v|--version [patch|minor|major|x.y.z)]]
```

### run tests

Le fichier `run_tests.js` permet de lancer le s tests d'un ou plusieurs device(s) (sans option c'est tous les devices)
La liste des devices traités dépend des sous-répertoire de `devices` et du `<devices_filter>` utilisé. 
Son execution doit être faite dans le dossier `utilities`, car le chemin écrit dans le `execSync()` est relatif à notre positon :  

```bash
    node run_tests.js [<devices_filter>]
    where
    <devices_to_process>: Regular expression like "vaqao*" or "flash'o|intens'o|vaqa'o" or "Vaqao*|flash'o"
```

### watteco deployment

Le fichier `watteco_deployment.js` permet de copier différents fichiers de devices à distrib pour un ou plusieurs device(s) (sans option c'est tous)  
Cet utilitaire va aussi ajouter le fichier de synthèse de tous les codec disponibles: DRIVERS.md. Ce fichier est construit à partir du fichier Clusters.json et de tous les fichiers <devices>/*/ClustersVariables.json

```bash
    node watteco_deployment.js [<devices_filter>]
    where
    <devices_to_process>: Regular expression like "vaqao*" or "flash'o|intens'o|vaqa'o" or "Vaqao*|flash'o"
```

### actility_deployment

Il faut donner le chemin **absolu** du repo watteco puis celui du fork actility sur votre machine :
Un ou plusieurs device(s) peuvent être déployés (sans option c'est tous).

```bash
    node actility_deployment <watteco-path> <actility-path> [<devices_filter>]
    where
    <devices_filter>: Regular expression like "vaqao*" or "flash'o|intens'o|vaqa'o" or "Vaqao*|flash'o"
```

**NOTA: **
Une liste d'équivalences `actility_devices` est définie par la fonction `getDevices()` du fichier `_CommonTools.js`. Elle est imposée par le changement de nom qu'a fait actility sur certains dossiers (ex: `outdoor-temperature`). 


### ttn_deployment

Il faut donner le chemin **absolu** du repo watteco puis celui du fork TTN sur votre machine :
Un ou plusieurs device(s) peuvent être déployés (sans option c'est tous).

```bash
    node ttn_deployment <watteco-path> <actility-path> [<devices_filter>]
    where
    <devices_filter>: Regular expression like "vaqao*" or "flash'o|intens'o|vaqa'o" or "Vaqao*|flash'o"
```

**NOTA: **
Une liste d'équivalences `ttn_devices` est définie par la fonction `getDevices()` du fichier `_CommonTools.js`. Elle est imposée par le changement de nom que requiert TTN sur sur les noms de produits. 

### install dependencies

Permet d'installer *webpack*, *webpack-cli*, *jest*, *babel* et *js-yaml* nécessaires au développement et déploiement des codecs watteco :

L'installation des nodes-modules se fait au niveau du répertoire principal afin d'éviter la duplication de tous les modules dans les sous-repertoires Devices/*.
Les packages.json individuels des capteurs, ne nécessitent qu'une sous-partie de ces modules (*webpack*, *webpack-cli*, *jest*).

```bash
    node install_dependencies.js 
```