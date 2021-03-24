const url = "https://jsondata.okiba.me/v1/json/ngovH210301060343",
    parent = document.getElementById("js-parent"),
    imagesFragment = document.createDocumentFragment();

let interval;

function getImageLists() {
    const imageLists = [...document.querySelectorAll('.slide-show_list')];
    return imageLists;
}
function getButtons() {
    const buttons = [...document.querySelectorAll('.dot-pagination')];
    return buttons;
}

const wait = (sec) => {
    return new Promise((resolve) => {
        setTimeout(resolve, sec * 1000);
    });
};


async function getJsonData() {
    try {
        await wait(3);
        const response = await fetch(url),
            jsonData = await response.json();
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
    createDotPagination();
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
    parent.appendChild(imagesFragment);
}




function createPagination() {
    const paragraphElement = document.createElement("p");
    paragraphElement.classList.add("pagination");
    paragraphElement.id = "paragraphElement";
    parent.after(paragraphElement);
    paginationUpdate();
}

function createButtonPagination() {
    const buttonPaginationContainer = document.createElement("div");
    for (let i = 0; i < getImageLists().length; i++) {
        const button = document.createElement("button");
        button.id = i;
        button.classList.add('button-pagination');
        buttonContainer.appendChild(button);
        if (i === 0) {
            button.classList.add('is-active');
        }
        button.addEventListener('click', () => {
            clearInterval(interval);
            removeIsShow();
            removeIsActive();
            getImageLists()[i].classList.add('is-show');
            getButtons()[i].classList.add('is-active');
            buttonControl();
            paginationUpdate();
        })
    }
    parent.after(buttonPaginationContainer);
}

function paginationUpdate() {
    paginationNumber.textContent = `${getCurrent() + 1}/${getImageLists().length}`;
}



function autoPagenation() {
    let count = 0;
    const countUp = () => {
        return count++;
    }
    interval = setInterval(() => {
        if (count > (getImageLists().length - 1)) {
            removeIsActive();
            removeIsShow();
            count = 0;
            getImageLists()[(count)].classList.add('is-show');
            getButtons()[(count)].classList.add('is-active');
            paginationUpdate();
            buttonControl();
            countUp();
        } else {
            removeIsActive();
            removeIsShow();
            countUp();
            getImageLists()[(count - 1)].classList.add('is-show');
            getButtons()[(count - 1)].classList.add('is-active');
            paginationUpdate();
            buttonControl();
        }
    }, 3000);
}

function createButton() {
    const prevButton = document.createElement('button');
    prevButton.textContent = '◀';
    prevButton.classList.add("button", "-prev");
    prevButton.disabled = true;
    prevButton.addEventListener('click', () => {
        clearInterval(interval);
        showPrev();
        paginationUpdate();
    }, false);

    const nextButton = document.createElement('button');
    nextButton.textContent = '▶';
    nextButton.classList.add("button", "-next");
    nextButton.addEventListener('click', () => {
        clearInterval(interval);
        showNext();
        paginationUpdate();
    }, false);

    parent.after(nextButton);
    parent.after(prevButton);
}


function buttonControl() {
    const prevButton = document.querySelector('.-prev'),
        nextButton = document.querySelector('.-next');

    if (getCurrent() === 0) {
        prevButton.disabled = true;
    } else {
        prevButton.disabled = false;
    }
    if (getCurrent() === getImageLists().length - 1) {
        nextButton.disabled = true;
    } else {
        nextButton.disabled = false;
    }
}


function showNext() {
    removeIsShow().nextElementSibling.classList.add('is-show');
    removeIsActive().nextElementSibling.classList.add('is-active');
    buttonControl();
}

function showPrev() {
    removeIsShow().previousElementSibling.classList.add('is-show');
    removeIsActive().previousElementSibling.classList.add('is-active');
    buttonControl();
}

function getCurrent() {
    const listIsShow = document.querySelector('.is-show'),
        current = getImageLists().indexOf(listIsShow);
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
