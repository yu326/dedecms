/*
 * jQuery UI Dialog 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Dialog
 *
 * Depends:
 *	ui.core.js
 *	ui.draggable.js
 *	ui.resizable.js
 */
(function (c) {
    var b = {
        dragStart: "start.draggable",
        drag: "drag.draggable",
        dragStop: "stop.draggable",
        maxHeight: "maxHeight.resizable",
        minHeight: "minHeight.resizable",
        maxWidth: "maxWidth.resizable",
        minWidth: "minWidth.resizable",
        resizeStart: "start.resizable",
        resize: "drag.resizable",
        resizeStop: "stop.resizable"
    }, a = "ui-dialog ui-widget ui-widget-content ui-corner-all ";
    c.widget("ui.dialog", {
        _init: function () {
            this.originalTitle = this.element.attr("title");
            var l = this, m = this.options, j = m.title || this.originalTitle || "&nbsp;", e = c.ui.dialog.getTitleId(this.element), k = (this.uiDialog = c("<div/>")).appendTo(document.body).hide().addClass(a + m.dialogClass).css({
                position: "absolute",
                overflow: "hidden",
                zIndex: m.zIndex
            }).attr("tabIndex", -1).css("outline", 0).keydown(function (n) {
                (m.closeOnEscape && n.keyCode && n.keyCode == c.ui.keyCode.ESCAPE && l.close(n))
            }).attr({role: "dialog", "aria-labelledby": e}).mousedown(function (n) {
                l.moveToTop(false, n)
            }), g = this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(k), f = (this.uiDialogTitlebar = c("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(k), i = c('<a href="#"/>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role", "button").hover(function () {
                i.addClass("ui-state-hover")
            }, function () {
                i.removeClass("ui-state-hover")
            }).focus(function () {
                i.addClass("ui-state-focus")
            }).blur(function () {
                i.removeClass("ui-state-focus")
            }).mousedown(function (n) {
                n.stopPropagation()
            }).click(function (n) {
                l.close(n);
                return false
            }).appendTo(f), h = (this.uiDialogTitlebarCloseText = c("<span/>")).addClass("ui-icon ui-icon-closethick").text(m.closeText).appendTo(i), d = c("<span/>").addClass("ui-dialog-title").attr("id", e).html(j).prependTo(f);
            f.find("*").add(f).disableSelection();
            (m.draggable && c.fn.draggable && this._makeDraggable());
            (m.resizable && c.fn.resizable && this._makeResizable());
            this._createButtons(m.buttons);
            this._isOpen = false;
            (m.bgiframe && c.fn.bgiframe && k.bgiframe());
            (m.autoOpen && this.open())
        }, destroy: function () {
            (this.overlay && this.overlay.destroy());
            this.uiDialog.hide();
            this.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body");
            this.uiDialog.remove();
            (this.originalTitle && this.element.attr("title", this.originalTitle))
        }, close: function (f) {
            var d = this;
            if (false === d._trigger("beforeclose", f)) {
                return
            }
            (d.overlay && d.overlay.destroy());
            d.uiDialog.unbind("keypress.ui-dialog");
            (d.options.hide ? d.uiDialog.hide(d.options.hide, function () {
                d._trigger("close", f)
            }) : d.uiDialog.hide() && d._trigger("close", f));
            c.ui.dialog.overlay.resize();
            d._isOpen = false;
            if (d.options.modal) {
                var e = 0;
                c(".ui-dialog").each(function () {
                    if (this != d.uiDialog[0]) {
                        e = Math.max(e, c(this).css("z-index"))
                    }
                });
                c.ui.dialog.maxZ = e
            }
        }, isOpen: function () {
            return this._isOpen
        }, moveToTop: function (f, e) {
            if ((this.options.modal && !f) || (!this.options.stack && !this.options.modal)) {
                return this._trigger("focus", e)
            }
            if (this.options.zIndex > c.ui.dialog.maxZ) {
                c.ui.dialog.maxZ = this.options.zIndex
            }
            (this.overlay && this.overlay.$el.css("z-index", c.ui.dialog.overlay.maxZ = ++c.ui.dialog.maxZ));
            var d = {scrollTop: this.element.attr("scrollTop"), scrollLeft: this.element.attr("scrollLeft")};
            this.uiDialog.css("z-index", ++c.ui.dialog.maxZ);
            this.element.attr(d);
            this._trigger("focus", e)
        }, open: function () {
            if (this._isOpen) {
                return
            }
            var e = this.options, d = this.uiDialog;
            this.overlay = e.modal ? new c.ui.dialog.overlay(this) : null;
            (d.next().length && d.appendTo("body"));
            this._size();
            this._position(e.position);
            d.show(e.show);
            this.moveToTop(true);
            (e.modal && d.bind("keypress.ui-dialog", function (h) {
                if (h.keyCode != c.ui.keyCode.TAB) {
                    return
                }
                var g = c(":tabbable", this), i = g.filter(":first")[0], f = g.filter(":last")[0];
                if (h.target == f && !h.shiftKey) {
                    setTimeout(function () {
                        i.focus()
                    }, 1)
                } else {
                    if (h.target == i && h.shiftKey) {
                        setTimeout(function () {
                            f.focus()
                        }, 1)
                    }
                }
            }));
            c([]).add(d.find(".ui-dialog-content :tabbable:first")).add(d.find(".ui-dialog-buttonpane :tabbable:first")).add(d).filter(":first").focus();
            this._trigger("open");
            this._isOpen = true
        }, _createButtons: function (g) {
            var f = this, d = false, e = c("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix");
            this.uiDialog.find(".ui-dialog-buttonpane").remove();
            (typeof g == "object" && g !== null && c.each(g, function () {
                return !(d = true)
            }));
            if (d) {
                c.each(g, function (h, i) {
                    c('<button type="button"></button>').addClass("ui-state-default ui-corner-all").text(h).click(function () {
                        i.apply(f.element[0], arguments)
                    }).hover(function () {
                        c(this).addClass("ui-state-hover")
                    }, function () {
                        c(this).removeClass("ui-state-hover")
                    }).focus(function () {
                        c(this).addClass("ui-state-focus")
                    }).blur(function () {
                        c(this).removeClass("ui-state-focus")
                    }).appendTo(e)
                });
                e.appendTo(this.uiDialog)
            }
        }, _makeDraggable: function () {
            var d = this, f = this.options, e;
            this.uiDialog.draggable({
                cancel: ".ui-dialog-content",
                handle: ".ui-dialog-titlebar",
                containment: "document",
                start: function () {
                    e = f.height;
                    c(this).height(c(this).height()).addClass("ui-dialog-dragging");
                    (f.dragStart && f.dragStart.apply(d.element[0], arguments))
                },
                drag: function () {
                    (f.drag && f.drag.apply(d.element[0], arguments))
                },
                stop: function () {
                    c(this).removeClass("ui-dialog-dragging").height(e);
                    (f.dragStop && f.dragStop.apply(d.element[0], arguments));
                    c.ui.dialog.overlay.resize()
                }
            })
        }, _makeResizable: function (g) {
            g = (g === undefined ? this.options.resizable : g);
            var d = this, f = this.options, e = typeof g == "string" ? g : "n,e,s,w,se,sw,ne,nw";
            this.uiDialog.resizable({
                cancel: ".ui-dialog-content",
                alsoResize: this.element,
                maxWidth: f.maxWidth,
                maxHeight: f.maxHeight,
                minWidth: f.minWidth,
                minHeight: f.minHeight,
                start: function () {
                    c(this).addClass("ui-dialog-resizing");
                    (f.resizeStart && f.resizeStart.apply(d.element[0], arguments))
                },
                resize: function () {
                    (f.resize && f.resize.apply(d.element[0], arguments))
                },
                handles: e,
                stop: function () {
                    c(this).removeClass("ui-dialog-resizing");
                    f.height = c(this).height();
                    f.width = c(this).width();
                    (f.resizeStop && f.resizeStop.apply(d.element[0], arguments));
                    c.ui.dialog.overlay.resize()
                }
            }).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")
        }, _position: function (i) {
            var e = c(window), f = c(document), g = f.scrollTop(), d = f.scrollLeft(), h = g;
            if (c.inArray(i, ["center", "top", "right", "bottom", "left"]) >= 0) {
                i = [i == "right" || i == "left" ? i : "center", i == "top" || i == "bottom" ? i : "middle"]
            }
            if (i.constructor != Array) {
                i = ["center", "middle"]
            }
            if (i[0].constructor == Number) {
                d += i[0]
            } else {
                switch (i[0]) {
                    case"left":
                        d += 0;
                        break;
                    case"right":
                        d += e.width() - this.uiDialog.outerWidth();
                        break;
                    default:
                    case"center":
                        d += (e.width() - this.uiDialog.outerWidth()) / 2
                }
            }
            if (i[1].constructor == Number) {
                g += i[1]
            } else {
                switch (i[1]) {
                    case"top":
                        g += 0;
                        break;
                    case"bottom":
                        g += e.height() - this.uiDialog.outerHeight();
                        break;
                    default:
                    case"middle":
                        g += (e.height() - this.uiDialog.outerHeight()) / 2
                }
            }
            g = Math.max(g, h);
            this.uiDialog.css({top: g, left: d})
        }, _setData: function (e, f) {
            (b[e] && this.uiDialog.data(b[e], f));
            switch (e) {
                case"buttons":
                    this._createButtons(f);
                    break;
                case"closeText":
                    this.uiDialogTitlebarCloseText.text(f);
                    break;
                case"dialogClass":
                    this.uiDialog.removeClass(this.options.dialogClass).addClass(a + f);
                    break;
                case"draggable":
                    (f ? this._makeDraggable() : this.uiDialog.draggable("destroy"));
                    break;
                case"height":
                    this.uiDialog.height(f);
                    break;
                case"position":
                    this._position(f);
                    break;
                case"resizable":
                    var d = this.uiDialog, g = this.uiDialog.is(":data(resizable)");
                    (g && !f && d.resizable("destroy"));
                    (g && typeof f == "string" && d.resizable("option", "handles", f));
                    (g || this._makeResizable(f));
                    break;
                case"title":
                    c(".ui-dialog-title", this.uiDialogTitlebar).html(f || "&nbsp;");
                    break;
                case"width":
                    this.uiDialog.width(f);
                    break
            }
            c.widget.prototype._setData.apply(this, arguments)
        }, _size: function () {
            var e = this.options;
            this.element.css({height: 0, minHeight: 0, width: "auto"});
            var d = this.uiDialog.css({height: "auto", width: e.width}).height();
            this.element.css({
                minHeight: Math.max(e.minHeight - d, 0),
                height: e.height == "auto" ? "auto" : Math.max(e.height - d, 0)
            })
        }
    });
    c.extend(c.ui.dialog, {
        version: "1.7.2",
        defaults: {
            autoOpen: true,
            bgiframe: false,
            buttons: {},
            closeOnEscape: true,
            closeText: "close",
            dialogClass: "",
            draggable: true,
            hide: null,
            height: "auto",
            maxHeight: false,
            maxWidth: false,
            minHeight: 150,
            minWidth: 150,
            modal: false,
            position: "center",
            resizable: true,
            show: null,
            stack: true,
            title: "",
            width: 300,
            zIndex: 1000
        },
        getter: "isOpen",
        uuid: 0,
        maxZ: 0,
        getTitleId: function (d) {
            return "ui-dialog-title-" + (d.attr("id") || ++this.uuid)
        },
        overlay: function (d) {
            this.$el = c.ui.dialog.overlay.create(d)
        }
    });
    c.extend(c.ui.dialog.overlay, {
        instances: [],
        maxZ: 0,
        events: c.map("focus,mousedown,mouseup,keydown,keypress,click".split(","), function (d) {
            return d + ".dialog-overlay"
        }).join(" "),
        create: function (e) {
            if (this.instances.length === 0) {
                setTimeout(function () {
                    if (c.ui.dialog.overlay.instances.length) {
                        c(document).bind(c.ui.dialog.overlay.events, function (f) {
                            var g = c(f.target).parents(".ui-dialog").css("zIndex") || 0;
                            return (g > c.ui.dialog.overlay.maxZ)
                        })
                    }
                }, 1);
                c(document).bind("keydown.dialog-overlay", function (f) {
                    (e.options.closeOnEscape && f.keyCode && f.keyCode == c.ui.keyCode.ESCAPE && e.close(f))
                });
                c(window).bind("resize.dialog-overlay", c.ui.dialog.overlay.resize)
            }
            var d = c("<div></div>").appendTo(document.body).addClass("ui-widget-overlay").css({
                width: this.width(),
                height: this.height()
            });
            (e.options.bgiframe && c.fn.bgiframe && d.bgiframe());
            this.instances.push(d);
            return d
        },
        destroy: function (d) {
            this.instances.splice(c.inArray(this.instances, d), 1);
            if (this.instances.length === 0) {
                c([document, window]).unbind(".dialog-overlay")
            }
            d.remove();
            var e = 0;
            c.each(this.instances, function () {
                e = Math.max(e, this.css("z-index"))
            });
            this.maxZ = e
        },
        height: function () {
            if (c.browser.msie && c.browser.version < 7) {
                var e = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
                var d = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight);
                if (e < d) {
                    return c(window).height() + "px"
                } else {
                    return e + "px"
                }
            } else {
                return c(document).height() + "px"
            }
        },
        width: function () {
            if (c.browser.msie && c.browser.version < 7) {
                var d = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
                var e = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);
                if (d < e) {
                    return c(window).width() + "px"
                } else {
                    return d + "px"
                }
            } else {
                return c(document).width() + "px"
            }
        },
        resize: function () {
            var d = c([]);
            c.each(c.ui.dialog.overlay.instances, function () {
                d = d.add(this)
            });
            d.css({width: 0, height: 0}).css({width: c.ui.dialog.overlay.width(), height: c.ui.dialog.overlay.height()})
        }
    });
    c.extend(c.ui.dialog.overlay.prototype, {
        destroy: function () {
            c.ui.dialog.overlay.destroy(this.$el)
        }
    })
})(jQuery);