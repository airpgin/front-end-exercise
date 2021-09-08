const draggableList = document.querySelector('#draggable-list')
const check = document.querySelector('#check')

const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page'
]

const listItems = []

let dragStartIndex;

createList();

function createList () {
  [...richestPeople]
    .map(item => ({ value: item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(item => item.value)
    .forEach((person, index) => {
      const listItem = document.createElement('li')
      // listItem.classList.add('over')

      listItem.setAttribute('data-index', index)
      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
          <p class="person-name">${person}</p>
          <i class="fas fa-grip-lines"></i>
        </div>
      `

      listItems.push(listItem)
      draggableList.appendChild(listItem)
    })

  addEventListeners()
}

function dragStart () {
  dragStartIndex = +this.closest('li').getAttribute('data-index')
  console.log(dragStartIndex);
}

function dragEnter () {
  this.classList.add('over')
}
function dragLeave () {
  this.classList.remove('over')
}

function dragOver (e) {
  e.preventDefault()
}

function dragDrop () {
  const dragEndIndex = +this.getAttribute('data-index')
  swapItems(dragStartIndex, dragEndIndex)

  this.classList.remove('over')
}

function swapItems (a, b) {
  const itemA = listItems[a].querySelector('.draggable')
  const itemB = listItems[b].querySelector('.draggable')
  listItems[b].appendChild(itemA)
  listItems[a].appendChild(itemB)
}

function checkOrder () {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector('.draggable').innerText.trim()

    if (personName !== richestPeople[index]) {
      listItem.classList.add('wrong')
    } else {
      listItem.classList.remove('wrong')
      listItem.classList.add('right')
    }
  })
}

function addEventListeners () {
  const draggables = document.querySelectorAll('.draggable')
  const dragListItem = document.querySelectorAll('.draggable-list li')

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart)
  })

  dragListItem.forEach(item => {
    item.addEventListener('dragover', dragOver)
    item.addEventListener('drop', dragDrop)
    item.addEventListener('dragenter', dragEnter)
    item.addEventListener('dragleave', dragLeave)
  })
}

check.addEventListener('click', checkOrder)