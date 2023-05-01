class Card {
    constructor(item, templateSelector, handlerOpenPopup) {
        this._name = item.name;
        this._link = item.link;
        this._template = templateSelector;
        this._handlerOpenPopup = handlerOpenPopup;
        this._elementCard = null;
        this._elementCardFhoto = null;
        this._likeElement = null;
        this._basketElement = null;
    }

    // _openBigImage() {
    //     const popupImage = document.querySelector('.popup_type_image');
    //     const bigImage = document.querySelector('.popup__image');
    //     this._openPopup(popupImage);
    //     popupImageSubtitle.textContent = this._name;
    //     bigImage.src = this._link;
    //     bigImage.alt = this._alt;
    // }

    _handlerLikeClick(evt) {
        const eventTarget = evt.target;
        eventTarget.classList.toggle('element__like_active');
    }

    _handlerBasketClick() {
        this._elementCard.remove();
        this._elementCard = null;
    }

    _setEventListeners() {
        this._likeElement.addEventListener('click', (evt) => this._handlerLikeClick(evt));
        this._basketElement.addEventListener('click', () => this._handlerBasketClick());
        this._elementCardFhoto.addEventListener('click', () => this._handlerOpenPopup(this._name, this._link));
    }

    _createCard() {
        const templateCard = document.querySelector(this._template).content;
        this._elementCard = templateCard.querySelector('.element__grid').cloneNode(true);
        this._elementCardFhoto = this._elementCard.querySelector('.element__photo');
        this._likeElement = this._elementCard.querySelector('.element__like');
        this._elementCardFhoto.src = this._link;
        this._elementCardFhoto.alt = this._name;
        this._elementCard.querySelector('.element__title').textContent = this._name;
        this._basketElement = this._elementCard.querySelector('.element__basket');
        this._setEventListeners();
        return this._elementCard;
    }

    generateCard() {
        return this._createCard();
    }
}
export { Card }