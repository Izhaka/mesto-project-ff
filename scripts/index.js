// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const cardsContainer = document.querySelector(".places__list");
// @todo: Функция создания карточки
function createCard(cardObject, deleteCardHandler) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = cardObject.link;
  cardImage.alt = "Фото места, описанного в карточке";
  cardTitle.textContent = cardObject.name;

  cardDeleteButton.addEventListener("click", deleteCardHandler);

  return cardElement;
}
// @todo: Функция удаления карточки
function deleteCardHandler(evt) {
  const cardItem = evt.target.closest(".card");
  cardItem.remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach((cardObject) => {
  const cardItem = createCard(cardObject, deleteCardHandler);
  cardsContainer.append(cardItem);
});
