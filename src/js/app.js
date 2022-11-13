import maskedInput from './modules/maskedInput'
import { headerFixed } from './modules/headerFixed'
import { createStore } from './store'
import { addListeners } from './store/addListeners'

import {
  headerAddContactButton,
  headerGroupsButton,
  dropdownButton,
  saveContactButton,
  addNewGroupButton,
  saveGroupsButton,
} from './helpers/elements'

import {
  handleHeaderAddContactButtonClick,
  handleHeaderGroupsButtonClick,
  handleCloseSidebar,
  handleDropdownClick,
  handleSaveContactButtonClick,
  handleAddNewGroupButtonClick,
  handleSaveGroupsButton,
} from './helpers/eventHandlers'

const store = createStore()
addListeners(store) // в два главных события передаём текущее состояние, для первого рендера

headerFixed()
maskedInput()

// связываю клик по кнопке с событием вызываемым при клике
headerAddContactButton.onclick = handleHeaderAddContactButtonClick
headerGroupsButton.onclick = handleHeaderGroupsButtonClick(store)
document.onclick = handleCloseSidebar

dropdownButton.onclick = handleDropdownClick
saveContactButton.onclick = handleSaveContactButtonClick(store)

addNewGroupButton.onclick = handleAddNewGroupButtonClick
saveGroupsButton.onclick = handleSaveGroupsButton(store)
