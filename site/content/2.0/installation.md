---
layout: docs
title: Installation
aliases:
  - "/2.0/installation/"
  - "/installation/"
toc: true
description: CueSync is a JavaScript library that simplifies the integration of interactive transcripts into your media projects. We offer three convenient options to integrate CueSync into your multimedia content. Choose the one that best fits your workflow.
---

## Installation

<p class="fs-4 ms-0 mb-4">We offer three convenient options to integrate CueSync into your multimedia content. Choose the one that best fits your workflow.</p>

### CDN

Use CueSync instantly by including its JavaScript file directly from a Content Delivery Network (CDN). 
This option allows you to link to the files hosted on a remote server, ensuring quick and easy integration into your project. 
You can choose from popular CDN providers like `jsDelivr` or `unpkg` to access CueSync’s resources seamlessly. 
This method is convenient and ideal for those who want a straightforward integration process.

<div class="d-inline-block">
<ul id="cdn-tab" class="nav nav-pills bg-theme-primary bg-opacity-10 rounded-pill" role="tablist">
  <li class="nav-item" role="presentation">
    <button id="jsdelivr-tab" class="nav-link rounded-pill position-relative active" data-bs-toggle="pill" data-bs-target="#jsdelivr" type="button" role="tab" aria-controls="jsdelivr" aria-selected="true">
    jsDelivr
    <span class="ripple-surface"></span>
    </button>
  </li>
  <li class="nav-item" role="presentation">
    <button id="unpkg-tab" class="nav-link rounded-pill position-relative" data-bs-toggle="pill" data-bs-target="#unpkg" type="button" role="tab" aria-controls="unpkg" aria-selected="false">
    unpkg
    <span class="ripple-surface"></span>
    </button>
  </li>
</ul>
</div>

<div class="tab-content" id="cdn-tab-content">
<div class="tab-pane fade mt-3 show active" id="jsdelivr" role="tabpanel" aria-labelledby="jsdelivr-tab" tabindex="0">

```html  
<!-- CueSync JS -->
<script src="https://cdn.jsdelivr.net/npm/@cuesync/cuesync@2.0.0-alpha1/dist/js/cuesync.min.js" 
        integrity="sha384-8CscDj5LJ+l14moc9Ay2Rg3N+vtwhP4Dja2r3cPeq1yrNFpVwiJ+7GGprymBJxZJ" 
        crossorigin="anonymous"></script>
```

</div>
<div class="tab-pane fade mt-3" id="unpkg" role="tabpanel" aria-labelledby="unpkg-tab" tabindex="0">

```html  
<!-- CueSync JS -->
<script src="https://unpkg.com/@cuesync/cuesync@2.0.0-alpha1/dist/js/cuesync.min.js" 
        integrity="sha384-8CscDj5LJ+l14moc9Ay2Rg3N+vtwhP4Dja2r3cPeq1yrNFpVwiJ+7GGprymBJxZJ" 
        crossorigin="anonymous"></script>
```

</div>
</div>

{{< squiggle >}}

### npm

Integrate CueSync into your project using the Node Package Manager (NPM). This method involves installing CueSync 
as a package within your project’s ecosystem, providing more control and flexibility over its usage and updates.

Install
```console
npm i @cuesync/cuesync
```

Import CueSync JS
```javascript
import * as cuesync from '@cuesync/cuesync'
```

{{< squiggle >}}

### Download

Download the pre-compiled JavaScript file of CueSync directly to your system. This option is suitable for 
developers who prefer to have local copies of the required files and manually link them in their project’s code.

<a class="btn btn-primary btn-lg rounded-pill" 
   href="https://github.com/cuesync/cuesync.github.io/releases/download/v2.0.0-alpha1/cuesync-2.0.0-alpha1-dist.zip" download>
Download v2.0.0-alpha1
    <span class="ripple-surface"></span>
</a>

{{< squiggle >}}

## Next steps

Explore CueSync’s capabilities in action!<br>
Head over to the [Examples](/{{< docs_version >}}/examples) page to get started — you'll find usage scenarios, helpful code snippets, and live examples to guide you.