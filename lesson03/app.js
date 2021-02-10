// 問題３
const listContents = [
    { href: "../lesson1/index.html", text: "a1", src: "../img/bookmark.png" },
    { href: "../lesson2/index.html", text: "a2", src: "../img/bookmark.png" }
];
const template = listContents => `<li><a href="${listContents.href} "><img src="${listContents.src}">${listContents.text}</a></li>`;
const result = listContents.reduce((prev, current) => {
      prev.push(template(current));
    return prev;
  }, [])
  document.getElementById("js-parent").innerHTML = result.join('');
