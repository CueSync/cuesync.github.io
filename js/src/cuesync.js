/**
 * --------------------------------------------------------------------------
 * CueSync cuesync.js
 * Licensed under MIT (https://github.com/cuesync/cuesync.github.io/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

export default class CueSync extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })

    this._timeMaxWidth = 0
    this._pendingRefresh = false
    this._config = {}
    this._languages = []
  }

  static get observedAttributes() {
    return ['transcript-path', 'media', 'layout', 'show-timestamp', 'auto-scroll', 'allow-settings', 'theme']
  }

  static get styles() {
    return `
      :host,
      :host([theme=light]) {
        color-scheme: light;
        --cs-border-color: #e9e9e9;
        --cs-toolbar-bg: #fff;
        --cs-toolbar-color: #000;
        --cs-container-bg: #fff;
        --cs-container-color: #000;
        --cs-transcript-hover-bg: #f2f2f2;
        --cs-transcript-hover-color: #000;
        --cs-transcript-active-bg: #def1ff;
        --cs-transcript-active-color: #044ba7;
        --cs-transcript-highlight-bg: transparent;
        --cs-transcript-highlight-color: #044ba7;
        --cs-timestamp-bg: #def1ff;
        --cs-timestamp-color: #044ba7;
      }
      
      /* Dark mode */
      :host([theme=dark]) {
        color-scheme: dark;
        --cs-border-color: #495057;
        --cs-toolbar-bg: #16191d;
        --cs-toolbar-color: #ced4da;
        --cs-container-bg: #16191d;
        --cs-container-color: #ced4da;
        --cs-transcript-hover-bg: #252525;
        --cs-transcript-hover-color: #ced4da;
        --cs-transcript-active-bg: #032b48;
        --cs-transcript-active-color: #def1ff;
        --cs-transcript-highlight-bg: transparent;
        --cs-transcript-highlight-color: #def1ff;
        --cs-timestamp-bg: #032b48;
        --cs-timestamp-color: #def1ff;
      }
      
      /* Media query for users without theme attribute but with OS-level dark mode */
      @media (prefers-color-scheme: dark) {
        :host {
          color-scheme: dark;
          --cs-border-color: #495057;
          --cs-toolbar-bg: #16191d;
          --cs-toolbar-color: #ced4da;
          --cs-container-bg: #16191d;
          --cs-container-color: #ced4da;
          --cs-transcript-hover-bg: #252525;
          --cs-transcript-hover-color: #ced4da;
          --cs-transcript-active-bg: #032b48;
          --cs-transcript-active-color: #def1ff;
          --cs-transcript-highlight-bg: transparent;
          --cs-transcript-highlight-color: #def1ff;
          --cs-timestamp-bg: #032b48;
          --cs-timestamp-color: #def1ff;
        }
      }
      :host {
        --cs-border-width: 1px;
        --cs-border-style: solid;
        --cs-border-radius: 10px;
        --cs-toolbar-padding-x: 15px;
        --cs-toolbar-padding-y: 15px;
        --cs-container-padding-x: 15px;
        --cs-container-padding-y: 5px;
        --cs-transcript-padding-x: 5px;
        --cs-transcript-padding-y: 5px;
        --cs-transcript-border-radius: var(--cs-border-radius);
        --cs-timestamp-padding-x: 5px;
        --cs-timestamp-padding-y: 5px;
        --cs-timestamp-border-radius: 5px;
        --cs-timestamp-width: auto;
        box-sizing: border-box;
        display: block;
        width: auto;
        min-width: 0;
        height: auto;
        min-height: 0;
        padding: 0;
        margin: 0;
        background: transparent;
        border: 0;
      }
      
      .wrapper {
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow: hidden;
        font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
        border: var(--cs-border-width) var(--cs-border-style) var(--cs-border-color);
        border-radius: var(--cs-border-radius);
      }
      
      #toolbar {
        position: relative;
        display: flex;
        flex-shrink: 0;
        align-items: center;
        justify-content: space-between;
        padding: var(--cs-toolbar-padding-y) var(--cs-toolbar-padding-x);
        color: var(--cs-toolbar-color);
        background-color: var(--cs-toolbar-bg);
      }
      
      #toolbar h2 {
        margin: 0;
        font-size: 1.2rem;
        font-weight: 700;
      }
      
      #settings-toggle {
        padding: 0;
        font-size: 1.2rem;
        cursor: pointer;
        background: none;
        border: none;
      }
      
      #settings-toggle svg {
        display: block;
        width: 1em;
        height: 1em;
        vertical-align: -0.125em;
      }
      
      #settings-menu {
        position: absolute;
        top: 100%;
        right: 0;
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 20px 10px;
        color: var(--cs-toolbar-color);
        background-color: var(--cs-toolbar-bg);
        border-radius: var(--cs-border-radius);
        box-shadow: 0 4px 32px 0 rgba(0, 0, 0, 0.1);
      }
      
      #settings-menu[hidden] {
        display: none;
      }
      
      #transcript-container {
        flex-grow: 1;
        overflow-y: auto;
        color: var(--cs-container-color);
        background-color: var(--cs-container-bg);
      }
      
      .transcript-line {
        display: inline-flex;
        flex-direction: column;
        padding: var(--cs-transcript-padding-y) var(--cs-transcript-padding-x);
      }
      
      .transcript-line-container {
        display: flex;
        gap: 5px;
        align-items: center;
        padding: var(--cs-container-padding-y) var(--cs-container-padding-x);
        cursor: pointer;
        border-radius: var(--cs-tanscript-line-border-radius);
      }
      
      .transcript-line-container.paragraph {
        display: inline-flex;
      }
      
      .time {
        display: inline-block;
        flex-shrink: 0;
        width: var(--cs-timestamp-width);
        padding: var(--cs-timestamp-padding-y) var(--cs-timestamp-padding-x);
        color: var(--cs-timestamp-color);
        text-align: center;
        white-space: nowrap;
        background-color: var(--cs-timestamp-bg);
        border-radius: var(--cs-timestamp-border-radius);
      }
      
      #transcript-container.active-added .transcript-line-container {
        color: var(--cs-transcript-highlight-color);
        background-color: var(--cs-transcript-highlight-bg);
      }
      
      #transcript-container .transcript-line-container.active {
        color: var(--cs-transcript-active-color);
        background-color: var(--cs-transcript-active-bg);
      }
      
      #transcript-container .transcript-line-container.active ~ .transcript-line-container {
        color: var(--cs-container-color);
        background-color: var(--cs-container-bg);
      }
      
      #transcript-container .transcript-line-container:not(.active):hover {
        color: var(--cs-transcript-hover-color);
        background-color: var(--cs-transcript-hover-bg);
      }
      
      #language-options,
      #layout-options,
      #theme-options {
        display: flex;
        gap: 10px;
        align-items: center;
      }
    `
  }

  _getConfig() {
    return {
      transcriptPath: this.getAttribute('transcript-path')?.split(','),
      media: document.querySelector(this.getAttribute('media')),
      layout: this.getAttribute('layout') === 'paragraph' ? 'paragraph' : 'stacked', // Default to 'stacked'
      showTimestamp: this.getAttribute('show-timestamp') !== 'false', // Default to true
      autoScroll: this.getAttribute('auto-scroll') !== 'false', // Default to true
      allowSettings: this.getAttribute('allow-settings') !== 'false', // Default to true
      theme: this.getAttribute('theme') === 'light' || this.getAttribute('theme') === 'dark' ? this.getAttribute('theme') : 'auto' // Default to 'auto'
    }
  }

  connectedCallback() {
    this._config = this._getConfig()
    this._renderComponent()
    this._requestRefresh()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this._updateConfig(name, newValue)

    // Dispatch a custom event based on the attribute that was changed
    this._dispatchCustomEvent(name, newValue)

    this._requestRefresh()
  }

  _updateConfig(name, value) {
    const updateMap = {
      'transcript-path': () => {
        this._config.transcriptPath = value.split(',')
      },
      media: () => {
        this._config.media = document.querySelector(value)
      },
      layout: () => {
        this._config.layout = value === 'paragraph' ? 'paragraph' : 'stacked'
      },
      'show-timestamp': () => {
        this._config.showTimestamp = value !== 'false'
      },
      'auto-scroll': () => {
        this._config.autoScroll = value !== 'false'
      },
      'allow-settings': () => {
        this._config.allowSettings = value !== 'false'
      },
      theme: () => {
        this._config.theme = value === 'light' || value === 'dark' ? value : 'auto'
      }
    }

    if (updateMap[name]) {
      updateMap[name]()
    }
  }

  _dispatchCustomEvent(name, newValue) {
    const eventName = `${name}-changed` // e.g., 'show-timestamp-changed'
    const eventDetail = { newValue } // Include the new value in the event detail

    const event = new CustomEvent(eventName, {
      detail: eventDetail,
      bubbles: true, // Allow the event to bubble up the DOM
      composed: true // Allow the event to pass through shadow DOM boundaries
    })

    this.dispatchEvent(event)
  }

  _renderComponent() {
    const { allowSettings } = this._config
    const settingsHTML = allowSettings ?
      `<button id="settings-toggle" aria-label="Settings">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
          </svg>
        </button>
        <div id="settings-menu" hidden>
            <div id="layout-options">
                <label><input type="radio" name="layout" value="stacked">Stacked</label>
                <label><input type="radio" name="layout" value="paragraph">Paragraph</label>
            </div>
            <label><input type="checkbox" id="timestamp-toggle">Show Timestamps</label>
            <label><input type="checkbox" id="auto-scroll-toggle">Auto Scroll</label>
            <div id="language-options">
            </div>
            <div id="theme-options">
                <label><input type="radio" name="theme" value="auto">Auto</label>
                <label><input type="radio" name="theme" value="light">Light</label>
                <label><input type="radio" name="theme" value="dark">Dark</label>
            </div>
        </div>` :
      ''

    this.shadowRoot.innerHTML = `
      <style>${CueSync.styles}</style>
      <div class="wrapper">
        <div id="toolbar">
          <h2>Transcript</h2>
          ${settingsHTML}
        </div>
        <div id="transcript-container"></div>
      </div>
    `
  }

  _requestRefresh() {
    if (!this._pendingRefresh) {
      this._pendingRefresh = true
      requestAnimationFrame(() => {
        this._refresh()
        this._pendingRefresh = false
      })
    }
  }

  async _refresh() {
    try {
      this._timeMaxWidth = 0
      this._languages = []

      const transcripts = await this._loadTranscripts()
      const cuesCollection = this._parseTranscripts(transcripts)

      this._applyConfiguration(cuesCollection)
    } catch (error) {
      console.error(error.message) // eslint-disable-line no-console
      throw error
    }
  }

  async _loadTranscripts() {
    const transcriptFilePaths = this._getTranscriptFilePaths()
    if (!transcriptFilePaths.length) {
      throw new Error('No transcript file paths found')
    }

    return Promise.all(transcriptFilePaths.map(t => this._fetchTranscript(t)))
  }

  _parseTranscripts(transcripts) {
    if (!transcripts.length) {
      throw new Error('No transcript content retrieved')
    }

    const cuesCollection = transcripts.map(t => this._parseTranscript(t))
    if (!cuesCollection.length) {
      throw new Error('No cues parsed from transcripts')
    }

    return cuesCollection
  }

  _applyConfiguration(cuesCollection) {
    const { allowSettings, media } = this._config

    if (allowSettings) {
      this._setupSettings()
    }

    this._createTranscriptLines(cuesCollection)
    this._addMediaEventListener(media, cuesCollection)

    this._setTimeMaxWidth()
  }

  _setupSettings() {
    this._initializeLayoutOptions()
    this._initializeTimestampToggle()
    this._initializeAutoScrollToggle()
    this._initializeThemes()

    if (this._languages.length > 1) {
      this._createLanguageCheckboxes(this._languages)
    }

    const settingsToggle = this.shadowRoot.querySelector('#settings-toggle')
    const settingsMenu = this.shadowRoot.querySelector('#settings-menu')

    settingsToggle.addEventListener('click', () => {
      settingsMenu.hidden = !settingsMenu.hidden
    })
  }

  _setTimeMaxWidth() {
    if (this._timeMaxWidth) {
      this.shadowRoot.querySelector('#transcript-container').style.setProperty('--cs-timestamp-width', `${this._timeMaxWidth}px`)
    }
  }

  _getTranscriptFilePaths() {
    const { transcriptPath } = this._config
    let transcriptFilePaths = []

    if (typeof transcriptPath === 'string') {
      transcriptFilePaths = transcriptPath.split(',')
    } else if (Array.isArray(transcriptPath)) {
      transcriptFilePaths = transcriptPath
    } else {
      throw new TypeError('The transcript path should be provided as a string, or as an array if you have multiple transcript files.')
    }

    return transcriptFilePaths
  }

  async _fetchTranscript(transcriptPath) {
    try {
      const response = await fetch(transcriptPath)

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`)
      }

      return await response.text()
    } catch (error) {
      throw new Error(`Failed to fetch transcripts: ${error.message}`)
    }
  }

  _parseTranscript(transcriptText) {
    const cues = []
    const lines = transcriptText.split('\n')
    let cue = null
    cues.language = null

    for (let line of lines) {
      line = line.trim()
      if (!line) {
        if (cue) {
          cues.push(cue)
          cue = null
        }

        continue
      }

      if (line.toLowerCase().startsWith('language:')) {
        cues.language = line.split(':')[1].trim()
        this._languages.push(cues.language)
        continue
      }

      if (!cue && /^\d+$/.test(line)) {
        continue
      } else if (line.includes('-->')) {
        const [startTime, endTime] = line.split(/ --> /)
        cue = new VTTCue(this._convertToSeconds(startTime), this._convertToSeconds(endTime), '')
        cue.startTimeRaw = this._minimalTime(startTime)
      } else if (cue) {
        cue.text += `${line} `
      }
    }

    if (cue) {
      cues.push(cue)
    }

    return cues
  }

  _convertToSeconds(time) {
    const [hours, minutes, seconds] = time.split(/:|,/).map(Number.parseFloat)
    return ((hours * 3600) + (minutes * 60) + seconds).toFixed(2)
  }

  _minimalTime(time) {
    const [hours, minutes, seconds] = time.split(/:|,/).map(Number.parseFloat)
    return `${hours === 0 ? '' : `${hours} : `} ${minutes} : ${Math.trunc(seconds)}`
  }

  _createTranscriptLines(cuesCollection) {
    const { media, layout, showTimestamp } = this._config

    if (!Array.isArray(cuesCollection) || cuesCollection.length === 0) {
      throw new Error('Invalid cuesCollection provided')
    }

    const cues = cuesCollection[0]
    const container = this.shadowRoot.querySelector('#transcript-container')
    container.innerHTML = ''

    for (const [index, cue] of cues.entries()) {
      const line = document.createElement('div')
      line.className = 'transcript-line'

      const fragment = document.createDocumentFragment()

      for (const cueArray of cuesCollection) {
        if (cueArray[index]) {
          const span = document.createElement('span')
          span.className = `transcript-${cueArray.language || 'default'}`
          span.textContent = cueArray[index].text.trim()
          fragment.append(span)
        }
      }

      if (fragment.lastChild?.nodeName === 'BR') {
        fragment.lastChild.remove()
      }

      line.append(fragment)

      const transcriptLineContainer = document.createElement('div')
      transcriptLineContainer.className = `transcript-line-container${layout === 'paragraph' ? ' paragraph' : ''}`
      transcriptLineContainer.setAttribute('aria-label', cue.text.trim())
      transcriptLineContainer.setAttribute('role', 'button')
      transcriptLineContainer.tabIndex = 0

      const timeContainer = document.createElement('span')
      timeContainer.className = 'time'
      timeContainer.textContent = cue.startTimeRaw
      timeContainer.style.display = showTimestamp ? 'inline-block' : 'none'

      transcriptLineContainer.append(timeContainer, line)
      container.append(transcriptLineContainer)

      this._addTranscriptEventListeners(transcriptLineContainer, media, cue.startTime)

      const styles = window.getComputedStyle(timeContainer)
      const padding = Number.parseFloat(styles.paddingLeft) + Number.parseFloat(styles.paddingRight)
      const border = Number.parseFloat(styles.borderLeftWidth) + Number.parseFloat(styles.borderRightWidth)

      const timeWidth = timeContainer.getBoundingClientRect().width - padding - border
      if (timeWidth > this._timeMaxWidth) {
        this._timeMaxWidth = timeWidth
      }
    }
  }

  _initializeLayoutOptions() {
    const stackedOption = this.shadowRoot.querySelector('input[type="radio"][value="stacked"]')
    const paragraphOption = this.shadowRoot.querySelector('input[type="radio"][value="paragraph"]')

    if (this._config.layout === 'paragraph') {
      paragraphOption.checked = true
    } else {
      stackedOption.checked = true
    }

    paragraphOption.addEventListener('change', () => {
      this._toggleLayout('paragraph')

      this._dispatchCustomEvent('layout', 'paragraph')
    })

    stackedOption.addEventListener('change', () => {
      this._toggleLayout('stacked')

      this._dispatchCustomEvent('layout', 'stacked')
    })
  }

  _toggleLayout(style) {
    const transcriptLineContainers = this.shadowRoot.querySelectorAll('.transcript-line-container')

    for (const container of transcriptLineContainers) {
      container.classList.toggle('paragraph', style === 'paragraph')
    }

    this._config.layout = style
  }

  _initializeThemes() {
    const autoOption = this.shadowRoot.querySelector('input[type="radio"][value="auto"]')
    const lightOption = this.shadowRoot.querySelector('input[type="radio"][value="light"]')
    const darkOption = this.shadowRoot.querySelector('input[type="radio"][value="dark"]')

    if (this._config.theme === 'light') {
      lightOption.checked = true
    } else if (this._config.theme === 'dark') {
      darkOption.checked = true
    } else {
      autoOption.checked = true
    }

    autoOption.addEventListener('change', () => {
      this._setTheme('auto')

      this._dispatchCustomEvent('theme', 'auto')
    })

    lightOption.addEventListener('change', () => {
      this._setTheme('light')

      this._dispatchCustomEvent('theme', 'light')
    })

    darkOption.addEventListener('change', () => {
      this._setTheme('dark')

      this._dispatchCustomEvent('theme', 'dark')
    })
  }

  _setTheme(theme) {
    this.setAttribute('theme', theme)
  }

  _initializeTimestampToggle() {
    const timestampCheckbox = this.shadowRoot.getElementById('timestamp-toggle')
    timestampCheckbox.checked = this._config.showTimestamp

    timestampCheckbox.addEventListener('change', () => {
      const timestamps = this.shadowRoot.querySelectorAll('.time')
      for (const timeElement of timestamps) {
        timeElement.style.display = timestampCheckbox.checked ? 'inline-block' : 'none'
      }

      this._config.showTimestamp = timestampCheckbox.checked

      this._dispatchCustomEvent('show-timestamp', timestampCheckbox.checked)
    })
  }

  _initializeAutoScrollToggle() {
    const autoScrollCheckbox = this.shadowRoot.getElementById('auto-scroll-toggle')
    autoScrollCheckbox.checked = this._config.autoScroll

    autoScrollCheckbox.addEventListener('change', () => {
      this._config.autoScroll = autoScrollCheckbox.checked

      this._dispatchCustomEvent('auto-scroll', autoScrollCheckbox.checked)
    })
  }

  _createLanguageCheckboxes(languages) {
    const languageSelectDiv = this.shadowRoot.getElementById('language-options')
    languageSelectDiv.innerHTML = ''

    const label = document.createElement('label')
    label.textContent = 'Languages:'
    languageSelectDiv.append(label)

    for (const lang of languages) {
      const checkboxLabel = document.createElement('label')
      const checkbox = document.createElement('input')
      checkbox.type = 'checkbox'
      checkbox.value = lang
      checkbox.checked = true

      checkboxLabel.append(checkbox)
      checkboxLabel.append(document.createTextNode(lang))

      languageSelectDiv.append(checkboxLabel)
    }

    const checkboxes = languageSelectDiv.querySelectorAll('input[type="checkbox"]')
    for (const checkbox of checkboxes) {
      checkbox.addEventListener('change', () => {
        const selectedLanguages = Array.from(checkboxes)
          .filter(input => input.checked)
          .map(input => input.value)

        // If this is the last checkbox being unchecked, prevent it
        if (selectedLanguages.length === 0) {
          checkbox.checked = true // Re-check the last checkbox
          return
        }

        this._updateLayout(selectedLanguages)
      })
    }
  }

  _updateLayout(selectedLanguages) {
    for (const span of this.shadowRoot.querySelectorAll('.transcript-line span')) {
      const languageClass = span.classList[0] // e.g., 'transcript-en'
      const language = languageClass.slice(11) // extract language code e.g., 'en'

      span.style.display = selectedLanguages.includes(language) ? '' : 'none'
    }
  }

  _scroll(line) {
    const container = this.shadowRoot.querySelector('#transcript-container')
    const { top: containerTop } = container.getBoundingClientRect()
    const { top: elementTop, height: elementHeight } = line.getBoundingClientRect()

    // Calculate the offset for the second visible line
    const secondLineOffset = elementHeight

    // Calculate the ideal top position for the active line to "lock" it in the second line
    const lockPosition = containerTop + secondLineOffset

    if (elementTop !== lockPosition) {
      this._scrollToLock(line, lockPosition)
    }
  }

  _scrollToLock(element, lockPosition) {
    const parent = element.closest('#transcript-container')

    if (!parent) {
      console.error('Parent #transcript-container not found.') // eslint-disable-line no-console
      return
    }

    const { top: elementTop } = element.getBoundingClientRect()

    // Calculate how much to scroll to keep the element at the locked position
    const offset = elementTop - lockPosition

    // Scroll the parent container by the calculated offset
    if (offset !== 0) {
      parent.scrollBy({
        top: offset,
        left: 0,
        behavior: 'auto'
      })
    }
  }

  _addTranscriptEventListeners(element, media, time) {
    const setMediaTime = () => {
      media.currentTime = time
    }

    const handleEvent = e => {
      if (e.type === 'click' || (e.type === 'keypress' && e.key === 'Enter')) {
        setMediaTime()
      }
    }

    element.addEventListener('click', handleEvent)
    element.addEventListener('keypress', handleEvent)
  }

  _addMediaEventListener(media, cuesCollection) {
    if (!media || !cuesCollection.length) {
      return
    }

    const cues = cuesCollection[0]
    const transcriptLines = Array.from(this.shadowRoot.querySelectorAll('.transcript-line'))
    const transcriptContainer = this.shadowRoot.querySelector('#transcript-container')
    let activeCueIndex = -1 // Pointer to track the active cue

    const updateActiveLine = (index, isActive) => {
      const line = transcriptLines[index]
      const container = line.closest('.transcript-line-container')
      if (container) {
        container.classList.toggle('active', isActive)
      }
    }

    media.addEventListener('timeupdate', () => {
      const { currentTime } = media

      // Identify the new active cue index
      let newActiveIndex = activeCueIndex

      for (let i = 0; i < cues.length; i++) {
        const { startTime, endTime } = cues[i]
        if (currentTime >= startTime && (i === cues.length - 1 || currentTime < endTime)) {
          newActiveIndex = i
          break
        }
      }

      // Update only if there's a change in the active cue
      if (newActiveIndex !== activeCueIndex) {
        if (activeCueIndex >= 0) {
          updateActiveLine(activeCueIndex, false)
        }

        activeCueIndex = newActiveIndex

        if (activeCueIndex >= 0) {
          updateActiveLine(activeCueIndex, true)

          // Add the 'active-added' class once the media starts
          if (!transcriptContainer.classList.contains('active-added')) {
            transcriptContainer.classList.add('active-added')
          }

          if (this._config.autoScroll) {
            this._scroll(transcriptLines[activeCueIndex])
          }
        }
      }
    })
  }

  redrawTime() {
    const timeElements = this.shadowRoot.querySelectorAll('.time')

    if (timeElements.length === 0) {
      return
    }

    let maxWidth = 0

    for (const t of timeElements) {
      const { width } = t.getBoundingClientRect()
      if (width > maxWidth) {
        maxWidth = width
      }
    }

    this.shadowRoot.querySelector('#transcript-container').style.setProperty('--cs-timestamp-width', `${maxWidth}px`)
  }
}

customElements.define('cue-sync', CueSync)
