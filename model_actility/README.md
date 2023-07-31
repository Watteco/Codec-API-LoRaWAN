# model_actility

## prérequis

<p> il faut avoir installer node.js, npm et jest </p>

## webpack

<p>afin de respecter la contrainte d'un seul fichier final pour le codec, on utilise webpack pour compiler les fichiers en un seul.</p>

<p>il faut installer webpack cli comme cela:</p>

    npm install webpack webpack-cli --save-dev

<p>on peut alors écrire notre fichier <strong>webpack.config.js</strong>, et l'exécuter comme ceci:</p>

    npx webpack --config webpack.config.js

<p>il faudra s'assurer que les dossier spécifiés existes.</p>

## jest

        npm install --save-dev jest

## utilisation

<p> une fois le fichier index.js créé, il est possible de lancer un test automatique d'entrée/sortie écrites dans examples.json</p>
<p>on utilise la commande:</p>
    
        npm run test

<p>le retour montre les test lancer et leur succé/échec</p>

## plus

<p> pour plus d'information :</p>

        https://github.com/actility/device-catalog/blob/main/template/sample-vendor/drivers/README.md