class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this.handleEscClose = this._handleEscClose.bind(this)
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose = (event) => {
        if (event.key === 'Escape') {
            this.close();
        }
    }

    _closePopupByClickingOnOverlay(event) {
        if (event.target !== event.currentTarget) return;
        this.close();
    };


    setEventListeners() {
        const closeButton = this._popup.querySelector('.popup__close-button');
        closeButton.addEventListener('click', () => this.close());
        this._popup.addEventListener('click', (event) => this._closePopupByClickingOnOverlay(event));
        this._popup.addEventListener('keydown', (event) => this.handleEscClose(event));
    }
}
export { Popup }