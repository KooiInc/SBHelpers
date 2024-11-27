# SBHelpers
Some handy helpers for Stackblitz ES/html projects

### Install the package
`npm install stackblitzhelpers`

### Use in the browser (or in Stackblitz front end project)
`import {$, logFactory, ...[see 'exposed as']} from "https://cdn.jsdelivr.net/gh/KooiInc/SBHelpers@main/index.browser.bundled.js";`

### Use in Stackblitz plain ecmascript project ('javascript blank project')
Type 'stackblitzhelpers' in the DEPENDENCIES input field

![image](https://github.com/KooiInc/SBHelpers/assets/836043/f1e33a6a-48d4-4d58-acb3-7150cd77806e)

### The library includes the following packets:

- [jqlmodule](https://www.npmjs.com/package/jqlmodule): a JQuery alike DOM manipulation library. 
  - Exposed as `$`
- [jsregexhelper](https://www.npmjs.com/package/jsregexphelper): a library to create readable ECMAScript regular expressions (multiline, commenting possible)
  - Exposed as `regexhelper`
- [es-date-fiddler](https://www.npmjs.com/package/es-date-fiddler): a library to fiddle extensively with ECMAScript Dates
  - Exposed as `$D`
- [intl-dateformatter](https://www.npmjs.com/package/intl-dateformatter): a library to format an EcmaScript `Date` instance with a template string and using the [Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) namespace
  - Exposed as `dtFormat`

### For printing/logging to screen
- `logFactory`: logfactory logs string(s) to screen within a formatted unordered listing (`<ul>`). It exposes 2 methods
  - `log([string1],[string2] ... [stringX])`
    
    print the parameter strings.
    
    <b>Note</b>: inserting `!!` in a parameter string (e.g. `!!<div>some text</div>`) will print it as a header (no list item style).
  - `logTop`: same as `log`, but the string(s) will be prependend (inserted on top op the existing logged lines).

### Automatic style creation
The `SBHelpers` library supplies a default (css-)style for Stackblitz Ecmascript projects. Style may be edited using `$.setStyle`.

### [Example project @Stackblitz](https://stackblitz.com/edit/js-eukuys?file=index.js)

## Notes
- Stackblitz seems to rewrite links with `target="_top"` (to `target="_blank"`). 
  Version >= 0.3.6 of this library catches and fixes this. For links to `_top`, 
  use `target="_top"` OR `class="internalLink"` OR the data-attribute `data-top`.
