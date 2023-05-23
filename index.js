import $ from "jqlmodule";
import { addExtension as extendSymbolic } from "protoxt";
import dateFiddlerFactory from "datefiddler";
import dtFormat from "intl-dateformatter";
import dateDiffFactory from "datediffcalculator";
import regexhelper from "jsregexphelper";
const xDate = dateFiddlerFactory(dateFiddlerExtentions);
const dtDiffCalc = dateDiffFactory();
setDefaultStyling();
fixSBLinks2TopProblem();
export { $, logFactory, regexhelper, xDate, dtFormat, dtDiffCalc, extendSymbolic };

function fixSBLinks2TopProblem() {
  // fix for stackblitz rewriting hrefs with target _top (see README)
  console.info(`✔ Stackblitz rewrites links to _top. The 'stackblitzhelpers' module fixed it.`);
  document.addEventListener(`click`, evt => {
    if (evt.target.href) {
      if (evt.target.dataset.top || evt.target.classList.contains(`internalLink`)) {
        return top.location.href = evt.target.href;
      }
    }
    return true;
  });
}

function logFactory() {
  const logContainer = $(`<ul id="log2screen"/>`);
  const createItem = t => $(`${t}`.startsWith(`!!`) ? `<li class="head">` : `<li>`);
  const logPosition = {top: logContainer.prepend, bottom: logContainer.append};
  const isStringOrNumber = v => [String, Number].find(type => Object.getPrototypeOf( v ?? ``)?.constructor === type);
  const cleanContent = content => !isStringOrNumber(content) ? JSON.stringify(content) : content;
  const addContent = content => createItem(content).append( $(`<span>${content.replace(/^!!/, ``)}<span>`) );
  const logItem = (pos = `bottom`) => content => logPosition[pos]( addContent(cleanContent(content)) );
  return {
    log: (...txt) => txt.forEach( logItem() ),
    logTop: (...txt) => txt.forEach( logItem(`top`) ), };
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

function setDefaultStyling() {
  $.editCssRules(...[
    `body { 
      font: normal 14px/17px  system-ui, sans-serif;
      margin: 1rem;
     }`,
    `code {
      color: green
      background-color: #eee;
      padding: 2px;
      font-family: monospace;
    }`,
    `code.codeblock {
      display: block;
      padding: 6px;
      border: 1px solid #999;
      margin: 0.5rem 0; 
      background-color: #eee;
      white-space: pre-wrap;
    }`,
    `h3 {marginTop: 1.5rem;}`,
    `.thickBorder {
      border: 5px solid green;
      borderWidth: 5px;
      padding: 0.5rem;
      display: inline-block; 
    }`,
    `a.ExternalLink {
      text-decoration: none;
      color: rgb(0, 0, 238);
      background-color: #EEE;
      padding: 3px;
      font-weight: bold;
    }`,
    `.cmmt {
      color: #888;
    }`,
    `.hidden {display: none;}`,
    `.attention {color: red; font-size: 1.2em; font-weight: bold;}`,
    `#log2screen li { 
      listStyle: '\\2713'; 
      paddingLeft: 6px; 
      margin: 0.5rem 0 0 -1.2rem; 
      font-family: monospace 
    }`,
    `#log2screen li.head {
      list-style-type: none;
      font-weight: bold;
      margin-top: 0.8rem;
      margin-bottom: -0.2rem;
      font-family: revert;
    }`,
    `.err {fontStyle: italic; color: red; }`,
    `a {text-decoration:none; font-weight:bold;}`,
    `a:hover {text-decoration: underline;}`,
    `a[target]:before, a.internalLink:before, a.externalLink:before {
      color: rgba(0,0,238,0.7);
      font-size: 1.1rem;
      vertical-align: bottom;
     }`,
    `a[target="_blank"]:before, a.externalLink:before {
       content: '\\2197'' '; 
     }`,
    `a[data-top]:before, a.internalLink:before {
      content: '\\21BA'' '; 
     }`,
  ]);
}