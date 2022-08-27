let popup = document.querySelector('.popup');
let profileEditButton = document.querySelector('.profile__edit-button');
let popupCloseButton = popup.querySelector('.popup__close-button');
let popupForm = popup.querySelector('.popup__form');
let profileName = document.querySelector('.profile__name');
let profileBio = document.querySelector('.profile__bio');
let nameInput = popup.querySelector('.popup__input_data_name');
let bioInput = popup.querySelector('.popup__input_data_bio');
let profileLikeButton = document.querySelectorAll('.element__heart');

const openPopup = () => {
  nameInput.value = profileName.textContent;
  bioInput.value = profileBio.textContent;
  popup.classList.add('popup_opened');
}

const closePopup = () => popup.classList.remove('popup_opened');

const formSubmitHandler = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileBio.textContent = bioInput.value;
  closePopup();
}

profileEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', formSubmitHandler);
profileLikeButton.addEventListener('click', pressLike)
