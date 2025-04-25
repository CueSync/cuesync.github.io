---
layout: home
title: CueSync
aliases:
  - "/2.0/"
  - "/2.0/overview/"
---

<div class="row mb-5">
    <h2 class="text-center">See CueSync in action!</h3>
    <label class="h5 text-center">Hit play and watch the transcript come to life, elegantly highlighting each phrase as it's spoken. Click any phrase to instantly jump to that moment in the video.</label>
    <label class="h4 my-4">Video</label>
    <div class="col-md-6">
        <div class="ratio ratio-16x9" style="max-width:600px;">
            <video id="natGeoVideo" controls>
              <source src="/assets/videos/natgeo.mp4" type="video/mp4">
              Your browser does not support HTML video.
            </video>
        </div>
    </div>
    <div class="col-md-6">
        <div id="video-transcript" class="transcript-container" style="max-height: 400px; overflow: auto;"></div>
    </div>
</div>

<div class="row my-5">
    <label class="h4 mb-4">Audio</label>
    <div class="col-md-12">
        <audio controls id="bobDylanAudio" crossorigin="anonymous" preload="true">
            <source src="/assets/audio/bob_dylan.mp3" type="audio/mpeg">
        </audio>
        <div id="audio-transcript" class="transcript-container" style="height: 400px; overflow: auto;"></div>
    </div>
</div>

{{< squiggle >}}

<div class="text-center mb-5">
    <h2 class="my-5">Get started any way you want</h2>
    <p class="h5 mb-4">Use the CDN, install it via package manager, or download.</p>
    <a class="btn btn-primary btn-lg rounded-pill" 
       href="/{{< docs_version >}}/installation">
    Read installation docs
    </a>
</div>

{{< squiggle >}}

<div class="text-center mb-5">
    <h2 class="my-5">Explore CueSync Examples with Build Tools</h2>
    <p class="h5 mb-4">Check out our examples using Webpack, Parcel, and Vite to get started quickly and make the most of interactive transcripts in your multimedia content.</p>
    <div class="d-flex justify-content-center align-items-center gap-4">
        <a class="d-flex flex-column align-items-center text-decoration-none" 
           href="https://github.com/CueSync/cuesync-examples/tree/main/{{< docs_version >}}/webpack" target="_blank">
           <img class="d-block mb-2" src="/assets/images/webpack.svg" alt="webpack logo" width="72" height="72">
        Webpack
        </a>
        <a class="d-flex flex-column align-items-center text-decoration-none" 
           href="https://github.com/CueSync/cuesync-examples/tree/main/{{< docs_version >}}/parcel" target="_blank">
           <img class="d-block mb-2" src="/assets/images/parcel.png" alt="webpack logo" width="72" height="72">
        Parcel
        </a>
        <a class="d-flex flex-column align-items-center text-decoration-none" 
           href="https://github.com/CueSync/cuesync-examples/tree/main/{{< docs_version >}}/vite" target="_blank">
           <img class="d-block mb-2" src="/assets/images/vite.svg" alt="webpack logo" width="72" height="72">
        Vite
        </a>
    </div>
</div>
