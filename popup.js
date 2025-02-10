const quoteRadio = document.getElementById("quote-radio");
const imageRadio = document.getElementById("image-radio");
const quoteButton = document.getElementById("quoteButton");
const imageContainer = document.getElementById("image-container");
const imageInput = document.getElementById("image-url");
const imageButton = document.getElementById("imageButton");

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

imageButton.addEventListener("click", () => {
  //set the image as the blocksite notice
  let imageUrl = imageInput.value;
  console.log("imageUrl", imageUrl);
  if (!imageUrl) {
    alert("Please enter a valid image URL");
  }
  chrome.storage.local.set({ imageUrl: imageUrl, show: "image" }).then(() => {
    alert("Image set as background for blocked sites");
  });
});

quoteButton.addEventListener("click", () => {
  //set the quote as the blocksite notice
  chrome.storage.local
    .set({
      show: "quote",
    })
    .then(() => {
      alert("Quote set as background for blocked sites");
    });
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
