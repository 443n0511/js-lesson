// 問題４

const div = document.getElementById("js-parent");
const ul  = document.createElement("ul");
const listContents = [{to: "bookmark.html", img: "../img/1.png", alt:"画像1", text: "ブックマーク"}, {to: "message.html", img: "../img/2.png", alt:"画像2", text: "メッセージ"}];
console.log(listContents);
div.appendChild(ul);

listContents.forEach((a)=>{
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

