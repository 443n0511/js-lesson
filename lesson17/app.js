const getJsonUrl = "data.json";
const ul = document.getElementById("js-parent");
const tabsContainer = document.createElement("li");
const tabContentsContainer = document.createElement("li");
const tabs = document.createElement("ul");
const tabContents = document.createElement("ul");
tabsContainer.classList.add("tabs_container");
tabContentsContainer.classList.add("tab_contents_container");
tabs.classList.add("tabs");
tabContents.classList.add("tab_contents");
ul.prepend(tabsContainer);
ul.appendChild(tabContentsContainer).appendChild(tabContents);
tabsContainer.appendChild(tabs);
function lodingJsonData() {
    fetch(getJsonUrl)
        .then(response => response.json())
        .then(data => { getJsonData(data.data); })
        .catch((e) => { console.log(e) });
} lodingJsonData();
const getJsonData = (data) => {
    return new Promise((resolve) => {
        resolve(data);
        const tabsFragment = document.createDocumentFragment();
        const contentsFragment = document.createDocumentFragment();
        try {
            data.reduce((prev, current, arr) => {
                const tabItem = document.createElement("li");
                tabItem.classList.add("tab_item");
                tabItem.dataset.id = data[arr].id;
                tabItem.textContent = data[arr].contents;
                let tabContent = document.createElement("li");
                tabContent.classList.add("tab_content");
                tabContent.id = data[arr].id;
                let tabContentDescription = document.createElement("ul");
                tabContentDescription.classList.add("tab_content_description");
                for (const setContent of data[arr].text) {
                    let tabContentList = document.createElement("li");
                    let tabContentArticle = document.createElement("article");
                    let tabContentText = document.createElement("p");
                    tabContentDescription.appendChild(tabContentList).appendChild(tabContentArticle).appendChild(tabContentText);
                    tabContentText.classList.add("tab_content_text");
                    tabContentList.classList.add("tab_content_list");
                    tabContentArticle.classList.add("tab_content_article");
                    tabContentText.textContent = setContent.content;
                    if (setContent.new == "true") {
                        let newContent = document.createElement("span");
                        tabContentText.appendChild(newContent);
                        newContent.classList.add("new");
                        newContent.textContent = "new";
                    }
                    if (setContent.comment !== "0") {
                        let comment = document.createElement("span");
                        let commentImg = document.createElement("img");
                        tabContentArticle.appendChild(comment);
                        comment.classList.add("comment");
                        comment.textContent = setContent.comment;
                        tabContentText.appendChild(commentImg);
                        commentImg.src = "../img/comment.png";
                    }
                }
                if (data[arr].default == "true") {
                    tabItem.classList.add("is-active");
                    tabContent.classList.add("is-show");
                }
                tabsFragment.appendChild(tabItem);
                contentsFragment.appendChild(tabContents).appendChild(tabContent).appendChild(tabContentDescription);
                let tabContentImg = document.createElement("p");
                let img = document.createElement("img");
                tabContentImg.classList.add("tab_content_img");
                tabContent.appendChild(tabContentImg).appendChild(img);
                img.src = data[arr].img;
                return prev;
            }, [])
            tabs.appendChild(tabsFragment);
            tabContentsContainer.appendChild(contentsFragment);
            tabSwitch();
        } catch (e) {
            tabsContainer.textContent = "ただいまサーバー側で通信がぶっ壊れています";
            console.error(e.message);
        } finally {
            console.log("処理を終了しました");
        }
    });
};
function tabSwitch() {
    const tabTriggers = document.querySelectorAll('.tab_item');
    const tabTargets = document.querySelectorAll('.tab_content');
    for (let i = 0; i < tabTriggers.length; i++) {
        tabTriggers[i].addEventListener('click', (e) => {
            let currentMenu = e.currentTarget;
            let currentContent = document.getElementById(currentMenu.dataset.id);
            for (let i = 0; i < tabTriggers.length; i++) {
                tabTriggers[i].classList.remove('is-active');
            }
            currentMenu.classList.add('is-active');
            for (let i = 0; i < tabTargets.length; i++) {
                tabTargets[i].classList.remove('is-show');
            }
            if (currentContent !== null) {
                currentContent.classList.add('is-show');
            }
        });
    }
}

