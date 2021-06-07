/*
slider
*/
const sliderurl = "https://jsondata.okiba.me/v1/json/ngovH210301060343",
    sliderParent = document.getElementById("js-slider-parent"),
    imagesFragment = document.createDocumentFragment();

let interval;
let imageLists;
let bottons;

function getImageLists(target) {
    imageLists = [...document.querySelectorAll(target)];
    return imageLists;
}
function getButtons(target) {
    buttons = [...document.querySelectorAll(target)];
    return buttons;
}

const wait = (sec) => {
    return new Promise((resolve) => {
        setTimeout(resolve, sec * 1000);
    });
};


async function getSliderJsonData() {
    try {
        await wait(3);
        const response = await fetch(sliderurl),
            jsonData = await response.json();
        return jsonData;
    } catch (err) {
        throw Error(err);
    } finally {
        console.log("終了しました");
    }
}


async function sliderInit() {
    let data;
    try {
        data = await getSliderJsonData();
    } catch (e) {
        console.error();
    } finally {
        console.log("終了しました");
    }
    if (data.length !== 0) {
        createSliderElements(data);
    } else {
        sliderParent.innerHTML = "data is empty";
    }
}
sliderInit();


function createSliderElements(data) {
    createOfListImageItem(data.images);
    createArrowButton();
    createPagination();
    createButtonPagination();
    getButtons('.button-pagination');
    autoPagenation();
}


function createOfListImageItem(items) {
    items.forEach((item, index) => {
        const ListImageItemImg = document.createElement("img"),
            ListImageItem = document.createElement("li");
        ListImageItem.id = index;
        ListImageItem.classList.add("slide-show_list");
        ListImageItemImg.src = item.src;
        imagesFragment.appendChild(ListImageItem)
            .appendChild(ListImageItemImg);
        if (index === 0) {
            ListImageItem.classList.add("is-show");
        }
    })
    sliderParent.appendChild(imagesFragment);
    getImageLists('.slide-show_list');
}




function createPagination() {
    const paragraphElement = document.createElement("p");
    paragraphElement.classList.add("pagination");
    paragraphElement.id = "paragraphElement";
    sliderParent.after(paragraphElement);
    updatePagination();
}

function createButtonPagination() {
    const buttonPaginationContainer = document.createElement("div");
    for (let i = 0; i < imageLists.length; i++) {
        const button = document.createElement("button");
        button.id = i;
        button.classList.add('button-pagination');
        buttonPaginationContainer.appendChild(button);
        if (i === 0) {
            button.classList.add('is-active');
        }
        button.addEventListener('click', () => {
            clearInterval(interval);
            removeIsShow();
            removeIsActive();
            imageLists[i].classList.add('is-show');
            buttons[i].classList.add('is-active');
            buttonDisabled();
            updatePagination();
        })
    }
    sliderParent.after(buttonPaginationContainer);
}

function updatePagination() {
    paragraphElement.textContent = `${getCurrent() + 1}/${imageLists.length}`;
}

function autoPagenation() {
    let count = 0;
    const countUp = () => {
        return count++;
    }
    interval = setInterval(() => {
        removeIsActive();
        removeIsShow();
        if (count > (imageLists.length - 1)) {
            count = 0;
            imageLists[(count)].classList.add('is-show');
            buttons[(count)].classList.add('is-active');
            countUp();
        } else {
            countUp();
            imageLists[(count - 1)].classList.add('is-show');
            buttons[(count - 1)].classList.add('is-active');
        }
        updatePagination();
        buttonDisabled();
    }, 3000);
}

function createArrowButton() {
    const prevButton = document.createElement('button');
    prevButton.textContent = '◀';
    prevButton.classList.add("button", "-prev");
    prevButton.disabled = true;
    prevButton.addEventListener('click', () => {
        clearInterval(interval);
        showPrev();
        updatePagination();
    }, false);

    const nextButton = document.createElement('button');
    nextButton.textContent = '▶';
    nextButton.classList.add("button", "-next");
    nextButton.addEventListener('click', () => {
        clearInterval(interval);
        showNext();
        updatePagination();
    }, false);

    sliderParent.after(nextButton);
    sliderParent.after(prevButton);
}


function buttonDisabled() {
    const prevButton = document.querySelector('.-prev'),
        nextButton = document.querySelector('.-next');

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
}


function showNext() {
    removeIsShow().nextElementSibling.classList.add('is-show');
    removeIsActive().nextElementSibling.classList.add('is-active');
    buttonDisabled();
}

function showPrev() {
    removeIsShow().previousElementSibling.classList.add('is-show');
    removeIsActive().previousElementSibling.classList.add('is-active');
    buttonDisabled();
}

function getCurrent() {
    getImageLists('.slide-show_list');
    const listIsShow = document.querySelector('.is-show'),
        current = imageLists.indexOf(listIsShow);
    return current;
}

function removeIsShow() {
    const listIsShow = document.querySelector('.is-show');
    listIsShow.classList.remove('is-show');
    return listIsShow;
}
function removeIsActive() {
    const buttonIsActive = document.querySelector('.is-active');
    buttonIsActive.classList.remove('is-active');
    return buttonIsActive;
}
