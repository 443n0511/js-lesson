// 問題４

const div = document.getElementById("js-parent");
const ul  = document.createElement("ul");
const listContents = [{to: "bookmark.html", img: "../img/1.png", alt:"画像1", text: "ブックマーク"}, {to: "message.html", img: "../img/2.png", alt:"画像2", text: "メッセージ"}];
const template = listContents => `<li><a href="${listContents.to} "><img src="${listContents.img}" alt="${listContents.alt}">${listContents.text}</a></li>`;

const result = listContents.reduce((prev, current) => {
    prev.push(template(current));
  return prev;
}, [])
ul.innerHTML = result.join('');
div.appendChild(ul);

