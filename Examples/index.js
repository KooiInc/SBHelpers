// import relevant items
import {
  $, // <= JQx module (see https://codeberg.org/KooiInc/JQx)
  regexhelper as createRE,
  logFactory,
  $D,
 } from "../Bundle/index.min.js";

const { log, logTop } = logFactory(); // initialize logging (to screen)
const {DIV, button: $BUTTON} = $; // most html elements can be created with a function

// set page styling
initStyling();

// wrap logging within a container element
$.div({class: "container"}).append($(`#log2screen`)).render;

// tryouts
const reDemo = createRE`
    ^[\p{L}]              //=> always start with a letter
    [\p{L}_\.#\-\d+~=!]+  //=> followed by letters including _ . # - 0-9 ~ = or !
    ${[...'gui']}         //=> flags ([g]lobal, case [i]nsensitive, [u]nicode)`;

// use for ticktock example
const dateFormat = "{=> <b>Result</b>: } WD dd MM yyyy hh:mmi:ss (tz)";
const xDateEx = $D({locale: `nl`, timeZone: `Europe/Amsterdam`})
  .addYears(5).add(`23 days, 20 hours`);

log(
   // styling
   toHeader(`div`,
     `Did the styling (`,
     $.code(`$.editCssRules`),
     ` and default from `,
     $.code(`jqlmodule`),
     ` work?`
   ),
   $.div($.code(`Code style`), ` works ...`),
   $.div($.code({class: "codeblock"}, `... codeblock style too <span class="cmmt">// comment</span>`)),
   $.span({class: "err"}, `... error style too`),

   // regex
   toHeader(`div`, "Is regexhelper (exposed as <code>createRE</code>) available?"),

   // create a regExp example code block
   `<code class="codeblock">createRE\`\n` +
     `  ^[\\p{L}]             ` +
      `<span class="cmmt">//=> always start with a letter</span>\n` +
     `  [\\p{L}_\\.#\\-\\d+~=!]+ ` +
      `<span class="cmmt">//=> followed by letters including _ . # - 0-9 ~ = or !</span>\n` +
     `  \${[...\`gui\`]}        ` +
      `<span class="cmmt">//=> flags ([g]lobal, case [i]nsensitive, [u]nicode)</span>\n\`</code>` +
     `<b>=&gt; Result</b>: <code>${reDemo}</code>`,

  // ticktock availability
  toHeader($.div, `Is <code>$D</code> (ticktock-es) available?`),

  // create a ticktock example code block
  `<code class="codeblock">const dateFormat = "{=> &lt;b>Result&lt;/b>: } ` +
      `WD dd MM yyyy hh:mmi:ss (tz)";\n`+
     `const later = $D({locale: "nl", timeZone: "Europe/Amsterdam"})\n` +
     `  .addYears(5).add("23 days, 20 hours");\n` +
     `later.format(dateFormat); ` +
     `<span class="cmmt">// <= see Result following this block</span></code>` +
      `${xDateEx.format(dateFormat)}`,

  // ticktok usage
  toHeader(DIV, "Can we calculate date differences using <code>$D</code>?"),
  $.div(
    {class: "normal"},
    `...diff until `,
    $.code(`$D.now.differenceFrom(new Date($D.now.year + 1, 0 ,1, 0, 0, 0))`)),

  `<span id="showNwYear"></span>`,
);

// create a timer from factory
const untilNwYearTimer = countDownUntil($(`#showNwYear`), new Date($D().year + 1, 0 ,1, 0, 0, 0));

// start/stop button for timer
// note: we add two handlers to the button: one to stop the counter, one to display a message
const bttnClickHandling = [
  (_, self) => {
    const shouldStop = self.getData(`should`).startsWith(`Stop`);
    self.data.set({should: shouldStop ? `Restart countdown` : `Stop countdown`});
    return shouldStop && untilNwYearTimer.stop || untilNwYearTimer.start;
  },
  (_, self) => $.Popup.show({
    content: `Next new year countdown ${
      self.data.get(`should`).startsWith(`Stop`) ? `started!` : `stopped`}`,
    closeAfter: 2 })
];

// create a div with button
const bttnDiv = DIV(
  {data: {header: 1}, class: `normal`},  `Sure: &nbsp;&nbsp;`,
  $BUTTON({data: {should: `Start`}}).on(`click`, ...bttnClickHandling)
);

log(
  $.div(
  {data: {header: 1}}, // signifies this must be printed without a list-style and class .head
  `Can we handle (and trigger) a button using `,
  $.div(
      $.code(`\$("&lt;button ...>").on(...).trigger(...)?`),
      bttnDiv
    )
  )
);

// start countdown
$(`[data-should]`).trigger("click");

