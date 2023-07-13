import { Popup } from "./Popup.js";

class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._popupInputs = Array.from(this._popup.querySelectorAll('.popup__input'));
        this._popupForm = this._popup.querySelector('.popup__form');
    }

    _getInputValues() {
        const inputsValues = {};
        this._popupInputs.forEach((input) => {
            inputsValues[input.name] = input.value
        });
        return inputsValues;
    }

    close() {
        super.close();
        this._popupForm.reset();
    }
    _handleSubmitForm(evt) {
        evt.preventDefault();
        const values = this._getInputValues();
        this._submitForm(values);
        this.close();
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => this._handleSubmitForm(evt));
    }

}
export { PopupWithForm }