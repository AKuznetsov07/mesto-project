import '../pages/index.css';
import { cardsCollectionPresenter as cardsPresenter } from './cardsCollection.js';
import { popupsStateManager as popupManager } from './modal.js';
import { formValidator as validator } from './validate.js';

const profile = document.querySelector('.profile');
const profileFio = profile.querySelector('.profile__fio');
const profileProfession = profile.querySelector('.profile__profession');

const popupEditCard = document.querySelector('.popup_type_edit-card');
const popupEditBio = document.querySelector('.popup_type_edit-bio');
const popupViewCard = document.querySelector('.popup_type_view-card');
const popupViewCardImage = popupViewCard.querySelector('.view-form__image');
const popupViewCardCaption = popupViewCard.querySelector('.view-form__caption');

const formEditCard = popupEditCard.querySelector('.edit-form');
const formEditBio = popupEditBio.querySelector('.edit-form');



const placesList = document.querySelector('.elements');

initializePage();



/// <summary>
/// Инициализирует страницу.
/// </summary>
function initializePage() {
    cardsPresenter.initializeWithDefaultModel(placesList, '#placeCardTemplate', (uri, title, alt) => showCardViewPopup(uri, title, alt))
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

    formEditBio.addEventListener('submit', (eventArgs) => submitEditProfile(eventArgs, popupEditBio));
    formEditCard.addEventListener('submit', (eventArgs) => submitEditCard(eventArgs, popupEditCard));

    if (popupManager) {
        popupManager.handlePopup(popupEditCard);
        popupManager.handlePopup(popupEditBio);
        popupManager.handlePopup(popupViewCard);
    }
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

function showCardViewPopup(uri, title, alt) {

    popupViewCardImage.src = uri;
    popupViewCardImage.alt = alt;
    popupViewCardCaption.textContent = title;

    popupManager.showPopup(popupViewCard);
}

/// <summary>
/// Подготавливает окно редактирования к редактиованию карточки.
/// </summary>
function prepareFormToEditCard() {
    formEditCard.reset();
    validator.prepareFormValidation(formEditCard);
}


/// <summary>
/// Подготавливает окно редактирования к редактиованию профиля.
/// </summary>
function prepareFormToEditProfile() {
    formEditBio.Fio.value = profileFio.textContent;
    formEditBio.Profession.value = profileProfession.textContent;
    validator.prepareFormValidation(formEditBio);

}


/// <summary>
/// Обработчик события нажатия кнопки добавления карточки.
/// </summary>
/// <param name="eventArgs">Аргументы события.</param>
function handleAddButtonClick(eventArgs) {
    prepareFormToEditCard();
    popupManager.showPopup(popupEditCard);
}

/// <summary>
/// Обработчик события нажатия кнопки редактирования профиля.
/// </summary>
/// <param name="eventArgs">Аргументы события.</param>
function handleEditButtonClick(eventArgs) {
    prepareFormToEditProfile();
    popupManager.showPopup(popupEditBio);
}

/// <summary>
/// Обработчик события нажатия на изображение карточки.
/// </summary>
/// <param name="eventArgs">Аргументы события.</param>
function onImageListClick(eventArgs) {
    popupViewCardImage.src = eventArgs.detail.uri;
    popupViewCardImage.alt = eventArgs.detail.title;
    popupViewCardCaption.textContent = eventArgs.detail.title;
    popupManager.showPopup(popupViewCard);
}

/// <summary>
/// Обработчик события нажатия кнопки принятия изменений в окне редактирования профиля.
/// </summary>
/// <param name="eventArgs">Аргументы события.</param>
/// <param name="sender">Источник события.</param>
function submitEditProfile(eventArgs, sender) {
    eventArgs.preventDefault();
    profileFio.textContent = formEditBio.Fio.value;
    profileProfession.textContent = formEditBio.Profession.value;
    popupManager.closeActivePopup();
}

/// <summary>
/// Обработчик события нажатия кнопки принятия изменений в окне редактирования карточки.
/// </summary>
/// <param name="eventArgs">Аргументы события.</param>
/// <param name="sender">Источник события.</param>
function submitEditCard(eventArgs, sender) {
    eventArgs.preventDefault();
    cardsPresenter.add(formEditCard.CardName.value, formEditCard.ImgLink.value);
    popupManager.closeActivePopup(sender);
}