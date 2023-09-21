# Codec-API-LoRaWAN
Codec javascript compatible with the API LoRaWAN specification

## dépendances

- nodejs
- npm
- webpack-cli

## codec

<p>La construction de ce codec vise à respecter la spécification ts013-1.0.0 de la lora alliance que vous trouverez ici:<br>
 https://resources.lora-alliance.org/document/ts013-1-0-0-payload-codec-api </p>

## clusters examples

<p>Le dossier contient des payloads d'exemple rangés par cluster<br>
<code>examples_0_common</code> est la concaténation d'un exemple des cluster 0x0000, 0x0050 et 0X8004<br>
Les command_id 07 et 09 ont un retour différent car ils contiennent l'objet <code>report_parameters</code></p>

## ready_to_use

<p>Contient le fichier compréssé équivalent au codec en plusieurs fichiers, plus le fichier spécifique au capteur</p>

## scripts

<p>Contient les scripts permettant d'automatiser certaines tâches dût à la modification du codec.</p>

## utilities

<p>Plusieurs programmes permettant de simplifier certaines tâches</p>