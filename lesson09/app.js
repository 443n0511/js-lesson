// 問題９

const div = document.getElementById("js-parent");
const ul = document.createElement("ul");
const listContents = [{ to: "bookmark.html", img: "./img/1.png", alt: "画像1", text: "ブックマーク" }, { to: "message.html", img: "./img/2.png", alt: "画像2", text: "メッセージ" }];
let image = document.createElement("img");

const await3seconds = () => new Promise(resolve => {
    setTimeout(resolve, 3000)
})
const createTmplate = (value) =>
    `<li><a href="${value.to}"><img src="${value.img}" alt="${value.alt}">${value.text}</a></li>`;


async function getArray() {
    return listContents;
}

async function insertArray() {
    await await3seconds()
    let lodingImage = document.getElementById("lodingImage");
    lodingImage.remove();
    getArray().then((value) => {
        const result = value.reduce((prev, current) => {
            return `${prev}${createTmplate(current)}`;
        }, "");
        div.appendChild(ul).innerHTML = result;
    });
};
insertArray();


function displayLodingImage() {
    let image = document.createElement("img");
    image.id = "lodingImage";
    image.src = "../img/loading-circle.gif";
    div.appendChild(image);
}
displayLodingImage();


