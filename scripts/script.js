let popup = document.querySelector('.popup');
let profileEditButton = document.querySelector('.profile__edit-button');
let popupCloseButton = popup.querySelector('.popup__close-button');
let popupForm = popup.querySelector('.popup__form');
let profileName = document.querySelector('.profile__name');
let profileBio = document.querySelector('.profile__bio');
let popupSaveButton = popup.querySelector('.popup__save-button');
let nameInput = popup.querySelector('.popup__input_data_name');
let bioInput = popup.querySelector('.popup__input_data_bio');

const openPopup = function () {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  bioInput.value = profileBio.textContent;
}

const closePopup = function () {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileBio.textContent = bioInput.value;
  closePopup();
}

profileEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', formSubmitHandler);