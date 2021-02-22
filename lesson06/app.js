// 問題６
const div = document.getElementById("js-parent");
const ul = document.createElement("ul");
const listContents = [{ to: "bookmark.html", img: "../img/1.png", alt: "画像1", text: "ブックマーク" }, { to: "message.html", img: "../img/2.png", alt: "画像2", text: "メッセージ" }];
const getArray = new Promise((resolve) => {
    resolve(listContents);
});

getArray.then((value) => {
    setTimeout(() => {
    const template = (value) => `<li><a href="${value.to} "><img src="${value.img}" alt="${value.alt}">${value.text}</a></li>`;
    value.reduce((prev, current) => {
        return  ul.innerHTML = [...prev, template(current)];
    }, [])
}, 3000);
});

div.appendChild(ul);
