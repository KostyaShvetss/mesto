export default class Popup {
  constructor (popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleKeydownEvent = this._handleKeydownEvent.bind(this);
  }

  _handleKeydownEvent (evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  }

  openPopup () {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleKeydownEvent);
  }

  closePopup () {
    this._popupElement.classList.remove('popup_opened')
    document.removeEventListener('keydown', this._handleKeydownEvent);
  };

  setEventListeners () {
    this._popupElement.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened') || (evt.target.classList.contains('popup__close'))) {
        this.closePopup();
      }
    })
  }
}
