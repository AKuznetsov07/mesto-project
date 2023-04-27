export const cardPresenter = {
    initializeCard: (card, uri, title, alt, removeCardFunc, viewCardFunc) => initializeCard(card, uri, title, alt, removeCardFunc, viewCardFunc)
}

function initializeCard(card,uri,title, alt,removeCardFunc, viewCardFunc) {

    const image = card.querySelector('.elements__image');
    card.querySelector('.elements__caption').textContent = title;
    image.src = uri;
    image.alt = alt;

    card.querySelector('.elements__like-button').addEventListener('click', (eventArgs) => handleLikeButtonClick(eventArgs, placeNode));
    card.querySelector('.elements__remove-button').addEventListener('click', removeCardFunc);
    image.addEventListener('click', viewCardFunc);
}