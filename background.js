// chrome.action.onClicked.addListener(() => {
//   //onclicking the extension icon event is triggered
//   chrome.tabs.create({
//     url: "https://sanketkarki.com.np",
//     active: true,
//   });
// });

// chrome.action.onClicked.addListener((tab) => {
//   //execute this function to listen to the toolbar of the extension being clicked
//   chrome.scripting.executeScript({
//     //execute this script on this tab
//     target: { tabId: tab.id }, //on the tab that is clicked
//     files: ["content-script.js"],
//   });
// });
// chrome.runtime.onInstalled.addListener(() => {
//   console.log("Service worker is installed and running.");
// });

// chrome.action.onClicked.addListener((tab) => {
//   console.log("Extension icon clicked.");
//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     files: ["content-script.js"],
//   });
// });
chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    chrome.tabs.create({
      url: "onboarding.html",
    });
    chrome.storage.local.set({ show: "quote" });
  }
});
let urlData;
let motivationalQuotes;
chrome.runtime.onStartup.addListener(() => {
  motivationalQuotes = [
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "Do what you can, with what you have, where you are.",
    "Believe you can and you’re halfway there.",
    "Hardships often prepare ordinary people for an extraordinary destiny.",
    "Don’t watch the clock; do what it does. Keep going.",
    "It does not matter how slowly you go as long as you do not stop.",
    "Opportunities don’t happen, you create them.",
    "Doubt kills more dreams than failure ever will.",
    "Act as if what you do makes a difference. It does.",
    "Your time is limited, so don’t waste it living someone else’s life.",
  ];
  // Perform any necessary operations on startup(restart of chrome)
  chrome.storage.local.get({ url: [] }).then((data) => {
    urlData = data.url;
  });
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  chrome.storage.local.get({ url: [] }).then((data) => {
    urlData = data.url;
    console.log("urlData", urlData);
  });
});
//retrieve the stored urls from local storage
// async function getCurrentTab() {
//   let queryOptions = { active: true, lastFocusedWindow: true };
//   // `tab` will either be a `tabs.Tab` instance or `undefined`.
//   let [tab] = await chrome.tabs.query(queryOptions);
//   return tab;
// }

// chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
//   let currentUrl = tabs[0]?.url;
//   if (currentUrl.match(urlData)) {
//     console.log("Matched");
//     chrome.scripting.executeScript({
//       //execute this script on this tab
//       target: { tabId: currentUrl.id }, //on the tab that is clicked
//       files: ["content-script.js"],
//     });
//   }
// });

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  console.log("tabId and tab", tabId, tab);
  console.log("tab.url", tab.url);
  if (!urlData) {
    return;
  }
  console.log("urlData", urlData);
  urlData.forEach((url) => {
    if (tab.url.match(url)) {
      console.log("Matched");
      chrome.scripting.executeScript({
        //execute this script on this tab
        target: { tabId: tabId }, //on the tab that is clicked
        files: ["content-script.js"],
      });
    }
  });
  // // read changeInfo data and do something with it (like read the url)
  // if (changeInfo.url) {
  //   // do something here
  // }
});
