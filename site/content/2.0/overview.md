---
layout: overview
title: CueSync
aliases:
  - "/"
  - "/overview/"
  - "/2.0/"
  - "/2.0/overview/"
---

<div class="row mb-5">
    <h2 class="text-center">See CueSync in action!</h3>
    <label class="h5 text-center">
        Hit play and watch the transcript come to life, elegantly highlighting each phrase (Cue) as it's spoken. 
        Click on any Cue to jump to that moment in the media.</label>
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
        <cue-sync transcript-path="/assets/transcripts/natgeo.vtt, /assets/transcripts/natgeo_hindi.vtt" 
                  media="#natGeoVideo" 
                  layout="paragraph"
                  style="height: 400px;"></cue-sync>
    </div>
</div>

<div class="row my-5">
    <label class="h4 mb-4">Audio</label>
    <div class="col-md-12">
        <audio controls id="bobDylanAudio" crossorigin="anonymous" preload="true">
            <source src="/assets/audio/bob_dylan.mp3" type="audio/mpeg">
        </audio>
        <cue-sync transcript-path="/assets/transcripts/bob_dylan.vtt" 
                  media="#bobDylanAudio"
                  style="height: 400px;"></cue-sync>
    </div>
</div>

{{< squiggle >}}

<div class="text-center">
    <h2 class="mb-4">Get started any way you want</h2>
    <p class="h5 mb-5">Use the CDN, install it via package manager, or download.</p>
    <a class="btn btn-primary btn-lg rounded-pill" 
       href="/{{< docs_version >}}/installation">
    Read installation docs
    </a>
</div>

{{< squiggle >}}

<div class="text-center mb-5">
    <h2 class="mb-4">Explore CueSync Examples with Frameworks and Build Tools</h2>
    <p class="h5 mb-5">
        See how CueSync integrates with your tech stack. 
        Explore examples for popular frameworks and standalone build tools.
    </p>
    <div class="d-flex justify-content-center align-items-center gap-4 mb-4 flex-wrap">
        <a class="d-flex flex-column align-items-center text-decoration-none" 
           href="https://github.com/CueSync/cuesync-examples/tree/main/{{< docs_version >}}/react-vite" target="_blank">
            <img class="d-block mb-2" src="/assets/images/react.svg" alt="react logo" width="72" height="72">
            React + Vite
        </a>
        <a class="d-flex flex-column align-items-center text-decoration-none" 
           href="https://github.com/CueSync/cuesync-examples/tree/main/{{< docs_version >}}/react-next" target="_blank">
            <img class="d-block mb-2" src="/assets/images/next.svg" alt="next.js logo" width="72" height="72">
            Next.js
        </a>
        <a class="d-flex flex-column align-items-center text-decoration-none" 
           href="https://github.com/CueSync/cuesync-examples/tree/main/{{< docs_version >}}/vue-vite" target="_blank">
            <img class="d-block mb-2" src="/assets/images/vue.svg" alt="vue logo" width="72" height="72">
            Vue + Vite
        </a>
        <a class="d-flex flex-column align-items-center text-decoration-none" 
           href="https://github.com/CueSync/cuesync-examples/tree/main/{{< docs_version >}}/cuesync-angular" target="_blank">
            <img class="d-block mb-2" src="/assets/images/angular.png" alt="angular logo" width="72" height="72">
            Angular
        </a>
    </div>
    <div class="d-flex justify-content-center align-items-center gap-4 flex-wrap">
        <a class="d-flex flex-column align-items-center text-decoration-none" 
           href="https://github.com/CueSync/cuesync-examples/tree/main/{{< docs_version >}}/webpack" target="_blank">
            <img class="d-block mb-2" src="/assets/images/webpack.svg" alt="webpack logo" width="72" height="72">
            Webpack
        </a>
        <a class="d-flex flex-column align-items-center text-decoration-none" 
           href="https://github.com/CueSync/cuesync-examples/tree/main/{{< docs_version >}}/parcel" target="_blank">
            <img class="d-block mb-2" src="/assets/images/parcel.png" alt="parcel logo" width="72" height="72">
            Parcel
        </a>
        <a class="d-flex flex-column align-items-center text-decoration-none" 
           href="https://github.com/CueSync/cuesync-examples/tree/main/{{< docs_version >}}/vite" target="_blank">
            <img class="d-block mb-2" src="/assets/images/vite.svg" alt="vite logo" width="72" height="72">
            Vite
        </a>
    </div>
</div>
