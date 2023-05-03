import { webService as api } from './api.js';

let userId = null;
//let cardModel = null;
export const cardPresenter = {
    initializeCard: (card, cardData, removeCardFunc, viewCardFunc, id) => initializeCard(card, cardData, removeCardFunc, viewCardFunc, id)
}

function initializeCard(card, cardData, removeCardFunc, viewCardFunc, id) {
    //cardModel = cardData;
    userId = id;

    const likeButton = card.querySelector('.elements__like-button');
    const likeCounter = card.querySelector('.elements__like-count');
    configureLikesView(cardData, likeButton, likeCounter);


    const image = card.querySelector('.elements__image');
    const removeButton = card.querySelector('.elements__remove-button');
    card.querySelector('.elements__caption').textContent = cardData.name;
    image.src = cardData.link;
    image.alt = cardData.name;

    likeButton.addEventListener('click', (eventArgs) => handleLikeButtonClick(eventArgs, cardData, likeButton, likeCounter));
    if (removeCardFunc) {
        removeButton.classList.remove('hidden-node');
        removeButton.addEventListener('click', removeCardFunc);
    }
    image.addEventListener('click', viewCardFunc);
}

/// <summary>
/// Обработчик события нажатия кнопки "лайка" карточки.
/// </summary>
/// <param name="eventArgs">Аргументы события.</param>
function handleLikeButtonClick(evt, cardData, likeButton, likeCounter) {
    const isLiked = cardData.likes.some((profile) => {
        return profile._id == userId
    })
    if (isLiked) {
        api.unlikeCard(cardData._id)
            .then(res => {
                cardData.likes = res.likes
            })
            .then(res => configureLikesView(cardData, likeButton, likeCounter))
    }
    else {
        api.likeCard(cardData._id)
            .then(res => {
                cardData.likes = res.likes
            })
            .then(res => configureLikesView(cardData, likeButton, likeCounter))
    }
    //console.log()
    //configureLikesView(cardData, likeButton, likeCounter)
    //eventArgs.target.classList.toggle('elements__like-button_selected');
    configureLikesView(cardData, likeButton, likeCounter);
}
function configureLikesView(cardData, likeButton, likeCounter) {
    const isLiked = cardData.likes.some((profile) => {
        return profile._id == userId
    })

    if (isLiked) {
        likeButton.classList.add('elements__like-button_selected');
    }
    else {
        likeButton.classList.remove('elements__like-button_selected');
    }
    likeCounter.textContent = cardData.likes.length;
}