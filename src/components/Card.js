export default class Card {
  constructor (config, template, handleCardClick) {
    this._name = config.name;
    this._url = config.url;
    this._template = template;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate () {
    const templateElement = document
    .querySelector(this._template)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return templateElement;
  }

  _deleteCard () {
      this._element.remove();
      this._element = null;
  }

  _pressLike () {
    this._likeButton.classList.toggle('element__heart_active');
  }

  _setEventListeners () {
    this._elementImage = this._element.querySelector('.element__image');
    this._likeButton = this._element.querySelector('.element__heart');

    this._element.querySelector('.element__trash-bin').addEventListener('click', () => {
      this._deleteCard();
    });

    this._likeButton.addEventListener('click', () => {
      this._pressLike();
    });

    this._elementImage.addEventListener('click', () => {
      this._handleCardClick({name: this._name, url: this._url});
    })
  }

  generateCard () {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._elementImage.src = this._url;
    this._elementImage.alt = this._name;
    this._element.querySelector('.element__name').textContent = this._name;
    return this._element;
  }
}
