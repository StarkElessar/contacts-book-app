const addListeners = (store) => {
  // Событие обновления всех контактов
  const updatedContacts = store.groups.map((group) => (
    // нужна ф-я для отрисовки группы элементов
  ))

  // Событие обновления групп в выпадающем списке "dropdown"
  const updateGroupsDropdown = () => (
    dropdownListContainer.replaceChildren(...store.groups.map(/*ф-я для отрисовки группы элементов*/))
  )
}

export { addListeners }