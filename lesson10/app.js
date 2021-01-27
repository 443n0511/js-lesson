// 問題９

const div = document.getElementById("js-parent");
const ul = document.createElement("ul");
const listContents = [{ to: "bookmark.html", img: "../img/1.png", alt: "画像1", text: "ブックマーク" }, { to: "message.html", img: "../img/2.png", alt: "画像2", text: "メッセージ" }];
let image = document.createElement("img");
const await3seconds = () => new Promise(resolve => {
    setTimeout(resolve, 3000)
})

image.id = "lodingImage";
image.src = "../img/loading-circle.gif";
div.appendChild(image);
div.appendChild(ul);


async function getArray() {
    return listContents;
}
async function insertArray() {
    try {
        await await3seconds()
        let lodingImage = document.getElementById("lodingImage");
        lodingImage.remove();
        getArray().then(value => {
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
        });
    } catch (error) {
        console.log("Errorが発生しました");
    } finally {
        console.log("処理を終了しました");
    }
};

insertArray();

