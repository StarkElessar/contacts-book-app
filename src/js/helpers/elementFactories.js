import { contactSidebarDropdownLabel } from './elements'

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
const createSidebarGroupElement = ({ id = '', name = '', isOpened = false } = {}) => {
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
    oninput: ({ target }) => target.setAttribute('data-name', target.value)
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
    onclick: ({ currentTarget }) => currentTarget.parentElement.remove()
  })

  // группа элементов из инпута и кнопки удалить
  const contactGroupElement = createElement({
    type: 'li',
    attributes: { class: 'contacts-group__item' },
    children: [input, removeButton],
  })

  return contactGroupElement
}