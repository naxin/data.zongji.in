(function() {
    if (typeof v != "undefined") {
        var u = v;
    }
    var v = window.jQuery = function(a, b) {
        return this instanceof v ? this.init(a, b) : new v(a, b);
    };
    if (typeof $ != "undefined") {
        var w = $;
    }
    window.$ = v;
    var x = /^[^<]*(<(.|\s)+>)[^>]*$|^#(\w+)$/;
    v.fn = v.prototype = {
        init: function(a, b) {
            a = a || document;
            if (typeof a == "string") {
                var m = x.exec(a);
                if (m && (m[1] || !b)) {
                    if (m[1]) {
                        a = v.clean([m[1]], b);
                    } else {
                        var c = document.getElementById(m[3]);
                        if (c) {
                            if (c.id != m[3]) {
                                return v().find(a);
                            } else {
                                this[0] = c;
                                this.length = 1;
                                return this;
                            }
                        } else {
                            a = [];
                        }
                    }
                } else {
                    return new v(b).find(a);
                }
            } else {
                if (v.isFunction(a)) {
                    return new v(document)[v.fn.ready ? "ready": "load"](a);
                }
            }
            return this.setArray(a.constructor == Array && a || (a.jquery || a.length && a != window && !a.nodeType && a[0] != undefined && a[0].nodeType) && v.makeArray(a) || [a]);
        },
        jquery: "1.2.1",
        size: function() {
            return this.length;
        },
        length: 0,
        get: function(a) {
            return a == undefined ? v.makeArray(this) : this[a];
        },
        pushStack: function(a) {
            var b = v(a);
            b.prevObject = this;
            return b
        },
        setArray: function(a) {
            this.length = 0;
            Array.prototype.push.apply(this, a);
            return this;
        },
        each: function(a, b) {
            return v.each(this, a, b);
        },
        index: function(a) {
            var b = -1;
            this.each(function(i) {
                if (this == a) {
                    b = i;
                }
            });
            return b;
        },
        attr: function(c, d, e) {
            var f = c;
            if (c.constructor == String) {
                if (d == undefined) {
                    return this.length && v[e || "attr"](this[0], c) || undefined;
                } else {
                    f = {};
                    f[c] = d;
                }
            }
            return this.each(function(a) {
                for (var b in f) {
                    v.attr(e ? this.style: this, b, v.prop(this, f[b], e, a, b));
                }
            });
        },
        css: function(a, b) {
            return this.attr(a, b, "curCSS");
        },
        text: function(e) {
            if (typeof e != "object" && e != null) {
                return this.empty().append(document.createTextNode(e));
            }
            var t = "";
            v.each(e || this,
            function() {
                v.each(this.childNodes,
                function() {
                    if (this.nodeType != 8) {
                        t += this.nodeType != 1 ? this.nodeValue: v.fn.text([this]);
                    }
                })
            });
            return t;
        },
        wrapAll: function(b) {
            if (this[0]) {
                v(b, this[0].ownerDocument).clone().insertBefore(this[0]).map(function() {
                    var a = this;
                    while (a.firstChild) {
                        a = a.firstChild;
                    }
                    return a;
                }).append(this);
            }
            return this;
        },
        wrapInner: function(a) {
            return this.each(function() {
                v(this).contents().wrapAll(a);
            });
        },
        wrap: function(a) {
            return this.each(function() {
                v(this).wrapAll(a);
            });
        },
        append: function() {
            return this.domManip(arguments, true, 1,
            function(a) {
                this.appendChild(a);
            });
        },
        prepend: function() {
            return this.domManip(arguments, true, -1,
            function(a) {
                this.insertBefore(a, this.firstChild);
            });
        },
        before: function() {
            return this.domManip(arguments, false, 1,
            function(a) {
                this.parentNode.insertBefore(a, this);
            });
        },
        after: function() {
            return this.domManip(arguments, false, -1,
            function(a) {
                this.parentNode.insertBefore(a, this.nextSibling);
            });
        },
        end: function() {
            return this.prevObject || v([]);
        },
        find: function(t) {
            var b = v.map(this,
            function(a) {
                return v.find(t, a);
            });
            return this.pushStack(/[^+>] [^+>]/.test(t) || t.indexOf("..") > -1 ? v.unique(b) : b);
        },
        clone: function(d) {
            var e = this.map(function() {
                return this.outerHTML ? v(this.outerHTML)[0] : this.cloneNode(true);
            });
            var f = e.find("*").andSelf().each(function() {
                if (this[y] != undefined) {
                    this[y] = null;
                }
            });
            if (d === true) {
                this.find("*").andSelf().each(function(i) {
                    var a = v.data(this, "events");
                    for (var b in a) {
                        for (var c in a[b]) {
                            v.event.add(f[i], b, a[b][c], a[b][c].data);
                        }
                    }
                });
            }
            return e;
        },
        filter: function(t) {
            return this.pushStack(v.isFunction(t) && v.grep(this,
            function(a, b) {
                return t.apply(a, [b]);
            }) || v.multiFilter(t, this));
        },
        not: function(t) {
            return this.pushStack(t.constructor == String && v.multiFilter(t, this, true) || v.grep(this,
            function(a) {
                return (t.constructor == Array || t.jquery) ? v.inArray(a, t) < 0 : a != t;
            }));
        },
        add: function(t) {
            return this.pushStack(v.merge(this.get(), t.constructor == String ? v(t).get() : t.length != undefined && (!t.nodeName || v.nodeName(t, "form")) ? t: [t]));
        },
        is: function(a) {
            return a ? v.multiFilter(a, this).length > 0 : false;
        },
        hasClass: function(a) {
            return this.is("." + a);
        },
        val: function(b) {
            if (b == undefined) {
                if (this.length) {
                    var c = this[0];
                    if (v.nodeName(c, "select")) {
                        var d = c.selectedIndex,
                        a = [],
                        options = c.options,
                        one = c.type == "select-one";
                        if (d < 0) {
                            return null;
                        }
                        for (var i = one ? d: 0, max = one ? d + 1 : options.length; i < max; i++) {
                            var e = options[i];
                            if (e.selected) {
                                var b = v.browser.msie && !e.attributes.value.specified ? e.text: e.value;
                                if (one) {
                                    return b;
                                }
                                a.push(b);
                            }
                        }
                        return a;
                    } else {
                        return this[0].value.replace(/\r/g, "");
                    }
                }
            } else {
                return this.each(function() {
                    if (b.constructor == Array && /radio|checkbox/.test(this.type)) {
                        this.checked = (v.inArray(this.value, b) >= 0 || v.inArray(this.name, b) >= 0);
                    } else {
                        if (v.nodeName(this, "select")) {
                            var a = b.constructor == Array ? b: [b];
                            v("option", this).each(function() {
                                this.selected = (v.inArray(this.value, a) >= 0 || v.inArray(this.text, a) >= 0);
                            });
                            if (!a.length) {
                                this.selectedIndex = -1;
                            }
                        } else {
                            this.value = b;
                        }
                    }
                });
            }
        },
        html: function(a) {
            return a == undefined ? (this.length ? this[0].innerHTML: null) : this.empty().append(a);
        },
        replaceWith: function(a) {
            return this.after(a).remove();
        },
        eq: function(i) {
            return this.slice(i, i + 1);
        },
        slice: function() {
            return this.pushStack(Array.prototype.slice.apply(this, arguments));
        },
        map: function(b) {
            return this.pushStack(v.map(this,
            function(a, i) {
                return b.call(a, i, a);
            }));
        },
        andSelf: function() {
            return this.add(this.prevObject);
        },
        domManip: function(c, d, e, f) {
            var g = this.length > 1,
            a;
            return this.each(function() {
                if (!a) {
                    a = v.clean(c, this.ownerDocument);
                    if (e < 0) {
                        a.reverse();
                    }
                }
                var b = this;
                if (d && v.nodeName(this, "table") && v.nodeName(a[0], "tr")) {
                    b = this.getElementsByTagName("tbody")[0] || this.appendChild(document.createElement("tbody"));
                }
                v.each(a,
                function() {
                    var a = g ? this.cloneNode(true) : this;
                    if (!evalScript(0, a)) {
                        f.call(b, a);
                    }
                });
            });
        }
    };
    function evalScript(i, a) {
        var b = v.nodeName(a, "script");
        if (b) {
            if (a.src) {
                v.ajax({
                    url: a.src,
                    async: false,
                    dataType: "script"
                });
            } else {
                v.globalEval(a.text || a.textContent || a.innerHTML || "");
            }
            if (a.parentNode) {
                a.parentNode.removeChild(a);
            }
        } else {
            if (a.nodeType == 1) {
                v("script", a).each(evalScript);
            }
        }
        return b;
    }
    v.extend = v.fn.extend = function() {
        var b = arguments[0] || {},
        a = 1,
        al = arguments.length,
        deep = false;
        if (b.constructor == Boolean) {
            deep = b;
            b = arguments[1] || {};
        }
        if (al == 1) {
            b = this;
            a = 0;
        }
        var c;
        for (; a < al; a++) {
            if ((c = arguments[a]) != null) {
                for (var i in c) {
                    if (b == c[i]) {
                        continue;
                    }
                    if (deep && typeof c[i] == "object" && b[i]) {
                        v.extend(b[i], c[i]);
                    } else {
                        if (c[i] != undefined) {
                            b[i] = c[i];
                        }
                    }
                }
            }
        }
        return b;
    };
    var y = "jQuery" + (new Date()).getTime(),
    uuid = 0,
    win = {};
    v.extend({
        noConflict: function(a) {
            window.$ = w;
            if (a) {
                window.jQuery = u;
            }
            return v;
        },
        isFunction: function(a) {
            return !! a && typeof a != "string" && !a.nodeName && a.constructor != Array && /function/i.test(a + "");
        },
        isXMLDoc: function(a) {
            return a.documentElement && !a.body || a.tagName && a.ownerDocument && !a.ownerDocument.body;
        },
        globalEval: function(a) {
            a = v.trim(a);
            if (a) {
                if (window.execScript) {
                    window.execScript(a);
                } else {
                    if (v.browser.safari) {
                        window.setTimeout(a, 0);
                    } else {
                        eval.call(window, a);
                    }
                }
            }
        },
        nodeName: function(a, b) {
            return a.nodeName && a.nodeName.toUpperCase() == b.toUpperCase();
        },
        cache: {},
        data: function(a, b, c) {
            a = a == window ? win: a;
            var d = a[y];
            if (!d) {
                d = a[y] = ++uuid
            }
            if (b && !v.cache[d]) {
                v.cache[d] = {};
            }
            if (c != undefined) {
                v.cache[d][b] = c;
            }
            return b ? v.cache[d][b] : d;
        },
        removeData: function(a, b) {
            a = a == window ? win: a;
            var c = a[y];
            if (b) {
                if (v.cache[c]) {
                    delete v.cache[c][b];
                    b = "";
                    for (b in v.cache[c]) {
                        break;
                    }
                    if (!b) {
                        v.removeData(a);
                    }
                }
            } else {
                try {
                    delete a[y];
                } catch(e) {
                    if (a.removeAttribute) {
                        a.removeAttribute(y);
                    }
                }
                delete v.cache[c];
            }
        },
        each: function(a, b, c) {
            if (c) {
                if (a.length == undefined) {
                    for (var i in a) {
                        b.apply(a[i], c);
                    }
                } else {
                    for (var i = 0, ol = a.length; i < ol; i++) {
                        if (b.apply(a[i], c) === false) {
                            break;
                        }
                    }
                }
            } else {
                if (a.length == undefined) {
                    for (var i in a) {
                        b.call(a[i], i, a[i]);
                    }
                } else {
                    for (var i = 0, ol = a.length, val = a[0]; i < ol && b.call(val, i, val) !== false; val = a[++i]) {}
                }
            }
            return a;
        },
        prop: function(a, b, c, d, e) {
            if (v.isFunction(b)) {
                b = b.call(a, [d]);
            }
            var f = /z-?index|font-?weight|opacity|zoom|line-?height/i;
            return b && b.constructor == Number && c == "curCSS" && !f.test(e) ? b + "px": b;
        },
        className: {
            add: function(b, c) {
                v.each((c || "").split(/\s+/),
                function(i, a) {
                    if (!v.className.has(b.className, a)) {
                        b.className += (b.className ? " ": "") + a;
                    }
                });
            },
            remove: function(b, c) {
                b.className = c != undefined ? v.grep(b.className.split(/\s+/),
                function(a) {
                    return ! v.className.has(c, a);
                }).join(" ") : "";
            },
            has: function(t, c) {
                return v.inArray(c, (t.className || t).toString().split(/\s+/)) > -1;
            }
        },
        swap: function(e, o, f) {
            for (var i in o) {
                e.style["old" + i] = e.style[i];
                e.style[i] = o[i];
            }
            f.apply(e, []);
            for (var i in o) {
                e.style[i] = e.style["old" + i];
            }
        },
        css: function(e, p) {
            if (p == "height" || p == "width") {
                var b = {},
                oHeight, oWidth, d = ["Top", "Bottom", "Right", "Left"];
                v.each(d,
                function() {
                    b["padding" + this] = 0;
                    b["border" + this + "Width"] = 0;
                });
                v.swap(e, b,
                function() {
                    if (v(e).is(":visible")) {
                        oHeight = e.offsetHeight;
                        oWidth = e.offsetWidth;
                    } else {
                        e = v(e.cloneNode(true)).find(":radio").removeAttr("checked").end().css({
                            visibility: "hidden",
                            position: "absolute",
                            display: "block",
                            right: "0",
                            left: "0"
                        }).appendTo(e.parentNode)[0];
                        var a = v.css(e.parentNode, "position") || "static";
                        if (a == "static") {
                            e.parentNode.style.position = "relative"
                        }
                        oHeight = e.clientHeight;
                        oWidth = e.clientWidth;
                        if (a == "static") {
                            e.parentNode.style.position = "static";
                        }
                        e.parentNode.removeChild(e);
                    }
                });
                return p == "height" ? oHeight: oWidth;
            }
            return v.curCSS(e, p);
        },
        curCSS: function(d, e, f) {
            var g, stack = [],
            swap = [];
            function color(a) {
                if (!v.browser.safari) {
                    return false;
                }
                var b = document.defaultView.getComputedStyle(a, null);
                return ! b || b.getPropertyValue("color") == "";
            }
            if (e == "opacity" && v.browser.msie) {
                g = v.attr(d.style, "opacity");
                return g == "" ? "1": g
            }
            if (e.match(/float/i)) {
                e = B;
            }
            if (!f && d.style[e]) {
                g = d.style[e];
            } else {
                if (document.defaultView && document.defaultView.getComputedStyle) {
                    if (e.match(/float/i)) {
                        e = "float";
                    }
                    e = e.replace(/([A-Z])/g, "-$1").toLowerCase();
                    var h = document.defaultView.getComputedStyle(d, null);
                    if (h && !color(d)) {
                        g = h.getPropertyValue(e);
                    } else {
                        for (var a = d; a && color(a); a = a.parentNode) {
                            stack.unshift(a);
                        }
                        for (a = 0; a < stack.length; a++) {
                            if (color(stack[a])) {
                                swap[a] = stack[a].style.display;
                                stack[a].style.display = "block";
                            }
                        }
                        g = e == "display" && swap[stack.length - 1] != null ? "none": document.defaultView.getComputedStyle(d, null).getPropertyValue(e) || "";
                        for (a = 0; a < swap.length; a++) {
                            if (swap[a] != null) {
                                stack[a].style.display = swap[a];
                            }
                        }
                    }
                    if (e == "opacity" && g == "") {
                        g = "1";
                    }
                } else {
                    if (d.currentStyle) {
                        var i = e.replace(/\-(\w)/g,
                        function(m, c) {
                            return c.toUpperCase();
                        });
                        g = d.currentStyle[e] || d.currentStyle[i];
                        if (!/^\d+(px)?$/i.test(g) && /^\d/.test(g)) {
                            var j = d.style.left;
                            var k = d.runtimeStyle.left;
                            d.runtimeStyle.left = d.currentStyle.left;
                            d.style.left = g || 0;
                            g = d.style.pixelLeft + "px";
                            d.style.left = j;
                            d.runtimeStyle.left = k;
                        }
                    }
                }
            }
            return g;
        },
        clean: function(a, e) {
            var r = [];
            e = e || document;
            v.each(a,
            function(i, c) {
                if (!c) {
                    return;
                }
                if (c.constructor == Number) {
                    c = c.toString();
                }
                if (typeof c == "string") {
                    c = c.replace(/(<(\w+)[^>]*?)\/>/g,
                    function(m, a, b) {
                        return b.match(/^(abbr|br|col|img|input|link|meta|param|hr|area)$/i) ? m: a + "></" + b + ">"
                    });
                    var s = v.trim(c).toLowerCase(),
                    div = e.createElement("div"),
                    tb = [];
                    var d = !s.indexOf("<opt") && [1, "<select>", "</select>"] || !s.indexOf("<leg") && [1, "<fieldset>", "</fieldset>"] || s.match(/^<(thead|tbody|tfoot|colg|cap)/) && [1, "<table>", "</table>"] || !s.indexOf("<tr") && [2, "<table><tbody>", "</tbody></table>"] || (!s.indexOf("<td") || !s.indexOf("<th")) && [3, "<table><tbody><tr>", "</tr></tbody></table>"] || !s.indexOf("<col") && [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"] || v.browser.msie && [1, "div<div>", "</div>"] || [0, "", ""];
                    div.innerHTML = d[1] + c + d[2];
                    while (d[0]--) {
                        div = div.lastChild;
                    }
                    if (v.browser.msie) {
                        if (!s.indexOf("<table") && s.indexOf("<tbody") < 0) {
                            tb = div.firstChild && div.firstChild.childNodes;
                        } else {
                            if (d[1] == "<table>" && s.indexOf("<tbody") < 0) {
                                tb = div.childNodes;
                            }
                        }
                        for (var n = tb.length - 1; n >= 0; --n) {
                            if (v.nodeName(tb[n], "tbody") && !tb[n].childNodes.length) {
                                tb[n].parentNode.removeChild(tb[n]);
                            }
                        }
                        if (/^\s/.test(c)) {
                            div.insertBefore(e.createTextNode(c.match(/^\s*/)[0]), div.firstChild);
                        }
                    }
                    c = v.makeArray(div.childNodes);
                }
                if (0 === c.length && (!v.nodeName(c, "form") && !v.nodeName(c, "select"))) {
                    return;
                }
                if (c[0] == undefined || v.nodeName(c, "form") || c.options) {
                    r.push(c);
                } else {
                    r = v.merge(r, c);
                }
            });
            return r;
        },
        attr: function(a, c, d) {
            var e = v.isXMLDoc(a) ? {}: v.props;
            if (c == "selected" && v.browser.safari) {
                a.parentNode.selectedIndex;
            }
            if (e[c]) {
                if (d != undefined) {
                    a[e[c]] = d;
                }
                return a[e[c]];
            } else {
                if (v.browser.msie && c == "style") {
                    return v.attr(a.style, "cssText", d);
                } else {
                    if (d == undefined && v.browser.msie && v.nodeName(a, "form") && (c == "action" || c == "method")) {
                        return a.getAttributeNode(c).nodeValue;
                    } else {
                        if (a.tagName) {
                            if (d != undefined) {
                                if (c == "type" && v.nodeName(a, "input") && a.parentNode) {
                                    throw "type property can't be changed";
                                }
                                a.setAttribute(c, d);
                            }
                            if (v.browser.msie && /href|src/.test(c) && !v.isXMLDoc(a)) {
                                return a.getAttribute(c, 2);
                            }
                            return a.getAttribute(c);
                        } else {
                            if (c == "opacity" && v.browser.msie) {
                                if (d != undefined) {
                                    a.zoom = 1;
                                    a.filter = (a.filter || "").replace(/alpha\([^)]*\)/, "") + (parseFloat(d).toString() == "NaN" ? "": "alpha(opacity=" + d * 100 + ")");
                                }
                                return a.filter ? (parseFloat(a.filter.match(/opacity=([^)]*)/)[1]) / 100).toString() : "";
                            }
                            c = c.replace(/-([a-z])/ig,
                            function(z, b) {
                                return b.toUpperCase();
                            });
                            if (d != undefined) {
                                a[c] = d;
                            }
                            return a[c];
                        }
                    }
                }
            }
        },
        trim: function(t) {
            return (t || "").replace(/^\s+|\s+$/g, "");
        },
        makeArray: function(a) {
            var r = [];
            if (typeof a != "array") {
                for (var i = 0, al = a.length; i < al; i++) {
                    r.push(a[i]);
                }
            } else {
                r = a.slice(0);
            }
            return r;
        },
        inArray: function(b, a) {
            for (var i = 0, al = a.length; i < al; i++) {
                if (a[i] == b) {
                    return i;
                }
            }
            return - 1;
        },
        merge: function(a, b) {
            if (v.browser.msie) {
                for (var i = 0; b[i]; i++) {
                    if (b[i].nodeType != 8) {
                        a.push(b[i]);
                    }
                }
            } else {
                for (var i = 0; b[i]; i++) {
                    a.push(b[i]);
                }
            }
            return a;
        },
        unique: function(a) {
            var r = [],
            done = {};
            try {
                for (var i = 0, fl = a.length; i < fl; i++) {
                    var b = v.data(a[i]);
                    if (!done[b]) {
                        done[b] = true;
                        r.push(a[i]);
                    }
                }
            } catch(e) {
                r = a;
            }
            return r;
        },
        grep: function(a, b, c) {
            if (typeof b == "string") {
                b = eval("false||function(a,i){return " + b + "}");
            }
            var d = [];
            for (var i = 0, el = a.length; i < el; i++) {
                if (!c && b(a[i], i) || c && !b(a[i], i)) {
                    d.push(a[i]);
                }
            }
            return d;
        },
        map: function(a, b) {
            if (typeof b == "string") {
                b = eval("false||function(a){return " + b + "}");
            }
            var c = [];
            for (var i = 0, el = a.length; i < el; i++) {
                var d = b(a[i], i);
                if (d !== null && d != undefined) {
                    if (d.constructor != Array) {
                        d = [d];
                    }
                    c = c.concat(d);
                }
            }
            return c;
        }
    });
    var A = navigator.userAgent.toLowerCase();
    v.browser = {
        version: (A.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
        safari: /webkit/.test(A),
        opera: /opera/.test(A),
        msie: /msie/.test(A) && !/opera/.test(A),
        mozilla: /mozilla/.test(A) && !/(compatible|webkit)/.test(A)
    };
    var B = v.browser.msie ? "styleFloat": "cssFloat";
    v.extend({
        boxModel: !v.browser.msie || document.compatMode == "CSS1Compat",
        styleFloat: v.browser.msie ? "styleFloat": "cssFloat",
        props: {
            "for": "htmlFor",
            "class": "className",
            "float": B,
            cssFloat: B,
            styleFloat: B,
            innerHTML: "innerHTML",
            className: "className",
            value: "value",
            disabled: "disabled",
            checked: "checked",
            readonly: "readOnly",
            selected: "selected",
            maxlength: "maxLength"
        }
    });
    v.each({
        parent: "a.parentNode",
        parents: "jQuery.dir(a,'parentNode')",
        next: "jQuery.nth(a,2,'nextSibling')",
        prev: "jQuery.nth(a,2,'previousSibling')",
        nextAll: "jQuery.dir(a,'nextSibling')",
        prevAll: "jQuery.dir(a,'previousSibling')",
        siblings: "jQuery.sibling(a.parentNode.firstChild,a)",
        children: "jQuery.sibling(a.firstChild)",
        contents: "jQuery.nodeName(a,'iframe')?a.contentDocument||a.contentWindow.document:jQuery.makeArray(a.childNodes)"
    },
    function(i, n) {
        v.fn[i] = function(a) {
            var b = v.map(this, n);
            if (a && typeof a == "string") {
                b = v.multiFilter(a, b)
            }
            return this.pushStack(v.unique(b))
        }
    });
    v.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    },
    function(i, n) {
        v.fn[i] = function() {
            var a = arguments;
            return this.each(function() {
                for (var j = 0, al = a.length; j < al; j++) {
                    v(a[j])[n](this)
                }
            })
        }
    });
    v.each({
        removeAttr: function(a) {
            v.attr(this, a, "");
            this.removeAttribute(a)
        },
        addClass: function(c) {
            v.className.add(this, c)
        },
        removeClass: function(c) {
            v.className.remove(this, c)
        },
        toggleClass: function(c) {
            v.className[v.className.has(this, c) ? "remove": "add"](this, c)
        },
        remove: function(a) {
            if (!a || v.filter(a, [this]).r.length) {
                v.removeData(this);
                this.parentNode.removeChild(this)
            }
        },
        empty: function() {
            v("*", this).each(function() {
                v.removeData(this)
            });
            while (this.firstChild) {
                this.removeChild(this.firstChild)
            }
        }
    },
    function(i, n) {
        v.fn[i] = function() {
            return this.each(n, arguments)
        }
    });
    v.each(["Height", "Width"],
    function(i, a) {
        var n = a.toLowerCase();
        v.fn[n] = function(h) {
            return this[0] == window ? v.browser.safari && self["inner" + a] || v.boxModel && Math.max(document.documentElement["client" + a], document.body["client" + a]) || document.body["client" + a] : this[0] == document ? Math.max(document.body["scroll" + a], document.body["offset" + a]) : h == undefined ? (this.length ? v.css(this[0], n) : null) : this.css(n, h.constructor == String ? h: h + "px")
        }
    });
    var C = v.browser.safari && parseInt(v.browser.version) < 417 ? "(?:[\\w*_-]|\\\\.)": "(?:[\\w\u0128-\uFFFF*_-]|\\\\.)",
    quickChild = new RegExp("^>\\s*(" + C + "+)"),
    quickID = new RegExp("^(" + C + "+)(#)(" + C + "+)"),
    quickClass = new RegExp("^([#.]?)(" + C + "*)");
    v.extend({
        expr: {
            "": "m[2]=='*'||jQuery.nodeName(a,m[2])",
            "#": "a.getAttribute('id')==m[2]",
            ":": {
                lt: "i<m[3]-0",
                gt: "i>m[3]-0",
                nth: "m[3]-0==i",
                eq: "m[3]-0==i",
                first: "i==0",
                last: "i==r.length-1",
                even: "i%2==0",
                odd: "i%2",
                "first-child": "a.parentNode.getElementsByTagName('*')[0]==a",
                "last-child": "jQuery.nth(a.parentNode.lastChild,1,'previousSibling')==a",
                "only-child": "!jQuery.nth(a.parentNode.lastChild,2,'previousSibling')",
                parent: "a.firstChild",
                empty: "!a.firstChild",
                contains: "(a.textContent||a.innerText||jQuery(a).text()||'').indexOf(m[3])>=0",
                visible: '"hidden"!=a.type&&jQuery.css(a,"display")!="none"&&jQuery.css(a,"visibility")!="hidden"',
                hidden: '"hidden"==a.type||jQuery.css(a,"display")=="none"||jQuery.css(a,"visibility")=="hidden"',
                enabled: "!a.disabled",
                disabled: "a.disabled",
                checked: "a.checked",
                selected: "a.selected||jQuery.attr(a,'selected')",
                text: "'text'==a.type",
                radio: "'radio'==a.type",
                checkbox: "'checkbox'==a.type",
                file: "'file'==a.type",
                password: "'password'==a.type",
                submit: "'submit'==a.type",
                image: "'image'==a.type",
                reset: "'reset'==a.type",
                button: '"button"==a.type||jQuery.nodeName(a,"button")',
                input: "/input|select|textarea|button/i.test(a.nodeName)",
                has: "jQuery.find(m[3],a).length",
                header: "/h\\d/i.test(a.nodeName)",
                animated: "jQuery.grep(jQuery.timers,function(fn){return a==fn.elem;}).length"
            }
        },
        parse: [/^(\[) *@?([\w-]+) *([!*$^~=]*) *('?"?)(.*?)\4 *\]/, /^(:)([\w-]+)\("?'?(.*?(\(.*?\))?[^(]*?)"?'?\)/, new RegExp("^([:.#]*)(" + C + "+)")],
        multiFilter: function(a, b, c) {
            var d, cur = [];
            while (a && a != d) {
                d = a;
                var f = v.filter(a, b, c);
                a = f.t.replace(/^\s*,\s*/, "");
                cur = c ? b = f.r: v.merge(cur, f.r)
            }
            return cur
        },
        find: function(t, a) {
            if (typeof t != "string") {
                return [t]
            }
            if (a && !a.nodeType) {
                a = null
            }
            a = a || document;
            var b = [a],
            done = [],
            last;
            while (t && last != t) {
                var r = [];
                last = t;
                t = v.trim(t);
                var d = false;
                var e = quickChild;
                var m = e.exec(t);
                if (m) {
                    var f = m[1].toUpperCase();
                    for (var i = 0; b[i]; i++) {
                        for (var c = b[i].firstChild; c; c = c.nextSibling) {
                            if (c.nodeType == 1 && (f == "*" || c.nodeName.toUpperCase() == f.toUpperCase())) {
                                r.push(c)
                            }
                        }
                    }
                    b = r;
                    t = t.replace(e, "");
                    if (t.indexOf(" ") == 0) {
                        continue
                    }
                    d = true
                } else {
                    e = /^([>+~])\s*(\w*)/i;
                    if ((m = e.exec(t)) != null) {
                        r = [];
                        var f = m[2],
                        merge = {};
                        m = m[1];
                        for (var j = 0, rl = b.length; j < rl; j++) {
                            var n = m == "~" || m == "+" ? b[j].nextSibling: b[j].firstChild;
                            for (; n; n = n.nextSibling) {
                                if (n.nodeType == 1) {
                                    var g = v.data(n);
                                    if (m == "~" && merge[g]) {
                                        break
                                    }
                                    if (!f || n.nodeName.toUpperCase() == f.toUpperCase()) {
                                        if (m == "~") {
                                            merge[g] = true
                                        }
                                        r.push(n)
                                    }
                                    if (m == "+") {
                                        break
                                    }
                                }
                            }
                        }
                        b = r;
                        t = v.trim(t.replace(e, ""));
                        d = true
                    }
                }
                if (t && !d) {
                    if (!t.indexOf(",")) {
                        if (a == b[0]) {
                            b.shift()
                        }
                        done = v.merge(done, b);
                        r = b = [a];
                        t = " " + t.substr(1, t.length)
                    } else {
                        var h = quickID;
                        var m = h.exec(t);
                        if (m) {
                            m = [0, m[2], m[3], m[1]]
                        } else {
                            h = quickClass;
                            m = h.exec(t)
                        }
                        m[2] = m[2].replace(/\\/g, "");
                        var k = b[b.length - 1];
                        if (m[1] == "#" && k && k.getElementById && !v.isXMLDoc(k)) {
                            var l = k.getElementById(m[2]);
                            if ((v.browser.msie || v.browser.opera) && l && typeof l.id == "string" && l.id != m[2]) {
                                l = v('[@id="' + m[2] + '"]', k)[0]
                            }
                            b = r = l && (!m[3] || v.nodeName(l, m[3])) ? [l] : []
                        } else {
                            for (var i = 0; b[i]; i++) {
                                var o = m[1] == "#" && m[3] ? m[3] : m[1] != "" || m[0] == "" ? "*": m[2];
                                if (o == "*" && b[i].nodeName.toLowerCase() == "object") {
                                    o = "param"
                                }
                                r = v.merge(r, b[i].getElementsByTagName(o))
                            }
                            if (m[1] == ".") {
                                r = v.classFilter(r, m[2])
                            }
                            if (m[1] == "#") {
                                var p = [];
                                for (var i = 0; r[i]; i++) {
                                    if (r[i].getAttribute("id") == m[2]) {
                                        p = [r[i]];
                                        break
                                    }
                                }
                                r = p
                            }
                            b = r
                        }
                        t = t.replace(h, "")
                    }
                }
                if (t) {
                    var q = v.filter(t, r);
                    b = r = q.r;
                    t = v.trim(q.t)
                }
            }
            if (t) {
                b = []
            }
            if (b && a == b[0]) {
                b.shift()
            }
            done = v.merge(done, b);
            return done
        },
        classFilter: function(r, m, a) {
            m = " " + m + " ";
            var b = [];
            for (var i = 0; r[i]; i++) {
                var c = (" " + r[i].className + " ").indexOf(m) >= 0;
                if (!a && c || a && !c) {
                    b.push(r[i])
                }
            }
            return b
        },
        filter: function(t, r, b) {
            var d;
            while (t && t != d) {
                d = t;
                var p = v.parse,
                m;
                for (var i = 0; p[i]; i++) {
                    m = p[i].exec(t);
                    if (m) {
                        t = t.substring(m[0].length);
                        m[2] = m[2].replace(/\\/g, "");
                        break
                    }
                }
                if (!m) {
                    break
                }
                if (m[1] == ":" && m[2] == "not") {
                    r = v.filter(m[3], r, true).r
                } else {
                    if (m[1] == ".") {
                        r = v.classFilter(r, m[2], b)
                    } else {
                        if (m[1] == "[") {
                            var e = [],
                            type = m[3];
                            for (var i = 0, rl = r.length; i < rl; i++) {
                                var a = r[i],
                                z = a[v.props[m[2]] || m[2]];
                                if (z == null || /href|src|selected/.test(m[2])) {
                                    z = v.attr(a, m[2]) || ""
                                }
                                if ((type == "" && !!z || type == "=" && z == m[5] || type == "!=" && z != m[5] || type == "^=" && z && !z.indexOf(m[5]) || type == "$=" && z.substr(z.length - m[5].length) == m[5] || (type == "*=" || type == "~=") && z.indexOf(m[5]) >= 0) ^ b) {
                                    e.push(a)
                                }
                            }
                            r = e
                        } else {
                            if (m[1] == ":" && m[2] == "nth-child") {
                                var g = {},
                                e = [],
                                test = /(\d*)n\+?(\d*)/.exec(m[3] == "even" && "2n" || m[3] == "odd" && "2n+1" || !/\D/.test(m[3]) && "n+" + m[3] || m[3]),
                                first = (test[1] || 1) - 0,
                                d = test[2] - 0;
                                for (var i = 0, rl = r.length; i < rl; i++) {
                                    var h = r[i],
                                    parentNode = h.parentNode,
                                    id = v.data(parentNode);
                                    if (!g[id]) {
                                        var c = 1;
                                        for (var n = parentNode.firstChild; n; n = n.nextSibling) {
                                            if (n.nodeType == 1) {
                                                n.nodeIndex = c++
                                            }
                                        }
                                        g[id] = true
                                    }
                                    var j = false;
                                    if (first == 1) {
                                        if (d == 0 || h.nodeIndex == d) {
                                            j = true
                                        }
                                    } else {
                                        if ((h.nodeIndex + d) % first == 0) {
                                            j = true
                                        }
                                    }
                                    if (j ^ b) {
                                        e.push(h)
                                    }
                                }
                                r = e
                            } else {
                                var f = v.expr[m[1]];
                                if (typeof f != "string") {
                                    f = v.expr[m[1]][m[2]]
                                }
                                f = eval("false||function(a,i){return " + f + "}");
                                r = v.grep(r, f, b)
                            }
                        }
                    }
                }
            }
            return {
                r: r,
                t: t
            }
        },
        dir: function(a, b) {
            var c = [];
            var d = a[b];
            while (d && d != document) {
                if (d.nodeType == 1) {
                    c.push(d)
                }
                d = d[b]
            }
            return c
        },
        nth: function(a, b, c, d) {
            b = b || 1;
            var e = 0;
            for (; a; a = a[c]) {
                if (a.nodeType == 1 && ++e == b) {
                    break
                }
            }
            return a
        },
        sibling: function(n, a) {
            var r = [];
            for (; n; n = n.nextSibling) {
                if (n.nodeType == 1 && (!a || n != a)) {
                    r.push(n)
                }
            }
            return r
        }
    });
    v.event = {
        add: function(b, c, d, e) {
            if (v.browser.msie && b.setInterval != undefined) {
                b = window
            }
            if (!d.guid) {
                d.guid = this.guid++
            }
            if (e != undefined) {
                var f = d;
                d = function() {
                    return f.apply(this, arguments)
                };
                d.data = e;
                d.guid = f.guid
            }
            var g = c.split(".");
            c = g[0];
            d.type = g[1];
            var h = v.data(b, "events") || v.data(b, "events", {});
            var i = v.data(b, "handle",
            function() {
                var a;
                if (typeof v == "undefined" || v.event.triggered) {
                    return a
                }
                a = v.event.handle.apply(b, arguments);
                return a
            });
            var j = h[c];
            if (!j) {
                j = h[c] = {};
                if (b.addEventListener) {
                    b.addEventListener(c, i, false)
                } else {
                    b.attachEvent("on" + c, i)
                }
            }
            j[d.guid] = d;
            this.global[c] = true
        },
        guid: 1,
        global: {},
        remove: function(a, b, c) {
            var d = v.data(a, "events"),
            ret,
            index;
            if (typeof b == "string") {
                var e = b.split(".");
                b = e[0]
            }
            if (d) {
                if (b && b.type) {
                    c = b.handler;
                    b = b.type
                }
                if (!b) {
                    for (b in d) {
                        this.remove(a, b)
                    }
                } else {
                    if (d[b]) {
                        if (c) {
                            delete d[b][c.guid]
                        } else {
                            for (c in d[b]) {
                                if (!e[1] || d[b][c].type == e[1]) {
                                    delete d[b][c]
                                }
                            }
                        }
                        for (ret in d[b]) {
                            break
                        }
                        if (!ret) {
                            if (a.removeEventListener) {
                                a.removeEventListener(b, v.data(a, "handle"), false)
                            } else {
                                a.detachEvent("on" + b, v.data(a, "handle"))
                            }
                            ret = null;
                            delete d[b]
                        }
                    }
                }
                for (ret in d) {
                    break
                }
                if (!ret) {
                    v.removeData(a, "events");
                    v.removeData(a, "handle")
                }
            }
        },
        trigger: function(a, b, c, d, e) {
            b = v.makeArray(b || []);
            if (!c) {
                if (this.global[a]) {
                    v("*").add([window, document]).trigger(a, b)
                }
            } else {
                var f, ret, fn = v.isFunction(c[a] || null),
                evt = !b[0] || !b[0].preventDefault;
                if (evt) {
                    b.unshift(this.fix({
                        type: a,
                        target: c
                    }))
                }
                b[0].type = a;
                if (v.isFunction(v.data(c, "handle"))) {
                    f = v.data(c, "handle").apply(c, b)
                }
                if (!fn && c["on" + a] && c["on" + a].apply(c, b) === false) {
                    f = false
                }
                if (evt) {
                    b.shift()
                }
                if (e && e.apply(c, b) === false) {
                    f = false
                }
                if (fn && d !== false && f !== false && !(v.nodeName(c, "a") && a == "click")) {
                    this.triggered = true;
                    c[a]()
                }
                this.triggered = false
            }
            return f
        },
        handle: function(a) {
            var b;
            a = v.event.fix(a || window.event || {});
            var d = a.type.split(".");
            a.type = d[0];
            var c = v.data(this, "events") && v.data(this, "events")[a.type],
            args = Array.prototype.slice.call(arguments, 1);
            args.unshift(a);
            for (var j in c) {
                args[0].handler = c[j];
                args[0].data = c[j].data;
                if (!d[1] || c[j].type == d[1]) {
                    var e = c[j].apply(this, args);
                    if (b !== false) {
                        b = e
                    }
                    if (e === false) {
                        a.preventDefault();
                        a.stopPropagation()
                    }
                }
            }
            if (v.browser.msie) {
                a.target = a.preventDefault = a.stopPropagation = a.handler = a.data = null
            }
            return b
        },
        fix: function(a) {
            var c = a;
            a = v.extend({},
            c);
            a.preventDefault = function() {
                if (c.preventDefault) {
                    c.preventDefault()
                }
                c.returnValue = false
            };
            a.stopPropagation = function() {
                if (c.stopPropagation) {
                    c.stopPropagation()
                }
                c.cancelBubble = true
            };
            if (!a.target && a.srcElement) {
                a.target = a.srcElement
            }
            if (v.browser.safari && a.target.nodeType == 3) {
                a.target = c.target.parentNode
            }
            if (!a.relatedTarget && a.fromElement) {
                a.relatedTarget = a.fromElement == a.target ? a.toElement: a.fromElement
            }
            if (a.pageX == null && a.clientX != null) {
                var e = document.documentElement,
                b = document.body;
                a.pageX = a.clientX + (e && e.scrollLeft || b.scrollLeft || 0);
                a.pageY = a.clientY + (e && e.scrollTop || b.scrollTop || 0)
            }
            if (!a.which && (a.charCode || a.keyCode)) {
                a.which = a.charCode || a.keyCode
            }
            if (!a.metaKey && a.ctrlKey) {
                a.metaKey = a.ctrlKey
            }
            if (!a.which && a.button) {
                a.which = (a.button & 1 ? 1 : (a.button & 2 ? 3 : (a.button & 4 ? 2 : 0)))
            }
            return a
        }
    };
    v.fn.extend({
        bind: function(a, b, c) {
            return a == "unload" ? this.one(a, b, c) : this.each(function() {
                v.event.add(this, a, c || b, c && b)
            })
        },
        one: function(b, c, d) {
            return this.each(function() {
                v.event.add(this, b,
                function(a) {
                    v(this).unbind(a);
                    return (d || c).apply(this, arguments)
                },
                d && c)
            })
        },
        unbind: function(a, b) {
            return this.each(function() {
                v.event.remove(this, a, b)
            })
        },
        trigger: function(a, b, c) {
            return this.each(function() {
                v.event.trigger(a, b, this, true, c)
            })
        },
        triggerHandler: function(a, b, c) {
            if (this[0]) {
                return v.event.trigger(a, b, this[0], false, c)
            }
        },
        toggle: function() {
            var a = arguments;
            return this.click(function(e) {
                this.lastToggle = 0 == this.lastToggle ? 1 : 0;
                e.preventDefault();
                return a[this.lastToggle].apply(this, [e]) || false
            })
        },
        hover: function(f, g) {
            function handleHover(e) {
                var p = e.relatedTarget;
                while (p && p != this) {
                    try {
                        p = p.parentNode
                    } catch(e) {
                        p = this
                    }
                }
                if (p == this) {
                    return false
                }
                return (e.type == "mouseover" ? f: g).apply(this, [e])
            }
            return this.mouseover(handleHover).mouseout(handleHover)
        },
        ready: function(f) {
            bindReady();
            if (v.isReady) {
                f.apply(document, [v])
            } else {
                v.readyList.push(function() {
                    return f.apply(this, [v])
                })
            }
            return this
        }
    });
    v.extend({
        isReady: false,
        readyList: [],
        ready: function() {
            if (!v.isReady) {
                v.isReady = true;
                if (v.readyList) {
                    v.each(v.readyList,
                    function() {
                        this.apply(document)
                    });
                    v.readyList = null
                }
                if (v.browser.mozilla || v.browser.opera) {
                    document.removeEventListener("DOMContentLoaded", v.ready, false)
                }
                if (!window.frames.length) {
                    v(window).load(function() {
                        v("#__ie_init").remove()
                    })
                }
            }
        }
    });
    v.each(("blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,change,select,submit,keydown,keypress,keyup,error").split(","),
    function(i, o) {
        v.fn[o] = function(f) {
            return f ? this.bind(o, f) : this.trigger(o)
        }
    });
    var D = false;
    function bindReady() {
        if (D) {
            return
        }
        D = true;
        if (v.browser.mozilla || v.browser.opera) {
            document.addEventListener("DOMContentLoaded", v.ready, false)
        } else {
            if (v.browser.msie) {
                document.write("<script id=__ie_init defer=true src=//:><\/script>");
                var a = document.getElementById("__ie_init");
                if (a) {
                    a.onreadystatechange = function() {
                        if (this.readyState != "complete") {
                            return
                        }
                        v.ready()
                    }
                }
                a = null
            } else {
                if (v.browser.safari) {
                    v.safariTimer = setInterval(function() {
                        if (document.readyState == "loaded" || document.readyState == "complete") {
                            clearInterval(v.safariTimer);
                            v.safariTimer = null;
                            v.ready()
                        }
                    },
                    10)
                }
            }
        }
        v.event.add(window, "load", v.ready)
    }
    v.fn.extend({
        load: function(c, d, e) {
            if (v.isFunction(c)) {
                return this.bind("load", c)
            }
            var f = c.indexOf(" ");
            if (f >= 0) {
                var g = c.slice(f, c.length);
                c = c.slice(0, f)
            }
            e = e ||
            function() {};
            var h = "GET";
            if (d) {
                if (v.isFunction(d)) {
                    e = d;
                    d = null
                } else {
                    d = v.param(d);
                    h = "POST"
                }
            }
            var i = this;
            v.ajax({
                url: c,
                type: h,
                data: d,
                complete: function(a, b) {
                    if (b == "success" || b == "notmodified") {
                        i.html(g ? v("<div/>").append(a.responseText.replace(/<script(.|\s)*?\/script>/g, "")).find(g) : a.responseText)
                    }
                    setTimeout(function() {
                        i.each(e, [a.responseText, b, a])
                    },
                    13)
                }
            });
            return this
        },
        serialize: function() {
            return v.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                return v.nodeName(this, "form") ? v.makeArray(this.elements) : this
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || /select|textarea/i.test(this.nodeName) || /text|hidden|password/i.test(this.type))
            }).map(function(i, b) {
                var c = v(this).val();
                return c == null ? null: c.constructor == Array ? v.map(c,
                function(a, i) {
                    return {
                        name: b.name,
                        value: a
                    }
                }) : {
                    name: b.name,
                    value: c
                }
            }).get()
        }
    });
    v.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),
    function(i, o) {
        v.fn[o] = function(f) {
            return this.bind(o, f)
        }
    });
    var E = (new Date).getTime();
    v.extend({
        get: function(a, b, c, d) {
            if (v.isFunction(b)) {
                c = b;
                b = null
            }
            return v.ajax({
                type: "GET",
                url: a,
                data: b,
                success: c,
                dataType: d
            })
        },
        getScript: function(a, b) {
            return v.get(a, null, b, "script")
        },
        getJSON: function(a, b, c) {
            return v.get(a, b, c, "json")
        },
        post: function(a, b, c, d) {
            if (v.isFunction(b)) {
                c = b;
                b = {}
            }
            return v.ajax({
                type: "POST",
                url: a,
                data: b,
                success: c,
                dataType: d
            })
        },
        ajaxSetup: function(a) {
            v.extend(v.ajaxSettings, a)
        },
        ajaxSettings: {
            global: true,
            type: "GET",
            timeout: 0,
            contentType: "application/x-www-form-urlencoded",
            processData: true,
            async: true,
            data: null
        },
        lastModified: {},
        ajax: function(s) {
            var c, jsre = /=(\?|%3F)/g,
            status, data;
            s = v.extend(true, s, v.extend(true, {},
            v.ajaxSettings, s));
            if (s.data && s.processData && typeof s.data != "string") {
                s.data = v.param(s.data)
            }
            if (s.dataType == "jsonp") {
                if (s.type.toLowerCase() == "get") {
                    if (!s.url.match(jsre)) {
                        s.url += (s.url.match(/\?/) ? "&": "?") + (s.jsonp || "callback") + "=?"
                    }
                } else {
                    if (!s.data || !s.data.match(jsre)) {
                        s.data = (s.data ? s.data + "&": "") + (s.jsonp || "callback") + "=?"
                    }
                }
                s.dataType = "json"
            }
            if (s.dataType == "json" && (s.data && s.data.match(jsre) || s.url.match(jsre))) {
                c = "jsonp" + E++;
                if (s.data) {
                    s.data = s.data.replace(jsre, "=" + c)
                }
                s.url = s.url.replace(jsre, "=" + c);
                s.dataType = "script";
                window[c] = function(a) {
                    data = a;
                    success();
                    complete();
                    window[c] = undefined;
                    try {
                        delete window[c]
                    } catch(e) {}
                }
            }
            if (s.dataType == "script" && s.cache == null) {
                s.cache = false
            }
            if (s.cache === false && s.type.toLowerCase() == "get") {
                s.url += (s.url.match(/\?/) ? "&": "?") + "_=" + (new Date()).getTime()
            }
            if (s.data && s.type.toLowerCase() == "get") {
                s.url += (s.url.match(/\?/) ? "&": "?") + s.data;
                s.data = null
            }
            if (s.global && !v.active++) {
                v.event.trigger("ajaxStart")
            }
            if (!s.url.indexOf("http") && s.dataType == "script") {
                var d = document.getElementsByTagName("head")[0];
                var f = document.createElement("script");
                f.src = s.url;
                if (!c && (s.success || s.complete)) {
                    var g = false;
                    f.onload = f.onreadystatechange = function() {
                        if (!g && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                            g = true;
                            success();
                            complete();
                            d.removeChild(f)
                        }
                    }
                }
                d.appendChild(f);
                return
            }
            var h = false;
            var i = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
            i.open(s.type, s.url, s.async);
            if (s.data) {
                i.setRequestHeader("Content-Type", s.contentType)
            }
            if (s.ifModified) {
                i.setRequestHeader("If-Modified-Since", v.lastModified[s.url] || "Thu, 01 Jan 1970 00:00:00 GMT")
            }
            i.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            if (s.beforeSend) {
                s.beforeSend(i)
            }
            if (s.global) {
                v.event.trigger("ajaxSend", [i, s])
            }
            var j = function(a) {
                if (!h && i && (i.readyState == 4 || a == "timeout")) {
                    h = true;
                    if (k) {
                        clearInterval(k);
                        k = null
                    }
                    status = a == "timeout" && "timeout" || !v.httpSuccess(i) && "error" || s.ifModified && v.httpNotModified(i, s.url) && "notmodified" || "success";
                    if (status == "success") {
                        try {
                            data = v.httpData(i, s.dataType)
                        } catch(e) {
                            status = "parsererror"
                        }
                    }
                    if (status == "success") {
                        var b;
                        try {
                            b = i.getResponseHeader("Last-Modified")
                        } catch(e) {}
                        if (s.ifModified && b) {
                            v.lastModified[s.url] = b
                        }
                        if (!c) {
                            success()
                        }
                    } else {
                        v.handleError(s, i, status)
                    }
                    complete();
                    if (s.async) {
                        i = null
                    }
                }
            };
            if (s.async) {
                var k = setInterval(j, 13);
                if (s.timeout > 0) {
                    setTimeout(function() {
                        if (i) {
                            i.abort();
                            if (!h) {
                                j("timeout")
                            }
                        }
                    },
                    s.timeout)
                }
            }
            try {
                i.send(s.data)
            } catch(e) {
                v.handleError(s, i, null, e)
            }
            if (!s.async) {
                j()
            }
            return i;
            function success() {
                if (s.success) {
                    s.success(data, status)
                }
                if (s.global) {
                    v.event.trigger("ajaxSuccess", [i, s])
                }
            }
            function complete() {
                if (s.complete) {
                    s.complete(i, status)
                }
                if (s.global) {
                    v.event.trigger("ajaxComplete", [i, s])
                }
                if (s.global && !--v.active) {
                    v.event.trigger("ajaxStop")
                }
            }
        },
        handleError: function(s, a, b, e) {
            if (s.error) {
                s.error(a, b, e)
            }
            if (s.global) {
                v.event.trigger("ajaxError", [a, s, e])
            }
        },
        active: 0,
        httpSuccess: function(r) {
            try {
                return ! r.status && location.protocol == "file:" || (r.status >= 200 && r.status < 300) || r.status == 304 || v.browser.safari && r.status == undefined
            } catch(e) {}
            return false
        },
        httpNotModified: function(a, b) {
            try {
                var c = a.getResponseHeader("Last-Modified");
                return a.status == 304 || c == v.lastModified[b] || v.browser.safari && a.status == undefined
            } catch(e) {}
            return false
        },
        httpData: function(r, a) {
            var b = r.getResponseHeader("content-type");
            var c = a == "xml" || !a && b && b.indexOf("xml") >= 0;
            var d = c ? r.responseXML: r.responseText;
            if (c && d.documentElement.tagName == "parsererror") {
                throw "parsererror"
            }
            if (a == "script") {
                v.globalEval(d)
            }
            if (a == "json") {
                d = eval("(" + d + ")")
            }
            return d
        },
        param: function(a) {
            var s = [];
            if (a.constructor == Array || a.jquery) {
                v.each(a,
                function() {
                    s.push(encodeURIComponent(this.name) + "=" + encodeURIComponent(this.value))
                })
            } else {
                for (var j in a) {
                    if (a[j] && a[j].constructor == Array) {
                        v.each(a[j],
                        function() {
                            s.push(encodeURIComponent(j) + "=" + encodeURIComponent(this))
                        })
                    } else {
                        s.push(encodeURIComponent(j) + "=" + encodeURIComponent(a[j]))
                    }
                }
            }
            return s.join("&").replace(/%20/g, "+")
        }
    });
    v.fn.extend({
        show: function(a, b) {
            return a ? this.animate({
                height: "show",
                width: "show",
                opacity: "show"
            },
            a, b) : this.filter(":hidden").each(function() {
                this.style.display = this.oldblock ? this.oldblock: "";
                if (v.css(this, "display") == "none") {
                    this.style.display = "block"
                }
            }).end()
        },
        hide: function(a, b) {
            return a ? this.animate({
                height: "hide",
                width: "hide",
                opacity: "hide"
            },
            a, b) : this.filter(":visible").each(function() {
                this.oldblock = this.oldblock || v.css(this, "display");
                if (this.oldblock == "none") {
                    this.oldblock = "block"
                }
                this.style.display = "none"
            }).end()
        },
        _toggle: v.fn.toggle,
        toggle: function(a, b) {
            return v.isFunction(a) && v.isFunction(b) ? this._toggle(a, b) : a ? this.animate({
                height: "toggle",
                width: "toggle",
                opacity: "toggle"
            },
            a, b) : this.each(function() {
                v(this)[v(this).is(":hidden") ? "show": "hide"]()
            })
        },
        slideDown: function(a, b) {
            return this.animate({
                height: "show"
            },
            a, b)
        },
        slideUp: function(a, b) {
            return this.animate({
                height: "hide"
            },
            a, b)
        },
        slideToggle: function(a, b) {
            return this.animate({
                height: "toggle"
            },
            a, b)
        },
        fadeIn: function(a, b) {
            return this.animate({
                opacity: "show"
            },
            a, b)
        },
        fadeOut: function(a, b) {
            return this.animate({
                opacity: "hide"
            },
            a, b)
        },
        fadeTo: function(a, b, c) {
            return this.animate({
                opacity: b
            },
            a, c)
        },
        animate: function(g, h, i, j) {
            var k = v.speed(h, i, j);
            return this[k.queue === false ? "each": "queue"](function() {
                k = v.extend({},
                k);
                var f = v(this).is(":hidden"),
                self = this;
                for (var p in g) {
                    if (g[p] == "hide" && f || g[p] == "show" && !f) {
                        return v.isFunction(k.complete) && k.complete.apply(this)
                    }
                    if (p == "height" || p == "width") {
                        k.display = v.css(this, "display");
                        k.overflow = this.style.overflow
                    }
                }
                if (k.overflow != null) {
                    this.style.overflow = "hidden"
                }
                k.curAnim = v.extend({},
                g);
                v.each(g,
                function(a, b) {
                    var e = new v.fx(self, k, a);
                    if (/toggle|show|hide/.test(b)) {
                        e[b == "toggle" ? f ? "show": "hide": b](g)
                    } else {
                        var c = b.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),
                        start = e.cur(true) || 0;
                        if (c) {
                            var d = parseFloat(c[2]),
                            unit = c[3] || "px";
                            if (unit != "px") {
                                self.style[a] = (d || 1) + unit;
                                start = ((d || 1) / e.cur(true)) * start;
                                self.style[a] = start + unit
                            }
                            if (c[1]) {
                                d = ((c[1] == "-=" ? -1 : 1) * d) + start
                            }
                            e.custom(start, d, unit)
                        } else {
                            e.custom(start, b, "")
                        }
                    }
                });
                return true
            })
        },
        queue: function(a, b) {
            if (v.isFunction(a)) {
                b = a;
                a = "fx"
            }
            if (!a || (typeof a == "string" && !b)) {
                return F(this[0], a)
            }
            return this.each(function() {
                if (b.constructor == Array) {
                    F(this, a, b)
                } else {
                    F(this, a).push(b);
                    if (F(this, a).length == 1) {
                        b.apply(this)
                    }
                }
            })
        },
        stop: function() {
            var a = v.timers;
            return this.each(function() {
                for (var i = 0; i < a.length; i++) {
                    if (a[i].elem == this) {
                        a.splice(i--, 1)
                    }
                }
            }).dequeue()
        }
    });
    var F = function(a, b, c) {
        if (!a) {
            return
        }
        var q = v.data(a, b + "queue");
        if (!q || c) {
            q = v.data(a, b + "queue", c ? v.makeArray(c) : [])
        }
        return q
    };
    v.fn.dequeue = function(a) {
        a = a || "fx";
        return this.each(function() {
            var q = F(this, a);
            q.shift();
            if (q.length) {
                q[0].apply(this)
            }
        })
    };
    v.extend({
        speed: function(a, b, c) {
            var d = a && a.constructor == Object ? a: {
                complete: c || !c && b || v.isFunction(a) && a,
                duration: a,
                easing: c && b || b && b.constructor != Function && b
            };
            d.duration = (d.duration && d.duration.constructor == Number ? d.duration: {
                slow: 600,
                fast: 200
            } [d.duration]) || 400;
            d.old = d.complete;
            d.complete = function() {
                v(this).dequeue();
                if (v.isFunction(d.old)) {
                    d.old.apply(this)
                }
            };
            return d
        },
        easing: {
            linear: function(p, n, a, b) {
                return a + b * p
            },
            swing: function(p, n, a, b) {
                return (( - Math.cos(p * Math.PI) / 2) + 0.5) * b + a
            }
        },
        timers: [],
        fx: function(a, b, c) {
            this.options = b;
            this.elem = a;
            this.prop = c;
            if (!b.orig) {
                b.orig = {}
            }
        }
    });
    v.fx.prototype = {
        update: function() {
            if (this.options.step) {
                this.options.step.apply(this.elem, [this.now, this])
            } (v.fx.step[this.prop] || v.fx.step._default)(this);
            if (this.prop == "height" || this.prop == "width") {
                this.elem.style.display = "block"
            }
        },
        cur: function(a) {
            if (this.elem[this.prop] != null && this.elem.style[this.prop] == null) {
                return this.elem[this.prop]
            }
            var r = parseFloat(v.curCSS(this.elem, this.prop, a));
            return r && r > -10000 ? r: parseFloat(v.css(this.elem, this.prop)) || 0
        },
        custom: function(b, c, d) {
            this.startTime = (new Date()).getTime();
            this.start = b;
            this.end = c;
            this.unit = d || this.unit || "px";
            this.now = this.start;
            this.pos = this.state = 0;
            this.update();
            var e = this;
            function t() {
                return e.step()
            }
            t.elem = this.elem;
            v.timers.push(t);
            if (v.timers.length == 1) {
                var f = setInterval(function() {
                    var a = v.timers;
                    for (var i = 0; i < a.length; i++) {
                        if (!a[i]()) {
                            a.splice(i--, 1)
                        }
                    }
                    if (!a.length) {
                        clearInterval(f)
                    }
                },
                13)
            }
        },
        show: function() {
            this.options.orig[this.prop] = v.attr(this.elem.style, this.prop);
            this.options.show = true;
            this.custom(0, this.cur());
            if (this.prop == "width" || this.prop == "height") {
                this.elem.style[this.prop] = "1px"
            }
            v(this.elem).show()
        },
        hide: function() {
            this.options.orig[this.prop] = v.attr(this.elem.style, this.prop);
            this.options.hide = true;
            this.custom(this.cur(), 0)
        },
        step: function() {
            var t = (new Date()).getTime();
            if (t > this.options.duration + this.startTime) {
                this.now = this.end;
                this.pos = this.state = 1;
                this.update();
                this.options.curAnim[this.prop] = true;
                var a = true;
                for (var i in this.options.curAnim) {
                    if (this.options.curAnim[i] !== true) {
                        a = false
                    }
                }
                if (a) {
                    if (this.options.display != null) {
                        this.elem.style.overflow = this.options.overflow;
                        this.elem.style.display = this.options.display;
                        if (v.css(this.elem, "display") == "none") {
                            this.elem.style.display = "block"
                        }
                    }
                    if (this.options.hide) {
                        this.elem.style.display = "none"
                    }
                    if (this.options.hide || this.options.show) {
                        for (var p in this.options.curAnim) {
                            v.attr(this.elem.style, p, this.options.orig[p])
                        }
                    }
                }
                if (a && v.isFunction(this.options.complete)) {
                    this.options.complete.apply(this.elem)
                }
                return false
            } else {
                var n = t - this.startTime;
                this.state = n / this.options.duration;
                this.pos = v.easing[this.options.easing || (v.easing.swing ? "swing": "linear")](this.state, n, 0, 1, this.options.duration);
                this.now = this.start + ((this.end - this.start) * this.pos);
                this.update()
            }
            return true
        }
    };
    v.fx.step = {
        scrollLeft: function(a) {
            a.elem.scrollLeft = a.now
        },
        scrollTop: function(a) {
            a.elem.scrollTop = a.now
        },
        opacity: function(a) {
            v.attr(a.elem.style, "opacity", a.now)
        },
        _default: function(a) {
            a.elem.style[a.prop] = a.now + a.unit
        }
    };
    v.fn.offset = function() {
        var b = 0,
        top = 0,
        elem = this[0],
        results;
        if (elem) {
            with(v.browser) {
                var c = v.css(elem, "position") == "absolute",
                parent = elem.parentNode,
                offsetParent = elem.offsetParent,
                doc = elem.ownerDocument,
                safari2 = safari && parseInt(version) < 522;
                if (elem.getBoundingClientRect) {
                    box = elem.getBoundingClientRect();
                    add(box.left + Math.max(doc.documentElement.scrollLeft, doc.body.scrollLeft), box.top + Math.max(doc.documentElement.scrollTop, doc.body.scrollTop));
                    if (msie) {
                        var d = v("html").css("borderWidth");
                        d = (d == "medium" || v.boxModel && parseInt(version) >= 7) && 2 || d;
                        add( - d, -d)
                    }
                } else {
                    add(elem.offsetLeft, elem.offsetTop);
                    while (offsetParent) {
                        add(offsetParent.offsetLeft, offsetParent.offsetTop);
                        if (mozilla && /^t[d|h]$/i.test(parent.tagName) || !safari2) {
                            d(offsetParent)
                        }
                        if (safari2 && !c && v.css(offsetParent, "position") == "absolute") {
                            c = true
                        }
                        offsetParent = offsetParent.offsetParent
                    }
                    while (parent.tagName && !/^body|html$/i.test(parent.tagName)) {
                        if (!/^inline|table-row.*$/i.test(v.css(parent, "display"))) {
                            add( - parent.scrollLeft, -parent.scrollTop)
                        }
                        if (mozilla && v.css(parent, "overflow") != "visible") {
                            d(parent)
                        }
                        parent = parent.parentNode
                    }
                    if (safari2 && c) {
                        add( - doc.body.offsetLeft, -doc.body.offsetTop)
                    }
                }
                results = {
                    top: top,
                    left: b
                }
            }
        }
        return results;
        function d(a) {
            add(v.css(a, "borderLeftWidth"), v.css(a, "borderTopWidth"))
        }
        function add(l, t) {
            b += parseInt(l) || 0;
            top += parseInt(t) || 0
        }
    }
})();
var JJ = jQuery.noConflict();
(function(G) {
    var A = G.fn.height,
    E = G.fn.width;
    G.fn.extend({
        height: function() {
            if (!this[0]) {
                D()
            }
            if (this[0] == window) {
                if (G.browser.opera || (G.browser.safari && parseInt(G.browser.version) > 520)) {
                    return self.innerHeight - ((G(document).height() > self.innerHeight) ? B() : 0)
                } else {
                    if (G.browser.safari) {
                        return self.innerHeight
                    } else {
                        return G.boxModel && document.documentElement.clientHeight || document.body.clientHeight
                    }
                }
            }
            if (this[0] == document) {
                return Math.max((G.boxModel && document.documentElement.scrollHeight || document.body.scrollHeight), document.body.offsetHeight)
            }
            return A.apply(this, arguments)
        },
        width: function() {
            if (!this[0]) {
                D()
            }
            if (this[0] == window) {
                if (G.browser.opera || (G.browser.safari && parseInt(G.browser.version) > 520)) {
                    return self.innerWidth - ((G(document).width() > self.innerWidth) ? B() : 0)
                } else {
                    if (G.browser.safari) {
                        return self.innerWidth
                    } else {
                        return G.boxModel && document.documentElement.clientWidth || document.body.clientWidth
                    }
                }
            }
            if (this[0] == document) {
                if (G.browser.mozilla) {
                    var J = self.pageXOffset;
                    self.scrollTo(99999999, self.pageYOffset);
                    var I = self.pageXOffset;
                    self.scrollTo(J, self.pageYOffset);
                    return document.body.offsetWidth + I
                } else {
                    return Math.max(((G.boxModel && !G.browser.safari) && document.documentElement.scrollWidth || document.body.scrollWidth), document.body.offsetWidth)
                }
            }
            return E.apply(this, arguments)
        },
        innerHeight: function() {
            if (!this[0]) {
                D()
            }
            return this[0] == window || this[0] == document ? this.height() : this.is(":visible") ? this[0].offsetHeight - C(this, "borderTopWidth") - C(this, "borderBottomWidth") : this.height() + C(this, "paddingTop") + C(this, "paddingBottom")
        },
        innerWidth: function() {
            if (!this[0]) {
                D()
            }
            return this[0] == window || this[0] == document ? this.width() : this.is(":visible") ? this[0].offsetWidth - C(this, "borderLeftWidth") - C(this, "borderRightWidth") : this.width() + C(this, "paddingLeft") + C(this, "paddingRight")
        },
        outerHeight: function(I) {
            if (!this[0]) {
                D()
            }
            I = G.extend({
                margin: false
            },
            I || {});
            return this[0] == window || this[0] == document ? this.height() : this.is(":visible") ? this[0].offsetHeight + (I.margin ? (C(this, "marginTop") + C(this, "marginBottom")) : 0) : this.height() + C(this, "borderTopWidth") + C(this, "borderBottomWidth") + C(this, "paddingTop") + C(this, "paddingBottom") + (I.margin ? (C(this, "marginTop") + C(this, "marginBottom")) : 0)
        },
        outerWidth: function(I) {
            if (!this[0]) {
                D()
            }
            I = G.extend({
                margin: false
            },
            I || {});
            return this[0] == window || this[0] == document ? this.width() : this.is(":visible") ? this[0].offsetWidth + (I.margin ? (C(this, "marginLeft") + C(this, "marginRight")) : 0) : this.width() + C(this, "borderLeftWidth") + C(this, "borderRightWidth") + C(this, "paddingLeft") + C(this, "paddingRight") + (I.margin ? (C(this, "marginLeft") + C(this, "marginRight")) : 0)
        },
        scrollLeft: function(I) {
            if (!this[0]) {
                D()
            }
            if (I != undefined) {
                return this.each(function() {
                    if (this == window || this == document) {
                        window.scrollTo(I, G(window).scrollTop())
                    } else {
                        this.scrollLeft = I
                    }
                })
            }
            if (this[0] == window || this[0] == document) {
                return self.pageXOffset || G.boxModel && document.documentElement.scrollLeft || document.body.scrollLeft
            }
            return this[0].scrollLeft
        },
        scrollTop: function(I) {
            if (!this[0]) {
                D()
            }
            if (I != undefined) {
                return this.each(function() {
                    if (this == window || this == document) {
                        window.scrollTo(G(window).scrollLeft(), I)
                    } else {
                        this.scrollTop = I
                    }
                })
            }
            if (this[0] == window || this[0] == document) {
                return self.pageYOffset || G.boxModel && document.documentElement.scrollTop || document.body.scrollTop
            }
            return this[0].scrollTop
        },
        position: function(I) {
            return this.offset({
                margin: false,
                scroll: false,
                relativeTo: this.offsetParent()
            },
            I)
        },
        offset: function(J, P) {
            if (!this[0]) {
                D()
            }
            var O = 0,
            N = 0,
            X = 0,
            S = 0,
            Y = this[0],
            M = this[0],
            L,
            I,
            W = G.css(Y, "position"),
            V = G.browser.mozilla,
            Q = G.browser.msie,
            U = G.browser.opera,
            a = G.browser.safari,
            K = G.browser.safari && parseInt(G.browser.version) > 520,
            R = false,
            T = false,
            J = G.extend({
                margin: true,
                border: false,
                padding: false,
                scroll: true,
                lite: false,
                relativeTo: document.body
            },
            J || {});
            if (J.lite) {
                return this.offsetLite(J, P)
            }
            if (J.relativeTo.jquery) {
                J.relativeTo = J.relativeTo[0]
            }
            if (Y.tagName == "BODY") {
                O = Y.offsetLeft;
                N = Y.offsetTop;
                if (V) {
                    O += C(Y, "marginLeft") + (C(Y, "borderLeftWidth") * 2);
                    N += C(Y, "marginTop") + (C(Y, "borderTopWidth") * 2)
                } else {
                    if (U) {
                        O += C(Y, "marginLeft");
                        N += C(Y, "marginTop")
                    } else {
                        if ((Q && jQuery.boxModel)) {
                            O += C(Y, "borderLeftWidth");
                            N += C(Y, "borderTopWidth")
                        } else {
                            if (K) {
                                O += C(Y, "marginLeft") + C(Y, "borderLeftWidth");
                                N += C(Y, "marginTop") + C(Y, "borderTopWidth")
                            }
                        }
                    }
                }
            } else {
                do {
                    I = G.css(M, "position");
                    O += M.offsetLeft;
                    N += M.offsetTop;
                    if ((V && !M.tagName.match(/^t[d|h]$/i)) || Q || K) {
                        O += C(M, "borderLeftWidth");
                        N += C(M, "borderTopWidth");
                        if (V && I == "absolute") {
                            R = true
                        }
                        if (Q && I == "relative") {
                            T = true
                        }
                    }
                    L = M.offsetParent || document.body;
                    if (J.scroll || V) {
                        do {
                            if (J.scroll) {
                                X += M.scrollLeft;
                                S += M.scrollTop
                            }
                            if (U && (G.css(M, "display") || "").match(/table-row|inline/)) {
                                X = X - ((M.scrollLeft == M.offsetLeft) ? M.scrollLeft: 0);
                                S = S - ((M.scrollTop == M.offsetTop) ? M.scrollTop: 0)
                            }
                            if (V && M != Y && G.css(M, "overflow") != "visible") {
                                O += C(M, "borderLeftWidth");
                                N += C(M, "borderTopWidth")
                            }
                            M = M.parentNode
                        } while ( M != L )
                    }
                    M = L;
                    if (M == J.relativeTo && !(M.tagName == "BODY" || M.tagName == "HTML")) {
                        if (V && M != Y && G.css(M, "overflow") != "visible") {
                            O += C(M, "borderLeftWidth");
                            N += C(M, "borderTopWidth")
                        }
                        if (((a && !K) || U) && I != "static") {
                            O -= C(L, "borderLeftWidth");
                            N -= C(L, "borderTopWidth")
                        }
                        break
                    }
                    if (M.tagName == "BODY" || M.tagName == "HTML") {
                        if (((a && !K) || (Q && G.boxModel)) && W != "absolute" && W != "fixed") {
                            O += C(M, "marginLeft");
                            N += C(M, "marginTop")
                        }
                        if (K || (V && !R && W != "fixed") || (Q && W == "static" && !T)) {
                            O += C(M, "borderLeftWidth");
                            N += C(M, "borderTopWidth")
                        }
                        break
                    }
                } while ( M )
            }
            var Z = H(Y, J, O, N, X, S);
            if (P) {
                G.extend(P, Z);
                return this
            } else {
                return Z
            }
        },
        offsetLite: function(Q, L) {
            if (!this[0]) {
                D()
            }
            var N = 0,
            M = 0,
            K = 0,
            P = 0,
            O = this[0],
            J,
            Q = G.extend({
                margin: true,
                border: false,
                padding: false,
                scroll: true,
                relativeTo: document.body
            },
            Q || {});
            if (Q.relativeTo.jquery) {
                Q.relativeTo = Q.relativeTo[0]
            }
            do {
                N += O.offsetLeft;
                M += O.offsetTop;
                J = O.offsetParent || document.body;
                if (Q.scroll) {
                    do {
                        K += O.scrollLeft;
                        P += O.scrollTop;
                        O = O.parentNode
                    } while ( O != J )
                }
                O = J
            } while ( O && O . tagName != "BODY" && O . tagName != "HTML" && O != Q . relativeTo );
            var I = H(this[0], Q, N, M, K, P);
            if (L) {
                G.extend(L, I);
                return this
            } else {
                return I
            }
        },
        offsetParent: function() {
            if (!this[0]) {
                D()
            }
            var I = this[0].offsetParent;
            while (I && (I.tagName != "BODY" && G.css(I, "position") == "static")) {
                I = I.offsetParent
            }
            return G(I)
        }
    });
    var D = function() {
        throw "Dimensions: jQuery collection is empty"
    };
    var C = function(I, J) {
        return parseInt(G.css(I.jquery ? I[0] : I, J)) || 0
    };
    var H = function(M, L, J, N, I, K) {
        if (!L.margin) {
            J -= C(M, "marginLeft");
            N -= C(M, "marginTop")
        }
        if (L.border && ((G.browser.safari && parseInt(G.browser.version) < 520) || G.browser.opera)) {
            J += C(M, "borderLeftWidth");
            N += C(M, "borderTopWidth")
        } else {
            if (!L.border && !((G.browser.safari && parseInt(G.browser.version) < 520) || G.browser.opera)) {
                J -= C(M, "borderLeftWidth");
                N -= C(M, "borderTopWidth")
            }
        }
        if (L.padding) {
            J += C(M, "paddingLeft");
            N += C(M, "paddingTop")
        }
        if (L.scroll && (!G.browser.opera || M.offsetLeft != M.scrollLeft && M.offsetTop != M.scrollLeft)) {
            I -= M.scrollLeft;
            K -= M.scrollTop
        }
        return L.scroll ? {
            top: N - K,
            left: J - I,
            scrollTop: K,
            scrollLeft: I
        }: {
            top: N,
            left: J
        }
    };
    var F = 0;
    var B = function() {
        if (!F) {
            var I = G("<div>").css({
                width: 100,
                height: 100,
                overflow: "auto",
                position: "absolute",
                top: -1000,
                left: -1000
            }).appendTo("body");
            F = 100 - I.append("<div>").find("div").css({
                width: "100%",
                height: 200
            }).width();
            I.remove()
        }
        return F
    }
})(jQuery);
var JSON = function() {
    var m = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    },
    s = {
        "boolean": function(x) {
            return String(x)
        },
        number: function(x) {
            return isFinite(x) ? String(x) : "null"
        },
        string: function(x) {
            if (/["\\\x00-\x1f]/.test(x)) {
                x = x.replace(/([\x00-\x1f\\"])/g,
                function(a, b) {
                    var c = m[b];
                    if (c) {
                        return c
                    }
                    c = b.charCodeAt();
                    return "\\u00" + Math.floor(c / 16).toString(16) + (c % 16).toString(16)
                })
            }
            return '"' + x + '"'
        },
        object: function(x) {
            if (x) {
                var a = [],
                b,
                f,
                i,
                l,
                v;
                if (x instanceof Array) {
                    a[0] = "[";
                    l = x.length;
                    for (i = 0; i < l; i += 1) {
                        v = x[i];
                        f = s[typeof v];
                        if (f) {
                            v = f(v);
                            if (typeof v == "string") {
                                if (b) {
                                    a[a.length] = ","
                                }
                                a[a.length] = v;
                                b = true
                            }
                        }
                    }
                    a[a.length] = "]"
                } else {
                    if (x instanceof Object) {
                        a[0] = "{";
                        for (i in x) {
                            v = x[i];
                            f = s[typeof v];
                            if (f) {
                                v = f(v);
                                if (typeof v == "string") {
                                    if (b) {
                                        a[a.length] = ","
                                    }
                                    a.push(s.string(i), ":", v);
                                    b = true
                                }
                            }
                        }
                        a[a.length] = "}"
                    } else {
                        return
                    }
                }
                return a.join("")
            }
            return "null"
        }
    };
    return {
        copyright: "(c)2005 JSON.org",
        license: "http://www.crockford.com/JSON/license.html",
        stringify: function(v) {
            var f = s[typeof v];
            if (f) {
                v = f(v);
                if (typeof v == "string") {
                    return v
                }
            }
            return null
        },
        parse: function(a) {
            try {
                return ! (/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(a.replace(/"(\\.|[^"\\])*"/g, ""))) && eval("(" + a + ")")
            } catch(e) {
                return false
            }
        }
    }
} ();
JJ(document).ready(function() {
    load_tooltips();
    JJ("#statusPanel").ajaxStart(function() {
        JJ("#statusPanel").show("normal")
    });
    JJ("#statusPanel").ajaxStop(function() {
        JJ("#statusPanel").fadeOut("normal")
    });
    load_all();
    load_footer()
});
function load_footer() {
    if (JJ("#footer").html() != null) {
        JJ("#footer").html('<div align="center">&#80;&#111;&#119;&#101;&#114;&#101;&#100;&#32;&#98;&#121; <a href="http://&#119;&#119;&#119;&#46;&#97;&#112;&#112;&#110;&#105;&#116;&#114;&#111;&#46;&#99;&#111;&#109;" style="font-size: 100%"><strong>&#77;&#97;&#99;&#104;&#70;&#111;&#114;&#109;</strong></a><br />&copy; &#67;&#111;&#112;&#121;&#114;&#105;&#103;&#104;&#116;&#32;&#50;&#48;&#48;&#55;&#45;&#50;&#48;&#48;&#56;&#32;&#65;&#112;&#112;&#110;&#105;&#116;&#114;&#111;&#32;&#83;&#111;&#102;&#116;&#119;&#97;&#114;&#101;</div>')
    } else {
        JJ("body").append('<div id="footer"><div align="center">&#80;&#111;&#119;&#101;&#114;&#101;&#100;&#32;&#98;&#121; <a href="http://&#119;&#119;&#119;&#46;&#97;&#112;&#112;&#110;&#105;&#116;&#114;&#111;&#46;&#99;&#111;&#109;" style="font-size: 100%"><strong>&#77;&#97;&#99;&#104;&#70;&#111;&#114;&#109;</strong></a><br />&copy; &#67;&#111;&#112;&#121;&#114;&#105;&#103;&#104;&#116;&#32;&#50;&#48;&#48;&#55;&#45;&#50;&#48;&#48;&#56;&#32;&#65;&#112;&#112;&#110;&#105;&#116;&#114;&#111;&#32;&#83;&#111;&#102;&#116;&#119;&#97;&#114;&#101;</div></div>')
    }
}
function load_tooltips() {
    JJ(".tooltip").each(function(A) {
        JJ(this).click(function() { (JJ(this).next().attr("id") == "tooltip") ? remove_tooltip(this.nextSibling) : show_tooltip(this);
            return false
        })
    })
}
function show_tooltip(A) {
    if (JJ("#tooltip").length) {
        remove_tooltip("#tooltip")
    }
    var B = '<span onclick="remove_tooltip (this)" id="tooltip" style="display: none;"><b>' + A.title + "</b><em>" + A.rel + "</em></span>";
    JJ(B).insertAfter(A).show("normal")
}
function remove_tooltip(A) {
    JJ(A).fadeOut("normal",
    function() {
        JJ(this).remove()
    })
}
function prepare_form_property_values() {
    JJ("#form_title").val(main_form.data.name);
    JJ("#form_description").val(main_form.data.description);
    JJ("#form_password_data").val(main_form.data.password);
    JJ("#form_password_option").click(function() {
        if (JJ("#form_password").hasClass("hide")) {
            JJ("#form_password").removeClass("hide");
            update_form(tmp_form_password, "password");
            JJ("#form_password_data").val(tmp_form_password);
            JJ("#form_password_data").focus().select()
        } else {
            JJ("#form_password").addClass("hide");
            tmp_form_password = JJ("#form_password_data").val();
            update_form("", "password")
        }
    });
    if (main_form.data.password == "") {
        JJ("#form_password_option").attr("checked", "");
        JJ("#form_password").addClass("hide")
    } else {
        JJ("#form_password_option").attr("checked", "checked");
        JJ("#form_password").removeClass("hide")
    }
    if (main_form.data.unique_ip == 1) {
        JJ("#form_unique_ip").attr("checked", "checked")
    } else {
        JJ("#form_unique_ip").attr("checked", "")
    }
    if (main_form.data.captcha == 1) {
        JJ("#form_captcha").attr("checked", "checked")
    } else {
        JJ("#form_captcha").attr("checked", "")
    }
    if (main_form.data.review == 1) {
        JJ("#form_review").attr("checked", "checked")
    } else {
        JJ("#form_review").attr("checked", "")
    }
    if (main_form.data.redirect != "") {
        JJ("#form_success_message").addClass("hide");
        JJ("#form_redirect_url").removeClass("hide");
        JJ("#form_redirect_option").attr("checked", "checked");
        JJ("#form_redirect_url").val(main_form.data.redirect)
    } else {
        JJ("#form_redirect_url").addClass("hide");
        JJ("#form_success_message").removeClass("hide");
        JJ("#form_success_message_option").attr("checked", "checked");
        JJ("#form_success_message").val(main_form.data.success_message)
    }
}
var element_properties = function() {};
element_properties.prototype = {
    initialize: function(A) {
        this.id = A
    },
    render: function() {
        JJ("#prop_phone_default").css("display", "none");
        JJ("#prop_time_noseconds").css("display", "none");
        JJ("#prop_default_country").css("display", "none");
        JJ("#prop_date_format").css("display", "none");
        JJ("#prop_access_control").css("display", "none");
        JJ("#prop_element_type").css("display", "none");
        JJ("#prop_randomize").css("display", "none");
        JJ("#list_buttons").css("display", "none");
        JJ("#element_position").css("display", "none");
        JJ("#prop_default_value").css("display", "none");
        JJ("#prop_phone_format").css("display", "none");
        JJ("#prop_currency_format").css("display", "none");
        JJ("#prop_element_size").css("display", "none");
        JJ("#prop_name_format").css("display", "none");
        JJ("#prop_choices").css("display", "none");
        JJ("#prop_options").css("display", "none");
        JJ("#element_inactive").css("display", "none");
        JJ("#all_properties").css("display", "none");
        JJ("#element_label").val(ds.get(this.id, "title"));
        for (var A = 0; A < components[ds.get(this.id, "type")].length; A++) {
            this[components[ds.get(this.id, "type")][A]]()
        }
        JJ("#element_instructions").val(ds.get(this.id, "guidelines"));
        JJ("#element_position").html(parseInt(ds.get(this.id, "position")) + 1);
        JJ("#all_properties").css("display", "block");
        JJ("#element_position").css("display", "block");
        JJ("#list_buttons").css("display", "block");
        JJ("#element_label").select().focus()
    },
    types: function() {
        JJ("#prop_element_type").css("display", "block");
        if (ds.get(this.id, "is_db_live") == "1") {
            JJ("#element_type").attr("disabled", "disabled")
        } else {
            JJ("#element_type").attr("disabled", "")
        }
        var B = ds.get(this.id, "type");
        if (B == "name") {
            B = "simple_name"
        } else {
            if (B == "simple_phone") {
                B = "phone"
            } else {
                if (B == "europe_date") {
                    B = "date"
                }
            }
        }
        element_types = document.getElementById("element_type");
        for (var A = 0; A < element_types.options.length; A++) {
            if (element_types.options[A].value == B) {
                element_types.selectedIndex = A
            }
        }
    },
    required: function() {
        JJ("#prop_options").css("display", "block");
        if (ds.get(active_element, "is_required") == "1") {
            JJ("#element_required").attr("checked", "checked")
        } else {
            JJ("#element_required").attr("checked", "")
        }
        var A = ds.get(active_element, "type");
        if (A == "checkbox" || A == "radio") {
            this.switch_unique("hide")
        } else {
            this.switch_unique("show")
        }
    },
    switch_unique: function(A) {
        if (A == "hide") {
            JJ("#element_unique").css("visibility", "hidden")
        } else {
            JJ("#element_unique").css("visibility", "visible")
        }
        var B = ds.get(active_element, "type");
        if (B == "radio" || B == "checkbox" || B == "select" || B == "simple_name" || B == "name" || B == "address" || B == "file") {
            JJ("#element_unique_span").css("display", "none")
        } else {
            JJ("#element_unique_span").css("display", "block")
        }
    },
    size: function() {
        JJ("#prop_element_size").css("display", "block");
        var B = ds.get(this.id, "size");
        field_sizes = document.getElementById("field_size");
        for (var A = 0; A < field_sizes.options.length; A++) {
            if (field_sizes.options[A].value == B) {
                field_sizes.selectedIndex = A
            }
        }
    },
    choices: function() {
        JJ("#prop_choices").css("display", "block");
        JJ("#element_choices").html("");
        options = ds.get(this.id, "options");
        field_type = ds.get(this.id, "type");
        all_markup = new Array();
        for (var A = 0; A < options.length; A++) {
            el_val = options[A].option.replace(/\"/g, "&quot;");
            if (options[A].is_default == 1) {
                loc = "images/icons/star.gif";
                msg = "Default"
            } else {
                loc = "images/icons/stardim.gif";
                msg = "Make Default"
            }
            all_markup[A] = '<li><input id="choice' + A + '" class="text" type="text" autocomplete="off" value="' + el_val + "\" onkeyup=\"set_properties(this.value, 'choices', " + A + ')" onkeypress="choices_event(event,' + A + ')" /> <img class="button" src="images/icons/add.gif" alt="Add" title="Add" onclick="insert_choice(' + (A + 1) + ')" /> <img class="button" src="images/icons/delete.gif" alt="Delete" title="Delete" onclick="delete_checkbox(' + options[A].id + ", " + options[A].is_db_live + ", '" + field_type + "', " + A + ')" /> <img class="button" src="' + loc + '" alt="' + msg + '" title="' + msg + '" onclick="set_choice_default(' + A + ')" /></li>'
        }
        JJ("#element_choices").html(all_markup.join(""))
    },
    unique: function() {
        if (ds.get(active_element, "is_unique") == "1") {
            JJ("#element_unique").attr("checked", "checked")
        } else {
            JJ("#element_unique").attr("checked", "")
        }
    },
    is_private: function() {
        JJ("#prop_access_control").css("display", "block");
        if (ds.get(active_element, "is_private") == "1") {
            JJ("#fieldPrivate").attr("checked", "checked")
        } else {
            JJ("#fieldPublic").attr("checked", "checked")
        }
    },
    phone_default: function() {
        JJ("#prop_phone_default").css("display", "block");
        el_val = ds.get(this.id, "default_value");
        JJ("#element_phone_default1").val(el_val.substring(0, 3));
        JJ("#element_phone_default2").val(el_val.substring(3, 6));
        JJ("#element_phone_default3").val(el_val.substring(6, 10))
    },
    address_default: function() {
        JJ("#prop_default_country").css("display", "block");
        el_val = ds.get(this.id, "default_value");
        countries = document.getElementById("element_countries");
        for (var A = 0; A < countries.options.length; A++) {
            if (countries.options[A].value == el_val) {
                countries.selectedIndex = A
            }
        }
    },
    randomize: function() {
        JJ("#prop_randomize").css("display", "block");
        if (ds.get(active_element, "constraint") == "random") {
            JJ("#element_random").attr("checked", "checked")
        } else {
            JJ("#element_not_random").attr("checked", "checked")
        }
    },
    noseconds: function() {
        JJ("#prop_time_noseconds").css("display", "block");
        if (ds.get(active_element, "constraint") == "show_seconds") {
            JJ("#time_noseconds").attr("checked", "checked")
        } else {
            JJ("#time_noseconds").attr("checked", "")
        }
    },
    text_default: function() {
        JJ("#prop_default_value").css("display", "block");
        JJ("#element_default").val(ds.get(this.id, "default_value"))
    },
    date: function() {
        JJ("#prop_date_format").css("display", "block");
        date_type = ds.get(active_element, "type");
        dates = document.getElementById("date_type");
        for (var A = 0; A < dates.options.length; A++) {
            if (dates.options[A].value == date_type) {
                dates.selectedIndex = A
            }
        }
    },
    name: function() {
        JJ("#prop_name_format").css("display", "block");
        if (ds.get(this.id, "is_db_live") == "1") {
            JJ("#name_format").attr("disabled", "disabled")
        } else {
            JJ("#name_format").attr("disabled", "")
        }
        name_type = ds.get(active_element, "type");
        name_format = document.getElementById("name_format");
        for (var A = 0; A < name_format.options.length; A++) {
            if (name_format.options[A].value == name_type) {
                name_format.selectedIndex = A
            }
        }
    },
    phone: function() {
        JJ("#prop_phone_format").css("display", "block");
        phone_type = ds.get(active_element, "type");
        phone_format = document.getElementById("phone_format");
        for (var A = 0; A < phone_format.options.length; A++) {
            if (phone_format.options[A].value == phone_type) {
                phone_format.selectedIndex = A
            }
        }
    },
    currency: function() {
        JJ("#prop_currency_format").css("display", "block");
        constraint = ds.get(active_element, "constraint");
        money_format = document.getElementById("money_format");
        for (var A = 0; A < money_format.options.length; A++) {
            if (money_format.options[A].value == constraint) {
                money_format.selectedIndex = A
            }
        }
    }
};
var field = function() {};
field.prototype = {
    initialize: function(A) {
        this.id = A
    },
    display: function() {
        this.li = document.createElement("li");
        this.generate_markup();
        this.li.id = "li_" + this.id;
        JJ(this.li).addClass("drag");
        if (ds.get(this.id, "is_private") == "1") {
            JJ(this.li).addClass("private")
        }
        return this.li
    },
    selected: function() {
        JJ(this.li).addClass("current_edit")
    },
    unselect: function() {
        JJ(this.li).removeClass("current_edit")
    },
    generate_markup: function() {
        this.li.innerHTML = '<img id="arrow" src="images/icons/arrow.gif" alt="" class="arrow"><a href="#" class="hover_ready" onclick="return false;" title="Click to edit. Drag to reorder.">' + this.field_label() + this[ds.get(this.id, "type")]() + "</a>" + this.element_actions()
    },
    field_label: function() {
        label_id = "title" + this.id;
        label_val = ds.get(this.id, "title");
        label_val = label_val.replace(/\n/g, "<br />");
        var B = "";
        if (ds.get(this.id, "is_required") == "1") {
            B = '<span class="req"> *</span>'
        }
        var A = '<label class="desc" id="' + label_id + '">' + label_val + B + "</label>";
        return A
    },
    element_actions: function() {
        if (JJ.browser.msie) {
            style = 'style="margin-top: -18px"'
        } else {
            style = ""
        }
        return '<div class="element_actions" ' + style + '><img src="images/icons/duplicate.gif" alt="Duplicate" title="Duplicate" onclick="duplicate_element(' + this.id + ')"> <img src="images/icons/delete.gif" alt="Delete." title="Delete" onclick="delete_element(' + this.id + ')"></div>'
    },
    text: function() {
        return '<div><input readonly="readonly" id="field' + this.id + '" class="text ' + ds.get(this.id, "size") + '" type="text"></div>'
    },
    textarea: function() {
        return '<div><textarea type="text" readonly="readonly" id="field' + this.id + '" class="textarea ' + ds.get(this.id, "size") + '" rows="" cols=""></textarea></div>'
    },
    checkbox: function() {
        element_options = ds.get(this.id, "options");
        var A = "";
        for (i = 0; i < element_options.length; i++) {
            el_val = element_options[i].option;
            if (el_val == "") {
                el_val = "&nbsp;"
            }
            if (element_options[i].is_default == 1) {
                checked = 'checked="checked"'
            } else {
                checked = ""
            }
            A = A + '<input class="checkbox" ' + checked + ' type="checkbox"><label class="choice">' + el_val + "</label>\n"
        }
        A = '<span id="field' + this.id + '">' + A + "</span>";
        return A
    },
    select: function() {
        element_options = ds.get(this.id, "options");
        var A = "";
        for (i = 0; i < element_options.length; i++) {
            if (element_options[i].is_default == 1) {
                selected = 'selected="selected"'
            } else {
                selected = ""
            }
            A = A + "<option " + selected + ">" + element_options[i].option + "</option>"
        }
        A = '<div><select id="field' + this.id + '" class="select ' + ds.get(this.id, "size") + '">' + A + "</select></div>";
        return A
    },
    radio: function() {
        element_options = ds.get(this.id, "options");
        var A = "";
        for (i = 0; i < element_options.length; i++) {
            el_val = element_options[i].option;
            if (el_val == "") {
                el_val = "&nbsp;"
            }
            if (element_options[i].is_default == 1) {
                name = "radiogroup" + this.id;
                checked = 'checked="checked"'
            } else {
                name = "radiogroup";
                checked = ""
            }
            A = A + '<input class="radio" name="' + name + '" ' + checked + ' type="radio"><label class="choice">' + el_val + "</label>\n"
        }
        A = '<span id="field' + this.id + '">' + A + "</span>";
        return A
    },
    name: function() {
        return '<div><span><input readonly="readonly" class="text" size="2" type="text"><label>Title</label></span><span><input readonly="readonly" class="text" size="12" type="text"><label>First</label></span><span><input readonly="readonly" class="text" size="14" type="text"><label>Last</label></span><span><input readonly="readonly" class="text" size="3" type="text"><label>Suffix</label></span></div>'
    },
    simple_name: function() {
        return '<div><span><input readonly="readonly" class="text" size="12" type="text"><label>First</label></span><span><input readonly="readonly" class="text" size="14" type="text"><label>Last</label></span></div>'
    },
    date: function() {
        return '<div><span><input readonly="readonly" class="text" size="2" type="text"> / <label>MM</label></span><span><input readonly="readonly" class="text" size="2" type="text"> / <label>DD</label></span><span><input readonly="readonly" class="text" size="4" type="text"> <label>YYYY</label></span><img src="images/icons/calendar.gif" alt="Pick Date." class="icon"></div>'
    },
    europe_date: function() {
        return '<div><span><input readonly="readonly" class="text" size="2" type="text"> / <label>DD</label></span><span><input readonly="readonly" class="text" size="2" type="text"> / <label>MM</label></span><span><input readonly="readonly" class="text" size="4" type="text"> <label>YYYY</label></span><img src="images/icons/calendar.gif" alt="Pick Date." class="icon"></div>'
    },
    time: function() {
        if (ds.get(this.id, "constraint") == "show_seconds") {
            return '<div id="time' + this.id + '"><span><input readonly="readonly" class="text" size="2" type="text"> : <label>HH</label></span><span><input readonly="readonly" class="text" size="2" type="text"> : <label>MM</label></span><span><input readonly="readonly" class="text" size="2" type="text"><label>SS</label></span><span><select class="select" style="width: 4em;"><option>AM</option><option>PM</option></select><label>AM/PM</label></span></div>'
        } else {
            return '<div id="time' + this.id + '"><span><input readonly="readonly" class="text" size="2" type="text"> : <label>HH</label></span><span><input readonly="readonly" class="text" size="2" type="text"><label>MM</label></span><span><select class="select" style="width: 4em;"><option>AM</option><option>PM</option></select><label>AM/PM</label></span></div>'
        }
    },
    phone: function() {
        return '<div><span><input readonly="readonly" class="text" size="3" type="text"> - <label>(###)</label></span><span><input readonly="readonly" class="text" size="3" type="text"> - <label>###</label></span><span><input readonly="readonly" class="text" size="4" type="text"><label>####</label></span></div>'
    },
    simple_phone: function() {
        return '<div class="full"><input readonly="readonly" id="field' + this.id + '" class="text medium" type="text"></div>'
    },
    address: function() {
        return '<div class="full"><div class="full"><input readonly="readonly" class="text large" type="text"><label>Street Address</label></div><div class="full"><input readonly="readonly" class="text large" type="text"><label>Address Line 2</label></div><div class="left"><input readonly="readonly" class="text medium" type="text"><label>City</label></div><div class="right"><input readonly="readonly" class="text medium" type="text"><label>State / Province / Region</label></div><div class="left"><input readonly="readonly" class="text medium" type="text"><label>Zip / Postal Code</label></div><div class="right"><select class="select medium" name=""><option value=""></option></select><label>Country</label></div></div>'
    },
    money: function() {
        currency = ds.get(this.id, "constraint");
        symbol = "$";
        main_curr = "Dollars";
        sub_curr = "Cents";
        major = "10";
        decimal = " . ";
        if (currency == "euro") {
            symbol = "&#8364;";
            main_curr = "Euros";
            sub_curr = "Cents"
        }
        if (currency == "pound") {
            symbol = "&#163;";
            main_curr = "Pounds";
            sub_curr = "Pence"
        }
        if (currency == "yen") {
            symbol = "&#165;";
            main_curr = "Yen";
            decimal = "";
            major = "15"
        }
        if (currency != "yen") {
            minor = '<span><input readonly="readonly" class="text" size="2" type="text"><label>' + sub_curr + "</label></span>"
        } else {
            minor = ""
        }
        return "<div><span>" + symbol + '</span><span><input readonly="readonly" class="text" size="' + major + '" type="text">' + decimal + "<label>" + main_curr + "</label></span>" + minor + "</div>"
    },
    file: function() {
        return '<div><input class="text" readonly="readonly" type="file"></div>'
    },
    email: function() {
        return '<div><input value="@" readonly="readonly" id="field' + this.id + '" class="text ' + ds.get(this.id, "size") + '" type="text"></div>'
    },
    url: function() {
        return '<div><input value="http://" readonly="readonly" id="field' + this.id + '" class="text ' + ds.get(this.id, "size") + '" type="text"></div>'
    },
    number: function() {
        return '<div><input value="0123456789" readonly="readonly" id="field' + this.id + '" class="text ' + ds.get(this.id, "size") + '" type="text"></div>'
    },
    section: function() {
        var A = ds.get(this.id, "guidelines");
        A = A.replace(/\n/g, "<br />");
        return '<span id="guidelines' + ds.get(this.id, "id") + '">' + A + "</span>"
    }
};
var data_source = function() {};
data_source.prototype = {
    initialize: function() {
        this.data = {
            elements: []
        }
    },
    new_element: function(A, C, B) {
        title = "Untitled";
        switch (A) {
        case "text":
            title = "单行文本";
            break;
        case "textarea":
            title = "多行文本";
            break;
        case "select":
            title = "下拉菜单";
            break;
        case "radio":
            title = "单项选择";
            break;
        case "checkbox":
            title = "多项选择";
            break;
        case "name":
            title = "名字";
            break;
        case "simple_name":
            title = "Name";
            break;
        case "date":
            title = "日期";
            break;
        case "europe_date":
            title = "Date";
            break;
        case "time":
            title = "时间";
            break;
        case "phone":
            title = "电话";
            break;
        case "simple_phone":
            title = "Phone";
            break;
        case "address":
            title = "地址";
            break;
        case "money":
            title = "价格";
            break;
        case "url":
            title = "网址";
            break;
        case "email":
            title = "Email";
            break;
        case "number":
            title = "数字";
            break;
        case "file":
            title = "上传文件";
            break;
        case "section":
            title = "节分割";
            break
        }
        this.data.elements.push({
            title: title,
            guidelines: "",
            size: "medium",
            is_required: "0",
            is_unique: "0",
            is_private: "0",
            type: A,
            object: B,
            position: C,
            id: C,
            is_db_live: "0",
            default_value: "",
            constraint: "",
            options: [{
                option: "第一个选项",
                is_default: 0,
                is_db_live: "0",
                id: "0"
            },
            {
                option: "第二个选项",
                is_default: 0,
                is_db_live: "0",
                id: "0"
            },
            {
                option: "第三个选项",
                is_default: 0,
                is_db_live: "0",
                id: "0"
            }]
        })
    },
    get: function(D, A) {
        for (var B = 0; B < this.data.elements.length; B++) {
            var C = this.data.elements[B];
            if (D == C.id) {
                el = C;
                break
            }
        }
        return el[A]
    },
    set: function(C, A, B) {
        jQuery.each(this.data.elements,
        function(E, D) {
            if (B.replace) {
                B = B.replace(/\\\"/g, '\\ "')
            }
            if (D.id == C) {
                D[A] = B
            }
        })
    },
    set_option: function(C, A, B) {
        if (A.replace) {
            A = A.replace(/\\\"/g, '\\ "')
        }
        jQuery.each(this.data.elements,
        function(E, D) {
            if (D.id == C) {
                D.options[B].option = A
            }
        })
    },
    set_default_option: function(B, A) {
        jQuery.each(this.data.elements,
        function(D, C) {
            if (C.id == A) {
                jQuery.each(C.options,
                function(E, F) {
                    if (E == B && F.is_default == 0) {
                        F.is_default = 1
                    } else {
                        if (E == B && F.is_default == 1) {
                            F.is_default = 0
                        } else {
                            if (C.type != "checkbox") {
                                F.is_default = 0
                            }
                        }
                    }
                })
            }
        })
    },
    remove_element: function(C) {
        for (var A = 0; A < this.data.elements.length; A++) {
            var B = this.data.elements[A];
            if (C == B.id) {
                ds.data.elements.splice(A, 1);
                break
            }
        }
    },
    get_element: function(C, B) {
        var A;
        jQuery.each(this.data.elements,
        function(E, D) {
            if (D.position == C) { (B) ? A = D[B] : A = E
            }
        });
        return A
    },
    stringify: function() {
        save_elements = new Array();
        jQuery.each(this.data.elements,
        function(B, A) {
            save_elements.push(A.object);
            A.object = ""
        });
        ret = JSON.stringify(this.data);
        jQuery.each(this.data.elements,
        function(B, A) {
            A.object = save_elements[B]
        });
        return ret
    }
};
var form = function() {};
form.prototype = {
    initialize: function() {
        this.data = {
            id: "0",
            name: "Untitled Form",
            description: "This is your form description. Click here to edit.",
            redirect: "",
            success_message: "Success! Your submission has been saved!",
            password: "",
            frame_height: "",
            unique_ip: "0",
            captcha: "0",
            review: "0"
        }
    },
    display: function() {
        this.li = document.createElement("li");
        JJ(this.li).attr("id", "active_form").addClass("info");
        this.li.innerHTML = '<img src="images/icons/arrow.gif" alt="" class="arrow"><a href="#" onclick="return false;" class="hover_ready" title="Click to edit."><h2 id="form_name">' + this.data.name + '</h2><p id="form_desc">' + this.data.description.replace(/\n/g, "<br />") + "</p></a>";
        return this.li
    },
    selected: function() {
        JJ(this.li).addClass("current_edit")
    },
    unselect: function() {
        JJ(this.li).removeClass("current_edit")
    }
};
var components = {
    text: ["types", "size", "required", "unique", "is_private", "text_default"],
    textarea: ["types", "size", "required", "unique", "is_private", "text_default"],
    select: ["types", "size", "required", "choices", "is_private"],
    radio: ["types", "choices", "required", "randomize", "is_private"],
    checkbox: ["types", "choices", "required", "is_private"],
    name: ["types", "required", "is_private", "name"],
    simple_name: ["types", "required", "is_private", "name"],
    date: ["types", "required", "unique", "is_private", "date"],
    europe_date: ["types", "required", "unique", "is_private", "date"],
    time: ["types", "required", "unique", "is_private", "noseconds"],
    phone: ["types", "required", "unique", "is_private", "phone", "phone_default"],
    simple_phone: ["types", "required", "unique", "is_private", "phone", "text_default"],
    address: ["types", "required", "is_private", "address_default"],
    money: ["types", "required", "unique", "is_private", "currency"],
    url: ["types", "size", "required", "unique", "is_private", "text_default"],
    email: ["types", "size", "required", "unique", "is_private", "text_default"],
    number: ["types", "size", "required", "unique", "is_private", "text_default"],
    file: ["types", "required", "is_private"],
    section: ["types", "is_private"]
};
var redirect_url = "http://";
var tmp_form_password = "";
var ds = new data_source();
ds.initialize();
var element_count = 0;
var active_element;
var element_view;
var main_form;
var current_offset;
function load_all() {
    display_sidebar("add_elements");
    element_view = new element_properties();
    element_view.initialize(1);
    new_form();
    JJ("#active_form").css("display", "none");
    populate_elements();
    populate_form();
    JJ("#form_save_button").click(function() {
        save_form_data()
    });
    JJ("#statusPanel").fadeOut("normal")
}
function new_form() {
    ctrl = new form();
    ctrl.initialize();
    main_form = ctrl;
    markup = ctrl.display();
    document.getElementById("form_elements").insertBefore(markup, document.getElementById("form_elements").lastChild);
    JJ(ctrl.li).mousedown(function() {
        activate_form()
    })
}
function insert_element(A) {
    if (A != "pagebreak") {
        JJ("#nofields").css("display", "none");
        if (A == "currency") {
            A = "money"
        }
        ctrl = initialize_control(A);
        console.log(ctrl);
        if (A == "address") {
            ds.set(ctrl.id, "size", "large")
        }
        if (A == "simple_name") {
            ds.set(ctrl.id, "size", "small")
        }
        display_control(ctrl);
        add_element_events(ctrl);
        display_save_button();
        init_dragdrop();
        update_pos("true")
    }
}
function initialize_control(A) {
    pos = create_id(A);
    ctrl = new field();
    ctrl.initialize(pos);
    ds.new_element(A, pos, ctrl);
    return ctrl;
}
function display_control(A) {
    markup = A.display();
    markup.style.display = "none";
    JJ("#form_elements").append(markup);
    if (JJ.browser.msie) {
        JJ(markup).fadeIn("normal")
    } else {
        JJ(markup).show("normal")
    }
}
function add_element_events(A) {
    JJ(A.li).click(function() {
        select_element(A)
    });
    JJ(A.li).mousedown(function() {
        A.li.style.cursor = "move"
    });
    JJ(A.li).mouseup(function() {
        A.li.style.cursor = "pointer"
    })
}
function display_save_button() {
    JJ("#div_button").removeClass("hide")
}
function create_id(A) {
    ret = element_count;
    element_count += 1;
    if (A == "address") {
        element_count += 5
    }
    if (A == "simple_name") {
        element_count += 3
    }
    if (A == "name") {
        element_count += 3
    }
    if (A == "checkbox") {
        element_count += 100
    }
    return ret
}
function select_element(A) {
    unselect_allfields();
    main_form.unselect();
    A.selected();
    active_element = A.id;
    JJ("#element_properties").css("margin-top", JJ(A.li).offset().top - 146 + "px");
    show_field_property();
    display_properties();
    current_offset = JJ(A.li).offset().top - 146;
    adjust_element_properties()
}
function adjust_element_properties() {
    JJ("#element_properties").css("margin-top", JJ(ds.get(active_element, "object").li).offset().top - 146 + "px")
}
function unselect_allfields() {
    jQuery.each(ds.data.elements,
    function(B, A) {
        A.object.unselect()
    });
    JJ("#element_inactive").css("display", "block");
    JJ("#element_position").css("display", "none");
    JJ("#all_properties").css("display", "none");
    JJ("#list_buttons").css("display", "none")
}
function display_properties() {
    display_sidebar("element_properties");
    element_view = new element_properties(active_element);
    element_view.initialize(active_element);
    element_view.render()
}
function set_properties(B, A, C) {
    if (A != "choices") {
        ds.set(active_element, A, B)
    } else {
        ds.set_option(active_element, B, C)
    }
    live_preview[A](B)
}
live_preview = {
    title: function(A) {
        if (JJ("#title" + active_element).length) {
            JJ("#title" + active_element).html(A.replace(/\n/g, "<br />"))
        }
        this.is_required(ds.get(active_element, "is_required"))
    },
    guidelines: function(A) {
        if (JJ("#guidelines" + active_element)) {
            JJ("#guidelines" + active_element).html(A.replace(/\n/g, "<br />"))
        }
    },
    type: function(A) {
        if (A != "date" && A != "europe_date" && A != "phone" && A != "simple_phone") {
            child_id = create_id(A);
            ds.set(active_element, "id", child_id);
            active_element = child_id;
            if (A == "name") {
                ds.set(active_element, "size", "small")
            }
            if (A == "simple_name") {
                ds.set(active_element, "size", "small")
            }
            if (A == "address") {
                ds.set(active_element, "size", "large")
            }
        }
        this.redraw();
        element_view.id = active_element;
        element_view.render()
    },
    size: function(A) {
        JJ("#field" + active_element).attr("class", "text " + ds.get(active_element, "type") + " " + A);
        this.redraw()
    },
    is_required: function(A) {
        if (A == "1") {
            JJ("#title" + active_element).html(JJ("#title" + active_element).html() + ' <span class="req">*</span>')
        } else {
            JJ("#title" + active_element).html(ds.get(active_element, "title").replace(/\n/g, "<br />"))
        }
    },
    is_unique: function() {
        this.redraw()
    },
    is_private: function(A) {
        if (A == 1) {
            JJ(ds.get(active_element, "object").li).addClass("private")
        } else {
            JJ(ds.get(active_element, "object").li).removeClass("private")
        }
    },
    choices: function() {
        this.redraw()
    },
    constraint: function() {
        this.redraw()
    },
    default_value: function() {},
    redraw: function() {
        ds.get(active_element, "object").li.innerHTML = "";
        ds.get(active_element, "object").li.id = "li_" + active_element;
        ds.get(active_element, "object").id = active_element;
        ds.get(active_element, "object").generate_markup();
        ds.get(active_element, "object").selected()
    }
};
function insert_choice(A) {
    ds.get(active_element, "options").splice(A, 0, {
        option: "",
        is_default: "0",
        is_db_live: "0",
        id: "0"
    });
    element_view.choices();
    set_properties("", "choices", A);
    if (JJ("#choice" + (A)).length) {
        JJ("#choice" + A).focus()
    }
}
function delete_choice(A) {
    if (A == 0 && ds.get(active_element, "options").length == 1) {
        alert("You cannot delete all choices.");
        return false
    } else {
        ds.get(active_element, "options").splice(A, 1)
    }
    element_view.choices();
    live_preview.choices();
    if (JJ("#choice" + (A - 1)).length) {
        JJ("#choice" + (A - 1)).focus()
    } else {
        JJ("#choice" + (A)).focus()
    }
}
function delete_checkbox(c, d, e, f) {
    if (e == "checkbox" && ds.get(active_element, "options").length == 1) {
        alert("You cannot delete all choices.");
        return false
    }
    if (e == "checkbox" && d == 1) {
        confirmed = confirm("All data associated with this choice will be deleted. Are you sure you want to delete this choice?")
    } else {
        confirmed = true
    }
    if (confirmed) {
        if (d == 1 && e == "checkbox") {
            JJ("#statusText").html("Deleting... Please Wait...");
            JJ.post("delete_element_option.php", {
                form_id: json_form.id,
                element_id: active_element,
                option_id: c
            },
            function(a) {
                var b = eval("(" + a + ")");
                if (b.status == "ok") {
                    delete_choice(f)
                } else {
                    alert("An error occured while deleting your field!")
                }
            })
        } else {
            delete_choice(f)
        }
    }
}
function set_choice_default(A) {
    ds.set_default_option(A, active_element);
    element_view.choices();
    ds.get(active_element, "object").li.innerHTML = "";
    ds.get(active_element, "object").generate_markup();
    ds.get(active_element, "object").selected()
}
function activate_form() {
    unselect_allfields();
    main_form.selected();
    display_form_properties()
}
function update_form(B, A) {
    if (B.replace) {
        B = B.replace(/\\\"/g, '\\ "')
    }
    main_form.data[A] = B;
    if (form_updates[A]) {
        form_updates[A](B)
    }
}
form_updates = {
    name: function(A) {
        JJ("#form_name").html(A)
    },
    description: function(A) {
        JJ("#form_desc").html(A.replace(/\n/g, "<br />"))
    }
};
function display_fields(A) {
    unselect_allfields();
    main_form.unselect();
    if (JJ.browser.msie) {
        if (A != 0) {
            JJ("#add_elements").css("margin-top", current_offset - 10)
        } else {
            JJ("#add_elements").css("margin-top", 0)
        }
    }
    display_sidebar("add_elements");
    JJ("#tabs").attr("class", "add_field_tab")
}
function display_field_properties() {
    if (ds.data.elements.length == 0) {
        JJ("#nofields").css("display", "block");
        unselect_allfields();
        JJ("#div_button").addClass("hide");
        main_form.unselect()
    } else {
        if (!active_element) {
            active_element = ds.get_element(0, "id");
            JJ("#element_inactive").css("display", "block");
            JJ("#element_position").css("display", "none");
            JJ("#all_properties").css("display", "none")
        }
    }
    display_sidebar("element_properties");
    show_field_property()
}
function display_form_properties() {
    unselect_allfields();
    main_form.selected();
    display_sidebar("form_properties");
    prepare_form_property_values();
    show_form_property()
}
function display_sidebar(A) {
    hide_sidebar();
    switch_display(A, "block")
}
function hide_sidebar() {
    switch_display("add_elements", "none");
    switch_display("element_properties", "none");
    switch_display("form_properties", "none");
    switch_display("add_elements_button", "none")
}
function switch_display(A, B) {
    JJ("#" + A).css("display", B);
    if (A == "element_properties") {
        JJ("#add_elements_button").css("display", B)
    }
}
function delete_element(A) {
    if (ds.get(A, "is_db_live") == "1") {
        confirmed = confirm("All data associated with this field will be deleted. Are you sure you want to delete this field?")
    } else {
        confirmed = true
    }
    if (confirmed) {
        var A = ds.get(A, "id");
        delete_from_db(A)
    }
}
function delete_from_db(c) {
    if (ds.get(c, "is_db_live") == "1") {
        JJ("#statusText").html("Deleting ... Please wait ...");
        JJ.post("delete_element.php", {
            form_id: json_form.id,
            element_id: c
        },
        function(a) {
            var b = eval("(" + a + ")");
            if (b.status == "ok") {
                delete_element_markup(c)
            } else {
                alert("An error occured while deleting your field!")
            }
        })
    } else {
        delete_element_markup(c)
    }
}
function delete_element_markup(A) {
    JJ(ds.get(A, "object").li).fadeOut("normal",
    function() {
        JJ(ds.get(A, "object").li).remove();
        ds.remove_element(A);
        update_pos("true");
        active_element = "";
        if (JJ("#element_properties").attr("display") == "block") {
            display_field_properties()
        }
        if (ds.data.elements.length == 0) {
            display_fields(true)
        }
    })
}
function duplicate_element(A) {
    field_type = ds.get(A, "type");
    ctrl = initialize_control(field_type);
    copy_values(ctrl, A);
    display_duplicate(ctrl, A);
    add_element_events(ctrl);
    display_save_button();
    init_dragdrop();
    update_pos("true")
}
function copy_values(C, E) {
    for (var A = 0; A < ds.data.elements.length; A++) {
        var D = ds.data.elements[A];
        if (E == D.id) {
            jQuery.each(ds.data.elements[A],
            function(G, H) {
                if (G != "id" && G != "object" && G != "is_db_live") {
                    if (G == "options") {
                        opts = [];
                        for (var F = 0; F < H.length; F++) {
                            opts.push(clone(H[F]))
                        }
                    } else {
                        opts = H
                    }
                    ds.set(C.id, G, opts)
                }
            });
            break
        }
    }
    next_val = ds.get(C.id, "options");
    for (var B = 0; B < next_val.length; B++) {
        next_val[B].is_db_live = "0";
        next_val[B].id = "0"
    }
}
function clone(C) {
    if (typeof(C) != "object") {
        return C
    }
    if (C == null) {
        return C
    }
    var B = new Object();
    for (var A in C) {
        B[A] = clone(C[A])
    }
    return B
}
function display_duplicate(A, B) {
    markup = A.display();
    markup.style.display = "none";
    document.getElementById("form_elements").insertBefore(markup, document.getElementById("li_" + B).nextSibling);
    JJ(markup).show("normal")
}
function init_dragdrop() {
    Sortable.create("form_elements", {
        onUpdate: function() {
            update_pos()
        },
        hoverclass: "sortHelper",
        only: "drag"
    })
}
function update_pos(A) {
    jQuery.each(ds.data.elements,
    function(C, B) {
        B.position = get_prev_siblings(B.object.li)
    });
    if (A != "true") {
        JJ("#element_position").html(parseInt(ds.get(active_element, "position")) + 1)
    }
}
function get_prev_siblings(A) {
    var B = 0;
    while (A.previousSibling && A.previousSibling.className && JJ(A.previousSibling).hasClass("drag")) {
        A = A.previousSibling;
        B++
    }
    return B
}
function choices_event(A, B) {
    if (A.keyCode == 13) {
        insert_choice(B + 1)
    }
}
function show_field_property() {
    JJ("#tabs").attr("class", "field_prop_tab")
}
function show_form_property() {
    JJ("#tabs").attr("class", "form_prop_tab")
}
function save_form_data() {
    JJ("#statusText").html("Saving ... Please wait ...");
    JJ("#form_save_button").html('<img src="images/icons/filesave.gif" /> Saving');
    main_form.data.frame_height = JJ("#main").outerHeight();
    JJ("#form_save_button").unbind("click");
    JJ.post("save.php", {
        form: JSON.stringify(main_form.data),
        elements: ds.stringify()
    },
    function(A) {
        form_aftersave_callback(A)
    })
}
function form_aftersave_callback(a) {
    JJ("#form_save_button").html('<img src="images/icons/filesave.gif" /> Save Form');
    JJ("#form_save_button").click(function() {
        save_form_data()
    });
    var b = eval("(" + a + ")");
    if (b.status == "ok") {
        window.location.replace("manage_form.php?id=" + b.message)
    } else {
        alert("An error has occured while saving your form!")
    }
}
function populate_form() {
    JJ("#active_form").css("display", "block");
    var A = json_form;
    update_form(A.id, "id");
    update_form(A.name, "name");
    update_form(A.description.replace(/\<br \/\>/g, "\n"), "description");
    update_form(A.redirect, "redirect");
    update_form(A.success_message.replace(/\<br \/\>/g, "\n"), "success_message");
    update_form(A.password, "password");
    update_form(A.unique_ip, "unique_ip");
    update_form(A.captcha, "captcha");
    update_form(A.review, "review")
}
function populate_elements() {
    var A = 50;
    var B = json_elements;
    JJ(B.elements).each(function(C) {
        num = this;
        ctrl = new field();
        ctrl.initialize(num.id);
        ds.new_element(num.type, num.id, ctrl);
        newMax = parseInt(num.id);
        if (num.type == "address") {
            newMax += 5
        }
        if (num.type == "name") {
            newMax += 3
        }
        if (num.type == "simple_name") {
            newMax += 1
        }
        if (num.type == "checkbox") {
            newMax += 100
        }
        update_element_count(newMax);
        jQuery.each(num,
        function(D, E) {
            if (E.replace) {
                next_val = E.replace(/\<br \/\>/g, "\n")
            } else {
                next_val = E
            }
            ds.set(ctrl.id, D, next_val)
        });
        markup = ctrl.display();
        JJ("#form_elements").append(markup);
        add_element_events(ctrl);
        update_pos("true");
        A += 50
    });
    init_dragdrop()
}
function update_element_count(A) {
    if (A >= element_count) {
        element_count = parseInt(A) + 1
    }
    display_save_button()
};
