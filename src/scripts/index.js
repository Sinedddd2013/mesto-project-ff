import {createCard, deleteCard, likeCard} from './../components/card.js';
import {openModal, closeModal, closeByEscKeyUp, addEventList} from './../components/modal.js';

import './../pages/index.css';
import {initialCards} from './cards.js';

const cardsPlace = document.querySelector(".places__list");

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const popupEdit = document.querySelector(".popup_type_edit");
const popupImage = document.querySelector(".popup_type_image");
const popupNewCard = document.querySelector(".popup_type_new-card");

// Находим форму и поля в DOM
const formEditProfile = document.forms["edit-profile"];
const formNewPlace = document.forms["new-place"];
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = formEditProfile.querySelector(".popup__input_type_name"); 
const jobInput = formEditProfile.querySelector(".popup__input_type_description");

const img = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

//добавляем карточки на страницу
addCard(initialCards);

//слушатели открытия модалок
editButton.addEventListener("click", function () {
  openModal(popupEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

addButton.addEventListener("click", function () {
  openModal(popupNewCard);
});

function addCard(arr) {
  if (Array.isArray(arr) && arr.length) {
    arr.forEach((obj) => {
      cardsPlace.prepend(createCard(obj, deleteCard, likeCard, openImagePopup));
    });
  }
}

function openImagePopup(cardObj) {
  img.src = cardObj.link;
  img.alt = cardObj.name;
  popupCaption.textContent = cardObj.name;
  openModal(popupImage);
}

//вешаем события для закрытия модалок.
addEventList(popupEdit);
addEventList(popupNewCard);
addEventList(popupImage);

function submitProfileForm(evt) {
  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  profileTitle.textContent = name;
  profileDescription.textContent = job;

  closeModal(popupEdit);
}

function submitFormNewPlace(e) {
  e.preventDefault();

  const cardName = formNewPlace.querySelector(".popup__input_type_card-name");
  const cardURL = formNewPlace.querySelector(".popup__input_type_url");

  //массив из одного объекта, т.к. функция добавления карточек принимает массив
  const cardData = [
    {
      name: cardName.value,
      link: cardURL.value,
    },
  ];

  addCard(cardData);

  cardName.value = "";
  cardURL.value = "";

  closeModal(popupNewCard);
}

formEditProfile.addEventListener("submit", submitProfileForm);
formNewPlace.addEventListener("submit", submitFormNewPlace);

