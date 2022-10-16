import { initialCards } from '../components/initialCards.js';
import Section from '../components/Section.js';
import { validationObject } from '../components/validationObject.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';

const section = new Section (
  {
   items: initialCards,
   renderer: item => section.addItem(makeNewCard(item))
 },
  '.elements'
);
section.renderItems();

// ПЕРЕМЕННЫЕ
// Попапы
// const profilePopup = document.querySelector('.profile-popup');
// const popupAddCard = document.querySelector('.add-popup');
// Валидация
const userInfo = new UserInfo('.profile__name', 'profile__bio');

const popupWithImage = new PopupWithImage('.popup-image');

const popupAddCard = new PopupWithForm ('.add-popup', (item) => {
  section.addItem(makeNewCard(item));
});
popupAddCard.setEventListeners();

const validateAddPopup = new FormValidator(validationObject, popupAddCard._inputForm);
validateAddPopup.enableValidation();

// Функция создания карточки
function makeNewCard ({name, url}) {
  const card = new Card({name, url}, '.template', popupWithImage.openPopup.bind(popupWithImage));
  return card.generateCard();
}

// const profilePopup = new PopupWithForm ('.profile-popup', handleProfileFormSubmit);
// profilePopup.setEventListeners();


// const validateProfilePopup = new FormValidator(validationObject, profilePopup._inputForm);
// validateProfilePopup.enableValidation();

// Кнопки
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
// Формы и инпуты

// Секция
const elements = document.querySelector('.elements');
// Темплейт
// Контейнер для карточек
// const cardContainer = document.querySelector('.elements');
// Массив с данными для карточек

// ФУНКЦИИ
// Сохранить форму, добавить новую карточку
// function handleAddFormSubmit (e) {
//   const name = popupInputName.value;
//   const url = popupInputURL.value;
//   elements.prepend(makeNewCard(name, url, '.template', popupWithImage.openPopup.bind(popupWithImage)));
//   popupAddCard.closePopup();
// }


// Сохранить форму, перенести значения из input'а в разметку
// const handleProfileFormSubmit = evt => {
//   evt.preventDefault();
//   profileName.textContent = nameInput.value;
//   profileBio.textContent = bioInput.value;
//   profilePopup.closePopup();
// }

// Обработчики
profileAddButton.addEventListener('click', popupAddCard.openPopup.bind(popupAddCard));
// profileEditButton.addEventListener('click', profilePopup.openPopup.bind(profilePopup));

popupWithImage.setEventListeners();
