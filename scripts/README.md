## rebuild.js

Permet de créer le script de build pour un capteur, indiqué dans son package.json :  

```json
    "scripts": {
        "test": "jest --collectCoverage",
        "rebuild": "node ../../scripts/rebuild.js"
    }
```

Dans le dossier d'un capteur :  

```bash
    npm run rebuild
```

Reconstruit le `main.js` du capteur.