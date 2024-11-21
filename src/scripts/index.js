import '../pages/index.css';
import { initialCards } from './cards.js'
// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const cardsContainer = document.querySelector(".places__list");
// @todo: Функция создания карточки
function createCard(cardObject, deleteCardHandler, likeCardHandler, openImageZoomHandler) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = cardObject.link;
  cardImage.alt = cardObject.name;
  cardTitle.textContent = cardObject.name;

  cardImage.addEventListener('click', () => {
    openImageZoomHandler(cardImage.src, cardImage.alt, cardTitle.textContent);
  });

  cardDeleteButton.addEventListener("click", () => {
    deleteCardHandler(cardElement);
  });

  cardLikeButton.addEventListener('click', () => {
    handleCardLikeButton(cardLikeButton)
  });

  return cardElement;
}
// @todo: Функция удаления карточки
function deleteCardHandler(card) {
  card.remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach((cardObject) => {
  const cardItem = createCard(cardObject, deleteCardHandler, handleCardLikeButton, openPopupImageZoom);
  // renderCard(cardItem, cardsContainer);
  cardsContainer.append(cardItem);
});

/////////////////////////////////////////////////////////////////////////////////
function renderCard(cardItem, cardsContainer) {
  cardsContainer.prepend(cardItem);
}

////////////////////////////////////////////////////////////////////////////////


// Добавление слушателей закрытия окна и очистки полей формы по кнопке и оверлею
const popupCollection = document.querySelectorAll('.popup');
popupCollection.forEach((popup) => {
  const closeButton = popup.querySelector('.popup__close');
  const formElement = popup.querySelector('.popup__form');

  closeButton.addEventListener('click', () => {
    if (formElement !== null) {
      resetFormFields(formElement);
    }
    closePopup(popup);
  });

  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_is-opened')) {
      if (formElement !== null) {
        resetFormFields(formElement);
      }
      closePopup(popup);
    }
  })
});



// const profileEditButton = document.querySelector('.profile__edit-button');
// const profilePopup = document.querySelector('.popup_type_edit');
// profileEditButton.addEventListener('click', () => {
//   openPopup(profilePopup);
//   initializeProfilePopupInteractions(profilePopup);
// });
// profileOpenPopupButton.addEventListener('click', () => {
//   openPopup(profilePopup);
//   initializeProfilePopupInteractions(profilePopup);
// });

// const newCardButton = document.querySelector('.profile__add-button');
// const newCardPopup = document.querySelector('.popup_type_new-card');
// newCardButton.addEventListener('click', () => {
//   openPopup(newCardPopup);
// });

// function initializeProfilePopupInteractions (profilePopup) {
//   const formElement = profilePopup.querySelector('.popup__form');
//   const nameInput = formElement.querySelector('.popup__input_type_name');
//   const jobInput = formElement.querySelector('.popup__input_type_description');
//   const profileTitle = document.querySelector('.profile__title');
//   const profileDesc = document.querySelector('.profile__description');

//   nameInput.value = profileTitle.textContent;
//   jobInput.value = profileDesc.textContent;

//   function handleFormSubmit(evt) {
//     evt.preventDefault();
//     profileTitle.textContent = nameInput.value;
//     profileDesc.textContent = jobInput.value;
//     closePopup(profilePopup);
//   }

//   formElement.addEventListener('submit', handleFormSubmit);
// }

//////////////////////////////////////////////////////////////////////////

function openPopup(popup) {
  popup.classList.add('popup_is-opened', 'popup_is-animated');
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

function resetFormFields(formElement) {
  formElement.reset();
}


const profileOpenPopupButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_edit');
const profileForm = document.forms['edit-profile'];
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

function setProfilePopupFormFields(formElement) {
  const name = formElement.elements.name;
  const description = formElement.elements.description;

  name.value = profileName.textContent;
  description.value = profileJob.textContent;
}

function updateProfileInfo(formElement) {
  const name = formElement.elements.name.value;
  const description = formElement.elements.description.value;

  profileName.textContent = name;
  profileJob.textContent = description;
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  updateProfileInfo(profileForm);
  closePopup(profilePopup);
  resetFormFields(profileForm);
}

profileOpenPopupButton.addEventListener('click', () => {
  setProfilePopupFormFields(profileForm);
  openPopup(profilePopup);
});

profileForm.addEventListener('submit', handleFormSubmit);

// console.log(profileForm.name.value, profileOpenPopupButton, profilePopup)
// console.log(profileForm.name.value, profileForm.description.value)

////////////////////////////////////////////////

const newCardOpenPopupButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardForm = document.forms['new-place'];

newCardOpenPopupButton.addEventListener('click', () => {
  openPopup(newCardPopup);
});

function createNewCardObject(formElement) {
  const newCard = {};

  const name = formElement['name'];
  const link = formElement.elements.link;
  console.log(name.value, link)
  newCard.name = name.value;
  newCard.link = link.value;
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
console.log(newCardForm)
  const newCardObject = createNewCardObject(newCardForm);
  const newCard = createCard(newCardObject, deleteCardHandler);

  closePopup(profilePopup);
  resetFormFields(newCardForm);
  renderCard(newCard, cardsContainer);
  updateInitialCards(newCard, initialCards);
  console.log(initialCards, newCard)
}

function updateInitialCards(cardObject, cardsArray) {
  cardsArray.append(cardObject);
}

newCardForm.addEventListener('submit', handleNewCardFormSubmit);

//////////////////////////////////////////////////////////////////////

// .card__like-button_is-active

function handleCardLikeButton(cardLikeButton) {
  cardLikeButton.classList.toggle('card__like-button_is-active');
}
////////////////////////////////////////////////////////////////////
const popupImageZoom = document.querySelector('.popup_type_image');
const popupImage = popupImageZoom.querySelector('.popup__image');
const popupImageCaption = popupImageZoom.querySelector('.popup__caption');

function openPopupImageZoom(imgUrl, imgAlt, imgCaption) {
  popupImage.src = imgUrl;
  popupImage.alt = imgAlt;
  popupImageCaption.textContent = imgCaption;

  openPopup(popupImageZoom);
}
/////////////////////////////////////////////////////////////////
