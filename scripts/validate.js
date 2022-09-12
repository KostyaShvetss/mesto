// Функция вызова сообщения об ошибке валидации
const showInputError =  (element, formInput, errorMessage, validationObject) => {
  const formError = element.querySelector(`.${formInput.id}-error`);
  formInput.classList.add(validationObject.inputErrorClass);
  formError.classList.add(validationObject.errorClass);
  formError.textContent = errorMessage;
};

// Скрыть сообщение об ошибке валидации
const hideInputError = (element, formInput, validationObject) => {
  const formError = element.querySelector(`.${formInput.id}-error`);
  formInput.classList.remove(validationObject.inputErrorClass);
  formError.textContent = '';
  formError.classList.remove(validationObject.errorClass);
};

// Проверка полей ввода на валидность
const toggleInputError = (form, formInput, validationObject) => {
  if (!formInput.validity.valid) {
    showInputError(form, formInput, formInput.validationMessage, validationObject);
  } else {
    hideInputError(form, formInput, validationObject);
  }
}

// Навешивание обработчика на массив, переключение кнопки
const setEventListeners = (form, validationObject) => {
  const inputList = Array.from(form.querySelectorAll(validationObject.inputSelector));
  const buttonElement = form.querySelector(validationObject.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validationObject);
  inputList.forEach((formInput) => {
    formInput.addEventListener('input', () => {
      toggleInputError(form, formInput, validationObject);
      toggleButtonState(inputList, buttonElement, validationObject);
    });
  });
};

// Функция включения валидации
const enableValidation = (validationObject) => {
  const formList = document.querySelectorAll(validationObject.formSelector);
  formList.forEach((form) => {
    setEventListeners(form, validationObject);
  });
};

// Проверка поля ввода на валидность
const hasInvalidInput = (inputList) => {
  return inputList.some((formInput) => {
    return !formInput.validity.valid;
  });
};

// Функция переключения состояния кнопки
const toggleButtonState = (inputList, buttonElement, validationObject) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, validationObject);
  } else {
    enableButton(buttonElement, validationObject);
  }
}

const disableButton = (buttonElement, validationObject) => {
  buttonElement.classList.add(validationObject.inactiveButtonClass);
  buttonElement.setAttribute('disabled', 'true');
}

const enableButton = (buttonElement, validationObject) => {
  buttonElement.classList.remove(validationObject.inactiveButtonClass);
  buttonElement.removeAttribute('disabled', 'true');
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
