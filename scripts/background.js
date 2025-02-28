chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    // Handle the web request here
    console.log("Intercepted request to: ", details.url);
    return { cancel: false }; // or { cancel: true } to block the request
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);

chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.sendMessage(tab.id, { action: 'togglePopup' });
});