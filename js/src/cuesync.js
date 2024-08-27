/**
 * --------------------------------------------------------------------------
 * CueSync cuesync.js
 * Licensed under MIT (https://github.com/cuesync/cuesync.github.io/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import BaseComponent from './helpers/base-component.js'

const NAME = 'cuesync'

class CueSync extends BaseComponent {
  constructor(element, config) {
    super(element)

    this._element = element
    this._config = this._getConfig(config)
    this._autoScroll = true
    this._timeMaxWidth = 0
    this.refresh()
  }

  static get NAME() {
    return NAME
  }

  async refresh() {
    let transcripts = []
    let cuesCollection = []

    // Create an array of transcript file paths
    const transcriptFilePaths = this._getTranscriptFilePaths()

    // Create an array of transcript file contents
    if (transcriptFilePaths.length) {
      transcripts = await Promise.all(
        transcriptFilePaths.map(t => this._fetchTranscript(t))
      )
    } else {
      throw new Error('No transcript file paths found')
    }

    // Create an array of parsed transcripts
    if (transcripts.length) {
      cuesCollection = transcripts.map(t => this._parseTranscript(t))
    } else {
      throw new Error('No transcript content retrieved')
    }

    // Create transcript lines and add them to the container
    if (cuesCollection.length) {
      this._createTranscriptLines(cuesCollection)

      if (this._timeMaxWidth) {
        this._element.style.setProperty('--cs-time-width', `${this._timeMaxWidth}px`)
      }

      this._element.addEventListener('scroll', () => {
        if (this._autoScroll) {
          this._autoScroll = false
        }
      })
    } else {
      throw new Error('No cues parsed from transcripts')
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

  // Function to parse SRT or VTT text into cue objects
  _parseTranscript(transcriptText) {
    const cues = []
    const lines = transcriptText.split('\n')
    let cue = null

    for (let line of lines) {
      line = line.trim()
      if (!line) {
        // Empty line
        if (cue) {
          cues.push(cue)
          cue = null
        }

        continue
      }

      if (!cue && /^\d+$/.test(line)) {
        // This is a line number (SRT format)
        continue
      } else if (line.includes('-->')) {
        // Parse cue timing (both SRT and VTT formats)
        const [startTime, endTime] = line.split(/ --> /)
        cue = new VTTCue(this._convertToSeconds(startTime), this._convertToSeconds(endTime), '')
        cue.startTimeRaw = this._minimalTime(startTime)
      } else if (cue) {
        // Add cue text (both SRT and VTT formats)
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
    const { media, displayTime } = this._config

    if (!Array.isArray(cuesCollection) || cuesCollection.length === 0) {
      throw new Error('Invalid cuesCollection provided')
    }

    const cues = cuesCollection[0]

    for (const [index, cue] of cues.entries()) {
      const line = document.createElement('div')
      line.className = 'transcript-line'

      // Create a document fragment to combine text safely
      const fragment = document.createDocumentFragment()

      // Combine text from all cue arrays
      for (const cueArray of cuesCollection) {
        if (cueArray[index]) {
          const textNode = document.createTextNode(`${cueArray[index].text.trim()}`)
          fragment.append(textNode)
          fragment.append(document.createElement('br'))
        }
      }

      // Remove the trailing <br>
      if (fragment.lastChild?.nodeName === 'BR') {
        fragment.lastChild.remove()
      }

      line.append(fragment)

      if (displayTime) {
        const transcriptLineContainer = document.createElement('div')
        transcriptLineContainer.className = 'transcript-line-container'
        transcriptLineContainer.setAttribute('aria-label', cue.text.trim())
        transcriptLineContainer.setAttribute('role', 'button')
        transcriptLineContainer.tabIndex = 0

        const timeContainer = document.createElement('span')
        timeContainer.className = 'time'
        timeContainer.textContent = cue.startTimeRaw

        transcriptLineContainer.append(timeContainer)
        transcriptLineContainer.append(line)

        this._element.append(transcriptLineContainer)

        this._addTranscriptEventListeners(transcriptLineContainer, media, cue.startTime)

        const timeWidth = timeContainer.getBoundingClientRect().width
        if (timeWidth > this._timeMaxWidth) {
          this._timeMaxWidth = timeWidth
        }
      } else {
        line.setAttribute('aria-label', cue.text.trim())
        line.setAttribute('role', 'button')
        line.tabIndex = 0

        this._element.append(line)

        this._addTranscriptEventListeners(line, media, cue.startTime)
      }

      // Update transcript highlighting based on media time
      this._addMediaEventListener(line, cues, cue, index)
    }
  }

  _scroll(line) {
    if (this._autoScroll) {
      this._scrollToView(line)
    } else {
      const parentRect = this._element.getBoundingClientRect()
      const elementRect = line.getBoundingClientRect()

      if (elementRect.top >= parentRect.top && elementRect.bottom <= parentRect.bottom) {
        this._autoScroll = true
      }
    }
  }

  _scrollToView(element) {
    const parent = element.closest('.transcript-container')

    if (!parent) {
      console.error('Parent .transcript-container not found.') // eslint-disable-line no-console
      return
    }

    const parentRect = parent.getBoundingClientRect()
    const elementRect = element.getBoundingClientRect()

    // Check if the element is above or below the visible area
    const isAbove = elementRect.top < parentRect.top
    const isBelow = elementRect.bottom > parentRect.bottom

    if (isAbove) {
      // Scroll up to make the element visible at the top
      parent.scrollTo({
        top: parent.scrollTop + (elementRect.top - parentRect.top),
        left: 0,
        behavior: 'smooth'
      })
    } else if (isBelow) {
      // Scroll down to make the element visible at the bottom
      parent.scrollTo({
        top: parent.scrollTop + (elementRect.bottom - parentRect.bottom),
        left: 0,
        behavior: 'smooth'
      })
    }
  }

  _addMediaEventListener(line, cues, cue, index) {
    const { media, displayTime } = this._config

    const updateClasses = (isActive, isPlayed) => {
      const container = displayTime ? line.closest('.transcript-line-container') : line

      if (container) {
        container.classList.toggle('active', isActive)
        container.classList.toggle('played', isPlayed)
      }
    }

    media.addEventListener('timeupdate', () => {
      const { currentTime } = media
      const isActive = currentTime >= cue.startTime && (index === cues.length - 1 || currentTime < cue.endTime)
      const isPlayed = currentTime >= cue.startTime

      updateClasses(isActive, isPlayed)

      if (isActive) {
        this._scroll(line)
      }
    })
  }

  _addTranscriptEventListeners(element, media, time) {
    const setMediaTime = () => {
      media.currentTime = time
    }

    element.addEventListener('click', setMediaTime)

    element.addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        setMediaTime()
      }
    })
  }

  redrawTime() {
    const timeElements = this._element.querySelectorAll('.time')

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

    this._element.style.setProperty('--cs-time-width', `${maxWidth}px`)
  }
}

export default CueSync
