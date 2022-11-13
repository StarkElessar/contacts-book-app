import {
  contactSidebarDropdownLabel,
  contactSidebar,
  dropdownButton,
  dropdownListContainer,
  dropdownInput,
  contactSidebarInputs,
  contactInputsContainer
} from './elements'

// Данная функция записывает переданные атрибуты для переданного элемента:
const setAttributes = (element, attributes) =>
  Object.keys(attributes).forEach((key) => element.setAttribute(key, attributes[key]))

// Объеденяем все свойства элемента в один объект
const setProps = (element, props) => Object.assign(element, props)

// Базовое создание элемента, куда можно передать его тип, атрибуты, детей и остальные свойства
const createElement = ({ type, attributes, children = [], ...props }) => {
  const element = document.createElement(type)

  setAttributes(element, attributes)
  setProps(element, props)
  element.append(...children)

  return element
}
// Функция для создания сайдбар-компонента с вложенными детьми:
const createSidebarGroupElement = ({ id = '', name = '', isOpened = false, } = {}) => {
  // поле для вводна названия группы контактов
  const input = createElement({
    type: 'input',
    attributes: {
      class: 'contacts-group__input',
      type: 'text',
      name: 'contacts-group',
      placeholder: 'Введите название',
      value: name,
      'data-name': name,
      'data-id': id,
      'data-isOpened': isOpened,
    },
    oninput: ({ target }) => target.setAttribute('data-name', target.value),
  })

  // кнопка для удаления поля:
  const removeButton = createElement({
    type: 'button',
    attributes: {
      class: 'contacts-group__button-remove',
      type: 'button',
    },
    innerHTML: `
      <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.66664 17.3889C1.66664 18.55 2.61664 19.5 3.77775 19.5H12.2222C13.3833 19.5 14.3333 18.55 14.3333 17.3889V4.72222H1.66664V17.3889ZM4.26331 9.87333L5.75164 8.385L7.99997 10.6228L10.2378 8.385L11.7261 9.87333L9.48831 12.1111L11.7261 14.3489L10.2378 15.8372L7.99997 13.5994L5.7622 15.8372L4.27386 14.3489L6.51164 12.1111L4.26331 9.87333ZM11.6944 1.55556L10.6389 0.5H5.36108L4.30553 1.55556H0.611084V3.66667H15.3889V1.55556H11.6944Z" fill="white" />
      </svg>
    `,
    onclick: ({ currentTarget }) => currentTarget.parentElement.remove(),
  })

  // группа элементов из инпута и кнопки удалить
  const contactGroupElement = createElement({
    type: 'li',
    attributes: { class: 'contacts-group__item' },
    children: [input, removeButton],
  })

  return contactGroupElement
}
// Функция для создания контакт-компонента с вложенными детьми:
const createContactElement = (contact, dispatch) => {
  const { id, name, groupName, phoneNumber } = contact

  // кнопка для редактирования контакта
  const editButton = createElement({
    type: 'button',
    attributes: {
      class: 'contact-list__button contact-list__button_edit',
      type: 'button',
    },
    innerHTML: `
    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 15.25V19H3.75L14.81 7.94L11.06 4.19L0 15.25ZM17.71 5.04C18.1 4.65 18.1 4.02 17.71 3.63L15.37 1.29C14.98 0.899998 14.35 0.899998 13.96 1.29L12.13 3.12L15.88 6.87L17.71 5.04Z" fill="white"/>
    </svg>
  `,
    // на созданный контакт сразу вешаю событие клика
    onclick: () => {
      // При клике на кнопку в дата-атрибут контейнера инпутов в сайдбаре
      // записывается id контакта, который я хочу редактировать
      contactInputsContainer.dataset.id = id
      // В инпуты сайдара записываются данные данного контакта, чтобы можно было их изменить
      contactSidebarInputs.forEach((input) => (input.value = contact[input.name]))
      contactSidebarDropdownLabel.innerText = groupName
      dropdownInput.dataset.id = id

      contactSidebar.classList.add('_show')
    },
  })
  // создание кнопки для удаления контакта:
  const removeButton = createElement({
    type: 'button',
    attributes: {
      class: 'contact-list__button contact-list__button_remove',
      type: 'button'
    },
    innerHTML: `
      <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.66664 17.3889C1.66664 18.55 2.61664 19.5 3.77775 19.5H12.2222C13.3833 19.5 14.3333 18.55 14.3333 17.3889V4.72222H1.66664V17.3889ZM4.26331 9.87333L5.75164 8.385L7.99997 10.6228L10.2378 8.385L11.7261 9.87333L9.48831 12.1111L11.7261 14.3489L10.2378 15.8372L7.99997 13.5994L5.7622 15.8372L4.27386 14.3489L6.51164 12.1111L4.26331 9.87333ZM11.6944 1.55556L10.6389 0.5H5.36108L4.30553 1.55556H0.611084V3.66667H15.3889V1.55556H11.6944Z" fill="white"/>
      </svg>
    `,
    // Вешаем обработчик клика, и диспатчим событие удаления контакта, передавая в него id 
    // по которому был клик
    onclick: () => dispatch({ type: 'removeContact', contactProps: { id } })
  })

  // Создание самого контакт-элемента, для отображения имени и номера
  const contactElement = createElement({
    type: 'li',
    attributes: { class: 'contact-list__item' },
    children: [editButton, removeButton],
    innerHTML: `
      <p class='contact-list__name' name='user-name'>${name || 'Фамилия Имя Отчество'}</p>
      <p class='contact-list__phone' name='user-phone'>${phoneNumber || '+7 (XXX) XXX - XX - XX'}</p>
    `,
  })

  return contactElement
}
// Функция для создания группы контактов в аккордеоне:
const createContactGroupElement = ({ group, contacts, dispatch }) => { 
  // Заголовок аккордеона (группы контактов)
  const groupHeaderElement = createElement({
    type: 'div',
    attributes: { class: `contact-list__header ${group.isOpened ? '_show' : ''}`,  },
    innerHTML: `
      <span class="contact-list__label">${group.name}</span>
      <span class="contact-list__icon">
        <svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.8849 0.294983L6.29492 4.87498L1.70492 0.294983L0.294922 1.70498L6.29492 7.70498L12.2949 1.70498L10.8849 0.294983Z" fill="black"/>
        </svg>
      </span>
    `,
    // Вешаем обработчик клика на шапку аккордеона и диспатчим событие обновления группы, чтобы отрисовать контакты
    // другими словами, чтобы раскрыть аккордеон
    onclick: () => (
      dispatch({
        type: 'updateGroup',
        groupProps: { id: group.id, isOpened: !group.isOpened }
      })
    )
  })

  const contactContainerHeight = 87 // Высота одной строки контакта
  // создание контентной части аккордеона в котором будут располагаться все номера 
  const groupContentElement = createElement({
    type: 'div',
    attributes: {
      class: 'contact-list__content',
      style: `height: ${group.isOpened ? 'max-content' : 0}px`,
    },
    innerHTML: '<ul class="contact-list__list"></ul>'
  })
  // wrapper обертка для аккордеона с хедером и контентной частью
  const groupElement = createElement({
    type: 'div',
    attributes: { class: 'contact-list__group' },
    children: [groupHeaderElement, groupContentElement]
  })
  // в массив помещаю группу контактов
  const contactElements = (
    contacts.map((contact) => createContactElement({ ...contact, groupName: group.name }, dispatch))
  )
  // в список контактов помещаются всем контакты
  groupElement.querySelector('.contact-list__list').append(...contactElements)
  
  return groupElement
}
// Функция для создания выпадающего списка групп ДЛЯ контактов в сайдбаре:
const createDropdownGroupElement = ({ id, name }) => (
  createElement({
    type: 'li',
    attributes: { class: 'select-list__item' },
    children: [name],
    onclick: () => {
      contactSidebarDropdownLabel.innerText = name
      dropdownInput.value = name
      dropdownInput.dataset.id = id
      dropdownButton.focus()

      dropdownListContainer.classList.remove('_show')
    }
  })
)

export {
  createSidebarGroupElement,
  createContactGroupElement,
  createDropdownGroupElement,
}
