import { nodeFactory as factory } from './utils.js';
import { cardPresenter as card } from './card.js';
import { popupsStateManager as popupManager } from './modal.js';
import { webService as api } from './api.js';


const viewModel = new Map();
const popupConfirmCardDelete = document.querySelector('.popup_type_confirm-delete');
const formConfirmCardDelete = popupConfirmCardDelete.querySelector('.edit-form');

let removeId = null;
let cardsView = null;
let cardTemplate = null;
let showPopupViewCard = null;
let userId = null;


export const cardsCollectionPresenter = {
    initialize: (view, template, cardViewPopup, id) => initializeCardsCollection(view, template, cardViewPopup, id),
    add: (cardData) => hostPlaceCard(cardData),
    remove: (cardId) => handleRemoveButtonClick(cardId),
    imageClickedEventName: "imageClicked"
}


function initializeCardsCollection(view, template, showCardViewPopupFunc,id) {
    cardsView = view;
    cardTemplate = template;
    showPopupViewCard = showCardViewPopupFunc;
    userId = id;
    if (popupConfirmCardDelete) {
        popupManager.handlePopup(popupConfirmCardDelete);
    }
    formConfirmCardDelete.addEventListener('submit', (evt) => handleRemoveSubmit(evt));
    loadData();
}

function loadData() {
    api.getCards().then(data => data.forEach(record => hostPlaceCard(record)));
}

function hostPlaceCard(cardData) {
    if (cardData && !viewModel.has(cardData._id)) {

        const canBeDeleted = cardData.owner._id == userId;
        
        const createdCard = createCardNode(cardData, canBeDeleted);
        const card = {
            model: cardData,
            view: createdCard,
            isDeletable: canBeDeleted
        };
        viewModel.set(cardData._id, card);
        cardsView.prepend(createdCard);
    }
}

function createCardNode(cardData, canBeDeleted) {
    const placeNode = factory.generateNodeById(cardTemplate);
    const placeTitle = cardData.name;
    const imgUri = cardData.link;
    let removeFunc = null;
    if (canBeDeleted) {
        removeFunc = () => handleRemoveButtonClick(cardData._id);
    }
    card.initializeCard(placeNode, cardData, removeFunc, () => showPopupViewCard(imgUri, placeTitle), userId);

    return placeNode;
}


function removeCard() {
    const card = viewModel.get(removeId);
    api.deleteCard(removeId).then(res => card.view.remove()).then(res => viewModel.delete(removeId))
        .finally(popupManager.closeActivePopup);
}


/// <summary>
/// Обработчик события нажатия кнопки удаления карточки.
/// </summary>
/// <param name="eventArgs">Аргументы события.</param>
/// <param name="sender">Источник события.</param>
function handleRemoveButtonClick(cardId) {
    removeId = cardId
    popupManager.showPopup(popupConfirmCardDelete);
}
function handleRemoveSubmit(eventArgs) {
    eventArgs.preventDefault();
    removeCard()
}
