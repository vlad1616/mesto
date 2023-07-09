import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
    constructor({ popupSelector, image, text }) {
        super(popupSelector);
        this._image = image;
        this._text = text;
    }
    open() {
        super.open();
        const popupImage = this._popup.querySelector('.popup__image');
        const popupSubitle = this._popup.querySelector('.popup__subtitle');
        popupImage.src = this._image;
        popupImage.alt = this._text;
        popupSubitle.textContent = this._text;

    }
}
export { PopupWithImage }