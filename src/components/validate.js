let editItemErrorClass = '';
export const formValidator = {
    enableValidation: (validationSettings) => enableValidation(validationSettings)
}

/// <summary>
/// Инициализирует валидацию формы.
/// </summary>
function initializeFormValidation(editForm) {///Todo:в тз была вроде рофляная шляпа с эррейем аргументов, зато аргумент один, Р.Мартин доволен, надо глянуть и переписать.
    const inputList = Array.from(editForm.querySelectorAll('.edit-form__item'));
    const buttonElement = editForm.querySelector('.edit-form__button_action_submit');

    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', (eventArgs) => {
            onFormInput(editForm, inputElement, eventArgs)
            toggleButtonState(inputList, buttonElement)
        });
    });
}

/// <summary>
/// Инициализирует валидацию формы.
/// </summary>
function enableValidation(validationSettings) {
    editItemErrorClass = validationSettings.inputErrorClass
    const editFormList = document.querySelectorAll(validationSettings.formSelector);
    editFormList.forEach((editForm) => {
        const inputList = Array.from(editForm.querySelectorAll(validationSettings.inputSelector));
        const buttonElement = editForm.querySelector(validationSettings.submitButtonSelector);

        toggleButtonState(inputList, buttonElement);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', (eventArgs) => {
                onFormInput(editForm, inputElement, eventArgs)
                toggleButtonState(inputList, buttonElement)
            });
        });
    });
}

function validateFormInput(form, input) {
    const isCustomConditionValid = validateFormCustomConditions(form, input);
    if (!input.validity.valid) {
        showInputError(form, input, input.validationMessage);
    } else {
        hideInputError(form, input);
    }
    return isCustomConditionValid && input.validity.valid;
}

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
    } else {
        buttonElement.disabled = false;
    }
}; 

function validateFormCustomConditions(form, input) {
    if (input.validity.patternMismatch) {
        input.setCustomValidity(input.dataset.errorMessage);
    } else {
        input.setCustomValidity("");
    }
    return !input.validity.patternMismatch;
}

const showInputError = (form, input, errorMessage) => {
    const errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.add(editItemErrorClass);
    errorElement.textContent = errorMessage;
};

const hideInputError = (form, input) => {
    const errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.remove(editItemErrorClass);
    errorElement.textContent = '';
};

function onFormInput(form, input, eventArgs) {
    const isFormValid = validateFormInput(form, input);
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}