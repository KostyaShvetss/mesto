import { validationObject } from './validationObject.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';


// ПЕРЕМЕННЫЕ
// Попапы
const allPopups = document.querySelectorAll('.popup');
const profilePopup = document.querySelector('.profile-popup');
const addCardPopup = document.querySelector('.add-popup');
const ImagePopup = document.querySelector('.popup-image');
// Валидация
const validateAddPopup = new FormValidator(validationObject, addCardPopup);
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
const addCardPopupForm = document.querySelector('.add-popup__form');
// Секция
const elements = document.querySelector('.elements');
// Темплейт
const imageContent = document.querySelector('.popup-image__content');
const popupCaption = document.querySelector('.popup-image__caption');
// Контейнер для карточек
const cardContainer = document.querySelector('.elements');
// Массив с данными для карточек
const initialCards = [
  {
    name: 'Архыз',
    url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    url: 'https://images.unsplash.com/photo-1575737906030-725233b5c103?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80'
  },
  {
    name: 'Иваново',
    url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// ФУНКЦИИ
// Сохранить форму, добавить новую карточку
const handleAddFormSubmit = e => {
  e.preventDefault();
  const name = popupInputName.value;
  const url = popupInputURL.value;
  const aNewCard = new Card (name, url, '.template', openImagePopup, deleteCard, pressLike);
  const cardElement = aNewCard.generateCard();
  elements.prepend(cardElement);
  closePopup(addCardPopup);
  e.target.reset();
}

// Создание карточки посредством клонирования template-тега
// Также навесил обработчик, чтобы делать кнопку лайка активной при нажатии
// const сreateCard = (name, url) => {
//   const aNewCard = template.querySelector('.element').cloneNode(true);
//   const cardImage = aNewCard.querySelector('.element__image');
//   const cardText = aNewCard.querySelector('.element__name');
//   cardImage.src = url;
//   cardImage.alt = name;
//   cardText.textContent = name;
//   // Открытие попапа картинки
//   imageButton.addEventListener('click', () => openImagePopup(name, url));
//   return aNewCard;
// }

// ДЛЯ КАРТОЧКИ
// Функция открытия попапа картинки
function openImagePopup(name, url) {
  imageContent.src = url;
  imageContent.alt = name;
  popupCaption.textContent = name;
  openPopup(ImagePopup);
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

// Удалить карточку
const deleteCard = evt => {
  if (evt.target.classList.contains('element__trash-bin')) {
    const itemElement = evt.target.closest('.element');
    itemElement.remove();
  }
}

const pressLike = evt => {
  if (evt.target.classList.contains('element__heart')) {
    evt.target.classList.toggle('element__heart_active');
  }
}

// Добавление карточек на страницу из массива initialCards
initialCards.forEach ((item) => {
  const card = new Card(item.name, item.url, '.template', openImagePopup, deleteCard, pressLike);
  const cardElement = card.generateCard();

  elements.prepend(cardElement);
})

const disableButton = (buttonElement, validationObject) => {
  buttonElement.classList.add(validationObject.inactiveButtonClass);
  buttonElement.setAttribute('disabled', 'true');
}

// ДЛЯ КАРТОЧКИ
// Отрыктие всплывающего окна
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleKey);
}

// Закрыть всплывающее окно
const closePopup = (popup) => popup.classList.remove('popup_opened');

// Открыть всплывающее окно добавления карточки
const openEditPopup = () => {
  nameInput.value = profileName.textContent;
  bioInput.value = profileBio.textContent;
  makeButtonDisabled(profilePopup, validationObject);
  openPopup(profilePopup);
}

// const closeEditPopup = () => {
//   closePopup(profilePopup);
// }

const openAddPopup = () => {
  makeButtonDisabled(addCardPopup, validationObject);
  openPopup(addCardPopup);
}

const makeButtonDisabled = (popup, validationObject) => {
  const submitButtonElement = popup.querySelector(validationObject.submitButtonSelector);
  disableButton(submitButtonElement, validationObject);
}

// const closeAddPopup = () => {
//   closePopup(addCardPopup);
// }

// Сохранить форму, перенести значения из input'а в разметку
const handleProfileFormSubmit = evt => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileBio.textContent = bioInput.value;
  closePopup(profilePopup);
}

const closeImagePopup = () => {
  closePopup(ImagePopup);
}

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

// Обработчики
profileEditButton.addEventListener('click', openEditPopup);
profileAddButton.addEventListener('click', openAddPopup);
profilePopupForm.addEventListener('submit', handleProfileFormSubmit);
addCardPopupForm.addEventListener('submit', handleAddFormSubmit);
// cardContainer.addEventListener('click', deleteCardAndPressLike);
