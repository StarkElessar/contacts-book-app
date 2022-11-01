import { isWebp, headerFixed } from './modules'
import { contactGroupsAccordion } from './modules/contactGroupsAccordion'
import { dropdownGroup } from './modules/dropdownGroup'
import { renderContactsGroup } from './modules/renderContactsGroup'
import { toggleModal } from './modules/toggleModal'
/* Раскомментировать для использования */
// import { MousePRLX } from './libs/parallaxMouse'

/* Раскомментировать для использования */
// import Swiper, { Navigation, Pagination } from 'swiper'

// Проверка браузера на поддерку .webp изображений ====================================================================================================================================================
isWebp()
// ====================================================================================================================================================

// Паралакс мышей ====================================================================================================================================================
// const mousePrlx = new MousePRLX({})
// ====================================================================================================================================================

// Фиксированный header ====================================================================================================================================================
// headerFixed()
// ====================================================================================================================================================
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