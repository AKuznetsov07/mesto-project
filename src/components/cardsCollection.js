import { nodeFactory as factory } from './utils.js';
import { cardPresenter as card } from './card.js';
import { popupsStateManager as popupManager } from './modal.js';

let cardsView = null;
let cardTemplate = null;
let showPopupViewCard = null;

export const cardsCollectionPresenter = {
    initialize: (view, template, cardViewPopup) => initializeCardsCollection(view, template, cardViewPopup),
    initializeWithDefaultModel: (view, cardTemplateId, cardViewPopup) => initializeCardsCollectionWithDefaultModel(view, cardTemplateId, cardViewPopup),
    add: (placeTitle, imgUri) => hostNewCard(placeTitle, imgUri, placeTitle),
    remove: (card)=>removeCard(card),
    imageClickedEventName: "imageClicked"
}


function initializeCardsCollection(view, template, showCardViewPopupFunc, model = null) {
    cardsView = view;
    cardTemplate = template;
    showPopupViewCard = showCardViewPopupFunc;
}

function initializeCardsCollectionWithDefaultModel(view, template, showCardViewPopupFunc) {
    initializeCardsCollection(view, template, showCardViewPopupFunc);
    prepareMockData();
}


/// <summary>
/// Подготавливает тестовые данные.
/// </summary>
function prepareMockData() {
    const mockCollection = [
        { name: 'Success', link: new URL('../images/123.jpg', import.meta.url) },
        { name: 'Karachaevsk', link: new URL('../images/karachaevsk.jpg', import.meta.url) },
        { name: 'Elbrus', link: new URL('../images/elbrus.jpg', import.meta.url) },
        { name: 'Karachaevsk', link: new URL('../images/karachaevsk.jpg', import.meta.url) },
        { name: 'Elbrus', link: new URL('../images/elbrus.jpg', import.meta.url) },
        { name: 'Dombay', link: new URL('../images/dombay.jpg', import.meta.url) },
    ];
    mockCollection.forEach((mockElement) => { hostNewCard(mockElement.name, mockElement.link, mockElement.name) });
}

/// <summary>
/// Создаёт карточку места.
/// </summary>
/// <returns>Созданная карточка.</returns>
function createPlaceCard(placeTitle, imgUri, imgAlt) {
    const placeNode = factory.generateNodeById(cardTemplate);

    card.initializeCard(placeNode, imgUri, placeTitle, imgAlt, () => removeCard(placeNode), () => showPopupViewCard(imgUri, placeTitle, imgAlt))

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
    cardsView.prepend(createdCard);
}

function removeCard(card) {
    card.remove();
}


/// <summary>
/// Обработчик события нажатия кнопки удаления карточки.
/// </summary>
/// <param name="eventArgs">Аргументы события.</param>
/// <param name="sender">Источник события.</param>
function handleRemoveButtonClick(eventArgs, sender) {
    removeCard(sender);
}
