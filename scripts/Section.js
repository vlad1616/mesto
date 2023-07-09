class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;

        this._container = document.querySelector(containerSelector);
    }

    addSection() {

        const renderedItems = this._items.map(item => {
            this._renderer(item);
        });
        this._container.append(...renderedItems);
    }

    addItem(element) {
        this._container.append(element);
    }
}
export { Section }