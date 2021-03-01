const getJsonUrl = "https://jsondata.okiba.me/v1/json/ngovH210301060343";
const toDomUl = document.getElementById("js-parent");
const imagesFragment = document.createDocumentFragment();

let current = 0;
let imageLists;
let pagination;



const wait = (sec) => {
    return new Promise((resolve) => {
        setTimeout(resolve, sec * 1000);
    });
};


async function getJsonData() {
    try {
        await wait(3);
        const response = await fetch(getJsonUrl);
        const jsonData = await response.json();
        return jsonData;
    } catch (err) {
        throw Error(err);
    } finally {
        console.log("終了しました");
    }
}


async function init() {
    let data;
    try {
        data = await getJsonData();
        console.log(data);
    } catch (e) {
        console.error();
    } finally {
        console.log("終了しました");
    }
    if (data.length !== 0) {
        createElements(data);
    } else {
        toDomUl.innerHTML = "data is empty";
    }
}
init();


function createElements(data) {
    createOfListImageItem(data.images);
    createOfButton();
    createOfpagination();
}


function createOfListImageItem(data) {
    data.reduce((prev, current, index) => {
        const ListImageItemImg = document.createElement("img");
        const ListImageItem = document.createElement("li");
        ListImageItem.classList.add("slide-show_list");
        ListImageItemImg.src = data[index].src;
        imagesFragment.appendChild(ListImageItem)
            .appendChild(ListImageItemImg);
        console.log(index);
        if (index === 0) {
            ListImageItem.classList.add("is-show");
        }
        return prev;
    }, 0);
    toDomUl.appendChild(imagesFragment);
    imageLists = document.querySelectorAll('.slide-show_list');
}

function createOfpagination() {
    pagination = document.createElement("p");
    pagination.classList.add("pagination");
    pagination.textContent = `${current + 1}/${imageLists.length}`;
    toDomUl.after(pagination);
}

function paginationUpdate() {
    pagination.textContent = `${current + 1}/${imageLists.length}`;
}


function createOfButton() {
    const prevButton = document.createElement('button');
    prevButton.textContent = '◀';
    prevButton.classList.add("button", "-prev");
    prevButton.disabled = true;
    prevButton.addEventListener('click', () => {
        showPrev();
    }, false);

    const nextButton = document.createElement('button');
    nextButton.textContent = '▶';
    nextButton.classList.add("button", "-next");
    nextButton.addEventListener('click', () => {
        showNext();
    }, false);

    toDomUl.after(nextButton);
    toDomUl.after(prevButton);
}


function buttonControl() {
    const prevButton = document.querySelector('.-prev');
    const nextButton = document.querySelector('.-next');

    if (current === 0) {
        prevButton.disabled = true;
    } else {
        prevButton.disabled = false;
    }
    if (current === imageLists.length - 1) {
        nextButton.disabled = true;
    } else {
        nextButton.disabled = false;
    }
}

function showNext() {
    const isShow = document.querySelector('.is-show');
    isShow.classList.remove('is-show');
    isShow.nextElementSibling.classList.add('is-show');
    current++;
    paginationUpdate();
    buttonControl();
}

function showPrev() {
    const isShow = document.querySelector('.is-show');
    isShow.classList.remove('is-show');
    isShow.previousElementSibling.classList.add('is-show');
    current--;
    paginationUpdate();
    buttonControl();
}

