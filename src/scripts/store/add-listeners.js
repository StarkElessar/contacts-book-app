import { createContactGroupElement, createDropdownGroupElement } from '../helpers/element-factories.js';
import { contactsContainer, dropdownListContainer, emptyContactsContainer } from '../helpers/elements';

export const addListeners = (store) => {
	// Событие обновления всех контактов
	const updateContacts = () => {
		const updatedContacts = store.groups.map((group) => (
				createContactGroupElement({
					group,
					contacts: store.getContactsByGroupId(group.id),
					dispatch: store.dispatch
				})
			)
		);

		contactsContainer.replaceChildren(...updatedContacts);
		emptyContactsContainer.classList.toggle('_hide', updatedContacts.length);
		localStorage.setItem('contactsBook', (JSON.stringify(store.contactsBook)));
	};

	// Событие обновления групп в выпадающем списке "dropdown"
	const updateGroupsDropdown = () =>
		dropdownListContainer.replaceChildren(
			...store.groups.map(createDropdownGroupElement)
		);
	// у стора вызываем метод subscribe и подписываемся на два события: обновить все контакты и группы для перерисовки
	store.subscribe(updateContacts, updateGroupsDropdown);
};
