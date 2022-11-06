import maskedInput from './modules/maskedInput'
import { dropdownGroup } from './helpers/dropdownGroup'
import { editingContacts } from './helpers/editingContacts'
import { renderContactsBook } from './helpers/renderContactsBook'
import { renderContactsGroup } from './helpers/renderContactsGroup'
import { toggleModal } from './helpers/toggleModal'
import { headerFixed } from './modules/headerFixed'

const app = () => {
  const descriptionLabel = document.querySelector('.description-label')
  const contactList = document.querySelector('.contact-list')
  const contactsGroupList = JSON.parse(localStorage.getItem('groupList')) || new Array()
  const contactsBookList = JSON.parse(localStorage.getItem('contactsBook')) || new Object()

  if (!localStorage.getItem('contactsBook') || Object.keys(contactsBookList).length === 0) {
    contactList.classList.add('_hide')
    if (descriptionLabel.classList.contains('_hide')) {
      descriptionLabel.classList.remove('_hide')
    }
  } else { 
    contactList.classList.remove('_hide')
    descriptionLabel.classList.add('_hide')
    renderContactsBook()
  }

  toggleModal()
  renderContactsGroup(contactsGroupList)
  dropdownGroup()
  editingContacts()
}

headerFixed()
app()
maskedInput()