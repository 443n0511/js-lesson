const getJsonUrl = "https://jsondata.okiba.me/v1/json/oxP76210607104654";
const toDomUl = document.getElementById("js-tabs-parent");

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
toDomUl.prepend(tabsContainerLi);
toDomUl.appendChild(tabContentsContainerLi).appendChild(tabContentsUl);
tabsContainerLi.appendChild(tabsUl);

async function getJsonData() {
    try {
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
    } catch (e) {
        tabsUl.innerHTML = `error is ${e}`;
    }
    if (data.length !== 0) {
        createElements(data);
    } else {
        tabsUl.innerHTML = "data is empty";
    }
}
init();

function createElements({ data }) {
    createOfTab(data);
    createOfTabContents(data);
    displayOfCategoryImage(data);
    InitialSettingOfTab(data);
    addIsNewIcon(data);
    numberOfDisplayComments(data);
    tabSwitch();
}

function createOfTab(value) {
    value.reduce((prev, current, index) => {
        const tabItemLi = document.createElement("li");
        tabItemLi.classList.add("tab_item");
        tabItemLi.dataset.id = value[index].id;
        tabItemLi.textContent = value[index].category;
        tabsFragment.appendChild(tabItemLi);
        return prev;
    }, []);
    tabsUl.appendChild(tabsFragment);
}

function createOfTabContents(value) {
    value.reduce((prev, current, index) => {
        const tabContentLi = document.createElement("li");
        tabContentLi.classList.add("tab_content");
        tabContentLi.id = value[index].id;
        const tabContentDescriptionUl = document.createElement("ul");
        for (let i = 0; i < value[index].articles.length; i++) {
            const tabContentDescriptionLi = document.createElement("li");
            tabContentDescriptionLi.classList.add("tab_content-description_li");
            const tabContentDescriptionArticle = document.createElement("article");
            tabContentDescriptionArticle.classList.add(
                "tab_content-description_Article"
            );
            const tabContentDescriptionP = document.createElement("p");
            tabContentDescriptionP.id = `${value[index].id}-title_no${i}`;
            tabContentDescriptionUl
                .appendChild(tabContentDescriptionLi)
                .appendChild(tabContentDescriptionArticle)
                .appendChild(tabContentDescriptionP).textContent =
                value[index].articles[i].title;
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

function displayOfCategoryImage(value) {
    value.reduce((prev, current, index) => {
        const tabContentList = document.getElementById(`${value[index].id}`);
        const tabContentImgP = document.createElement("p");
        tabContentImgP.classList.add("tab_content_img");
        const img = document.createElement("img");
        tabContentList.appendChild(tabContentImgP).appendChild(img).src =
            value[index].img;
        return prev;
    }, []);
}

function addIsNewIcon(value) {
    value.reduce((prev, current, index) => {
        for (let i = 0; i < value[index].articles.length; i++) {
            const setIsNew = value[index].articles[i].isNew;
            const tabContentDescriptionP = document.getElementById(
                `${value[index].id}-title_no${i}`
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

function numberOfDisplayComments(value) {
    value.reduce((prev, current, index) => {
        for (let i = 0; i < value[index].articles.length; i++) {
            const setCommentCount = value[index].articles[i].commentCount;
            const tabContentDescriptionP = document.getElementById(
                `${value[index].id}-title_no${i}`
            );
            const comment = document.createElement("span");
            comment.classList.add("comment");
            const commentImg = document.createElement("img");
            if (setCommentCount > 0) {
                comment.textContent = setCommentCount;
                tabContentDescriptionP.appendChild(commentImg).src =
                    "./img/comment.png";
                tabContentDescriptionP.appendChild(comment);
            }
        }
        return prev;
    }, []);
}

function InitialSettingOfTab(value) {
    const tabTriggers = document.querySelectorAll(".tab_item");
    const tabTargets = document.querySelectorAll(".tab_content");
    value.reduce((prev, current, index) => {
        if (value[index].isOpen === true) {
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
