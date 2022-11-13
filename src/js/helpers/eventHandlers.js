import { createSidebarGroupElement } from './elementFactories'

import {
  contactSidebar,
  contactInputsContainer,
  contactSidebarInputs,
  contactSidebarDropdownLabel,
  dropdownInput,
  groupsSidebar,
  groupsSidebarGroupsContainer
} from './elements'

// событие при клике на кнопку добавить контакт:
// сбрасываются все инпуты и открывается сайдбар
const handleHeaderAddContactButtonClick = () => {
  contactInputsContainer.dataset.id = ''
  contactSidebarInputs.forEach((input) => input.value = '')
  contactSidebarDropdownLabel.innerText = 'Выберите группу'
  dropdownInput.dataset.id = ''

  contactSidebar.classList.add('_show')
}

// событие при клике на кнопку добавить группу:
const handleHeaderGroupsButtonClick = (store) => () => {
  // Получаем массив элементов групп
  const contactGroupElements = store.groups.map(createSidebarGroupElement)
  // отрисовываем их или перерисовывам если они уже были там в сайдбаре
  groupsSidebarGroupsContainer.replaceChildren(...contactGroupElements)
  
  groupsSidebar.classList.add('_show')
}

// событие для закрытия сайдбаров
const handleCloseSidebar = ({ target }) => {
  const sidebarContainer = target.closest('.modal')
  const closeSidebarButton = target.closest('.header-modal__button-close')

  if (target.classList.contains('modal') || closeSidebarButton) {
    sidebarContainer.classList.remove('_show')
  }
}

// событие клика на dropdown
const handleDropdownClick = () => {
  dropdownButton.classList.toggle('_active')
  dropdownListContainer.classList.toggle('_show')
}

// событие при клике на копку сохранить контакт
const handleSaveContactButtonClick = (store) => () => {
  const inputValues = [
    ...contactInputsContainer.querySelectorAll('input')
  ].map((input) => input.value)

  // Запрещаем создать контакт с пустыми полями
  if (inputValues.some((value) => !value)) {
    alert('Заполните поле')
    return
  }

  const [name, phoneNumber] = inputValues
  const groupId = Number(dropdownInput.dataset.id)
  const contactId = Number(contactInputsContainer.dataset.id)
  const type = contactId ? 'updateContact' : 'createContact'

  // вызываем мето dispatch и передаем туда тип метода объект контакта
  store.dispatch({ type, contactProps: { id: contactId, groupId, name, phoneNumber }})
  // сохраняем данные в localStorage
  localStorage.setItem('contactsBook', (JSON.stringify(store.contactsBook)))
  contactSidebar.classList.remove('_show')
}