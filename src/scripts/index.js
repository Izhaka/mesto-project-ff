import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, onDeleteCard, onLikeCard } from "../components/card.js";
import {
  openPopup,
  closePopup,
  setCloseModalByClickListeners,
} from "../components/modal.js";

/** DOM-элементы, глобальные переменные */
const cardTemplate = document.querySelector("#card-template").content;
const cardsContainer = document.querySelector(".places__list");

const allPopups = document.querySelectorAll(".popup");

const profileOpenPopupButton = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector(".popup_type_edit");
const profileForm = document.forms["edit-profile"];
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

const newCardOpenPopupButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector(".popup_type_new-card");
const newCardForm = document.forms["new-place"];

const popupImageZoom = document.querySelector(".popup_type_image");
const popupImage = popupImageZoom.querySelector(".popup__image");
const popupImageCaption = popupImageZoom.querySelector(".popup__caption");

/** Заполнение полей формы редактирования профиля */
function fillProfilePopup(formElement) {
  const name = formElement.elements.name;
  const description = formElement.elements.description;

  name.value = profileName.textContent;
  description.value = profileJob.textContent;
}

/** Редактирование профиля */
function updateProfileInfo(formElement) {
  const name = formElement.elements.name.value;
  const description = formElement.elements.description.value;

  profileName.textContent = name;
  profileJob.textContent = description;
}

/** Создание объекта новой карточки */
function getNewCardData(formElement) {
  const name = formElement.elements["place-name"];
  const link = formElement.elements.link;

  return {
    name: name.value,
    link: link.value,
  };
}

/** Обработчик открытия формы редактирования профиля */
function setProfilePopupButtonListener() {
  fillProfilePopup(profileForm);
  openPopup(profilePopup);
}

/** Обработчик события submit для профиля */
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  updateProfileInfo(profileForm);
  closePopup(profilePopup);
  profileForm.reset();
}

/** Обработчик события submit для добавления карточки */
function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  const newCardData = getNewCardData(newCardForm);
  const newCard = createCard(
    cardTemplate,
    newCardData,
    onDeleteCard,
    onLikeCard,
    openImageZoomPopup
  );

  closePopup(newCardPopup);
  newCardForm.reset();
  cardsContainer.prepend(newCard);
}

/** Увеличение изображения карточки, модальное окно */
function openImageZoomPopup(imgUrl, imgAlt, imgCaption) {
  popupImage.src = imgUrl;
  popupImage.alt = imgAlt;
  popupImageCaption.textContent = imgCaption;

  openPopup(popupImageZoom);
}

profileOpenPopupButton.addEventListener("click", setProfilePopupButtonListener);
profileForm.addEventListener("submit", handleProfileFormSubmit);

newCardOpenPopupButton.addEventListener("click", () => {
  openPopup(newCardPopup);
});
newCardForm.addEventListener("submit", handleNewCardFormSubmit);

setCloseModalByClickListeners(allPopups);

/** Рендер первых шести карточек при открытии страницы */
initialCards.forEach((cardData) => {
  const cardItem = createCard(
    cardTemplate,
    cardData,
    onDeleteCard,
    onLikeCard,
    openImageZoomPopup
  );
  cardsContainer.append(cardItem);
});
