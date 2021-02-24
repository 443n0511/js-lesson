// 問題７
const div = document.getElementById("js-parent");
const ul = document.createElement("ul");
const listContents = [{ to: "bookmark.html", img: "../img/1.png", alt: "画像1", text: "ブックマーク" }, { to: "message.html", img: "../img/2.png", alt: "画像2", text: "メッセージ" }];
div.appendChild(ul);
const getArray = new Promise((resolve) => {
    resolve(listContents);
    let image = document.createElement("img");
    image.id = "lodingImage";
    image.src = "../img/loading-circle.gif";
    div.appendChild(image);
});

const createTmplate = (value) =>
    `<li><a href="${value.to}"><img src="${value.img}" alt="${value.alt}">${value.text}</a></li>`;

getArray.then((value) => {
    setTimeout(() => {
    let lodingImage = document.getElementById("lodingImage");
    lodingImage.remove();
    const result = value.reduce((prev, current) => {
        return `${prev}${createTmplate(current)}`;
    }, "");
    div.appendChild(ul).innerHTML = result;
},3000);
});