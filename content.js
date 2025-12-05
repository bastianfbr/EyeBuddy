// content.js

if (!window.eyeBuddyInitialized) {
    window.eyeBuddyInitialized = true;

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === 'SHOW_OVERLAY') {
            showOverlay();
        }
    });
}

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

    // Get current time
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    overlay.innerHTML = `
    <div id="eye-buddy-content">
      <div id="eye-buddy-time-display">Il est ${timeString}</div>
      <div id="eye-buddy-title">Détendez vos yeux</div>
      <div id="eye-buddy-message">Regardez au loin, détendez-vous et respirez jusqu'à la fin du compte à rebours.</div>
      <div id="eye-buddy-timer">00:${duration < 10 ? '0' + duration : duration}</div>
      
      <div class="eye-buddy-actions">
        <button id="eye-buddy-skip" class="eye-buddy-btn">
          <span>»</span> Passer
        </button>
      </div>
      
      <div id="eye-buddy-footer">Appuyez sur Échap pour passer</div>
    </div>
  `;

    document.body.appendChild(overlay);

    let timeLeft = duration;
    const timerElement = document.getElementById('eye-buddy-timer');

    const interval = setInterval(() => {
        timeLeft--;
        // Format time as MM:SS
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        const formattedTime = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

        if (timerElement) timerElement.textContent = formattedTime;

        if (timeLeft <= 0) {
            clearInterval(interval);
            removeOverlay();
        }
    }, 1000);

    // Skip button functionality
    const skipBtn = document.getElementById('eye-buddy-skip');
    if (skipBtn) {
        skipBtn.addEventListener('click', () => {
            clearInterval(interval);
            removeOverlay();
        });
    }

    // Esc key functionality
    const escListener = (e) => {
        if (e.key === 'Escape') {
            clearInterval(interval);
            removeOverlay();
            document.removeEventListener('keydown', escListener);
        }
    };
    document.addEventListener('keydown', escListener);
}

function removeOverlay() {
    const overlay = document.getElementById('eye-buddy-overlay');
    if (overlay) {
        overlay.remove();
    }
}
