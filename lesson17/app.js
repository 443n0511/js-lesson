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
ul.appendChild(tabContentsContainer);
tabsContainer.appendChild(tabs);
tabContentsContainer.appendChild(tabContents);

function lodingJsonData() {
    fetch(getJsonUrl)
        .then(response => response.json())
        .then(data => { getJsonData(data.data); })
        .catch((e) => { console.log(e) });
} lodingJsonData();

const getJsonData = (data) => {
    return new Promise((resolve) => {
        resolve(data);
        try {
            const tabsFragment = document.createDocumentFragment();
            const contentsFragment = document.createDocumentFragment();
            for (let i = 0; i < data.length; i++) {
                let tabItem = document.createElement("li");
                tabsFragment.appendChild(tabItem);
                tabItem.textContent = data[i].contents;
                tabItem.classList.add("tab_item");
                tabItem.dataset.id = data[i].id;
                let tabContent = document.createElement("li");
                let tabContentDescription = document.createElement("ul");
                if (data[i].default == "true") {
                    tabItem.classList.add("is-active");
                    tabContent.classList.add("is-show");
                }

                contentsFragment.appendChild(tabContents);
                tabContents.appendChild(tabContent);
                tabContent.classList.add("tab_content");
                tabContent.id = data[i].id;
                tabContentDescription.classList.add("tab_content_description");
                tabContent.appendChild(tabContentDescription);

                for (let a = 0; a < data[i].text.length; a++) {
                    let tabContentList = document.createElement("li");
                    let tabContentArticle = document.createElement("article");
                    let tabContentText = document.createElement("p");
                    tabContentList.appendChild(tabContentArticle);
                    tabContentDescription.appendChild(tabContentList);
                    tabContentArticle.appendChild(tabContentText);
                    tabContentText.classList.add("tab_content_text");
                    tabContentList.classList.add("tab_content_list");
                    tabContentArticle.classList.add("tab_content_article");
                    tabContentText.textContent = data[i].text[a].content;

                    if (data[i].text[a].new == "true") {
                        let newContent = document.createElement("span");
                        tabContentText.appendChild(newContent);
                        newContent.classList.add("new");
                        newContent.textContent = "new";
                    }
                    if (data[i].text[a].comment !== "0") {
                        let comment = document.createElement("span");
                        let commentImg = document.createElement("img");
                        tabContentArticle.appendChild(comment);
                        comment.classList.add("comment");
                        comment.textContent = data[i].text[a].comment;
                        tabContentText.appendChild(commentImg);
                        commentImg.src = "../img/comment.png";
                    }
                }

                let tabContentImg = document.createElement("p");
                let img = document.createElement("img");
                tabContentImg.classList.add("tab_content_img");
                tabContent.appendChild(tabContentImg);
                tabContentImg.appendChild(img);
                img.src = data[i].img;
            }
            tabs.appendChild(tabsFragment);
            tabContentsContainer.appendChild(contentsFragment);
            console.log(tabContentsContainer);
            tabSwitch();
        } catch (e) {
            let tabItem = document.createElement("li");
            tabs.appendChild(tabItem);
            tabItem.classList.add("tab_item");
            tabItem.textContent = "ただいまサーバー側で通信がぶっ壊れています";
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

