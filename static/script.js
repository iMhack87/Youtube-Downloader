const form = document.getElementById('download-form');
const urlInput = document.getElementById('youtube-url');
const submitBtn = document.getElementById('submit-btn');
const btnText = document.querySelector('.btn-text');
const loader = document.querySelector('.loader');
const statusMsg = document.getElementById('status-message');
const downloadAction = document.getElementById('download-action');
const downloadLink = document.getElementById('download-link');

// Elements for the progress bar
const progressContainer = document.getElementById('progress-container');
const progressBarFill = document.getElementById('progress-bar-fill');
const progressText = document.getElementById('progress-text');
let progressInterval;

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = urlInput.value.trim();
    if (!url) return;

    // Reset UI
    statusMsg.className = 'hidden';
    downloadAction.className = 'hidden';
    progressContainer.classList.add('hidden');
    progressBarFill.style.width = '0%';
    progressText.textContent = '0% - Initialisation...';
    if (progressInterval) clearInterval(progressInterval);

    submitBtn.disabled = true;
    btnText.textContent = "Conversion...";
    loader.classList.remove('hidden');

    // Démarrer la fausse barre de progression
    progressContainer.classList.remove('hidden');
    let width = 0;
    progressInterval = setInterval(() => {
        if (width >= 90) {
            progressText.textContent = '90% - Finalisation du fichier MP3...';
            return;
        }
        
        // Incrément aléatoire entre 1 et 4
        const increment = Math.floor(Math.random() * 4) + 1;
        width += increment;
        if (width > 90) width = 90;
        
        progressBarFill.style.width = width + '%';
        
        if (width < 30) {
            progressText.textContent = width + '% - Téléchargement de la vidéo...';
        } else if (width < 60) {
            progressText.textContent = width + '% - Extraction de la piste audio...';
        } else {
            progressText.textContent = width + '% - Conversion au format MP3...';
        }
    }, 600); // 600ms par palier

    try {
        const response = await fetch('/api/download', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            clearInterval(progressInterval);
            progressBarFill.style.width = '100%';
            progressText.textContent = '100% - Terminé !';
            
            // Petit délai pour laisser l'utilisateur voir le "100%"
            setTimeout(() => {
                statusMsg.textContent = "Conversion réussie ! Votre fichier est prêt.";
                statusMsg.className = 'success';
                downloadLink.href = data.download_url;
                downloadAction.classList.remove('hidden');
            }, 600);
        } else {
            clearInterval(progressInterval);
            progressContainer.classList.add('hidden');
            statusMsg.textContent = data.error || "Une erreur est survenue lors de la conversion.";
            statusMsg.className = 'error';
        }
    } catch (err) {
        clearInterval(progressInterval);
        progressContainer.classList.add('hidden');
        statusMsg.textContent = "Erreur de connexion au serveur.";
        statusMsg.className = 'error';
    } finally {
        submitBtn.disabled = false;
        btnText.textContent = "Convertir en MP3";
        loader.classList.add('hidden');
    }
});

function showInstallGuide() {
    const guide = document.getElementById('install-guide');
    guide.classList.toggle('hidden');
}
