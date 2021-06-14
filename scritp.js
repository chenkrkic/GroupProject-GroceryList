// Selectors
const itemInput = document.querySelector('.item-input');
const addButton = document.querySelector('.add-b');
const itemList = document.querySelector('.item-list');

// Event Listeners
document.addEventListener('DOMContentLoaded', getItems);
addButton.addEventListener('click', addItem);
itemList.addEventListener('click', deleteItem);

//Functions
function addItem(event) {
    event.preventDefault();
    //ITEM DIV
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("add");
    //Create LI
    const newItem = document.createElement('li');
    newItem.innerText = itemInput.value;
    newItem.classList.add('track-item');
    itemDiv.appendChild(newItem);
    // ADD ITEM TO LOCALSTORAGE
    saveLocalItems(itemInput.value);

    const trashButton = document.createElement('button');
    trashButton.innerText = 'delete';
    trashButton.classList.add("trash-btn");
    itemDiv.appendChild(trashButton);
    // APPEND TO LIST
    itemList.appendChild(itemDiv);
    // CLEAR ITEM INPUT VALUE
    itemInput.value = "";
}

function deleteItem(event) {
    const item = event.target;
    // DELETE ITEM
    if (item.classList[0] === 'trash-btn') {
        const deleteItem = item.parentElement;
        removeLocalItems(item);
        deleteItem.remove();
    }

}

function saveLocalItems(item) {
    let items;
    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    items.push(item);
    localStorage.setItem("items", JSON.stringify(items));
}

function getItems() {
    let items;
    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    items.forEach(function (item) {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("add");
        const newItem = document.createElement('li');
        newItem.innerText = item;
        newItem.classList.add('track-item');
        itemDiv.appendChild(newItem);
        const trashButton = document.createElement('button');
        trashButton.innerText = 'delete';
        trashButton.classList.add("trash-btn");
        itemDiv.appendChild(trashButton);
        itemList.appendChild(itemDiv);
    });

};

function removeLocalItems(item) {
    let items;
    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    const itemIndex = item.children[0];
    items.splice(items.indexOf(itemIndex), 1);
    localStorage.setItem('items', JSON.stringify(items));
}

