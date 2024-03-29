import '../pages/index.css';
import { cardsCollectionPresenter as cardsPresenter } from './cardsCollection.js';
import { popupsStateManager as popupManager } from './modal.js';
import { formValidator as validator } from './validate.js';
import { webService as api } from './api.js';

let profileModel = null;
const profile = document.querySelector('.profile');
const profileFio = profile.querySelector('.profile__fio');
const profileProfession = profile.querySelector('.profile__profession');
const profileImg = document.querySelector('.profile__avatar');
const profileImgHover = document.querySelector('.profile__avatar-hover');


const popupEditCard = document.querySelector('.popup_type_edit-card');
const popupEditBio = document.querySelector('.popup_type_edit-bio');
const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');
const popupViewCard = document.querySelector('.popup_type_view-card');
const popupViewCardImage = popupViewCard.querySelector('.view-form__image');
const popupViewCardCaption = popupViewCard.querySelector('.view-form__caption');

const formEditCard = popupEditCard.querySelector('.edit-form');
const formEditBio = popupEditBio.querySelector('.edit-form');
const formEditAvatar = popupEditAvatar.querySelector('.edit-form');

const buttonSubmitBioEdit = formEditBio.querySelector('.edit-form__button_action_submit');
const buttonSubmitCardEdit = formEditCard.querySelector('.edit-form__button_action_submit');
const buttonSubmitAvatarEdit = formEditAvatar.querySelector('.edit-form__button_action_submit');



const placesList = document.querySelector('.elements');

initializePage();



/// <summary>
/// Инициализирует страницу.
/// </summary>
function initializePage() {
    initializeData();
    initializeCommands();
    initializeFormsValidation();

}

function initializeData() {
    const getUserInfo = api.getUserInfo();
    const getCards = api.getCards();

    Promise.all([getUserInfo, getCards])
        .then(([userData, cards]) => {
            profileModel = userData
            renderProfileInfo()
            cardsPresenter.initialize(placesList, '#placeCardTemplate', (uri, title) => showCardViewPopup(uri, title), profileModel._id, cards)
        })
        .catch(err => console.log(`Ошибка: ${err}`));
}

function renderProfileInfo() {
    profileFio.textContent = profileModel.name;
    profileProfession.textContent = profileModel.about;
    profileImg.src = profileModel.avatar;
}

