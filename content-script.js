const randomQuote = motivationalQuotes[Math.floor(Math.random())];
console.log("randomQuote", randomQuote);
let show = chrome.storage.local.get({ show: "quote" });
console.log("show", show);

if (show === "quote") {
  document.body.outerHTML =
    "<body style='width:100vw height:100vh'><div style='width:100vw height:100vh'> <h1>" +
    randomQuote +
    "</h1></div></body>";
}

if (show === "image") {
  let imageUrl = chrome.storage.local.get({ imageUrl: "" });
  if (imageUrl) {
    document.body.outerHTML =
      "<body><div style='width:100vw height:100vh'> <img src='" +
      imageUrl +
      "'></div></body>";
  }
}

// document.body.outerHTML =
//   "<body style='width:100vw height:100vh'><div style='width:100vw height:100vh'> <img src='https://i.pinimg.com/736x/38/16/94/381694bd28f602878e9f272d6b83f3bf.jpg'></div></body>";
