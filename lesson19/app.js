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

/*
tabs
*/

const tabsUrl = "https://jsondata.okiba.me/v1/json/vcHUg210221022056";
const tabsParent = document.getElementById("js-tabs-parent");

//カテゴリタブ
const tabsUl = document.createElement("ul");
tabsUl.classList.add("tabs");
const tabsContainerLi = document.createElement("li");
tabsContainerLi.classList.add("tabs_container");
const tabsFragment = document.createDocumentFragment();

//カテゴリ記事
const tabContentsUl = document.createElement("ul");
tabContentsUl.classList.add("tab_contents");
const tabContentsContainerLi = document.createElement("li");
tabContentsContainerLi.classList.add("tab_contents_container");
const contentsFragment = document.createDocumentFragment();

//カテゴリタブ・記事をDOMへ
tabsParent.prepend(tabsContainerLi);
tabsParent.appendChild(tabContentsContainerLi).appendChild(tabContentsUl);
tabsContainerLi.appendChild(tabsUl);

async function getTabsJsonData() {
    try {
        const response = await fetch(tabsUrl);
        const jsonData = await response.json();
        return jsonData;
    } catch (err) {
        throw Error(err);
    } finally {
        console.log("終了しました");
    }
}

async function tabsInit() {
    let data;
    try {
        data = await getTabsJsonData();
    } catch (e) {
        tabsUl.innerHTML = `error is ${e}`;
    }
    if (data.length !== 0) {
        createTabsElements(data);
    } else {
        tabsUl.innerHTML = "data is empty";
    }
}
tabsInit();

function createTabsElements({ data }) {
    createOfTab(data);
    createOfTabContents(data);
    displayOfCategoryImage(data);
    InitialSettingOfTab(data);
    addIsNewIcon(data);
    numberOfDisplayComments(data);
    tabSwitch();
}

function createOfTab(tabs) {
    tabs.reduce((prev, current, index) => {
        const tabItemLi = document.createElement("li");
        tabItemLi.classList.add("tab_item");
        tabItemLi.dataset.id = tabs[index].id;
        tabItemLi.textContent = tabs[index].category;
        tabsFragment.appendChild(tabItemLi);
        return prev;
    }, []);
    tabsUl.appendChild(tabsFragment);
}

function createOfTabContents(contents) {
    contents.reduce((prev, current, index) => {
        const tabContentLi = document.createElement("li");
        tabContentLi.classList.add("tab_content");
        tabContentLi.id = contents[index].id;
        const tabContentDescriptionUl = document.createElement("ul");
        for (let i = 0; i < contents[index].articles.length; i++) {
            const tabContentDescriptionLi = document.createElement("li");
            tabContentDescriptionLi.classList.add("tab_content-description_li");
            const tabContentDescriptionArticle = document.createElement("article");
            tabContentDescriptionArticle.classList.add(
                "tab_content-description_Article"
            );
            const tabContentDescriptionP = document.createElement("p");
            tabContentDescriptionP.id = `${contents[index].id}-title_no${i}`;
            tabContentDescriptionUl
                .appendChild(tabContentDescriptionLi)
                .appendChild(tabContentDescriptionArticle)
                .appendChild(tabContentDescriptionP).textContent =
                contents[index].articles[i].title;
        }
        contentsFragment
            .appendChild(tabContentLi)
            .appendChild(tabContentDescriptionUl);
        return prev;
    }, []);
    tabContentsContainerLi
        .appendChild(tabContentsUl)
        .appendChild(contentsFragment);
}

function displayOfCategoryImage(categoryImages) {
    categoryImages.reduce((prev, current, index) => {
        const tabContentList = document.getElementById(`${categoryImages[index].id}`);
        const tabContentImgP = document.createElement("p");
        tabContentImgP.classList.add("tab_content_img");
        const img = document.createElement("img");
        tabContentList.appendChild(tabContentImgP).appendChild(img).src =
        categoryImages[index].img;
        return prev;
    }, []);
}

function addIsNewIcon(IsNewIcons) {
    IsNewIcons.reduce((prev, current, index) => {
        for (let i = 0; i < IsNewIcons[index].articles.length; i++) {
            const setIsNew = IsNewIcons[index].articles[i].isNew;
            const tabContentDescriptionP = document.getElementById(
                `${IsNewIcons[index].id}-title_no${i}`
            );
            const isNewContent = document.createElement("span");
            if (setIsNew === true) {
                tabContentDescriptionP.appendChild(isNewContent);
                isNewContent.classList.add("new");
                isNewContent.textContent = "new";
            }
        }
        return prev;
    }, []);
}

function numberOfDisplayComments(comments) {
    comments.reduce((prev, current, index) => {
        for (let i = 0; i < comments[index].articles.length; i++) {
            const setCommentCount = comments[index].articles[i].commentCount;
            const tabContentDescriptionP = document.getElementById(
                `${comments[index].id}-title_no${i}`
            );
            const comment = document.createElement("span");
            comment.classList.add("comment");
            const commentImg = document.createElement("img");
            if (setCommentCount > 0) {
                comment.textContent = setCommentCount;
                tabContentDescriptionP.appendChild(commentImg).src =
                    "../img/comment.png";
                tabContentDescriptionP.appendChild(comment);
            }
        }
        return prev;
    }, []);
}

function InitialSettingOfTab(tabs) {
    const tabTriggers = document.querySelectorAll(".tab_item");
    const tabTargets = document.querySelectorAll(".tab_content");
    tabs.reduce((prev, current, index) => {
        if (tabs[index].isOpen === true) {
            tabTriggers[index].classList.add("is-active");
            tabTargets[index].classList.add("is-show");
        } else {
            tabTriggers[index].classList.remove("is-active");
        }
        return prev;
    }, []);
}

function tabSwitch() {
    const tabTriggers = document.querySelectorAll(".tab_item");
    const tabTargets = document.querySelectorAll(".tab_content");
    for (let a = 0; a < tabTriggers.length; a++) {
        tabTriggers[a].addEventListener("click", (e) => {
            const currentMenu = e.currentTarget;
            const currentContent = document.getElementById(currentMenu.dataset.id);
            for (let b = 0; b < tabTriggers.length; b++) {
                tabTriggers[b].classList.remove("is-active");
            }
            currentMenu.classList.add("is-active");
            for (let c = 0; c < tabTargets.length; c++) {
                tabTargets[c].classList.remove("is-show");
            }
            if (currentContent !== null) {
                currentContent.classList.add("is-show");
            }
        });
    }
}
