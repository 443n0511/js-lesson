/*
tabs
*/
const tabsUrl = "https://jsondata.okiba.me/v1/json/vcHUg210221022056";
const tabsParent = document.getElementById("js-tabs-parent");


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
    const tabsUl = document.createElement("ul");
    tabsUl.classList.add("tabs");
    const tabsContainerLi = document.createElement("li");
    tabsContainerLi.classList.add("tabs_container");
    const tabsFragment = document.createDocumentFragment();

    tabs.reduce((prev, current, index) => {
        const tabItemLi = document.createElement("li");
        tabItemLi.classList.add("tab_item");
        tabItemLi.dataset.id = tabs[index].id;
        tabItemLi.textContent = tabs[index].category;
        tabsFragment.appendChild(tabItemLi);
        return prev;
    }, []);
    tabsParent.prepend(tabsContainerLi);
    tabsContainerLi
        .appendChild(tabsUl)
        .appendChild(tabsFragment);
}

function createOfTabContents(contents) {
    const tabContentsUl = document.createElement("ul");
    tabContentsUl.classList.add("tab_contents");
    const tabContentsContainerLi = document.createElement("li");
    tabContentsContainerLi.classList.add("tab_contents_container");
    const contentsFragment = document.createDocumentFragment();

    contents.reduce((prev, current, index) => {
        const tabContentLi = document.createElement("li");
        tabContentLi.classList.add("tab_content");
        tabContentLi.id = contents[index].id;
        const tabContentDescriptionUl = document.createElement("ul");
        for (let i = 0; i < contents[index].articles.length; i++) {
            const tabContentDescriptionLi = document.createElement("li");
            tabContentDescriptionLi.classList.add("tab_content-description_li");
            const tabContentDescriptionArticle = document.createElement("article");
            tabContentDescriptionArticle.classList.add("tab_content-description_Article");
            const tabContentDescriptionP = document.createElement("p");
            tabContentDescriptionP.id = `${contents[index].id}-title_no${i}`;
            tabContentDescriptionUl
                .appendChild(tabContentDescriptionLi)
                .appendChild(tabContentDescriptionArticle)
                .appendChild(tabContentDescriptionP)
                .textContent = contents[index].articles[i].title;
        }
        contentsFragment
            .appendChild(tabContentLi)
            .appendChild(tabContentDescriptionUl);
        return prev;
    }, []);

    tabsParent
        .appendChild(tabContentsContainerLi)
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
