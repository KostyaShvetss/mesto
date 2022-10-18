import { validationObject, initialCards, profileAddButton, profileEditButton} from '../components/utils.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';
// Для ревью: многие ошибки, например перенос переменных в utils.js я сделал и залил на гитхаб
// но на ревью отправилась предыдущая версия работы, где эти ошибки еще не были исправлены
// Огромное спасибо за подробные комментарии!
const userInfo = new UserInfo({nameSelector: '.profile__name', bioSelector:'.profile__bio'});

const popupWithImage = new PopupWithImage('.popup-image');

const popupAddCard = new PopupWithForm ('.add-popup', (cardData) => {
  cardSection.addItem(makeNewCard(cardData));
});
popupAddCard.setEventListeners();
const cardFormValidator = new FormValidator(validationObject, popupAddCard._inputForm);
cardFormValidator.enableValidation();

const profilePopup = new PopupWithForm ('.profile-popup', ({name, bio}) => {
  userInfo.setUserInfo({name, bio});
})
profilePopup.setEventListeners();
const profileFormValidator = new FormValidator(validationObject, profilePopup._inputForm);
profileFormValidator.enableValidation();

function openCardPopup () {
  cardFormValidator.disableButton();
  popupAddCard.openPopup();
}

function openProfilePopup () {
  const userInfoObject = userInfo.getUserInfo();
  profilePopup.setInputValues(userInfoObject);
  profilePopup.openPopup();
  profileFormValidator.resetValidation();
}

// Функция создания карточки
function makeNewCard ({name, url}) {
  const card = new Card({name, url}, '.template', popupWithImage.openPopup.bind(popupWithImage));
  return card.generateCard();
}

const cardSection = new Section (
  {
   items: initialCards,
   renderer: item => cardSection.addItem(makeNewCard(item))
 },
  '.elements'
);
cardSection.renderItems();

// Обработчики
profileAddButton.addEventListener('click', openCardPopup);
profileEditButton.addEventListener('click', openProfilePopup);

popupWithImage.setEventListeners();
