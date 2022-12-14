import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor (popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputForm = this._popupElement.querySelector('.popup__form');
    this._inputList = this._inputForm.querySelectorAll('.popup__input');
    this._button = this._popupElement.querySelector('.popup__save-button');
  }

  _getInputValues () {
    const inputValues = {};
    this._inputList.forEach(input => {
      inputValues[input.name] = input.value;
    })

    return inputValues;
  }

  setInputValues (items) {
    this._inputList.forEach(input => {
      input.value = items[input.name];
    })
  }

  changeSubmitHandler (newSubmitHandler) {
    this._handleFormSubmit = newSubmitHandler;
  }

  renderLoading (isLoading) {
      if (isLoading) {
        this._button.textContent = 'Сохранение...';
      } else {
        this._button.textContent = 'Сохранить';
      }
  }

  setEventListeners () {
    super.setEventListeners();
    this._inputForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  closePopup () {
    super.closePopup();
    this._inputForm.reset();
  }
}
