---
layout: docs
title: Examples
aliases:
  - "/examples/"
  - "/2.0/examples/"
toc: true
description: CueSync is a JavaScript library that simplifies the integration of interactive transcripts into your media projects. Explore different ways to use CueSync with real examples. Each example shows a variation of the interactive transcript along with the code you need to implement it.
---

## Getting Started

Assuming you've added your media (audio or video) to your page, have the transcript ready, and have correctly included 
the required CueSync JavaScript file, you're ready to use the component.

Simply add a `<cue-sync>` element with the `transcript-path` attribute **set to the path of your transcript file**, 
and the `media` attribute **set to a CSS selector that matches your media element (e.g. #videoId or .audio-player)**.

```html
<!-- Video -->
<video id="natGeoVideo" controls style="width: 100%; max-width: 500px;">
    <source src="/assets/videos/natgeo.mp4" type="video/mp4">
    Your browser does not support HTML video.
</video>

<!-- Transcript -->
<cue-sync transcript-path="/assets/transcripts/natgeo.vtt" 
          media="#natGeoVideo"
          style="height: 400px;"></cue-sync>
```

That’s it — your interactive transcript is ready to go!

Hit play and watch the transcript come to life, elegantly highlighting each phrase (Cue) as it's spoken.
Click on any Cue to jump to that moment in the media.

Video

<video id="natGeoVideo" controls style="width: 100%; max-width: 500px;">
    <source src="/assets/videos/natgeo.mp4" type="video/mp4">
    Your browser does not support HTML video.
</video>

Transcript

<cue-sync transcript-path="/assets/transcripts/natgeo.vtt" 
          media="#natGeoVideo" 
          style="height: 400px;"></cue-sync>

{{< squiggle >}}

## Transcript Formats (VTT and SRT)
Before exploring the different options available with CueSync, it's important to understand the supported 
transcript formats.

CueSync supports two common transcript file formats: `VTT (WebVTT)` and `SRT (SubRip)`. These formats define 
the timing and text of each spoken segment, allowing CueSync to sync them precisely with your media.

It is important to follow their structure strictly, or the transcript may not render correctly.

<br>

### VTT (WebVTT)
VTT is a flexible and modern format, commonly used for captions and interactive transcripts on the web.

**Basic structure:**
* Begins with **WEBVTT** **(CueSync works even if this line is omitted)**
* Each block contains a **timestamp** and **text**
* A **cue number** is optional
* Timestamps use a **period (.)** as the decimal separator (e.g., **00:01:00.500**)
* Language metadata (e.g., `Language: English`) is optionally supported by CueSync for language selection in 
multilingual transcripts
* CueSync currently **does not support styling or positioning lines** — only timing and text are allowed

```text
WEBVTT
Language: Hindi

00:00:02 --> 00:00:03
कीट

00:00:03 --> 00:00:06
खुरदरे, गूदेदार

00:00:06 --> 00:00:09
ओह, वह मुलायम है
```

<br>

### SRT (SubRip)
SRT is a simpler and widely used subtitle format, especially in video production and distribution.

**Basic structure:**
* Each block starts with a **cue number** **(CueSync works even if this is omitted)**
* Timestamps use a **comma (,)**  as the decimal separator (e.g., **00:01:00,500**)
* Each timestamp line is followed by the text to display
* **Metadata is not officially supported** — however, if a `Language:` line is included, **CueSync will read it and enable language selection**

```text
1
00:00:02 --> 00:00:03
bugs

2
00:00:03 --> 00:00:06
give me the scaly the squishy

3
00:00:06 --> 00:00:09
oh she's fluffy
```

{{< squiggle >}}

## Layout
CueSync offers two layout options for displaying the transcript: `stacked` and `paragraph`, with `stacked` being 
the default. 

Users can switch between these layouts at any time from the Settings panel.

As a developer, you can also set a default layout for your users using the `layout` attribute on the 
`<cue-sync>` element. This attribute accepts the values `'stacked'` or `'paragraph'`, respectively, to choose 
the desired layout.

{{< example codeId="code1" >}}
<!-- Video -->
<video id="natGeoVideo2" controls style="width: 100%; max-width: 500px;">
    <source src="/assets/videos/natgeo.mp4" type="video/mp4">
    Your browser does not support HTML video.
</video>

<!-- Transcript -->
<cue-sync transcript-path="/assets/transcripts/natgeo.vtt" 
          media="#natGeoVideo2" 
          layout="paragraph"
          style="height: 400px;"></cue-sync>
{{< /example >}}

<br><br>

## Timestamps
By default, CueSync displays timestamps for each segment of the transcript. Users can show or hide the timestamps 
at any time from the Settings panel.

As a developer, you can control the visibility of timestamps for your users by using the `show-timestamp` attribute 
on the `<cue-sync>` element. This attribute accepts `'true'` to show timestamps and `'false'` to hide them.

{{< example codeId="code2" >}}
<!-- Video -->
<video id="natGeoVideo3" controls style="width: 100%; max-width: 500px;">
    <source src="/assets/videos/natgeo.mp4" type="video/mp4">
    Your browser does not support HTML video.
</video>

<!-- Transcript -->
<cue-sync transcript-path="/assets/transcripts/natgeo.vtt" 
          media="#natGeoVideo3" 
          show-timestamp="false"
          style="height: 400px;"></cue-sync>
{{< /example >}}

<br><br>

## Auto Scroll
By default, CueSync enables auto-scroll, which automatically brings the currently spoken phrase (Cue) 
into view as the media plays. Users can turn this feature on or off at any time from the Settings panel.

As a developer, you can control the default behavior using the `auto-scroll` attribute on the `<cue-sync>` 
element. This attribute accepts `'true'` to enable auto-scroll and `'false'` to disable it.

{{< example codeId="code3" >}}
<!-- Video -->
<video id="natGeoVideo4" controls style="width: 100%; max-width: 500px;">
    <source src="/assets/videos/natgeo.mp4" type="video/mp4">
    Your browser does not support HTML video.
</video>

<!-- Transcript -->
<cue-sync transcript-path="/assets/transcripts/natgeo.vtt" 
          media="#natGeoVideo4" 
          auto-scroll="false"
          style="height: 400px;"></cue-sync>
{{< /example >}}

<br><br>

## Theme
CueSync offers three theme options: `auto`, `light`, and `dark`, with `auto` being the default. 
The `auto` theme adapts to the user's device settings, switching between light or dark mode accordingly.

Users can switch between these themes at any time from the Settings panel.

As a developer, you can set a default theme for your users using the `theme` attribute on the `<cue-sync>` element. 
This attribute accepts the values `'auto'`, `'light'`, or `'dark'`.

{{< example codeId="code4" >}}
<!-- Video -->
<video id="natGeoVideo5" controls style="width: 100%; max-width: 500px;">
    <source src="/assets/videos/natgeo.mp4" type="video/mp4">
    Your browser does not support HTML video.
</video>

<!-- Transcript -->
<cue-sync transcript-path="/assets/transcripts/natgeo.vtt" 
          media="#natGeoVideo5" 
          theme="light"
          style="height: 400px;"></cue-sync>
{{< /example >}}

<br><br>

## Settings
The Settings feature is enabled by default in CueSync, allowing users to switch themes, toggle auto-scroll, 
change layouts, show or hide timestamps, and select transcript languages.

If you prefer not to offer these customization options, you can disable the Settings feature by using the 
`allow-settings` attribute on the `<cue-sync>` element.  This will prevent the settings button from appearing 
in the toolbar.

This attribute accepts `'true'` to enable settings and `'false'` to disable it.

{{< example codeId="code5" >}}
<!-- Video -->
<video id="natGeoVideo6" controls style="width: 100%; max-width: 500px;">
    <source src="/assets/videos/natgeo.mp4" type="video/mp4">
    Your browser does not support HTML video.
</video>

<!-- Transcript -->
<cue-sync transcript-path="/assets/transcripts/natgeo.vtt" 
          media="#natGeoVideo6" 
          allow-settings="false"
          layout="paragraph"
          show-timestamp="false"
          style="height: 400px;"></cue-sync>
{{< /example >}}

<br><br>

## Multilingual Transcripts
If you have transcripts in multiple languages for a media element, you can provide the paths to each 
transcript file **(comma-separated)** in the `transcript-path` attribute. The Settings panel will automatically 
display an additional option, allowing users to select or hide any language they prefer.

CueSync determines the language name from the `Language:` metadata in each `VTT` or `SRT` file. If this metadata 
is missing, the language selection may not appear in the Settings panel.

To ensure a smooth multilingual experience, always include the `Language:` field at the top of each `VTT` or `SRT` 
file (e.g., Language: English, Language: Hindi, etc.).

{{< example codeId="code6" >}}
<!-- Video -->
<video id="natGeoVideo7" controls style="width: 100%; max-width: 500px;">
    <source src="/assets/videos/natgeo.mp4" type="video/mp4">
    Your browser does not support HTML video.
</video>

<!-- Transcript -->
<cue-sync transcript-path="/assets/transcripts/natgeo.vtt, /assets/transcripts/natgeo_hindi.vtt" 
          media="#natGeoVideo7"
          style="height: 400px;"></cue-sync>
{{< /example >}}

<br><br>

## Custom Theming

You can customize the appearance of CueSync by modifying the <a href="/{{< docs_version >}}/specs/#css-custom-properties">CSS custom properties listed here</a>.

{{< example codeId="code7" >}}
<style>
.custom-cuesync {
 --cs-border-color: #aa076b;
 --cs-border-radius: 20px;
 
 --cs-toolbar-bg: #aa076b;
 --cs-toolbar-color: #fff;
 
 --cs-transcript-bg: #aa076b;
 --cs-transcript-color: #fff;

 --cs-cue-hover-bg: #e47aaf;
 --cs-cue-hover-color: #000;
 --cs-cue-active-bg: #ffd75e;
 --cs-cue-active-color: #aa076b;
 --cs-cue-highlight-color: #ffd75e;
 
 --cs-timestamp-bg: #ffd75e;
 --cs-timestamp-color: #aa076b;
 --cs-timestamp-border-radius: 20px;
}
</style>

<!-- Video -->
<video id="natGeoVideo8" controls style="width: 100%; max-width: 500px;">
    <source src="/assets/videos/natgeo.mp4" type="video/mp4">
    Your browser does not support HTML video.
</video>

<!-- Transcript -->
<cue-sync class="custom-cuesync" transcript-path="/assets/transcripts/natgeo.vtt, /assets/transcripts/natgeo_hindi.vtt" 
          media="#natGeoVideo8"
          style="height: 400px;"></cue-sync>
{{< /example >}}

<br><br>

## Javascript
The `<cue-sync>` web component is designed to work declaratively via HTML attributes, but it also exposes a 
few useful ways to interact with it via JavaScript.

<br>

### Accessing the Component
You can select the element using `document.querySelector()` (or any standard DOM method).

```javascript
const cueSync = document.querySelector('cue-sync');
```

<br>

### Attributes You Can Modify Dynamically
<a href="/{{< docs_version >}}/specs/#html-attributes">HTML attributes listed here</a> can be updated via 
JavaScript using 'setAttribute()'.

```javascript
const cueSync = document.querySelector('cue-sync');

cueSync.setAttribute('layout', 'paragraph');
cueSync.setAttribute('theme', 'dark');
```

<br>

### Custom Events
CueSync dispatches <a href="/{{< docs_version >}}/specs/#custom-events">custom events listed here</a> 
whenever key attributes change.

```javascript
const cueSync = document.querySelector('cue-sync');

cueSync.addEventListener('layout-changed', e => {
  console.log('Layout changed to:', e.detail.newValue);
});
```

<br>

### Public Functions
#### redrawTime()
Recalculates the width of the timestamp column. Useful if fonts or styles change.

```javascript
const cueSync = document.querySelector('cue-sync');

cueSync.redrawTime();
```

<br>

### Please Note
* Internal state and rendering are handled automatically based on attributes.
* You don't need to call an initialization function — the component sets itself up when added to the DOM.
* Shadow DOM is used (`mode: 'open'`), so you can access `cueSync.shadowRoot` if absolutely necessary, though 
this is not recommended.
