const profile = document.querySelector('.profile');
const profileFio = profile.querySelector('.profile__fio');
const profileProfession = profile.querySelector('.profile__profession');

const editCardPopup = document.querySelector('.popup_type_edit-card');
const editBioPopup = document.querySelector('.popup_type_edit-bio');
const viewCardPopup = document.querySelector('.popup_type_view-card');

const closeButtonList = document.querySelectorAll('.popup__cancel-button');

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

    closeButtonList.forEach(closeButton => {
        const popup = closeButton.closest('.popup');
        closeButton.addEventListener('click', (eventArgs) => handleCloseButtonClick(eventArgs, popup));
    });
}

/// <summary>
/// Подготавливает тестовые данные.
/// </summary>
function prepareMockData() {
    const mockCollection = [
        { name: 'Не за горами', link: './images/123.jpg'},
        { name: 'Карачаевск', link: './images/karachaevsk.jpg'},
        { name: 'Гора Эльбрус', link: './images/elbrus.jpg'},
        { name: 'Карачаевск', link: './images/karachaevsk.jpg'},
        { name: 'Гора Эльбрус', link: './images/elbrus.jpg'},
        { name: 'Домбай', link: './images/dombay.jpg'},
    ];
    mockCollection.forEach((mockElement) => { hostNewCard(mockElement.name, mockElement.link, mockElement.name) });
}

/// <summary>
/// Создаёт карточку места.
/// </summary>
/// <param name="placeTitle">Заголовок карточки.</param>
/// <param name="imgUri">Указатель на изображение.</param>
/// <param name="imgAlt">Альтернативный текст изображения.</param>
/// <returns>Созданная карточка.</returns>
function createPlaceCard(placeTitle, imgUri, imgAlt) {
    const placeNode = createNodeByTemplateID('#placeCardTemplate');

    const image = placeNode.querySelector('.elements__image');
    placeNode.querySelector('.elements__caption').textContent = placeTitle;
    image.src = imgUri;
    image.alt = imgAlt;

    placeNode.querySelector('.elements__like-button').addEventListener('click', (eventArgs) => handleLikeButtonClick(eventArgs, placeNode));
    placeNode.querySelector('.elements__remove-button').addEventListener('click', (eventArgs) => handleRemoveButtonClick(eventArgs, placeNode));
    image.addEventListener('click', (eventArgs) => handleImageClick(eventArgs, placeNode));

    return placeNode;
}

/// <summary>
/// Размещает новую картчку места на странице.
/// </summary>
/// <param name="placeTitle">Заголовок карточки.</param>
/// <param name="imgUri">Указатель на изображение.</param>
/// <param name="imgAlt">Альтернативный текст изображения.</param>
function hostNewCard(placeTitle, imgUri, imgAlt) {
    const createdCard = createPlaceCard(placeTitle, imgUri, imgAlt);
    placesList.prepend(createdCard);
}

/// <summary>
/// Создаёт узел страницы по идентификатору шаблона.
/// </summary>
/// <param name="id">Идентификатор шаблона.</param>
/// <returns>Созданный узел.</returns>
function createNodeByTemplateID(id) {
    const template = document.querySelector(id).content;

    return template.firstElementChild.cloneNode(true);
}

/// <summary>
/// Открывает попап с выбранной формой.
/// </summary>
/// <param name="form">Форма для которой необходимо открыть попап.</param>
function openDialog(popup) {
    popup.classList.add('popup_opened');
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
    sender.remove();
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
/// Закрывает попап.
/// </summary>
function closeDialog(popup) {
    popup.classList.remove('popup_opened');
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
    viewCardPopup.querySelector('.view-form__image').alt = sender.querySelector('.elements__caption').textContent;
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
    hostNewCard(editCardForm.CardName.value, editCardForm.ImgLink.value, editCardForm.CardName.value);
    closeDialog(sender);
}
