import { liHTMLTemplate } from "./getHTMLTemplate"

export const toggleModal = () => {
  document.addEventListener('click', (event) => {
    const buttonOpen = event.target.closest('.menu__btn')
    const buttonClose = event.target.closest('.header-modal__button-close')
    const modalWrapper = event.target.closest('.modal')
    const addNewGroupButton = document.querySelector('.button_add')

    if (buttonOpen) {
      const modalId = buttonOpen.dataset.id
      const modal = document.querySelector(`[data-${modalId}]`)

      modal.classList.add('_show')

      try {
        const groups = JSON.parse(localStorage.getItem('groupList'))
        const placeListNode = document.querySelector(
          '.contacts-group__list'
        )

        placeListNode.innerHTML = ''

        if (groups) {
          groups.forEach((group) => {
            placeListNode.insertAdjacentHTML('beforeend', liHTMLTemplate(group))
          })
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (event.target.classList.contains('modal') || buttonClose) {
      modalWrapper.classList.remove('_show')
      addNewGroupButton.classList.remove('_disabled')
      addNewGroupButton.disabled = false
    }
  })
}
