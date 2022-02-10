function dateAndTimeToTimestamp(dateInputElement, timeInputElement) {
    const dueDate = dateInputElement.valueAsNumber; // Returns the timestamp at midnight for the given date
    const dueTime = timeInputElement.valueAsNumber; // Returns the number of milliseconds from midnight to the time

    if(dueDate && dueTime) { // The user specified both a due date & due time
        //Add the timezone offset to account for the fact that timestamps are specified by UTC
        const timezoneOffset =  (new Date()).getTimezoneOffset() * 60 * 1000;
        return dueDate + dueTime + timezoneOffset;
    } else {
        // if the user did not specify both a due date and due time, return false
        return false;
    }
}

function addTask(description, dueTime = false) {
    let taskList = document.querySelector('#task_list');
    let newTask = document.createElement("li");
    const dateString = new Date(dueTime)

    if (dueTime) {
        newTask.innerHTML = (description) + "<span class=due>due " + dateString.toLocaleDateString() + " " + dateString.toLocaleTimeString() + " </span><button class='btn btn-sm btn-outline-danger done;' type=button>Done</button>";
    }
    else {
        newTask.innerHTML = (description) + " <button class='btn btn-sm btn-outline-danger done;' type=button>Done</button>";
    }

    taskList.appendChild(newTask);
    document.querySelector('input#duetime_input').value = '';
    document.querySelector('input#duedate_input').value = '';
    document.querySelector('input#task_description_input').value = '';
    return taskList; 
}

function removeTask(taskList, item) {
    item.remove();
    return taskList;
}

const addTaskButton = document.querySelector('#add_task');
const descriptionField = document.querySelector('input#task_description_input')
const taskList = document.querySelector('#task_list')

addTaskButton.addEventListener("click", event => {
    let descriptionInput = document.querySelector('input#task_description_input');
    let dueDateInput = document.querySelector('input#duedate_input');
    let dueTimeInput = document.querySelector('input#duetime_input');
    let timestamp = dateAndTimeToTimestamp(dueDateInput, dueTimeInput);
    addTask(descriptionInput.value, timestamp)
});

descriptionField.addEventListener('keydown', event => {
     if (event.keyCode === 13) {
        let descriptionInput = document.querySelector('input#task_description_input');
        let dueDateInput = document.querySelector('input#duedate_input');
        let dueTimeInput = document.querySelector('input#duetime_input');
        let timestamp = dateAndTimeToTimestamp(dueDateInput, dueTimeInput);
        addTask(descriptionInput.value, timestamp)
     }
 });

taskList.addEventListener("click", event => {
    if (event.target.classList.contains('done;')) {
        // How to identify proper list item?
         removeTask(taskList, event.target.parentElement);
        }
 });
