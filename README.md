# SBHelpers
Some handy helpers for Stackblitz ES/html projects


### Install the package
`npm install stackblitzhelpers`

### Use in the browser
`import {$, logFactory, ...[see 'exposed as']} from "https://cdn.jsdelivr.net/gh/KooiInc/SBHelpers@main/index.browser.min.js";`

### The library includes the following packets:

- [jqlmodule](https://www.npmjs.com/package/jqlmodule): a JQuery alike DOM manipulation library. 
  - Exposed as `$`
- [protoxt](https://www.npmjs.com/package/protoxt): a library to extend objects without pollution the global namespace - using `symbol`. 
  - Exposed as `extendSymbolic`
- [jsregexhelper](https://www.npmjs.com/package/jsregexphelper): a library to create readable EcmaScript regular expressions (multiline, commenting possible)
  - Exposed as `regexhelper`
- [datefiddler](https://www.npmjs.com/package/datefiddler): a library to fiddle with dates (add/subtract units from a date)
  - Exposed as `xDate`
- [intl-dateformatter](https://www.npmjs.com/package/intl-dateformatter): a library to format an EcmaScript `Date` instance with a template string and using the [Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) namespace
  - Exposed as `dtFormat`
- [datediffcalculator](https://www.npmjs.com/package/datediffcalculator): a library to calculate the difference between two dates in years, months, days etc.
  - Exposed as `dtDiffCalc`

### For printing/logging to screen
- `logFactory`: logfactory logs string(s) to screen within a formatted unordered listing (`<ul>`). It exposes 2 methods
  - `log([string1],[string2] ... [stringX])`
    
    print the parameter strings.
    
    <b>Note</b>: inserting `!!` in a parameter string (e.g. `!!<div>some text</div>`) will print it as a header (no list item style).
  - `logTop`: same as `log`, but the string(s) will be prependend (inserted on top op the existing logged lines).

### Automatic style creation
The `SBHelpers` library supplies a default (css-)style for Stackblitz Ecmascript projects. Style may be edited using `$.setStyle`.

### [Example project @Stackblitz](https://stackblitz.com/edit/js-eukuys?file=index.js)
