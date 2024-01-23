---
layout: home
title: CueSync
---

## CueSync is a JavaScript library designed to simplify the integration of interactive transcripts into multimedia content.

<div class="row my-5">
    <label class="h3">Video</label>
    <div class="col-md-6">
        <div class="ratio ratio-16x9" style="max-width:600px;">
            <video id="natGeoVideo" controls>
              <source src="/assets/videos/NatGeo.mp4" type="video/mp4">
              Your browser does not support HTML video.
            </video>
        </div>
    </div>
    <div class="col-md-6">
        <label class="h4">Transcript</label>
        <div id="video-transcript" class="transcript-container overflow-auto"></div>
    </div>
</div>

<div class="row my-5">
    <label class="h3">Audio</label>
    <div class="col-md-12">
        <audio controls id="audio" crossorigin="anonymous" preload="true">
            <source src="/assets/audio/audio.mp3" type="audio/mpeg">
        </audio>
        <label class="h4 d-block mt-2">Transcript</label>
        <div id="audio-transcript" class="transcript-container" style="height: 400px; overflow: auto;"></div>
    </div>
</div>