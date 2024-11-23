const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-26/",
  headers: {
    authorization: "a1e0c1a0-efb2-47a7-b652-82dc3cc11121",
    ContentType: "application/json",
  },
};

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(res.status);
  }
}

export function changeProfileInfo(name, job) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: `${config.headers.authorization}`,
      "Content-Type": `${config.headers.ContentType}`,
    },
    body: JSON.stringify({
      name: name,
      about: job,
    }),
  }).then((res) => {
    return checkResponse(res);
  });
}

export function addNewCard(cardName, cardURL) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: {
      authorization: `${config.headers.authorization}`,
      "Content-Type": `${config.headers.ContentType}`,
    },
    body: JSON.stringify({
      name: cardName.value,
      link: cardURL.value,
    }),
  }).then((res) => {
    return checkResponse(res);
  });
}

export function addAvatar(link) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: `${config.headers.authorization}`,
      "Content-Type": `${config.headers.ContentType}`,
    },
    body: JSON.stringify({
      avatar: link,
    }),
  }).then((res) => {
    return checkResponse(res);
  });
}

export function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: {
      authorization: `${config.headers.authorization}`,
      "Content-Type": `${config.headers.ContentType}`,
    },
  }).then((res) => {
    return checkResponse(res);
  });
}

export function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: {
      authorization: `${config.headers.authorization}`,
      "Content-Type": `${config.headers.ContentType}`,
    },
  }).then((res) => {
    return checkResponse(res);
  });
}

export function deleteLike(cardDataID) {
  return fetch(`${config.baseUrl}/cards/likes/${cardDataID}`, {
    method: "DELETE",
    headers: {
      authorization: `${config.headers.authorization}`,
      "Content-Type": `${config.headers.ContentType}`,
    },
  }).then((res) => {
    return checkResponse(res);
  });
}

export function setLike(cardDataID) {
  return fetch(`${config.baseUrl}/cards/likes/${cardDataID}`, {
    method: "PUT",
    headers: {
      authorization: `${config.headers.authorization}`,
      "Content-Type": `${config.headers.ContentType}`,
    },
  }).then((res) => {
    return checkResponse(res);
  });
}

export function deleteCard(cardToDelId) {
  return fetch(`${config.baseUrl}/cards/${cardToDelId._id}`, {
    method: "DELETE",
    headers: {
      authorization: `${config.headers.authorization}`,
      "Content-Type": `${config.headers.ContentType}`,
    },
  }).then((res) => {
    return checkResponse(res);
  });
}
