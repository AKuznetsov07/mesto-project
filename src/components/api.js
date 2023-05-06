const authorizationToken = '870f9827-3765-496c-aae9-f242e8f8bcfb';
const groupID = 'plus-cohort-23';
const projectAdress = 'https://mesto.nomoreparties.co';
const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-23',
    headers: {
        authorization: '870f9827-3765-496c-aae9-f242e8f8bcfb',
        'Content-Type': 'application/json',
    }
};


export const webService = {
    getUserInfo: () => getUserInfo(),
    getCards: () => getCards(),
    updateUserInfo: (model) => updateUserInfo(model),
    createCard: (name, uri) => createCard(name, uri),
    deleteCard: (id) => deleteCard(id),
    likeCard: (id) => likeCard(id),
    unlikeCard: (id) => unlikeCard(id),
    updateAvatarLink: (newUri) => updateAvatarLink(newUri)
}

function createCard(name,uri) {

    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: uri
        })
    })
        .then(checkResponse);
}

function getUserInfo() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    }).then(checkResponse);
}

function getCards() {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    }).then(checkResponse);
}

function getCard() {

}
function updateUserInfo(profileModel) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: profileModel.name,
            about: profileModel.about
        })
    }).then(checkResponse);
}

function updateCard() {
}

function deleteCard(id) {

    return fetch(`${config.baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: config.headers
    }).then(checkResponse);
}

function likeCard(id) {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'PUT',
        headers: config.headers
    }).then(checkResponse);
}
function unlikeCard(id) {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: config.headers
    }).then(checkResponse);
}

function updateAvatarLink(newUri) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: newUri,
        })
    }).then(checkResponse);
}

function checkResponse(response) {
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(`Ошибка ${response.status}`);
}

///TODO:
//function request(url, options) {
//    // принимает два аргумента: урл и объект опций, как и `fetch`
//    return fetch(url, options).then(checkResponse)
//}