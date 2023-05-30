import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js';
const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input-error',
};
const profilePopup = document.querySelector('.popup_profile_add');
const editButton = document.querySelector('.profile__button');
const profileCloseButton = document.querySelector('.popup__close-button');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.popup__input_value_form');
const jobInput = document.querySelector('.popup__input_value_job');
const profileForm = document.querySelector('.popup__form_editing');
const addingFormElement = document.querySelector('.popup__form_add');
const addingPopup = document.querySelector('.popup_form_add');
const addingButton = document.querySelector('.profile__add-button');
const cardPopupCloseButton = document.querySelector('.popup__close-button_form_add');
const newCardName = document.querySelector('.popup__input_value_title');
const newCardLink = document.querySelector('.popup__input_value_link');
const popupWithImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupWithImageSubtitle = document.querySelector('.popup__subtitle');
const popupWithImageClose = document.querySelector('.popup__close-button_type_image');
const popups = Array.from(document.querySelectorAll('.popup'));
const editingProfileFormValidator = new FormValidator(validationConfig, profileForm);
const addingCardFormValidator = new FormValidator(validationConfig, addingFormElement);
// Функия открытия попапа
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  window.addEventListener('keydown', closePopupByClickingOnEscape);
}
function openPopupForEditing(nameElement, jobElement, popupElement) {
  nameElement.value = profileName.textContent;
  jobElement.value = profileJob.textContent;
  editingProfileFormValidator.disableButton();
  openPopup(popupElement);
}

function openPopupForAdding(nameElement, linkElement, popupElement) {
  nameElement.value = "";
  linkElement.value = "";
  addingCardFormValidator.disableButton();
  openPopup(popupElement);
}
// Функция открытия попапа с картинкой
function handleOpenPopup(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupWithImageSubtitle.textContent = name;
  openPopup(popupWithImage);
}
editButton.addEventListener('click', () => openPopupForEditing(nameInput, jobInput, profilePopup));
addingButton.addEventListener('click', () => openPopupForAdding(newCardName, newCardLink, addingPopup));

// Функия закрытия попапа
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  window.removeEventListener('keydown', closePopupByClickingOnEscape);
};

const closePopupByClickingOnEscape = (e) => {
  if (e.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

profileCloseButton.addEventListener('click', () => closePopup(profilePopup));
cardPopupCloseButton.addEventListener('click', () => closePopup(addingPopup));
popupWithImageClose.addEventListener('click', () => closePopup(popupWithImage));


function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profilePopup);
}
profileForm.addEventListener('submit', handleProfileFormSubmit);

const listOfElements = document.querySelector('.element');

function createCard(card) {
  const newCard = new Card(card, '#elementTemplate', handleOpenPopup);
  return newCard.generateCard()
}
//*Добавление новой карточки
function addNewCard(card) {
  const elementCard = createCard(card);
  listOfElements.prepend(elementCard);
}

function handleAddingFormSubmit(evt) {
  evt.preventDefault();
  const card = {
    name: newCardName.value,
    link: newCardLink.value,
    alt: newCardName.value
  }
  addNewCard(card);
  closePopup(addingPopup);
}

const closePopupByClickingOnOverlay = (e) => {
  if (e.target !== e.currentTarget) return;
  closePopup(e.currentTarget);
};

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  }
];

const enableValidationForms = () => {
  editingProfileFormValidator.enableValidation();
  addingCardFormValidator.enableValidation();
}
popups.forEach((popup) => popup.addEventListener('click', closePopupByClickingOnOverlay));
enableValidationForms();
addingFormElement.addEventListener('submit', (evt) => handleAddingFormSubmit(evt));
initialCards.forEach(addNewCard);