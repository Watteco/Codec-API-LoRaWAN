## Fonctionnement

On va mettre dans un objet `input` les paramètres d'entrée, qui seront envoyés à la fonction `watteco_decodeUplink()`.  

Cette fonction va, dans un premier temps, traiter le payload comme si c'était un *standard*, à l'aide la fonction `normalisation()` de **standard.js**.  
Dans le cas d'un payload standard, on modifie le résultat de `Decoder()` pour retourner les donnés dans un format souhaité.  
Si le payload est en fait un batch, on retourne le payload, qui est envoyé dans la fonction `normalisation()` de **batch.js**.
De même, on modifie le résultat de `brUncompress()` pour retourner les donnés dans un format souhaité.  
  
Les fichiers examples.json contiennent des couples entrée-sortie obtenus avec le codec.  

## Nomalisation standard

Si `zclheader` existe, on regarde si on a rempli `alarmmess`. Si oui, on on remplace le warning vide par `alarmmess`.

On s'occupe des cas particulier `cmdID` = `01`/`07`/`09`.

Il ne reste que le cas `cmdID` = `0A`. On regarde si on a donné l'`endpoint_corresponder`, et throw une erreur s'il n'y en a pas.
Ensuite, on entre dans une boucle *while* afin de décoder les données tant qu'il y en a. C'est obligatoire car les clusters retournent plusieurs données en un payload.

Selon si l'on souhaite changer l'étiquette retournée par le `Decoder()`, on donnera une liste dans l'objet `endpoint_corresponder` dont le nom sera l'etiquette à remplacer (analog, ...).
Sinon, on donne un objet vide (mais il doit être donné). On peut alors remplir data et warning et retourner dans `watteco_decodeUplink()`.

Si tous les tests au-dessus ne fonctionnent pas, on retourne le payload et le type batch.

## Normalisation batch

On récupère le payload qu'on envoie dans `brUncompress` puis on récupère les données une à une pour remplir une liste qu'on mettra dans data.

## Watteco decodeUplink

L'ensemble des opérations se font dans des *try catch* afin de ne pas faire planter le programme en cas d'erreur, mais de récupérer l'erreur et la retourner dans le champ *error* de la spécification.

## decodeUplink 

La fonction qui se trouve dans le fichier spécifique au capteur.  
Ne sert qu'à appeler la fonction personnalisée qui donne les paramètres supplémentaires nécessaires à certaines fonctionnalités (report batch/remplacement d'étiquette).

## encodeDownlink

La fonction qui permet d'encoder des messages descendants vers le capteur.  
Elle utilise un objet `dlFrames`, présent dans `<capteur>.js` qui contient des templates de trames avec des placeholders pour les valeurs à insérer.
Ces templates suivent le format: `"commande": "trame_hexadecimale<TYPE:parametre>"` où:
- `TYPE` indique le type de donnée (U8, U16, etc.) (Attention : **Pas de U24**)
- `parametre` est le nom du paramètre qui sera fourni dans l'objet d'entrée

Exemple d'utilisation:
```javascript
// Définition du template
const dlFrames = {
    sendMSOMode: "11050013005520<U8:sendMSOMode>"
}

// Utilisation
encodeDownlink({ 
    command: "sendMSOMode", 
    params: { 
        sendMSOMode: 1 
    } 
});
```

### Templates globaux disponibles

En plus des templates spécifiques à chaque capteur, les templates globaux suivants sont disponibles pour tous les capteurs :

- `sendHexFrame` : Permet d'envoyer une trame hexadécimale brute (`"<sendHexFrame>"`). 
  * Particularité : Accepte aussi le format `"hexdata:port"` pour spécifier un port LoRaWAN personnalisé  
    Exemple : `"0102030405:100"` enverra les données `0102030405` sur le port 100
- `sendConfirmedMode` : Configure le mode confirmé (`"11058004000008<U8:sendConfirmedMode>"`)
- `sendReboot` : Redémarre le capteur (`"1150005000"`)
- `sendFactoryReset` : Réinitialise le capteur aux paramètres d'usine (`"1150005007"`)
- `sendLoraRetries` : Configure le nombre de tentatives LoRa (`"1105800400000120<U8:sendLoraRetries>"`)
- `sendLoraRejoin` : Réassocie le capteur après un délai spécifié en minutes (`"1150800400<U16:sendLoraRejoin>"`)

La fonction renvoie le payload encodé prêt à être envoyé au capteur via le réseau LoRaWAN.











