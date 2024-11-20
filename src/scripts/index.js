import '../pages/index.css';
import { initialCards } from './cards.js'
// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const cardsContainer = document.querySelector(".places__list");
// @todo: Функция создания карточки
function createCard(cardObject, deleteCardHandler) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = cardObject.link;
  cardImage.alt = cardObject.name;
  cardTitle.textContent = cardObject.name;

  cardDeleteButton.addEventListener("click", () => {
    deleteCardHandler(cardElement);
  });

  return cardElement;
}
// @todo: Функция удаления карточки
function deleteCardHandler(card) {
  card.remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach((cardObject) => {
  const cardItem = createCard(cardObject, deleteCardHandler);
  cardsContainer.append(cardItem);
});

const modalArray = document.querySelectorAll('.popup');
modalArray.forEach((modal) => {
  const closeButton = modal.querySelector('.popup__close');
  closeButton.addEventListener('click', () => {
    closePopup(modal);
  });

  modal.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_is-opened')) {
      closePopup(modal);
    }
  })
});

function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupByEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
}

const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_edit');
profileEditButton.addEventListener('click', () => {
  openPopup(profilePopup);
  initializeProfilePopupInteractions(profilePopup);
});

const newCardButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
newCardButton.addEventListener('click', () => {
  openPopup(newCardPopup);
});

function initializeProfilePopupInteractions (profilePopup) {
  const formElement = profilePopup.querySelector('.popup__form');
  const nameInput = formElement.querySelector('.popup__input_type_name');
  const jobInput = formElement.querySelector('.popup__input_type_description');
  const profileTitle = document.querySelector('.profile__title');
  const profileDesc = document.querySelector('.profile__description');

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDesc.textContent;

  function handleFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDesc.textContent = jobInput.value;
    closePopup(profilePopup);
  }

  formElement.addEventListener('submit', handleFormSubmit);
}
