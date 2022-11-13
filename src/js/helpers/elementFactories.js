import { contactSidebarDropdownLabel } from './elements'

// Данная функция записывает переданные атрибуты для переданного элемента:
const setAttributes = (element, attributes) => 
  Object.keys(attributes).forEach((key) => element.setAttribute(key, attributes[key]))

// Объеденяем все свойства элемента в один объект
const setProps = (element, props) => Object.assign(element, props)
