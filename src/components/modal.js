import { addCard } from "./card.js";

const popupImage = document.querySelector(".popup_type_image");
const page = document.querySelector(".page");
const formNewPlace = document.forms["new-place"];
const formElement = document.forms["edit-profile"];
const popupNewCard = document.querySelector(".popup_type_new-card");
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");
const profile__title = document.querySelector(".profile__title");
const profile__description = document.querySelector(".profile__description");
const popupEdit = document.querySelector(".popup_type_edit");

export function openModal(modal) {
  modal.classList.add("popup_is-opened");
  page.addEventListener("keyup", handleEscKeyUp);
}

export function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  page.removeEventListener("keyup", handleEscKeyUp);
}

export function openImage(src, caption) {
  const img = document.querySelector(".popup__image");
  const popupCaption = document.querySelector(".popup__caption");
  img.src = src;
  popupCaption.textContent = caption;
  openModal(popupImage);
}

//закрытие по кнопке ESC
export function handleEscKeyUp(e) {
  if (e.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}

//обработчики для закрытия по крестику и по клику вне модалки
export function addEventList(modal) {
  const closeButton = modal.querySelector(".popup__close");
  closeButton.addEventListener("click", function () {
    closeModal(modal);
  });
  modal.addEventListener("mousedown", function (e) {
    if (e.target.classList.contains("popup")) {
      closeModal(modal);
    }
  });
}

export function handleFormSubmit(evt) {
  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  profile__title.textContent = name;
  profile__description.textContent = job;

  closeModal(popupEdit);
}

export function formNewPlaceSubmit(e) {
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
