const getJsonUrl = "data.json";
const toDomUl = document.getElementById("js-parent");



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

const getJsonData = ((data) => {

    new Promise(function (resolve, reject) {
        return resolve(data);
    })
        .then(createOfTab)
        .then(createOfTabContents)
        .then(InitialSettingOfTab)
        .then(displayOfCategoryImage)
        .then(tabSwitch)
        .catch((e) => {
            console.log(e); tabsContainerLi.textContent = "ただいまサーバー側で通信がぶっ壊れています";
        });
});



function lodingJsonData() {
    fetch(getJsonUrl)
        .then(response => response.json())
        .then(data => { getJsonData(data.data); })
        .catch((e) => { console.log(e) });
} lodingJsonData();




function createOfTab(value) {
    value.reduce((prev, current, index) => {
        const tabItemLi = document.createElement("li");
        tabItemLi.classList.add("tab_item");
        tabItemLi.dataset.id = value[index].id;
        tabItemLi.textContent = value[index].category;
        console.log(tabItemLi);
        tabsFragment.appendChild(tabItemLi);
        return prev;
    }, [])
    tabsUl.appendChild(tabsFragment);
    return value;
}


function InitialSettingOfTab(value) {
    const tabTriggers = document.querySelectorAll('.tab_item');
    const tabTargets = document.querySelectorAll('.tab_content');
    value.reduce((prev, current, index) => {
        if (value[index].isOpen === true) {
            tabTriggers[index].classList.add("is-active");
            tabTargets[index].classList.add("is-show");
            
        } else {
            tabTriggers[index].classList.remove("is-active");
        }
        return prev;
    }, [])
    return value
}


function displayOfCategoryImage(value) {
    value.reduce((prev, current, index) => {
        const tabContentList = document.getElementById(`${value[index].id}`);
        const tabContentImgP = document.createElement("p");
        tabContentImgP.classList.add("tab_content_img");
        const img = document.createElement("img");
        tabContentList.appendChild(tabContentImgP)
            .appendChild(img)
            .src = value[index].img;
        return prev;
    }, [])
}


function createOfTabContents(value) {

    value.reduce((prev, current, index) => {
        const tabContentLi = document.createElement("li");
        tabContentLi.classList.add("tab_content");
        tabContentLi.id = value[index].id;
        const tabContentDescriptionUl = document.createElement("ul");
        for (const setContent of value[index].articles) {

            const tabContentDescriptionLi = document.createElement("li");
            tabContentDescriptionLi.classList.add("tab_content-description_li");
            const tabContentDescriptionArticle = document.createElement("article");
            tabContentDescriptionArticle.classList.add("tab_content-description_Article");
            const tabContentDescriptionP = document.createElement("p");

            tabContentDescriptionUl.appendChild(tabContentDescriptionLi)
                .appendChild(tabContentDescriptionArticle)
                .appendChild(tabContentDescriptionP)
                .textContent = setContent.title;

            if (setContent.isNew === true) {
                const newContent = document.createElement("span");
                tabContentDescriptionP.appendChild(newContent);
                newContent.classList.add("new");
                newContent.textContent = "new";
            }

            if (setContent.commentCount > 0) {
                const comment = document.createElement("span");
                comment.classList.add("comment");
                const commentImg = document.createElement("img");
                tabContentDescriptionArticle.appendChild(comment)
                    .textContent = setContent.commentCount;
                tabContentDescriptionP.appendChild(commentImg)
                    .src = "../img/comment.png";
            }
        }
        contentsFragment.appendChild(tabContentLi)
            .appendChild(tabContentDescriptionUl);
        return prev;
    }, [])
    tabContentsUl.appendChild(contentsFragment);
    tabContentsContainerLi.appendChild(tabContentsUl);
    return value
}

function tabSwitch() {
    const tabTriggers = document.querySelectorAll('.tab_item');
    const tabTargets = document.querySelectorAll('.tab_content');
    for (let a = 0; a < tabTriggers.length; a++) {
        tabTriggers[a].addEventListener('click', (e) => {
            const currentMenu = e.currentTarget;
            const currentContent = document.getElementById(currentMenu.dataset.id);
            for (let b = 0; b < tabTriggers.length; b++) {
                tabTriggers[b].classList.remove('is-active');
            }
            currentMenu.classList.add('is-active');
            for (let c = 0; c < tabTargets.length; c++) {
                tabTargets[c].classList.remove('is-show');
            }
            if (currentContent !== null) {
                currentContent.classList.add('is-show');
            }
        });
    }
}
