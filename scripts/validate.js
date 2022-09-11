const showInputError =  (element, formInput, errorMessage, validationObject) => {
  const formError = element.querySelector(`.${formInput.id}-error`);
  formInput.classList.add(validationObject.inputErrorClass);
  formError.classList.add(validationObject.errorClass);
  formError.textContent = errorMessage;
};

const hideInputError = (element, formInput, validationObject) => {
  const formError = element.querySelector(`.${formInput.id}-error`);
  formInput.classList.remove(validationObject.inputErrorClass);
  formError.textContent = '';
  formError.classList.remove(validationObject.errorClass);
};

const isValid = (form, formInput, validationObject) => {
  if (!formInput.validity.valid) {
    showInputError(form, formInput, formInput.validationMessage, validationObject);
  } else {
    hideInputError(form, formInput, validationObject);
  }
}

const setEventListeners = (form, validationObject) => {
  const inputList = Array.from(form.querySelectorAll(validationObject.inputSelector));
  const buttonElement = form.querySelector(validationObject.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validationObject);
  inputList.forEach((formInput) => {
    formInput.addEventListener('input', () => {
      isValid(form, formInput, validationObject);
      toggleButtonState(inputList, buttonElement, validationObject);
    });
  });
};

const enableValidation = (validationObject) => {
  const formList = Array.from(document.querySelectorAll(validationObject.formSelector));
  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form, validationObject);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((formInput) => {
    return !formInput.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, validationObject) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationObject.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(validationObject.inactiveButtonClass);
  }
}


// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__span-error_active',
  errorClass: 'popup__error_visible'
});
