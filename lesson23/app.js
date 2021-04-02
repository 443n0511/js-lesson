const url = "https://jsondata.okiba.me/v1/json/0aIV0210402040314";
const parent = document.getElementById("js-parent");

const table = document.createElement('table');
table.id = "table";
table.classList.add("table");

const div = document.createElement('div');
div.classList.add("pagenation-container");

const pageSetup = 5;
let step = pageSetup;
let initData;


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


async function initializeInstantiatedDatas() {
    const response = await fetch(url);
    const jsonData = await response.json();
    const instantiationDatas = new Pagenation(jsonData);
    initData = instantiationDatas.getDatas();

}
initializeInstantiatedDatas();


function createElements(data) {
    const instantiationDatas = new Pagenation(data);
    const datas = instantiationDatas.getDatas();
    createTableHeader(instantiationDatas);
    createTableBody(datas);
    sortButtonClick(instantiationDatas);
    createArrowButton(instantiationDatas);
    currentPagenation(instantiationDatas);
}


function setSort() {
    const id = document.getElementById("id");
    const age = document.getElementById("age");
    id.dataset.sort = 'sort';
    age.dataset.sort = 'sort';

}

function createTableHeader(instantiationDatas) {
    const titles = instantiationDatas.getTitles();
    const thead = document.createElement('thead');
    thead.id = "thead";
    thead.classList.add("thead");
    const theadTr = document.createElement('tr');
    const tableBodyFragment = document.createDocumentFragment();

    titles.forEach((title) => {
        const currentValues = Object.values(title);
        const currentkeys = Object.keys(title);
        const theadTh = document.createElement('th');
        const theadP = document.createElement('p');

        theadTh.id = currentkeys;
        theadP.textContent = currentValues;
        theadP.classList.add("data-sort", "_title");

        tableBodyFragment
            .appendChild(theadTh)
            .appendChild(theadP);
    })
    parent.insertBefore(table, parent.firstChild)
        .appendChild(thead)
        .appendChild(theadTr)
        .appendChild(tableBodyFragment);

    setSort();

}

async function createTableBody(datas) {
    const tbody = document.createElement('tbody');
    tbody.id = "tbody";
    tbody.classList.add("body");
    let i = 0;
    datas.some((current) => {
        if (i >= step) {
            return true;
        } else {
            i++;
            const tr = document.createElement('tr');
            const currentValues = Object.values(current);
            currentValues.forEach((value) => {
                const td = document.createElement('td');
                td.textContent = value;
                tr.appendChild(td)
            })
            parent.insertBefore(table, parent.children[1])
                .appendChild(tbody)
                .appendChild(tr);
        }
    })
}

function buttonsInit() {
    const sortButtons = [...document.getElementsByClassName('sort-button')];
    sortButtons.forEach(button => button.disabled = false);
};

async function sortButtonClick(instantiationDatas) {
    await initialSettingSort();
    const ascButtons = [...document.getElementsByClassName('_ASC')];
    const descButtons = [...document.getElementsByClassName('_DESC')];
    const sortStatus = {
        DESC: "DESC",
        ASC: "ASC",
        NORMAL: "NORMAL"
    };

    descButtons.forEach((descButton, index) => {
        descButton.addEventListener('click', () => {
            const ascButton = ascButtons[index];
            const tbody = document.getElementById("tbody");

            step = pageSetup;
            buttonDisabled(instantiationDatas);
            buttonsInit();
            tbody.remove();
            if (descButton.getAttribute('data-status') === sortStatus["DESC"]) {
                descButton.disabled = true;
                ascButton.disabled = false;
                descButton.dataset.status = 'NORMAL';
                ascButton.dataset.status = 'NORMAL';
                const buttonType = descButton.dataset.type;
                const result = instantiationDatas.sortDesc(buttonType);
                createTableBody(result);
            } else {
                descButton.disabled = false;
                ascButton.disabled = false;
                createTableBody(initData);
                ascButton.dataset.status = 'ASC';
                descButton.dataset.status = 'DESC';
            }
        });
    })


    ascButtons.forEach((ascButton, index) => {
        ascButton.addEventListener('click', () => {
            const descButton = descButtons[index];
            const tbody = document.getElementById("tbody");

            step = pageSetup;
            buttonDisabled(instantiationDatas);
            buttonsInit();
            tbody.remove();
            if (ascButton.getAttribute('data-status') === sortStatus["ASC"]) {
                ascButton.disabled = true;
                descButton.disabled = false;
                ascButton.dataset.status = 'NORMAL';
                descButton.dataset.status = 'NORMAL';
                const buttonType = descButton.dataset.type;
                const result = instantiationDatas.sortAsc(buttonType);
                createTableBody(result);
            } else {
                descButton.disabled = false;
                ascButton.disabled = false;
                createTableBody(initData);
                ascButton.dataset.status = 'ASC';
                descButton.dataset.status = 'DESC';
            }
        });
    })
}

