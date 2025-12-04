// options.js

// Saves options to chrome.storage
function saveOptions() {
    const workDuration = document.getElementById('workDuration').value;
    const restDuration = document.getElementById('restDuration').value;

    chrome.storage.sync.set({
        workDuration: parseInt(workDuration, 10),
        restDuration: parseInt(restDuration, 10)
    }, () => {
        // Update status to let user know options were saved.
        const status = document.getElementById('status');
        status.style.opacity = '1';
        setTimeout(() => {
            status.style.opacity = '0';
        }, 2000);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restoreOptions() {
    chrome.storage.sync.get({
        workDuration: 20,
        restDuration: 20
    }, (items) => {
        document.getElementById('workDuration').value = items.workDuration;
        document.getElementById('restDuration').value = items.restDuration;
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
