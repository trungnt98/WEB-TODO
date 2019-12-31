
var newTask = document.getElementById('addNewTask');
var btnAddTask = document.getElementById('submitTask');
var listTask = document.getElementById('listTask');
var inputCheck = document.getElementsByClassName('checkTaskDone');
var trash = document.getElementsByClassName('btnTrash');
var header = document.getElementById('header');

header.style.minHeight = header.offsetHeight + "px";
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

// Hiển thị ngày tháng

var date = document.getElementById("date");
date.innerHTML = ngaythang();


addTask = (nametask) => {
    let id = document.getElementsByClassName("checkTaskDone").length + 1;
    let item = `<div class="item row">
                    <div class="checkDone">
                        <input type="checkbox" onchange="taskDone(this)" id="task${id}" class="checkTaskDone">
                        <label for="task${id}"></label>
                    </div>
                    <h2 class="nameTask">${nametask}</h2>
                    <button class="btnTrash" onclick="removeTask(this)"><i class="fas fa-trash"></i></button>
                </div>`;
    listTask.insertAdjacentHTML('beforeend', item);
}

addNewTask = () => {
    let task = newTask.value;
    if (task) {
        addTask(task);
        newTask.value = '';
    }

}

toggleTaskDone = (nameTask) => {
    nameTask.classList.toggle('taskDone');
}

taskDone = (input) => {
    let nameTask = input.closest('.item').querySelector('.nameTask');
    toggleTaskDone(nameTask);
}

document.addEventListener('keyup',function(e) {
    if (e.keyCode == 13 ) {
        addNewTask();
    }
})

labelClick = (label) => {
    let inputSibling = label.parentNode.getElementsByTagName('input');
    taskDone(inputSibling);
}

removeTask = (element) => {
    let task = element.closest('.item');
    listTask.removeChild(task);
    
}
