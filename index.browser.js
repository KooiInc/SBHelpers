import $ from "https://cdn.jsdelivr.net/gh/KooiInc/JQL@latest/lib/JQLBundle.js";
import extendSymbolic from "https://cdn.jsdelivr.net/gh/KooiInc/ProtoXT@latest/protoxt.min.js";
import dateFiddlerFactory from "https://cdn.jsdelivr.net/gh/KooiInc/datefiddler@latest/datefiddler.min.js";
import dtFormat from "https://cdn.jsdelivr.net/gh/KooiInc/dateformat@latest/index.min.js";
import dateDiffFactory from "https://cdn.jsdelivr.net/gh/KooiInc/DateDifferenceCalculator@latest/index.min.js";
import regexhelper from "https://cdn.jsdelivr.net/gh/KooiInc/RegexHelper@latest/RegexpCreator.min.js";
const xDate = dateFiddlerFactory(dateFiddlerExtentions);
const dtDiffCalc = dateDiffFactory();
export { $, logFactory, regexhelper, xDate, dtFormat, dtDiffCalc, extendSymbolic };

function logFactory() {
  defaultStyling();
  const ul = $(`<ul id="log2screen"/>`);
  const head = t => `${t}`.startsWith(`!!`) ? ` class="head"` : ``;
  const logItem = top => t => ul[top? `prepend` : `append`](
    `<li${head(t)}>${`${t}`.replace(/^!!/, ``)}</li>` ) ;
  return {
    log: (...txt) => txt.forEach( logItem() ),
    logTop: (...txt) => txt.forEach( logItem(true) ), };
}

function dateFiddlerExtentions(instance) {
  const add = toAdd => instance.add(toAdd);
  return {
    nextWeek: _ => add(`7 days`),
    previousWeek: _ => add("-7 days"),
    addWeeks: (n = 1) => add(`${n * 7} days`),
    nextYear: _ => add("1 year"),
    previousYear: _ => add("-1 year"),
    addYears: (n = 1) => add(`${n} years`),
    nextMonth: _ => add("1 month"),
    previousMonth: _ => add("-1 month"),
    addMOnths: (n = 1) => add(`${n} months`),
    tomorrow: _ => add("1 day"),
    yesterday: _ => add("-1 day"),
    addDays: (n = 1) => add(`${n} days`),
  };
}

function defaultStyling() {
  [ `body {
        font: normal 14px/17px verdana, arial; 
        margin: 1rem;
    }`,
    `code {
        color: green;
        background-color: #eee;
        padding: 3px;
        font-family: 'Courier New', Courier, monospace;
    }`,
    `code.codeblock {
        display: block; 
        padding: 6px; 
        border: 1px solid #999;
        margin: 0.5rem 0;
    }`,
    `h3 { 
      marginTop: 1.5rem; 
    }`,
    `.thickBorder {
        border: 5px solid green; 
        border-width: 5px; 
        padding: 0.5rem;
        display: inline-block;
    }`,
    `a.ExternalLink {
        text-decoration: none;
        color: blue;
        background-color: #EEE;
        padding: 3px;
        font-weight: bold;
    }`,
    `.cmmt { 
        color: #888; 
    }`,
    `.hidden {
      display: none; 
    }`,
    `.attention {
        color: red; 
        fontSize: 1.2em; 
        font-weight: bold;
    }`,
    `#log2screen li { 
        list-style: '\\2713'; 
        padding-left: 6px;
        margin: 0.5rem 0 0 -1.2rem;
        fontFamily: monospace 
    }`,
    `#log2screen li.head {
        list-style-type: none;
        font-weight: bold;
        margin-top: 0.8rem;
        margin-bottom: -0.2rem;
        font-family: revert;
    }`,
    `.err { 
        font-style: italic, 
        color: red
    }` ].forEach( rule => $.setStyle(rule) );
}