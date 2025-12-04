// content.js

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'SHOW_OVERLAY') {
        showOverlay();
    }
});

function showOverlay() {
    // Check if overlay already exists
    if (document.getElementById('eye-buddy-overlay')) return;

    chrome.storage.sync.get(['restDuration'], (result) => {
        const restDuration = result.restDuration || 20;
        createOverlay(restDuration);
    });
}

function createOverlay(duration) {
    const overlay = document.createElement('div');
    overlay.id = 'eye-buddy-overlay';

    overlay.innerHTML = `
    <div id="eye-buddy-content">
      <div id="eye-buddy-title">Pause Visuelle</div>
      <div id="eye-buddy-message">Regardez un objet à 6 mètres pendant 20 secondes.</div>
      <div id="eye-buddy-timer">${duration}</div>
      <button id="eye-buddy-skip">Passer</button>
    </div>
  `;

    document.body.appendChild(overlay);

    let timeLeft = duration;
    const timerElement = document.getElementById('eye-buddy-timer');

    const interval = setInterval(() => {
        timeLeft--;
        if (timerElement) timerElement.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(interval);
            removeOverlay();
        }
    }, 1000);

    // Skip button functionality
    document.getElementById('eye-buddy-skip').addEventListener('click', () => {
        clearInterval(interval);
        removeOverlay();
    });
}

function removeOverlay() {
    const overlay = document.getElementById('eye-buddy-overlay');
    if (overlay) {
        overlay.remove();
    }
}
