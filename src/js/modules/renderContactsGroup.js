export const renderContactsGroup = () => {
  const container = document.querySelector('.contacts-group__container')
  const groupListContainer = document.querySelector('.contacts-group__list')
  const addNewGroupButton = document.querySelector('.button_add')
  const addNewGroupInputs = Array.from(groupListContainer.querySelectorAll('[name="contacts-group"]'))

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

  if (localStorage.getItem('groupList')) {
    const groupList = JSON.parse(localStorage.getItem('groupList'))

    groupListContainer.classList.remove('_hide')
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
  })

  // ! Тут затуп:
  if (addNewGroupInputs) {
    addNewGroupInputs.forEach((input) => {
      input.addEventListener('input', (event) => {
        console.log(event);
      })
    })
  }
}
