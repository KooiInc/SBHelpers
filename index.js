import $ from "jqlmodule";
export {logFactory}
function logFactory() {
  const ul = $(`<ul>`);
  const head = t => `${t}`.startsWith(`!!`) ? ` class="head"` : ``;
  const logItem = top => t => ul.append(
    `<li${head(t)}>${`${t}`.replace(/^!!/, ``)}</li>`,
    top ? `afterbegin` : `beforeend` ) ;
  return {
    log: (...txt) => txt.forEach( logItem() ),
    logTop: (...txt) => txt.forEach( logItem(true) ), };
};