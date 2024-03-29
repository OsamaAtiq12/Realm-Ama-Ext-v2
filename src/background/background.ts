chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    console.log(msg);
    console.log(sender);
    sendResponse("Front the background Script");
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Message received:", request);
    if (request.action === "fetchPopupHtml") {
        chrome.runtime.openOptionsPage()
        return true;
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "launchApp") {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var currTab = tabs[0];
            if (currTab) { // Sanity check
                // Create a temporary fullscreen window to get the screen width
                chrome.windows.create({state: 'fullscreen'}, function(win) {
                    var screenWidth = win.width;
                    chrome.windows.remove(win.id); // Remove the temporary window

                    // Create the popup window at the extreme right
                    chrome.windows.create({
                        url: 'chrome-extension://ppghgnolhpnaeclchgkocjaedmgibpkf/popup.html',
                        type: 'popup',
                        width: 433,
                        height: 900,
                        left: screenWidth - 400, // Position the window at the extreme right
                        top: 80 // Set the top position of the window
                    });
                });
            }
        });
    }
});