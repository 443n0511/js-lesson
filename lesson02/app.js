// 問題２
const ul = document.getElementById("js-parent");
const li = document.createElement('li');
const a = document.createElement('a');
const img = document.createElement('img');

a.textContent = "これです";
a.href = "../lesson1/index.html";
img.src = "../img/bookmark.png";

ul.appendChild(li).appendChild(a).appendChild(img);