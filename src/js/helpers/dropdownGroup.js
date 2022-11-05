export const dropdownGroup = () => {
  const dropdownWrapper = document.querySelector('.custom-dropdown')
  const dropdownButtonSelect = document.getElementById('button-dropdown')
  const dropdownButtonLabel = dropdownButtonSelect.querySelector('.custom-dropdown__label')
  const dropdownList = document.getElementById('dropdown-list')
  const dropdownInput = document.getElementById('dropdown-input')

  dropdownButtonLabel.innerText = dropdownInput.value || 'Выберите группу'

  dropdownWrapper.addEventListener('click', (event) => {
    const target = event.target

    if (target !== dropdownButtonSelect) { 
      dropdownButtonSelect.classList.remove('_active')
      dropdownList.classList.remove('_show')
    }
    if (target && target.closest('.custom-dropdown__btn')) {
      dropdownButtonSelect.classList.toggle('_active')
      dropdownList.classList.toggle('_show')
    }
    if (target.hasAttribute('data-value')) {
      dropdownButtonLabel.innerText = target.innerText
      dropdownInput.value = target.dataset.value
      dropdownButtonSelect.focus()
    }
  })

  dropdownWrapper.addEventListener('keydown', (event) => {
    if (event.key === 'Tab' || event.key === 'Escape') {
      dropdownButtonSelect.classList.remove('_active')
      dropdownList.classList.remove('_show')
    }
  })
}