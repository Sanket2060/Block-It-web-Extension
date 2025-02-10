//  motivationalQuotes = [
//   "Success is not final, failure is not fatal: it is the courage to continue that counts.",
//   "Do what you can, with what you have, where you are.",
//   "Believe you can and you’re halfway there.",
//   "Hardships often prepare ordinary people for an extraordinary destiny.",
//   "Don’t watch the clock; do what it does. Keep going.",
//   "It does not matter how slowly you go as long as you do not stop.",
//   "Opportunities don’t happen, you create them.",
//   "Doubt kills more dreams than failure ever will.",
//   "Act as if what you do makes a difference. It does.",
//   "Your time is limited, so don’t waste it living someone else’s life.",
// ];
// const randomQuote = motivationalQuotes[Math.floor(Math.random())];
// console.log("randomQuote", randomQuote);
// let show = chrome.storage.local.get({ show: "quote" });
// console.log("show", show);

// if (show === "quote") {
//   document.body.outerHTML =
//     "<body style='width:100vw height:100vh'><div style='width:100vw height:100vh'> <h1>" +
//     randomQuote +
//     "</h1></div></body>";
// }

// if (show === "image") {
//   let imageUrl = chrome.storage.local.get({ imageUrl: "" });
//   if (imageUrl) {
//     document.body.outerHTML =
//       "<body><div style='width:100vw height:100vh'> <img src='" +
//       imageUrl +
//       "'></div></body>";
//   }
// }

// // document.body.outerHTML =
// //   "<body style='width:100vw height:100vh'><div style='width:100vw height:100vh'> <img src='https://i.pinimg.com/736x/38/16/94/381694bd28f602878e9f272d6b83f3bf.jpg'></div></body>";
(() => {
  let motivationalQuotes;
  if (!window.hasRun) {
    // Prevent re-execution of definition of motivationalQuotes and running single time on first time
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
  }
  window.hasRun = true; // Mark script as executed
  // const quoteLength = motivationalQuotes.length; //can't access motivationalQuotes.length is tells it is undefined
  const randomQuote = motivationalQuotes[Math.floor(Math.random() * 10)];
  console.log("randomQuote", randomQuote);

  chrome.storage.local.get({ show: "quote" }).then((result) => {
    let show = result.show;
    console.log("show", show);

    if (show === "quote") {
      document.body.innerHTML = `
        <div style="
          width: 100vw; 
          height: 100vh; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white; 
          text-align: center;
          font-family: 'Poppins', sans-serif;
          padding: 20px;
        "> 
          <h1 style="
            font-size: 3rem; 
            font-weight: bold; 
            max-width: 80%; 
            line-height: 1.4; 
            text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
          ">
            "${randomQuote}"
          </h1>
        </div>`;
    }

    if (show === "image") {
      chrome.storage.local.get({ imageUrl: "" }).then((data) => {
        let imageUrl = data.imageUrl;
        if (imageUrl) {
          document.body.innerHTML = `<div style='width:100vw; height:100vh; display:flex; align-items:center; justify-content:center;'> 
            <img src='${imageUrl}' style='max-width:100%; max-height:100%;'>
          </div>`;
        }
      });
    }
  });
})();
