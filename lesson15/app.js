// 問題１６

const div = document.getElementById("js-parent");
const ul = document.createElement("ul");
const getJsonUrl = "https://jsondata.okiba.me/v1/json/wPqbt210607103645";
const button = document.getElementById("js-button");
const modalButton = document.getElementById('js-modalButton');
const closeButton = document.getElementById('js-closeButton');
const modal = document.getElementById('modal');
const getDataButton = document.getElementById('js-getDataButton');
const number = document.getElementById('number');
const yorName = document.getElementById('name');

const createTmplate = (value) =>
    `<li><a href="${value.to}"><img src="${value.img}" alt="${value.alt}">${value.text}</a></li>`;


div.appendChild(ul);

const getJsonData = async () => {
    try {
        const response = await fetch(getJsonUrl);
        const jsonData = await response.json();
        return jsonData;
    } catch (err) {
        console.error(err);
    } finally {
        console.log("終了しました");
    }
};


async function init() {
    try {
        data = await getJsonData();
        toDomCreateErements(data);
    } catch (e) {
        console.error(err);
    }

}

function displayLodingImage() {
    const image = document.createElement("img");
    image.id = "lodingImage";
    image.src = "../img/loading-circle.gif";
    div.appendChild(image);
    modalButton.classList.add("remove-button");
    modal.style.display = 'none';
    init();

}


function toDomCreateErements({ data }) {
    if (data) {
        const jsonData = data;
        const lodingImage = document.getElementById("lodingImage");
        lodingImage.remove();
        const result = jsonData.reduce((prev, current) => {
            return `${prev}${createTmplate(current)}`;
        }, "");
        ul.innerHTML = result;
    }
}


modalButton.addEventListener('click', () => {
    modal.style.display = 'block';
});


closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

getDataButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (number.value == "") {
        alert('numberを入力してください。');
        return false;
    } else if (yorName.value == "") {
        alert('nameを入力してください。');
        return false;
    } else {
        const getNumber = new Promise((resolve) => {
            resolve(number.value);
        });
        getNumber.then((value) => {
            console.log(`入力された値は${value}です`);
        });
        const getName = new Promise((resolve) => {
            resolve(yorName.value);
        });
        getName.then((value) => {
            console.log(`${value}さん、こんにちは`);
        });
        displayLodingImage();
    }
});
