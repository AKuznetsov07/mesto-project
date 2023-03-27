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
    initializeCommands();
    prepareMockData();
}

/// <summary>
/// Инициализирует команды.
/// </summary>
function initializeCommands() {
    document.querySelector('.profile__add-button').addEventListener('click', (eventArgs) => handleAddButtonClick(eventArgs));
    document.querySelector('.profile__edit-button').addEventListener('click', (eventArgs) => handleEditButtonClick(eventArgs));

    editBioForm.addEventListener('submit', (eventArgs) => submitEditProfile(eventArgs, editBioPopup));
    editCardForm.addEventListener('submit', (eventArgs) => submitEditCard(eventArgs, editCardPopup));


    editCardPopup.querySelector('.popup__cancel-button').addEventListener('click', (eventArgs) => handleCloseButtonClick(eventArgs, editCardPopup));
    editBioPopup.querySelector('.popup__cancel-button').addEventListener('click', (eventArgs) => handleCloseButtonClick(eventArgs, editBioPopup));
    viewCardPopup.querySelector('.popup__cancel-button').addEventListener('click', (eventArgs) => handleCloseButtonClick(eventArgs, viewCardPopup));
}

/// <summary>
/// Подготавливает тестовые данные.
/// </summary>
function prepareMockData() {
    const mockCollection = [
        { title: 'Не за горами', uri: './images/123.jpg', alt: 'Сомнительный успех' },
        { title: 'Карачаевск', uri: './images/karachaevsk.jpg', alt: 'Фото старого здания' },
        { title: 'Гора Эльбрус', uri: './images/elbrus.jpg', alt: 'Фото Эльбруса' },
        { title: 'Карачаевск', uri: './images/karachaevsk.jpg', alt: 'Фото старого здания' },
        { title: 'Гора Эльбрус', uri: './images/elbrus.jpg', alt: 'Фото Эльбруса' },
        { title: 'Домбай', uri: './images/dombay.jpg', alt: 'Фото гор' },
    ];
    mockCollection.forEach((mockElement) => { createPlaceCard(mockElement.title, mockElement.uri, mockElement.alt) });
}

/// <summary>
/// Создаёт карточку места.
/// </summary>
/// <param name="placeTitle">Заголовок карточки.</param>
/// <param name="imgUri">Указатель на изображение.</param>
/// <param name="imgAlt">Альтернативный текст изображения.</param>
function createPlaceCard(placeTitle, imgUri, imgAlt) {
    let placeNode = createNodeByTemplateID('#placeCardTemplate');
    if (placeNode) {
        let image = placeNode.querySelector('.elements__image');
        placeNode.querySelector('.elements__caption').textContent = placeTitle;
        image.src = imgUri;
        image.alt = imgAlt;


        placeNode.querySelector('.elements__like-button').addEventListener('click', (eventArgs) => handleLikeButtonClick(eventArgs, placeNode));
        placeNode.querySelector('.elements__remove-button').addEventListener('click', (eventArgs) => handleRemoveButtonClick(eventArgs, placeNode));
        image.addEventListener('click', (eventArgs) => handleImageClick(eventArgs, placeNode));


        placesList.prepend(placeNode);
    }

}

/// <summary>
/// Создаёт узел страницы по идентификатору шаблона.
/// </summary>
/// <param name="id">Идентификатор шаблона.</param>
/// <returns>Созданный узел.</returns>
function createNodeByTemplateID(id) {
    if (!id)
        throw new Error(`"createNodeByTemplateID(id)": ${id} is invalid parameter!`);
    let template = document.querySelector(id).content;
    if (!template)
        throw new Error(`"createNodeByTemplateID(id)": template with id:"${id}" doesnt exist!`);

    return template.firstElementChild.cloneNode(true);
}

/// <summary>
/// Открывает попап с выбранной формой.
/// </summary>
/// <param name="form">Форма для которой необходимо открыть попап.</param>
function openDialog(popup) {

    if (!popup)
        throw new Error(`"openDialog(dialogType)": cant create dialog!`);

    popup.classList.add('popup_opened');
}

/// <summary>
/// Закрывает попап.
/// </summary>
function closeDialog(popup) {
    popup.classList.remove('popup_opened');
}

/// <summary>
/// Подготавливает окно редактирования к редактиованию карточки.
/// </summary>
function prepareFormToEditCard() {
    editCardForm.CardName.value = '';
    editCardForm.ImgLink.value = '';
}


/// <summary>
/// Подготавливает окно редактирования к редактиованию профиля.
/// </summary>
function prepareFormToEditProfile() {
    editBioForm.Fio.value = profileFio.textContent;
    editBioForm.Profession.value = profileProfession.textContent;

}

/// <summary>
/// Обработчик события нажатия кнопки "лайка" карточки.
/// </summary>
/// <param name="eventArgs">Аргументы события.</param>
function handleLikeButtonClick(eventArgs, sender) {
    eventArgs.target.classList.toggle('elements__like-button_selected');
}

/// <summary>
/// Обработчик события нажатия кнопки удаления карточки.
/// </summary>
/// <param name="eventArgs">Аргументы события.</param>
/// <param name="sender">Источник события.</param>
function handleRemoveButtonClick(eventArgs,sender) {
    placesList.removeChild(sender);
}

/// <summary>
/// Обработчик события нажатия кнопки добавления карточки.
/// </summary>
/// <param name="eventArgs">Аргументы события.</param>
function handleAddButtonClick(eventArgs) {
    prepareFormToEditCard();
    openDialog(editCardPopup);
}

/// <summary>
/// Обработчик события нажатия кнопки редактирования профиля.
/// </summary>
/// <param name="eventArgs">Аргументы события.</param>
function handleEditButtonClick(eventArgs) {
    prepareFormToEditProfile();
    openDialog(editBioPopup);
}

/// <summary>
/// Обработчик события нажатия кнопки закрытия попапа.
/// </summary>
/// <param name="eventArgs">Аргументы события.</param>
/// <param name="sender">Источник события.</param>
function handleCloseButtonClick(eventArgs, sender) {
    closeDialog(sender);
}

/// <summary>
/// Обработчик события нажатия на изображение карточки.
/// </summary>
/// <param name="eventArgs">Аргументы события.</param>
/// <param name="sender">Источник события.</param>
function handleImageClick(eventArgs, sender) {
    viewCardPopup.querySelector('.view-form__image').src = sender.querySelector('.elements__image').src;
    viewCardPopup.querySelector('.view-form__caption').textContent = sender.querySelector('.elements__caption').textContent;
    openDialog(viewCardPopup);
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
    closeDialog(sender);
}

/// <summary>
/// Обработчик события нажатия кнопки принятия изменений в окне редактирования карточки.
/// </summary>
/// <param name="eventArgs">Аргументы события.</param>
/// <param name="sender">Источник события.</param>
function submitEditCard(eventArgs,sender) {
    eventArgs.preventDefault();
    createPlaceCard(editCardForm.CardName.value, editCardForm.ImgLink.value, editCardForm.CardName.value);
    closeDialog(sender);
}
