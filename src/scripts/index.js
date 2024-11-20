import { createCard } from './../components/card.js';
import { openModal, closeModal, addEventList } from './../components/modal.js';
import { changeProfileInfo, addNewCard, checkResponse, addAvatar, getInitialCards, getUserInfo, deleteLike, setLike, deleteCard } from './../components/api.js';
import { enableValidation, clearValidation } from './../components/validation.js';

import './../pages/index.css';

const cardsPlace = document.querySelector(".places__list");
let userId = null;
let initialCards = [];

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const addAvatarButton = document.querySelector(".profile__image");

const popupEdit = document.querySelector(".popup_type_edit");
const popupImage = document.querySelector(".popup_type_image");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupAddAvatar = document.querySelector(".popup__add_avatar");

// Находим форму и поля в DOM
const formEditProfile = document.forms["edit-profile"];
const formNewPlace = document.forms["new-place"];
const formAddAvatar = document.forms['add_avatar'];

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(".popup__input_type_description");
const linkAvatarInput = formAddAvatar.querySelector(".popup__input");

const newPlaceNameInput = formNewPlace.querySelector('.popup__input_type_card-name');
const newPlaceURLInput = formNewPlace.querySelector('.popup__input_type_url');

const img = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

//слушатели открытия модалок
editButton.addEventListener("click", function () {
  openModal(popupEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(formEditProfile);
});

addButton.addEventListener("click", function () {
  openModal(popupNewCard);
  newPlaceNameInput.value = '';
  newPlaceURLInput.value = '';
  clearValidation(formNewPlace);
});

addAvatarButton.addEventListener('click', function () {
  linkAvatarInput.value = "";
  openModal(popupAddAvatar);
})

function addCard(arr) {
  if (Array.isArray(arr) && arr.length) {
    arr.forEach((obj) => {
      cardsPlace.prepend(createCard(obj, userId, deleteCard, openImagePopup, deleteLike, setLike));
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
addEventList(popupAddAvatar);

function submitProfileForm(evt) {
  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;
  const buttonElement = evt.target.querySelector(".popup__button");

  loading(true, buttonElement);

  changeProfileInfo(name, job)
    .then((res) => {
      return checkResponse(res);
    })
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      loading(false, buttonElement);
      closeModal(popupEdit);
    });
}

function submitFormNewPlace(evt) {
  evt.preventDefault();

  const cardName = formNewPlace.querySelector(".popup__input_type_card-name");
  const cardURL = formNewPlace.querySelector(".popup__input_type_url");
  let cardData = [];
  const buttonElement = evt.target.querySelector(".popup__button");

  loading(true, buttonElement);

  addNewCard(cardName, cardURL)
    .then((res) => {
      return checkResponse(res);
    })
    .then((res) => {
      cardData.push(res);
      addCard(cardData, userId, deleteCard, openImagePopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      loading(false, buttonElement);
      closeModal(popupNewCard);
    });
}

function submitformAddAvatar(evt) {
  evt.preventDefault();

  const link = linkAvatarInput.value;
  const buttonElement = evt.target.querySelector(".popup__button");

  loading(true, buttonElement);

  addAvatar(link)
    .then((res) => {
      return checkResponse(res);
    })
    .then((res) => {
      profileImage.style.backgroundImage = `url(${res.avatar})`;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      loading(false, buttonElement);
      closeModal(popupAddAvatar);
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

//todo: выяснить зачем нужен этот объект, в чем преимущество его использования
const enableValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: '.form__submit_inactive',
  inputErrorClass: '.form__input_type_error',
  errorClass: '.form__input-error'
}

enableValidation(enableValidationConfig);

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

