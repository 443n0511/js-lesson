const url = "https://jsondata.okiba.me/v1/json/ngovH210301060343";
const parent = document.getElementById("js-parent");
const imagesFragment = document.createDocumentFragment();


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
        const response = await fetch(url);
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
    } catch (e) {
        console.error();
    } finally {
        console.log("終了しました");
    }
    if (data.length !== 0) {
        createElements(data);
    } else {
        parent.innerHTML = "data is empty";
    }
}
init();


function createElements(data) {
    createOfListImageItem(data.images);
    createButton();
    createPagination();
}


function createOfListImageItem(data) {
    data.forEach((value, index) => {
        const ListImageItemImg = document.createElement("img");
        const ListImageItem = document.createElement("li");
        ListImageItem.classList.add("slide-show_list");
        ListImageItemImg.src = value.src;
        imagesFragment.appendChild(ListImageItem)
            .appendChild(ListImageItemImg);
        if (index === 0) {
            ListImageItem.classList.add("is-show");
        }
    })
    parent.appendChild(imagesFragment);
}

function imageListsChangeToArray() {
    imageLists = document.querySelectorAll('.slide-show_list');
    return imageLists = Array.from(imageLists);
}

function createPagination() {
    pagination = document.createElement("p");
    pagination.classList.add("pagination");
    paginationUpdate();
    parent.after(pagination);
}

function paginationUpdate() {
    pagination.textContent = `${getCurrent() + 1}/${imageListsChangeToArray().length}`;
}


function createButton() {
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

    parent.after(nextButton);
    parent.after(prevButton);

}


function buttonControl() {
    const prevButton = document.querySelector('.-prev');
    const nextButton = document.querySelector('.-next');

    if (getCurrent() === 0) {
        prevButton.disabled = true;
    } else {
        prevButton.disabled = false;
    }
    if (getCurrent() === imageLists.length - 1) {
        nextButton.disabled = true;
    } else {
        nextButton.disabled = false;
    }
    paginationUpdate();
}

function showNext() {
    const isShow = document.querySelector('.is-show');
    isShow.classList.remove('is-show');
    isShow.nextElementSibling.classList.add('is-show');
    buttonControl();
}

function showPrev() {
    const isShow = document.querySelector('.is-show');
    isShow.classList.remove('is-show');
    isShow.previousElementSibling.classList.add('is-show');
    buttonControl();
}

function getCurrent() {
    const isShow = document.querySelector('.is-show'),
        current = imageListsChangeToArray().indexOf(isShow);
    return current;
}
