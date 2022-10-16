import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor (popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputForm = this._popupElement.querySelector('.popup__form');
    this._inputList = Array.from(this._popupElement.querySelectorAll('.popup__input'));
  }

  _getInputValues () {
    const inputValues = {};
    this._inputList.forEach(input => {
      inputValues[input.name] = input.value;
    })

    return inputValues;
  }

  setEventListeners () {
    super.setEventListeners();
    this._inputForm.addEventListener('submit', () => {
      this._handleFormSubmit(this._getInputValues);
      this._inputForm.reset();
      this.closePopup();
    });
  }

  closePopup () {
    super.closePopup();
    this._inputForm.reset();
  }
}
