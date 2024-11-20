export function checkResponse(res) {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(res.status);
    }
};

export function changeProfileInfo(name, job) {
    return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-26/users/me', {
        method: 'PATCH',
        headers: {
            authorization: 'a1e0c1a0-efb2-47a7-b652-82dc3cc11121',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            about: job
        })
    });
};

export function addNewCard(cardName, cardURL) {
    return fetch('https://nomoreparties.co/v1/wff-cohort-26/cards', {
        method: 'POST',
        headers: {
            authorization: 'a1e0c1a0-efb2-47a7-b652-82dc3cc11121',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: cardName.value,
            link: cardURL.value
        })
    })
};

export function addAvatar(link) {
    return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-26/users/me/avatar', {
        method: 'PATCH',
        headers: {
            authorization: 'a1e0c1a0-efb2-47a7-b652-82dc3cc11121',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: link
        })
    })
};

export function getInitialCards() {
    return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-26/cards', {
        headers: {
            authorization: 'a1e0c1a0-efb2-47a7-b652-82dc3cc11121'
        }
    })
        .then((res) => {
            return checkResponse(res);
        })
        .then((res) => {
            return res;
        })
};

export function getUserInfo() {
    return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-26/users/me', {
        headers: {
            authorization: 'a1e0c1a0-efb2-47a7-b652-82dc3cc11121'
        }
    })
        .then((res) => {
            return checkResponse(res);
        })
        .then((res) => {
            return res;
        })
};

export function deleteLike(cardDataID) {
    return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-26/cards/likes/${cardDataID}`, {
        method: 'DELETE',
        headers: {
            authorization: 'a1e0c1a0-efb2-47a7-b652-82dc3cc11121',
            'Content-Type': 'application/json'
        }
    })
        .then((res) => {
            return checkResponse(res);
        })
        .then((res) => {
            return res;
        })
}

export function setLike(cardDataID) {
    return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-26/cards/likes/${cardDataID}`, {
        method: 'PUT',
        headers: {
            authorization: 'a1e0c1a0-efb2-47a7-b652-82dc3cc11121',
            'Content-Type': 'application/json'
        }
    })
        .then((res) => {
            return checkResponse(res);
        })
        .then((res) => {
            return res;
        })
}

export function deleteCard(cardToDelId) {
    fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-26/cards/${cardToDelId._id}`, {
        method: 'DELETE',
        headers: {
            authorization: 'a1e0c1a0-efb2-47a7-b652-82dc3cc11121',
            'Content-Type': 'application/json'
        },
    })
        .then((res) => {
            return checkResponse(res);
        })
        .then((res) => {
            return res;
        });
}