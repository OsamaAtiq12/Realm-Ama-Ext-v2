chrome.runtime.sendMessage("I am loading content script", (response) => {
  console.log(response);
  console.log("I am content script");
});

const observer = new MutationObserver((mutationsList, observer) => {
  // Look through all mutations that just occured
  for (let mutation of mutationsList) {
    // If the addedNodes property has one or more nodes
    if (mutation.addedNodes.length) {
      const followButton = document.querySelector(
        '[class="css-175oi2r r-1adg3ll r-6gpygo"]'
      );
      if (followButton) {
        console.log("Button found", followButton);
        injectButton();
        observer.disconnect(); // Stop observing
        break;
      }
    }
  }
});

// Start observing the document with the configured parameters
observer.observe(document, { childList: true, subtree: true });

function injectButton() {
  console.log("Injecting button");
  // Query the DOM for the follow button
  const followButton = document.querySelector(
    '[class="css-175oi2r r-1adg3ll r-6gpygo"]'
  );
  console.log(followButton);
  if (followButton) {
    const amaButton = document.createElement("button");
    amaButton.textContent = "Ask Me Anything";
    amaButton.style.cssText =
      "margin-left: 10px; width:133px; padding: 10px; background-color: #5C1EDF; color: white; border: none; border-radius: 20px; cursor: pointer; position: relative; align-self: end; top: -89px;left:4px;";
    followButton.parentNode.insertBefore(amaButton, followButton);

    // After injecting the AMA button
    amaButton.addEventListener("click", () => {
      console.log("button clicked");
      chrome.runtime.sendMessage({ action: "launchApp" });
    });
  }
}
