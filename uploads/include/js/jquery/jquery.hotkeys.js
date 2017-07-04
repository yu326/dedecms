(function (a) {
    this.version = "(beta)(0.0.3)";
    this.all = {};
    this.special_keys = {
        27: "esc",
        9: "tab",
        32: "space",
        13: "return",
        8: "backspace",
        145: "scroll",
        20: "capslock",
        144: "numlock",
        19: "pause",
        45: "insert",
        36: "home",
        46: "del",
        35: "end",
        33: "pageup",
        34: "pagedown",
        37: "left",
        38: "up",
        39: "right",
        40: "down",
        112: "f1",
        113: "f2",
        114: "f3",
        115: "f4",
        116: "f5",
        117: "f6",
        118: "f7",
        119: "f8",
        120: "f9",
        121: "f10",
        122: "f11",
        123: "f12"
    };
    this.shift_nums = {
        "`": "~",
        "1": "!",
        "2": "@",
        "3": "#",
        "4": "$",
        "5": "%",
        "6": "^",
        "7": "&",
        "8": "*",
        "9": "(",
        "0": ")",
        "-": "_",
        "=": "+",
        ";": ":",
        "'": '"',
        ",": "<",
        ".": ">",
        "/": "?",
        "\\": "|"
    };
    this.add = function (c, b, h) {
        if (a.isFunction(b)) {
            h = b;
            b = {}
        }
        var d = {}, f = {type: "keydown", propagate: false, disableInInput: false, target: a("html")[0]}, e = this;
        d = a.extend(d, f, b || {});
        c = c.toLowerCase();
        var g = function (j) {
            j = a.event.fix(j);
            var o = j.target;
            o = (o.nodeType == 3) ? o.parentNode : o;
            if (d.disableInInput) {
                var s = a(o);
                if (s.is("input") || s.is("textarea")) {
                    return
                }
            }
            var l = j.which, u = j.type, r = String.fromCharCode(l).toLowerCase(), t = e.special_keys[l], m = j.shiftKey, i = j.ctrlKey, p = j.altKey, w = j.metaKey, q = true, k = null;
            if (a.browser.opera || a.browser.safari) {
                while (!e.all[o] && o.parentNode) {
                    o = o.parentNode
                }
            }
            var v = e.all[o].events[u].callbackMap;
            if (!m && !i && !p && !w) {
                k = v[t] || v[r]
            } else {
                var n = "";
                if (p) {
                    n += "alt+"
                }
                if (i) {
                    n += "ctrl+"
                }
                if (m) {
                    n += "shift+"
                }
                if (w) {
                    n += "meta+"
                }
                k = v[n + t] || v[n + r] || v[n + e.shift_nums[r]]
            }
            if (k) {
                k.cb(j);
                if (!k.propagate) {
                    j.stopPropagation();
                    j.preventDefault();
                    return false
                }
            }
        };
        if (!this.all[d.target]) {
            this.all[d.target] = {events: {}}
        }
        if (!this.all[d.target].events[d.type]) {
            this.all[d.target].events[d.type] = {callbackMap: {}};
            a.event.add(d.target, d.type, g)
        }
        this.all[d.target].events[d.type].callbackMap[c] = {cb: h, propagate: d.propagate};
        return a
    };
    this.remove = function (c, b) {
        b = b || {};
        target = b.target || a("html")[0];
        type = b.type || "keydown";
        c = c.toLowerCase();
        delete this.all[target].events[type].callbackMap[c];
        return a
    };
    a.hotkeys = this;
    return a
})(jQuery);