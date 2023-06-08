'use strict'

const addForm = document.querySelector('.todolist__form'),
  boxWrapper = document.querySelector('.todolist__box-wrapper'),
  boxOne = document.querySelector('.box-one'),
  boxTwo = document.querySelector('.box-two'),
  // todoButton = document.querySelector('.todolist__button'),
  addInput = document.querySelector('.todolist__input'),
  sumItem = document.querySelector('.footer__num span'),
  toDoList = document.querySelector('.list'),
  delCompleted = document.querySelector('#delete-completed'),
  showActive = document.querySelector('#show-active'),
  showAll = document.querySelector('#show-all'),
  showCompleted = document.querySelector('#show-completed')

let counter = 0,
  numTask = 0

// let x = getComputedStyle(boxWrapper).height;
// console.log(x);

function boxWidth() {
  let widthBox = Number(getComputedStyle(boxWrapper).width.slice(0, -2))

  if (widthBox < 700) {
    boxOne.style.width = `${widthBox - 20}px`
    boxTwo.style.width = `${widthBox - 30}px`
  } else {
    boxOne.style.width = '680px'
    boxTwo.style.width = '670px'
  }
}

boxWidth()

window.addEventListener('resize', boxWidth)

addForm.addEventListener('submit', e => {
  e.preventDefault()
  let task = addInput.value
  // if (task) {
  //   if (task.length > 25) {
  //     task = `${task.substring(0, 25)}...`
  //   }
  // }
  e.target.reset()
  newToDo(task)
})

function quantityChange(amount) {
  if (amount === 'add') {
    ++counter
  } else if (amount === 'delete') {
    --counter
    --numTask
  }
  sumItem.innerHTML = `${counter}`
}

function creatElement(id, value, status, checked) {
  let li = document.createElement('li')
  li.classList.add('list__item')

  li.innerHTML = `
    <input class="list__checkbox" type="checkbox" name="item-checkbox${id}" id="item-checkbox${id}" ${checked}>
    <label class="list__label ${status}" for="item-checkbox${id}">${value}</label>
      <div class="list__basket">
         <span class="sr-only">Cash</span>
      </div>
  `

  toDoList.append(li)
  quantityChange('add')
}

function newToDo(newTask) {
  numTask++
  creatElement(numTask, newTask, 'not-completed', '')

  let i = {
    id: numTask,
    value: newTask,
    checked: false,
  }
  localStorage.setItem(`task-${numTask}`, JSON.stringify(i))
}

let listChange = classHide => e => {
  document.querySelectorAll('.active').forEach(item => {
    item.classList.remove('active')
  })
  e.target.classList.add('active')

  document.querySelectorAll('.list__label').forEach(element => {
    let li = element.closest('.list__item')

    if (element.classList.contains(classHide)) {
      li.classList.remove('hide')
    } else {
      li.classList.add('hide')
    }
  })
}

toDoList.addEventListener('click', e => {
  let target = e.target

  if (target.classList.contains('list__basket')) {
    let li = target.closest('.list__item')
    li.remove()
    quantityChange('delete')

    let delNumTask = target.previousElementSibling.getAttribute('for').slice(13)
    localStorage.removeItem(`task-${delNumTask}`)
  } else if (target.classList.contains('list__label')) {
    target.classList.toggle('completed')
    target.classList.toggle('not-completed')

    let num = target.getAttribute('for').slice(13)

    let valueTask = localStorage.getItem(`task-${num}`),
      newValueTask = JSON.parse(valueTask)

    if (newValueTask['checked'] == true) {
      newValueTask['checked'] = false
    } else {
      newValueTask['checked'] = true
    }
    localStorage.setItem(`task-${num}`, JSON.stringify(newValueTask))
  }
})

delCompleted.addEventListener('click', () => {
  document.querySelectorAll('.completed').forEach(element => {
    let li = element.closest('.list__item')
    li.remove()
    quantityChange('delete')

    let num = element.getAttribute('for').slice(13)
    localStorage.removeItem(`task-${num}`)
  })
})

showActive.addEventListener('click', listChange('not-completed'))

showCompleted.addEventListener('click', listChange('completed'))

showAll.addEventListener('click', () => {
  document.querySelectorAll('.list__label').forEach(element => {
    let li = element.closest('.list__item')
    li.classList.remove('hide')
  })

  document.querySelectorAll('.active').forEach(item => {
    item.classList.remove('active')
  })
})

function addTaskFromLocalStorage() {
  let counter = 0
  for (let i = 0; i < localStorage.length; i++) {
    let keyNumber = Number(localStorage.key(i).slice(5))
    if (keyNumber > counter) {
      counter = keyNumber
    }
  }

  for (let i = 1; i <= counter; i++) {
    if (!localStorage.getItem(`task-${i}`)) {
      continue
    }

    let task = localStorage.getItem(`task-${i}`),
      taskValue = JSON.parse(task),
      status,
      checked

    if (taskValue.checked == true) {
      status = 'completed'
      checked = 'checked'
    } else {
      status = 'not-completed'
      checked = ''
    }

    numTask++

    creatElement(taskValue.id, taskValue.value, status, checked)

    // let li = document.createElement('li');
    // li.classList.add('list__item');

    // li.innerHTML = `
    //   <input class="list__checkbox" type="checkbox" name="item-checkbox${taskValue.id}" id="item-checkbox${taskValue.id}">

    //   <label class="list__label not-completed" for="item-checkbox${taskValue.id}">${taskValue.value}</label>

    //     <div class="list__basket">
    //        <span class="sr-only">Cash</span>
    //     </div>
    // `;

    // toDoList.append(li);
    // quantityChange('add');
  }
}

addTaskFromLocalStorage()
