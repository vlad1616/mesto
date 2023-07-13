import '../styles/index.css';
import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { validationConfig, initialCards } from '../utils/constants.js';
import { Section } from '../components/Section.js';
import LogoImage from '../images/header-logo.svg';
import AvatarImage from '../images/profile-avatar.png';
const logo = document.querySelector('.header__logo');
logo.src = LogoImage;
const avatar = document.querySelector('.profile__avatar');
avatar.src = AvatarImage
const editButton = document.querySelector('.profile__button');
const profileForm = document.querySelector('.popup__form_editing');
const addingFormElement = document.querySelector('.popup__form_add');
const addingButton = document.querySelector('.profile__add-button');
const editingProfileFormValidator = new FormValidator(validationConfig, profileForm);
const addingCardFormValidator = new FormValidator(validationConfig, addingFormElement);
const popupWithImage = new PopupWithImage({ popupSelector: '.popup_type_image' });
popupWithImage.setEventListeners();
const section = new Section({ items: initialCards, renderer: createCard }, '.element');
section.addSection();
function handleOpenPopup(text, link) {
  popupWithImage.open({ text: text, link: link });
}

function createCard(card) {
  const newCard = new Card(card, '#elementTemplate', handleOpenPopup);
  return newCard.generateCard()
}
//*Добавление новой карточки
function addNewCard(card) {
  const elementCard = createCard(card);
  section.addItem(elementCard);
}

const userInfo = new UserInfo({ nameSelector: '.profile__title', jobSelector: '.profile__subtitle' })

function handleProfileFormSubmit(values) {
  const { name, job } = values;
  userInfo.setUserInfo(name, job);
}

function handleCardFormSubmit(values) {
  const { name, link } = values;
  const card = { name: name, link: link }
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
  const { name, job } = userInfo.getUserInfo();
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

const enableValidationForms = () => {
  editingProfileFormValidator.enableValidation();
  addingCardFormValidator.enableValidation();
}

enableValidationForms();
