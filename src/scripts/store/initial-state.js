export const initialState = JSON.parse(localStorage.getItem('contactsBook')) || ({
	groups: [], contacts: []
});
