import { renderContactsBook } from './renderContactsBook'

export const editingContacts = () => {
  document.querySelector('.contact-list__container').onclick = (event) => {
    const editContactButton = event.target.closest('.contact-list__button_edit')
    const deleteContactButton = event.target.closest('.contact-list__button_remove')

    if (event.target && editContactButton) {
      console.log('Click on button Edit')
      const parentNode = event.target.closest('.contact-list__item')
      const inputName = parentNode.querySelector('[name="userName"]')
      const inputPhone = parentNode.querySelector('[name="userPhone"]')
      const inputGroup = parentNode.querySelector('[name="userGroup"]')
      const inputId = parentNode.querySelector('[name="userId"]')

      if (!parentNode.classList.contains('_edit')) {
        inputName.disabled = false
        inputPhone.disabled = false
        parentNode.classList.add('_edit')
        
        inputName.focus()
      } else {
        if (confirm('Сохранить изменения?')) {
          inputName.disabled = true
          inputPhone.disabled = true
          parentNode.classList.remove('_edit')

          const id = inputId.value
          const group = inputGroup.value
          const name = inputName.value
          const phone = inputPhone.value

          const contactsList = JSON.parse(localStorage.getItem('contactsBook'))

          contactsList[group].map((item) => {
            if (item.userId === id) {
              item.userName = name
              item.userPhone = phone
            }
            return item
          })

          localStorage.setItem('contactsBook', JSON.stringify(contactsList))
        }
      }
    }

    if (event.target && deleteContactButton) {
      console.log('Click on button Delete')
      const parentNode = event.target.closest('.contact-list__item')
      const inputId = parentNode.querySelector('[name="userId"]')
      const inputGroup = parentNode.querySelector('[name="userGroup"]')
      const contactsList = JSON.parse(localStorage.getItem('contactsBook'))

      if (confirm('Действительно хотите удалить этот контакт?')) {
        const newGroupContacts = contactsList[inputGroup.value].filter(({ userId }) => userId !== inputId.value)

        contactsList[inputGroup.value] = newGroupContacts

        if (contactsList[inputGroup.value].length === 0) {
          delete contactsList[inputGroup.value]
        }

        localStorage.setItem('contactsBook', JSON.stringify(contactsList))
        parentNode.remove()
      }
      renderContactsBook()
    }
  }

  const editContact = () => {

  }

  const deleteContact = () => {

  }
}