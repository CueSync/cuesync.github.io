/**
 * --------------------------------------------------------------------------
 * Bootstrap base-component.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import Data from './data.js'
import { getElement } from './util.js'
import Config from './config.js'

/**
 * Constants
 */

const VERSION = '1.0.0-alpha1'

/**
 * Class definition
 */

class BaseComponent extends Config {
  constructor(element, config) {
    super()

    element = getElement(element)
    if (!element) {
      return
    }

    this._element = element
    this._config = this._getConfig(config)

    Data.set(this._element, this.constructor.DATA_KEY, this)
  }

  // Public
  dispose() {
    Data.remove(this._element, this.constructor.DATA_KEY)

    for (const propertyName of Object.getOwnPropertyNames(this)) {
      this[propertyName] = null
    }
  }

  _getConfig(config) {
    config = this._mergeConfigObj(config, this._element)
    config = this._configAfterMerge(config)
    this._typeCheckConfig(config)
    return config
  }

  // Static
  static getInstance(element) {
    return Data.get(getElement(element), this.DATA_KEY)
  }

  static getOrCreateInstance(element, config = {}) {
    return this.getInstance(element) || new this(element, typeof config === 'object' ? config : null)
  }

  static get VERSION() {
    return VERSION
  }

  static get DATA_KEY() {
    return `cs.${this.NAME}`
  }
}

export default BaseComponent
