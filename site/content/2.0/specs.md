---
layout: docs
title: Specs
aliases:
  - "/2.0/specs/"
  - "/specs/"
toc: true
description: CueSync is a JavaScript library that simplifies the integration of interactive transcripts into your media projects. Customize and configure CueSync to fit your needs. This page lists all available CSS custom properties, JavaScript initialization options, and HTML attributes you can use to control the behavior and appearance of CueSync.
---

## Specs
 This page lists and explains all configurable aspects of the CueSync component — including:
* CSS custom properties for customizing styles and layout
* HTML attributes for declarative configuration
* JavaScript functions for runtime control
* Custom events emitted by the component for interactivity and integration

Use this guide to fully customize and integrate CueSync into your project, whether you're tweaking the visuals or 
wiring it up with JavaScript.

<br>

## CSS custom properties
Customize CueSync’s appearance by modifying the CSS custom properties listed below.

<image src="/assets/images/CueSyncParts.png" alt="Image showing various parts of CueSync" class="rounded-4 mt-2 mb-4 border w-100" style="max-width: 800px;">

### CueSync (Main Container)
<div class="table-responsive">
<table class="table table-bordered rounded-5">
  <thead>
    <tr>
      <th rowspan="2">Property</th>
      <th colspan="2">Default Value</th>
      <th rowspan="2">Description</th>
    </tr>
    <tr>
      <th>Light or Auto Theme</th>
      <th>Dark Theme</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>--cs-border-width</td>
      <td colspan="2">1px</td>
      <td>CueSync border width</td>
    </tr>
    <tr>
      <td>--cs-border-style</td>
      <td colspan="2">solid</td>
      <td>CueSync border style</td>
    </tr>
    <tr>
      <td>--cs-border-color</td>
      <td>#e9e9e9</td>
      <td>#495057</td>
      <td>CueSync border color</td>
    </tr>
    <tr>
      <td>--cs-border-radius</td>
      <td colspan="2">10px</td>
      <td>CueSync border radius</td>
    </tr>
  </tbody>
</table>
</div>

<br>

### Toolbar and Settings
<div class="table-responsive">
<table class="table table-bordered rounded-5">
  <thead>
    <tr>
      <th rowspan="2">Property</th>
      <th colspan="2">Default Value</th>
      <th rowspan="2">Description</th>
    </tr>
    <tr>
      <th>Light or Auto Theme</th>
      <th>Dark Theme</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>--cs-toolbar-bg</td>
      <td>#fff</td>
      <td>#16191d</td>
      <td>Toolbar background color</td>
    </tr>
    <tr>
      <td>--cs-toolbar-color</td>
      <td>#000</td>
      <td>#ced4da</td>
      <td>Toolbar color</td>
    </tr>
    <tr>
      <td>--cs-toolbar-px</td>
      <td colspan="2">15px</td>
      <td>Toolbar padding left and right</td>
    </tr>
    <tr>
      <td>--cs-toolbar-py</td>
      <td colspan="2">8px</td>
      <td>Toolbar padding top and bottom</td>
    </tr>
    <tr>
      <td>--cs-settings-shadow-opacity</td>
      <td>.1</td>
      <td>1</td>
      <td>Settings menu shadow opacity</td>
    </tr>
  </tbody>
</table>
</div>

<br>

### Transcript
<div class="table-responsive">
<table class="table table-bordered rounded-5">
  <thead>
    <tr>
      <th rowspan="2">Property</th>
      <th colspan="2">Default Value</th>
      <th rowspan="2">Description</th>
    </tr>
    <tr>
      <th>Light or Auto Theme</th>
      <th>Dark Theme</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>--cs-transcript-bg</td>
      <td>#fff</td>
      <td>#16191d</td>
      <td>Transcript background color</td>
    </tr>
    <tr>
      <td>--cs-transcript-color</td>
      <td>#000</td>
      <td>#ced4da</td>
      <td>Transcript text color</td>
    </tr>
  </tbody>
</table>
</div>

<br>

