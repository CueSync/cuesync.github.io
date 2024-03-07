/*!
  * CueSync v1.0.0-alpha1 (https://cuesync.github.io/)
  * Copyright 2024 Neeraj Kumar Das (https://github.com/nkdas91)
  * Licensed under MIT (https://github.com/cuesync/cuesync/blob/master/LICENSE)  
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.cuesync = factory());
})(this, (function () { 'use strict';

  /**
   * --------------------------------------------------------------------------
   * Bootstrap dom/data.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * Constants
   */

  const elementMap = new Map();
  const Data = {
    set(element, key, instance) {
      if (!elementMap.has(element)) {
        elementMap.set(element, new Map());
      }
      const instanceMap = elementMap.get(element);

      // make it clear we only want one instance per element
      // can be removed later when multiple key/instances are fine to be used
      if (!instanceMap.has(key) && instanceMap.size !== 0) {
        // eslint-disable-next-line no-console
        console.error(`CueSync doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
        return;
      }
      instanceMap.set(key, instance);
    },
    get(element, key) {
      if (elementMap.has(element)) {
        return elementMap.get(element).get(key) || null;
      }
      return null;
    },
    remove(element, key) {
      if (!elementMap.has(element)) {
        return;
      }
      const instanceMap = elementMap.get(element);
      instanceMap.delete(key);

      // free up element references if there are no instances left for an element
      if (instanceMap.size === 0) {
        elementMap.delete(element);
      }
    }
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap util/index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  // Shout-out Angus Croll (https://goo.gl/pxwQGp)
  const toType = object => {
    if (object === null || object === undefined) {
      return `${object}`;
    }
    return Object.prototype.toString.call(object).match(/\s([a-z]+)/i)[1].toLowerCase();
  };
  const isElement = object => {
    if (!object || typeof object !== 'object') {
      return false;
    }
    return typeof object.nodeType !== 'undefined';
  };
  const getElement = object => {
    if (isElement(object)) {
      return object;
    }
    if (typeof object === 'string' && object.length > 0) {
      return document.querySelector(object);
    }
    return null;
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap dom/manipulator.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  function normalizeData(value) {
    if (value === 'true') {
      return true;
    }
    if (value === 'false') {
      return false;
    }
    if (value === Number(value).toString()) {
      return Number(value);
    }
    if (value === '' || value === 'null') {
      return null;
    }
    if (typeof value !== 'string') {
      return value;
    }
    try {
      return JSON.parse(decodeURIComponent(value));
    } catch (_unused) {
      return value;
    }
  }
  function normalizeDataKey(key) {
    return key.replace(/[A-Z]/g, chr => `-${chr.toLowerCase()}`);
  }
  const Manipulator = {
    setDataAttribute(element, key, value) {
      element.setAttribute(`data-cs-${normalizeDataKey(key)}`, value);
    },
    removeDataAttribute(element, key) {
      element.removeAttribute(`data-cs-${normalizeDataKey(key)}`);
    },
    getDataAttributes(element) {
      if (!element) {
        return {};
      }
      const attributes = {};
      const csKeys = Object.keys(element.dataset).filter(key => key.startsWith('cs') && !key.startsWith('csConfig'));
      for (const key of csKeys) {
        let pureKey = key.replace(/^cs/, '');
        pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
        attributes[pureKey] = normalizeData(element.dataset[key]);
      }
      return attributes;
    },
    getDataAttribute(element, key) {
      return normalizeData(element.getAttribute(`data-cs-${normalizeDataKey(key)}`));
    }
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap util/config.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Class definition
   */

  class Config {
    // Getters
    static get Default() {
      return {};
    }
    static get DefaultType() {
      return {};
    }
    static get NAME() {
      throw new Error('You have to implement the static method "NAME", for each component!');
    }
    _getConfig(config) {
      config = this._mergeConfigObj(config);
      config = this._configAfterMerge(config);
      this._typeCheckConfig(config);
      return config;
    }
    _configAfterMerge(config) {
      return config;
    }
    _mergeConfigObj(config, element) {
      const jsonConfig = isElement(element) ? Manipulator.getDataAttribute(element, 'config') : {}; // try to parse

      return {
        ...this.constructor.Default,
        ...(typeof jsonConfig === 'object' ? jsonConfig : {}),
        ...(isElement(element) ? Manipulator.getDataAttributes(element) : {}),
        ...(typeof config === 'object' ? config : {})
      };
    }
    _typeCheckConfig(config, configTypes = this.constructor.DefaultType) {
      for (const property of Object.keys(configTypes)) {
        const expectedTypes = configTypes[property];
        const value = config[property];
        const valueType = isElement(value) ? 'element' : toType(value);
        if (!new RegExp(expectedTypes).test(valueType)) {
          throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
        }
      }
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap base-component.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const VERSION = '1.0.0-alpha1';

  /**
   * Class definition
   */

  class BaseComponent extends Config {
    constructor(element, config) {
      super();
      element = getElement(element);
      if (!element) {
        return;
      }
      this._element = element;
      this._config = this._getConfig(config);
      Data.set(this._element, this.constructor.DATA_KEY, this);
    }

    // Public
    dispose() {
      Data.remove(this._element, this.constructor.DATA_KEY);
      for (const propertyName of Object.getOwnPropertyNames(this)) {
        this[propertyName] = null;
      }
    }
    _getConfig(config) {
      config = this._mergeConfigObj(config, this._element);
      config = this._configAfterMerge(config);
      this._typeCheckConfig(config);
      return config;
    }

    // Static
    static getInstance(element) {
      return Data.get(getElement(element), this.DATA_KEY);
    }
    static getOrCreateInstance(element, config = {}) {
      return this.getInstance(element) || new this(element, typeof config === 'object' ? config : null);
    }
    static get VERSION() {
      return VERSION;
    }
    static get DATA_KEY() {
      return `cs.${this.NAME}`;
    }
  }

  /**
   * --------------------------------------------------------------------------
   * CueSync cuesync.js
   * Licensed under MIT (https://github.com/cuesync/cuesync.github.io/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  const NAME = 'cuesync';
  class CueSync extends BaseComponent {
    constructor(element, config) {
      super(element);
      this._element = element;
      this._config = this._getConfig(config);
      this._autoScroll = true;
      this._timeMaxWidth = 0;
      this.refresh();
    }
    static get NAME() {
      return NAME;
    }
    refresh() {
      const {
        transcriptPath
      } = this._config;
      const {
        media
      } = this._config;
      const {
        displayTime
      } = this._config;

      // Load and parse the transcript file
      fetch(transcriptPath).then(response => response.text()).then(data => {
        const cues = this.parseTranscript(data);

        // Create transcript lines and add them to the container
        for (const [index, cue] of cues.entries()) {
          const line = document.createElement('div');
          line.className = 'transcript-line';
          line.textContent = cue.text.trim();
          if (displayTime) {
            const transcriptLineContainer = document.createElement('div');
            transcriptLineContainer.className = 'transcript-line-container';
            transcriptLineContainer.setAttribute('aria-label', cue.text.trim());
            transcriptLineContainer.setAttribute('role', 'button');
            const timeContainer = document.createElement('span');
            timeContainer.className = 'time';
            timeContainer.textContent = `${cue.startTimeRaw}`;
            transcriptLineContainer.append(timeContainer);
            transcriptLineContainer.append(line);
            this._element.append(transcriptLineContainer);
            transcriptLineContainer.addEventListener('click', () => {
              media.currentTime = cue.startTime;
            });
            transcriptLineContainer.addEventListener('keypress', e => {
              if (e.key === 'Enter') {
                media.currentTime = cue.startTime;
              }
            });
            transcriptLineContainer.tabIndex = 0;
            if (timeContainer.getBoundingClientRect().width > this._timeMaxWidth) {
              this._timeMaxWidth = timeContainer.getBoundingClientRect().width;
            }
          } else {
            this._element.append(line);
            line.setAttribute('aria-label', cue.text.trim());
            line.setAttribute('role', 'button');
            line.addEventListener('click', () => {
              media.currentTime = cue.startTime;
            });
            line.addEventListener('keypress', e => {
              if (e.key === 'Enter') {
                media.currentTime = cue.startTime;
              }
            });
            line.tabIndex = 0;
          }
          this._element.addEventListener('scroll', () => {
            if (this._autoScroll) {
              this._autoScroll = false;
            }
          });

          // Update transcript highlighting based on media time
          this.addMediaEventListener(line, cues, cue, index);
        }
        if (this._timeMaxWidth) {
          this._element.style.setProperty('--cs-time-width', `${this._timeMaxWidth}px`);
        }
      }).catch(error => console.error('Error loading transcript file:', error)); // eslint-disable-line no-console
    }

    // Function to parse SRT or VTT text into cue objects
    parseTranscript(text) {
      const cues = [];
      const lines = text.split('\n');
      let cue = null;
      for (let line of lines) {
        line = line.trim();
        if (!line) {
          // Empty line
          if (cue) {
            cues.push(cue);
          }
          cue = null;
        }
        if (!cue && /^\d+$/.test(line)) {
          // This is a line number (SRT format)
          continue;
        } else if (line.includes('-->')) {
          // Parse cue timing (both SRT and VTT formats)
          const [startTime, endTime] = line.split(/ --> /);
          cue = new VTTCue(this.convertToSeconds(startTime), this.convertToSeconds(endTime), '');
          cue.startTimeRaw = this.minimalTime(startTime);
        } else if (cue) {
          // Add cue text (both SRT and VTT formats)
          cue.text += `${line} `;
        }
      }
      if (cue) {
        cues.push(cue);
      }
      return cues;
    }
    convertToSeconds(time) {
      const [hours, minutes, seconds] = time.split(/:|,/).map(Number.parseFloat);
      return (hours * 3600 + minutes * 60 + seconds).toFixed(2);
    }
    minimalTime(time) {
      const [hours, minutes, seconds] = time.split(/:|,/).map(Number.parseFloat);
      return `${hours === 0 ? '' : `${hours} : `} ${minutes} : ${Math.trunc(seconds)}`;
    }
    autoScroll(line) {
      if (this._autoScroll) {
        this.scrollToView(line);
      } else {
        const parentRect = this._element.getBoundingClientRect();
        const elementRect = line.getBoundingClientRect();
        if (elementRect.top >= parentRect.top && elementRect.bottom <= parentRect.bottom) {
          this._autoScroll = true;
        }
      }
    }
    scrollToView(element) {
      const parent = element.closest('.transcript-container');
      const elementOffset = element.offsetTop - parent.offsetTop;
      const elementHeight = element.offsetHeight;
      const parentHeight = parent.clientHeight;

      // Calculate the current scroll position of the parent
      const parentScrollTop = parent.scrollTop;

      // Check if the element is above the visible area
      if (elementOffset < parentScrollTop) {
        // Scroll up to make the element visible at the top
        parent.scrollTo({
          top: elementOffset,
          left: 0,
          behavior: 'smooth'
        });
      } else if (elementOffset + elementHeight > parentScrollTop + parentHeight) {
        // Scroll down to make the element visible at the bottom
        parent.scrollTo({
          top: elementOffset + elementHeight - parentHeight,
          left: 0,
          behavior: 'smooth'
        });
      }
      // If the element is already visible, no scrolling is needed
    }
    addMediaEventListener(line, cues, cue, index) {
      const {
        media
      } = this._config;
      const {
        displayTime
      } = this._config;
      media.addEventListener('timeupdate', () => {
        if (index === cues.length - 1 && media.currentTime >= cue.startTime) {
          if (displayTime) {
            line.closest('.transcript-line-container').classList.add('active');
          } else {
            line.classList.add('active');
          }
          this.autoScroll(line);
        } else if (media.currentTime >= cue.startTime && media.currentTime < cue.endTime) {
          if (displayTime) {
            line.closest('.transcript-line-container').classList.add('active');
          } else {
            line.classList.add('active');
          }
          this.autoScroll(line);
        } else {
          if (displayTime) {
            line.closest('.transcript-line-container').classList.remove('active');
          } else {
            line.classList.remove('active');
          }
          if (media.currentTime >= cue.startTime) {
            if (displayTime) {
              line.closest('.transcript-line-container').classList.add('played');
            } else {
              line.classList.add('played');
            }
          } else if (displayTime) {
            line.closest('.transcript-line-container').classList.remove('played');
          } else {
            line.classList.remove('played');
          }
        }
      });
    }
    redrawTime() {
      const timeList = Array.prototype.slice.call(this._element.querySelectorAll('.time'));
      if (timeList) {
        let maxWidth = 0;
        for (const t of timeList) {
          if (t.getBoundingClientRect().width > maxWidth) {
            maxWidth = t.getBoundingClientRect().width;
          }
        }
        if (maxWidth) {
          this._element.style.setProperty('--cs-time-width', `${maxWidth}px`);
        }
      }
    }
  }

  /**
   * --------------------------------------------------------------------------
   * CueSync index.umd.js
   * Licensed under MIT (https://github.com/cuesync/cuesync.github.io/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  const index_umd = {
    CueSync
  };

  return index_umd;

}));
//# sourceMappingURL=cuesync.js.map
