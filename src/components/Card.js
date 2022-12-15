export default class Card {
  constructor (config, template, handleCardClick, handleDeleteClick, handleLikeClick) {
    this._name = config.name;
    this._url = config.url;
    this._likes = config.likes;
    this._id = config.id;
    this._userId = config.userId;
    this._ownerId = config.ownerId;
    this._handleLikeClick = handleLikeClick;
    this._templateSelector = template;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _getTemplate () {
    const templateElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return templateElement;
  }

  deleteCard () {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners () {
    this._elementImage = this._element.querySelector('.element__image');
    this._likeButton = this._element.querySelector('.element__heart');

    this._trashBin.addEventListener('click', () => {
      this._handleDeleteClick(this._id);
    });

    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this._id);
    });

    this._elementImage.addEventListener('click', () => {
      this._handleCardClick({name: this._name, url: this._url});
    })
  }

  isLiked () {
    const userHasLikedCard = this._likes.find(user => user._id === this._userId);
    return userHasLikedCard;
  }

  setLikes(newLikes) {
    this._likes = newLikes;
    const likeCounter = this._element.querySelector('.element__counter');
    likeCounter.textContent = this._likes.length;

    if (this.isLiked()) {
      this._pressLike();
    } else {
      this._deleteLike();
    }
  }

  _pressLike () {
    this._likeButton.classList.add('element__heart_active');
  }

  _deleteLike () {
    this._likeButton.classList.remove('element__heart_active');
  }

  generateCard () {
    this._element = this._getTemplate();
    this._trashBin = this._element.querySelector('.element__trash-bin');
    this._setEventListeners();
    this._elementImage.src = this._url;
    this._elementImage.alt = this._name;
    this._element.querySelector('.element__name').textContent = this._name;
    this.setLikes(this._likes);
    if (this._ownerId !== this._userId) {
      this._trashBin.style.display = 'none';
    }

    return this._element;
  }
}
