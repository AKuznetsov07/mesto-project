const dialog = document.querySelector('.dialog');
const profile = document.querySelector('.profile');
const popup = document.querySelector('.dialog__popup');
const formPopupTypeDictionary = { "edit-form": "dialog__popup_type_edit", "view-form": "dialog__popup_type_view" };
const closeDialogTimeout = 0.5;
let openedForm = null;
Initialize();



/// <summary>
/// Инициализирует страницу.
/// </summary>
function Initialize() {
    InitializeView();
    InitializeCommands();
    PrepareMockData();
}

/// <summary>
/// Инициализирует команды.
/// </summary>
function InitializeCommands() {
    document.querySelector('.profile__add-button').addEventListener('click', OnAddButtonClick);
    document.querySelector('.profile__edit-button').addEventListener('click', OnEditButtonClick);
    document.querySelector('.dialog__cancel-button').addEventListener('click', OnCloseButtonClick);
}

/// <summary>
/// Инициализирует представление.
/// </summary>
function InitializeView() {
    dialog.style.transition = `visibility ${closeDialogTimeout}s, opacity ${closeDialogTimeout}s linear`;
}

/// <summary>
/// Подготавливает тестовые данные.
/// </summary>
function PrepareMockData() {
    const mockCollection = [
        { title: 'Не за горами', uri: './images/123.jpg', alt: 'Сомнительный успех' },
        { title: 'Карачаевск', uri: './images/karachaevsk.jpg', alt: 'Фото старого здания' },
        { title: 'Гора Эльбрус', uri: './images/elbrus.jpg', alt: 'Фото Эльбруса' },
        { title: 'Карачаевск', uri: './images/karachaevsk.jpg', alt: 'Фото старого здания' },
        { title: 'Гора Эльбрус', uri: './images/elbrus.jpg', alt: 'Фото Эльбруса' },
        { title: 'Домбай', uri: './images/dombay.jpg', alt: 'Фото гор' },
    ];
    mockCollection.forEach((mockElement) => { CreatePlaceCard(mockElement.title, mockElement.uri, mockElement.alt) });
}

/// <summary>
/// Создаёт карточку места.
/// </summary>
/// <param name="placeTitle">Заголовок карточки.</param>
/// <param name="imgUri">Указатель на изображение.</param>
/// <param name="imgAlt">Альтернативный текст изображения.</param>
function CreatePlaceCard(placeTitle, imgUri, imgAlt) {
    const placesList = document.querySelector('.elements');
    let placeNode = CreateNodeByTemplateID('#placeCardTemplate');
    if (placeNode) {
        let image = placeNode.querySelector('.elements__image');
        placeNode.querySelector('.elements__caption').textContent = placeTitle;
        image.src = imgUri;
        image.alt = imgAlt;


        placeNode.querySelector('.elements__like-button').addEventListener('click', OnLikeButtonClick);
        placeNode.querySelector('.elements__remove-button').addEventListener('click', (eventArgs) => OnRemoveButtonClick(eventArgs, placeNode));
        image.addEventListener('click', (eventArgs) => OnImageClick(eventArgs, placeNode));


        placesList.append(placeNode);
    }

}

/// <summary>
/// Создаёт узел страницы по идентификатору шаблона.
/// </summary>
/// <param name="id">Идентификатор шаблона.</param>
/// <returns>Созданный узел.</returns>
function CreateNodeByTemplateID(id) {
    if (!id)
        throw new Error(`"CreateNodeByTemplateID(id)": ${id} is invalid parameter!`);
    let template = document.querySelector(id).content;
    if (!template)
        throw new Error(`"CreateNodeByTemplateID(id)": template with id:"${id}" doesnt exist!`);

    return template.firstElementChild.cloneNode(true);
}

/// <summary>
/// Открывает попап с выбранной формой.
/// </summary>
/// <param name="form">Форма для которой необходимо открыть попап.</param>
function OpenDialog(form) {

    if (!form)
        throw new Error(`"OpenDialog(dialogType)": cant create dialog!`);

    SetPopupType(Array.from(form.classList).map((formClass) => {
        return formPopupTypeDictionary[formClass];
    }));

    openedForm = form;

    dialog.classList.add('dialog_opened');
    popup.append(form);
}

