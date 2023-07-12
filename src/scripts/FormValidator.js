class FormValidator {
    constructor(validationConfig, formElement) {
        this._validationConfig = validationConfig;
        this._form = formElement;
        const { inputSelector, submitButtonSelector } = validationConfig;
        this._formInputs = Array.from(formElement.querySelectorAll(inputSelector));
        this._formButton = formElement.querySelector(submitButtonSelector);
    }

    _checkInputValidity = (input) => {
        const currentInputErrorContainer = this._form.querySelector(`#${input.id}-error`)
        if (input.checkValidity()) {
            currentInputErrorContainer.textContent = "";
        } else {
            currentInputErrorContainer.textContent = input.validationMessage;
        }
    }

    _hasInvalidInput = () => {
        return this._formInputs.some((item => !item.validity.valid));
    }

    _enableButton = () => {
        this._formButton.removeAttribute('disabled');
    }

    disableButton = () => {
        this._formButton.setAttribute('disabled', true);
    }

    _setEventListeners = () => {
        this._formInputs.forEach(input => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input);
                if (this._hasInvalidInput()) {
                    this.disableButton();
                } else {
                    this._enableButton();
                }
            })
        })
    }

    enableValidation = () => {
        this._setEventListeners();
        this.disableButton();
    }
}

export { FormValidator }