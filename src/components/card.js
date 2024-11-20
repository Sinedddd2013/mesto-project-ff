export function createCard(cardData, userId, deleteCard, openImagePopup, deleteLike, setLike) {
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

  if (cardData.owner._id !== userId) {
    deleteButton.remove();
  };

  deleteButton.addEventListener("click", function () {
    deleteCard(cardData);
    cardItem.remove();
  });

  const isLiked = cardData.likes.some((like) => like._id === userId);
  if (isLiked) { likeButton.classList.add("card__like-button_is-active") };

  likeButton.addEventListener("click", function () {
    if (likeButton.classList.contains('card__like-button_is-active')) {
      deleteLike(cardData._id)
        .then((json) => {
          likeButton.classList.remove("card__like-button_is-active");
          cardLikesCount.textContent = json.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setLike(cardData._id)
        .then((json) => {
          likeButton.classList.add("card__like-button_is-active");
          cardLikesCount.textContent = json.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    };
  });
  return cardItem;
}