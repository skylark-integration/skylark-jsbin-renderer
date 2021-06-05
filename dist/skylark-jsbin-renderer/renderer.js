/**
 * skylark-jsbin-renderer - A version of jsbin-renderer  that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-jsbin-renderer/
 * @license MIT
 */
define(["skylark-langx-async/Deferred","skylark-jquery","skylark-jsbin-base/storage","./jsbin"],function(e,o,n,t){"use strict";var r,s,i={},a=o(window),c=o(document);return i.runner={},i.runner.origin="*",i.setup=function(e){i.runner.window=e.contentWindow,i.runner.iframe=e},i.error=function(){window.console.warn.apply(console,["Renderer:"].concat([].slice.call(arguments)))},i.handleMessage=function(e){if(e.origin){var o=e.data;if("string"==typeof o){try{o="string"==typeof e.data?JSON.parse(e.data):e.data}catch(e){return i.error("Error parsing event data:",e.message)}if("function"!=typeof i[o.type])return!1;try{i[o.type](o.data)}catch(e){i.error(e.message)}}}},i.postMessage=function(e,o){if(!i.runner.window)return i.error("postMessage: No connection to runner window.");i.runner.window.postMessage(JSON.stringify({type:e,data:o}),i.runner.origin)},i.complete=function(){try{n.sessionStorage.removeItem("runnerPending")}catch(e){}},i.loopProtectHit=function(e){var o=t.panels.named.javascript.editor;setTimeout(function(){var n=o.state.lint.annotations||[];void 0!==o.updateLinting&&((n=n.filter(function(o){return o.source!=="loopProtectLine:"+e})).push({from:CodeMirror.Pos(e-1,0),to:CodeMirror.Pos(e-1,0),message:'Exiting potential infinite loop.\nTo disable loop protection: add "// noprotect" to your code',severity:"warning",source:"loopProtectLine:"+e}),o.updateLinting(n))},o.state.lint.options.delay||0)},i.focus=function(){t.panels.focus(t.panels.named.live),closedropdown()},i.console=function(e){var o=e.method,n=e.args;window._console&&(window._console[o]||(o="log"),window._console[o].apply(window._console,n))},i["console:load:script:success"]=function(e){c.trigger("console:load:script:success",e)},i["console:load:script:error"]=function(e){c.trigger("console:load:script:error",e)},i["console:load:dom:success"]=function(e){c.trigger("console:load:dom:success",e)},i["console:load:dom:error"]=function(e){c.trigger("console:load:dom:error",e)},i.init=function(l,d){if(s)return s.promise;s=new e,i.$live=l,(r=document.createElement("iframe")).setAttribute("class","stretch"),r.setAttribute("sandbox","allow-modals allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts"),r.setAttribute("frameBorder","0"),r.setAttribute("name","<proxy>"),l.prepend(r),r.src=t.runner;try{r.contentWindow.name="/"+t.state.code+"/"+t.state.revision}catch(e){}var u,p,f;return r.onload=function(){window.postMessage&&(a.on("message",function(e){i.handleMessage(e.originalEvent)}),i.setup(r),s.resolve())},r.onerror=function(e){s.reject(e)},c.on("codeChange.live",function(e,o){"setValue"!==o.origin&&void 0!==o.origin&&n.sessionStorage.removeItem("runnerPending")}),c.on("console:run",function(e,o){i.postMessage("console:run",o)}),c.on("console:load:script",function(e,o){i.postMessage("console:load:script",o)}),c.on("console:load:dom",function(e,o){i.postMessage("console:load:dom",o)}),i.resize=(u=i.$live.find(".size"),p=t.throttle(function(){u.fadeOut(200)},2e3),f=!1,function(e){if(t.embed||(u.show().html(e.width+"px"),p()),t.embed&&self!==top&&!1===f){f=!0;var n=$body.outerHeight(!0)-o(i.runner.iframe).height()+e.offsetHeight;window.parent.postMessage({height:n},"*")}}),s.promise},t.renderer=i});
//# sourceMappingURL=sourcemaps/renderer.js.map
