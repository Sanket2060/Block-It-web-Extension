const quoteRadio = document.getElementById("quote-radio");
const imageRadio = document.getElementById("image-radio");
const quoteButton = document.getElementById("quote");
const imageContainer = document.getElementById("image-container");

quoteRadio.addEventListener("change", function () {
  if (this.checked) {
    quoteButton.style.display = "block";
    imageContainer.style.display = "none";
  }
});

imageRadio.addEventListener("change", function () {
  if (this.checked) {
    quoteButton.style.display = "none";
    imageContainer.style.display = "block";
  }
});

document.getElementById("block").addEventListener("click", function () {
  var url = document.getElementById("url").value;
  console.log("url", url);
  //gets whole local storage and if url is not there creates an empty default url array
  chrome.storage.local.get({ url: [] }).then((data) => {
    const urlData = data.url;
    let value = false;
    urlData.forEach((element) => {
      if (element === url) {
        //check if url is previously present in local storage
        value = true;
      }
    });
    if (value) {
      alert("URL " + url + " is already blocked");
    } else {
      urlData.push(url);
      console.log("urlData from popup", urlData);
      chrome.storage.local.set({ url: urlData }).then(() => {
        console.log("url added");
        alert("URL " + url + " is blocked");
      });
    }
  });
  //trigger the background script to block the url
});

document.getElementById("unblock").addEventListener("click", function () {
  var url = document.getElementById("url").value;
  console.log("url", url);
  //gets whole local storage and if url is not there creates an empty default url array
  chrome.storage.local.get({ url: [] }).then((data) => {
    const urlData = data.url;
    let value = false;
    urlData.map((element) => {
      if (url === element) {
        value = true;
      }
    });
    if (!value) {
      alert("URL " + url + " is not blocked");
    } else {
      const index = urlData.indexOf(url);
      let urlArray;
      if (index > -1) {
        urlArray = urlData.splice(index, 1);
      }
      alert("URL " + urlArray[0] + " is unblocked");
      chrome.storage.local.set({ url: urlData }).then(() => {
        console.log("url removed");
      });
    }
  });
  //trigger the background script to unblock the url
});
