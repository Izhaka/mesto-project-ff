import '../pages/index.css';
import { initialCards } from './cards.js'

// Глобальные переменные
///////////////////////////////////////////////////////////////////////
const cardTemplate = document.querySelector("#card-template").content;
const cardsContainer = document.querySelector(".places__list");

const profileOpenPopupButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_edit');
const profileForm = document.forms['edit-profile'];
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

const newCardOpenPopupButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardForm = document.forms['new-place'];

const popupImageZoom = document.querySelector('.popup_type_image');
const popupImage = popupImageZoom.querySelector('.popup__image');
const popupImageCaption = popupImageZoom.querySelector('.popup__caption');


// Создание карточки по шаблону
/////////////////////////////////////////////////////////////////////////////////
function createCard(cardData, deleteCardHandler, handleCardLikeButton, openImageZoomHandler) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
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

  cardLikeButton.addEventListener('click', () => {
    handleCardLikeButton(cardLikeButton)
  });

  cardImage.addEventListener('click', () => {
    openImageZoomHandler(cardImage.src, cardImage.alt, cardTitle.textContent);
  });

  return cardElement;
}

// Обработчики
//////////////////////////////////////////////////////////////////////////////
function deleteCardHandler(card) {
  card.remove();
}

function handleCardLikeButton(cardLikeButton) {
  cardLikeButton.classList.toggle('card__like-button_is-active');
}

function openPopupImageZoom(imgUrl, imgAlt, imgCaption) {
  popupImage.src = imgUrl;
  popupImage.alt = imgAlt;
  popupImageCaption.textContent = imgCaption;

  openPopup(popupImageZoom);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  updateProfileInfo(profileForm);
  closePopup(profilePopup);
  profileForm.reset();
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  const newCardData = getNewCardData(newCardForm);
  const newCard = createCard(newCardData, deleteCardHandler, handleCardLikeButton, openPopupImageZoom);

  closePopup(newCardPopup);
  newCardForm.reset();
  cardsContainer.prepend(newCard);
}

// Модальные окна Общее
////////////////////////////////////////////////////////////////////////////////
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

//////////////////////////////////////////////////////////////////////////





// Установка значений поля профиля в модальном окне
/////////////////////////////////////////////////////////////////////////////
function fillProfilePopup(formElement) {
  const name = formElement.elements.name;
  const description = formElement.elements.description;

  name.value = profileName.textContent;
  description.value = profileJob.textContent;
}

// Обновление инфы в профиле из модалки
function updateProfileInfo(formElement) {
  const name = formElement.elements.name.value;
  const description = formElement.elements.description.value;

  profileName.textContent = name;
  profileJob.textContent = description;
}

// Добавление новой карточки
function getNewCardData(formElement) {
  const name = formElement.elements['place-name'];
  const link = formElement.elements.link;

  return {
    name: name.value,
    link: link.value
  };
}




// Добавление слушателей событий
//////////////////////////////////////////////////

// Слушатели для профиля
profileOpenPopupButton.addEventListener('click', () => {
  fillProfilePopup(profileForm);
  openPopup(profilePopup);
});

profileForm.addEventListener('submit', handleProfileFormSubmit);

// Слушатели для кнопки добавления новой карточки
newCardOpenPopupButton.addEventListener('click', () => {
  newCardForm.reset();
  openPopup(newCardPopup);
});

newCardForm.addEventListener('submit', handleNewCardFormSubmit);


/////////////////////////////////////////////////////////////////////////////////
// Добавление слушателей закрытия окна и очистки полей формы по кнопке и оверлею
const allPopups = document.querySelectorAll('.popup');
allPopups.forEach((popup) => {
  const closeButton = popup.querySelector('.popup__close');

  closeButton.addEventListener('click', () => {
    closePopup(popup);
  });

  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_is-opened')) {
      closePopup(popup);
    }
  })
});

/////////////////////////////////////////////////////////////////
initialCards.forEach((cardObject) => {
  const cardItem = createCard(cardObject, deleteCardHandler, handleCardLikeButton, openPopupImageZoom);
  cardsContainer.append(cardItem);
});
