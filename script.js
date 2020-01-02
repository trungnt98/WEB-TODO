// --------------------------- Vùng khởi tạo biến - Phase Initializing variables ---------------------- //

var newTask = document.getElementById('addNewTask');
var btn_Add = document.getElementById('submitTask');
var containTasks = document.getElementById('containTasks');
var inputCheck = document.getElementsByClassName('checkTaskDone');
var trash = document.getElementsByClassName('btnTrash');
var header = document.getElementById('header');
var date = document.getElementById("date");
var listTasks = [];

// ---------------------------- Vùng hàm ------------------------ //

// Lấy ngày tháng
ngaythang = () => {
    let mangThu = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy']
    let today = new Date();

    let thu = mangThu[today.getDay()];
    let ngay = today.getDate();
    let thang = today.getMonth() + 1;
    let nam = today.getFullYear();

    let date = thu + ', ' + ngay + '/' + thang + '/' + nam;
    return date;
}

getTaskStored = () => {

    if (localStorage.getItem('listTasks') !== null) {
        listTasks = JSON.parse(localStorage.getItem('listTasks'));
    }
}

bindToContainer = (id, name, status) => {
    let nameStatus = status ? 'taskDone' : '';
    let item = `<div class="item row" id="${id}">
                    <div class="checkDone">
                        <input type="checkbox" onchange="taskDone(this)" id="task_${id}" class="${nameStatus}">
                        <label for="task_${id}" class="${nameStatus}"></label>
                    </div>
                    <h2 class="taskName ${nameStatus} ">${name}</h2>
                    <button class="btnTrash" onclick="removeTask(this)"><i class="fas fa-trash"></i></button>
                </div>`;
    containTasks.insertAdjacentHTML('beforeend', item);
}

showTask = () => {
    containTasks.innerHTML = '';
    listTasks.map(function (value, key) {
        bindToContainer(key, value.name, value.done);
    })
}

updateListTasks = () => {
    let temp = JSON.stringify(listTasks);
    localStorage.setItem("listTasks", temp);
}

addTask = (nametask) => {
    let nameTask = nametask;
    let task = {
        name: nameTask,
        done: false
    }
    listTasks.push(task);
    let saveLocal = JSON.stringify(listTasks);
    localStorage.setItem("listTasks", saveLocal);
    bindToContainer(listTasks.length - 1, nameTask);

}

addNewTask = () => {
    let task = newTask.value;
    if (task) {
        addTask(task);
        newTask.value = '';
    }

}
taskDone = (element) => {
    let idTask = element.closest('.item').getAttribute("id");
    listTasks[idTask]['done'] = !listTasks[idTask]['done'];
    updateListTasks();
    showTask();
}

document.addEventListener('keyup', function (e) {
    if (e.keyCode == 13) {
        addNewTask();
    }
})

labelClick = (label) => {
    let inputSibling = label.parentNode.getElementsByTagName('input');
    taskDone(inputSibling);
}

removeTask = (element) => {
    let idTask = element.closest('.item').getAttribute("id");
    console.log(idTask);
    listTasks.splice(idTask, 1);
    updateListTasks();
    showTask();
}
// ---------------------------- Vùng startup - Phase Start Up ------------------------ //

date.innerHTML = ngaythang();
getTaskStored();
showTask();

// localStorage.removeItem('listTasks');




