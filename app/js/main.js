'use strict';

const addForm = document.querySelector('.todolist__form'),
  addInput = document.querySelector('.todolist__input'),
  sumItem = document.querySelector('.footer__num span'),
  toDoList = document.querySelector('.list'),
  delCompleted = document.querySelector('#delete-completed'),
  activeTask = document.querySelector('#active-task'),
  allTask = document.querySelector('#all-task'),
  showCompleted = document.querySelector('#show-completed');

let counter = 0,
  numTask = 0,
  i = 0;

addForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let task = addInput.value;

  if (task) {
    if (task.length > 21) {
      task = `${task.substring(0,22)}...`;
    }
  }
  // console.log(task);
  e.target.reset();
  newToDo(task);
});

function quantityChange(amount) {
  if (amount === 'add') {
    ++counter;
  } else if (amount === 'delete') {
    --counter;
  }
  sumItem.innerHTML = `${counter}`;

}

function newToDo(newTask) {
  let li = document.createElement('li');
  li.classList.add('list__item');
  numTask++;
  // console.log(numTask);

  li.innerHTML = `
    <input class="list__checkbox" type="checkbox" name="item-checkbox${numTask}" id="item-checkbox${numTask}">

    <label class="list__label" for="item-checkbox${numTask}">${newTask}</label>

      <div class="list__basket">
         <span class="sr-only">Cash</span>
      </div>
  `;

  toDoList.append(li);

  quantityChange('add');
}

toDoList.addEventListener('click', (e) => {
  let target = e.target;

  if (target.classList.contains('list__basket')) {
    let li = target.closest('.list__item');
    li.remove();

    quantityChange('delete');
  }

  if (target.classList.contains('list__label')) {
    target.classList.toggle('completed');
  }

  // console.log(e.target);
});

delCompleted.addEventListener('click', () => {
  let taskCompleted = document.querySelectorAll('.completed');

  taskCompleted.forEach(element => {
    let li = element.closest('.list__item');
    li.remove();
    quantityChange('delete');
  });
});


// showCompleted.addEventListener('click', () => {
//   let taskCompleted = document.querySelectorAll('.completed');

//   taskCompleted.forEach(element => {
//     let li = element.closest('.list__item');
//     li.remove();
//     quantityChange('delete');
//   });
// });

activeTask.addEventListener('click', (e) => {
  e.target.classList.toggle('active');
  let taskCompleted = document.querySelectorAll('.completed');

  taskCompleted.forEach(element => {
    let li = element.closest('.list__item');
    li.style.display = 'none';
  });
});

allTask.addEventListener('click', () => {
  let taskCompleted = document.querySelectorAll('.completed');

  taskCompleted.forEach(element => {
    let li = element.closest('.list__item');
    li.style.display = 'block';
  });
});