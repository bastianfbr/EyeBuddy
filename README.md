# 👁️ Eye Buddy

> **Protégez vos yeux avec style.**  
> L'extension Chrome ultime pour appliquer la règle des 20-20-20 et réduire la fatigue visuelle.

![Eye Buddy Overlay](images/overlay.png)

---

## ✨ Pourquoi Eye Buddy ?

Nous passons tous trop de temps devant nos écrans. La fatigue oculaire numérique est réelle.  
**Eye Buddy** est là pour vous rappeler de faire une pause, mais pas n'importe comment : avec une interface **magnifique**, **apaisante** et **moderne**.

### 🚀 Fonctionnalités Clés

*   **⏱️ Règle 20-20-20 Automatisée** : Toutes les 20 minutes, une pause de 20 secondes vous est imposée.
*   **🎨 Design Premium "Dark Plum"** : Une interface sombre et élégante avec des dégradés vibrants Rose/Jaune, inspirée des meilleures apps de méditation.
*   **🌫️ Ambiance Zen** : Un fond animé avec un flou gaussien apaisant pour une immersion totale.
*   **🔔 Notifications Discrètes** : Soyez averti en douceur quand il est temps de reposer vos yeux.
*   **🔒 Règle Stricte** : Pas de configuration complexe, l'extension applique strictement le rythme optimal.
*   **🖱️ Effet Parallax 3D** : L'interface réagit subtilement aux mouvements de votre souris pour un effet de profondeur unique.

---

## 📸 Aperçu du Menu

![Menu Extension](images/extension.png)

Le menu de l'extension (Popup) est votre centre de contrôle rapide :
*   **Pause Immédiate** : Lancez instantanément l'écran de relaxation pour tester l'effet ou prendre une pause volontaire.
*   **Informations** : Accédez à la page explicative sur la règle des 20-20-20.

---

## 🛠️ Installation

Eye Buddy est une extension non publiée sur le Chrome Web Store pour le moment. Vous pouvez l'installer manuellement en mode développeur.

### Prérequis
*   Google Chrome, Brave, Edge ou tout navigateur basé sur Chromium.
*   Git (optionnel, vous pouvez aussi télécharger le ZIP).

### Étapes
1.  **Récupérer le code** :
    *   Via Git :
        ```bash
        git clone https://github.com/bastianfbr/EyeBuddy.git
        ```
    *   Ou téléchargez le code en format ZIP et extrayez-le.

2.  **Charger l'extension** :
    1.  Ouvrez votre navigateur et tapez `chrome://extensions` dans la barre d'adresse.
    2.  Activez le **Mode développeur** (interrupteur en haut à droite).
    3.  Cliquez sur le bouton **"Charger l'extension non empaquetée"** (Load unpacked).
    4.  Sélectionnez le dossier `EyeBuddy` (celui contenant le fichier `manifest.json`).

🎉 **C'est tout !** L'icône Eye Buddy apparaît dans votre barre d'outils et le minuteur démarre automatiquement.

---

## 🛡️ Permissions et Confidentialité

Eye Buddy a besoin de certaines permissions pour fonctionner correctement. Voici pourquoi :

| Permission | Pourquoi ? |
| :--- | :--- |
| **`alarms`** | Pour gérer le minuteur de 20 minutes en arrière-plan de manière fiable. |
| **`storage`** | Pour sauvegarder l'état interne (bien que la configuration soit maintenant fixe). |
| **`notifications`** | Pour vous envoyer une petite alerte système avant que l'écran de pause n'apparaisse. |
| **`scripting`** | Pour injecter l'écran de pause (overlay) sur la page web que vous consultez. |
| **`activeTab`** | Pour interagir uniquement avec l'onglet que vous regardez au moment de la pause. |

**Note de confidentialité** : Eye Buddy ne collecte **aucune donnée personnelle**, ne suit pas votre navigation et fonctionne entièrement hors ligne.

---

## 🧠 Fonctionnement Technique

1.  **Service Worker** : Un script léger tourne en arrière-plan et maintient un chronomètre. Il ne consomme presque aucune ressource.
2.  **Injection Dynamique** : Quand les 20 minutes sont écoulées, le Service Worker injecte temporairement du code (`content.js` et `styles.css`) dans votre onglet actif.
3.  **Overlay** : Ce code crée une superposition HTML (l'écran de pause) par-dessus le site web. Il bloque les interactions pendant 20 secondes pour vous forcer à lâcher la souris.
4.  **Nettoyage** : Une fois le temps écoulé, tout est supprimé proprement de la page.

---

## ⚙️ Technologies

Développé avec ❤️ et les dernières normes web :

*   **Manifest V3** : Pour une sécurité et une performance optimales.
*   **Vanilla JS** : Léger et rapide, sans frameworks lourds.
*   **CSS3 Moderne** : Gradients, Backdrop Filter, Animations, 3D Transforms.

---

## 🤝 Contribuer

Les yeux fatigués du monde entier vous remercieront ! N'hésitez pas à proposer des Pull Requests pour :
*   Ajouter de nouveaux thèmes.
*   Améliorer les exercices de relaxation.
*   Traduire l'extension.

---

*Fait par bastianfbr* 🌟
