import { createCard, deleteCard, likeCard } from './../components/card.js';
import { openModal, closeModal, closeByEscKeyUp, addEventList } from './../components/modal.js';

import './../pages/index.css';
// import {initialCards} from './cards.js';


const cardsPlace = document.querySelector(".places__list");
let userId = null;
let initialCards = [];
let cardsData = [];
let userData = [];

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const popupEdit = document.querySelector(".popup_type_edit");
const popupImage = document.querySelector(".popup_type_image");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupDeleteCard = document.querySelector('.popup__delete_card');

// Находим форму и поля в DOM
const formEditProfile = document.forms["edit-profile"];
const formNewPlace = document.forms["new-place"];

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(".popup__input_type_description");

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

function addCard(arr) {
  if (Array.isArray(arr) && arr.length) {
    arr.forEach((obj) => {
      cardsPlace.prepend(createCard(obj, userId, deleteCard, likeCard, openImagePopup));
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

  fetch('https://mesto.nomoreparties.co/v1/wff-cohort-26/users/me', {
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

  closeModal(popupEdit);
}

function submitFormNewPlace(e) {
  e.preventDefault();

  const cardName = formNewPlace.querySelector(".popup__input_type_card-name");
  const cardURL = formNewPlace.querySelector(".popup__input_type_url");

  fetch('https://nomoreparties.co/v1/wff-cohort-26/cards', {
    method: 'POST',
    headers: {
      authorization: 'a1e0c1a0-efb2-47a7-b652-82dc3cc11121',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: cardName.value,
      link: cardURL.value
    })
  });

  //массив из одного объекта, т.к. функция добавления карточек принимает массив
  const cardData = [
    {
      name: cardName.value,
      link: cardURL.value,
      owner: {
        _id: userId
      }
    },
  ];

  addCard(cardData, userId, deleteCard, likeCard, openImagePopup);

  cardName.value = "";
  cardURL.value = "";

  closeModal(popupNewCard);
}

formEditProfile.addEventListener("submit", submitProfileForm);
formNewPlace.addEventListener("submit", submitFormNewPlace);


///7 спринт
function isValid(formElement, inputElement) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('form__submit_inactive');
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('form__submit_inactive');
  }
};

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input_type_error')
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
}

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};


//todo: выяснить зачем нужен этот объект, в чем преимущество его использования
const enableValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: '.form__submit_inactive',
  inputErrorClass: '.form__input_type_error',
  errorClass: '.form__input-error'  
}

function enableValidation(enableValidationConfig) {
  const formList = Array.from(document.querySelectorAll(`${enableValidationConfig.formSelector}`));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

function clearValidation(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const spanErrorList = Array.from(formElement.querySelectorAll('.form__input-error'));
  const buttonElement = formElement.querySelector('.popup__button');
  console.log(inputList);
  inputList.forEach(function(input) {
    input.classList.remove('form__input_type_error');
  })
  spanErrorList.forEach(function(spanError){
    spanError.classList.remove('form__input-error_active');
  })
  buttonElement.classList.add('form__submit_inactive');
}

enableValidation(enableValidationConfig);

//запросы
//Токен: a1e0c1a0-efb2-47a7-b652-82dc3cc11121
// Идентификатор группы: wff-cohort-26@ya.ru

function fetchCards() {
return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-26/cards', {
  headers: {
    authorization: 'a1e0c1a0-efb2-47a7-b652-82dc3cc11121'
  }
})
  .then(res => res.json())
  .then((result) => {
    return result;
  });
}

  function fetchUser() {
  return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-26/users/me', {
    headers: {
      authorization: 'a1e0c1a0-efb2-47a7-b652-82dc3cc11121'
    }
  })
    .then(res => res.json())
    .then((result) => {
      return result;
    });
  } 

Promise.all([fetchCards(), fetchUser()])
  .then((values) => {
    cardsData = values[0];
    cardsData.forEach((card) => {
      initialCards.push(card);
    });

    userData = values[1];
    userId = userData._id;

    addCard(initialCards);
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
  });

