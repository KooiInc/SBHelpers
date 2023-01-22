import $ from "jqlmodule";
defaultStyling();
export { $, logFactory, defaultStyling };

function logFactory() {
  const ul = $(`<ul/>`);
  const head = t => `${t}`.startsWith(`!!`) ? ` class="head"` : ``;
  const logItem = top => t => ul.append(
    `<li${head(t)}>${`${t}`.replace(/^!!/, ``)}</li>`,
    top ? `afterbegin` : `beforeend` ) ;
  return {
    log: (...txt) => txt.forEach( logItem() ),
    logTop: (...txt) => txt.forEach( logItem(true) ), };
}

function defaultStyling() {
  [
    [`body`, {font: `normal 14px/17px verdana, arial`, margin: `1rem`,}],
    [`code`, {
      color: `green`,
      backgroundColor: `#eee`,
      padding: `3px`,
      fontFamily: `'Courier New', Courier, monospace`,
    }],
    [`code.codeblock`, {display: `block`, padding: `6px`, border: `1px solid #999`, margin: `0.5rem 0`}],
    [`h3`, {marginTop: `1.5rem`}],
    [`.thickBorder`, {border: `5px solid green`, borderWidth: `5px`, padding: `0.5rem`, display: `inline-block`}],
    ["a.ExternalLink", {
      textDecoration: `none`,
      color: `blue`,
      backgroundColor: `#EEE`,
      padding: `3px`,
      'font-weight': `bold`
    }],
    [`.cmmt`, {color: `#888`}],
    [`.hidden`, {display: `none`}],
    [`.attention`, {color: `red`, fontSize: `1.2em`, fontWeight: `bold`}],
    [`li`, { listStyle: `'\\2713'`, paddingLeft: `6px`, margin: `0.5rem 0 0 -1.2rem`, fontFamily: `monospace` }],
    [`li.head`, {
      listStyleType: `none`,
      fontWeight: `bold`,
      marginTop: `0.8rem`,
      marginBottom: `-0.2rem`,
      fontFamily: `revert`
    }],
    [`.err`, {fontStyle: `italic`, color: `red`}]
  ].forEach( ( styleDeclaration ) => $.setStyle(...styleDeclaration) );
}