### Cue
<div class="table-responsive">
<table class="table table-bordered rounded-5">
  <thead>
    <tr>
      <th rowspan="2">Property</th>
      <th colspan="2">Default Value</th>
      <th rowspan="2">Description</th>
    </tr>
    <tr>
      <th>Light or Auto Theme</th>
      <th>Dark Theme</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>--cs-cue-px</td>
      <td colspan="2">15px</td>
      <td>Cue padding left and right in Stacked layout</td>
    </tr>
    <tr>
      <td>--cs-cue-py</td>
      <td colspan="2">5px</td>
      <td>Cue padding top and bottom in Stacked layout</td>
    </tr>
    <tr>
      <td>--cs-cue-paragraph-px</td>
      <td colspan="2">5px</td>
      <td>Cue padding left and right in Paragraph layout</td>
    </tr>
    <tr>
      <td>--cs-cue-paragraph-py</td>
      <td colspan="2">5px</td>
      <td>Cue padding top and bottom in Paragraph layout</td>
    </tr>
    <tr>
      <td>--cs-cue-hover-bg</td>
      <td>#f2f2f2</td>
      <td>#252525</td>
      <td>Cue hover background color</td>
    </tr>
    <tr>
      <td>--cs-cue-hover-color</td>
      <td>#000</td>
      <td>#ced4da</td>
      <td>Cue hover text color</td>
    </tr>
    <tr>
      <td>--cs-cue-active-bg</td>
      <td>#def1ff</td>
      <td>#032b48</td>
      <td>Cue active background color</td>
    </tr>
    <tr>
      <td>--cs-cue-active-color</td>
      <td>#044ba7</td>
      <td>#def1ff</td>
      <td>Cue active text color</td>
    </tr>
    <tr>
      <td>--cs-cue-highlight-bg</td>
      <td>transparent</td>
      <td>transparent</td>
      <td>Cue highlight background color</td>
    </tr>
    <tr>
      <td>--cs-cue-highlight-color</td>
      <td>#044ba7</td>
      <td>#def1ff</td>
      <td>Cue highlight text color</td>
    </tr>
  </tbody>
</table>
</div>

<br>

### Cue Text
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
      <td>--cs-cue-text-px</td>
      <td>5px</td>
      <td>Cue text padding left and right</td>
    </tr>
    <tr>
      <td>--cs-cue-text-py</td>
      <td>5px</td>
      <td>Cue text padding top and bottom</td>
    </tr>
  </tbody>
</table>
</div>

<br>

### Timestamp
<div class="table-responsive">
<table class="table table-bordered rounded-5">
  <thead>
    <tr>
      <th rowspan="2">Property</th>
      <th colspan="2">Default Value</th>
      <th rowspan="2">Description</th>
    </tr>
    <tr>
      <th>Light or Auto Theme</th>
      <th>Dark Theme</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>--cs-timestamp-bg</td>
      <td>#def1ff</td>
      <td>#032b48</td>
      <td>Timestamp background color</td>
    </tr>
    <tr>
      <td>--cs-timestamp-color</td>
      <td>#044ba7</td>
      <td>#def1ff</td>
      <td>Timestamp color</td>
    </tr>
    <tr>
      <td>--cs-timestamp-border-radius</td>
      <td colspan="2">5px</td>
      <td>Timestamp border radius</td>
    </tr>
    <tr>
      <td>--cs-timestamp-width</td>
      <td colspan="2">auto</td>
      <td>Timestamp width<br><i>(Automatically adjusted to match the width of the longest timestamp.)</i></td>
    </tr>
    <tr>
      <td>--cs-timestamp-px</td>
      <td colspan="2">5px</td>
      <td>Timestamp padding left and right</td>
    </tr>
    <tr>
      <td>--cs-timestamp-py</td>
      <td colspan="2">5px</td>
      <td>Timestamp padding top and bottom</td>
    </tr>
  </tbody>
</table>
</div>

{{< squiggle >}}

## Javascript 
Control CueSync using the JavaScript functions and custom events listed below.

<br>

### Custom Events
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
      <td>Auto scroll setting is changed</td>
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
      <td>Allow Settings is changed</td>
      <td>true or false</td>
    </tr>
  </tbody>
</table>
</div>

<br>

### Functions
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

## HTML attributes
Configure CueSync directly in your markup using the HTML attributes listed below.

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