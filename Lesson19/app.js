const url = "https://jsondata.okiba.me/v1/json/suuQG210308111758";
const parent = document.getElementById("js-parent");
const table = document.createElement('table');

table.id = "table";
table.classList.add("table");


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

function createElements(data) {
    createTableHeader(data);
    createTableBody(data.data);
    sortButtonClick(data);

}

function setSortAdd() {
    const id = document.getElementById("id");
    id.dataset.sort = 'sort';

}

function createTableHeader({ title }) {
    const thead = document.createElement('thead');
    thead.id = "thead";
    thead.classList.add("thead");
    const theadTr = document.createElement('tr');
    const tableBodyFragment = document.createDocumentFragment();

    title.forEach((value) => {
        const currentValues = Object.values(value);
        const currentkeys = Object.keys(value);
        const theadTh = document.createElement('th');
        const theadP = document.createElement('p');

        theadTh.id = currentkeys;
        theadP.textContent = currentValues;
        theadP.classList.add("data-sort", "_title");

        tableBodyFragment
            .appendChild(theadTh)
            .appendChild(theadP);
    })
    parent.appendChild(table)
        .appendChild(thead)
        .appendChild(theadTr)
        .appendChild(tableBodyFragment);

    setSortAdd();

}

function createTableBody(data) {
    const tbody = document.createElement('tbody');
    tbody.id = "tbody";
    tbody.classList.add("body");
    data.forEach((current) => {
        const tr = document.createElement('tr');
        const currentValues = Object.values(current);

        currentValues.forEach((value) => {
            const td = document.createElement('td');
            td.textContent = value;
            tr.appendChild(td)
        })
        parent.appendChild(table)
            .appendChild(tbody)
            .appendChild(tr);
    })
}

async function sortButtonClick({ data }) {
    await initialSettingSort();
    const ascButton = document.getElementById("asc");
    const descButton = document.getElementById("desc");
    const sortStatus = {
        DESC: "DESC",
        ASC: "ASC",
         NORMAL: "NORMAL"
       };

    descButton.addEventListener('click', () => {
        const tbody = document.getElementById("tbody");
        tbody.remove();
        if (descButton.getAttribute('data-status') == sortStatus["DESC"]) {
            descButton.disabled = true;
            ascButton.disabled = false;
            descButton.dataset.status = 'NORMAL';
            ascButton.dataset.status = 'NORMAL';
            sortDesc(data);
        } else {
            descButton.disabled = false;
            ascButton.disabled = false;
            sortInit(data);
            ascButton.dataset.status = 'ASC';
            descButton.dataset.status = 'DESC';
        }
    });

    ascButton.addEventListener('click', () => {
        const tbody = document.getElementById("tbody");
        tbody.remove();
        if (ascButton.getAttribute('data-status') == sortStatus["ASC"]) {
            ascButton.disabled = true;
            descButton.disabled = false;
            ascButton.dataset.status = 'NORMAL';
            descButton.dataset.status = 'NORMAL';
            sortAsc(data);

        } else {
            descButton.disabled = false;
            ascButton.disabled = false;
            sortInit(data);
            ascButton.dataset.status = 'ASC';
            descButton.dataset.status = 'DESC';
        }
    });
}

async function initialSettingSort() {
    const tabletHeader = document.getElementsByTagName("th");
    const tabletHeaderArray = Array.from(tabletHeader);
    tabletHeaderArray.forEach((value) => {
        if (value.hasAttribute("data-sort") == true) {
            createSortButtons()
        }
    })
}


async function createSortButtons() {
    let sortsDataAttributes = document.querySelectorAll('[data-sort]');
    sortsDataAttributes = Array.from(sortsDataAttributes);

    sortsDataAttributes.forEach((value) => {
        const sortButtonContainerDiv = document.createElement('div');
        sortButtonContainerDiv.classList.add("sort-button_container");

        const ascButton = document.createElement('button');
        ascButton.id = "asc";
        ascButton.classList.add("sort-button", "_asc");
        ascButton.textContent = "▲";
        ascButton.dataset.status = "ASC";

        const descButton = document.createElement('button');
        descButton.id = "desc";
        descButton.classList.add("sort-button", "_desc");
        descButton.textContent = "▼";
        descButton.dataset.status = "DESC";

        sortButtonContainerDiv.appendChild(ascButton);
        sortButtonContainerDiv.appendChild(descButton);
        value.appendChild(sortButtonContainerDiv);
    })
}

function sortAsc(data) {
    const sortResult = [...data].sort(function (a, b) {
        return a.id - b.id;
    });
    createTableBody(sortResult);
}

function sortDesc(data) {
    const sortResult = [...data].sort(function (a, b) {
        return b.id - a.id;
    });
    createTableBody(sortResult);
}

function sortInit(data) {
    const sortResult = [...data];
    createTableBody(sortResult);
}



