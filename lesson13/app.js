// 問題１３
const div = document.getElementById("js-parent");
const ul = document.createElement("ul");
const getJsonUrl = "https://jsondata.okiba.me/v1/json/s7zm3210129115033";
const button = document.getElementById("js-button");
const modalButton = document.getElementById('js-modalButton');
const modal = document.getElementById('modal');
const getDataButton = document.getElementById('js-getDataButton');


div.appendChild(ul);


async function getJsonData() {
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
    modalButton.classList.add("remove-button");
    modal.style.display = 'none';
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


modalButton.addEventListener('click', () => {
    modal.style.display = 'block';
});

getDataButton.addEventListener('click', displayLodingImage, false);
