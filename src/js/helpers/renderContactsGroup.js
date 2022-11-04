export const renderContactsGroup = (contactsGroupList) => {
  const container = document.querySelector('.contacts-group__container')
  const groupListContainer = document.querySelector('.contacts-group__list')
  const addNewGroupButton = document.querySelector('.button_add')
  const saveGroupsButton = document.querySelector('.button_save')
  const addNewGroupInputs = groupListContainer.querySelectorAll('[name="contacts-group"]')

  const liHTML = `
    <input class="contacts-group__input" type="text" name="contacts-group" placeholder="Введите название">
    <button class="contacts-group__button-remove" type="button">
      <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1.66664 17.3889C1.66664 18.55 2.61664 19.5 3.77775 19.5H12.2222C13.3833 19.5 14.3333 18.55 14.3333 17.3889V4.72222H1.66664V17.3889ZM4.26331 9.87333L5.75164 8.385L7.99997 10.6228L10.2378 8.385L11.7261 9.87333L9.48831 12.1111L11.7261 14.3489L10.2378 15.8372L7.99997 13.5994L5.7622 15.8372L4.27386 14.3489L6.51164 12.1111L4.26331 9.87333ZM11.6944 1.55556L10.6389 0.5H5.36108L4.30553 1.55556H0.611084V3.66667H15.3889V1.55556H11.6944Z"
          fill="white" />
      </svg>
    </button>
  `

  const liHTMLTemplate = (itemValue) => `
  <li class="contacts-group__item">
    <input 
        class="contacts-group__input" 
        type="text" 
        name="contacts-group" 
        placeholder="Введите название"
        value="${itemValue}">
    <button class="contacts-group__button-remove" type="button">
      <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1.66664 17.3889C1.66664 18.55 2.61664 19.5 3.77775 19.5H12.2222C13.3833 19.5 14.3333 18.55 14.3333 17.3889V4.72222H1.66664V17.3889ZM4.26331 9.87333L5.75164 8.385L7.99997 10.6228L10.2378 8.385L11.7261 9.87333L9.48831 12.1111L11.7261 14.3489L10.2378 15.8372L7.99997 13.5994L5.7622 15.8372L4.27386 14.3489L6.51164 12.1111L4.26331 9.87333ZM11.6944 1.55556L10.6389 0.5H5.36108L4.30553 1.55556H0.611084V3.66667H15.3889V1.55556H11.6944Z"
          fill="white" />
      </svg>
    </button>
  </li>
  
  `

  if (localStorage.getItem('groupList')) {
    groupListContainer.classList.remove('_hide')

    console.log(contactsGroupList);

    contactsGroupList.forEach((groupItem) => {
      console.log(groupItem);
      groupListContainer.insertAdjacentHTML('beforeend', liHTMLTemplate(groupItem))
    })
  } else {
    groupListContainer.classList.add('_hide')
  }

  groupListContainer.addEventListener('click', (event) => {
    const target = event.target
    const buttonRemoveGroup = target.closest('.contacts-group__button-remove')

    if (buttonRemoveGroup) {
      buttonRemoveGroup.closest('.contacts-group__item').remove()
    }
  })

  addNewGroupButton.addEventListener('click', () => {
    const liNode = document.createElement('li')

    liNode.classList.add('contacts-group__item')
    liNode.innerHTML = liHTML
    groupListContainer.append(liNode)

    if (groupListContainer.classList.contains('_hide')) {
      groupListContainer.classList.remove('_hide')
    }

    const lastItemGroup = groupListContainer.lastChild
    const lastInput = lastItemGroup.querySelector('input')

    if (!lastInput.value) {
      addNewGroupButton.classList.add('_disabled')
      addNewGroupButton.disabled = true
    } else {
      addNewGroupButton.classList.remove('_disabled')
      addNewGroupButton.disabled = false
    }
  })

  saveGroupsButton.addEventListener('click', () => {
    const itemsGroup = groupListContainer.querySelectorAll('[name="contacts-group"]')
    const lastItem = groupListContainer.lastChild
    console.log('Last Item: \n', lastItem);
    const lastInput = lastItem.querySelector('input')

    itemsGroup.forEach((item) => {
      contactsGroupList.push(item.value)
    })
    localStorage.removeItem('groupList')

    if (lastInput.value) {
      // localStorage.removeItem('groupList')
      localStorage.setItem('groupList', JSON.stringify(contactsGroupList))
    }
    
  })

  const inputs = groupListContainer.querySelectorAll('[name="contacts-group"]')

  inputs.forEach((input) => {
    input.onblur = (e) => {
      console.log(e);

      const lastItemGroup = groupListContainer.lastChild
      const lastInput = lastItemGroup.querySelector('input')
  
      if (!lastInput.value) {
        addNewGroupButton.classList.add('_disabled')
        addNewGroupButton.disabled = true
      } else {
        addNewGroupButton.classList.remove('_disabled')
        addNewGroupButton.disabled = false
      }
    }
  })
}
