// 問題３
const div = document.getElementById("js-parent");
const ul = document.createElement('ul');
const listNumber = 2;
const src = `../img/bookmark.png`;
let fileNumber = 1;

div.appendChild(ul);

(function(){
const fragment = document.createDocumentFragment();
for (let i = 0; i < listNumber; i++) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    const img = document.createElement('img');
    const hrefPath =`../lesson${fileNumber}/`;
    fragment.appendChild(li);
    li.appendChild(a);
    a.setAttribute("href",`${hrefPath}index.html`);
    a.textContent= `a${fileNumber}`;
    a.appendChild(img);
    img.setAttribute("src",`${src}`);
    fileNumber++;
    console.log(i);
}
div.appendChild(fragment);
})();
