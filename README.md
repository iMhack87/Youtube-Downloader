# Youtube2MP3 Downloader 🎵

[![Python Flask](https://img.shields.io/badge/Python-Flask-blue?logo=flask)](https://flask.palletsprojects.com/)
[![Docker Compose](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker)](https://docs.docker.com/compose/)
[![YT-DLP](https://img.shields.io/badge/YT--DLP-Nightly-red?logo=youtube)](https://github.com/yt-dlp/yt-dlp)

Youtube2MP3 Downloader est une application web élégante et containerisée permettant de télécharger et convertir des vidéos YouTube en fichiers MP3 de haute qualité en un seul clic !

Ce projet inclut également une **Extension de navigateur (Chrome/Firefox)** pour ajouter un bouton direct de conversion sur l'interface vidéo YouTube.

Développé initialement par **[ZEF Computers](https://www.zefcomputers.com)**.

---

## ⚠️ Avertissement Légal
**À LIRE AVANT UTILISATION :**
Ce logiciel est fourni à des fins purement **éducatives et strictement personnelles**. En l'installant ou en l'utilisant, vous vous engagez à respecter les conditions d'utilisation des plateformes concernées. Vous ne devez utiliser cet outil **que pour télécharger du contenu libre de droits** ou dont **vous possédez explicitement les droits d'auteur**. Le système d'extraction vidéo ne doit en aucun cas servir au piratage d'œuvres protégées. Les créateurs de ce dépôt déclinent toute responsabilité en cas d'utilisation illicite.

---

## ✨ Fonctionnalités
- **Interface Premium** : Design en "Glassmorphism" moderne et épuré.
- **Auto-nettoyage** : Les fichiers ne saturent pas votre serveur (suppression automatique au bout de 10 min).
- **Contournement Bot/Captcha de Youtube** : Utilisation des mécanismes les plus récents (clients TV/iOS et OAuth2).
- **Extension Naviguateur incluse** : Téléchargez le ficher `extension.zip` depuis l'interface web et ajoutez un bouton `🎵 Télécharger MP3` sur toutes les pages de lecture YouTube.
- **Dockerisé** : Déploiement ultra rapide.

---

## 🚀 Installation & Déploiement (Docker)

### Étape 1 : Le `docker-compose.yml`
Placez ce dépôt dans le dossier défini par `build` (ici `./Youtube Downloader`).

```yaml
version: '3.8'

services:
  youtube-downloader:
    build: "./Youtube Downloader"
    container_name: youtube-downloader
    ports:
      - "8082:8082"
    restart: unless-stopped
```

### Étape 2 : Lancer le build

```bash
docker-compose build --no-cache
docker-compose up -d
```
L'interface est maintenant accessible sur **[http://localhost:8082](http://localhost:8082)**.

### Étape 3 : Authentification initiale API YouTube (OAuth2)
Pour éviter tout blocage "bot" ("Sign in to confirm you're not a bot") de la part de YouTube, le serveur Docker est équipé du module OAuth2.

Lors du **tout premier téléchargement**, la démarche va sembler "bloquée" sur l'interface (chargement infini). C'est normal !

1. Ouvrez le terminal de votre serveur Docker :
   ```bash
   docker logs -f youtube-downloader
   ```
2. Vous devriez y voir un message comme :
   `To give yt-dlp access to your account, go to https://www.google.com/device and enter code XXX-YYY-ZZZ`
3. Allez sur le lien depuis votre téléphone ou PC, entrez le code, et connectez-vous avec un compte Google.
4. Le téléchargement se débloquera immédiatement, et tous vos futurs téléchargements MP3 fonctionneront instantanément et indéfiniment sans manipulation de cookies !

---

## 🧩 Installation de l'Extension

Depuis l'interface web du Downloader, cliquez sur **Télécharger l'extension**.

**Sur Google Chrome :**
1. Extrayez le fichier `extension.zip`.
2. Allez dans `chrome://extensions/`.
3. Cochez **Mode Développeur** en haut à droite.
4. Cliquez sur **Charger l'extension non empaquetée** et sélectionnez le dossier extrait.
5. Allez sur Youtube : un nouveau bouton violet sera présent !

*(Note : Assurez-vous d'héberger le service Youtube2MP3 localement ou modifiez le fichier `content.js` de l'extension avec votre URL publique `https://...`)*.
