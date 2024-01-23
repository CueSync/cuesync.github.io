---
layout: docs
title: Specs
toc: true
---

## Specs
  
### CSS custom properties
Customize CueSync by changing CSS custom properties
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
      <td>--mq-bg</td>
      <td>#f8f9fa</td>
      <td>Background color</td>
    </tr>
    <tr>
      <td>--mq-hover-bg</td>
      <td>#e9ecef</td>
      <td>Hover background color</td>
    </tr>
    <tr>
      <td>--mq-color</td>
      <td>#212529</td>
      <td>Color</td>
    </tr>
    <tr>
      <td>--mq-hover-color</td>
      <td>#000</td>
      <td>Hover color</td>
    </tr>
    <tr>
      <td>--mq-border-width</td>
      <td>0</td>
      <td>Border width</td>
    </tr>
    <tr>
      <td>--mq-border-style</td>
      <td>solid</td>
      <td>Border style</td>
    </tr>
    <tr>
      <td>--mq-border-color</td>
      <td>transparent</td>
      <td>Border color</td>
    </tr>
    <tr>
      <td>--mq-border-radius</td>
      <td>.375rem</td>
      <td>Border radius</td>
    </tr>
    <tr>
      <td rowspan="2">--mq-padding-y</td>
      <td>1rem <i>(for direction left and right)</i></td>
      <td rowspan="2">Padding top and bottom</td>
    </tr>
    <tr>
      <td>0 <i>(for direction top and bottom)</i></td>
    </tr>
    <tr>
      <td rowspan="2">--mq-padding-x</td>
      <td>0 <i>(for direction left and right)</i></td>
      <td rowspan="2">Padding left and right</td>
    </tr>
    <tr>
      <td>1rem <i>(for direction top and bottom)</i></td>
    </tr>
    <tr>
      <td>--mq-font-size</td>
      <td>1rem</td>
      <td>Font size</td>
    </tr>
    <tr>
      <td>--mq-font-family</td>
      <td>sans-serif</td>
      <td>Font family</td>
    </tr>
    <tr>
      <td>--mq-animation-duration</td>
      <td>15s</td>
      <td>Animation duration <i>(Automatically set according to the dimensions of the content and specified speed, default speed is 100)</i></td>
    </tr>
    <tr>
      <td>--mq-item-gap</td>
      <td>1rem</td>
      <td>Gap between multiple items <i>(In multiple items variant)</i></td>
    </tr>
  </tbody>
</table>
</div>

{{< squiggle >}}

### Javascript functions
<div class="table-responsive">
<table class="table table-bordered rounded-5">
  <thead>
    <tr>
      <th>function</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
   <tr>
      <td>refresh</td>
      <td>Reconfigures a CueSync instance. (Useful in reconfiguring non-visible elements when they become visible)</td>
    </tr>
    <tr>
      <td>dispose</td>
      <td>Destroys an element’s instance. (Removes stored data on the DOM element)</td>
    </tr>
    <tr>
      <td>getInstance</td>
      <td>Static method which allows you to get the CueSync instance associated with a DOM element.</td>
    </tr>
    <tr>
      <td>getOrCreateInstance</td>
      <td>Static method which allows you to get the CueSync instance associated with a DOM element, or create a new one in case it wasn’t initialized.</td>
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
        <td>data-mq-direction</td>
        <td>direction</td>
        <td>Sets the scrolling direction of the CueSync.</td>
      </tr>
      <tr>
        <td>data-mq-speed</td>
        <td>speed</td>
        <td>Sets the scrolling speed of the CueSync.</td>
      </tr>
    </tbody>
  </table>
</div>