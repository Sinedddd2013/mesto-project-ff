function isValid(formElement, inputElement) {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add('form__submit_inactive');
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove('form__submit_inactive');
    }
};

function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('form__input_type_error')
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__input-error_active');
}

function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('form__input_type_error');
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
}

function setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

export function enableValidation(enableValidationConfig) {
    const formList = Array.from(document.querySelectorAll(`${enableValidationConfig.formSelector}`));
    formList.forEach((formElement) => {
        setEventListeners(formElement);
    });
};

export function clearValidation(formElement) {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const spanErrorList = Array.from(formElement.querySelectorAll('.form__input-error'));
    const buttonElement = formElement.querySelector('.popup__button');
    inputList.forEach(function (input) {
        input.classList.remove('form__input_type_error');
    });
    spanErrorList.forEach(function (spanError) {
        spanError.classList.remove('form__input-error_active');
    });
    buttonElement.classList.add('form__submit_inactive');
}