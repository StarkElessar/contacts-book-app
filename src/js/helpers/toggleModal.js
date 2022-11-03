export const toggleModal = () => {
  document.addEventListener('click', (event) => {
    const buttonOpen = event.target.closest('.menu__btn')
    const buttonClose = event.target.closest('.header-modal__button-close')
    const modalWrapper = event.target.closest('.modal')

    if (buttonOpen) {
      const modalId = buttonOpen.dataset.id
      const modal = document.querySelector(`[data-${modalId}]`)

      modal.classList.add('_show')
    }

    if (event.target.classList.contains('modal') || buttonClose) {
      modalWrapper.classList.remove('_show')
    }
  })
}