import { liHTMLTemplate, liDropdownItemNode } from './getHTMLTemplate'
import { renderContactsBook } from './renderContactsBook'
import { saveNewContact } from './saveNewContact'

export const toggleModal = () => {
  document.addEventListener('click', (event) => {
    const modalWrapper = event.target.closest('.modal')
    const buttonOpen = event.target.closest('.menu__btn')
    const buttonClose = event.target.closest('.header-modal__button-close')
    const buttonAddNewGroup = document.querySelector('.button_add')

    if (buttonOpen) {
      const modalId = buttonOpen.dataset.id
      const modal = document.querySelector(`[data-${modalId}]`)
      const groups = JSON.parse(localStorage.getItem('groupList'))

      modal.classList.add('_show')

      if (modalId === 'add-group') {
        console.log('Открыто окно для создания групп')

        try {
          const placeListNode = document.querySelector('.contacts-group__list')

          placeListNode.innerHTML = ''

          if (groups) {
            groups.forEach((group) => {
              placeListNode.insertAdjacentHTML(
                'beforeend',
                liHTMLTemplate(group)
              )
            })
          }
        } catch (error) {
          console.error(error)
        }
      } else {
        console.log('Открыто окно для создания контактов')

        try {
          if (!groups) {
            modal.classList.remove('_show')
            alert('Добавьте хотя бы одну группу для контактов!')

            return
          }
          const placeListForItemsDropdown = document.querySelector(
            '.custom-dropdown__list'
          )

          placeListForItemsDropdown.innerHTML = ''

          if (groups) {
            groups.forEach((group) => {
              placeListForItemsDropdown.insertAdjacentHTML(
                'beforeend',
                liDropdownItemNode(group)
              )
            })
          }
        } catch (error) {
          console.error(error)
        }
      }
    }

    if (event.target.classList.contains('modal') || buttonClose) {
      modalWrapper.classList.remove('_show')
      buttonAddNewGroup.classList.remove('_disabled')
      buttonAddNewGroup.disabled = false

      if (event.target.closest('[data-add-contact]')) {
        document.querySelectorAll('.new-contact__input')
          .forEach((input) => input.value = '')
      }
    }

    if (event.target && event.target.closest('#save-contact')) {
      saveNewContact()
      renderContactsBook()
    }
  })
}
