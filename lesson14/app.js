// 問題１４

const div = document.getElementById("js-parent");
const ul = document.createElement("ul");
const getJsonUrl = "https://jsondata.okiba.me/v1/json/s7zm3210129115033";
const button = document.getElementById("js-button");
const modalBotton = document.getElementById('js-modalBotton');
const modal = document.getElementById('modal');
const getDataButton = document.getElementById('js-getDataButton');
const number = document.getElementById('number');



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
                    const template = (jsonData) => `<li><a href="${jsonData.to} "><img src="${jsonData.img}" alt="${jsonData.alt}">${jsonData.text}</a></li>`;
                    jsonData.reduce((prev, current) => {
                        prev.push(template(current));
                        ul.innerHTML = prev.join('');
                        return prev;
                    }, [])
            }, 3000);
    }
}


modalBotton.addEventListener('click',()=> {
    modal.style.display = 'block';
});


window.addEventListener('click',(e)=> {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
});

getDataButton.addEventListener('click', (e) => {
    if (number.value == "") {
        alert('入力してください。');
        return false;
    } else {
        const getNumber = new Promise((resolve) => {
            resolve(number.value);
        });
        getNumber.then((value) => {
            console.log(`入力された値は${value}です`);
        });
        lodingJsonData();
    }
});