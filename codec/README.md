## fonctionnement

<p>On va mettre dans un objet <code>input</code> les paramètres d'entrés, qui seront envoyés à la fonction <code>watteco_decodeUplink()</code></p>

<p>Cette fonction va, dans un premier temps traiter le payload comme si c'était un standard, à l'aide la fonction <code>normalisation()</code> de <strong>standard.js</strong>.<br>
Dans le cas d'un payload standard, on modifie le résultat de <code>Decoder()</code> pour retourner les donnés dans un format souhaité.<br>
Si le payload est en fait un batch, on retourne le payload, qui est envoyé dans la fonction <code>normalisation()</code> de <strong>batch.js</strong>.
De même, on modifie le résultat de <code>brUncompress()</code> pour retourner les donnés dans un format souhaité.</p> 

Les fichiers examples.json contiennent des couples entrée-sortie effectuer avec le codec.<br>



