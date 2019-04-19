var links = [];

//Load from the local storage
function loadLocalStorage() {
    if (localStorage.getItem('bookmarks') != "" && localStorage.getItem('bookmarks')) {
        var bookmarks = localStorage.getItem('bookmarks');
        links = JSON.parse(bookmarks);
        //console.log('bookmarks:', JSON.parse(bookmarks));
    }
}
loadLocalStorage();

//Global variable of the selected item
var selectedIndex = 0;


//Load grid elements in DOM
function gridLoad() {
    const grid = document.getElementById("grid");
    for (let i = 0; i < links.length; i++) {
        var group = document.createElement("DIV");
        group.classList.add("group");
        group.style.animationDelay = 1 + i / 3 + "s";

        var name = document.createElement("P");
        var remove = document.createElement("A");
        remove.innerHTML = '✕';
        remove.classList.add("removeElement");
        remove.addEventListener("click", erase);
        name.innerHTML = links[i][0];

        var element = document.createElement("DIV");
        element.classList.add("item");
        element.style.backgroundImage = "url(" + links[i][1] + ")";

        var removeId = document.createAttribute("removeId");
        var selectionId = document.createAttribute("selectionId");
        selectionId.value = i;
        removeId.value = i;

        remove.setAttributeNode(removeId);
        group.appendChild(element);
        group.appendChild(name);
        group.setAttributeNode(selectionId);
        group.addEventListener("click", go);
        group.appendChild(remove);
        grid.appendChild(group);
    }
}
gridLoad();


//Go to link
function go() {
    selectedIndex = this.getAttribute("selectionId");
    window.location.href = links[selectedIndex][2];
}

//Remove
function erase() {
    selectedIndex = this.getAttribute("removeId");
    links.splice(selectedIndex, 1);
    localStorage.setItem('bookmarks', JSON.stringify(links));
    location.reload();
}

//Assign events to UI HTML elements
const newBookmark = document.getElementById("newBookmark");
const player = document.getElementById("player");

newBookmark.addEventListener("click", function () {
    player.style.display = "block";
});

const close = document.getElementById("player-close");

close.addEventListener("click", function () {
    player.style.display = "none";
});

const add = document.getElementById("player-add-button");
add.addEventListener("click", addBookmark);

const title = document.getElementById("player-title-input");
const imageLink = document.getElementById("player-image-input");
const link = document.getElementById("player-link-input");
const image = document.getElementById("player-image");

//Add new bookmark
function addBookmark() {
    var bookmark;
    if (title.value && link.value) {
        if (!imageLink.value)
            imageLink.value = "images/bm.png";
        title.value = title.value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        imageLink.value = imageLink.value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        link.value = link.value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        bookmark = [title.value, imageLink.value, link.value];
        title.value = "";
        imageLink.value = "";
        link.value = "";
        links.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(links));
        location.reload();
    }
};

imageLink.addEventListener("blur", function () {
    image.src = this.value;
    image.onerror = function () {
        this.src = 'images/bm.png';
    };
});
