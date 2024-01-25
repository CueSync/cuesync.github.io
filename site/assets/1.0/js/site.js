/* global cuesync, materialstyle, anchors, ClipboardJS, mdc */

(() => {
  'use strict'

  anchors.add('h3, h4')

  // Hide AdSpace
  const ad = document.querySelector('.adspace')
  if (ad) {
    ad.innerHTML = ''
    ad.style.display = 'none'
  }

  /**
     * Copy to clipboard
     */

  const copyBtnTitle = 'Copy to clipboard'

  const btnHtml = `<div class="d-flex align-items-center highlight-toolbar ps-3 pe-2 py-1 rounded-top border">
      <small class="font-monospace text-uppercase">##lang##</small>
      <div class="d-flex ms-auto">
        <button type="button" class="copy-to-clipboard btn btn-outline-secondary btn-fab mini-fab border-0" title="Copy to clipboard">
          <i class="bi bi-clipboard2" role="img" aria-label="Copy"></i>
        </button>
      </div>
    </div>`

  // Add copy button to code blocks that were not created by shortcode
  for (const element of document.querySelectorAll('.highlight')) {
    if (!element.closest('.collapse')) {
      element.insertAdjacentHTML('beforebegin', btnHtml.replace('##lang##', element.querySelector('code').dataset.lang))
      element.classList.add('rounded-bottom', 'border', 'border-top-0')
    }
  }

  /**
     *
     * @param {string} selector
     * @param {string} title
     */
  function snippetButtonTooltip(selector, title) {
    for (const btn of document.querySelectorAll(selector)) {
      materialstyle.Tooltip.getOrCreateInstance(btn, { title })
    }
  }

  snippetButtonTooltip('.copy-to-clipboard', copyBtnTitle)

  const clipboard = new ClipboardJS('.copy-to-clipboard', {
    target: trigger => trigger.closest('.highlight-toolbar').nextElementSibling
  })

  clipboard.on('success', event => {
    const iconCopy = '<i class="bi bi-clipboard2" role="img" aria-label="Copy"></i>'
    const iconCopied = '<i class="bi bi-check2 text-green" role="img" aria-label="Copied"></i>'
    const originalTitle = event.trigger.title
    const tooltipBtn = materialstyle.Tooltip.getInstance(event.trigger)

    tooltipBtn.setContent({ '.tooltip-inner': 'Copied!' })

    event.clearSelection()
    event.trigger.title = 'Copied!'
    event.trigger.innerHTML = iconCopied

    setTimeout(() => {
      tooltipBtn.setContent({ '.tooltip-inner': copyBtnTitle })
      event.trigger.title = originalTitle
      event.trigger.innerHTML = iconCopy
    }, 2000)
  })

  clipboard.on('error', event => {
    const modifierKey = /mac/i.test(navigator.userAgent) ? '\u2318' : 'Ctrl-'
    const fallbackMsg = `Press ${modifierKey}C to copy`
    const tooltipBtn = materialstyle.Tooltip.getInstance(event.trigger)

    tooltipBtn.setContent({ '.tooltip-inner': fallbackMsg })
    event.trigger.addEventListener('hidden.bs.tooltip', () => {
      tooltipBtn.setContent({ '.tooltip-inner': copyBtnTitle })
    }, { once: true })
  })

  const el = document.querySelector('.sticky-top')
  const observer = new IntersectionObserver(
    ([e]) => e.target.classList.toggle('container', e.intersectionRatio < 1),
    { threshold: [1] }
  )

  observer.observe(el)

  // Initialize Ripple
  const rippleSurface = Array.prototype.slice.call(document.querySelectorAll('.ripple-surface'))
  rippleSurface.map(s => {
    return new mdc.ripple.MDCRipple(s)
  })

  // Initialize Tabs
  const tabs = Array.prototype.slice.call(document.querySelectorAll('.nav-tabs'))
  tabs.map(tab => {
    return new materialstyle.MaterialTab(tab)
  })

  // Toranscript
  const transcriptList = Array.prototype.slice.call(document.querySelectorAll('#audio-transcript'))
  transcriptList.map(t => {
    return new cuesync.CueSync(t, { transcriptPath: '/assets/transcripts/transcript.vtt', media: document.querySelector('#audio'), displayTime: true })
  })

  const transcriptList2 = Array.prototype.slice.call(document.querySelectorAll('#video-transcript'))
  transcriptList2.map(t => {
    return new cuesync.CueSync(t, { transcriptPath: '/assets/transcripts/you.vtt', media: document.querySelector('#natGeoVideo') })
  })

  let i = 1
  const squiggles = Array.prototype.slice.call(document.querySelectorAll('.squiggle'))
  squiggles.forEach(s => {
    s.querySelector('pattern').setAttribute('id', `s${i}`)
    s.querySelector('rect').setAttribute('fill', `url(#s${i++})`)
  })
})()
