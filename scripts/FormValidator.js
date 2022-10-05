export default class FormValidator {
  constructor(validationObject, element) {
    this._validationObject = validationObject;
    this._element = element;
  }

  _hasInvalidInput () {
    return this._inputList.some((formInput) => {
      return !formInput.validity.valid;
    });
  };

  _showInputError (formInput, errorMessage)  {
    const formError = this._element.querySelector(`.${formInput.id}-error`);
    formInput.classList.add(this._validationObject.inputErrorClass);
    formError.classList.add(this._validationObject.errorClass);
    formError.textContent = errorMessage;
  };

  _hideInputError (formInput) {
    const formError = this._element.querySelector(`.${formInput.id}-error`);
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
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  _setEventListeners () {
    this._inputList = Array.from(this._element.querySelectorAll(this._validationObject.inputSelector));
    this._buttonElement = this._element.querySelector(this._validationObject.submitButtonSelector);
    this._toggleButtonState();
    this._inputList.forEach((formInput) => {
      formInput.addEventListener('input', () => {
        this._toggleInputError(formInput);
        this._toggleButtonState();
      });
    });
  };

  _disableButton () {
    this._buttonElement.classList.add(this._validationObject.inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', 'true');
  }

  _enableButton () {
    this._buttonElement.classList.remove(this._validationObject.inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled', 'true');
  }

  enableValidation () {
    this._element.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    this._setEventListeners();
  };

}
