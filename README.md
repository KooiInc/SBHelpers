<!-- bundlephobia sometimes breaks! -->
<div align="center">
  <a href="https://bundlephobia.com/package/stackblitzhelpers@latest" rel="nofollow"
    ><img src="https://badgen.net/bundlephobia/min/stackblitzhelpers"></a>
  <a target="_blank" href="https://www.npmjs.com/package/stackblitzhelpers"
    ><img src="https://img.shields.io/npm/v/stackblitzhelpers.svg?labelColor=cb3837&logo=npm&color=dcfdd9"></a>
</div>

# SBHelpers
Some handy helpers for Stackblitz ES and/or HTML projects

### Install the package
`npm install stackblitzhelpers`

### Use in Stackblitz front end project
```javascript
import {logFactory /*, ...[see 'exposed as']*/} 
  from "https://unpkg.com/stackblitzhelpers@latest/index.browser.js";
```
> [!NOTE]
> `index.browser.bundled.js` equals `index.browser.js`. It's there for legacy.

### Use as standalone script
```html
<script src="https://unpkg.com/stackblitzhelpers@latest/Bundle/sbhelpers.script.min.js"></script>
<script>
  const {logFactory $ /*, ...[see 'exposed as']*/} = SBHelpers;
  // ... 
</script>
```

### Use in Stackblitz plain ecmascript project ('javascript blank project')
![image](https://github.com/KooiInc/SBHelpers/assets/836043/f1e33a6a-48d4-4d58-acb3-7150cd77806e)

Type 'stackblitzhelpers' in the DEPENDENCIES input field and press `<ENTER>`.

Next use 
```javascript
import {logFactory /*, ...[see 'exposed as'] */} from "stackblitzhelpers"
```
### The library includes the following packets:

- [jqlmodule](https://www.npmjs.com/package/jqlmodule): a JQuery alike DOM manipulation library. 
  - Exposed as `$`
- [jsregexhelper](https://www.npmjs.com/package/jsregexphelper): a library to create readable ECMAScript regular expressions (multiline, commenting possible)
  - Exposed as `regexhelper`
- [ticktock-es](https://www.npmjs.com/package/ticktock-es): a library to fiddle extensively with ECMAScript Dates
  - Exposed as `$D`

### For printing/logging to screen
- `logFactory`: logfactory logs string(s) to screen within a formatted unordered listing (`<ul>`). It exposes 2 methods
  - `log([string1],[string2] ... [stringX])`
    
    print the parameter strings.
    
    <b>Note</b>: inserting `!!` in a parameter string (e.g. `!!<div>some text</div>`) will print it as a header (no list item style).
  - `logTop`: same as `log`, but the string(s) will be prependend (inserted on top op the existing logged lines).

### Automatic style creation
The `SBHelpers` library supplies a default (css-)style for Stackblitz Ecmascript projects. 
Style may be edited using `$.editCssRules`.

### [Example project @Stackblitz](https://stackblitz.com/edit/js-eukuys?file=index.js)

## Notes
- Stackblitz seems to rewrite links with `target="_top"` (to `target="_blank"`). 
  Version >= 0.3.6 of this library catches and fixes this. For links to `_top`, 
  use `target="_top"` OR `class="internalLink"` OR the data-attribute `data-top`.
