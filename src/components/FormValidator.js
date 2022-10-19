export default class FormValidator {
  constructor(validationObject, formElement) {
    this._validationObject = validationObject;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._validationObject.inputSelector));
  }

  _hasInvalidInput () {
    return this._inputList.some((formInput) => {
      return !formInput.validity.valid;
    });
  };

  _showInputError (formInput, errorMessage)  {
    const formError = this._formElement.querySelector(`.${formInput.id}-error`);
    formInput.classList.add(this._validationObject.inputErrorClass);
    formError.classList.add(this._validationObject.errorClass);
    formError.textContent = errorMessage;
  };

  _hideInputError (formInput) {
    const formError = this._formElement.querySelector(`.${formInput.id}-error`);
    formInput.classList.remove(this._validationObject.inputErrorClass);
    formError.textContent = '';
    formError.classList.remove(this._validationObject.errorClass);
  };

  _toggleInputError (formInput) {
    if (!formInput.validity.valid) {
      this._showInputError(formInput, formInput.validationMessage);
    } else {
      this._hideInputError(formInput);
    }
  }

  _toggleButtonState () {
    if (this._hasInvalidInput()) {
      this.disableButton();
    } else {
      this._enableButton();
    }
  }

  _setEventListeners () {
    this._buttonElement = this._formElement.querySelector(this._validationObject.submitButtonSelector);
    this._toggleButtonState();
    this._inputList.forEach((formInput) => {
      formInput.addEventListener('input', () => {
        this._toggleInputError(formInput);
        this._toggleButtonState();
      });
    });
  };

  disableButton () {
    this._buttonElement.classList.add(this._validationObject.inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  _enableButton () {
    this._buttonElement.classList.remove(this._validationObject.inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  enableValidation () {
    this._formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    this._setEventListeners();
  };

  resetValidation () {
    this._inputList.forEach(input => {
      this._hideInputError(input);
      this.disableButton();
    })
  }
}
