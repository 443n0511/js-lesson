// 問題１２

const div = document.getElementById("js-parent");
const ul = document.createElement("ul");
const getJsonUrl = "https://jsondata.okiba.me/v1/json/wPqbt210607103645";
const button = document.getElementById("js-button");
const createTmplate = (value) =>
    `<li><a href="${value.to}"><img src="${value.img}" alt="${value.alt}">${value.text}</a></li>`;

div.appendChild(ul);

const botton = button.addEventListener('click', displayLodingImage, false);


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
    let data;
    data = await getJsonData();
    toDomCreateErements(data);
}


function displayLodingImage() {
    const image = document.createElement("img");
    image.id = "lodingImage";
    image.src = "../img/loading-circle.gif";
    div.appendChild(image);
    button.classList.add("remove-button");
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



