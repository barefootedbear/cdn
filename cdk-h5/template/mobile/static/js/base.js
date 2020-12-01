var childWindow;
function toQzoneLogin() {
    childWindow = window.open("/signin.html?act\x3dqq_login", "TencentLogin", "width\x3d500,height\x3d400,menubar\x3d0,scrollbars\x3d1, resizable\x3d1,status\x3d1,titlebar\x3d0,toolbar\x3d0,location\x3d1")
}
function closeChildWindow() {
    childWindow.close()
}
function code(a) {
    a.src = "/include/code/getimg.php?" + Math.random()
}
function submitset(a, b) {
    var c = $("#formsubmit");
    c.find("[name\x3d'" + a + "']").val(b);
    c.submit()
}
var Qrcodetimer;
function Qrcode(a, b) {
    clearInterval(Qrcodetimer);
    "login" == a ? ($("#login_qrcode").attr("src", "/signin-act_qrcode"),
        Qrcodetimer = setInterval(function() {
            jQuery.ajax({
                dataType: "json",
                type: "get",
                async: !1,
                url: "/signin-act_ScannerLogin",
                cache: !1,
                success: function(a) {
                    out_json(a)
                }
            })
        }, 5E3)) : "qqQrcode" == a ? Qrcodetimer = setInterval(function() {
        jQuery.ajax({
            dataType: "json",
            type: "get",
            async: !1,
            url: "/supapi/qq/qrcode?code\x3d" + b,
            cache: !1,
            success: function(a) {
                "2" == a.state ? ($(".getqbi-loading").hide(),
                    $("#QQrqcodeimg").html("\x3cimg src\x3d'data:image/jpeg;base64," + a.qrcodeimg + "'\x3e"),
                    $(".getqbi-qrcode").show(),
                    $(".getqbi-error").hide(),
                    $(".getqbi-sucess").hide()) : "3" == a.state ? ($("#qbi-history").attr("href", "/account/act_consigndetail/order_" + a.orderid),
                    $(".getqbi-sucess").show().find("h5").html(a.msg),
                    $(".getqbi-loading").hide(),
                    $(".getqbi-qrcode").hide(),
                    $(".getqbi-error").hide(),
                    clearInterval(Qrcodetimer)) : "4" == a.state ? ($(".getqbi-error").show().find("h5").html(a.msg),
                    $(".getqbi-loading").hide(),
                    $(".getqbi-qrcode").hide(),
                    $(".getqbi-sucess").hide(),
                    clearInterval(Qrcodetimer)) : "-1" == a.state && ($(".getqbi-qrcode-error").show(),
                    clearInterval(Qrcodetimer))
            }
        })
    }, 5E3) : "zmxy" == a ? Qrcodetimer = setInterval(function() {
        jQuery.ajax({
            dataType: "json",
            type: "get",
            async: !1,
            url: "/account/act_realname/to_zmxycode",
            cache: !1,
            success: function(a) {
                out_json(a)
            }
        })
    }, 5E3) : "paycheck" == a && (Qrcodetimer = setInterval(function() {
        jQuery.ajax({
            dataType: "json",
            type: "get",
            async: !1,
            url: "/sell/paycheck?order\x3d" + b,
            cache: !1,
            success: function(a) {
                out_json(a)
            }
        })
    }, 5E3));
    return Qrcodetimer
}
function getCookie(a) {
    if ("wq_username" == a)
        return $.ajax({
            url: "/gapi/username.do",
            async: !1,
            success: function(b) {
                a = b
            }
        }),
            a;
    if ("wq_userid" == a)
        return $.ajax({
            url: "/gapi/userid.do",
            async: !1,
            success: function(b) {
                a = b
            }
        }),
            a;
    var b;
    return (b = document.cookie.match(new RegExp("(^| )" + a + "\x3d([^;]*)(;|$)"))) ? decodeURI(b[2]) : null
}
function geteditqq() {
    loading(!0);
    $.get("/?do\x3daccount\x26to\x3deditqq\x26n\x3d" + Math.random(), function(a) {
        $("#modal-dialog").html(a).width(380).modal({
            title: "\u8bf7\u8f93\u5165\u8054\u7cfb\u65b9\u5f0f",
            modal: !0
        }).ajaxsubmit();
        loading(!1)
    })
}
function setsearch(a) {
    "set" == a ? ($("#header-search, #search-layer").show(),
        $("#header-inner, .filters, .viewport, .footer").hide()) : "cancel" == a && ($("#header-search, #search-layer").hide(),
        $("#header-inner, .filters, .viewport, .footer").show());
    $("#filter-layer").hide();
    $(".viewport, .footer").removeClass("blur")
}
function code(a) {
    a.src = "/include/code/getimg.php?" + Math.random()
}
function selectVerifyType(a, b) {
    $("#verifyTabs \x3e a").removeClass("active");
    1 == b ? ($("#mobile-verify").show(),
        $("#email-verify").hide()) : ($("#mobile-verify").hide(),
        $("#email-verify").show());
    $(a).addClass("active")
}
function setaddress(a, b, c) {
    if ("del" == b)
        return confirm("\u662f\u5426\u5220\u9664\u6536\u8d27\u5730\u5740\uff1f") && (loading(!0),
            $.post("/?do\x3daccount\x26act\x3daddress\x26to\x3d" + b, "id\x3d" + c, function(a) {
                dataarr = a.split("||");
                "\u5220\u9664\u6210\u529f" == dataarr[0] && $("#mailing_" + dataarr[1]).fadeOut(function() {
                    $(this).remove()
                });
                0 == $("#addressList .cell").length && $("#address-empty").show();
                loading(!1);
                a = null
            })),
            !1;
    loading(!0);
    $.post("/?do\x3daccount\x26act\x3daddress\x26to\x3d" + b, "id\x3d" + c, function(b) {
        dataarr = b.split("||");
        "ok" == dataarr ? ($(".btn-address-default").removeClass("disabled").html("\u8bbe\u4e3a\u9ed8\u8ba4\u5730\u5740"),
            $(a).addClass("disabled").html("\u9ed8\u8ba4\u5730\u5740")) : "\u8bfb\u53d6\u6210\u529f" == dataarr[0] ? ($("#addressList").length && ($("#addressList").removeClass("in"),
            $('[data-toggle\x3d"matte"]').removeClass("owl")),
            $("#addressForm").html(dataarr[4]),
            $("#addressModal,#backdrop").addClass("in"),
            $("#address-title").text("\u4fee\u6539\u6536\u8d27\u5730\u5740"),
            loadCity(dataarr[1], dataarr[2], dataarr[3])) : "\u6dfb\u52a0\u65b0\u5730\u5740" == dataarr[0] ? ($("#addressList").length && ($("#addressList").removeClass("in"),
            $('[data-toggle\x3d"matte"]').removeClass("owl")),
            $("#addressForm").html(dataarr[1]),
            $("#addressModal,#backdrop").addClass("in"),
            $("#address-title").text("\u65b0\u5efa\u6536\u8d27\u5730\u5740")) : "\u5220\u9664\u6210\u529f" == dataarr[0] && $("#mailing_" + dataarr[1]).fadeOut(function() {
            $(this).remove()
        });
        loading(!1);
        b = null
    })
}
function getaddress(a) {
    1 == a && (loading(!0),
        $.get("/?do\x3dorderinfo\x26type\x3d" + a, function(a) {
            $("#addressList").show();
            $("#addressShow").hide();
            $("#meta-title").text("\u9009\u62e9\u6536\u8d27\u5730\u5740");
            loading(!1)
        }))
}
function loadCity(a, b, c) {
    var e = $("#provinceDiv option:selected").index();
    jQuery.ajax({
        type: "POST",
        dataType: "json",
        async: !1,
        url: "/getdata.php?do\x3daddress",
        data: "provinceId\x3d" + e,
        cache: !1,
        success: function(d) {
            if (d) {
                var f = '\x3coption value\x3d""\x3e\u8bf7\u9009\u62e9\u57ce\u5e02\x3c/option\x3e', g;
                for (g in d)
                    f = a == d[g] ? f + ("\x3coption value\x3d'" + d[g] + '\' selected\x3d"selected"\x3e' + d[g] + "\x3c/option\x3e") : f + ("\x3coption value\x3d'" + d[g] + "'\x3e" + d[g] + "\x3c/option\x3e")
            }
            $("#cityDiv").html(f);
            $("#countyDiv").html('\x3coption value\x3d""\x3e\u8bf7\u9009\u62e9\u533a/\u53bf\x3c/option\x3e');
            $("#TownDiv").html('\x3coption value\x3d""\x3e\u8bf7\u9009\u62e9\u4e61\u9547\x3c/option\x3e');
            $("#TownDivWrap").hide();
            isUndefined(a) || loadCounty(a, b, c)
        }
    })
}
function loadCounty(a, b, c) {
    var e = $("#provinceDiv option:selected").index()
        , d = $("#cityDiv option:selected").index();
    jQuery.ajax({
        type: "POST",
        dataType: "json",
        async: !1,
        url: "/getdata.php?do\x3daddress",
        data: "provinceId\x3d" + e + "\x26CityId\x3d" + d,
        cache: !1,
        success: function(f) {
            if (f) {
                var g = '\x3coption value\x3d""\x3e\u8bf7\u9009\u62e9\u533a/\u53bf\x3c/option\x3e', d;
                for (d in f)
                    g = b == f[d] ? g + ("\x3coption value\x3d'" + f[d] + '\' selected\x3d"selected"\x3e' + f[d] + "\x3c/option\x3e") : g + ("\x3coption value\x3d'" + f[d] + "'\x3e" + f[d] + "\x3c/option\x3e")
            }
            $("#countyDiv").html(g);
            $("#TownDiv").html('\x3coption value\x3d""\x3e\u8bf7\u9009\u62e9\u4e61\u9547\x3c/option\x3e');
            isUndefined(b) || loadTown(a, b, c)
        }
    })
}
function loadTown(a, b, c) {
    a = $("#provinceDiv option:selected").index();
    b = $("#cityDiv option:selected").index();
    var e = $("#countyDiv option:selected").index();
    jQuery.ajax({
        type: "POST",
        dataType: "json",
        async: !1,
        url: "/getdata.php?do\x3daddress",
        data: "provinceId\x3d" + a + "\x26CityId\x3d" + b + "\x26countyid\x3d" + e,
        cache: !1,
        success: function(a) {
            if (0 == a.length)
                $("#TownDivWrap").hide();
            else {
                var b = '\x3coption value\x3d""\x3e\u8bf7\u9009\u62e9\u4e61\u9547\x3c/option\x3e', g;
                for (g in a)
                    b = c == a[g] ? b + ("\x3coption value\x3d'" + a[g] + '\' selected\x3d"selected"\x3e' + a[g] + "\x3c/option\x3e") : b + ("\x3coption value\x3d'" + a[g] + "'\x3e" + a[g] + "\x3c/option\x3e");
                $("#TownDiv").html(b);
                $("#TownDivWrap").show()
            }
        }
    })
}
function submitpay(a, b) {
    $("#payment-paypass").is(":hidden") ? $("#payment-paypass [type\x3d'password']").removeAttr("null") : $("#payment-paypass [type\x3d'password']").attr("null", "\u8bf7\u586b\u5199\u5b89\u5168\u5bc6\u7801");
    formtest(a, 1) && jQuery.ajax({
        type: "POST",
        async: !1,
        url: $("#" + $(a).attr("name")).attr("action"),
        data: $("#" + $(a).attr("name")).serializeArray(),
        cache: !1,
        success: function(a) {
            dataarr = a.split("|~|");
            if (2 == dataarr.length)
                $("[name\x3d'paypass']").formtip(dataarr[1], 1, "", 3);
            else if (3 == dataarr.length)
                if ($("#modal-dialog").html(dataarr[2]).width(550).modal({
                    title: "\u8bf7\u5b8c\u6210\u4ed8\u6b3e",
                    modal: !0
                }).addClass("modal-bodered"),
                    a = dataarr[0],
                "ok" == a)
                    window.location.reload();
                else {
                    window.open(a);
                    $("#newhref").attr("href", a);
                    var b = setInterval(function() {
                        jQuery.ajax({
                            type: "get",
                            async: !1,
                            url: "/?do\x3dpayment\x26act\x3dpayCheck\x26order\x3d" + dataarr[1],
                            cache: !1,
                            success: function(a) {
                                "ok" == a && (window.location.reload(),
                                    clearInterval(b))
                            }
                        })
                    }, 5E3);
                    $("#modal-dialog").find(".close").click(function() {
                        clearInterval(b)
                    })
                }
            else
                alert(a);
            a = null
        }
    })
}
function cancel(a) {
    confirm("\u662f\u5426\u53d6\u6d88\u6536\u85cf\uff1f") && $.post("/?do\x3daccount\x26act\x3dfavourite\x26to\x3ddel", "id\x3d" + a, function(b) {
        0 < b ? $("#f_" + a).fadeOut(function() {
            $(this).remove()
        }) : alert("\u53d6\u6d88\u6536\u85cf\u9519\u8bef\uff0c\u8bf7\u91cd\u8bd5\uff01")
    });
    return !1
}
function dialog(a, b) {
    var c = !0;
    1 == a && (c = formtest($("#buysubmit"), 1)) && "" == $("[name\x3d'mobiletype']").val() && (c = !1,
        $("#btn-gobuy").formtip("\u624b\u673a\u53f7\u7801\u672a\u901a\u8fc7\uff01"));
    c && (loading(!0),
        $.post("/?do\x3dp\x26id\x3d" + b + "\x26type\x3d" + a, $("#buysubmit").serializeArray(), function(c) {
            dataarr = c.split("||");
            "login" == dataarr[0] ? $.get("/?do\x3dsignin\x26act\x3dlogin\x26callback\x3ddialog(" + a + "," + b + ")", function(a) {
                $("#modal-dialog").html(a).width(420).modal({
                    title: "\u7528\u6237\u767b\u5f55\uff01",
                    modal: !0,
                    header: !1
                }).datatoggle().ajaxsubmit().tooltip()
            }) : "ok" == dataarr[0] && (1 == a ? $("#buysubmit").submit() : 2 == a ? $("#modal-dialog").html(dataarr[1]).width(420).modal({
                title: "\u4fe1\u606f\u63d0\u793a",
                modal: !0
            }) : 3 == a && $("#modal-dialog").html(dataarr[1]).width(420).modal({
                title: "\u4fe1\u606f\u63d0\u793a",
                modal: !0
            }));
            $(".viewport").show();
            loading(!1);
            c = null
        }))
}
function submitcard(a, b, c) {
    formtest(a, 1) && (loading(!0),
        $.post("/gapi/sell.do?ajax\x3d1\x26submit\x3d" + b, $("#sell").serializeArray(), function(a) {
            loading(!1);
            if ("login" == a.run)
                $.get("?do\x3dsignin\x26act\x3dlogin\x26callback\x3dtijiao()", function(a) {
                    $("#modal-dialog").html(a).width(420).modal({
                        title: "\u7528\u6237\u767b\u5f55\uff01",
                        modal: !0,
                        header: !1
                    }).datatoggle().ajaxsubmit().tooltip()
                });
            else if (2 == a.state) {
                var b = ""
                    , f = 0;
                if (2 == a.type)
                    $.each(a.list, function(a, b) {
                        $("#WU_FILE_" + (a - 1)).find(".success").remove();
                        $("#WU_FILE_" + (a - 1)).append('\x3cdiv class\x3d"error"\x3e\x3ci class\x3d"owlicon owlicon-warn"\x3e\x3c/i\x3e' + b + "\x3c/div\x3e")
                    });
                else if ($("#card-tips").html(""),
                0 < c) {
                    for (x = 1; x <= c + 1; x++)
                        b += '\x3cli id\x3d"c_' + x + '"\x3e\x3c/li\x3e';
                    $("#card-tips").html(b);
                    $.each(a.list, function(a, b) {
                        $("#c_" + a).text(b);
                        f += 1
                    })
                }
                b = "";
                3 > f ? $.each(a.list, function(a, f) {
                    b += '\x3cspan class\x3d"text-red"\x3e' + f + "\x3c/span\x3e\x3cbr\x3e"
                }) : b += '\u70b9\u51fb\u201c\x3cspan class\x3d"text-red"\x3e\u8fd4\u56de\u4fee\u6539\x3c/span\x3e\u201d\u67e5\u770b\u9519\u8bef\u539f\u56e0';
                openconfirm({
                    width: 450,
                    name: a.content,
                    content: b,
                    prompt: "warning",
                    button: "\u5f3a\u5236\u63d0\u4ea4",
                    cancel: "\u8fd4\u56de\u4fee\u6539",
                    callback: function(a) {
                        submitcard(a, 1)
                    }
                })
            } else
                2 == a.type && ($("#cardlist").val(""),
                a.list && $.each(a.list, function(a, b) {
                    $("#WU_FILE_" + (a - 1)).find(".success").remove();
                    $("#WU_FILE_" + (a - 1)).append('\x3cdiv class\x3d"error"\x3e\x3ci class\x3d"owlicon owlicon-warn"\x3e\x3c/i\x3e' + b + "\x3c/div\x3e")
                })),
                    out_json(a);
            a = null
        }, "json"))
}
var page = pauto = 1;
function lodingpage(a, b) {
    page = 1;
    $(window).scroll(function() {
        100 > $(document).height() - $(this).scrollTop() - $(this).height() && page <= b && 1 == pauto && loadmore(a, b)
    })
}
function loadmore(a, b) {
    pauto = 0;
    $("#loading-more").show();
    $.ajax({
        url: a.replace("\x3cpage\x3e", page),
        success: function(a) {
            page++;
            $("#ajaxmore").append(a);
            pauto = 1;
            $("#loading-more").hide()
        },
        dataType: "html"
    })
}
function setTab(a, b, c) {
    for (i = 1; i <= c; i++) {
        var e = document.getElementById(a + i)
            , d = document.getElementById("con_" + a + "_" + i);
        e.className = i == b ? "active" : "";
        d.style.display = i == b ? "block" : "none"
    }
}
function poundage(a, b, c, e) {
    var d = parseFloat($(b).val());
    d > c ? ($(b).val(c),
        d = c) : d || ($(b).val(""),
        d = 0);
    if (2 == a) {
        if (.1 > d)
            return alert("\u63d0\u73b0\u81f3\u5c110.1\u5143\uff01"),
                $(b).val("").focus(),
                $("#totalcash").text(0),
                $("#poundage").text(0),
                !1;
        d || ($(b).val(""),
            d = 0,
            $("#totalcash").text(0),
            $("#poundage").text(0));
        a = round(d * parseFloat(e), 2);
        1 > a ? a = 1 : 15 < a && (a = 15);
        5 <= d && ($("#totalcash").text(round(d - a, 2)),
            $("#poundage").text(a))
    }
}
function uptijiao(a) {
    for (var b = "", c = Array(a.length), e = 0; e < a.length; e++)
        if (a[e]) {
            var d = a[e].replace(/\u5361\u53f7[\uff1a|:]/g, "").replace(/\u5bc6\u7801[\uff1a|:]/g, "").replace(/\u5361\u5bc6[\uff1a|:]/g, "").replace(/[\u4e00-\u9fa5]+/g, "").replace(/\s+/g, " ").replace(/(^\s*)|(\s*$)/g, "").replace(/,/g, "*").replace(/[ ]/g, "*").replace(/\uff0c/g, "*").replace(/\t/g, "*").replace(/[|]/g, "*").split("*");
            "" != d[0] && (c[e] = d[0]);
            b = void 0 == d[1] ? b + (d[0] + "\n") : b + (d[0] + " " + d[1] + "\n")
        }
    return b.replace(/(^\s*)|(\s*$)/g, "")
}
var mtime = timer1 = 0;
function codetime(a, b) {
    clearInterval(timer1);
    var c = "#mcode";
    1 == b && (c = "#emcode");
    timer1 = setInterval(function() {
        --a;
        0 < a ? $(c).addClass("disabled").text(a) : ($(c).removeClass("disabled").text("\u83b7\u53d6\u9a8c\u8bc1\u7801"),
            clearInterval(timer1))
    }, 1E3)
}
$(function() {
    function a(a) {
        if (a) {
            var b = $(a).closest(".shopcart-item");
            a = b.find(".unitmoney").text();
            var f = b.find(".sumoney")
                , c = parseInt(b.find(".count").val())
                , b = b.find(".service-count");
            0 !== b.length && b.each(function() {
                $(this).text(c)
            });
            f.html((a * c).toFixed(2));
            getcount()
        } else
            b = $('[buy\x3d"buycard"]').closest("#sell"),
                a = b.find("#salePrice").text(),
                f = b.find("#tradPrice"),
                c = parseInt(b.find(".count").val()),
                f.html((a * c).toFixed(2))
    }
    $("body").datatoggle().ajaxsubmit().tooltip();
    $('[data-toggle\x3d"matte"]').on("click", function(a) {
        a.preventDefault();
        if (!$(this).is(".disabled, :disabled")) {
            a = $(this).attr("data-target");
            var b = $(this).attr("data-backdrop");
            a || (a = (a = $(this).attr("href")) && a.replace(/.*(?=#[^\s]*$)/, ""));
            "false" == b ? $(this).hasClass("owl") ? ($(this).removeClass("owl"),
                $(a).removeClass("in")) : ($('[data-toggle\x3d"matte"]').removeClass("owl"),
                $(".matte").removeClass("in"),
                $(this).addClass("owl"),
                $(a).addClass("in")) : ("content" == b ? (b = $(".mycontent").find("#backdrop"),
            b.length || ($("#backdrop").remove(),
                $(".mycontent").append('\x3cdiv class\x3d"backdrop in" id\x3d"backdrop"\x3e\x3c/div\x3e'))) : (b = $("body \x3e #backdrop"),
            b.length || ($("#backdrop").remove(),
                $(document.body).append('\x3cdiv class\x3d"backdrop in" id\x3d"backdrop"\x3e\x3c/div\x3e'))),
                $(this).hasClass("owl") ? ($(this).removeClass("owl"),
                    $(a).removeClass("in"),
                    b.removeClass("in")) : ($('[data-toggle\x3d"matte"]').removeClass("owl"),
                    $(".matte").removeClass("in"),
                    $(this).addClass("owl"),
                    $(a).addClass("in"),
                    b.addClass("in")),
                $("#backdrop").on("click", function(a) {
                    a.preventDefault();
                    $('[data-toggle\x3d"matte"]').removeClass("owl");
                    $(".matte").removeClass("in");
                    $(this).removeClass("in")
                }))
        }
    });
    $('[data-dismiss\x3d"matte"]').on("click", function(a) {
        a.preventDefault();
        a = $(this);
        var b = a.attr("data-target")
            , c = $("#backdrop");
        b || (b = (b = a.attr("href")) && b.replace(/.*(?=#[^\s]*$)/, ""));
        b = $(b);
        b.length || (b = a.closest(".matte"));
        $('[data-toggle\x3d"matte"]').removeClass("owl");
        b.removeClass("in");
        c.length && c.removeClass("in");
        return !1
    });
    $(".accordion-header").on("click", function(a) {
        a.preventDefault();
        a = $(this);
        var b = a.next(".accordion-body"), c;
        a.parent(".accordion").siblings(".accordion").find(".accordion-body");
        c = a.parent(".accordion").siblings(".accordion").find(".accordion-body");
        b = $(b);
        b.is(":visible") ? (b.slideUp("fast"),
            a.removeClass("open")) : (c.slideUp("fast"),
            b.slideDown("fast"),
            a.addClass("open"),
            a.parent(".accordion").siblings(".accordion").find(".accordion-header").removeClass("open"));
        return !1
    });
    $(".passeye").click(function() {
        var a = $(this).find("input[type\x3dcheckbox]")
            , b = $(this).parent(".cell-ft").prev(".cell-bd").find(".form-control");
        b.length || (b = $(this).parent(".form-group").find(".form-control"));
        a.prop("checked") ? b.prop("type", "text").focus() : b.prop("type", "password").focus()
    });
    $('[data-input\x3d"clear"]').bind("input propertychange focus", function() {
        $(".control-clear").hide();
        var a = $(this)
            , b = a.parent().find(".control-clear");
        b.length || (a.parent().append('\x3cspan class\x3d"control-clear"\x3e\x3ci class\x3d"close"\x3e\x3c/i\x3e\x3c/span\x3e'),
            b = a.parent().find(".control-clear"));
        "" != a.val() ? b.show() : b.hide();
        b.click(function() {
            a.val("").focus();
            b.remove()
        })
    });
    $(".radio-group \x3e a").click(function() {
        $(this).hasClass("active") || $(this).addClass("active").siblings().removeClass("active")
    });
    $("#invoice").click(function() {
        $(this).prop("checked") ? $("#invoice-info").show() : $("#invoice-info").hide()
    });
    $("#invoice-type \x3e a").click(function() {
        $(this).addClass("active").siblings().removeClass("active");
        "company" == $(this).attr("id") ? $("#invoice-title").show() : $("#invoice-title").hide()
    });
    $("#payment-tabs input[type\x3dradio]:not(:disabled)").click(function() {
        "unionpay" == $(this).attr("id") ? ($("#paytype").val(1),
            $("#payment-banks .backdrop").addClass("in"),
            $("#payment-unionpay").addClass("in")) : ($("#paytype").val(2),
            $("#payment-unionpay").removeClass("in"),
            $("#payment-banks .backdrop").removeClass("in"))
    });
    $("#payment-banks .close,#payment-banks .backdrop, #payment-banks .grids label").click(function() {
        $("#payment-banks .backdrop").removeClass("in");
        $("#payment-unionpay").removeClass("in")
    });
    var c = 0
        , e = 0
        , d = 0;
    $("#moneyset").click(function() {
        var a;
        e = parseFloat(yed);
        d = parseFloat(yhk);
        a = parseFloat($("#moneyset").val());
        c = parseFloat(remaining);
        $(this).prop("checked") ? (c -= d,
            a = a > c ? c : a,
            c = c - a + d) : (a = 0 < e ? e : 0,
            c -= e);
        $("#moneyYue").text(a.toFixed(2));
        $("[name\x3d'money']").val(a.toFixed(2));
        $("#moneyNeed").text(c.toFixed(2));
        0 >= a ? $("#payment-third").show() : ($("#payment-third").hide(),
        0 < c && $("#payment-third").show());
        c != remaining ? $("#payment-paypass").show() : $("#payment-paypass").hide()
    });
    $("#payment-choose \x3e li").click(function() {
        "ebank" == $(this).attr("id") ? ($("#payment-choose \x3e li").removeClass("active"),
            $(this).addClass("active"),
            $(".payment-item").hide(),
            $("#payment-ebank").show(),
            $("#paytype").val(1)) : "credit" == $(this).attr("id") ? ($("#payment-choose \x3e  li").removeClass("active"),
            $(this).addClass("active"),
            $(".payment-item").hide(),
            $("#payment-credit").show(),
            $("#paytype").val(3)) : ($("#payment-choose \x3e li").removeClass("active"),
            $(this).addClass("active"),
            $(".payment-item").hide(),
            $("#payment-platform").show(),
            $("#paytype").val(2))
    });
    $(".spinner").each(function() {
        function b(b) {
            h = parseInt(e.attr("max"));
            bid = parseInt(e.attr("bid"));
            -1 == h && (h = 999);
            0 == h ? (e.val(k = 0),
                c.addClass("disabled"),
                d.addClass("disabled")) : (1 == k && c.addClass("disabled") || c.removeClass("disabled"),
            k == h && d.addClass("disabled") || d.removeClass("disabled"));
            0 < bid && 1 != b ? $.post("/?do\x3dshopcart\x26id\x3d" + bid + "\x26num\x3d" + e.val() + "\x26type\x3d4", function(b) {
                $("#shopcart-" + bid + " .unitmoney").text(b.price);
                b.doing ? $("#shopcart-" + bid + " .doing").text(b.doing).show() : $("#shopcart-" + bid + " .doing").hide();
                a("#shopcart-" + bid)
            }, "json") : a();
            e.change()
        }
        $(this);
        var c = $(this).find(".minus")
            , d = $(this).find(".plus")
            , e = $(this).find(".count")
            , k = parseInt(e.val()) || 1
            , h = parseInt(e.attr("max"));
        c.unbind().click(function() {
            !$(this).is(".disabled") && e.val(--k);
            b()
        });
        d.unbind().click(function() {
            !$(this).is(".disabled") && e.val(++k);
            b()
        });
        e.unbind().keyup(function() {
            h = parseInt(e.attr("max"));
            -1 == h && (h = 999);
            i = (i = parseInt(e.val())) ? i : 1;
            i = i > h ? h : i;
            e.val(k = i);
            b()
        });
        b(1)
    })
});
function getcard(a, b, c) {
    3 == b || 4 == b ? formtest(a, 1) && $.post("/?do\x3daccount\x26act\x3dgiftcard\x26to\x3d" + b + "\x26id\x3d" + c, $("#formcash").serializeArray(), function(a) {
        out_json(a)
    }, "json") : $.get("/?do\x3daccount\x26act\x3dgiftcard\x26to\x3d" + b + "\x26id\x3d" + c, function(a) {
        $("#modal-dialog").html(a).width(400).modal({
            title: "\u63d0\u53d6\u5361\u5238",
            modal: !0
        }).ajaxsubmit();
        $("#cardnum").blur(function(a) {
            a = parseFloat(inputbox(this));
            2 == b && (a *= parseFloat($("#saleprice").text()),
                $("#priceid").text(a.toFixed(2)))
        }).blur()
    })
}
;