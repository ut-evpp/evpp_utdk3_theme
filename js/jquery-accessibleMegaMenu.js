!function(x,y,u){"use strict";var s,T,n,D,l,E,I,a,i,o,r,c,f,h,d,p,b="accessibleMegaMenu",m={uuidPrefix:"accessible-megamenu",menuClass:"accessible-megamenu",topNavItemClass:"accessible-megamenu-top-nav-item",panelClass:"accessible-megamenu-panel",panelGroupClass:"accessible-megamenu-panel-group",hoverClass:"hover",focusClass:"focus",openClass:"open",openDelay:0,closeDelay:250},k={BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38,keyMap:{48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",59:";",65:"a",66:"b",67:"c",68:"d",69:"e",70:"f",71:"g",72:"h",73:"i",74:"j",75:"k",76:"l",77:"m",78:"n",79:"o",80:"p",81:"q",82:"r",83:"s",84:"t",85:"u",86:"v",87:"w",88:"x",89:"y",90:"z",96:"0",97:"1",98:"2",99:"3",100:"4",101:"5",102:"6",103:"7",104:"8",105:"9",190:"."}};function N(e,t){this.element=e,this.settings=x.extend({},m,t),this._defaults=m,this._name=b,this.mouseTimeoutID=null,this.focusTimeoutID=null,this.mouseFocused=!1,this.justFocused=!1,this.init()}function g(e){return x.expr.filters.visible(e)&&!x(e).parents().addBack().filter(function(){return"hidden"===x.css(this,"visibility")}).length}function C(e,t){var s,a,i=e.nodeName.toLowerCase();return"area"===i?(a=(s=e.parentNode).name,!(!e.href||!a||"map"!==s.nodeName.toLowerCase())&&(!!(a=x("img[usemap=#"+a+"]")[0])&&g(a))):(/input|select|textarea|button|object/.test(i)?!e.disabled:"a"===i&&e.href||t)&&g(e)}N.prototype=(s=0,T="",n="function"==typeof y.hasOwnProperty&&!!y.hasOwnProperty("ontouchstart"),D=function(e){return x(e).closest(":data(plugin_"+b+")").data("plugin_"+b)},l=function(e){e=x(e);var t=this.settings;e.attr("id")||e.attr("id",t.uuidPrefix+"-"+(new Date).getTime()+"-"+ ++s)},E=function(e,t){var s,a=x(e.target),i=this,n=this.settings,l=this.menu,o=a.closest("."+n.topNavItemClass),r=a.hasClass(n.panelClass)?a:a.closest("."+n.panelClass);p.call(this,!0),t?(o=l.find("."+n.topNavItemClass+" ."+n.openClass+":first").closest("."+n.topNavItemClass)).is(e.relatedTarget)||0<o.has(e.relatedTarget).length?0===o.length&&l.find("[aria-expanded=true]").attr("aria-expanded","false").removeClass(n.openClass).filter("."+n.panelClass).attr("aria-hidden","true"):("mouseout"===e.type||"focusout"===e.type)&&0<o.has(u.activeElement).length||(o.find("[aria-expanded]").attr("aria-expanded","false").removeClass(n.openClass).filter("."+n.panelClass).attr("aria-hidden","true"),("keydown"===e.type&&e.keyCode===k.ESCAPE||"DOMAttrModified"===e.type)&&(s=o.find(":tabbable:first"),setTimeout(function(){l.find("[aria-expanded]."+i.settings.panelClass).off("DOMAttrModified.accessible-megamenu"),s.focus(),i.justFocused=!1},99))):(clearTimeout(i.focusTimeoutID),o.siblings().find("[aria-expanded]").attr("aria-expanded","false").removeClass(n.openClass).filter("."+n.panelClass).attr("aria-hidden","true"),o.find("[aria-expanded]").attr("aria-expanded","true").addClass(n.openClass).filter("."+n.panelClass).attr("aria-hidden","false"),"mouseover"===e.type&&a.is(":tabbable")&&1===o.length&&0===r.length&&0<l.has(u.activeElement).length&&(a.focus(),i.justFocused=!1),p.call(i))},I=function(e){var t=x(e.target).closest(":tabbable"),s=t.closest("."+this.settings.topNavItemClass),a=t.closest("."+this.settings.panelClass);1===s.length&&0===a.length&&1===s.find("."+this.settings.panelClass).length&&(t.hasClass(this.settings.openClass)?this.justFocused?(e.preventDefault(),e.stopPropagation(),this.justFocused=!1):n&&(e.preventDefault(),e.stopPropagation(),E.call(this,e,t.hasClass(this.settings.openClass))):(e.preventDefault(),e.stopPropagation(),E.call(this,e),this.justFocused=!1))},a=function(e){0===x(e.target).closest(this.menu).length&&(e.preventDefault(),e.stopPropagation(),E.call(this,e,!0))},i=function(e){"aria-expanded"===e.originalEvent.attrName&&"false"===e.originalEvent.newValue&&x(e.target).hasClass(this.settings.openClass)&&(e.preventDefault(),e.stopPropagation(),E.call(this,e,!0))},o=function(e){clearTimeout(this.focusTimeoutID);var t=x(e.target),s=t.closest("."+this.settings.panelClass);t.addClass(this.settings.focusClass).on("click.accessible-megamenu",x.proxy(I,this)),this.justFocused=!this.mouseFocused,this.mouseFocused=!1,this.panels.not(s).filter("."+this.settings.openClass).length&&E.call(this,e)},r=function(t){this.justFocused=!1;var s=this,e=x(t.target),a=e.closest("."+this.settings.topNavItemClass);e.removeClass(this.settings.focusClass).off("click.accessible-megamenu"),y.cvox?s.focusTimeoutID=setTimeout(function(){y.cvox.Api.getCurrentNode(function(e){a.has(e).length?clearTimeout(s.focusTimeoutID):s.focusTimeoutID=setTimeout(function(e,t,s){E.call(e,t,s)},275,s,t,!0)})},25):s.focusTimeoutID=setTimeout(function(){E.call(s,t,!0)},300)},c=function(e){var t,s,a,i,n,l,o=this.constructor===N?this:D(this),r=o.settings,u=x(x(this).is("."+r.hoverClass+":tabbable")?this:e.target),c=o.menu,f=o.topnavitems,h=u.closest("."+r.topNavItemClass),d=c.find(":tabbable"),p=u.hasClass(r.panelClass)?u:u.closest("."+r.panelClass),b=p.find("."+r.panelGroupClass),m=u.closest("."+r.panelGroupClass),c=e.keyCode||e.which,g=!1,C=k.keyMap[e.keyCode]||"",v=1===h.length&&0===p.length;if(!u.is("input:focus, select:focus, textarea:focus, button:focus")){switch(u.is("."+r.hoverClass+":tabbable")&&x("html").off("keydown.accessible-megamenu"),c){case k.ESCAPE:E.call(o,e,!0);break;case k.DOWN:e.preventDefault(),!(g=v?(E.call(o,e),1===h.find("."+r.panelClass+" :tabbable:first").focus().length):1===d.filter(":gt("+d.index(u)+"):first").focus().length)&&y.opera&&"[object Opera]"===opera.toString()&&(e.ctrlKey||e.metaKey)&&(a=(d=x(":tabbable")).index(u),g=1===x(":tabbable:gt("+x(":tabbable").index(u)+"):first").focus().length);break;case k.UP:e.preventDefault(),v&&u.hasClass(r.openClass)?(E.call(o,e,!0),(t=f.filter(":lt("+f.index(h)+"):last")).children("."+r.panelClass).length&&(g=1===t.children().attr("aria-expanded","true").addClass(r.openClass).filter("."+r.panelClass).attr("aria-hidden","false").find(":tabbable:last").focus())):v||(g=1===d.filter(":lt("+d.index(u)+"):last").focus().length),!g&&y.opera&&"[object Opera]"===opera.toString()&&(e.ctrlKey||e.metaKey)&&(a=(d=x(":tabbable")).index(u),g=1===x(":tabbable:lt("+x(":tabbable").index(u)+"):first").focus().length);break;case k.RIGHT:e.preventDefault(),g=v?1===f.filter(":gt("+f.index(h)+"):first").find(":tabbable:first").focus().length:(g=b.length&&m.length?1===b.filter(":gt("+b.index(m)+"):first").find(":tabbable:first").focus().length:g)||1===h.find(":tabbable:first").focus().length;break;case k.LEFT:e.preventDefault(),g=v?1===f.filter(":lt("+f.index(h)+"):last").find(":tabbable:first").focus().length:(g=b.length&&m.length?1===b.filter(":lt("+b.index(m)+"):last").find(":tabbable:first").focus().length:g)||1===h.find(":tabbable:first").focus().length;break;case k.TAB:a=d.index(u),e.shiftKey&&v&&u.hasClass(r.openClass)?(E.call(o,e,!0),(t=f.filter(":lt("+f.index(h)+"):last")).children("."+r.panelClass).length&&(g=t.children().attr("aria-expanded","true").addClass(r.openClass).filter("."+r.panelClass).attr("aria-hidden","false").find(":tabbable:last").focus())):e.shiftKey&&0<a?g=1===d.filter(":lt("+a+"):last").focus().length:!e.shiftKey&&a<d.length-1?g=1===d.filter(":gt("+a+"):first").focus().length:y.opera&&"[object Opera]"===opera.toString()&&(a=(d=x(":tabbable")).index(u),g=e.shiftKey?1===x(":tabbable:lt("+x(":tabbable").index(u)+"):last").focus().length:1===x(":tabbable:gt("+x(":tabbable").index(u)+"):first").focus().length),g&&e.preventDefault();break;case k.SPACE:if(!v)return!0;e.preventDefault(),I.call(o,e);break;case k.ENTER:return!0;default:if(clearTimeout(this.keydownTimeoutID),0===(T+=C!==T?C:"").length)return;for(this.keydownTimeoutID=setTimeout(function(){T=""},1e3),d=v&&!u.hasClass(r.openClass)?d.filter(":not(."+r.panelClass+" :tabbable)"):h.find(":tabbable"),e.shiftKey&&(d=x(d.get().reverse())),a=0;a<d.length;a++)if((i=d.eq(a)).is(u)){s=1===T.length?a+1:a;break}for(l=new RegExp("^"+T.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&"),"i"),a=s;a<d.length;a++)if(i=d.eq(a),n=x.trim(i.text()),l.test(n)){g=!0,i.focus();break}if(!g)for(a=0;a<s;a++)if(i=d.eq(a),n=x.trim(i.text()),l.test(n)){i.focus();break}}o.justFocused=!1}},f=function(e){(x(e.target).is(this.settings.panelClass)||x(e.target).closest(":focusable").length)&&(this.mouseFocused=!0),clearTimeout(this.mouseTimeoutID),this.mouseTimeoutID=setTimeout(function(){clearTimeout(this.focusTimeoutID)},1)},h=function(e){clearTimeout(this.mouseTimeoutID);var t=this;this.mouseTimeoutID=setTimeout(function(){x(e.target).addClass(t.settings.hoverClass),E.call(t,e),x(e.target).is(":tabbable")&&x("html").on("keydown.accessible-megamenu",x.proxy(c,e.target))},this.settings.openDelay)},d=function(e){clearTimeout(this.mouseTimeoutID);var t=this;x(e.target).removeClass(t.settings.hoverClass),t.mouseTimeoutID=setTimeout(function(){E.call(t,e,!0)},this.settings.closeDelay),x(e.target).is(":tabbable")&&x("html").off("keydown.accessible-megamenu")},p=function(e){var t=this.menu;e?(x("html").off("mouseup.outside-accessible-megamenu, touchend.outside-accessible-megamenu, mspointerup.outside-accessible-megamenu,  pointerup.outside-accessible-megamenu"),t.find("[aria-expanded]."+this.settings.panelClass).off("DOMAttrModified.accessible-megamenu")):(x("html").on("mouseup.outside-accessible-megamenu, touchend.outside-accessible-megamenu, mspointerup.outside-accessible-megamenu,  pointerup.outside-accessible-megamenu",x.proxy(a,this)),t.find("[aria-expanded=true]."+this.settings.panelClass).on("DOMAttrModified.accessible-megamenu",x.proxy(i,this)))},{constructor:N,init:function(){var e=this.settings,t=x(this.element),s=t.children().first(),a=s.children();this.start(e,t,s,a)},start:function(a,e,t,s){var i=this;this.settings=a,this.menu=t,this.topnavitems=s,e.attr("role","navigation"),t.addClass(a.menuClass),s.each(function(e,t){var s;(t=x(t)).addClass(a.topNavItemClass),s=t.find(":tabbable:first"),t=t.children(":not(:tabbable):last"),l.call(i,s),t.length&&(l.call(i,t),s.attr({"aria-controls":t.attr("id"),"aria-expanded":!1}),t.attr({role:"region","aria-expanded":!1,"aria-hidden":!0}).addClass(a.panelClass).not("[aria-labelledby]").attr("aria-labelledby",s.attr("id")))}),this.panels=t.find("."+a.panelClass),t.on("focusin.accessible-megamenu",":focusable, ."+a.panelClass,x.proxy(o,this)).on("focusout.accessible-megamenu",":focusable, ."+a.panelClass,x.proxy(r,this)).on("keydown.accessible-megamenu",x.proxy(c,this)).on("mouseover.accessible-megamenu",x.proxy(h,this)).on("mouseout.accessible-megamenu",x.proxy(d,this)).on("mousedown.accessible-megamenu",x.proxy(f,this)),n&&t.on("touchstart.accessible-megamenu",x.proxy(I,this)),t.find("hr").attr("role","separator"),x(u.activeElement).closest(t).length&&x(u.activeElement).trigger("focusin.accessible-megamenu")},getDefaults:function(){return this._defaults},getOption:function(e){return this.settings[e]},getAllOptions:function(){return this.settings},setOption:function(e,t,s){this.settings[e]=t,s&&this.init()}}),x.fn[b]=function(e){return this.each(function(){x.data(this,"plugin_"+b)||x.data(this,"plugin_"+b,new x.fn[b].AccessibleMegaMenu(this,e))})},x.fn[b].AccessibleMegaMenu=N,x.extend(x.expr[":"],{data:x.expr.createPseudo?x.expr.createPseudo(function(t){return function(e){return!!x.data(e,t)}}):function(e,t,s){return!!x.data(e,s[3])},focusable:function(e){return C(e,!isNaN(x.attr(e,"tabindex")))},tabbable:function(e){var t=x.attr(e,"tabindex"),s=isNaN(t);return(s||0<=t)&&C(e,!s)}})}(jQuery,window,document);