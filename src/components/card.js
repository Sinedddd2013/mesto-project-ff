import { openImage } from "./modal.js";

const cardsPlace = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;
const popupImage = document.querySelector(".popup_type_image");
const page = document.querySelector(".page");

export function createCard(cardData) {
  const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardItem.querySelector(".card__delete-button");
  const likeButton = cardItem.querySelector(".card__like-button");
  const cardImage = cardItem.querySelector(".card__image");
  const cardTitle = cardItem.querySelector(".card__title");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener("click", function () {
    const cardToDel = deleteButton.closest(".card");
    deleteCard(cardToDel);
  });
  likeButton.addEventListener("click", function () {
    likeCard(likeButton);
  });

  cardImage.addEventListener("click", function () {
    openImage(cardData.link, cardData.name);
  });

  return cardItem;
}

export function deleteCard(cardToDel) {
  cardToDel.remove();
}

export function addCard(arr) {
  if (Array.isArray(arr) && arr.length) {
    arr.forEach((obj) => {
      cardsPlace.prepend(createCard(obj));
    });
  }
}

export function likeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}
