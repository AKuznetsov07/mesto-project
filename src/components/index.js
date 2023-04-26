import '../pages/index.css';
import { cardsCollectionPresenter as cardsPresenter } from './card.js';
import { popupsStateManager as popupManager } from './modal.js';
import { formValidator as validator } from './validate.js';

const profile = document.querySelector('.profile');
const profileFio = profile.querySelector('.profile__fio');
const profileProfession = profile.querySelector('.profile__profession');

const editCardPopup = document.querySelector('.popup_type_edit-card');
const editBioPopup = document.querySelector('.popup_type_edit-bio');
const viewCardPopup = document.querySelector('.popup_type_view-card');

const editCardForm = editCardPopup.querySelector('.edit-form');
const editBioForm = editBioPopup.querySelector('.edit-form');

const placesList = document.querySelector('.elements');

initialize();



/// <summary>
/// Инициализирует страницу.
/// </summary>
function initialize() {
    cardsPresenter.initializeWithDefaultModel(placesList, '#placeCardTemplate')
    initializeCommands();
    initializeFormsValidation();

}

/// <summary>
/// Инициализирует команды.
/// </summary>
function initializeCommands() {
    document.querySelector('.profile__add-button').addEventListener('click', (eventArgs) => handleAddButtonClick(eventArgs));
    document.querySelector('.profile__edit-button').addEventListener('click', (eventArgs) => handleEditButtonClick(eventArgs));

    if (cardsPresenter)
        placesList.addEventListener(cardsPresenter.imageClickedEventName, onImageListClick)

    editBioForm.addEventListener('submit', (eventArgs) => submitEditProfile(eventArgs, editBioPopup));
    editCardForm.addEventListener('submit', (eventArgs) => submitEditCard(eventArgs, editCardPopup));

    if (popupManager) {
        popupManager.handlePopup(editCardPopup);
        popupManager.handlePopup(editBioPopup);
        popupManager.handlePopup(viewCardPopup);
    }

    document.addEventListener('keydown', (eventArgs) => onKeyDown(eventArgs));
}

/// <summary>
/// Инициализирует валидацию форм.
/// </summary>
function initializeFormsValidation() {
    const validationSettings = {
        formSelector: '.edit-form',
        inputSelector: '.edit-form__item',
        submitButtonSelector: '.edit-form__button_action_submit',
        inputErrorClass: 'edit-form__item_error'
    };
    if (validator) {
        validator.enableValidation(validationSettings);
    }
}

/// <summary>
/// Подготавливает окно редактирования к редактиованию карточки.
/// </summary>
function prepareFormToEditCard() {
            editCardForm.reset();
        }


/// <summary>
/// Подготавливает окно редактирования к редактиованию профиля.
/// </summary>
function prepareFormToEditProfile() {
    editBioForm.Fio.value = profileFio.textContent;
    editBioForm.Profession.value = profileProfession.textContent;

}


/// <summary>
/// Обработчик события нажатия кнопки добавления карточки.
/// </summary>
/// <param name="eventArgs">Аргументы события.</param>
function handleAddButtonClick(eventArgs) {
    prepareFormToEditCard();
    popupManager.showPopup(editCardPopup);
}

/// <summary>
/// Обработчик события нажатия кнопки редактирования профиля.
/// </summary>
/// <param name="eventArgs">Аргументы события.</param>
function handleEditButtonClick(eventArgs) {
    prepareFormToEditProfile();
    popupManager.showPopup(editBioPopup);
}

/// <summary>
/// Обработчик события нажатия клавиши клавиатуры.
/// </summary>
/// <param name="eventArgs">Аргументы события.</param>
/// <param name="sender">Источник события.</param>
function onKeyDown(eventArgs, sender) {
    if (eventArgs.key === 'Escape')
        popupManager.closeActivePopup();
}

/// <summary>
/// Обработчик события нажатия на изображение карточки.
/// </summary>
/// <param name="eventArgs">Аргументы события.</param>
function onImageListClick(eventArgs) {
    viewCardPopup.querySelector('.view-form__image').src = eventArgs.detail.uri;
    viewCardPopup.querySelector('.view-form__image').alt = eventArgs.detail.title;
    viewCardPopup.querySelector('.view-form__caption').textContent = eventArgs.detail.title;
    popupManager.showPopup(viewCardPopup);
}

/// <summary>
/// Обработчик события нажатия кнопки принятия изменений в окне редактирования профиля.
/// </summary>
/// <param name="eventArgs">Аргументы события.</param>
/// <param name="sender">Источник события.</param>
function submitEditProfile(eventArgs, sender) {
            eventArgs.preventDefault();
            profileFio.textContent = editBioForm.Fio.value;
            profileProfession.textContent = editBioForm.Profession.value;
            popupManager.closeActivePopup();
        }

/// <summary>
/// Обработчик события нажатия кнопки принятия изменений в окне редактирования карточки.
/// </summary>
/// <param name="eventArgs">Аргументы события.</param>
/// <param name="sender">Источник события.</param>
function submitEditCard(eventArgs, sender) {
    eventArgs.preventDefault();
    cardsPresenter.add(editCardForm.CardName.value, editCardForm.ImgLink.value);
    popupManager.closeActivePopup(sender);
}