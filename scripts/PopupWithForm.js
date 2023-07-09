import { Popup } from "./Popup.js";

class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;
    }

    _getInputValues() {
        const popupInputs = Array.from(this._popup.querySelectorAll('.popup__input'));
        const inputsValues = popupInputs.map((input) => {
            return input.value;
        })
        return inputsValues;
    }

    _getPopupForm() {
        const popupForm = this._popup.querySelector('.popup__form');
        return popupForm;
    }

    close() {
        super.close();
        const popupForm = this._getPopupForm();
        popupForm.reset();
    }
    _handleSubmitForm(evt) {
        evt.preventDefault();
        const values = this._getInputValues();
        this._submitForm(values);
        this.close();
    }

    setEventListeners() {
        super.setEventListeners();
        const popupForm = this._getPopupForm();
        popupForm.addEventListener('submit',(evt) => this._handleSubmitForm(evt));
    }

}
export { PopupWithForm }