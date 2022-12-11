import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor (popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputForm = this._popupElement.querySelector('.popup__form');
    this._inputList = this._inputForm.querySelectorAll('.popup__input');
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

  setEventListeners () {
    super.setEventListeners();
    this._inputForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.closePopup();
    });
  }

  closePopup () {
    super.closePopup();
    this._inputForm.reset();
  }
}
