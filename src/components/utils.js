const validationObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__span-error_active',
  errorClass: 'popup__error_visible'
}

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileChangeAvatarButton = document.querySelector('.profile__avatar');

export { validationObject, profileAddButton, profileEditButton, profileChangeAvatarButton}
