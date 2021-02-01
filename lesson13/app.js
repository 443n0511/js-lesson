// 問題１３
const div = document.getElementById("js-parent");
const ul = document.createElement("ul");
const getJsonUrl = "https://jsondata.okiba.me/v1/json/s7zm3210129115033";
const button = document.getElementById("js-button");
const modalBotton = document.getElementById('js-modalBotton');
const modal = document.getElementById('modal');
const getDataButton = document.getElementById('js-getDataButton');

div.appendChild(ul);

function lodingJsonData() {
    fetch(getJsonUrl)
        .then(response => response.json())
        .then(data => { getJsonData(data.data); })
        .catch((e) => { console.log(e) });
    let image = document.createElement("img");
    image.id = "lodingImage";
    image.src = "../img/loading-circle.gif";
    div.appendChild(image);
    modalBotton.classList.add("remove-button");
    modal.style.display = 'none';
    getJsonData();
}

function getJsonData(data) {
    if (data) {
        const jsonData = data;
        setTimeout(() => {
            let lodingImage = document.getElementById("lodingImage");
            lodingImage.remove();
            for (let i = 0; i < jsonData.length; i++) {
                let li = document.createElement("li");
                let anchor = document.createElement("a");
                let image = document.createElement("img");
                anchor.href = jsonData[i].to;
                anchor.textContent = jsonData[i].text;
                image.alt = jsonData[i].alt;
                image.src = jsonData[i].img;
                ul.appendChild(li);
                li.appendChild(anchor);
                anchor.appendChild(image);
            }
        }, 3000);
    }
}

modalBotton.addEventListener('click', function () {
    modal.style.display = 'block';
});

getDataButton.addEventListener('click', lodingJsonData, false);

window.addEventListener('click', function (e) {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
});