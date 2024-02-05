if (document.URL.includes("chessgames.com/perl/chessgame")) {
  injectButtonChessGames(document.querySelector("#prevB"));
}

if(document.URL.includes("chess.com/game/live")) //need to use mutation observer here
{
  //check for when element is here and when element is gone. use a bool, if its here do this, if it's gone do this
  //if element exists, wait for it to disappear
  //if it does not exists, wait for element.
  waitForElement('.ui_v5-button-component.ui_v5-button-primary.ui_v5-button-full.game-review-buttons-button',0).then(function(){
    injectButtonChessCom(document.querySelector('.ui_v5-button-component.ui_v5-button-primary.ui_v5-button-full.game-review-buttons-button'));
}).catch(()=>{
    ;
});
waitForElement("#board-layout-sidebar > div > div.tab-content-component > div.new-game-buttons-component",0).then(function(){
  alert("5");
  injectButtonChessCom(document.querySelector("#board-layout-sidebar > div > div.tab-content-component > div.game-review-buttons-component > div > button"));
}).catch(()=>{
  console.log("BROKEN");
});  
}
function detectButton()
{

}
function waitForElement(querySelector, timeout){
  setInterval(function() {
    console.log("Checking!");
}, 5000); // 10000 milliseconds = 10 seconds

  return new Promise((resolve, reject)=>{
    var timer = false;
    console.log("Still Checking!");
    if(document.querySelectorAll(querySelector).length) return resolve();
    const observer = new MutationObserver(()=>{
      if(document.querySelectorAll(querySelector).length){
        observer.disconnect();
        if(timer !== false) clearTimeout(timer);
        return resolve();
      }
    });
    observer.observe(document.body, {
      childList: true, 
      subtree: true
    });
    if(timeout) timer = setTimeout(()=>{
      observer.disconnect();
      reject();
    }, timeout);
  });
}


/*chrome.runtime.onMessage.addListener(
  // this is the message listener
  function (request, sender, sendResponse) {
    if (request.message === "autoFill") {
      autoFill(request.textToFill);
    } else if (request.message === "doIt") {
      injectButtonChessCom(
        document.querySelector("#board-layout-sidebar > div > div.tab-content-component > div.game-review-buttons-component > div > button")
      );
    }
  }
);*/


function injectButtonChessCom(analysisButton) {
  // Duplicate the game review button.
  console.log("Injecting attempt!");
  var testButton = document.querySelector("#board-layout-sidebar > div > div.tab-content-component > div.game-review-buttons-component > div > button:nth-child(2)");
  if(!testButton)
  {
  let newButton = analysisButton.cloneNode("deep");
  // Style it and link it to the Lichess import function.
  newButton.childNodes[2].innerText = "Lichess Analysis";
  newButton.style.margin = "8px 0px 0px 0px";
  newButton.style.padding = "0px 0px 0px 0px";
  newButton.childNodes[0].classList.remove("icon-font-chess");
  newButton.childNodes[0].classList.add("button-class");
  newButton.classList.add("shine-hope-anim");
  newButton.childNodes[0].style["height"] = "3.805rem";
  newButton.addEventListener("click", () => {
    //document.querySelector("#share-modal > div > div.ui_modal-body.ui_modal-rounded-lg.ui_modal-lg > div > section > div.share-menu-tab-image-component.share-menu-tab")
    document.querySelector("#board-layout-sidebar > div > div.tab-content-component > div.live-game-buttons-component > button.icon-font-chess.share.live-game-buttons-button").click();
    waitForElement("#share-modal > div > div.ui_modal-body.ui_modal-rounded-lg.ui_modal-lg > div > section > div.share-menu-tab-image-component.share-menu-tab",0).then(function(){
      let pgnChessGames = document.querySelector("#share-modal > div > div.ui_modal-body.ui_modal-rounded-lg.ui_modal-lg > div > section > div.share-menu-tab-image-component.share-menu-tab"
      ).getAttribute("pgn");
      importGame(pgnChessGames);
    }).catch(()=>{
      ;
    });  
    
  });
  // Append back into the DOM
  let parentNode = analysisButton.parentNode;
  parentNode.append(newButton);
}
}

function injectButtonChessGames(backButton) {
  let newButton = backButton.cloneNode("deep");
  newButton.style.height = "49.5px";
  newButton.style.width = "12%";
  newButton.style.fontSize = "15px";
  newButton.innerText = "Lichess Analysis";
  newButton.addEventListener("click", () => {
    let pgnChessGames = document.querySelector("#olga-data").getAttribute("pgn");
    
    importGame(pgnChessGames);
  });
  // Append back into the DOM
  let parentNode = backButton.parentNode;
  parentNode.style.width = "75%";
  parentNode.childNodes[5].style.width = "30%";
  parentNode.childNodes[3].style.width = "18%";
  parentNode.prepend(newButton);
}

async function importGame(PGN) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Accept", "application/json");
  //myHeaders.append("Authorization", "Bearer lip_uj77rOMh8qcM95VDWm5P");

  var urlencoded = new URLSearchParams();
  urlencoded.append("pgn", PGN); 

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  fetch("https://lichess.org/api/import", requestOptions)
    .then((response) => response.json())
    .then((result) => window.open(result.url))
    .catch((error) => console.log("error", error));

    //need to actually open the chessgame
}

/*
//window.open("http://www.epicgames.com"); opens in new tab

// checkSite = (pageName) => {
//     if (!pageName.includes("chess.com")) {
//         if(!pageName.includes("chessgames.com"))
//         {
//             window.close();
//             window.close();
//             alert("5");
//             //alert("You are not on a supported website! Press me when you are viewing the game you'd like to analyze!");
//         }
//         else
//         {
//             ;
//         }
// }
// else if (!pageName.includes("chess.com/game"))
//     {
//         window.close();
//         alert("You are not currently viewing a game!")
//     }
// }

// document.addEventListener('DOMContentLoaded', function() {
//     var myButton = document.getElementById('exportButton');
//     myButton.addEventListener('click', function() {
//       chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//         var activeTab = tabs[0];
//         var pageTitle = activeTab.url;
//         checkSite(pageTitle);
//       });
//     });
//     // myButton.addEventListener("click", function(){
//     //     chrome.scripting.executeScript(null, {
//     //         code:`alert("HelpText");`
//     //     });
//     // });
//   });
  */
