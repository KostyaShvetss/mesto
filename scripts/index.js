import { initialCards } from './initialCards.js';
import { validationObject } from './validationObject.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

// ПЕРЕМЕННЫЕ
// Попапы
const allPopups = document.querySelectorAll('.popup');
const profilePopup = document.querySelector('.profile-popup');
const popupAddCard = document.querySelector('.add-popup');
const imagePopup = document.querySelector('.popup-image');
// Валидация
const validateAddPopup = new FormValidator(validationObject, popupAddCard);
validateAddPopup.enableValidation();
const validateProfilePopup = new FormValidator(validationObject, profilePopup)
validateProfilePopup.enableValidation();
// Кнопки
const profileEditButton = document.querySelector('.profile__edit-button');
const closeButtons = document.querySelectorAll('.popup__close');
const profileAddButton = document.querySelector('.profile__add-button');
// Формы и инпуты
const profilePopupForm = profilePopup.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
const nameInput = profilePopup.querySelector('.popup__input_data_name');
const bioInput = profilePopup.querySelector('.popup__input_data_bio');
const popupInputName = document.querySelector('.popup__input_name');
const popupInputURL = document.querySelector('.popup__input_url');
const popupAddCardForm = document.querySelector('.add-popup__form');
// Секция
const elements = document.querySelector('.elements');
// Темплейт
const imageContent = document.querySelector('.popup-image__content');
const popupCaption = document.querySelector('.popup-image__caption');
// Контейнер для карточек
// const cardContainer = document.querySelector('.elements');
// Массив с данными для карточек


// ФУНКЦИИ
// Сохранить форму, добавить новую карточку
const handleAddFormSubmit = e => {
  e.preventDefault();
  const name = popupInputName.value;
  const url = popupInputURL.value;
  const aNewCard = makeNewCard(name, url, '.template', openImagePopup);
  const cardElement = aNewCard.generateCard();
  elements.prepend(cardElement);
  closePopup(popupAddCard);
  e.target.reset();
}

// ДЛЯ КАРТОЧКИ
// Функция открытия попапа картинки
function openImagePopup(name, url) {
  imageContent.src = url;
  imageContent.alt = name;
  popupCaption.textContent = name;
  openPopup(imagePopup);
}

// Пробежаться по всем элементам псведомассива
// Проверить, открыт ли попап и, если открыть, закрыть
allPopups.forEach((element) => {
  element.addEventListener('mouseup', evt => {
   if (evt.target.classList.contains('popup_opened')) {
    closePopup(element);
   };
  });
});

// Создание обработчика нажатия на кнопку Escape
const handleKey = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopupElement = document.querySelector('.popup_opened')
    closePopup(openedPopupElement);
  }
}

// Функция создания карточки
const makeNewCard = (name, url, template, openImagePopup) => {
  return new Card(name, url, template, openImagePopup);
}

// Добавление карточек на страницу из массива initialCards
initialCards.forEach ((item) => {
  const card = makeNewCard(item.name, item.url, '.template', openImagePopup);
  const cardElement = card.generateCard();

  elements.prepend(cardElement);
})

// ДЛЯ КАРТОЧКИ
// Отрыктие всплывающего окна
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleKey);
}

// Закрыть всплывающее окно
const closePopup = (popup) => {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', handleKey);
};

// Открыть всплывающее окно добавления карточки
const openEditPopup = () => {
  nameInput.value = profileName.textContent;
  bioInput.value = profileBio.textContent;
  validateProfilePopup.disableButton();
  openPopup(profilePopup);
}

const openAddPopup = () => {
  popupAddCardForm.reset();
  validateAddPopup.disableButton();
  openPopup(popupAddCard);
}

// Сохранить форму, перенести значения из input'а в разметку
const handleProfileFormSubmit = evt => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileBio.textContent = bioInput.value;
  closePopup(profilePopup);
}

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

// Обработчики
profileEditButton.addEventListener('click', openEditPopup);
profileAddButton.addEventListener('click', openAddPopup);
profilePopupForm.addEventListener('submit', handleProfileFormSubmit);
popupAddCardForm.addEventListener('submit', handleAddFormSubmit);
// cardContainer.addEventListener('click', deleteCardAndPressLike);
