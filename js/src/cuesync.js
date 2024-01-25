/**
 * --------------------------------------------------------------------------
 * CueSync cuesync.js
 * Licensed under MIT (https://github.com/cuesync/cuesync.github.io/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import BaseComponent from './helpers/base-component.js'

const NAME = 'cuesync'

class Cuesync extends BaseComponent {
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

  refresh() {
    const { transcriptPath } = this._config
    const { media } = this._config
    const { displayTime } = this._config

    // Load and parse the transcript file
    fetch(transcriptPath)
      .then(response => response.text())
      .then(data => {
        const cues = this.parseTranscript(data)

        // Create transcript lines and add them to the container
        for (const [index, cue] of cues.entries()) {
          const line = document.createElement('div')
          line.className = 'transcript-line'
          line.textContent = cue.text.trim()

          if (displayTime) {
            const transcriptLineContainer = document.createElement('div')
            transcriptLineContainer.className = 'transcript-line-container'
            transcriptLineContainer.setAttribute('aria-label', cue.text.trim())
            transcriptLineContainer.setAttribute('role', 'button')

            const timeContainer = document.createElement('span')
            timeContainer.className = 'time'
            timeContainer.textContent = `${cue.startTimeRaw} - ${cue.endTimeRaw}`

            transcriptLineContainer.append(timeContainer)
            transcriptLineContainer.append(line)
            this._element.append(transcriptLineContainer)

            transcriptLineContainer.addEventListener('click', () => {
              media.currentTime = cue.startTime
            })

            transcriptLineContainer.addEventListener('keypress', e => {
              if (e.key === 'Enter') {
                media.currentTime = cue.startTime
              }
            })

            transcriptLineContainer.tabIndex = 0

            if (timeContainer.getBoundingClientRect().width > this._timeMaxWidth) {
              this._timeMaxWidth = timeContainer.getBoundingClientRect().width
            }
          } else {
            this._element.append(line)

            line.setAttribute('aria-label', cue.text.trim())
            line.setAttribute('role', 'button')

            line.addEventListener('click', () => {
              media.currentTime = cue.startTime
            })

            line.addEventListener('keypress', e => {
              if (e.key === 'Enter') {
                media.currentTime = cue.startTime
              }
            })

            line.tabIndex = 0
          }

          this._element.addEventListener('scroll', () => {
            if (this._autoScroll) {
              this._autoScroll = false
            }
          })

          // Update transcript highlighting based on media time
          media.addEventListener('timeupdate', () => {
            if (index === cues.length - 1 && media.currentTime >= cue.startTime) {
              if (displayTime) {
                line.closest('.transcript-line-container').classList.add('active')
              } else {
                line.classList.add('active')
              }

              this.autoScroll(line)
            } else if (media.currentTime >= cue.startTime && media.currentTime < cue.endTime) {
              if (displayTime) {
                line.closest('.transcript-line-container').classList.add('active')
              } else {
                line.classList.add('active')
              }

              this.autoScroll(line)
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

        this._element.style.setProperty('--cs-time-width', `${this._timeMaxWidth}px`)
      })
      .catch(error => console.error('Error loading transcript file:', error)) // eslint-disable-line no-console
  }

  // Function to parse SRT or VTT text into cue objects
  parseTranscript(text) {
    const cues = []
    const lines = text.split('\n')
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
        cue = new VTTCue(this.convertToSeconds(startTime), this.convertToSeconds(endTime), '')
        cue.startTimeRaw = startTime
        cue.endTimeRaw = endTime
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

  convertToSeconds(time) {
    const [hours, minutes, seconds] = time.split(/:|,/).map(Number.parseFloat)

    return ((hours * 3600) + (minutes * 60) + seconds).toFixed(2)
  }

  autoScroll(line) {
    if (this._autoScroll) {
      this.scrollToView(line)
    } else {
      const parentRect = this._element.getBoundingClientRect()
      const elementRect = line.getBoundingClientRect()

      if (elementRect.top >= parentRect.top && elementRect.bottom <= parentRect.bottom) {
        this._autoScroll = true
      }
    }
  }

  scrollToView(element) {
    const parent = element.parentElement

    // Calculate the scroll position to make the element visible in the parent
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
}

export default Cuesync
