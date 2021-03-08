const url = "https://jsondata.okiba.me/v1/json/suuQG210308111758";
const parent = document.getElementById("js-parent");
const table = document.createElement('table');

table.id = "table";
table.classList.add("table");

const tableBodyFragment = document.createDocumentFragment();


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
    initialSettingSort();
}

function setSortAdd() {
    const id = document.getElementById("id");
    id.dataset.sort = 'sort';

}

function createTableHeader({ title }) {
    const thead = document.createElement('thead');
    thead.classList.add("thead");
    const theadTr = document.createElement('tr');

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
    data.reduce((prev, current) => {
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

        return prev;
    }, 0)
}





function sortButtonClick({ data }) {
    document.addEventListener('click', (event) => {
        const tbody = document.getElementById("tbody");
        tbody.remove();

        const sortButtons = document.querySelectorAll('.sort-button');
        sortButtons.forEach((value) => {
            value.disabled = false;
        });

        const target = event.target;
        const desc = target.id.includes('desc');

        if (desc == true) {
            data.sort(function (a, b) {
                sortButtons[1].disabled = true;
                return a.id - b.id;
            });

        } else {
            data.sort(function (a, b) {
                sortButtons[0].disabled = true;
                return b.id - a.id;
            });
        }
        createTableBody(data);
    }, false)
}


function initialSettingSort() {
    let tabletHeader = document.getElementsByTagName("th");
    tabletHeader = Array.from(tabletHeader);
    tabletHeader.forEach((value) => {
        const sortTabletHeader = value.hasAttribute("data-sort");
        if (sortTabletHeader == true) {
            createSortButtons()
        }
    })
}

function createSortButtons() {
    let sortsDataAttributes = document.querySelectorAll('[data-sort]');
    sortsDataAttributes = Array.from(sortsDataAttributes);

    sortsDataAttributes.forEach((value) => {
        const sortButtonContainerDiv = document.createElement('div');
        sortButtonContainerDiv.classList.add("sort-button_container");

        const ascButton = document.createElement('button');
        ascButton.id = `asc_${value.id}`
        ascButton.classList.add("sort-button", "_asc");
        ascButton.textContent = "▲";

        const descButton = document.createElement('button');
        descButton.id = `desc_${value.id}`
        descButton.classList.add("sort-button", "_desc");
        descButton.textContent = "▼";

        sortButtonContainerDiv.appendChild(ascButton);
        sortButtonContainerDiv.appendChild(descButton);
        value.appendChild(sortButtonContainerDiv);
    })
}


