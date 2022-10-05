export default class Card {
  constructor (name, url, template, openImagePopup, deleteCard, pressLike) {
    this._name = name;
    this._url = url;
    this._template = template;
    this._openImagePopup = openImagePopup;
    this._deleteCard = deleteCard;
    this._pressLike = pressLike;
  }

  _getTemplate () {
    const templateElement = document
    .querySelector(this._template)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return templateElement;
  }

  _setEventListeners () {
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._openImagePopup(this._name, this._url);
    });

    document.querySelector('.elements').addEventListener('click', (evt) => {
      this._deleteCard(evt);
    });

    document.querySelector('.elements').addEventListener('click', (evt) => {
      this._pressLike(evt);
    });
  }

  generateCard () {
    this._element = this._getTemplate();
    this._element.querySelector('.element__image').src = this._url;
    this._element.querySelector('.element__name').alt = this._name;
    this._element.querySelector('.element__name').textContent = this._name;
    this._setEventListeners();
    return this._element;
  }
}
