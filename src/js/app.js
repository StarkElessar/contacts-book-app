import { contactGroupsAccordion } from './helpers/contactGroupsAccordion'
import { dropdownGroup } from './helpers/dropdownGroup'
import { renderContactsGroup } from './helpers/renderContactsGroup'
import { toggleModal } from './helpers/toggleModal'

const app = () => {
  const descriptionLabel = document.querySelector('.description-label')
  const contactList = document.querySelector('.contact-list')
  const contactsGroupList = JSON.parse(localStorage.getItem('groupList')) || new Array()

  if (!localStorage.getItem('groupList')) {
    contactList.classList.add('_hide')
    if (descriptionLabel.classList.contains('_hide')) {
      descriptionLabel.classList.remove('_hide')
    }
  } else { 
    contactList.classList.remove('_hide')
    descriptionLabel.classList.add('_hide')
  }

  toggleModal()
  renderContactsGroup()
  contactGroupsAccordion()
  dropdownGroup()
}

app()