import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor (popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners () {
    super.setEventListeners();
  }
}
