import { validationObject, profileAddButton, profileEditButton, profileChangeAvatarButton} from '../components/utils.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { api } from '../components/Api.js';
import './index.css';

// Объявление секции

const cardSection = new Section (
  item => cardSection.addItem(makeNewCard(item)),
  '.elements'
);

let userId;

// Получение даты юзера и карточек с сервера
api.getInitialData()
.then(([userData, cards]) => {
  userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData.avatar);
  userId = userData._id;
  cardSection.renderItems(cards);
  })
.catch((error) => console.log(error))

// Создание экземпляра класса UserInfo
const userInfo = new UserInfo({nameSelector: '.profile__name', aboutSelector:'.profile__about', avatarSelector: '.profile__avatar'});

// Попапы с формами
const avatarPopup = new PopupWithForm('.avatar-popup', (cardData) => {
  avatarPopup.renderLoading(true);
  api.changeAvatar(cardData.avatar)
  .then(res => {
    userInfo.setUserAvatar(res.avatar);
    avatarPopup.closePopup();})
    // комменатарий для ревьюера: интересно, считается ли нормальной практикой выводить алерт с ошибкой?
    //  вряд ли же обычный пользователь будет смотреть в консоль, чтобы понять, что к чему
    // можно небольшой комментарий, пожалуйста, как в таких ситуациях разработчики поступают?
  .catch(err => alert('Проблема с аватаркой'))
  .finally(() => {
    avatarPopup.renderLoading(false);})
  }
);

const popupAddCard = new PopupWithForm ('.add-popup', (cardData) => {
  popupAddCard.renderLoading(true);
  api.addCard({name: cardData.name, link: cardData.url, id: cardData._id})
  .then(res => {
    cardSection.addItem(makeNewCard(res));
    popupAddCard.closePopup();
  }).catch(err => console.log(err))
  .finally(() => {
    popupAddCard.renderLoading(false);
  });
});

const popupWithConfirm = new PopupWithForm ('.delete-card-popup');

const profilePopup = new PopupWithForm ('.profile-popup', ((cardData) => {
  profilePopup.renderLoading(true);
  api.editProfile({name: cardData.name, about: cardData.about})
  .then(({name, about}) => {
    profilePopup.renderLoading(true);
    userInfo.setUserInfo({name, about});
    profilePopup.closePopup();
  }).catch(err => console.log(err))
  .finally(() => {
    profilePopup.renderLoading(false);
  });
})
)

// SetEventListener для попапов
avatarPopup.setEventListeners();
popupWithConfirm.setEventListeners();
profilePopup.setEventListeners();
popupAddCard.setEventListeners();

// Попап с картинкой
const popupWithImage = new PopupWithImage('.popup-image');

// Экземпляры классов с валидацией
const cardFormValidator = new FormValidator(validationObject, popupAddCard._inputForm);
const profileFormValidator = new FormValidator(validationObject, profilePopup._inputForm);
const avatarFormValidator = new FormValidator(validationObject, avatarPopup._inputForm);

// Включение валидации
cardFormValidator.enableValidation();
profileFormValidator.enableValidation();
avatarFormValidator.enableValidation();

// Функции открытия попапов
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

function openAvatarChangePopup () {
  avatarPopup.openPopup();
  avatarFormValidator.resetValidation();
}

// Функция создания карточки
const makeNewCard = (data) => {
  const card = new Card({
        name: data.name,
        url: data.link,
        likes: data.likes,
        id: data._id,
        userId: userId,
        ownerId: data.owner._id},
     '.template',
      popupWithImage.openPopup.bind(popupWithImage),
      (id) => {
        popupWithConfirm.openPopup();
        popupWithConfirm.changeSubmitHandler(() => {
         api.deleteCard(id)
          .then(res => {
        card.deleteCard();
          }).finally(() => {
            popupWithConfirm.closePopup();
          } )
        })
      },
      (id) => {
        if(card.isLiked()) {
          api.deleteLike(id)
          .then(res => card.setLikes(res.likes))
        } else {
          api.putLike(id).then((res) => {
            card.setLikes(res.likes)})
        }
      }
    );
  return card.generateCard();
}

// Обработчики
profileAddButton.addEventListener('click', openCardPopup);
profileEditButton.addEventListener('click', openProfilePopup);
profileChangeAvatarButton.addEventListener('click', openAvatarChangePopup)
popupWithImage.setEventListeners();
