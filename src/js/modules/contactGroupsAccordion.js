export const contactGroupsAccordion = () => {
  const contactGroupContainer = document.querySelector('.contact-list__container')
  const contactGroups = contactGroupContainer.querySelectorAll('.contact-list__group')

  contactGroups.forEach((group, index) => {
    const headerGroup = group.querySelector('.contact-list__header')
    const contentGroup = group.querySelector('.contact-list__content')

    if (group.hasAttribute('data-open')) {
      group.classList.add('_show')
      contentGroup.style.height = `${contentGroup.scrollHeight}px`
    }

    if (contactGroupContainer.dataset.autoClosing === 'true') {
      contentGroup.style.height = '0px'
    }

    headerGroup.addEventListener('click', () => {
      group.classList.toggle('_show')

      if (group.classList.contains('_show')) {
        contentGroup.style.height = `${contentGroup.scrollHeight}px`
      } else {
        contentGroup.style.height = '0px'
      }

      if (contactGroupContainer.dataset.autoClosing === 'true') {
        removeOpen(index)
      }
    })
  })

  function removeOpen(i) {
    contactGroups.forEach((item, index) => {
      if (i !== index) {
        const content = item.querySelector('.contact-list__content')

        item.classList.remove('_show')
        content.style.height = '0px'
      }
    })
  }
}