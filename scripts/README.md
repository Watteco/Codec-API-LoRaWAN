## rebuild.js

<p>Permet de créer le script build pour un capteur, indiqué dans son package.json :</p>

    "scripts": {
        "test": "jest --collectCoverage",
        "rebuild": "node ../../scripts/rebuild.js"
    }

<p>Dans le dossier d'un capteur : </p>
    
    npm run rebuild

<p>Reconstruit le <code>main.js</code> du capteur</p>