/// <summary>
/// Инициализирует команды.
/// </summary>
function initializeCommands() {
    document.querySelector('.profile__add-button').addEventListener('click', (eventArgs) => handleAddButtonClick(eventArgs));
    document.querySelector('.profile__edit-button').addEventListener('click', (eventArgs) => handleEditButtonClick(eventArgs));
    profileImgHover.addEventListener('click', (eventArgs) => handleAvatarClick(eventArgs));
    if (cardsPresenter)
        placesList.addEventListener(cardsPresenter.imageClickedEventName, handleImageListClick)

    formEditBio.addEventListener('submit', (eventArgs) => submitEditProfile(eventArgs, popupEditBio));
    formEditCard.addEventListener('submit', (eventArgs) => submitEditCard(eventArgs, popupEditCard));
    formEditAvatar.addEventListener('submit', (eventArgs) => submitEditAvatar(eventArgs, popupEditAvatar));
    if (popupManager) {
        popupManager.handlePopup(popupEditCard);
        popupManager.handlePopup(popupEditBio);
        popupManager.handlePopup(popupEditAvatar);
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

function showCardViewPopup(uri, title) {

    popupViewCardImage.src = uri;
    popupViewCardImage.alt = title;
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

function prepareFormToEditAvatar() {
    formEditAvatar.ImgLink.value = profileModel.avatar;
    validator.prepareFormValidation(popupEditAvatar);

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

function handleAvatarClick(eventArgs) {
    prepareFormToEditAvatar();
    popupManager.showPopup(popupEditAvatar);
}

/// <summary>
/// Обработчик события нажатия на изображение карточки.
/// </summary>
/// <param name="eventArgs">Аргументы события.</param>
function handleImageListClick(eventArgs) {
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
    buttonSubmitBioEdit.textContent = 'Сохранение...';
    profileModel.name = formEditBio.Fio.value;
    profileModel.about = formEditBio.Profession.value;
    api.updateUserInfo(profileModel)
        .then(res => {
            buttonSubmitBioEdit.textContent = 'Сохранить';
            renderProfileInfo();
            popupManager.closeActivePopup();
        })
        .catch(err => console.log(`Ошибка: ${err}`));
}

/// <summary>
/// Обработчик события нажатия кнопки принятия изменений в окне редактирования карточки.
/// </summary>
/// <param name="eventArgs">Аргументы события.</param>
/// <param name="sender">Источник события.</param>
function submitEditCard(eventArgs, sender) {
    eventArgs.preventDefault();
    buttonSubmitCardEdit.textContent = 'Сохранение...';
    let cardData = null;
    api.createCard(formEditCard.CardName.value, formEditCard.ImgLink.value).then(res => cardsPresenter.add(res))
        .then(res => {
            buttonSubmitCardEdit.textContent = 'Создать';
            popupManager.closeActivePopup(sender)
        })
        .catch(err => console.log(`Ошибка: ${err}`));
}

function submitEditAvatar(eventArgs, sender) {
    eventArgs.preventDefault();
    buttonSubmitAvatarEdit.textContent = 'Сохранение...';
    const link = formEditAvatar.ImgLink.value;
    api.updateAvatarLink(link).then(res => {
        profileModel.avatar = link
        renderProfileInfo();
    })
        .then(res => {
            buttonSubmitAvatarEdit.textContent = 'Сохранить';
            popupManager.closeActivePopup(sender)
        })
        .catch(err => console.log(`Ошибка: ${err}`))
}



///TODO:
//// можно сделать универсальную функцию управления текстом кнопки с 3 и 4 необязательными аргументами
//export function renderLoading(isLoading, button, buttonText = 'Сохранить', loadingText = 'Сохранение...') {
//    if (isLoading) {
//        button.textContent = loadingText
//    } else {
//        button.textContent = buttonText
//    }
//}

//// можно сделать универсальную функцию, которая принимает функцию запроса, объект события и текст во время загрузки
//function handleSubmit(request, evt, loadingText = "Сохранение...") {
//    // всегда нужно предотвращать перезагрузку формы при сабмите
//    evt.preventDefault();

//    // универсально получаем кнопку сабмита из `evt`
//    const submitButton = evt.submitter;
//    // записываем начальный текст кнопки до вызова запроса
//    const initialText = submitButton.textContent;
//    // изменяем текст кнопки до вызова запроса
//    renderLoading(true, submitButton, initialText, loadingText);
//    request()
//        .then(() => {
//            // любую форму нужно очищать после успешного ответа от сервера
//            // а также `reset` может запустить деактивацию кнопки сабмита (смотрите в `validate.js`)
//            evt.target.reset();
//        })
//        .catch((err) => {
//            // в каждом запросе нужно ловить ошибку
//            console.error(`Ошибка: ${err}`);
//        })
//        // в каждом запросе в `finally` нужно возвращать обратно начальный текст кнопки
//        .finally(() => {
//            renderLoading(false, submitButton, initialText);
//        });
//}

//// пример оптимизации обработчика сабмита формы профиля
//function handleProfileFormSubmit(evt) {
//    // создаем функцию, которая возвращает промис, так как любой запрос возвращает его 
//    function makeRequest() {
//        // вот это позволяет потом дальше продолжать цепочку `then, catch, finally`
//        return editProfile(popupName.value, popupProfession.value).then((userData) => {
//            profileName.textContent = userData.name;
//            profileProfession.textContent = userData.about;
//        });
//    }
//    // вызываем универсальную функцию, передавая в нее запрос, событие и текст изменения кнопки (если нужен другой, а не `"Сохранение..."`)
//    handleSubmit(makeRequest, evt);
//}