---
layout: docs
title: Specs
toc: true
---

## Specs
  
### CSS custom properties
Customize CueSync by modifying the CSS custom properties listed below.

#### Transcript container
<div class="table-responsive">
<table class="table table-bordered rounded-5">
  <thead>
    <tr>
      <th>Property</th>
      <th>Default Value</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>--cs-container-bg</td>
      <td>#fff</td>
      <td>Transcript container background color</td>
    </tr>
    <tr>
      <td>--cs-container-color</td>
      <td>#000</td>
      <td>Transcript container text color</td>
    </tr>
    <tr>
      <td>--cs-container-padding-x</td>
      <td>5px</td>
      <td>Transcript container padding left and right</td>
    </tr>
    <tr>
      <td>--cs-container-padding-y</td>
      <td>5px</td>
      <td>Transcript container padding top and bottom</td>
    </tr>
    <tr>
      <td>--cs-container-border-width</td>
      <td>1px</td>
      <td>Transcript container border width</td>
    </tr>
    <tr>
      <td>--cs-container-border-style</td>
      <td>solid</td>
      <td>Transcript container border style</td>
    </tr>
    <tr>
      <td>--cs-container-border-color</td>
      <td>#e9e9e9</td>
      <td>Transcript container border color</td>
    </tr>
    <tr>
      <td>--cs-container-border-radius</td>
      <td>4px</td>
      <td>Transcript container border radius</td>
    </tr>
  </tbody>
</table>
</div>
    
#### Transcript
<div class="table-responsive">
<table class="table table-bordered rounded-5">
  <thead>
    <tr>
      <th>Property</th>
      <th>Default Value</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>--cs-padding-x</td>
      <td>5px</td>
      <td>Transcript padding left and right</td>
    </tr>
    <tr>
      <td>--cs-padding-y</td>
      <td>5px</td>
      <td>Transcript padding top and bottom</td>
    </tr>
    <tr>
      <td>--cs-border-radius</td>
      <td>4px</td>
      <td>Transcript border radius</td>
    </tr>
    <tr>
      <td>--cs-hover-bg</td>
      <td>#e3e4e5</td>
      <td>Transcript hover background color</td>
    </tr>
    <tr>
      <td>--cs-hover-color</td>
      <td>#000</td>
      <td>Transcript hover color</td>
    </tr>
    <tr>
      <td>--cs-active-bg</td>
      <td>#9ec5fe</td>
      <td>Transcript active background color</td>
    </tr>    
    <tr>
      <td>--cs-active-color</td>
      <td>#000</td>
      <td>Transcript active color</td>
    </tr>
    <tr>
      <td>--cs-highlight-bg</td>
      <td>transparent</td>
      <td>Transcript highlight background color</td>
    </tr>
    <tr>
      <td>--cs-highlight-color</td>
      <td>#084298</td>
      <td>Transcript highlight color</td>
    </tr>
  </tbody>
</table>
</div>

#### Timestamp
<div class="table-responsive">
<table class="table table-bordered rounded-5">
  <thead>
    <tr>
      <th>Property</th>
      <th>Default Value</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>--cs-time-bg</td>
      <td>#084298</td>
      <td>Timestamp background color</td>
    </tr>
    <tr>
      <td>--cs-time-color</td>
      <td>#fff</td>
      <td>Timestamp color</td>
    </tr>
    <tr>
      <td>--cs-time-border-radius</td>
      <td>4px</td>
      <td>Timestamp border radius</td>
    </tr>
    <tr>
      <td>--cs-time-width</td>
      <td>auto</td>
      <td>Timestamp width<br><i>(Automatically adjusted to match the width of the longest timestamp.)</i></td>
    </tr>
  </tbody>
</table>
</div>

{{< squiggle >}}

### Javascript options
<div class="table-responsive">
<table class="table table-bordered rounded-5">
  <thead>
    <tr>
      <th>Option</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
   <tr>
      <td>transcriptPath</td>
      <td>Sets the transcript file path</td>
    </tr>
    <tr>
      <td>media</td>
      <td>Sepcifies the media element for transcript highlighting and interactive control</td>
    </tr>
    <tr>
      <td>displayTime</td>
      <td>Indicates whether the timestamp should be displayed or not</td>
    </tr>
  </tbody>
</table>
</div>

### Javascript functions
<div class="table-responsive">
<table class="table table-bordered rounded-5">
  <thead>
    <tr>
      <th>Function</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
  <tr>
    <td>getInstance</td>
    <td>Static method that enables you to obtain the CueSync instance associated with a DOM element.</td>
  </tr>
  <tr>
    <td>getOrCreateInstance</td>
    <td>Static method that enables you to obtain the CueSync instance associated with a DOM element or create a new one if it hasn’t been initialized.</td>
  </tr>
  <tr>
    <td>redrawTime</td>
    <td>Ensures consistent timestamp element width in CueSync by recalculating dimensions when transcripts become visible.</td>
  </tr>
  <tr>
    <td>refresh</td>
    <td>Reconfigures a CueSync instance, useful in case it was not properly initialized during the first attempt.</td>
  </tr>
  <tr>
    <td>dispose</td>
    <td>Destroys an element’s instance and removes stored data associated with the DOM element.</td>
  </tr>
  </tbody>
</table>
</div>

{{< squiggle >}}

### HTML attributes
<div class="table-responsive">
  <table class="table table-bordered rounded-5">
    <thead>
      <tr>
        <th>HTML attribute</th>
        <th>Javascript equivalent option</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>data-cs-transcript-path</td>
        <td>transcriptPath</td>
        <td>Sets the transcript file path</td>
      </tr>
      <tr>
        <td>data-cs-display-time</td>
        <td>displayTime</td>
        <td>Indicates whether the timestamp should be displayed or not</td>
      </tr>
    </tbody>
  </table>
</div>