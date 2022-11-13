const headerAddContactButton                = document.getElementById('addContactButton')
const headerGroupsButton                    = document.getElementById('addGroupButton')
const contactsContainer                     = document.querySelector('.contact-list__container')
const contactSidebar                        = document.getElementById('addContactSidebar')
const contactInputsContainer                = document.querySelector('.new-contact__container')
const contactSidebarInputs                  = contactSidebar.querySelectorAll('input')
const contactSidebarGroupsDropdownContainer = document.querySelector('.custom-dropdown')
const dropdownButton                        = document.getElementById('button-dropdown')
const contactSidebarDropdownLabel           = contactSidebar.querySelector('.custom-dropdown__label')
const dropdownListContainer                 = document.getElementById('dropdown-list')
const dropdownInput                         = document.getElementById('dropdown-input')
const saveContactButton                     = document.getElementById('save-contact')
const groupsSidebar                         = document.getElementById('addGroupSidebar')
const groupsSidebarGroupsContainer          = document.querySelector('.contacts-group__list')
const addNewGroupButton                     = document.querySelector('.button_add')
const saveGroupsButton                      = document.querySelector('.button_save')
const emptyContactsContainer                = document.querySelector('.description-label')

export {
  headerAddContactButton,
  headerGroupsButton,
  contactsContainer,
  contactSidebar,
  contactInputsContainer,
  contactSidebarInputs,
  contactSidebarGroupsDropdownContainer,
  dropdownButton,
  contactSidebarDropdownLabel,
  dropdownListContainer,
  dropdownInput,
  saveContactButton,
  groupsSidebar,
  groupsSidebarGroupsContainer,
  addNewGroupButton,
  saveGroupsButton,
  emptyContactsContainer,
}