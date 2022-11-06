export const liHTMLTemplate = (itemValue) => `
  <li class="contacts-group__item">
    <input 
        class="contacts-group__input" 
        type="text" 
        name="contactsGroup" 
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

export const liDropdownItemNode = (groupValue) => `
  <li data-value="${groupValue}" class="select-list__item">
    ${groupValue}
  </li>
`

export const contactListGroupHTML = () => `
  <div class="contact-list__group">
    <div class="contact-list__header">
      <span class="contact-list__label">Коллеги</span>
      <span class="contact-list__icon">
        <svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.8849 0.294983L6.29492 4.87498L1.70492 0.294983L0.294922 1.70498L6.29492 7.70498L12.2949 1.70498L10.8849 0.294983Z" fill="black"/>
        </svg>
      </span>
    </div>
    <div class="contact-list__content">
      <ul class="contact-list__list"></ul>
    </div>
  </div>
`

export const contactLiNode = ({userName, userPhone, userGroup, userId}) => `
  <li class="contact-list__item">
    <input type="text" 
        class="contact-list__name"
        name="userName" 
        placeholder="Фамилия Имя Отчество"
        value="${userName}"
        disabled>
    <input type="tel" 
        class="contact-list__phone"
        name="userPhone" 
        placeholder="+7 (XXX) XXX-XX-XX" 
        value="${userPhone}" 
        size="16"
        disabled>
    <input type="hidden" name="userGroup" value="${userGroup}">
    <input type="hidden" name="userId" value="${userId}">
    <button class="contact-list__button contact-list__button_edit" type="button">
      <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 15.25V19H3.75L14.81 7.94L11.06 4.19L0 15.25ZM17.71 5.04C18.1 4.65 18.1 4.02 17.71 3.63L15.37 1.29C14.98 0.899998 14.35 0.899998 13.96 1.29L12.13 3.12L15.88 6.87L17.71 5.04Z" fill="white"/>
      </svg>
    </button>
    <button class="contact-list__button contact-list__button_remove" type="button">
      <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.66664 17.3889C1.66664 18.55 2.61664 19.5 3.77775 19.5H12.2222C13.3833 19.5 14.3333 18.55 14.3333 17.3889V4.72222H1.66664V17.3889ZM4.26331 9.87333L5.75164 8.385L7.99997 10.6228L10.2378 8.385L11.7261 9.87333L9.48831 12.1111L11.7261 14.3489L10.2378 15.8372L7.99997 13.5994L5.7622 15.8372L4.27386 14.3489L6.51164 12.1111L4.26331 9.87333ZM11.6944 1.55556L10.6389 0.5H5.36108L4.30553 1.55556H0.611084V3.66667H15.3889V1.55556H11.6944Z" fill="white"/>
      </svg>
    </button>
  </li>
`