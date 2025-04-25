/*!
  * CueSync v2.0.0-alpha2 (https://cuesync.github.io/)
  * Copyright 2025 Neeraj Kumar Das (https://github.com/nkdas91)
  * Licensed under MIT (https://github.com/cuesync/cuesync/blob/master/LICENSE)  
  */
const styles = ":host,:host([theme=light]){color-scheme:light;--cs-border-color:#e9e9e9;--cs-toolbar-bg:#fff;--cs-toolbar-color:#000;--cs-transcript-bg:#fff;--cs-transcript-color:#000;--cs-cue-hover-bg:#f2f2f2;--cs-cue-hover-color:#000;--cs-cue-active-bg:#def1ff;--cs-cue-active-color:#044ba7;--cs-cue-highlight-bg:transparent;--cs-cue-highlight-color:#044ba7;--cs-timestamp-bg:#def1ff;--cs-timestamp-color:#044ba7;--cs-settings-shadow-opacity:.1;}:host([theme=dark]){color-scheme:dark;--cs-border-color:#495057;--cs-toolbar-bg:#16191d;--cs-toolbar-color:#ced4da;--cs-transcript-bg:#16191d;--cs-transcript-color:#ced4da;--cs-cue-hover-bg:#252525;--cs-cue-hover-color:#ced4da;--cs-cue-active-bg:#032b48;--cs-cue-active-color:#def1ff;--cs-cue-highlight-bg:transparent;--cs-cue-highlight-color:#def1ff;--cs-timestamp-bg:#032b48;--cs-timestamp-color:#def1ff;--cs-settings-shadow-opacity:1;}@media (prefers-color-scheme:dark){:host{color-scheme:dark;--cs-border-color:#495057;--cs-toolbar-bg:#16191d;--cs-toolbar-color:#ced4da;--cs-transcript-bg:#16191d;--cs-transcript-color:#ced4da;--cs-cue-hover-bg:#252525;--cs-cue-hover-color:#ced4da;--cs-cue-active-bg:#032b48;--cs-cue-active-color:#def1ff;--cs-cue-highlight-bg:transparent;--cs-cue-highlight-color:#def1ff;--cs-timestamp-bg:#032b48;--cs-timestamp-color:#def1ff;--cs-settings-shadow-opacity:1;}}:host{--cs-border-width:1px;--cs-border-style:solid;--cs-border-radius:10px;--cs-toolbar-px:15px;--cs-toolbar-py:8px;--cs-cue-px:15px;--cs-cue-py:5px;--cs-cue-paragraph-px:5px;--cs-cue-paragraph-py:5px;--cs-cue-text-px:5px;--cs-cue-text-py:5px;--cs-timestamp-px:5px;--cs-timestamp-py:5px;--cs-timestamp-border-radius:5px;--cs-timestamp-width:auto;box-sizing:border-box;display:block;width:auto;min-width:0;height:auto;min-height:0;padding:0;margin:0;background:transparent;border:0;}.cue-sync{display:flex;flex-direction:column;height:100%;overflow:hidden;font-family:system-ui,-apple-system,\"Segoe UI\",Roboto,\"Helvetica Neue\",\"Noto Sans\",\"Liberation Sans\",Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\",\"Noto Color Emoji\";border:var(--cs-border-width) var(--cs-border-style) var(--cs-border-color);border-radius:var(--cs-border-radius);}#toolbar{position:relative;display:flex;flex-shrink:0;align-items:center;justify-content:space-between;padding:var(--cs-toolbar-py) var(--cs-toolbar-px);color:var(--cs-toolbar-color);background-color:var(--cs-toolbar-bg);}#toolbar h2{margin:0;font-size:1.2rem;font-weight:700;}#settings-btn{padding:8px;font-size:1.2rem;cursor:pointer;background:none;border:none;border-radius:50%;}#settings-btn:hover{color:var(--cs-timestamp-color);background:var(--cs-timestamp-bg);}#settings-btn svg{display:block;width:1em;height:1em;vertical-align:-0.125em;}#settings-panel{position:absolute;top:100%;right:0;display:flex;flex-direction:column;gap:10px;padding:20px 10px;color:var(--cs-toolbar-color);background-color:var(--cs-toolbar-bg);border-radius:var(--cs-border-radius);box-shadow:0 4px 32px 0 rgba(0,0,0,var(--cs-settings-shadow-opacity));}#settings-panel[hidden]{display:none;}#transcript{flex-grow:1;overflow-y:auto;color:var(--cs-transcript-color);background-color:var(--cs-transcript-bg);}.cue-text{display:inline-flex;flex-direction:column;padding:var(--cs-cue-text-py) var(--cs-cue-text-px);}.cue{display:flex;gap:5px;align-items:center;padding:var(--cs-cue-py) var(--cs-cue-px);cursor:pointer;border-radius:var(--cs-tanscript-line-border-radius);}.cue.paragraph{display:inline-flex;padding:var(--cs-cue-paragraph-py) var(--cs-cue-paragraph-px);}.timestamp{display:inline-block;flex-shrink:0;width:var(--cs-timestamp-width);padding:var(--cs-timestamp-py) var(--cs-timestamp-px);color:var(--cs-timestamp-color);text-align:center;white-space:nowrap;background-color:var(--cs-timestamp-bg);border-radius:var(--cs-timestamp-border-radius);}#transcript.active-added .cue{color:var(--cs-cue-highlight-color);background-color:var(--cs-cue-highlight-bg);}#transcript .cue.active{color:var(--cs-cue-active-color);background-color:var(--cs-cue-active-bg);}#transcript .cue.active~.cue{color:var(--cs-transcript-color);background-color:var(--cs-transcript-bg);}#transcript .cue:not(.active):hover{color:var(--cs-cue-hover-color);background-color:var(--cs-cue-hover-bg);}#language-options,#layout-options,#theme-options{display:flex;gap:8px;align-items:center;}";

