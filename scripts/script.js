const popup = document.querySelector('.popup');
const openButton = document.querySelector('.profile__edit-button');
const closeButton = popup.querySelector('.popup__close-button');
let popupForm = popup.querySelector('.popup__form');
let profileName = document.querySelector('.profile__name');
let profileBio = document.querySelector('.profile__bio');
const saveButton = popup.querySelector('.popup__save-button');

const openPopup = function () {
  popup.classList.add('popup_opened')
}

const closePopup = function () {
  popup.classList.remove('popup_opened')
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  const nameInput = popup.querySelector('.popup__name').value;
  const bioInput = popup.querySelector('.popup__bio').value;
  profileName.textContent = nameInput;
  profileBio.textContent = bioInput;
  closePopup();
}

openButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', formSubmitHandler);
