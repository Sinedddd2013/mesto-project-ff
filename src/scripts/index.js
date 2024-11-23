import { createCard } from "./../components/card.js";
import { openModal, closeModal, addEventList } from "./../components/modal.js";
import {
  changeProfileInfo,
  addNewCard,
  addAvatar,
  getInitialCards,
  getUserInfo,
  deleteLike,
  setLike,
  deleteCard,
} from "./../components/api.js";
import {
  enableValidation,
  clearValidation,
} from "./../components/validation.js";

import "./../pages/index.css";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error",
  errorClassActive: "form__input-error_active",
};

const cardsPlace = document.querySelector(".places__list");
let userId = null;
let initialCards = [];

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const addAvatarButton = document.querySelector(".profile__image");

const popupEditProfile = document.querySelector(".popup_type_edit");
const popupImage = document.querySelector(".popup_type_image");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupAddAvatar = document.querySelector(".popup__add_avatar");

// Находим форму и поля в DOM
const formEditProfile = document.forms["edit-profile"];
const formNewPlace = document.forms["new-place"];
const formAddAvatar = document.forms["add_avatar"];

const cardNameInput = formNewPlace.querySelector(
  ".popup__input_type_card-name"
);
const cardURLInput = formNewPlace.querySelector(".popup__input_type_url");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(
  ".popup__input_type_description"
);
const linkAvatarInput = formAddAvatar.querySelector(".popup__input");

const newPlaceNameInput = formNewPlace.querySelector(
  ".popup__input_type_card-name"
);
const newPlaceURLInput = formNewPlace.querySelector(".popup__input_type_url");

const imgPopup = document.querySelector(".popup__image");
const imgPopupCaption = document.querySelector(".popup__caption");

//слушатели открытия модалок
editProfileButton.addEventListener("click", function () {
  openModal(popupEditProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(formEditProfile, validationConfig);
});

addCardButton.addEventListener("click", function () {
  openModal(popupNewCard);
  formNewPlace.reset();
  clearValidation(formNewPlace, validationConfig);
});

addAvatarButton.addEventListener("click", function () {
  formAddAvatar.reset();
  openModal(popupAddAvatar);
  clearValidation(formAddAvatar, validationConfig);
});

function addCard(arr) {
  if (Array.isArray(arr) && arr.length) {
    arr.forEach((obj) => {
      cardsPlace.prepend(
        createCard(obj, userId, deleteCard, openImagePopup, deleteLike, setLike)
      );
    });
  }
}

function openImagePopup(cardObj) {
  imgPopup.src = cardObj.link;
  imgPopup.alt = cardObj.name;
  imgPopupCaption.textContent = cardObj.name;
  openModal(popupImage);
}

//вешаем события для закрытия модалок.
addEventList(popupEditProfile);
addEventList(popupNewCard);
addEventList(popupImage);
addEventList(popupAddAvatar);

function submitProfileForm(evt) {
  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;
  const buttonElement = evt.target.querySelector(".popup__button");

  loading(true, buttonElement);

  changeProfileInfo(name, job)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
      closeModal(popupEditProfile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      loading(false, buttonElement);
    });
}

function submitFormNewPlace(evt) {
  evt.preventDefault();

  let cardData = [];
  const buttonElement = evt.target.querySelector(".popup__button");

  loading(true, buttonElement);

  addNewCard(cardNameInput, cardURLInput)
    .then((res) => {
      cardData.push(res);
      addCard(cardData, userId, deleteCard, openImagePopup);
      loading(false, buttonElement);
      closeModal(popupNewCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      loading(false, buttonElement);
    });
}

function submitformAddAvatar(evt) {
  evt.preventDefault();

  const link = linkAvatarInput.value;
  const buttonElement = evt.target.querySelector(".popup__button");

  loading(true, buttonElement);

  addAvatar(link)
    .then((res) => {
      profileImage.style.backgroundImage = `url(${res.avatar})`;
      loading(false, buttonElement);
      closeModal(popupAddAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      loading(false, buttonElement);
    });
}

formEditProfile.addEventListener("submit", submitProfileForm);
formNewPlace.addEventListener("submit", submitFormNewPlace);
formAddAvatar.addEventListener("submit", submitformAddAvatar);

function loading(isLoading, buttonElement) {
  if (isLoading) {
    buttonElement.innerHTML = "Сохранение";
  } else {
    buttonElement.innerHTML = "Сохранить";
  }
}

enableValidation(validationConfig);

Promise.all([getInitialCards(), getUserInfo()])
  .then(([cardsData, userData]) => {
    cardsData.forEach((card) => {
      initialCards.push(card);
    });
    userId = userData._id;

    addCard(initialCards);

    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
  })
  .catch((err) => {
    console.log(err);
  });
