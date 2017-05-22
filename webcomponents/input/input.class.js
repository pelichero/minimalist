const {HTMLElement} = window

module.exports = class MnInput extends HTMLElement {
  constructor(self) {
    self = super(self)
    return self
  }

  connectedCallback() {
    this.innerHTML = ''
    this._setCssClasses()
    this._setPlaceholder()
    this._setInput()
    this._setAttributeValue()
    this._setAttributeAutocomplete()
    this._setAttributeSpellcheck()
    this._setAttributeDisabled()
    this._setAttributeReadonly()
    this._setAttributeMaxlength()
    this._setAttributeAutocapitalize()
  }

  _setCssClasses() {
    this.classList.add('mn-input')
  }

  _setInput() {
    this.input = document.createElement('input')
    this.input.classList.add('input')
    this.insertBefore(this.input, this.firstChild)

    this.input.addEventListener('change', () => {
      this.input.value
        ? this.classList.add('has-value')
        : this.classList.remove('has-value')
    })
  }

  _setPlaceholder() {
    this.label = document.createElement('label')
    this.label.classList.add('placeholder')
    this.insertBefore(this.label, this.firstChild)
    this.placeholder = this.getAttribute('placeholder')
  }

  _setAttributeValue() {
    const value = this.getAttribute('value') || ''
    this.setAttribute('value', value)
  }

  _setAttributeAutocomplete() {
    this.setAttribute('autocomplete', 'off')
  }

  _setAttributeSpellcheck() {
    this.setAttribute('spellcheck', 'off')
  }

  _setAttributeDisabled() {
    this.disabled = this.hasAttribute('disabled')
  }

  _setAttributeReadonly() {
    this.readonly = this.hasAttribute('readonly')
  }

  _setAttributeMaxlength() {
    this.maxlength = this.getAttribute('maxlength')
  }

  _setAttributeAutocapitalize() {
    this.autocapitalize = this.getAttribute('autocapitalize') || 'off'
  }

  static get observedAttributes() {
    return [
      'value',
      'name',
      'placeholder',
      'disabled',
      'readonly',
      'maxlength',
      'autocapitalize',
    ]
  }

  attributeChangedCallback(name, old, value) {
    this[name] = value
  }

  get value() {
    return this.input.value
  }

  set value(value = '') {
    const differentValue = this.input && this.input.value !== value

    if (this.input && differentValue) {
      this.input.value = value
      this.input.dispatchEvent(new Event('change'))
    }
  }

  set name(value) {
    const form = this.closest('form')
    const name = this.getAttribute('name')
    const element = this

    if (form) {
      Object.defineProperty(form, name, {
        get: () => {
          return element.getAttribute('name')
            ? element
            : undefined
        },
      })
    }
  }

  set placeholder(value) {
    this.label
      ? this.label.textContent = value
      : null
  }

  set disabled(value) {
    if (this.input) {
      this.input.disabled = value
    }
  }

  set readonly(value) {
    if (this.input) {
      this.input.readOnly = value
    }
  }

  set maxlength(value) {
    if (this.input) {
      value
        ? this.input.setAttribute('maxlength', value)
        : this.input.removeAttribute('maxlength')
    }
  }

  set autocapitalize(value) {
    if (this.input) {
      value
        ? this.input.setAttribute('autocapitalize', value)
        : this.input.removeAttribute('autocapitalize')
    }
  }
}