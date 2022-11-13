import { reducer } from './reducer'

const createStore = () => {
  const listeners = []
  let state

  const getContactsByGroupId = (groupId) =>
    state.contacts.filter((contact) => contact.groupId === groupId)

  const executeAll = (listeners) => listeners.forEach((listener) => listener())

  const dispatch = (action) => {
    state = reducer(state, action)
    executeAll(listeners)
  }

  const subscribe = (...listenersToSubscribe) => {
    listeners.push(...listenersToSubscribe)
    executeAll(listeners)
  }

  // вызов диспатча для начальной отрисовки элементов
  dispatch({})

  return {}
}
