/* Facebook API */

window.onload = async function (e) {
  var accessTokenFacebook =
    "EAAPiDSrVAPIBAEMDvZBTlI9wtyqUh7E75YyOng1iFKi5vy3ZC7Xw7aOv2hSlauzBONJsAYKQKlf90DXNQM9Wi5RlKQ2SpfZA6GJ8kFzkTwYBgWVPaHV4Dx3ELeGRlg2vV8dW0ctKiGRexAoKzlCeOHRVYnnZAXjr2S0hnj0V5QZDZD";

  var response = await fetch(
    `https://graph.facebook.com/v5.0/ExcellenceCenterCMU/posts?fields=full_picture,message,attachments,permalink_url&limit=10&access_token=${accessTokenFacebook}`
  );

  var responseJSON = await response.json();
  // console.log(responseJSON);
  createCard(responseJSON);
};

function createCard(response) {
  var dataCard = new Array();
  for (i = 0; i < 6; i++) {
    var dataObj = response.data[i];
    var message = formatMessage(dataObj.message);
    var dataCard = {
      imgSource: dataObj.full_picture,
      title: message.title,
      body: message.body,
      permalink_url: dataObj.permalink_url,
    };

    var cardRow = document.getElementById("card-row");

    var cardCol = document.createElement("div");
    cardCol.className = "col-sm-4";

    cardCol.setAttribute(
      "onclick",
      `window.open('${dataCard.permalink_url}', '_blank');`
    );
    cardRow.appendChild(cardCol);
    //
    var cardDiv = document.createElement("div");
    cardDiv.className = "card-NP";

    cardCol.appendChild(cardDiv);
    //

    cardImgDiv = document.createElement("div");
    cardImgDiv.className = "img-div";
    cardDiv.appendChild(cardImgDiv);

    cardImg = document.createElement("img");
    cardImg.setAttribute("src", dataCard.imgSource);
    cardImg.setAttribute("alt", "...");
    // cardImg.setAttribute(
    //   "onclick",
    //   `window.open('${dataCard.permalink_url}', '_blank');`
    // );
    cardImg.className = "img-responsive img-card-NP";
    cardImgDiv.appendChild(cardImg);

    var cardTextDiv = document.createElement("div");
    cardTextDiv.className = "card-text-NP";
    cardDiv.appendChild(cardTextDiv);

    cardTextTitle = document.createElement("h4");
    cardTextTitle.className = "card-text-title-NP";
    cardTextTitle.innerText = dataCard.title;

    //
    cardTextBody = document.createElement("p");
    cardTextBody.className = "card-text-body-NP";
    cardTextBody.innerText = dataCard.body;
    cardTextDiv.appendChild(cardTextTitle);
    cardTextDiv.appendChild(cardTextBody);
  }
}

function formatMessage(message) {
  var messageSplit = message.split("\n");
  if (messageSplit.length === 1) {
    messageSplit.unshift("Daily Update");
  }

  var messageArray = messageSplit.filter((text) => {
    filterResult = true;
    if (text === "") filterResult = false;
    if (text.indexOf("http") >= 0) filterResult = false;
    return filterResult;
  });

  messageArray = messageArray.map((text) => {
    if (text === "การเมือง" || text === "เศรษฐกิจ" || text === "สังคม") {
      text = text.concat(" -");
    }
    return text;
  });

  var title = messageArray[0];
  var body = messageArray.slice(1).join(" ");

  title = title.replace(/▪/g, "");
  body = body.replace(/▪/g, "");

  var textLengthLimit = 160;
  if (body.length > textLengthLimit) {
    body = body.substring(0, textLengthLimit);
    bodyArray = body.split(" ");
    body = bodyArray.slice(0, bodyArray.length - 1).join(" ");
    body = body.concat(" ...");
  }

  if (!body)
    body =
      "ค้นหาข้อมูลเชิงลึกทางอุตสาหกรรมสำหรับการวางแผนและวิเคราะห์สถานการณ์เศรษฐกิจได้ที่ http://piiu.oie.go.th";

  return { title: title, body: body };
}
