document.addEventListener("DOMContentLoaded", function () {
  var exportButton = document.getElementById("exportButton");
  exportButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      let activeTab = tabs[0];
      let pageTitle = activeTab.url; //Grabs the URL of the tab where the export button was clicked.
      checkSite(activeTab, pageTitle);
    });
  });
  var copyButton = document.getElementById("copyPgnButton");
  copyButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      let activeTab = tabs[0];
      let pageTitle = activeTab.url; //Grabs the URL of the tab where the export button was clicked.
      copyPGN(activeTab, pageTitle);
    });
  });
});

function copyPGN(tabList, urlName) 
{
  if(urlName.includes("chessgames.com/perl/chessgame"))
  {
    
  }
}

function checkSite(tabList, urlName) {
  if (!urlName.includes("chess.com")) {
    if (!urlName.includes("chessgames.com")) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          {
            message: "autoFill",
            textToFill: "some text",
          },
          function (response) {}
        );
      });

      // chrome.scripting.executeScript({
      //     target: { tabId: tabList.id },
      //     function: alert,
      //   });
    }
  } else {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          message: "doIt",
          textToFill: "some text",
        },
        function (response) {}
      );
    });
  }
}

// chrome.scripting.executeScript({
//   target: { tabId: tabs[0].id },
//   function: sendAlert,
// });
