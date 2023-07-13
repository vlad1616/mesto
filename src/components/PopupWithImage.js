import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
    constructor({ popupSelector }) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.popup__image');
    }
    open({text, link}) {
        super.open();
        const popupSubitle = this._popup.querySelector('.popup__subtitle');
        this._popupImage.src = link;
        this._popupImage.alt = text;
        popupSubitle.textContent = text;

    }
}
export { PopupWithImage }