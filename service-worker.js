// service-worker.js

const ALARM_NAME = 'eye-buddy-timer';

// Default configuration
const DEFAULT_SETTINGS = {
  workDuration: 20, // minutes
  restDuration: 20  // seconds
};

// Initialize on install
chrome.runtime.onInstalled.addListener(() => {
  console.log('Eye Buddy installed.');
  chrome.storage.sync.get(['workDuration', 'restDuration'], (result) => {
    const workDuration = result.workDuration || DEFAULT_SETTINGS.workDuration;
    const restDuration = result.restDuration || DEFAULT_SETTINGS.restDuration;
    
    // Save defaults if not present
    if (!result.workDuration || !result.restDuration) {
      chrome.storage.sync.set({
        workDuration: workDuration,
        restDuration: restDuration
      });
    }

    startTimer(workDuration);
  });
});

// Function to start the alarm
function startTimer(durationInMinutes) {
  chrome.alarms.create(ALARM_NAME, {
    delayInMinutes: durationInMinutes,
    periodInMinutes: durationInMinutes
  });
}

// Listen for alarm
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === ALARM_NAME) {
    triggerBreak();
  }
});

// Trigger the break
function triggerBreak() {
  // Show notification
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icons/icon128.png', // Make sure this exists
    title: 'Eye Buddy - Temps de pause !',
    message: 'C\'est l\'heure de la règle 20-20-20. Regardez au loin pendant 20 secondes.',
    priority: 2
  });

  // Inject script/message to active tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      const activeTab = tabs[0];
      // Check if we can inject script (avoid chrome:// urls)
      if (activeTab.url && !activeTab.url.startsWith('chrome://') && !activeTab.url.startsWith('edge://')) {
        chrome.tabs.sendMessage(activeTab.id, { action: 'SHOW_OVERLAY' })
          .catch(err => console.log('Could not send message to tab:', err));
      }
    }
  });
}

// Listen for changes in settings to restart timer
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync' && changes.workDuration) {
    const newDuration = changes.workDuration.newValue;
    startTimer(newDuration);
  }
});
