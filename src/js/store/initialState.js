const initialState = JSON.parse(localStorage.getItem('contactsBook')) || ({
  groups: [], contacts: []
})

export { initialState }