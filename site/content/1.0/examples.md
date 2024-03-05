---
layout: docs
title: Examples
toc: true
---

## Basic usage

Assuming you've added your media (audio or video) to your page and have the transcripts ready, include a `<div>` 
with the class `transcript-container`. This div will display the interactive transcript of the media.

```html
<!-- Video -->
<video id="natGeoVideo" controls style="width: 100%; max-width: 500px;">
    <source src="/assets/videos/NatGeo.mp4" type="video/mp4">
    Your browser does not support HTML video.
</video>

<!-- Transcript Container -->
<div id="video-transcript" class="transcript-container"></div>
```

Next, initialize CueSync with JavaScript by passing the transcript container as the first argument and options as the second argument. 
The options must include the transcript file path and the media element.

```javascript
const videoTranscript = new cuesync.CueSync(
  // Transcript container
  document.getElementById('video-transcript'), 
  
  // Options
  { 
    transcriptPath: '/assets/transcripts/you.vtt', 
    media: document.getElementById('natGeoVideo') 
  }
)
```

That's it! Your interactive transcript is now ready. 

Hit the play button and watch the phrases in the transcript come to life, elegantly highlighted as they're spoken. 
Feel free to click on any phrase in the transcript to seamlessly navigate to that specific segment of the video.

Video

<video id="natGeoVideo" controls style="width: 100%; max-width: 500px;">
    <source src="/assets/videos/NatGeo.mp4" type="video/mp4">
    Your browser does not support HTML video.
</video>

Transcript

<div id="video-transcript" class="transcript-container overflow-auto"></div>

<br><br>

## Display time

To display the transcript timestamp, pass `displayTime: true` as an option when initializing.

{{< example codeId="code1" >}}
<!-- Audio -->
<audio controls id="audio" crossorigin="anonymous" preload="true">
    <source src="/assets/audio/audio.mp3" type="audio/mpeg">
</audio>

<!-- Transcript Container -->
<div id="audio-transcript" class="transcript-container" style="height: 400px; overflow: auto;"></div>
##split##
<script>
window.addEventListener('DOMContentLoaded', (event) => {
  const audioTranscript = new cuesync.CueSync(
    document.getElementById('audio-transcript'), 
    { 
      transcriptPath: '/assets/transcripts/transcript.vtt', 
      media: document.querySelector('#audio'),
      displayTime: true 
    }
  )
});
</script>
{{< /example >}}

<br>

## Setting options as HTML attributes

The options `transcriptPath` and `displayTime` can be passed as HTML data attributes `data-cs-transcript-path` 
and `data-cs-display-time`, respectively, on the `.transcript-container`.

{{< example codeId="code2" >}}
<!-- Video -->
<video id="natGeoVideo2" controls style="width: 100%; max-width: 500px;">
    <source src="/assets/videos/NatGeo.mp4" type="video/mp4">
    Your browser does not support HTML video.
</video>

<!-- Transcript Container -->
<div id="video-transcript-2" class="transcript-container" style="height: 400px; overflow: auto;"
     data-cs-transcript-path="/assets/transcripts/you.vtt"
     data-cs-display-time="true"></div>
##split##
<script>
window.addEventListener('DOMContentLoaded', (event) => {
  const videoTranscript2 = new cuesync.CueSync(
    document.getElementById('video-transcript-2'), 
    { 
      media: document.getElementById('natGeoVideo2') 
    }
  )
});
</script>
{{< /example >}}

<br>

## Customization

Customize CueSync by modifying the <a href="/1.0/specs/#css-custom-properties">CSS custom properties listed here</a>.

{{< example codeId="code3" >}}
<style>
#video-transcript-3 {
 --cs-container-bg: #aa076b;
 --cs-container-color: #fff;
 --cs-container-border-width: 0;
 --cs-hover-bg: #e47aaf;
 --cs-active-bg: #ffd75e;
 --cs-active-color: #aa076b;
 --cs-highlight-color: #ffd75e;
 --cs-time-bg: #ffd75e;
 --cs-time-color: #aa076b;
 --cs-time-border-radius: 20px;
 --cs-border-radius: 20px;
}
</style>

<!-- Video -->
<video id="natGeoVideo3" controls style="width: 100%; max-width: 500px;">
    <source src="/assets/videos/NatGeo.mp4" type="video/mp4">
    Your browser does not support HTML video.
</video>

<!-- Transcript Container -->
<div id="video-transcript-3" class="transcript-container" style="height: 400px; overflow: auto;"
     data-cs-transcript-path="/assets/transcripts/you.vtt"
     data-cs-display-time="true"></div>
##split##
<script>
window.addEventListener('DOMContentLoaded', (event) => {
  const videoTranscript3 = new cuesync.CueSync(
    document.getElementById('video-transcript-3'), 
    { 
      media: document.getElementById('natGeoVideo3') 
    }
  )
});
</script>
{{< /example >}}
