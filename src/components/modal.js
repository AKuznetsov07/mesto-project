let activePopup = null;

export const popupsStateManager = {
    handlePopup: (popup) => handlePopup(popup),
    showPopup: (popup) => showPopup(popup),
    closeActivePopup: () => closePopup(activePopup)
}

function handlePopup(popup) {
    const closeButton = popup.querySelector('.popup__cancel-button');
    if (closeButton) {
        closeButton.addEventListener('click', (eventArgs) => handleCloseButtonClick(eventArgs, popup));
    }
    popup.addEventListener('mousedown', (eventArgs) => onPopupMouseDown(eventArgs, popup));
}

/// <summary>
/// Открывает попап с выбранной формой.
/// </summary>
/// <param name="form">Форма для которой необходимо открыть попап.</param>
function showPopup(popup) {
    if (activePopup) {
        closeDialog(activePopup);
    }

    document.addEventListener('keydown', onKeyDown);
    popup.classList.add('popup_opened');
    activePopup = popup;
}

/// <summary>
/// Очень уместный в модуле логики попапов обработчик события страницы, по нажатию клавиши на странице.
/// </summary>
/// <param name="eventArgs">Аргументы события.</param>
/// <param name="sender">Источник события.</param>
function onKeyDown(eventArgs) {
    if (eventArgs.key === 'Escape')
        closePopup(activePopup);
}

/// <summary>
/// Закрывает попап.
/// </summary>
function closePopup(popup) {
    document.removeEventListener('keydown', onKeyDown, false);
    activePopup.classList.remove('popup_opened');
    activePopup = null;
}

/// <summary>
/// Обработчик события нажатия кнопки закрытия попапа.
/// </summary>
/// <param name="eventArgs">Аргументы события.</param>
/// <param name="sender">Источник события.</param>
function handleCloseButtonClick(eventArgs, sender) {
    closePopup(sender);
}

/// <summary>
/// Обработчик события mousedown у формы.
/// </summary>
/// <param name="eventArgs">Аргументы события.</param>
/// <param name="sender">Источник события.</param>
function onPopupMouseDown(eventArgs, sender) {
            if (eventArgs.target.classList.contains('popup'))
                closePopup(sender);
        }

