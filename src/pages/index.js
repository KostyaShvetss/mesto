import { validationObject, initialCards, profileAddButton, profileEditButton} from '../components/utils.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';
const userInfo = new UserInfo({nameSelector: '.profile__name', bioSelector:'.profile__bio'});

const popupWithImage = new PopupWithImage('.popup-image');

const popupAddCard = new PopupWithForm ('.add-popup', (input) => {
  section.addItem(makeNewCard(input));
});
popupAddCard.setEventListeners();
const validateAddPopup = new FormValidator(validationObject, popupAddCard._inputForm);
validateAddPopup.enableValidation();

const profilePopup = new PopupWithForm ('.profile-popup', ({name, bio}) => {
  userInfo.setUserInfo({name, bio});
})
profilePopup.setEventListeners();
const validateProfilePopup = new FormValidator(validationObject, profilePopup._inputForm);
validateProfilePopup.enableValidation();

function openCardPopup () {
  validateAddPopup.disableButton();
  popupAddCard.openPopup();
}

function openProfilePopup () {
  const userInfoObject = userInfo.getUserInfo();
  const {name, bio} = userInfoObject;
  profilePopup.setInputValues({name, bio});
  profilePopup.openPopup();
  validateProfilePopup.makeFormVoid();
}

// Функция создания карточки
function makeNewCard ({name, url}) {
  const card = new Card({name, url}, '.template', popupWithImage.openPopup.bind(popupWithImage));
  return card.generateCard();
}

const section = new Section (
  {
   items: initialCards,
   renderer: item => section.addItem(makeNewCard(item))
 },
  '.elements'
);
section.renderItems();

// Обработчики
profileAddButton.addEventListener('click', openCardPopup);
profileEditButton.addEventListener('click', openProfilePopup);

popupWithImage.setEventListeners();
