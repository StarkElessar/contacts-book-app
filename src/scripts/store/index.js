import { reducer } from './reducer';

export const createStore = () => {
	const listeners = [];
	let state;

	const executeAll = (listeners) => listeners.forEach((listener) => listener());

	const dispatch = (action) => {
		state = reducer(state, action);
		executeAll(listeners);
	};

	// вызов диспатча для начальной отрисовки элементов
	dispatch({});

	return {
		get contactsBook() { return state; },
		get contacts() { return state.contacts; },
		get groups() { return state.groups; },
		get groupIds() { return state.groups.map((group) => group.id); },
		getContactsByGroupId: (groupId) => {
			return state.contacts.filter((contact) => contact.groupId === groupId);
		},
		subscribe: (...listenersToSubscribe) => {
			listeners.push(...listenersToSubscribe);
			executeAll(listeners);
		},
		dispatch
	};
};
