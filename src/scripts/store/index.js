import { reducer } from './reducer';

export const createStore = () => {
	const listeners = [];
	let state;

	const getContactsByGroupId = (groupId) =>
		state.contacts.filter((contact) => contact.groupId === groupId);

	const executeAll = (listeners) => listeners.forEach((listener) => listener());

	const dispatch = (action) => {
		state = reducer(state, action);
		executeAll(listeners);
	};

	const subscribe = (...listenersToSubscribe) => {
		listeners.push(...listenersToSubscribe);
		executeAll(listeners);
	};

	// вызов диспатча для начальной отрисовки элементов
	dispatch({});

	return {
		// геттер для получения всего стейта, всех контактов и групп
		get contactsBook() { return state; },
		// геттер для получения списка контактов
		get contacts() { return state.contacts; },
		// геттер для получения групп
		get groups() { return state.groups; },
		// геттер для получения массива id`шек всех групп
		get groupIds() { return state.groups.map((group) => group.id); },
		// функция для получения контактов по определенной группе id
		getContactsByGroupId,
		// функция диспатч для получения актуального стейста и перерисовки элементов
		dispatch,
		// подписка на события и на последующее их выполнение
		subscribe
	};
};
