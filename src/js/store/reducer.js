import { initialState } from './initialState'

const reducer = (state = initialState, { type = 'default', groupProps, contactProps }) => {
  const actions = {
    // метод для создания контакта
    createContact: () => ({
      ...state,
      contacts: state.contacts.concat([{ ...contactProps, id: Date.now() }]),
    }),
    // метод для обновления контакта
    updateContact: () => ({
      ...state,
      contacts: state.contacts.map((contact) => {
        return contact.id === contactProps.id
          ? { ...contact, ...contactProps }
          : contact
      }),
    }),
    // метод для удаления контакта
    removeContact: () => ({
      ...state,
      contacts: state.contacts.filter((contact) => contact.id !== contactProps.id),
    }),
    // метод для создания группы
    createGroup: () => ({
      ...state,
      groups: state.groups.concat([{ ...groupProps, id: Date.now() }]),
    }),
    // метод для обновление группы
    updateGroup: () => ({
      ...state,
      groups: state.groups.map((group) => {
        return group.id === groupProps.id
          ? ({ ...group, ...groupProps })
          : group
      }),
    }),
    // метод для удаления группы
    removeGroup: () => ({
      ...state,
      groups: state.groups.filter((group) => group.id !== groupProps.id),
    }),
    // дэфолтный метод по умолчнию возвращает состояние приложения
    default: () => state,
  }

  return actions[type]()
}

export { reducer }
