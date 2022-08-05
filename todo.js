//Definitions
let listDOM = document.querySelector("#list");
let subContDOM = document.querySelector("#subCont");
let taskDOM = document.querySelector("#task");
let toastButtonDOM = document.querySelector("#liveToastBtn");
let listElements = document.getElementsByTagName("li");
let loadTask = localStorage.getItem("task")
let unCompleted = document.querySelector("#unCompletedInfo")
let UNCOMPLETED_COUNT = localStorage.getItem("uncompleted-tasks-count")
let uncompletedCounter = UNCOMPLETED_COUNT ? UNCOMPLETED_COUNT: "0";

//Get localstorage
listDOM.innerHTML = loadTask ? loadTask : "";
unCompleted.textContent = uncompletedCounter ? uncompletedCounter : "";

//Functions
for (let element = 0; element < listElements.length; element++) {
    let closeBTN = document.createElement("span");
    closeBTN.innerHTML = "&times;"
    closeBTN.classList.add("close")
    listElements[element].append(closeBTN)
    listElements[element].onclick = doneOrNot;
    closeBTN.onclick = removeElement;
};

function removeElement() {
    this.parentElement.remove()
    uncompletedCounter--
    unCompleted.textContent = uncompletedCounter ? uncompletedCounter : "";
};

function doneOrNot() {
    this.classList.toggle("checked")
};

function cleanList() {
    listDOM.innerHTML = ""
    $(".cleaned").toast("show")
    localStorage.clear()
    uncompletedCounter = 0
    localStorage.setItem("uncompleted-tasks-count", uncompletedCounter)
    unCompleted.textContent = uncompletedCounter ? uncompletedCounter : "0";
};

function newElement(){
    if (taskDOM.value == "") {
        $(".error").toast("show")
    }
    else {
        $(".success").toast("show")
        let createLi = document.createElement("li");
        createLi.innerHTML = taskDOM.value;
        listDOM.appendChild(createLi)
        localStorage.setItem("task", listDOM.innerHTML)
        uncompletedCounter = listElements.length
        localStorage.setItem("uncompleted-tasks-count", uncompletedCounter)
        taskDOM.value = ""
        createLi.onclick = doneOrNot
        let closeBTN = document.createElement("span");
        closeBTN.innerHTML = "&times;";
        closeBTN.classList.add("close")
        createLi.append(closeBTN)
        createLi.onclick = doneOrNot;
        closeBTN.onclick = removeElement;
        if (listDOM.firstChild) {
            subContDOM.classList.remove("d-none")
        };
        unCompleted.textContent = uncompletedCounter ? uncompletedCounter : "0";
}};

//First appearance
if (listDOM.firstChild) {
    subContDOM.classList.remove("d-none")
}
else {
    uncompletedCounter = 0
};