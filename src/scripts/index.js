import {
  createCard,
  addCard,
  deleteCard,
  likeCard,
} from "./../components/card.js";
import {
  openModal,
  addEventList,
  handleFormSubmit,
  formNewPlaceSubmit,
} from "./../components/modal.js";

const cardTemplate = document.querySelector("#card-template").content;
const cardsPlace = document.querySelector(".places__list");

const page = document.querySelector(".page");
const popup = document.querySelector(".popup");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const popupEdit = document.querySelector(".popup_type_edit");
const popupImage = document.querySelector(".popup_type_image");
const popupNewCard = document.querySelector(".popup_type_new-card");
const imageOpen = document.querySelector("card__image");

// Находим форму в DOM
const formElement = document.forms["edit-profile"];
const formNewPlace = document.forms["new-place"];

// Находим поля формы в DOM
const nameInput = formElement.querySelector(".popup__input_type_name"); // Воспользуйтесь инструментом .querySelector()
const jobInput = formElement.querySelector(".popup__input_type_description"); // Воспользуйтесь инструментом .querySelector()
const profile__title = document.querySelector(".profile__title");
const profile__description = document.querySelector(".profile__description");

//добавляем карточки на страницу
addCard(initialCards);

//в поля формы пишем текущие значения
nameInput.value = profile__title.textContent;
jobInput.value = profile__description.textContent;

//слушатели открытия модалок
editButton.addEventListener("click", function () {
  openModal(popupEdit);
});
addButton.addEventListener("click", function () {
  openModal(popupNewCard);
});

//вешаем события для закрытия модалок.
addEventList(popupEdit);
addEventList(popupNewCard);
addEventList(popupImage);

formElement.addEventListener("submit", handleFormSubmit);
formNewPlace.addEventListener("submit", formNewPlaceSubmit);