/**
 * --------------------------------------------------------------------------
 * CueSync cuesync.js
 * Licensed under MIT (https://github.com/cuesync/cuesync.github.io/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
class CueSync extends HTMLElement {
  constructor() {
    super();
    this._toggleLayout = () => {
      const layout = this.shadowRoot.querySelector('input[name="layout"]:checked').value;
      const cueElements = this.shadowRoot.querySelectorAll('.cue');
      for (const cueElement of cueElements) {
        cueElement.classList.toggle('paragraph', layout === 'paragraph');
      }
      this._config.layout = layout;
      this._dispatchCustomEvent('layout', layout);
    };
    this._setTheme = () => {
      const theme = this.shadowRoot.querySelector('input[name="theme"]:checked').value;
      this.setAttribute('theme', theme);
      this._dispatchCustomEvent('theme', theme);
    };
    this._toggleTimestamps = () => {
      const timestampCheckbox = this.shadowRoot.getElementById('timestamp-toggle');
      const timestamps = this.shadowRoot.querySelectorAll('.timestamp');
      for (const timestamp of timestamps) {
        timestamp.style.display = timestampCheckbox.checked ? 'inline-block' : 'none';
      }
      this._config.showTimestamp = timestampCheckbox.checked;
      this._dispatchCustomEvent('show-timestamp', timestampCheckbox.checked);
    };
    this._toggleAutoScroll = () => {
      const autoScrollCheckbox = this.shadowRoot.getElementById('auto-scroll-toggle');
      this._config.autoScroll = autoScrollCheckbox.checked;
      this._dispatchCustomEvent('auto-scroll', autoScrollCheckbox.checked);
    };
    this._handleCheckboxChange = e => {
      const languageSelectDiv = this.shadowRoot.getElementById('language-options');
      const checkboxes = languageSelectDiv.querySelectorAll('input[type="checkbox"]');
      const checkbox = e.target;
      const selectedLanguages = Array.from(checkboxes).filter(input => input.checked).map(input => input.value);

      // If this is the last checkbox being unchecked, prevent it
      if (selectedLanguages.length === 0) {
        checkbox.checked = true; // Re-check the last checkbox
        return;
      }
      this._updateLayout(selectedLanguages);
    };
    this.attachShadow({
      mode: 'open'
    });
    this._timestampMaxWidth = 0;
    this._pendingRefresh = false;
    this._config = {};
    this._languages = [];
  }
  static get observedAttributes() {
    return ['transcript-path', 'media', 'layout', 'show-timestamp', 'auto-scroll', 'allow-settings', 'theme'];
  }
  static get styles() {
    return styles;
  }
  _getConfig() {
    var _this$getAttribute;
    return {
      transcriptPath: (_this$getAttribute = this.getAttribute('transcript-path')) == null ? void 0 : _this$getAttribute.split(','),
      media: document.querySelector(this.getAttribute('media')),
      layout: this.getAttribute('layout') === 'paragraph' ? 'paragraph' : 'stacked',
      // Default to 'stacked'
      showTimestamp: this.getAttribute('show-timestamp') !== 'false',
      // Default to true
      autoScroll: this.getAttribute('auto-scroll') !== 'false',
      // Default to true
      allowSettings: this.getAttribute('allow-settings') !== 'false',
      // Default to true
      theme: this.getAttribute('theme') === 'light' || this.getAttribute('theme') === 'dark' ? this.getAttribute('theme') : 'auto' // Default to 'auto'
    };
  }
  connectedCallback() {
    this._config = this._getConfig();
    this._renderComponent();
    this._requestRefresh();
  }
  attributeChangedCallback(name, oldValue, newValue) {
    this._updateConfig(name, newValue);

    // Dispatch a custom event based on the attribute that was changed
    this._dispatchCustomEvent(name, newValue);

    // Handle lightweight UI updates without a full refresh
    if (['theme', 'layout', 'show-timestamp', 'auto-scroll'].includes(name)) {
      this._applyAttributeChange(name);
    } else {
      this._renderComponent();
      this._requestRefresh();
    }
  }
  _updateConfig(name, value) {
    const updateMap = {
      'transcript-path': () => {
        this._config.transcriptPath = value.split(',');
      },
      media: () => {
        this._config.media = document.querySelector(value);
      },
      layout: () => {
        this._config.layout = value === 'paragraph' ? 'paragraph' : 'stacked';
      },
      'show-timestamp': () => {
        this._config.showTimestamp = value !== 'false';
      },
      'auto-scroll': () => {
        this._config.autoScroll = value !== 'false';
      },
      'allow-settings': () => {
        this._config.allowSettings = value !== 'false';
      },
      theme: () => {
        this._config.theme = value === 'light' || value === 'dark' ? value : 'auto';
      }
    };
    if (updateMap[name]) {
      updateMap[name]();
    }
  }
  _dispatchCustomEvent(name, newValue) {
    const eventName = `${name}-changed`; // e.g., 'show-timestamp-changed'
    const eventDetail = {
      newValue
    }; // Include the new value in the event detail

    const event = new CustomEvent(eventName, {
      detail: eventDetail,
      bubbles: true,
      // Allow the event to bubble up the DOM
      composed: true // Allow the event to pass through shadow DOM boundaries
    });
    this.dispatchEvent(event);
  }
  _applyAttributeChange(name) {
    switch (name) {
      case 'theme':
        {
          this._changeTheme();
          break;
        }
      case 'layout':
        {
          this._changeLayout();
          break;
        }
      case 'show-timestamp':
        {
          this._changeTimestamp();
          break;
        }
      case 'auto-scroll':
        {
          this._changeAutoScroll();
          break;
        }
      default:
        {
          console.warn(`Unhandled attribute change: ${name}`); // eslint-disable-line no-console
        }
    }
  }
  _changeTheme() {
    const themeOptions = this.shadowRoot.querySelectorAll('input[type="radio"][name="theme"]');
    for (const option of themeOptions) {
      option.checked = option.value === this._config.theme || this._config.theme === undefined && option.value === 'auto';
    }
  }
  _changeLayout() {
    const layoutOptions = this.shadowRoot.querySelectorAll('input[type="radio"][name="layout"]');
    for (const option of layoutOptions) {
      option.checked = option.value === this._config.layout;
    }
    const cueElements = this.shadowRoot.querySelectorAll('.cue');
    for (const cueElement of cueElements) {
      cueElement.classList.toggle('paragraph', this._config.layout === 'paragraph');
    }
    this.redrawTime();
  }
  _changeTimestamp() {
    const timestampCheckbox = this.shadowRoot.getElementById('timestamp-toggle');
    if (timestampCheckbox) {
      timestampCheckbox.checked = this._config.showTimestamp;
    }
    const timestamps = this.shadowRoot.querySelectorAll('.timestamp');
    for (const timestamp of timestamps) {
      timestamp.style.display = this._config.showTimestamp ? 'inline-block' : 'none';
    }
    this.redrawTime();
  }
  _changeAutoScroll() {
    const autoScrollCheckbox = this.shadowRoot.getElementById('auto-scroll-toggle');
    if (autoScrollCheckbox) {
      autoScrollCheckbox.checked = this._config.autoScroll;
    }
  }
  _renderComponent() {
    const {
      allowSettings
    } = this._config;
    const settingsHTML = allowSettings ? `<button id="settings-btn" aria-label="Settings Button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
          </svg>
        </button>
        <div id="settings-panel" hidden>
            <div id="layout-options">
                Layout:
                <label><input type="radio" name="layout" value="stacked">Stacked</label>
                <label><input type="radio" name="layout" value="paragraph">Paragraph</label>
            </div>
            <label><input type="checkbox" id="timestamp-toggle">Show Timestamps</label>
            <label><input type="checkbox" id="auto-scroll-toggle">Auto Scroll</label>
            <div id="language-options">
            </div>
            <div id="theme-options">
                Theme:
                <label><input type="radio" name="theme" value="auto">Auto</label>
                <label><input type="radio" name="theme" value="light">Light</label>
                <label><input type="radio" name="theme" value="dark">Dark</label>
            </div>
        </div>` : '';
    this.shadowRoot.innerHTML = `
      <style>${CueSync.styles}</style>
      <div class="cue-sync">
        <div id="toolbar">
          <h2>Transcript</h2>
          ${settingsHTML}
        </div>
        <div id="transcript"></div>
      </div>
    `;
  }
  _requestRefresh() {
    if (!this._pendingRefresh) {
      this._pendingRefresh = true;
      requestAnimationFrame(() => {
        this._refresh();
        this._pendingRefresh = false;
      });
    }
  }
  async _refresh() {
    try {
      this._timestampMaxWidth = 0;
      this._languages = [];
      const transcripts = await this._loadTranscripts();
      const cuesCollection = this._parseTranscripts(transcripts);
      this._applyConfiguration(cuesCollection);
      const handleDocumentClicks = e => {
        const settingsMenu = this.shadowRoot.querySelector('#settings-panel');
        const settingsToggle = this.shadowRoot.querySelector('#settings-btn');
        if (settingsMenu && !settingsMenu.hidden) {
          // Check if the click is outside the settings menu and toggle
          const path = e.composedPath(); // Get the full event path
          const clickedInsideComponent = path.includes(this);
          const clickedInsideMenu = path.includes(settingsMenu);
          const clickedToggle = path.includes(settingsToggle);
          if (!clickedInsideComponent || !clickedInsideMenu && !clickedToggle) {
            settingsMenu.hidden = true;
          }
        }
      };
      document.removeEventListener('click', handleDocumentClicks);
      document.addEventListener('click', handleDocumentClicks);
    } catch (error) {
      console.error(error.message); // eslint-disable-line no-console
      throw error;
    }
  }
  async _loadTranscripts() {
    const transcriptFilePaths = this._getTranscriptFilePaths();
    if (!transcriptFilePaths.length) {
      throw new Error('No transcript file paths found');
    }
    return Promise.all(transcriptFilePaths.map(t => this._fetchTranscript(t)));
  }
  _parseTranscripts(transcripts) {
    if (!transcripts.length) {
      throw new Error('No transcript content retrieved');
    }
    const cuesCollection = transcripts.map(t => this._parseTranscript(t));
    if (!cuesCollection.length) {
      throw new Error('No cues parsed from transcripts');
    }
    return cuesCollection;
  }
  _applyConfiguration(cuesCollection) {
    const {
      allowSettings,
      media
    } = this._config;
    if (allowSettings) {
      this._setupSettings();
    }
    this._createCueElements(cuesCollection);
    this._addMediaEventListener(media, cuesCollection);
    this._setTimeMaxWidth();
  }
  _setupSettings() {
    this._initializeLayoutOptions();
    this._initializeTimestampToggle();
    this._initializeAutoScrollToggle();
    this._initializeThemes();
    if (this._languages.length > 1) {
      this._createLanguageCheckboxes(this._languages);
    }
    const toggleSettingsMenu = e => {
      const settingsMenu = this.shadowRoot.querySelector('#settings-panel');
      settingsMenu.hidden = !settingsMenu.hidden;
      e.stopPropagation();
    };
    const settingsToggle = this.shadowRoot.querySelector('#settings-btn');
    settingsToggle.removeEventListener('click', toggleSettingsMenu);
    settingsToggle.addEventListener('click', toggleSettingsMenu);
  }
  _setTimeMaxWidth() {
    if (this._timestampMaxWidth) {
      this.shadowRoot.querySelector('#transcript').style.setProperty('--cs-timestamp-width', `${this._timestampMaxWidth}px`);
    }
  }
  _getTranscriptFilePaths() {
    const {
      transcriptPath
    } = this._config;
    let transcriptFilePaths = [];
    if (typeof transcriptPath === 'string') {
      transcriptFilePaths = transcriptPath.split(',');
    } else if (Array.isArray(transcriptPath)) {
      transcriptFilePaths = transcriptPath;
    } else {
      throw new TypeError('The transcript path should be provided as a string, or as an array if you have multiple transcript files.');
    }
    return transcriptFilePaths;
  }
  async _fetchTranscript(transcriptPath) {
    try {
      const response = await fetch(transcriptPath);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return await response.text();
    } catch (error) {
      throw new Error(`Failed to fetch transcripts: ${error.message}`);
    }
  }
  _parseTranscript(transcriptText) {
    const cues = [];
    const lines = transcriptText.split('\n');
    let cue = null;
    cues.language = null;
    for (let line of lines) {
      line = line.trim();
      if (!line) {
        if (cue) {
          cues.push(cue);
          cue = null;
        }
        continue;
      }
      if (line.toLowerCase().startsWith('language:')) {
        cues.language = line.split(':')[1].trim();
        this._languages.push(cues.language);
        continue;
      }
      if (!cue && /^\d+$/.test(line)) {
        continue;
      } else if (line.includes('-->')) {
        const [startTime, endTime] = line.split(/ --> /);
        cue = new VTTCue(this._convertToSeconds(startTime), this._convertToSeconds(endTime), '');
        cue.startTimeRaw = this._minimalTime(startTime);
      } else if (cue) {
        cue.text += `${line} `;
      }
    }
    if (cue) {
      cues.push(cue);
    }
    return cues;
  }
  _convertToSeconds(time) {
    const [hours, minutes, seconds] = time.split(/:|,/).map(Number.parseFloat);
    return (hours * 3600 + minutes * 60 + seconds).toFixed(2);
  }
  _minimalTime(time) {
    const [hours, minutes, seconds] = time.split(/:|,/).map(Number.parseFloat);
    return `${hours === 0 ? '' : `${hours} : `} ${minutes} : ${Math.trunc(seconds)}`;
  }
  _createCueElements(cuesCollection) {
    const {
      media,
      layout,
      showTimestamp
    } = this._config;
    if (!Array.isArray(cuesCollection) || cuesCollection.length === 0) {
      throw new Error('Invalid cuesCollection provided');
    }
    const cues = cuesCollection[0];
    const transcriptElement = this.shadowRoot.querySelector('#transcript');
    transcriptElement.innerHTML = '';
    for (const [index, cue] of cues.entries()) {
      var _fragment$lastChild;
      const cueText = document.createElement('div');
      cueText.className = 'cue-text';
      const fragment = document.createDocumentFragment();
      for (const cueArray of cuesCollection) {
        if (cueArray[index]) {
          const span = document.createElement('span');
          span.className = `cue-${cueArray.language || 'default'}`;
          span.textContent = cueArray[index].text.trim();
          fragment.append(span);
        }
      }
      if (((_fragment$lastChild = fragment.lastChild) == null ? void 0 : _fragment$lastChild.nodeName) === 'BR') {
        fragment.lastChild.remove();
      }
      cueText.append(fragment);
      const cueElement = document.createElement('div');
      cueElement.className = `cue${layout === 'paragraph' ? ' paragraph' : ''}`;
      cueElement.setAttribute('aria-label', cue.text.trim());
      cueElement.setAttribute('role', 'button');
      cueElement.tabIndex = 0;
      const timestamp = document.createElement('span');
      timestamp.className = 'timestamp';
      timestamp.textContent = cue.startTimeRaw;
      timestamp.style.display = showTimestamp ? 'inline-block' : 'none';
      cueElement.append(timestamp, cueText);
      transcriptElement.append(cueElement);
      this._addTranscriptEventListeners(cueElement, media, cue.startTime);
      const styles = window.getComputedStyle(timestamp);
      const padding = Number.parseFloat(styles.paddingLeft) + Number.parseFloat(styles.paddingRight);
      const border = Number.parseFloat(styles.borderLeftWidth) + Number.parseFloat(styles.borderRightWidth);
      const timeWidth = timestamp.getBoundingClientRect().width - padding - border;
      if (timeWidth > this._timestampMaxWidth) {
        this._timestampMaxWidth = timeWidth;
      }
    }
  }
  _initializeLayoutOptions() {
    const layoutOptions = this.shadowRoot.querySelectorAll('input[type="radio"][name="layout"]');
    for (const option of layoutOptions) {
      option.checked = option.value === this._config.layout;
      option.removeEventListener('change', this._toggleLayout);
      option.addEventListener('change', this._toggleLayout);
    }
  }
  _initializeThemes() {
    const themeOptions = this.shadowRoot.querySelectorAll('input[type="radio"][name="theme"]');
    for (const option of themeOptions) {
      option.checked = option.value === this._config.theme || this._config.theme === undefined && option.value === 'auto';
      option.removeEventListener('change', this._setTheme);
      option.addEventListener('change', this._setTheme);
    }
  }
  _initializeTimestampToggle() {
    const timestampCheckbox = this.shadowRoot.getElementById('timestamp-toggle');
    timestampCheckbox.checked = this._config.showTimestamp;
    timestampCheckbox.removeEventListener('change', this._toggleTimestamps);
    timestampCheckbox.addEventListener('change', this._toggleTimestamps);
  }
  _initializeAutoScrollToggle() {
    const autoScrollCheckbox = this.shadowRoot.getElementById('auto-scroll-toggle');
    autoScrollCheckbox.checked = this._config.autoScroll;
    autoScrollCheckbox.removeEventListener('change', this._toggleAutoScroll);
    autoScrollCheckbox.addEventListener('change', this._toggleAutoScroll);
  }
  _createLanguageCheckboxes(languages) {
    const languageSelectDiv = this.shadowRoot.getElementById('language-options');
    languageSelectDiv.innerHTML = '';
    const label = document.createElement('label');
    label.textContent = 'Languages:';
    languageSelectDiv.append(label);
    for (const lang of languages) {
      const checkboxLabel = document.createElement('label');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = lang;
      checkbox.checked = true;
      checkboxLabel.append(checkbox);
      checkboxLabel.append(document.createTextNode(lang));
      languageSelectDiv.append(checkboxLabel);
    }
    const checkboxes = languageSelectDiv.querySelectorAll('input[type="checkbox"]');
    for (const checkbox of checkboxes) {
      checkbox.removeEventListener('change', this._handleCheckboxChange);
      checkbox.addEventListener('change', this._handleCheckboxChange);
    }
  }
  _updateLayout(selectedLanguages) {
    for (const span of this.shadowRoot.querySelectorAll('.cue-text span')) {
      const languageClass = span.classList[0]; // e.g., 'cue-en'
      const language = languageClass.slice(4); // extract language code e.g., 'en' from 'cue-en'

      span.style.display = selectedLanguages.includes(language) ? '' : 'none';
    }
  }
  _scroll(cueElement) {
    const transcriptElement = this.shadowRoot.querySelector('#transcript');
    const {
      top: transcriptElementTop
    } = transcriptElement.getBoundingClientRect();
    const {
      top: cueTop,
      height: cueHeight
    } = cueElement.getBoundingClientRect();

    // Calculate the offset for the second visible Cue
    const secondLineOffset = cueHeight;

    // Calculate the ideal top position for the active Cue to "lock" it in the second line
    const lockPosition = transcriptElementTop + secondLineOffset;
    if (cueTop !== lockPosition) {
      this._scrollToLock(cueElement, lockPosition, transcriptElement);
    }
  }
  _scrollToLock(element, lockPosition, parent) {
    const {
      top: elementTop
    } = element.getBoundingClientRect();

    // Calculate how much to scroll to keep the element at the locked position
    const offset = elementTop - lockPosition;

    // Scroll the parent container by the calculated offset
    if (offset !== 0) {
      parent.scrollBy({
        top: offset,
        left: 0,
        behavior: 'auto'
      });
    }
  }
  _addTranscriptEventListeners(element, media, time) {
    const setMediaTime = () => {
      media.currentTime = time;
    };
    const handleEvent = e => {
      if (e.type === 'click' || e.type === 'keypress' && e.key === 'Enter') {
        setMediaTime();
      }
    };
    element.removeEventListener('click', handleEvent);
    element.removeEventListener('keypress', handleEvent);
    element.addEventListener('click', handleEvent);
    element.addEventListener('keypress', handleEvent);
  }
  _addMediaEventListener(media, cuesCollection) {
    if (!media || !cuesCollection.length) {
      return;
    }
    const cues = cuesCollection[0];
    const cueTextArray = Array.from(this.shadowRoot.querySelectorAll('.cue-text'));
    const transcriptElement = this.shadowRoot.querySelector('#transcript');
    let activeCueIndex = -1; // Pointer to track the active cue

    const updateActiveLine = (index, isActive) => {
      const cueText = cueTextArray[index];
      const cueElement = cueText.closest('.cue');
      if (cueElement) {
        cueElement.classList.toggle('active', isActive);
      }
    };
    if (this._handleTimeUpdate) {
      media.removeEventListener('timeupdate', this._handleTimeUpdate);
    }
    this._handleTimeUpdate = () => {
      const {
        currentTime
      } = media;

      // Identify the new active cue index
      let newActiveIndex = activeCueIndex;
      for (let i = 0; i < cues.length; i++) {
        const {
          startTime,
          endTime
        } = cues[i];
        if (currentTime >= startTime && (i === cues.length - 1 || currentTime < endTime)) {
          newActiveIndex = i;
          break;
        }
      }

      // Update only if there's a change in the active cue
      if (newActiveIndex !== activeCueIndex) {
        if (activeCueIndex >= 0) {
          updateActiveLine(activeCueIndex, false);
        }
        activeCueIndex = newActiveIndex;
        if (activeCueIndex >= 0) {
          updateActiveLine(activeCueIndex, true);

          // Add the 'active-added' class once the media starts
          if (!transcriptElement.classList.contains('active-added')) {
            transcriptElement.classList.add('active-added');
          }
          if (this._config.autoScroll) {
            this._scroll(cueTextArray[activeCueIndex]);
          }
        }
      }
    };
    media.addEventListener('timeupdate', this._handleTimeUpdate);
  }
  redrawTime() {
    const timeElements = this.shadowRoot.querySelectorAll('.timestamp');
    if (timeElements.length === 0) {
      return;
    }
    let maxWidth = 0;
    for (const t of timeElements) {
      const {
        width
      } = t.getBoundingClientRect();
      if (width > maxWidth) {
        maxWidth = width;
      }
    }
    this.shadowRoot.querySelector('#transcript').style.setProperty('--cs-timestamp-width', `${maxWidth}px`);
  }
}
customElements.define('cue-sync', CueSync);

export { CueSync };
//# sourceMappingURL=cuesync.esm.js.map
