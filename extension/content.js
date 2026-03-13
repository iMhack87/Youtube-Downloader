function addDownloadButton() {
    // Check if the button already exists
    if (document.getElementById('yt2mp3-ext-btn')) return;

    // YouTube's action buttons container (under the video player)
    const subscribeButtonContainer = document.querySelector('#owner'); // Next to owner
    const menuContainer = document.querySelector('#top-level-buttons-computed'); // The like/dislike row

    const container = menuContainer || subscribeButtonContainer;

    if (!container) return;

    const btn = document.createElement('button');
    btn.id = 'yt2mp3-ext-btn';
    btn.innerText = '🎵 Télécharger MP3';
    btn.style.backgroundColor = '#8b5cf6';
    btn.style.color = 'white';
    btn.style.border = 'none';
    btn.style.borderRadius = '18px';
    btn.style.padding = '0 16px';
    btn.style.height = '36px';
    btn.style.fontSize = '14px';
    btn.style.fontWeight = '500';
    btn.style.cursor = 'pointer';
    btn.style.margin = '0 8px';
    btn.style.fontFamily = 'Roboto, Arial, sans-serif';
    btn.style.display = 'flex';
    btn.style.alignItems = 'center';

    btn.addEventListener('click', () => {
        const videoUrl = window.location.href;
        // Open the app exposed on the production server with the prefilled URL
        const endpoint = `https://ytb.akiraa.xyz/?url=${encodeURIComponent(videoUrl)}`;
        window.open(endpoint, '_blank');
    });

    container.appendChild(btn);
}

// Observe DOM changes for SPA navigation on YouTube
const observer = new MutationObserver((mutations) => {
    if (window.location.href.includes('watch?v=')) {
        addDownloadButton();
    }
});

observer.observe(document.body, { childList: true, subtree: true });

// Initial check when loading a video directly
if (window.location.href.includes('watch?v=')) {
    setTimeout(addDownloadButton, 2000);
}
