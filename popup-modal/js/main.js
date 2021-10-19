// show modal
const showModal = (openButton, modalContent) => {
  const openBtn = document.getElementById(openButton)
  const modalContainer = document.getElementById(modalContent)

  if (openButton && modalContent) {
    openBtn.addEventListener('click', () => {
      modalContainer.classList.add('show-modal')
    })
  }
}

showModal('open-modal', 'modal-container')

// CLOSE MODE
const closeBtn = document.querySelectorAll('.close-modal')

function closeModal () {
  const modalContainer  = document.getElementById('modal-container')
  modalContainer.classList.remove('show-modal')
}

closeBtn.forEach(c => c.addEventListener('click', closeModal))