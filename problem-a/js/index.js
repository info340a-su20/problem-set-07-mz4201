'use strict';

/* your code goes here! */
class Task {
  constructor(taskDesr, status){
    this.description = taskDesr;
    this.complete = status;
  }
  render(){
    let listElem = document.createElement('li');
    listElem.textContent = this.description;
    if (this.complete == true){
      listElem.classList.add("font-strike");
    }
    listElem.addEventListener('click',()=>{
      this.toggleFinished();
      listElem.classList.toggle('font-strike');
    })
    return listElem;
  }
  toggleFinished(){
    this.complete = !this.complete;
  }
}

class TaskList {
  constructor(taskArray){
    this.tasks = taskArray;
  }
  addTask(description){
    let newTask = new Task(description, false);
    this.tasks.push(newTask);
  }
  render(){
    let olElem = document.createElement('ol');
    this.tasks.forEach((task)=>{
      let nextTask = task.render();
      olElem.appendChild(nextTask);
    })
    return olElem;
  }
}

class NewTaskForm{
  constructor(submitResponse){
    this.submitCallback = submitResponse;
  }
  render(){
    let formElem = document.createElement('form');
    let inputElem = document.createElement('input');

    inputElem.classList.add('form-control','mb-3');
    inputElem.setAttribute('placeholder',"What else do you have to do?");
    formElem.appendChild(inputElem);

    let buttonElem = document.createElement('button');
    buttonElem.classList.add('btn','btn-primary');
    buttonElem.textContent = "Add task to list";
    formElem.appendChild(buttonElem);

    buttonElem.addEventListener('click', (event)=>{
      event.preventDefault();

      let input = inputElem.value
      let submit = this.submitCallback;
      submit(input);
    })

    return formElem;
  }
}

class App{
  constructor(newParentElement, newTaskList){
    this.parentElement = newParentElement;
    this.taskList = newTaskList;
  }
  render(){
    let listElem = this.taskList.render();
    this.parentElement.appendChild(listElem);

    let callRef = (arg) => this.addTaskToList(arg);
    let form = new NewTaskForm(callRef);
    this.parentElement.appendChild(form.render());
  }
  addTaskToList(description){
    this.taskList.addTask(description);
    this.parentElement.innerHTML = '';
    this.render();
  }
}


let taskListObj = new TaskList ([
  new Task("Make some classes", true),
  new Task("Arrow some functions", false)
]);

let appElem = document.querySelector('#app');

let appObj = new App(appElem, taskListObj)
appObj.render();

//Make functions and variables available to tester. DO NOT MODIFY THIS.
if(typeof module !== 'undefined' && module.exports){
  /* eslint-disable */
  if(typeof Task !== 'undefined') 
    module.exports.Task = Task;
  if(typeof TaskList !== 'undefined') 
    module.exports.TaskList = TaskList;
  if(typeof NewTaskForm !== 'undefined') 
    module.exports.NewTaskForm = NewTaskForm;
  if(typeof App !== 'undefined') 
    module.exports.App = App;
}
