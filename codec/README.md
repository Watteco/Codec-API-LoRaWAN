# prérequis

<p> il faut avoir installer node.js </p>
<p> il est possible qu'au clonage du projet, la fonctionnalité model de node ne fonctionne pas (<code>model</code> sera souligné en jaune).<br>
c'est ce qui permet de faire le lien entre les différents fichier de codec, il faut alors aller en bas de standard_minimized.js pour demander à l'IDE d'activer les fonctionnalités node en passant sur <code>model</code>. </p>

# utilisation

<p> pour utiliser le codec, il faut lancer le fichier <code>decode_minimized.js</code> avec node.js. </p>
<p> pour cela, il faut se placer dans le dossier codec et lancer la commande suivante : </p>

        node .\captor_minimized.js

<p>s'il ne se passe rien, alors les lien entre les fichier fonctionne, on peut alors observer le fonctionnement en lançant le fichier <code>debug.js</code> avec node.js. </p>
<p> pour cela, il faut se placer dans le dossier codec et lancer la commande suivante : </p>

        node .\debug.js 125 118A0402000029075590B0B1 2023-07-19T07:51:25.508306410Z 

<p> le premier argument est le port, le deuxième est la trame en hexadécimal et le troisième est la date de réception de la trame. </p>
<p> le retour affiche plusieurs informations, tout en haut l'entrée <code>input</code>, on à ensuite le retoure de <code>Decoder()</code> qui est utilisé pour le retour final attendu par la spécification TS013-1.0.0</p>
<p>il est possible que d'autres information soient affichées selon les test effectuer pour le dernier push </p>

# fonctionnement

<p> le fichier <code>debug.js</code> est un exemple d'utilisation du codec, il permet de voir le fonctionnement du codec. </p>
<p> le fichier <code>decode_minimized.js</code> est le fichier qui sera utilisé pour le décodage des trames. </p>
<p> le fichier <code>standard_minimized.js</code> est le fichier qui contient les fonctions de décodage des trames standard. </p>
<p> le fichier <code>batch_minimized.js</code> est le fichier qui contient les fonctions de décodage des trames batch. </p>

<p> la trame est systématiquement traité comme un trame standard au départ ; s'il s'avère que c'est une trame batch, le retour est un objet précisant sa nature et redonnant la trame d'entrée qui sera traiter par <code>brUncompress()</code></p>