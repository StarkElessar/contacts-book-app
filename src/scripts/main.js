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
} from './helpers/event-handlers';

const store = createStore();
// в два главных события передаём текущее состояние, для первого рендера
addListeners(store);

headerFixed();
maskedInput();

document.onclick = handleCloseSidebar;
headerAddContactButton.onclick = handleHeaderAddContactButtonClick;
headerGroupsButton.onclick = handleHeaderGroupsButtonClick(store);
dropdownButton.onclick = handleDropdownClick;
saveContactButton.onclick = handleSaveContactButtonClick(store);
addNewGroupButton.onclick = handleAddNewGroupButtonClick;
saveGroupsButton.onclick = handleSaveGroupsButton(store);
