---
layout: docs
title: Specs
aliases:
  - "/2.0/specs/"
  - "/specs/"
version: "2.0"
toc: true
aliases:
  - "/1.0/specs/"
description: CueSync is a JavaScript library designed to simplify the integration of interactive transcripts into multimedia content. Customize and configure CueSync to fit your needs. This page lists all available CSS custom properties, JavaScript initialization options, and HTML attributes you can use to control the behavior and appearance of CueSync.
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

### Javascript 
#### Custom Events
<div class="table-responsive">
<table class="table table-bordered rounded-5">
  <thead>
    <tr>
      <th>Event Name</th>
      <th>Triggered When...</th>
      <th><code>event.detail.newValue</code> contains</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>layout-changed</td>
      <td>Layout is changed</td>
      <td>'stacked' or 'paragraph'</td>
    </tr>
    <tr>
      <td>show-timestamp-changed</td>
      <td>Timestamp visibility is changed</td>
      <td>true or false</td>
    </tr>
    <tr>
      <td>auto-scroll-changed</td>
      <td>Auto scroll is updated</td>
      <td>true or false</td>
    </tr>
    <tr>
      <td>theme-changed</td>
      <td>Theme is changed</td>
      <td>'auto', 'light', 'dark'</td>
    </tr>
    <tr>
      <td>transcript-path-changed</td>
      <td>Transcript paths are updated</td>
      <td>string</td>
    </tr>
    <tr>
      <td>media-changed</td>
      <td>Media target is updated</td>
      <td>string (selector)</td>
    </tr>
    <tr>
      <td>allow-settings-changed</td>
      <td>Allow Settings is updated</td>
      <td>true or false</td>
    </tr>
  </tbody>
</table>
</div>

#### Functions
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
    <td>redrawTime()</td>
    <td>Recalculates the width of the timestamp column. Useful if fonts or styles change.</td>
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
        <th>Attribute</th>
        <th>Type</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>transcript-path</td>
        <td>string</td>
        <td>Comma-separated paths to transcript files (VTT/SRT)</td>
      </tr>
      <tr>
        <td>media</td>
        <td>string</td>
        <td>CSS selector for the associated &ltvideo&gt or &ltaudio&gt element</td>
      </tr>
      <tr>
        <td>layout</td>
        <td>string</td>
        <td>'stacked' or 'paragraph' (default is 'stacked')</td>
      </tr>
      <tr>
        <td>show-timestamp</td>
        <td>string</td>
        <td>'true' or 'false' (default is 'true')</td>
      </tr>
      <tr>
        <td>auto-scroll</td>
        <td>string</td>
        <td>'true' or 'false' (default is 'true')</td>
      </tr>
      <tr>
        <td>allow-settings</td>
        <td>string</td>
        <td>'true' or 'false' (default is 'true')</td>
      </tr>
      <tr>
        <td>theme</td>
        <td>string</td>
        <td>'auto', 'light', or 'dark' (default is 'auto')</td>
      </tr>
    </tbody>
  </table>
</div>