const authorizationToken = '870f9827-3765-496c-aae9-f242e8f8bcfb';
const groupID = 'plus-cohort-23';
const projectAdress = 'https://mesto.nomoreparties.co';

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

    return fetch(`${projectAdress}/v1/${groupID}/cards`, {
        method: 'POST',
        headers: {
            authorization: authorizationToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            link: uri
        })
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Îøèáêà: ${res.status}`);
        });
}

function getUserInfo() {
    return fetch(`${projectAdress}/v1/${groupID}/users/me`, {
        headers: {
            authorization: authorizationToken
        }
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Îøèáêà: ${res.status}`);
    });
}

function getCards() {
    return fetch(`${projectAdress}/v1/${groupID}/cards`, {
        headers: {
            authorization: authorizationToken
        }
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Îøèáêà: ${res.status}`);
    });
}

function getCard() {

}
function updateUserInfo(profileModel) {
    return fetch(`${projectAdress}/v1/${groupID}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: authorizationToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: profileModel.name,
            about: profileModel.about
        })
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Îøèáêà: ${res.status}`);
    });
}

function updateCard() {
}

function deleteCard(id) {

    return fetch(`${projectAdress}/v1/${groupID}/cards/${id}`, {
        method: 'DELETE',
        headers: {
            authorization: authorizationToken,
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Îøèáêà: ${res.status}`);
    });
}

function likeCard(id) {
    return fetch(`${projectAdress}/v1/${groupID}/cards/likes/${id}`, {
        method: 'PUT',
        headers: {
            authorization: authorizationToken,
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Îøèáêà: ${res.status}`);
    });
}
function unlikeCard(id) {
    return fetch(`${projectAdress}/v1/${groupID}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: {
            authorization: authorizationToken,
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Îøèáêà: ${res.status}`);
    });
}

function updateAvatarLink(newUri) {
    return fetch(`${projectAdress}/v1/${groupID}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            authorization: authorizationToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: newUri,
        })
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Îøèáêà: ${res.status}`);
    });
}