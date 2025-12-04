// popup.js

document.getElementById('openOptions').addEventListener('click', () => {
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL('options.html'));
    }
});

document.getElementById('breakNow').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'TRIGGER_BREAK' });
    window.close(); // Close popup after triggering
});
