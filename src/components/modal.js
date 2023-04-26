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
/// ��������� ����� � ��������� ������.
/// </summary>
/// <param name="form">����� ��� ������� ���������� ������� �����.</param>
function showPopup(popup) {
    if (activePopup) {
        closeDialog(activePopup);
    }
    popup.classList.add('popup_opened');
    activePopup = popup;
}

/// <summary>
/// ��������� �����.
/// </summary>
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    activePopup = null;
}

/// <summary>
/// ���������� ������� ������� ������ �������� ������.
/// </summary>
/// <param name="eventArgs">��������� �������.</param>
/// <param name="sender">�������� �������.</param>
function handleCloseButtonClick(eventArgs, sender) {
    closePopup(sender);
}

/// <summary>
/// ���������� ������� mousedown � �����.
/// </summary>
/// <param name="eventArgs">��������� �������.</param>
/// <param name="sender">�������� �������.</param>
function onPopupMouseDown(eventArgs, sender) {
            if (eventArgs.target.classList.contains('popup'))
                closePopup(sender);
        }

