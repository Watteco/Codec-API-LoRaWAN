## Sommaire des Readme
 - Fonctionnement des codecs → [/codec/README.md](/codec/README.md)
 - Explication des fichiers codec et de JEST → [/devices/README.md](/devices/README.md)
 - Tutoriel d'utilisation (plus [tuto NodeRED](/distrib/README.md#utilisation-de-lapi-codec-watteco-avec-nodered-130)) → [/distrib/README.md](/distrib/README.md#français)
 - Description de `rebuild.js` pour créer les scripts de build → [/scripts/README.md](/scripts/README.md)
 - Tutoriel de mise à jour du codec → [/utilities/README.md](/utilities/README.md)

# Codec-API-LoRaWAN
Javascript codec compatible with the [LoRaWAN API specification](https://resources.lora-alliance.org/home/ts013-1-0-0-payload-codec-api)

Application repository on Actility: https://github.com/actility/device-catalog/tree/main/vendors/watteco  
Application repository on TTN: https://github.com/TheThingsNetwork/lorawan-devices/tree/master/vendor/watteco

## Dépendances à installer sur la machine

- nodejs/npm: https://nodejs.org/en/download
- lancer le script `install_dependencies.js` dans le répertoire utilities : 

```bash
    node install_dependencies.js
```

## Utilisation

On suivra la démarche décrite dans [le README.md du répertoire utilities](/utilities/README.md) si l'on souhaite modifier le codec.

## Codec

La construction de ce codec vise à respecter la [spécification ts013-1.0.0](https://resources.lora-alliance.org/home/ts013-1-0-0-payload-codec-api) de la lora alliance que vous trouverez ici:  

https://resources.lora-alliance.org/document/ts013-1-0-0-payload-codec-api  

## Devices

Contient le fichier javascript spécifique à un capteur, ainsi que le nécessaire pour tester des payload que l'on sait fonctionnels si on modifie le codec.  

## Clusters_examples

Le dossier contient des payloads d'exemple rangés par cluster  
`examples_0_common` est la concaténation d'un exemple des clusters 0x0000, 0x0050 et 0X8004  
Les command_id 07 et 09 ont un retour différent car ils contiennent l'objet `report_parameters`  

## Distrib

Contient le fichier compréssé équivalent au codec en plusieurs fichiers, plus le fichier spécifique au capteur.  

## Scripts

Contient les scripts permettant d'automatiser certaines tâches dues à la modification du codec..  

## Utilities

Plusieurs outils permettant de simplifier certaines tâches.  
