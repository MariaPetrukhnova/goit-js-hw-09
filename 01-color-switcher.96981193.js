const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),n=document.body;let o=null;t.addEventListener("click",(function(){o=setInterval((()=>{const e=`#${Math.floor(16777215*Math.random()).toString(16)}`;n.style.backgroundColor=e,t.setAttribute("disabled","disabled")}),1e3)})),e.addEventListener("click",(function(){clearInterval(o),t.removeAttribute("disabled","disabled")}));
//# sourceMappingURL=01-color-switcher.96981193.js.map
