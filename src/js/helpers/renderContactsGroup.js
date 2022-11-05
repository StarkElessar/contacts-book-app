import { liHTMLTemplate } from './getHTMLTemplate'
import { createContactGroupElement } from './createContactGroupElement'

export const renderContactsGroup = (contactsGroupList) => {
  const groupListContainer = document.querySelector('.contacts-group__list')
  const addNewGroupButton = document.querySelector('.button_add')
  const saveGroupsButton = document.querySelector('.button_save')

  const observerCallback = ([{ target, attributeName, addedNodes: [addedNode], removedNodes: [removedNode] }]) => {
    if (attributeName) {
      addNewGroupButton.disabled = !target.value
      addNewGroupButton.classList.toggle('_disabled', !target.value)
    }

    if (addedNode) {
      addNewGroupButton.disabled = true
      addNewGroupButton.classList.add('_disabled')
    }

    if (removedNode && !removedNode.querySelector('input').value) {
      addNewGroupButton.disabled = false
      addNewGroupButton.classList.remove('_disabled')
    }
  }

  const observer = new MutationObserver(observerCallback)
  observer.observe(groupListContainer, { childList: true, subtree: true, attributes: true })

  if (localStorage.getItem('groupList')) {
    groupListContainer.classList.remove('_hide')

    contactsGroupList.forEach((groupItem) => {
      groupListContainer.insertAdjacentHTML(
        'beforeend',
        liHTMLTemplate(groupItem)
      )
    })
  }

  groupListContainer.onclick = ({ target }) => {
    const buttonRemoveGroup = target.closest('.contacts-group__button-remove')

    if (buttonRemoveGroup) {
      const removedGroupValue = buttonRemoveGroup.previousElementSibling.value
      const isAllowedToDelete = confirm(
        !removedGroupValue
          ? 'Ты хочешь удалить пустое поле для группы?'
          : `Ты действительно желаешь удалить группу ${removedGroupValue}?`
      )

      if (isAllowedToDelete) {
        const groupListFromLocalStorage = JSON.parse(
          localStorage.getItem('groupList')
        )
        const newList = groupListFromLocalStorage.filter(
          (item) => item !== removedGroupValue
        )

        buttonRemoveGroup.closest('.contacts-group__item').remove()
        localStorage.setItem('groupList', JSON.stringify(newList))

        addNewGroupButton.classList.remove('_disabled')
        addNewGroupButton.disabled = false
      }
    }
  }

  addNewGroupButton.onclick = () => {
    const contactGroupElement = createContactGroupElement()
    groupListContainer.append(contactGroupElement)
  }

  saveGroupsButton.onclick = () => {
    const itemsGroup = groupListContainer.querySelectorAll('[name="contacts-group"]')
    const lastInput = groupListContainer.hasChildNodes()
      ? itemsGroup[itemsGroup.length - 1]
      : null
    const groupsList = JSON.parse(localStorage.getItem('groupList')) || new Array()

    if (lastInput === null) {
      console.warn('Нечего сохранять, добавьте поле для новой группы!')
    }

    itemsGroup.forEach((item) => {
      if (!groupsList.includes(item.value)) {
        groupsList.push(item.value)
      } else {
        console.warn('Такая группа контактов уже есть!')
      }
    })

    if (lastInput && lastInput.value) {
      localStorage.setItem('groupList', JSON.stringify(groupsList))
      addNewGroupButton.classList.remove('_disabled')
      addNewGroupButton.disabled = false

      alert('Группы успешно сохранены!')
    } else if(lastInput && !lastInput.value) {
      alert('У вас есть не заполненные поля или удалите их или заполните!')
    }
  }
}
