import { createSidebarGroupElement } from './element-factories';

import {
	contactSidebar,
	contactInputsContainer,
	contactSidebarInputs,
	dropdownButton,
	contactSidebarDropdownLabel,
	dropdownListContainer,
	dropdownInput,
	groupsSidebar,
	groupsSidebarGroupsContainer
} from './elements';

export const handleHeaderAddContactButtonClick = () => {
	if (!localStorage.getItem('contactsBook')) {
		alert('Сначала добавьте группы');
		return;
	}

	contactInputsContainer.dataset.id = '';
	contactSidebarInputs.forEach((input) => input.value = '');
	contactSidebarDropdownLabel.innerText = 'Выберите группу';
	dropdownInput.dataset.id = '';

	contactSidebar.classList.add('_show');
};

export const handleHeaderGroupsButtonClick = (store) => () => {
	const contactGroupElements = store.groups.map(createSidebarGroupElement);

	groupsSidebarGroupsContainer.replaceChildren(...contactGroupElements);
	groupsSidebar.classList.add('_show');
};

export const handleCloseSidebar = ({ target }) => {
	const sidebarContainer = target.closest('.modal');
	const closeSidebarButton = target.closest('.header-modal__button-close');

	if (target.classList.contains('modal') || closeSidebarButton) {
		sidebarContainer.classList.remove('_show');
	}
};

export const handleDropdownClick = () => {
	dropdownButton.classList.toggle('_active');
	dropdownListContainer.classList.toggle('_show');
};

export const handleSaveContactButtonClick = (store) => () => {
	const inputValues = [
		...contactInputsContainer.querySelectorAll('input')
	].map((input) => input.value);

	if (inputValues.some((value) => !value)) {
		alert('Заполните поле');
		return;
	}

	const [name, phoneNumber] = inputValues;
	const groupId = dropdownInput.dataset.id;
	const contactId = Number(contactInputsContainer.dataset.id);
	const type = contactId ? 'updateContact' : 'createContact';

	store.dispatch({ type, contactProps: { id: contactId, groupId, name, phoneNumber } });

	localStorage.setItem('contactsBook', (JSON.stringify(store.contactsBook)));
	contactSidebar.classList.remove('_show');
};

export const handleAddNewGroupButtonClick = () => {
	const contactGroupElement = createSidebarGroupElement();
	groupsSidebarGroupsContainer.append(contactGroupElement);
};

export const handleSaveGroupsButton = (store) => () => {
	const inputs = [...groupsSidebarGroupsContainer.querySelectorAll('input')];
	const inputValues = inputs.map((input) => input.value);

	if (inputValues.some((value) => !value)) {
		alert('Заполните поле');
		return;
	}

	const groupsToSave = inputs.map(({ dataset: { id, name, isOpened } }) => ({ id, name, isOpened }));

	const groupIdsToSave = groupsToSave.map((group) => group.id);

	const groupsWithActionType = [
		{
			type: 'removeGroup',
			groups: store.groups.filter((group) => !groupIdsToSave.includes(group.id))
		},
		{
			type: 'updateGroup',
			groups: groupsToSave.filter((group) => store.groupIds.includes(group.id))
		},
		{
			type: 'createGroup',
			groups: groupsToSave.filter((group) => !group.id)
		}
	];

	groupsWithActionType.forEach(({ type, groups }) => (
		groups.forEach((group) => store.dispatch({ type, groupProps: group })))
	);

	localStorage.setItem('contactsBook', (JSON.stringify(store.contactsBook)));
	groupsSidebar.classList.remove('_show');
};
