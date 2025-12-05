// service-worker.js

const ALARM_NAME = 'eye-buddy-timer';

// Fixed configuration (20-20-20 rule)
const WORK_DURATION_MINUTES = 20;
const REST_DURATION_SECONDS = 20;

// Initialize on install
chrome.runtime.onInstalled.addListener(() => {
  console.log('Eye Buddy installed.');
  startTimer(WORK_DURATION_MINUTES);
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
async function triggerBreak() {
  // Show notification
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icons/icon128.png',
    title: 'Eye Buddy - Temps de pause !',
    message: 'C\'est l\'heure de la règle 20-20-20. Regardez au loin pendant 20 secondes.',
    priority: 2
  });

  // Inject script/message to active tab
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tabs.length > 0) {
    const activeTab = tabs[0];
    // Check if we can inject script (avoid chrome:// urls)
    if (activeTab.url && !activeTab.url.startsWith('chrome://') && !activeTab.url.startsWith('edge://')) {
      try {
        await chrome.tabs.sendMessage(activeTab.id, { action: 'SHOW_OVERLAY' });
      } catch (err) {
        // Message failed, likely because script is not injected. Inject it now.
        console.log('Message failed, injecting script...', err);
        try {
          await chrome.scripting.insertCSS({
            target: { tabId: activeTab.id },
            files: ['styles.css']
          });
          await chrome.scripting.executeScript({
            target: { tabId: activeTab.id },
            files: ['content.js']
          });
          // Retry sending message
          await chrome.tabs.sendMessage(activeTab.id, { action: 'SHOW_OVERLAY' });
        } catch (injectionErr) {
          console.error('Failed to inject script:', injectionErr);
        }
      }
    }
  }
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'TRIGGER_BREAK') {
    triggerBreak();
  }
});
