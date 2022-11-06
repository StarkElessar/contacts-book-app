import { inputIsEmpty } from './isEmpty'
import { renderContactsBook } from './renderContactsBook'

export const saveNewContact = () => {
  const container = document.querySelector('.new-contact__container')
  const inputs = Array.from(container.querySelectorAll('input'))
  const contacts = JSON.parse(localStorage.getItem('contactsBook')) || new Object()
  const contactObj = {}
  
  inputs[0].value = Date.parse(new Date())
  inputs.forEach((input) => (contactObj[input.name] = input.value))

  if (inputs.some(inputIsEmpty)) {
    alert('Нельзя сохранить пустые поля!')
    return
  }

  const key = inputs[3].value

  if (contacts[key]) {
    contacts[key].push(contactObj)
  } else {
    contacts[key] = [contactObj]
  }

  localStorage.setItem('contactsBook', JSON.stringify(contacts))
  alert('Контакт успешно сохранен в книгу')

  inputs.forEach((input) => {
    if (input.name !== 'userGroup') {
      input.value = ''
    }
  })

  renderContactsBook()
}