// add links and used code
log(
  // combine $[tagName] and element creation from string
  toHeader($.h3, `Modules included in the stackblitzhelpers module`), `
  <div class="normal">
    This module encapsulates a few other modules/libraries. Each can be found on 
    <a target="_blank" href="https://www.npmjs.com/~kooiinc?activeTab=packages">NPM</a> or 
    <a target="_blank" href="https://codeberg.org/KooiInc">Codeberg</a>.
    <ul>
      <li>
        <a target="_blank" href="https://www.npmjs.com/package/jqx-es">JQx</a> (JQx/$):<br>
        a <b class="green">JQ</b>uery-alike module to <i>retrieve</i>, <i>create</i>, 
        <i>modify</i>, <i>style</i> or <i>manipulate</i> (collections of) HTML 
        elements in your HTML document.
      </li>
      <li>
        <a target="_blank" href="https://www.npmjs.com/package/ticktock-es"
        >ticktock-es</a>:<br> 
        a module to extensively manipulate (and/or format) ECMAScript Dates.
      </li>
      <li>
        <a target="_blank" href="https://www.npmjs.com/package/jsregexphelper"
        >jsregexhelper</a>:<br>
        a small library to create readable ECMAScript regular expressions (multiline, 
        commenting possible).
      </li>
    </ul>
  </div>`,
  toHeader($.h3, `The code used for this page`),
  await codeElem(), // <= retrieve element with current code from index.js
  $.div({class: "spacer", data: {header: 1}}),
);

// highlight code
hljs.highlightAll(`javascript`);

// add log messages to top
logTop(
  toHeader($.h2,
    `Testing it all (this log line and the lines above it are `,
    $.i(`prepended`),
    ` (using `,
    $.code(`logTop`),
    `)`
  ),
  $.a({
    data: {header: 1},
    class: "ExternalLink arrow",
    target: "_blank",
    href: "https://kooiinc.codeberg.page/JQx/Resource/Docs/",
    text: "JQx ($) full documentation"
  }),
  $.a({
    data: {header: 1},
    class: "ExternalLink arrow",
    target: "_blank",
    href: "https://codeberg.org/KooiInc/HtmlHelpers",
    text: "Codeberg repository"
  }),
);

// retrieve used code
async function codeElem() {
  return await fetch(`./index.js`)
    .then(response => response.text())
    .then(code => $.pre(
        {class: "codebox"},
        $.code({class: "hljs language-javascript"}, code.replace(/</g, `&lt;`))
      )
    );
}

// count down factory
function countDownUntil(displayElement, until) {
  let to;
  const redo = () =>
    displayElement
      .clear()
      .html(`<i>${$D.now.differenceTo(until).full}</i>`);
  const run = (stop = false) => {
   clearTimeout(to);
   return stop || ( redo(), to = setTimeout(run, 1000) );
  };

  return { get stop() { return run(true); }, get start() { return run(); } };
}

function toHeader(tag, ...elems){
  return ($.IS(tag, Function) ? tag : $[tag])({data: {header: 1}}, ...elems);
}

// page styling (using $.editCssRules)
function initStyling() {
  // style rules are stored in the JQL style element (head)style#JQLStylesheet
  $.editCssRules(
    `:root {
      --grey-default: rgba(112, 92, 92, 0.9);
      --code-color: #555;
    }`,
    `body {
      margin: 2rem;
      overflow-x: hidden;
    }`,
    `.container {
      width: 100vw;
      height: 100vh;
      margin: 0;
      inset: 0;
      position: absolute;
      
      ul#log2screen {
        max-width: 40vw;
        margin: 4rem auto;
        
        @media(width <= 1600px) {
          max-width: 60vw;
        }
      }
    }`,
    `div.spacer {
      height: 2rem;
    }`,
    `code:not(.codeblock, .hljs) {
      background-color: rgb(227, 230, 232);
      color: var(--code-color);
      padding: 1px 2px;
      display: inline-block;
      margin: 1px 0;
      border-radius: 4px;
      font-style: normal;
      font-weight: normal;
     }`,
    `code.codeblock { 
      margin: 0.5rem 0px 0.5rem;
      color: var(--code-color);
      border-radius: 4px;
      box-shadow: 1px 2px 8px #777;
      width: 100%;
     }`,
    `pre.codebox {
      max-height: 40vh;
      overflow-y: auto;
      border-radius: 8px;
      box-shadow: 1px 2px 8px #777;
    }`,
    `h2 {font-size: 1.1rem; line-height: 1.4rem}`,
    `li.head {
      color: #777 !important;
      div:first-child { margin: 0; }
    }`,
    `li.head h2 {
      lineHeight: 1.7rem;
      font-size: 1.1rem;
      code {
        font: revert;
      }
    }`,
    `li.head p {
      margin: 0;
    }`,
    `li.head div.normal {
      font-weight: normal;
      margin-top: 5px;
    }`,
    `#log2screen li div.normal li {
      list-style: none;
      margin-left: -3em;
    }`,
    `a.ExternalLink.arrow:hover::after { 
      content: ' Opens in new tab/window';
      fontSize: 0.7rem;
      position: absolute;
      zIndex: 2;
      display: inline-block;
      padding: 3px 6px;
      border: 1px solid #777;
      background-color: #FFF;
      box-shadow: 1px 1px 5px #777;
      margin: 1rem 0 0 -1rem;
      color: #444;
    }`,
    `#showNwYear i { 
      color: #b34b44;
      font-weight: bold;
      margin-top: 1rem;
      display: inline-block;
      padding: 5px;
      background-color: #FFFFAA;
    }`,
    `#showNwYear:before { 
      content: 'Sure! Until next new year\\1F389 lasts:';
      color: #777;
      display: block;
    }`,
    `[data-should] {
      margin-top: 0.3rem;
    }`,
    `[data-should]:before { 
      content: attr(data-should);
    }`,
  );
}
