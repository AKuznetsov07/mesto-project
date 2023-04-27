let editItemErrorClass = '';
let inputSelectorName = '';
let submitButtonSelectorName = '';
export const formValidator = {
    enableValidation: (validationSettings) => enableValidation(validationSettings),
    prepareFormValidation: (form) => prepareFormValidation(form)
}

/// <summary>
/// Инициализирует валидацию формы.
/// </summary>
function enableValidation(validationSettings) {
    editItemErrorClass = validationSettings.inputErrorClass
    inputSelectorName = validationSettings.inputSelector;
    submitButtonSelectorName = validationSettings.submitButtonSelector;
    const editFormList = document.querySelectorAll(validationSettings.formSelector);
    editFormList.forEach((editForm) => {
        const inputList = Array.from(editForm.querySelectorAll(inputSelectorName));
        const buttonElement = editForm.querySelector(submitButtonSelectorName);

        toggleButtonState(inputList, buttonElement);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', (eventArgs) => {
                onFormInput(editForm, inputElement, eventArgs)
                toggleButtonState(inputList, buttonElement)
            });
        });
    });
}

function prepareFormValidation(form) {
    const inputList = Array.from(form.querySelectorAll(inputSelectorName));
    const buttonElement = form.querySelector(submitButtonSelectorName);

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        hideInputError(form, inputElement)
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