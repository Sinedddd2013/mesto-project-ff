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
    deleteCard(cardData)
      .then(() => {
        cardItem.remove();
      })
      .catch((err) => {
        console.log(err);
      })
  });

  let isLiked = cardData.likes.some((like) => like._id === userId);
  if (isLiked) { likeButton.classList.add("card__like-button_is-active") };

  likeButton.addEventListener("click", function () {
    if (isLiked) {
      deleteLike(cardData._id)
        .then((cardData) => {
          toggleLike(cardData, likeButton, cardLikesCount);
          isLiked = false;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setLike(cardData._id)
        .then((cardData) => {
          toggleLike(cardData, likeButton, cardLikesCount);
          isLiked = true;
        })
        .catch((err) => {
          console.log(err);
        });
    };
  });

  return cardItem;
}

function toggleLike(cardData, likeButton, cardLikesCount) {
  likeButton.classList.toggle("card__like-button_is-active");
  cardLikesCount.textContent = cardData.likes.length;
} 