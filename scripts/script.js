// ПЕРЕМЕННЫЕ
const popup = document.querySelector('.popup');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popup.querySelector('.popup__close-button');
const popupForm = popup.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
const nameInput = popup.querySelector('.popup__input_data_name');
const bioInput = popup.querySelector('.popup__input_data_bio');
const profileAddButton = document.querySelector('.profile__add-button');
const elements = document.querySelector('.elements');
const editingPopup = document.querySelector('.edit-popup');
const editingPopupCloseButton = editingPopup.querySelector('.popup__close-button-edit');
const openImagePopup = document.querySelector('.popup-image');
const popupImageClose = document.querySelector('.popup-image__close-button');
const popupInputName = document.querySelector('.popup__input_name');
const popupInputURL = document.querySelector('.popup__input_url');
const editPopupForm = document.querySelector('.edit-popup__form')
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
const handleSubmit = e => {
  e.preventDefault();
  const name = popupInputName.value;
  const url = popupInputURL.value;
  popupInputName.value = '';
  popupInputURL.value = '';
  elements.append(card(name, url));
  closeEditingPopup();
}

// Создание карточки посредством клонирования template-тега
// Также навесил обработчик, чтобы делать кнопку лайка активной при нажатии
const card = (name, url) => {
  const template = document.querySelector('.template').content;
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
  const imageContent = document.querySelector('.popup-image__content');
  const popupCaption = document.querySelector('.popup-image__caption')
  imageButton.addEventListener('click', () => {
    imageContent.src = url;
    imageContent.alt = name;
    popupCaption.textContent = name;
    openImagePopup.classList.add('popup-image_opened');
  });
  imageContent.addEventListener('click', () => openImagePopup.classList.remove('popup-image_opened'));
  return templateCard;
}

// Добавление карточек на страницу из массива initialCards
const defaultCards = initialCards.forEach(item => elements.prepend(card(item.name, item.url)));

// Отрыктие всплывающего окна, заполнение форм значениями из разметки
const openPopup = () => {
  nameInput.value = profileName.textContent;
  bioInput.value = profileBio.textContent;
  popup.classList.add('popup_opened');
}

// Закрыть всплывающее окно
const closePopup = () => popup.classList.remove('popup_opened');

// Открыть всплывающее окно добавления карточки
const openEditPopup = () => {
  editingPopup.classList.add('popup_edit_opened');
}

// Закрыть вспывающее окно
const closeEditingPopup = () => {
  editingPopup.classList.remove('popup_edit_opened');
}

// Сохранить форму, перенести значения из input'а в разметку
const formSubmitHandler = evt => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileBio.textContent = bioInput.value;
  closePopup();
}
const closeEditPopup = () => openImagePopup.classList.remove('popup-image_opened');
// Обработчики
profileEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
profileAddButton.addEventListener('click', openEditPopup);
editingPopupCloseButton.addEventListener('click', closeEditingPopup);
popupForm.addEventListener('submit', formSubmitHandler);
popupImageClose.addEventListener('click', closeEditPopup);
editPopupForm.addEventListener('submit', handleSubmit);
