// 問題１１

const div = document.getElementById("js-parent");
const ul = document.createElement("ul");
const getJsonUrl = "https://jsondata.okiba.me/v1/json/s7zm3210129115033";
div.appendChild(ul);

const getJsonData = async () => {
    try {
        const response = await fetch(getJsonUrl);
        const jsonData = await response.json();
        toDomCreateErements(jsonData.data);
    } catch (err) {
        console.error(err);
    }
};

getJsonData();

function toDomCreateErements(data){
    if (data) {
        const jsonData = data;
        displayLodingImage();
            setTimeout(() => {
                const lodingImage = document.getElementById("lodingImage");
                lodingImage.remove();
                    const template = (jsonData) => `<li><a href="${jsonData.to} "><img src="${jsonData.img}" alt="${jsonData.alt}">${jsonData.text}</a></li>`;
                    jsonData.reduce((prev, current) => {
                        return  ul.innerHTML = [...prev, template(current)];
                    }, [])
            }, 3000);
    }
}

function displayLodingImage(){
    let image = document.createElement("img");
    image.id = "lodingImage";
    image.src = "../img/loading-circle.gif";
    div.appendChild(image);
}