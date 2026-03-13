const form = document.getElementById('download-form');
const urlInput = document.getElementById('youtube-url');
const submitBtn = document.getElementById('submit-btn');
const btnText = document.querySelector('.btn-text');
const loader = document.querySelector('.loader');
const statusMsg = document.getElementById('status-message');
const downloadAction = document.getElementById('download-action');
const downloadLink = document.getElementById('download-link');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = urlInput.value.trim();
    if (!url) return;

    // Reset UI
    statusMsg.className = 'hidden';
    downloadAction.className = 'hidden';
    submitBtn.disabled = true;
    btnText.textContent = "Téléchargement & Conversion...";
    loader.classList.remove('hidden');

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
            statusMsg.textContent = "Conversion réussie ! Votre fichier est prêt.";
            statusMsg.className = 'success';
            downloadLink.href = data.download_url;
            downloadAction.classList.remove('hidden');
        } else {
            statusMsg.textContent = data.error || "Une erreur est survenue lors de la conversion.";
            statusMsg.className = 'error';
        }
    } catch (err) {
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
