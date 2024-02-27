---
layout: home
title: CueSync
---

<h2 class="my-5 text-center">CueSync is a JavaScript library designed to simplify the integration of interactive transcripts into multimedia content.</h2>

<div class="row my-5">
    <label class="h3 mb-4">Video Transcript</label>
    <div class="col-md-6">
        <div class="ratio ratio-16x9" style="max-width:600px;">
            <video id="natGeoVideo" controls>
              <source src="/assets/videos/NatGeo.mp4" type="video/mp4">
              Your browser does not support HTML video.
            </video>
        </div>
    </div>
    <div class="col-md-6">
        <div id="video-transcript" class="transcript-container overflow-auto"></div>
    </div>
</div>

<div class="row my-5">
    <label class="h3 mb-4">Audio Transcript</label>
    <div class="col-md-12">
        <audio controls id="audio" crossorigin="anonymous" preload="true">
            <source src="/assets/audio/audio.mp3" type="audio/mpeg">
        </audio>
        <div id="audio-transcript" class="transcript-container" style="height: 400px; overflow: auto;"></div>
    </div>
</div>

{{< squiggle >}}

<div class="text-center mb-5">
    <h2 class="my-5">Get started any way you want</h2>
    <p class="h5">Use the CDN, install it via package manager, or download.</p>
    <a class="btn btn-primary btn-lg rounded-pill" 
       href="/installation">
    Read installation docs
    </a>
</div>
