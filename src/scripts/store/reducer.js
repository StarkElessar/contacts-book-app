import { v4 } from 'uuid';
import { initialState } from './initial-state.js';

export const reducer = (state = initialState, { type = 'default', groupProps, contactProps }) => {
	const actions = {
		createContact: () => ({
			...state,
			contacts: state.contacts.concat([{ ...contactProps, id: Date.now() }])
		}),
		updateContact: () => ({
			...state,
			contacts: state.contacts.map((contact) => {
				return contact.id === contactProps.id
					? { ...contact, ...contactProps }
					: contact;
			})
		}),
		removeContact: () => ({
			...state,
			contacts: state.contacts.filter((contact) => contact.id !== contactProps.id)
		}),
		createGroup: () => ({
			...state,
			groups: state.groups.concat([{ ...groupProps, id: v4() }])
		}),
		updateGroup: () => ({
			...state,
			groups: state.groups.map((group) => {
				return group.id === groupProps.id
					? ({ ...group, ...groupProps })
					: group;
			})
		}),
		removeGroup: () => ({
			...state,
			groups: state.groups.filter((group) => group.id !== groupProps.id)
		}),
		default: () => state
	};

	return actions[type]();
};
