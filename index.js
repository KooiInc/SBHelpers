import $ from "jqx-es";
import $D from "ticktock-es";
import regexhelper from "jsregexphelper";
setDefaultStyling();
fixSBLinks2TopProblem();
export { $, logFactory, regexhelper, $D, };

function fixSBLinks2TopProblem() {
  // fix for stackblitz rewriting hrefs with target _top (see README)
  /stackblitz/i.test(location.href) &&
    console.info(`✔ Stackblitz rewrites links to _top. The 'stackblitzhelpers' module fixed it.`);
  document.addEventListener(`click`, evt => {
    if (evt.target.href) {
      const ref = evt.target;
      if (ref.dataset.top || ref.classList.contains(`internalLink`) || ref.target === `_top`) {
        return top.location.href = ref.href;
      }
    }
    return true;
  });
}

function logFactory(formatJSON = true) {
  const logContainer = $(`<ul id="log2screen">`).first();
  
  function logItem(top = false) {
    return content => {
      if (content.isJQx) {
        return $.li(
          content.data.get(`header`) ? {class: `head`} : ``, content
        ).renderTo(logContainer, top ? $.at.start : $.at.end);
      }
      
      content = !$.IS(content, String, Number, Symbol) ? tryJSON(content, formatJSON) : String(content);
      const isHead = content.startsWith(`!!`);
      content = isHead ? content.slice(2) : content;
      $.li(isHead ? {class: `head`} : ``, content)
        .renderTo(logContainer, top ? $.at.start : $.at.end);
    };
  }
  const [logLamda, logTopLambda] = [logItem(), logItem(true)];
  
  return {
    log: (...txt) => txt.forEach( logLamda ),
    logTop: (...txt) => txt.forEach( logTopLambda ),
  };
}

function tryJSON(content, formatted) {
  try { return formatted ? `<pre>${JSON.stringify(content, null, 2)}</pre>` : JSON.stringify(content); }
  catch(err) {return `Some [Object object] can not be converted to JSON`}
}

function setDefaultStyling() {
  $.editCssRules(`body{font:normal 14px/17px system-ui,sans-serif;margin:1rem;}`,`li::marker{vertical-align:top;}`,`code{color:green;background-color:#eee;padding:2px;font-family:monospace;}`,`code.codeblock{display:block;padding:6px;border:1px solid #999;margin:0.5rem 0;background-color:#eee;white-space:pre-wrap;}`,`h3{marginTop:1.5rem;}`,`.thickBorder{border:5px solid green;borderWidth:5px;padding:0.5rem;display:inline-block;}`,`a.ExternalLink{text-decoration:none;color:rgb(0,0,238);background-color:#EEE;padding:3px;font-weight:bold;}`,`.cmmt{color:#888;}`,`.hidden{display:none;}`,`.attention{color:red; font-size:1.2em; font-weight:bold;}`,`#log2screen li{listStyle:'\\2713';paddingLeft:6px;margin:0.5rem 0 0 -1.2rem;font-family:monospace}`,`#log2screen li.head{list-style-type:none;font-weight:bold;margin-top:0.8rem;margin-bottom:-0.2rem;font-family:revert;}`,`.err{fontStyle:italic; color:red; }`,`a{text-decoration:none; font-weight:bold;}`,`a:hover{text-decoration:underline;}`,`a[target]:before,a.internalLink:before,a.externalLink:before{color:rgba(0,0,238,0.7);font-size:1.1rem;padding-right:2px;vertical-align:baseline;}`,`a[target="_blank"]:before,a.externalLink:before{content:'\\2197';}`,`a[data-top]:before,a.internalLink:before,a[target="_top"]:before{content:'\\21BA';}`);
}
