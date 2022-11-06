import { contactGroupsAccordion } from "./contactGroupsAccordion"
import { contactLiNode } from "./getHTMLTemplate"

export const renderContactsBook = () => {
  const containerList = document.querySelector('.contact-list__container')
  const contactsFromLocalStorage = JSON.parse(localStorage.getItem('contactsBook'))
  const labelGroups = Object.keys(contactsFromLocalStorage)

  containerList.innerHTML = ''

  labelGroups.forEach((label) => {
    containerList.insertAdjacentHTML('beforeend', `
      <div class="contact-list__group">
        <div class="contact-list__header">
          <span class="contact-list__label">${label}</span>
          <span class="contact-list__icon">
            <svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.8849 0.294983L6.29492 4.87498L1.70492 0.294983L0.294922 1.70498L6.29492 7.70498L12.2949 1.70498L10.8849 0.294983Z" fill="black"/>
            </svg>
          </span>
        </div>
        <div class="contact-list__content">
          <ul class="contact-list__list">
            ${contactsFromLocalStorage[label].map(contactLiNode).join('')}
          </ul>
        </div>
      </div>
    `)
  })

  contactGroupsAccordion()
}