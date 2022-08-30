// ПЕРЕМЕННЫЕ
// Попапы
const profilePopup = document.querySelector('.profile-popup');
const editingPopup = document.querySelector('.edit-popup');
const ImagePopup = document.querySelector('.popup-image');
// Кнопки
const profileEditButton = document.querySelector('.profile__edit-button');
const closeButtons = document.querySelectorAll('.popup__close');
console.log(closeButtons);
const profileAddButton = document.querySelector('.profile__add-button');
// Формы и инпуты
const popupForm = profilePopup.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
const nameInput = profilePopup.querySelector('.popup__input_data_name');
const bioInput = profilePopup.querySelector('.popup__input_data_bio');
const popupInputName = document.querySelector('.popup__input_name');
const popupInputURL = document.querySelector('.popup__input_url');
const editPopupForm = document.querySelector('.edit-popup__form');
// Секция
const elements = document.querySelector('.elements');
// Темплейт
const template = document.querySelector('.template').content;
const imageContent = document.querySelector('.popup-image__content');
const popupCaption = document.querySelector('.popup-image__caption')
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
const handleEditFormSubmit = e => {
  e.preventDefault();
  const name = popupInputName.value;
  const url = popupInputURL.value;
  e.target.reset()
  elements.prepend(сreateCard(name, url));
  closePopup(editingPopup);
}

// Создание карточки посредством клонирования template-тега
// Также навесил обработчик, чтобы делать кнопку лайка активной при нажатии
const сreateCard = (name, url) => {
  const templateCard = template.querySelector('.element').cloneNode(true);
  templateCard.querySelector('.element__image').src = url;
  templateCard.querySelector('.element__image').alt = name;
  templateCard.querySelector('.element__name').textContent = name;
  const profileLikeButton = templateCard.querySelector('.element__heart');
  profileLikeButton.addEventListener('click', () => profileLikeButton.classList.toggle('element__heart_active'));
// Удаление карточки
  templateCard.querySelector('.element__trash-bin').addEventListener('click', evt => {
    const itemElement = evt.target.closest('.element');
    itemElement.remove();
  });
// Открытие попапа картинки
  const imageButton = templateCard.querySelector('.element__image');
  imageButton.addEventListener('click', () => {
    imageContent.src = url;
    imageContent.alt = name;
    popupCaption.textContent = name;
    openPopup(ImagePopup);
  });
  imageContent.addEventListener('click', () => closePopup(ImagePopup));
  return templateCard;
}

// Добавление карточек на страницу из массива initialCards
const defaultCards = initialCards.forEach(item => elements.prepend(сreateCard(item.name, item.url)));

// Отрыктие всплывающего окна, заполнение форм значениями из разметки
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
}

// Закрыть всплывающее окно
const closePopup = (popup) => popup.classList.remove('popup_opened');

// Открыть всплывающее окно добавления карточки
const openEditPopup = () => {
  nameInput.value = profileName.textContent;
  bioInput.value = profileBio.textContent;
  openPopup(profilePopup)
}

const closeEditPopup = () => {
  closePopup(profilePopup);
}

const openAddPopup = () => {
  openPopup(editingPopup);
}

const closeAddPopup = () => {
  closePopup(editingPopup);
}

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
popupForm.addEventListener('submit', handleProfileFormSubmit);
editPopupForm.addEventListener('submit', handleEditFormSubmit);
