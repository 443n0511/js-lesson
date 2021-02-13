const getJsonUrl = "data.json";
const toDomUl = document.getElementById("js-parent");

//カテゴリタブ
const tabsUl = document.createElement("ul");
tabsUl.classList.add("tabs");
const tabsContainerLi = document.createElement("li");
tabsContainerLi.classList.add("tabs_container");

//カテゴリ記事
const tabContentsUl = document.createElement("ul");
tabContentsUl.classList.add("tab_contents");
const tabContentsContainerLi = document.createElement("li");
tabContentsContainerLi.classList.add("tab_contents_container");

//カテゴリタブ・記事をDOMへ
toDomUl.prepend(tabsContainerLi);
toDomUl.appendChild(tabContentsContainerLi).appendChild(tabContentsUl);
tabsContainerLi.appendChild(tabsUl);


const getJsonData = (data) => {
    return new Promise((resolve) => {
        resolve(data);
        const tabsFragment = document.createDocumentFragment();
        const contentsFragment = document.createDocumentFragment();

        try {
            data.reduce((prev, current, arr) => {
                const dataId = data[arr].id;

                //各タブ生成
                const tabItemLi = document.createElement("li");
                tabItemLi.classList.add("tab_item");
                tabItemLi.dataset.id = dataId;
                tabItemLi.textContent = data[arr].contents;

                //各コンテンツ生成
                const tabContentLi = document.createElement("li");
                tabContentLi.classList.add("tab_content");
                tabContentLi.id = dataId;

                //コンテンツ内記事データ生成
                const tabContentDescriptionUl = document.createElement("ul");
                for (const setContent of data[arr].text) {
                    const tabContentDescriptionLi = document.createElement("li");
                    tabContentDescriptionLi.classList.add("tab_content-description_li");
                    const tabContentDescriptionArticle = document.createElement("article");
                    tabContentDescriptionArticle.classList.add("tab_content-description_Article");
                    const tabContentDescriptionP = document.createElement("p");

                    tabContentDescriptionUl.appendChild(tabContentDescriptionLi)
                        .appendChild(tabContentDescriptionArticle)
                        .appendChild(tabContentDescriptionP)
                        .textContent = setContent.content;

                    if (setContent.new == true) {
                        const newContent = document.createElement("span");
                        tabContentDescriptionP.appendChild(newContent);
                        newContent.classList.add("new");
                        newContent.textContent = "new";
                    }

                    if (setContent.comment !== 0) {
                        const comment = document.createElement("span");
                        comment.classList.add("comment");
                        const commentImg = document.createElement("img");
                        tabContentDescriptionArticle.appendChild(comment)
                            .textContent = setContent.comment;
                        tabContentDescriptionP.appendChild(commentImg)
                            .src = "../img/comment.png";
                    }
                }

                //タブの初期表示
                if (data[arr].default == true) {
                    tabItemLi.classList.add("is-active");
                    tabContentLi.classList.add("is-show");
                }
                //タブ・記事データをフラグメントに入れる
                tabsFragment.appendChild(tabItemLi);
                contentsFragment.appendChild(tabContentsUl)
                    .appendChild(tabContentLi)
                    .appendChild(tabContentDescriptionUl);

                //カテゴリ画像表示させる
                const tabContentImgP = document.createElement("p");
                tabContentImgP.classList.add("tab_content_img");
                const img = document.createElement("img");
                tabContentLi.appendChild(tabContentImgP)
                    .appendChild(img)
                    .src = data[arr].img;

                return prev;
            }, [])

            tabsUl.appendChild(tabsFragment);
            tabContentsContainerLi.appendChild(contentsFragment);

            tabSwitch();

        } catch (e) {
            tabsContainerLi.textContent = "ただいまサーバー側で通信がぶっ壊れています";
            console.error(e.message);
        } finally {
            console.log("処理を終了しました");
        }
    });
};


function lodingJsonData() {
    fetch(getJsonUrl)
        .then(response => response.json())
        .then(data => { getJsonData(data.data); })
        .catch((e) => { console.log(e) });
} lodingJsonData();

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

