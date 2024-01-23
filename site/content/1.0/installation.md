---
layout: docs
title: Installation
aliases:
  - "/1.0/"
  - "/1.0/installation/"
  - "/installation/"
toc: true
description: We offer three convenient options to integrate CueSync into your project. Choose the one that aligns with your preferences.
---

## Installation

### CDN
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
<div class="tab-pane fade show active" id="jsdelivr" role="tabpanel" aria-labelledby="jsdelivr-tab" tabindex="0">

Styles

```html
<!-- CueSync CSS -->
<link rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@cuesync/cuesync@1.0.0-alpha1/dist/css/cuesync.min.css" 
      integrity="sha384-wADgvhAqbORDLWCl6LHRmwaldDxcsCZJ9EfC4tyLmlqRSrxK8SQSmUprPJYdtCZb" 
      crossorigin="anonymous">
```

Scripts

```html  
<!-- CueSync JS -->
<script src="https://cdn.jsdelivr.net/npm/@cuesync/cuesync@1.0.0-alpha1/dist/js/cuesync.min.js" 
        integrity="sha384-GkNdpzZA0aigYQs7bhB94ikrs1rxyzcoGZqE/KBxsvvsQPERiMHw4vrDlCgDewnu" 
        crossorigin="anonymous"></script>
```

</div>
<div class="tab-pane fade" id="unpkg" role="tabpanel" aria-labelledby="unpkg-tab" tabindex="0">

Styles

```html
<!-- CueSync CSS -->
<link rel="stylesheet"
      href="https://unpkg.com/@cuesync/cuesync@1.0.0-alpha1/dist/css/cuesync.min.css" 
      integrity="sha384-wADgvhAqbORDLWCl6LHRmwaldDxcsCZJ9EfC4tyLmlqRSrxK8SQSmUprPJYdtCZb" 
      crossorigin="anonymous">
```

Scripts

```html  
<!-- CueSync JS -->
<script src="https://unpkg.com/@cuesync/cuesync@1.0.0-alpha1/dist/js/cuesync.min.js" 
        integrity="sha384-GkNdpzZA0aigYQs7bhB94ikrs1rxyzcoGZqE/KBxsvvsQPERiMHw4vrDlCgDewnu" 
        crossorigin="anonymous"></script>
```

</div>
</div>

{{< squiggle >}}

### npm

Install
```console
npm i @cuesync/cuesync
```

Import CueSync JS
```javascript
import * as cuesync from '@cuesync/cuesync'
```

Import CueSync SCSS in your SCSS file
```scss
@import "~@cuesync/cuesync/scss/cuesync";
```

{{< squiggle >}}

### Download
<a class="btn btn-success btn-lg rounded-pill" 
   href="https://github.com/cuesync/cuesync.github.io/releases/download/v1.0.0-alpha1/cuesync-1.0.0-alpha1-dist.zip" download>
Download v1.0.0-alpha1
</a>