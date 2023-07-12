import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';
import { Popup } from './Popup.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';
const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input-error',
};
const editButton = document.querySelector('.profile__button');
const profileCloseButton = document.querySelector('.popup__close-button');
const profileForm = document.querySelector('.popup__form_editing');
const addingFormElement = document.querySelector('.popup__form_add');
const addingButton = document.querySelector('.profile__add-button');
const cardPopupCloseButton = document.querySelector('.popup__close-button_form_add');
const popupWithImageClose = document.querySelector('.popup__close-button_type_image');
const editingProfileFormValidator = new FormValidator(validationConfig, profileForm);
const addingCardFormValidator = new FormValidator(validationConfig, addingFormElement);
const listOfElements = document.querySelector('.element');
let popupWithImage = null;

function handleOpenPopup(text, link) {
  popupWithImage = new PopupWithImage({ popupSelector: '.popup_type_image', image: link, text: text });
  popupWithImage.setEventListeners();
  popupWithImage.open();
}

function createCard(card) {
  const newCard = new Card(card, '#elementTemplate', handleOpenPopup);
  return newCard.generateCard()
}
//*Добавление новой карточки
function addNewCard(card) {
  const elementCard = createCard(card);
  listOfElements.prepend(elementCard);
}

const userInfo = new UserInfo({ nameSelector: '.profile__title', jobSelector: '.profile__subtitle' })

function handleProfileFormSubmit(values) {
  const [newName, newJob] = values;
  userInfo.setUserInfo(newName, newJob);
}

function handleCardFormSubmit(values) {
  const [newName, newLink] = values;
  const card = { name: newName, link: newLink }
  addNewCard(card)
}
const editingPopupClassName = '.popup_profile_add';
const profileEditingPopup = new PopupWithForm(editingPopupClassName, handleProfileFormSubmit);

profileEditingPopup.setEventListeners()

const cardAddingPopup = new PopupWithForm('.popup_form_add', handleCardFormSubmit);

cardAddingPopup.setEventListeners();

function openProfileEditing() {
  const popup = document.querySelector(editingPopupClassName);
  const popupNameInput = popup.querySelector('.popup__input_value_form');
  const popupJobInput = popup.querySelector('.popup__input_value_job')
  const {name,job} = userInfo.getUserInfo();
  profileEditingPopup.open();
  editingProfileFormValidator.disableButton();
  popupNameInput.value = name;
  popupJobInput.value = job;
}

function openCardAdding() {
  cardAddingPopup.open();
  addingCardFormValidator.disableButton();
}

editButton.addEventListener('click', () => openProfileEditing());
addingButton.addEventListener('click', () => openCardAdding());
profileCloseButton.addEventListener('click', () => profileEditingPopup.close());
cardPopupCloseButton.addEventListener('click', () => cardAddingPopup.close());
popupWithImageClose.addEventListener('click', () => popupWithImage.close());

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

enableValidationForms();

initialCards.forEach(addNewCard);