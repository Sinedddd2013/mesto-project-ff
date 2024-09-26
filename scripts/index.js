// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы

// @todo: Функция создания карточки
function createCard(src, name) {
  const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardItem.querySelector(".card__delete-button");

  cardItem.querySelector(".card__image").src = src;
  cardItem.querySelector(".card__image").alt = name;
  cardItem.querySelector(".card__title").textContent = name;
  deleteButton.onclick = deleteCard;
  return cardItem;
}

function renderInitialCards(arr) {
  if (Array.isArray(arr) && arr.length) {
    arr.forEach((obj) => {
      let name = obj.name;
      let src = obj.link;
      document.querySelector(".places__list").append(createCard(src, name));
    });
  }
}

function addCard(arr) {
  if (Array.isArray(arr) && arr.length) {
    arr.forEach((obj) => {
      let name = obj.name;
      let src = obj.link;
      document.querySelector(".places__list").append(createCard(src, name));
    });
  }
}

// @todo: Функция удаления карточки
function deleteCard(e) {
  const cardToDel = e.target.closest(".card");
  cardToDel.remove();
}

// @todo: Вывести карточки на страницу
renderInitialCards(initialCards);
