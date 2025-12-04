# Eye Buddy

Eye Buddy est une extension Google Chrome conçue pour réduire la fatigue visuelle en appliquant la règle des 20-20-20.

## Fonctionnalités

- **Règle 20-20-20** : Toutes les 20 minutes, une pause de 20 secondes est imposée.
- **Overlay Bloquant** : Un écran rouge/orange apparaît pour vous forcer à détourner le regard.
- **Notifications** : Une notification système vous avertit du début de la pause.
- **Configuration** : Personnalisez les durées de travail et de pause via la page d'options.
- **Arrière-plan** : Fonctionne même si le navigateur est minimisé grâce au Service Worker.

## Installation

1. Clonez ce dépôt.
2. Ouvrez Google Chrome et allez sur `chrome://extensions`.
3. Activez le "Mode développeur" (en haut à droite).
4. Cliquez sur "Charger l'extension non empaquetée".
5. Sélectionnez le dossier du projet `EyeBuddy`.

## Structure du Projet

- `manifest.json` : Configuration de l'extension (Manifest V3).
- `service-worker.js` : Script d'arrière-plan pour la gestion du minuteur.
- `content.js` : Script injecté dans les pages pour afficher l'overlay.
- `styles.css` : Styles de l'overlay.
- `options.html` / `options.js` : Page de configuration.
- `popup.html` / `popup.js` : Popup de l'extension.

## Technologies

- HTML, CSS, JavaScript
- Chrome Extension API (Manifest V3)
