const workForm = document.querySelector(".js-workForm"),
    workInput = workForm.querySelector("input"),
    workList = document.querySelector(".js-workList"),  // or, can also add small modules (TBU)
    persForm = document.querySelector(".js-persForm"),
    persInput = persForm.querySelector("input"),
    persList = document.querySelector(".js-persList");

const WORK_LS = 'work-to-dos',
    PERS_LS = 'personal-to-dos';

let workToDos = [];  // arrays are [] in JS (whereas in python, this is a list). let is used because we are going to change toDos later when we delete a toDo
let persToDos = [];

function saveWork(){
    localStorage.setItem(WORK_LS, JSON.stringify(workToDos));  // localStorage does not recognize JS objects. it thinks they are strings, so we JSON stringify them when saving toDos (which is an array) as a value of the local storage.
}

function savePers(){
    localStorage.setItem(PERS_LS, JSON.stringify(persToDos)); 
}

function deleteWork(event){
    const btn = event.target;  // finds the "button"
    const li = btn.parentNode;  // finds which button we are clicking (finds the id)
    workList.removeChild(li);
    const cleanToDos = workToDos.filter(function(toDo){  // filter executes a function for every element of the array that matches the condition in return, and cleanToDos becomes the filtered array
        return toDo.id !== parseInt(li.id);  // li.id is string, while toDo.id is a number. parseInt converts the string to an integer
    });
    workToDos = cleanToDos;
    saveWork();
}

function deletePers(event){
    const btn = event.target;
    const li = btn.parentNode;
    persList.removeChild(li);
    const cleanToDos = persToDos.filter(function(toDo){  
        return toDo.id !== parseInt(li.id);
    });
    persToDos = cleanToDos;
    savePers();
}

function paintWork(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = workToDos.length + 1;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteWork);
    span.innerText = text
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    workList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    workToDos.push(toDoObj);
    saveWork();
}

function paintPers(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = persToDos.length + 1;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deletePers);
    span.innerText = text
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    persList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    persToDos.push(toDoObj);
    savePers();
}

function handleSubmit1(event){
    event.preventDefault();
    const currentValue = workInput.value;
    paintWork(currentValue);
    workInput.value = "";  // after pressing enter, the input turns to ""
}

function handleSubmit2(event){
    event.preventDefault();
    const currentValue = persInput.value;
    paintPers(currentValue);
    persInput.value = "";
}

function loadToDos(){
    const loadedWork = localStorage.getItem(WORK_LS);
    const loadedPers = localStorage.getItem(PERS_LS);
    if (loadedWork !== null) {
        const parsedToDos = JSON.parse(loadedWork);  // change JSON to JS object. this is called parsing
        parsedToDos.forEach(function(toDo){  // forEach calls function toDo to every element of the array
            paintWork(toDo.text);  // so, this means we do paintWork to every element of parsedToDos, which is an array
        });
    }
    if (loadedPers !== null) {
        const parsedToDos = JSON.parse(loadedPers);
        parsedToDos.forEach(function(toDo){ 
            paintPers(toDo.text);
        });
    }
}

function init(){
    loadToDos();
    workForm.addEventListener("submit", handleSubmit1);
    persForm.addEventListener("submit", handleSubmit2);
}

init();