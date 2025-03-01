chrome.action.onClicked.addListener((tab) => {
    console.log("Extension icon clicked");
    chrome.scripting.executeScript(
        {
            target: { tabId: tab.id },
            files: ['scripts/content.js']
        },
        () => {
            if (chrome.runtime.lastError) {
                console.error("Script injection failed: ", chrome.runtime.lastError);
            } else {
                chrome.tabs.sendMessage(tab.id, { action: 'toggleSidebar' }, (response) => {
                    if (chrome.runtime.lastError) {
                        console.error("Message sending failed: ", chrome.runtime.lastError);
                    } else {
                        console.log("Message sent to content script");
                    }
                });
            }
        }
    );
});