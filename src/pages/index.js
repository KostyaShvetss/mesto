import { validationObject, profileAddButton, profileEditButton, profileChangeAvatarButton} from '../components/utils.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { api } from '../components/Api.js';
import './index.css';

let userId;

api.getProfile()
.then(res => {
  userInfo.setUserInfo({name: res.name, bio: res.about, avatar: res.avatar});
  userId = res._id;
})

api.getInitialCards()
.then(cardList => {
  cardList.forEach(data => {
    if (userId === data.owner._id) {
    }
  cardSection.addItem(makeNewCard({
    name: data.name,
    url: data.link,
    likes: data.likes,
    id: data._id,
    userId: userId,
    ownerId: data.owner._id}));
  })
})

const userInfo = new UserInfo({nameSelector: '.profile__name', bioSelector:'.profile__bio', avatarSelector: '.profile__avatar'});

const avatarPopup = new PopupWithForm('.avatar-popup', ({link}) => {
  api.changeAvatar(link).then(res => userInfo.setUserInfo({avatar}))
});
avatarPopup.setEventListeners();

const popupWithImage = new PopupWithImage('.popup-image');

const popupWithConfirm = new PopupWithForm ('.delete-card-popup')
popupWithConfirm.setEventListeners();


const popupAddCard = new PopupWithForm ('.add-popup', (cardData) => {
  api.addCard({name: cardData.name, link: cardData.url, id: cardData._id})
  .then(res => {
    cardSection.addItem(makeNewCard(cardData));;
  });
});
popupAddCard.setEventListeners();
const cardFormValidator = new FormValidator(validationObject, popupAddCard._inputForm);
cardFormValidator.enableValidation();

const profilePopup = new PopupWithForm ('.profile-popup', ({name, bio}) => {
  api.editProfile(name, bio)
  .then(res => {
      userInfo.setUserInfo({name, bio});
  })
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

function openAvatarChangePopup () {
  const avatarObject = userInfo.getUserInfo();
  avatarPopup.setInputValues(avatarObject);
  avatarPopup.openPopup();
  // profileFormValidator.resetValidation();
}

// Функция создания карточки
function makeNewCard ({name, url, likes, id, userId, ownerId}) {
  const card = new Card({name, url, likes, id, userId, ownerId},
     '.template',
      popupWithImage.openPopup.bind(popupWithImage),
      (id) => {
        popupWithConfirm.openPopup();
        popupWithConfirm.changeSubmitHandler(() => {
         api.deleteCard(id)
          .then(res => {
        card.deleteCard();
          })
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

const cardSection = new Section (
  {
   items: [],
   renderer: item => cardSection.addItem(makeNewCard(item))
 },
  '.elements'
);
cardSection.renderItems();

// Обработчики
profileAddButton.addEventListener('click', openCardPopup);
profileEditButton.addEventListener('click', openProfilePopup);
profileChangeAvatarButton.addEventListener('click', openAvatarChangePopup)
popupWithImage.setEventListeners();
