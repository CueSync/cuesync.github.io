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
    const { transcriptPath } = this._config
    const transcriptText = await this._fetchTranscript(transcriptPath)

    if (transcriptText) {
      const cues = this._parseTranscript(transcriptText)

      // Create transcript lines and add them to the container
      this._createTranscriptLines(cues)

      if (this._timeMaxWidth) {
        this._element.style.setProperty('--cs-time-width', `${this._timeMaxWidth}px`)
      }

      this._element.addEventListener('scroll', () => {
        if (this._autoScroll) {
          this._autoScroll = false
        }
      })
    }
  }

  async _fetchTranscript(transcriptPath) {
    try {
      const response = await fetch(transcriptPath)
      return await response.text()
    } catch (error) {
      console.error(`Error reading file: ${error.message}`) // eslint-disable-line no-console
      return false
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
        }

        cue = null
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

  _createTranscriptLines(cues) {
    const { media, displayTime } = this._config

    for (const [index, cue] of cues.entries()) {
      const line = document.createElement('div')
      line.className = 'transcript-line'
      line.textContent = cue.text.trim()

      if (displayTime) {
        const transcriptLineContainer = document.createElement('div')
        transcriptLineContainer.className = 'transcript-line-container'
        transcriptLineContainer.setAttribute('aria-label', cue.text.trim())
        transcriptLineContainer.setAttribute('role', 'button')
        transcriptLineContainer.tabIndex = 0

        const timeContainer = document.createElement('span')
        timeContainer.className = 'time'
        timeContainer.textContent = `${cue.startTimeRaw}`

        transcriptLineContainer.append(timeContainer)
        transcriptLineContainer.append(line)

        this._element.append(transcriptLineContainer)

        this._addTranscriptEventListeners(transcriptLineContainer, media, cue.startTime)

        if (timeContainer.getBoundingClientRect().width > this._timeMaxWidth) {
          this._timeMaxWidth = timeContainer.getBoundingClientRect().width
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

  _convertToSeconds(time) {
    const [hours, minutes, seconds] = time.split(/:|,/).map(Number.parseFloat)

    return ((hours * 3600) + (minutes * 60) + seconds).toFixed(2)
  }

  _minimalTime(time) {
    const [hours, minutes, seconds] = time.split(/:|,/).map(Number.parseFloat)

    return `${hours === 0 ? '' : `${hours} : `} ${minutes} : ${Math.trunc(seconds)}`
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

    const elementOffset = element.offsetTop - parent.offsetTop
    const elementHeight = element.offsetHeight
    const parentHeight = parent.clientHeight

    // Calculate the current scroll position of the parent
    const parentScrollTop = parent.scrollTop

    // Check if the element is above the visible area
    if (elementOffset < parentScrollTop) {
      // Scroll up to make the element visible at the top
      parent.scrollTo({
        top: elementOffset,
        left: 0,
        behavior: 'smooth'
      })
    } else if (elementOffset + elementHeight > parentScrollTop + parentHeight) {
      // Scroll down to make the element visible at the bottom
      parent.scrollTo({
        top: elementOffset + elementHeight - parentHeight,
        left: 0,
        behavior: 'smooth'
      })
    }
    // If the element is already visible, no scrolling is needed
  }

  _addMediaEventListener(line, cues, cue, index) {
    const { media, displayTime } = this._config

    media.addEventListener('timeupdate', () => {
      if (index === cues.length - 1 && media.currentTime >= cue.startTime) {
        if (displayTime) {
          line.closest('.transcript-line-container').classList.add('active')
        } else {
          line.classList.add('active')
        }

        this._scroll(line)
      } else if (media.currentTime >= cue.startTime && media.currentTime < cue.endTime) {
        if (displayTime) {
          line.closest('.transcript-line-container').classList.add('active')
        } else {
          line.classList.add('active')
        }

        this._scroll(line)
      } else {
        if (displayTime) {
          line.closest('.transcript-line-container').classList.remove('active')
        } else {
          line.classList.remove('active')
        }

        if (media.currentTime >= cue.startTime) {
          if (displayTime) {
            line.closest('.transcript-line-container').classList.add('played')
          } else {
            line.classList.add('played')
          }
        } else if (displayTime) {
          line.closest('.transcript-line-container').classList.remove('played')
        } else {
          line.classList.remove('played')
        }
      }
    })
  }

  _addTranscriptEventListeners(element, media, time) {
    element.addEventListener('click', () => {
      media.currentTime = time
    })

    element.addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        media.currentTime = time
      }
    })
  }

  redrawTime() {
    const timeList = Array.prototype.slice.call(this._element.querySelectorAll('.time'))

    if (timeList) {
      let maxWidth = 0
      for (const t of timeList) {
        if (t.getBoundingClientRect().width > maxWidth) {
          maxWidth = t.getBoundingClientRect().width
        }
      }

      if (maxWidth) {
        this._element.style.setProperty('--cs-time-width', `${maxWidth}px`)
      }
    }
  }
}

export default CueSync
