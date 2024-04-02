chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log(msg);
  console.log(sender);
  sendResponse("Front the background Script");
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Message received:", request);
  if (request.action === "fetchPopupHtml") {
    chrome.runtime.openOptionsPage();
    return true;
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "launchApp") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var currTab = tabs[0];
      if (currTab) {
        // Sanity check
        // Create a temporary fullscreen window to get the screen width and height
        chrome.windows.create({ state: "fullscreen" }, function (win) {
          var screenWidth = win.width;
          var screenHeight = win.height;
          chrome.windows.remove(win.id); // Remove the temporary window

          // Create the popup window at the extreme right
          chrome.windows.create({
            url: chrome.runtime.getURL("popup.html"),
            type: "popup",
            width: 453,
            height: screenHeight-94, // Set the height to the screen height
            left: screenWidth - 400, // Position the window at the extreme right
            top: 0, // Set the top position of the window to 0
          });
        });
      }
    });
  }
});
