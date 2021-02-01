// 問題１６

const div = document.getElementById("js-parent");
const ul = document.createElement("ul");
const getJsonUrl = "https://jsondata.okiba.me/v1/json/s7zm3210129115033";
const button = document.getElementById("js-button");
const modalBotton = document.getElementById('js-modalBotton');
const modal = document.getElementById('modal');
const getDataButton = document.getElementById('js-getDataButton');
const number = document.getElementById('number');
const yorName = document.getElementById('name');

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


window.addEventListener('click', function (e) {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
});

getDataButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (number.value == "") {
        alert('numberを入力してください。');
        return false;
    } else if(yorName.value == ""){
        alert('nameを入力してください。');
        return false;
    }else{
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



        lodingJsonData();
    }
});