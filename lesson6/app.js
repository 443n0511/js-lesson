// 問題６
const div = document.getElementById("js-parent");
const ul = document.createElement("ul");
const listContents = [{ to: "bookmark.html", img: "../img/1.png", alt: "画像1", text: "ブックマーク" }, { to: "message.html", img: "../img/2.png", alt: "画像2", text: "メッセージ" }];

div.appendChild(ul);
const getArray = new Promise((resolve) => {
        resolve(listContents);
});
getArray.then((value) => {
    setTimeout(() => {
    value.forEach((a) => {
        let li = document.createElement("li");
        let anchor = document.createElement("a");
        let image = document.createElement("img");
        anchor.href = a.to;
        anchor.textContent = a.text;
        image.alt = a.alt;
        image.src = a.img;
        ul.appendChild(li);
        li.appendChild(anchor);
        anchor.appendChild(image);
    })
}, 3000);

});