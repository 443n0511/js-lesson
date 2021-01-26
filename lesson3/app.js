// 問題３
const ul = document.getElementById("js-parent");

const listContents = [
    { href: "../lesson1/index.html", text: "a1", src: "../img/bookmark.png" },
    { href: "../lesson2/index.html", text: "a2", src: "../img/bookmark.png" }
];

listContents.forEach((a) => {
    let li = document.createElement("li");
    let anchor = document.createElement("a");
    let image = document.createElement("img");
    anchor.href = a.href;
    anchor.textContent = a.text;
    image.src = a.src;

    ul.appendChild(li);
    li.appendChild(anchor);
    anchor.appendChild(image);
})

