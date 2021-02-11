// 問題１２

const div = document.getElementById("js-parent");
const ul = document.createElement("ul");
const getJsonUrl = "https://jsondata.okiba.me/v1/json/s7zm3210129115033";
const button = document.getElementById("js-button");
div.appendChild(ul);

const botton = button.addEventListener('click', displayLodingImage, false);

function displayLodingImage() {
    fetch(getJsonUrl)
        .then(response => response.json())
        .then(data => { getJsonData(data.data); })
        .catch((e) => { console.log(e) });

    let image = document.createElement("img");
    image.id = "lodingImage";
    image.src = "../img/loading-circle.gif";    
    div.appendChild(image);
    button.classList.add("remove-button");
    getJsonData();

}

function getJsonData(data) {
    if (data) {
        const jsonData = data;
            setTimeout(() => {
                let lodingImage = document.getElementById("lodingImage");
                lodingImage.remove();
                    const template = (jsonData) => `<li><a href="${jsonData.to} "><img src="${jsonData.img}" alt="${jsonData.alt}">${jsonData.text}</a></li>`;
                    jsonData.reduce((prev, current) => {
                        prev.push(template(current));
                        ul.innerHTML = prev.join('');
                        return prev;
                    }, [])
            }, 3000);
    }
}