/// <summary>
/// Задает всплывающему окну стиль в зависимости от типа открываемого окна.
/// </summary>
/// <param name="popupTypes">Тип открываемого окна.</param>
function SetPopupType(popupTypes) {
    popup.classList.forEach((excistingType) => {
        if (excistingType != 'dialog__popup')
            popup.classList.remove(excistingType);
    })
    if (!popupTypes)
        throw new Error(`"SetPopupType(popupTypes)": popupTypes cant be:"${popupTypes}"!`);
    popupTypes.forEach((newType) => {
        if (newType)
            popup.classList.add(newType)
    })
}

/// <summary>
/// Закрывает попап.
/// </summary>
function CloseDialog() {
    dialog.classList.remove('dialog_opened');

    setTimeout(() => {
        popup.removeChild(openedForm);
        openedForm = null;
    },closeDialogTimeout*1000)
}

/// <summary>
/// Обработчик события нажатия кнопки "лайка" карточки.
/// </summary>
/// <param name="eventArgs">Аргументы события.</param>
function OnLikeButtonClick(eventArgs) {
    eventArgs.target.classList.toggle('elements__like-button_selected');
}

/// <summary>
/// Обработчик события нажатия кнопки удаления карточки.
/// </summary>
/// <param name="eventArgs">Аргументы события.</param>
/// <param name="sender">Источник события.</param>
function OnRemoveButtonClick(eventArgs,sender) {
    const placesList = document.querySelector('.elements');
    placesList.removeChild(sender);
}

/// <summary>
/// Обработчик события нажатия кнопки добавления карточки.
/// </summary>
/// <param name="eventArgs">Аргументы события.</param>
function OnAddButtonClick(eventArgs) {
    let form = CreateNodeByTemplateID('#editCardFormTemplate');

    form.addEventListener('submit', OnEditCardSubmit);
    OpenDialog(form);
}

/// <summary>
/// Обработчик события нажатия кнопки редактирования профиля.
/// </summary>
/// <param name="eventArgs">Аргументы события.</param>
function OnEditButtonClick(eventArgs) {
    let form = CreateNodeByTemplateID('#editProfileFormTemplate');

    form.Fio.value = profile.querySelector('.profile__fio').textContent;
    form.Profession.value = profile.querySelector('.profile__profession').textContent;
    form.addEventListener('submit', OnEditProfileSubmit);
    OpenDialog(form);
}

/// <summary>
/// Обработчик события нажатия кнопки закрытия попапа.
/// </summary>
/// <param name="eventArgs">Аргументы события.</param>
function OnCloseButtonClick(eventArgs) {
    CloseDialog();
}

/// <summary>
/// Обработчик события нажатия кнопки принятия изменений в окне редактирования профиля.
/// </summary>
/// <param name="eventArgs">Аргументы события.</param>
function OnEditProfileSubmit(eventArgs) {
    eventArgs.preventDefault();
    profile.querySelector('.profile__fio').textContent = openedForm.Fio.value;
    profile.querySelector('.profile__profession').textContent = openedForm.Profession.value;
    CloseDialog();
}

/// <summary>
/// Обработчик события нажатия кнопки принятия изменений в окне редактирования карточки.
/// </summary>
/// <param name="eventArgs">Аргументы события.</param>
function OnEditCardSubmit(eventArgs) {
    eventArgs.preventDefault();
    CreatePlaceCard(openedForm.CardName.value, openedForm.ImgLink.value, '');
    CloseDialog();
}

/// <summary>
/// Обработчик события нажатия на изображение карточки.
/// </summary>
/// <param name="eventArgs">Аргументы события.</param>
function OnImageClick(eventArgs, sender) {
    let form = CreateNodeByTemplateID('#cardViewFormTemplate');
    form.querySelector('.view-form__image').src = sender.querySelector('.elements__image').src;
    form.querySelector('.view-form__caption').textContent = sender.querySelector('.elements__caption').textContent;

    OpenDialog(form);
}