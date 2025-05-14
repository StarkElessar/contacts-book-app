import maskedInput from './modules/masked-input.js';
import { headerFixed } from './modules/header-fixed.js';
import { createStore } from './store';
import { addListeners } from './store/add-listeners.js';

import {
	headerAddContactButton,
	headerGroupsButton,
	dropdownButton,
	saveContactButton,
	addNewGroupButton,
	saveGroupsButton
} from './helpers/elements';

import {
	handleHeaderAddContactButtonClick,
	handleHeaderGroupsButtonClick,
	handleCloseSidebar,
	handleDropdownClick,
	handleSaveContactButtonClick,
	handleAddNewGroupButtonClick,
	handleSaveGroupsButton
} from './helpers/event-handlers.js';

const store = createStore();
// в два главных события передаём текущее состояние, для первого рендера
addListeners(store);

headerFixed();
maskedInput();

// связываю клик по кнопке с событием вызываемым при клике
headerAddContactButton.onclick = handleHeaderAddContactButtonClick;
headerGroupsButton.onclick = handleHeaderGroupsButtonClick(store);
document.onclick = handleCloseSidebar;

dropdownButton.onclick = handleDropdownClick;
saveContactButton.onclick = handleSaveContactButtonClick(store);

addNewGroupButton.onclick = handleAddNewGroupButtonClick;
saveGroupsButton.onclick = handleSaveGroupsButton(store);
