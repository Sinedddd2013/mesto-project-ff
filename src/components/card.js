export function createCard(cardData, deleteCard, likeCard, openImagePopup) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardItem.querySelector(".card__delete-button");
  const likeButton = cardItem.querySelector(".card__like-button");
  const cardImage = cardItem.querySelector(".card__image");
  const cardTitle = cardItem.querySelector(".card__title");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  cardImage.addEventListener("click", function () {
    openImagePopup(cardData);
  });

  deleteButton.addEventListener("click", function() {
    deleteCard(cardItem);
  });

  likeButton.addEventListener("click", function () {
    likeCard(likeButton);
  });

  return cardItem;
}

export function deleteCard(cardToDel) {
  cardToDel.remove();
}

export function likeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}