async function initialSettingSort() {
    const tabletHeader = document.getElementsByTagName("th");
    const tabletHeaderArray = Array.from(tabletHeader);
    const sortsDataAttributes = [];
    tabletHeaderArray.forEach((tabletHeader) => {
        if (tabletHeader.hasAttribute("data-sort")) {
            sortsDataAttributes.push(tabletHeader);
        }
    })
    createSortButtons(sortsDataAttributes);
}

function createSortButtons(sortsDataAttributes) {
    const ascButton = buttonAdd("ASC", sortsDataAttributes);
    const descButton = buttonAdd("DESC", sortsDataAttributes);

    sortsDataAttributes.forEach((sortsDataAttribute, index) => {
        const sortButtonContainerDiv = document.createElement('div');
        sortButtonContainerDiv.classList.add("sort-button_container");
        sortButtonContainerDiv.appendChild(ascButton[index]);
        sortButtonContainerDiv.appendChild(descButton[index]);
        sortsDataAttribute.appendChild(sortButtonContainerDiv);
    })
}


function buttonAdd(buttonType, sortsDataAttributes) {
    const buttons = [];
    sortsDataAttributes.forEach((value, index) => {
        const button = document.createElement('button');
        button.id = `${buttonType}_${sortsDataAttributes[index].id}`;
        button.classList.add("sort-button", `_${buttonType}`);
        if (buttonType === "ASC") {
            button.textContent = "▲";
        } else {
            button.textContent = "▼";
        }
        button.dataset.status = `${buttonType}`;
        button.dataset.type = `${sortsDataAttributes[index].id}`;
        buttons.push(button);
    })
    return buttons;
}

function createArrowButton(datas) {
    const nextButton = document.createElement('button');
    nextButton.textContent = 'next▶';
    nextButton.classList.add("pagination-botton", "_next");
    nextButton.addEventListener('click', () => {
        step = step + pageSetup;
        currentPagenationInit(datas);
        if (step >= datas.getDatas().length) {
            tbody.remove();
            const result = datas.nextPagination();
            createTableBody(result);
            nextButton.disabled = true;
            prevButton.disabled = false;
        } else {
            prevButton.disabled = false;
            nextButton.disabled = false;
            tbody.remove();
            const result = datas.nextPagination();
            createTableBody(result);
        }
    }, false);
    const prevButton = document.createElement('button');
    prevButton.textContent = '◀prev';
    prevButton.classList.add("pagination-botton", "_prev");
    prevButton.disabled = true;
    prevButton.addEventListener('click', () => {
        step = step - pageSetup;
        currentPagenationInit(datas);
        if (step > 5) {
            tbody.remove();
            prevButton.disabled = false;
            const result = datas.prevPagination();
            createTableBody(result);
        } else {
            tbody.remove();
            const result = datas.prevPagination();
            createTableBody(result);
            prevButton.disabled = true;
            nextButton.disabled = false;
        }
    }, false);

    div.appendChild(prevButton);
    div.appendChild(nextButton);
    parent.appendChild(div)

}


function buttonDisabled(datas) {
    const dataLength = datas.getDatas()
    const prevButton = document.querySelector('._prev'),
        nextButton = document.querySelector('._next');
    if (step <= 5) {
        prevButton.disabled = true;
    } else {
        prevButton.disabled = false;
    }
    if (step === dataLength) {
        nextButton.disabled = true;
    } else {
        nextButton.disabled = false;
    }
}

function currentPagenation(data) {
    const currentNumber = document.createElement('p');
    const currentPage = document.createElement('p');
    currentNumber.id = "current-number";
    currentPage.id = "current-page";
    currentNumber.textContent = `${step}件/${data.getDatas().length}件中`;
    currentPage.textContent = `${step / pageSetup}/${data.getDatas().length / pageSetup}ページ`;
    parent.insertBefore(currentNumber, parent.firstChild)
    div.insertBefore(currentPage, div.children[1])
}
function currentPagenationInit(data) {
    const currentNumber = document.getElementById('current-number');
    const currentPage = document.getElementById('current-page');
    currentNumber.textContent = `${step}件/${data.getDatas().length}件中`;
    currentPage.textContent = `${step / pageSetup}/${data.getDatas().length / pageSetup}ページ`;
}



class Pagenation {
    constructor(data) {
        this.data = data;
    }

    getTitles() {
        return this.data.titles;
    }

    getDatas() {
        return this.data.data;
    }

    nextPagination() {
        const sortResult = this.getDatas().slice((step - pageSetup), (step));
        return sortResult;

    }
    prevPagination() {
        const sortResult = this.getDatas().slice((step - pageSetup), (step));
        return sortResult;
    }

    sortAsc(buttonType) {
        const sortResult = this.getDatas().sort(function (a, b) {

            return a[buttonType] - b[buttonType];
        });
        return sortResult;
    }

    sortDesc(buttonType) {
        const sortResult = this.getDatas().sort(function (a, b) {
            return b[buttonType] - a[buttonType];
        });
        return sortResult;
    }

}