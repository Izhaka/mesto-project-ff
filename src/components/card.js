function createCard(
  cardTemplate,
  cardData,
  deleteCardHandler,
  cardLikeButtonHandler,
  onZoomPopupHandler
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  cardDeleteButton.addEventListener("click", () => {
    deleteCardHandler(cardElement);
  });

  cardLikeButton.addEventListener("click", () => {
    cardLikeButtonHandler(cardLikeButton);
  });

  cardImage.addEventListener("click", () => {
    onZoomPopupHandler(cardImage.src, cardImage.alt, cardTitle.textContent);
  });

  return cardElement;
}

function onDeleteCard(card) {
  card.remove();
}

function onLikeCard(cardLikeButton) {
  cardLikeButton.classList.toggle("card__like-button_is-active");
}

export { createCard, onDeleteCard, onLikeCard };
