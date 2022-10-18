import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
    this._elementImage = this._popupElement.querySelector('.popup-image__content');
    this._elementCaption = this._popupElement.querySelector('.popup-image__caption');
  }

  openPopup({name, url}) {
    super.openPopup();
    this._elementImage.src = url;
    this._elementImage.alt = name;
    this._elementCaption.textContent = name;
  }

  closePopup() {
    super.closePopup();
  }
}
