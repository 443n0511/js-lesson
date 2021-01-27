// 問題８

const div = document.getElementById("js-parent");
const ul = document.createElement("ul");
const listContents = [{ to: "bookmark.html", img: "../img/1.png", alt: "画像1", text: "ブックマーク" }, { to: "message.html", img: "../img/2.png", alt: "画像2", text: "メッセージ" }];

div.appendChild(ul);



const getArray = new Promise((resolve,reject) => {
    reject(listContents);
    let image = document.createElement("img");
    image.id = "lodingImage";
    image.src = "../img/loading-circle.gif";
    div.appendChild(image);
});


getArray.then((value) => {
    setTimeout(() => {
    let lodingImage = document.getElementById("lodingImage");
    lodingImage.remove();
    value.forEach((a) => {
        let li = document.createElement("li");
        let anchor = document.createElement("a");
        let image = document.createElement("img");
        ul.appendChild(li);
        li.appendChild(anchor);
        anchor.href = a.to;
        anchor.textContent = a.text;
        image.alt = a.alt;
        image.src = a.img;
        anchor.appendChild(image);
    })
}, 3000);

}).catch((value)=> {
   console.log(value);
});