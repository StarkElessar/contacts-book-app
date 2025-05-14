import { createSidebarGroupElement } from './element-factories.js';

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

// событие при клике на кнопку добавить контакт:
// сбрасываются все инпуты и открывается сайдбар
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

// событие при клике на кнопку добавить группу:
export const handleHeaderGroupsButtonClick = (store) => () => {
	// Получаем массив элементов групп
	const contactGroupElements = store.groups.map(createSidebarGroupElement);
	// отрисовываем их или перерисовывам если они уже были там в сайдбаре
	groupsSidebarGroupsContainer.replaceChildren(...contactGroupElements);

	groupsSidebar.classList.add('_show');
};

// событие для закрытия сайдбаров
export const handleCloseSidebar = ({ target }) => {
	const sidebarContainer = target.closest('.modal');
	const closeSidebarButton = target.closest('.header-modal__button-close');

	if (target.classList.contains('modal') || closeSidebarButton) {
		sidebarContainer.classList.remove('_show');
	}
};

// событие клика на dropdown
export const handleDropdownClick = () => {
	dropdownButton.classList.toggle('_active');
	dropdownListContainer.classList.toggle('_show');
};

// событие при клике на копку сохранить контакт
export const handleSaveContactButtonClick = (store) => () => {
	const inputValues = [
		...contactInputsContainer.querySelectorAll('input')
	].map((input) => input.value);

	// Запрещаем создать контакт с пустыми полями
	if (inputValues.some((value) => !value)) {
		alert('Заполните поле');
		return;
	}

	const [name, phoneNumber] = inputValues;
	const groupId = dropdownInput.dataset.id;
	const contactId = Number(contactInputsContainer.dataset.id);
	const type = contactId ? 'updateContact' : 'createContact';

	// вызываем мето dispatch и передаем туда тип метода объект контакта
	store.dispatch({ type, contactProps: { id: contactId, groupId, name, phoneNumber } });
	// сохраняем данные в localStorage
	localStorage.setItem('contactsBook', (JSON.stringify(store.contactsBook)));
	contactSidebar.classList.remove('_show');
};

// создание нового инпута для создания группы
export const handleAddNewGroupButtonClick = () => {
	const contactGroupElement = createSidebarGroupElement();
	groupsSidebarGroupsContainer.append(contactGroupElement);
};

// Сохранение названия групп для контактов при нажатии на кнопку сохранить
export const handleSaveGroupsButton = (store) => () => {
	const inputs = [...groupsSidebarGroupsContainer.querySelectorAll('input')];
	const inputValues = inputs.map((input) => input.value);

	// запрещаем сохранять пустые поля
	if (inputValues.some((value) => !value)) {
		alert('Заполните поле');
		return;
	}

	// массив групп созданный из значений дата-атрибутов каждого инпута
	const groupsToSave = inputs.map(({ dataset: { id, name, isOpened } }) => ({ id, name, isOpened }));
	// массив id-групп
	const groupIdsToSave = groupsToSave.map((group) => group.id);
	// массив групп с экшенами, чтобы вызвать нужные методы и после перерисовать все группы контактов
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
	// перебираем массив экшенов и диспатчим их
	groupsWithActionType.forEach(({ type, groups }) => (
		groups.forEach((group) => store.dispatch({ type, groupProps: group })))
	);
	// вконце сохраняем в localStorage актуальную версию списка контактов
	localStorage.setItem('contactsBook', (JSON.stringify(store.contactsBook)));
	groupsSidebar.classList.remove('_show');
};
