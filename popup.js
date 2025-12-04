// popup.js

document.getElementById('openOptions').addEventListener('click', () => {
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL('options.html'));
    }
});

document.getElementById('breakNow').addEventListener('click', () => {
    // Send message to background to trigger break immediately
    // Since we can't easily access background functions directly in MV3 service workers from popup easily without messaging
    // We will just send a message to the active tab directly for simplicity in this MVP context, 
    // OR send a message to the service worker if we implemented a listener there.

    // Let's send to active tab directly as a shortcut, or better, send to runtime and let background handle it if possible.
    // But service worker might be inactive. 

    // Actually, let's just inject the script to the active tab directly from here for "Instant Break"
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'SHOW_OVERLAY' });
        }
    });
});
