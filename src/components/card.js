export function createCard(cardData, ownerId, deleteCard, likeCard, openImagePopup) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardItem.querySelector(".card__delete-button");
  const likeButton = cardItem.querySelector(".card__like-button");
  const cardImage = cardItem.querySelector(".card__image");
  const cardTitle = cardItem.querySelector(".card__title");
  const cardLikesCount = cardItem.querySelector(".card__likes_count");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  cardLikesCount.textContent = cardData.likes.length;

  cardImage.addEventListener("click", function () {
    openImagePopup(cardData);
  });

  if (cardData.owner._id !== ownerId) {
    deleteButton.remove();
  };

  deleteButton.addEventListener("click", function() {
    deleteCard(cardData);
    cardItem.remove();
  });

  likeButton.addEventListener("click", function () {
    likeCard(likeButton);
  });

  return cardItem;
}

export function deleteCard(cardToDel) {
    fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-26/cards/${cardToDel._id}`, {
      method: 'DELETE',
      headers: {
        authorization: 'a1e0c1a0-efb2-47a7-b652-82dc3cc11121',
      },
    });

}

export function likeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
  fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-26/cards/${cardToDel._id}`, {
    method: 'PUT',
    headers: {
      authorization: 'a1e0c1a0-efb2-47a7-b652-82dc3cc11121',
    },
  });
}