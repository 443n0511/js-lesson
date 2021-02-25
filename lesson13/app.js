// 問題１３
const div = document.getElementById("js-parent");
const ul = document.createElement("ul");
const getJsonUrl = "https://jsondata.okiba.me/v1/json/s7zm3210129115033";
const button = document.getElementById("js-button");
const modalButton = document.getElementById('js-modalButton');
const modal = document.getElementById('modal');
const getDataButton = document.getElementById('js-getDataButton');
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
    let data;
    data = await getJsonData();
    toDomCreateErements(data);
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


function toDomCreateErements({data}){
    if (data) {
        const jsonData = data;
        const lodingImage = document.getElementById("lodingImage");
        lodingImage.remove();
                const result= jsonData.reduce((prev, current) => {
                    return `${prev}${createTmplate(current)}`;
                }, "");
                ul.innerHTML = result;
    }
}



modalButton.addEventListener('click', () => {
    modal.style.display = 'block';
});

getDataButton.addEventListener('click', displayLodingImage, false);



