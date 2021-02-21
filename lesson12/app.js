// 問題１２

const div = document.getElementById("js-parent");
const ul = document.createElement("ul");
const getJsonUrl = "https://jsondata.okiba.me/v1/json/s7zm3210129115033";
const button = document.getElementById("js-button");
div.appendChild(ul);

const botton = button.addEventListener('click', displayLodingImage, false);

const getJsonData = async () => {
    try {
        const response = await fetch(getJsonUrl);
        const jsonData = await response.json();
        toDomCreateErements(jsonData.data);
    } catch (err) {
        console.error(err);
    } finally {
        console.log("終了しました");
    }
};

function displayLodingImage() {
    const image = document.createElement("img");
    image.id = "lodingImage";
    image.src = "../img/loading-circle.gif";
    div.appendChild(image);
    button.classList.add("remove-button");
    getJsonData();

}


function toDomCreateErements(data) {
    if (data) {
        const jsonData = data;
        setTimeout(() => {
            const lodingImage = document.getElementById("lodingImage");
            lodingImage.remove();
            const template = (jsonData) => `<li><a href="${jsonData.to} "><img src="${jsonData.img}" alt="${jsonData.alt}">${jsonData.text}</a></li>`;
            jsonData.reduce((prev, current) => {
                return ul.innerHTML = [...prev, template(current)];
            }, [])
        }, 3000);
    }
}


