var childWindow;

function toQzoneLogin() {
    childWindow = window.open("/signin.html?act=qq_login", "TencentLogin", "width=500,height=400,menubar=0,scrollbars=1, resizable=1,status=1,titlebar=0,toolbar=0,location=1");
}

function closeChildWindow() {
    childWindow.close();
}

function code(obj) {
    var ran = Math.random();
    obj.src = '/include/code/getimg.php?' + ran;
}

function submitset(name, str) {
    var parents = $("#formsubmit");
    parents.find("[name='" + name + "']").val(str);
    parents.submit();
}

var Qrcodetimer;

function Qrcode(type, str) {
    clearInterval(Qrcodetimer);
    if (type == 'login') {
        $('#login_qrcode').attr('src', '/signin-act_qrcode');
        Qrcodetimer = setInterval(function () {
            jQuery.ajax({
                dataType: 'json',
                type: 'get',
                async: false,
                url: '/signin-act_ScannerLogin',
                cache: false,
                success: function (data) {
                    out_json(data);
                }
            });
        }, 5000);
    } else if (type == 'qqQrcode') {
        Qrcodetimer = setInterval(function () {
            jQuery.ajax({
                dataType: 'json',
                type: 'get',
                async: false,
                url: '/supapi/qq/qrcode?code=' + str,
                cache: false,
                success: function (data) {
                    if (data['state'] == '2') {
                        //请扫描二维码
                        $('.getqbi-loading').hide();
                        $('#QQrqcodeimg').html('<img src=\'data:image/jpeg;base64,' + data['qrcodeimg'] + '\'>');
                        $('.getqbi-qrcode').show();
                        $('.getqbi-error').hide();
                        $('.getqbi-sucess').hide();
                    } else if (data['state'] == '3') {
                        //寄售成功
                        $("#qbi-history").attr('href', '/account/act_consigndetail/order_' + data['orderid']);
                        $('.getqbi-sucess').show().find('h5').html(data['msg']);
                        $('.getqbi-loading').hide();
                        $('.getqbi-qrcode').hide();
                        $('.getqbi-error').hide();
                        clearInterval(Qrcodetimer);
                    } else if (data['state'] == '4') {
                        //寄售失败
                        $('.getqbi-error').show().find('h5').html(data['msg']);
                        $('.getqbi-loading').hide();
                        $('.getqbi-qrcode').hide();
                        $('.getqbi-sucess').hide();
                        clearInterval(Qrcodetimer);
                    } else if (data['state'] == '-1') {
                        $('.getqbi-qrcode-error').show();
                        clearInterval(Qrcodetimer);
                    }
                }
            });
        }, 5000);
    } else if (type == 'zmxy') {
        Qrcodetimer = setInterval(function () {
            jQuery.ajax({
                dataType: 'json',
                type: 'get',
                async: false,
                url: '/account/act_realname/to_zmxycode',
                cache: false,
                success: function (data) {
                    out_json(data);
                }
            });
        }, 5000);
    } else if (type == 'paycheck') {
        Qrcodetimer = setInterval(function () {
            jQuery.ajax({
                dataType: 'json',
                type: 'get',
                async: false,
                url: '/sell/paycheck?order=' + str,
                cache: false,
                success: function (data) {
                    out_json(data);
                }
            });
        }, 5000);
    }
    return Qrcodetimer;
}

function geteditqq() {
    loading(true);
    $.get('/?do=account&to=editqq&n=' + Math.random(), function (data) {
        $("#modal-dialog").html(data).width(380).modal({
            title: "请输入联系方式",
            modal: true
        }).ajaxsubmit();
        loading(false);
        data = null;
    });
}

function setsearch(type) {
    if (type == "set") {
        $("#header-search, #search-layer").show();
        $("#header-inner, .filters, .viewport, .footer").hide();
    } else if (type == "cancel") {
        $("#header-search, #search-layer").hide();
        $("#header-inner, .filters, .viewport, .footer").show();
    }
    $("#filter-layer").hide();
    $(".viewport, .footer").removeClass("blur");
}

function code(obj) {
    var ran = Math.random();
    obj.src = '/include/code/getimg.php?' + ran;
}

function selectVerifyType(obj, str) {
    $("#verifyTabs > a").removeClass("active");
    if (str == 1) {
        $("#mobile-verify").show();
        $("#email-verify").hide();
    } else {
        $("#mobile-verify").hide();
        $("#email-verify").show();
    }
    $(obj).addClass("active");
}

function setaddress(obj, type, id) {
    if (type == "del") {
        if (confirm("是否删除收货地址？")) {
            loading(true);
            $.post('/?do=account&act=address&to=' + type, "id=" + id, function (data) {
                dataarr = data.split("||");
                if (dataarr[0] == "删除成功") {
                    $("#mailing_" + dataarr[1]).fadeOut(function () {
                        $(this).remove();
                    });
                }
                if ($("#addressList .cell").length == 0) {
                    $("#address-empty").show();
                }
                loading(false);
                data = null;
            });
        }
        return false;
    }
    loading(true);
    $.post('/?do=account&act=address&to=' + type, "id=" + id, function (data) {
        dataarr = data.split("||");
        if (dataarr == "ok") {
            $(".btn-address-default").removeClass("disabled").html("设为默认地址");
            $(obj).addClass("disabled").html("默认地址");
        } else if (dataarr[0] == "读取成功") {
            if ($("#addressList").length) {
                $("#addressList").removeClass("in");
                $('[data-toggle="matte"]').removeClass("owl");
            }
            $("#addressForm").html(dataarr[4]);
            $("#addressModal,#backdrop").addClass("in");
            $("#address-title").text("修改收货地址");
            loadCity(dataarr[1], dataarr[2], dataarr[3]);
        } else if (dataarr[0] == "添加新地址") {
            if ($("#addressList").length) {
                $("#addressList").removeClass("in");
                $('[data-toggle="matte"]').removeClass("owl");
            }
            $("#addressForm").html(dataarr[1]);
            $("#addressModal,#backdrop").addClass("in");
            $("#address-title").text("新建收货地址");
        } else if (dataarr[0] == "删除成功") {
            $("#mailing_" + dataarr[1]).fadeOut(function () {
                $(this).remove();
            });
        }
        loading(false);
        data = null;
    });
};

function getaddress(type) {
    if (type == 1) {
        loading(true);
        $.get('/?do=orderinfo&type=' + type, function (data) {
            $("#addressList").show();
            $("#addressShow").hide();
            $("#meta-title").text("选择收货地址");
            loading(false);
            data = null;
        });
    }
};

function loadCity(city, county, town) {
    var provinceId = $("#provinceDiv option:selected").index();
    jQuery.ajax({
        type: "POST",
        dataType: "json",
        async: false,
        url: "/getdata.php?do=address",
        data: "provinceId=" + provinceId,
        cache: false,
        success: function (dataResult) {
            if (dataResult) {
                var provinceHtml = "<option value=\"\">请选择城市</option>";
                for (var key in dataResult) {
                    if (city == dataResult[key]) {
                        provinceHtml += "<option value='" + dataResult[key] + "' selected=\"selected\">" + dataResult[key] + "</option>";
                    } else {
                        provinceHtml += "<option value='" + dataResult[key] + "'>" + dataResult[key] + "</option>";
                    }
                }
            }
            $("#cityDiv").html(provinceHtml);
            $("#countyDiv").html("<option value=\"\">请选择区/县</option>");
            $("#TownDiv").html("<option value=\"\">请选择乡镇</option>");
            $("#TownDivWrap").hide();
            if (!isUndefined(city)) loadCounty(city, county, town);
        }
    });
};

function loadCounty(city, county, town) {
    var provinceId = $("#provinceDiv option:selected").index();
    var CityId = $("#cityDiv option:selected").index();
    jQuery.ajax({
        type: "POST",
        dataType: "json",
        async: false,
        url: "/getdata.php?do=address",
        data: "provinceId=" + provinceId + "&CityId=" + CityId,
        cache: false,
        success: function (dataResult) {
            if (dataResult) {
                var CityHtml = "<option value=\"\">请选择区/县</option>";
                for (var key in dataResult) {
                    if (county == dataResult[key]) {
                        CityHtml += "<option value='" + dataResult[key] + "' selected=\"selected\">" + dataResult[key] + "</option>";
                    } else {
                        CityHtml += "<option value='" + dataResult[key] + "'>" + dataResult[key] + "</option>";
                    }
                }
            }
            $("#countyDiv").html(CityHtml);
            $("#TownDiv").html("<option value=\"\">请选择乡镇</option>");
            if (!isUndefined(county)) loadTown(city, county, town);
        }
    });
};

function loadTown(city, county, town) {
    var provinceId = $("#provinceDiv option:selected").index();
    var CityId = $("#cityDiv option:selected").index();
    var countyId = $("#countyDiv option:selected").index();
    jQuery.ajax({
        type: "POST",
        dataType: "json",
        async: false,
        url: "/getdata.php?do=address",
        data: "provinceId=" + provinceId + "&CityId=" + CityId + "&countyid=" + countyId,
        cache: false,
        success: function (dataResult) {
            if (dataResult.length == 0) {
                $("#TownDivWrap").hide();
            } else {
                var TownHtml = "<option value=\"\">请选择乡镇</option>";
                for (var key in dataResult) {
                    if (town == dataResult[key]) {
                        TownHtml += "<option value='" + dataResult[key] + "' selected=\"selected\">" + dataResult[key] + "</option>";
                    } else {
                        TownHtml += "<option value='" + dataResult[key] + "'>" + dataResult[key] + "</option>";
                    }
                }
                $("#TownDiv").html(TownHtml);
                $("#TownDivWrap").show();
            }
        }
    });
};

function submitpay(obj, str) {
    if ($("#payment-paypass").is(":hidden")) {
        $("#payment-paypass [type='password']").removeAttr("null");
    } else {
        $("#payment-paypass [type='password']").attr("null", '请填写安全密码');
    }
    ;
    if (formtest(obj, 1)) {
        jQuery.ajax({
            type: "POST",
            async: false,
            url: $("#" + $(obj).attr("name")).attr("action"),
            data: $("#" + $(obj).attr("name")).serializeArray(),
            cache: false,
            success: function (data) {
                dataarr = data.split("|~|");
                if (dataarr.length == 2) {
                    $("[name='paypass']").formtip(dataarr[1], 1, "", 3);
                } else if (dataarr.length == 3) {
                    $("#modal-dialog").html(dataarr[2]).width(550).modal({
                        title: "请完成付款",
                        modal: true
                    }).addClass("modal-bodered");
                    var url = dataarr[0];

                    if (url == "ok") {
                        window.location.reload();
                    } else {
                        window.open(url);
                        $("#newhref").attr("href", url);
                        //触发支付完成检查
                        var timer1 = setInterval(function () {
                            jQuery.ajax({
                                type: "get",
                                async: false,
                                url: '/?do=payment&act=payCheck&order=' + dataarr[1],
                                cache: false,
                                success: function (data) {
                                    if (data == "ok") {
                                        window.location.reload();
                                        clearInterval(timer1);
                                    }
                                }
                            });
                        }, 5000);
                        $("#modal-dialog").find(".close").click(function () {
                            clearInterval(timer1);
                        });
                    }
                } else {
                    alert(data);
                }
                data = null;
            }
        });
    }
}

function cancel(id) {
    if (confirm("是否取消收藏？")) {
        $.post('/?do=account&act=favourite&to=del', "id=" + id, function (data) {
            if (data > 0) {
                $("#f_" + id).fadeOut(function () {
                    $(this).remove();
                });
            } else {
                alert("取消收藏错误，请重试！");
            }
        });
    }
    return false;
};

function dialog(type, id) {
    var dialogtrue = true;
    if (type == 1) {
        dialogtrue = formtest($("#buysubmit"), 1);
        if (dialogtrue && $("[name='mobiletype']").val() == '') {
            dialogtrue = false;
            $("#btn-gobuy").formtip('手机号码未通过！');
        }
    }
    if (dialogtrue) {
        loading(true);
        $.post('/?do=p&id=' + id + "&type=" + type, $("#buysubmit").serializeArray(), function (data) {
            dataarr = data.split("||");
            if (dataarr[0] == "login") {
                $.get('/?do=signin&act=login&callback=dialog(' + type + ',' + id + ')', function (data) {
                    $("#modal-dialog").html(data).width(420).modal({
                        title: "用户登录！",
                        modal: true,
                        header: false
                    }).datatoggle().ajaxsubmit().tooltip();
                });
            } else if (dataarr[0] == "ok") {
                if (type == 1) {
                    $("#buysubmit").submit();
                } else if (type == 2) {
                    $("#modal-dialog").html(dataarr[1]).width(420).modal({
                        title: "信息提示",
                        modal: true
                    });
                } else if (type == 3) {
                    $("#modal-dialog").html(dataarr[1]).width(420).modal({
                        title: "信息提示",
                        modal: true
                    });
                }
            }
            $(".viewport").show();
            loading(false);
            data = null;
        });
    }
};

function submitcard(obj, submit, num) {
    if (formtest(obj, 1)) {
        loading(true);
        $.post('/gapi/sell.do?ajax=1&submit=' + submit, $("#sell").serializeArray(), function (data) {
            loading(false);
            if (data['run'] == 'login') {
                $.get('?do=signin&act=login&callback=tijiao()', function (data) {
                    $("#modal-dialog").html(data).width(420).modal({
                        title: "用户登录！",
                        modal: true,
                        header: false
                    }).datatoggle().ajaxsubmit().tooltip();
                });
            } else {
                if (data["state"] == 2) {
                    var html = '';
                    var errnum = 0;
                    if (data["type"] == 2) {
                        $.each(data["list"], function (a, b) {
                            $("#WU_FILE_" + (a - 1)).find(".success").remove();
                            $("#WU_FILE_" + (a - 1)).append('<div class="error"><i class="owlicon owlicon-warn"></i>' + b + '</div>');
                        });
                    } else {
                        $("#card-tips").html('');
                        if (num > 0) {
                            for (x = 1; x <= (num + 1); x++) {
                                html += '<li id="c_' + x + '"></li>';
                            }
                            $("#card-tips").html(html);
                            $.each(data["list"], function (a, b) {
                                $("#c_" + a).text(b);
                                errnum += 1;
                            });
                        }
                    }
                    html = '';
                    if (errnum < 3) {
                        $.each(data["list"], function (a, b) {
                            html += '<span class="text-red">' + b + '</span><br>';
                        });
                    } else {
                        html += '点击“<span class="text-red">返回修改</span>”查看错误原因';
                    }
                    openconfirm({
                        width: 450,
                        name: data['content'],
                        content: html,
                        prompt: 'warning',
                        button: '强制提交',
                        cancel: '返回修改',
                        callback: function (obj) {
                            submitcard(obj, 1);
                        }
                    });
                } else {
                    if (data["type"] == 2) {
                        $("#cardlist").val('');
                        if (data["list"]) {
                            $.each(data["list"], function (a, b) {
                                $("#WU_FILE_" + (a - 1)).find(".success").remove();
                                $("#WU_FILE_" + (a - 1)).append('<div class="error"><i class="owlicon owlicon-warn"></i>' + b + '</div>');
                            });
                        }
                    }
                    out_json(data);
                }
            }
            data = null;
        }, 'json');
    }
};

var page = pauto = 1;

function lodingpage(url, num) {
    page = 1;
    $(window).scroll(function () {
        if ($(document).height() - $(this).scrollTop() - $(this).height() < 100) {
            if (page <= num) {
                if (pauto == 1) {
                    loadmore(url, num);
                }
            } else {
                //
            }
        }
    });
};

function loadmore(url, num) {
    pauto = 0;
    $("#loading-more").show();
    $.ajax({
        url: url.replace("<page>", page),
        success: function (data) {
            page++;
            $("#ajaxmore").append(data);
            pauto = 1;
            $("#loading-more").hide();
        },
        dataType: 'html'
    });
};

function setTab(name, cursel, n) {
    for (i = 1; i <= n; i++) {
        var menu = document.getElementById(name + i);
        var con = document.getElementById("con_" + name + "_" + i);
        menu.className = i == cursel ? "active" : "";
        con.style.display = i == cursel ? "block" : "none";
    }
};

function poundage(str, obj, moneyall, salipay) {
    var money = parseFloat($(obj).val());
    if (money > moneyall) {
        //超出提现金额
        $(obj).val(moneyall);
        money = moneyall;
    } else if (!money) {
        $(obj).val("");
        money = 0;
    }
    if (str == 2) {
        if (money < 0.1) {
            alert("提现至少0.1元！");
            $(obj).val("").focus();
            money = 0;
            $("#totalcash").text(0);
            $("#poundage").text(0);
            return false;
        } else if (!money) {
            $(obj).val("");
            money = 0;
            $("#totalcash").text(0);
            $("#poundage").text(0);
        }
        var poundage = round(money * parseFloat(salipay), 2);
        if (poundage < 1) {
            poundage = 1;
        } else if (poundage > 15) {
            poundage = 15;
        }
        if (money >= 5) {
            $("#totalcash").text(round(money - poundage, 2));
            $("#poundage").text(poundage);
        }

    }
}

function uptijiao(cardList) {
    var strList_Tmp = '';
    var array = new Array(cardList.length);
    for (var i = 0; i < cardList.length; i++) {
        if (cardList[i]) {
            var cardInfo = (cardList[i]
                .replace(/卡号[：|:]/g, '')
                .replace(/密码[：|:]/g, '')
                .replace(/卡密[：|:]/g, '')
                .replace(/[\u4e00-\u9fa5]+/g, '')
                .replace(/\s+/g, ' ')
                .replace(/(^\s*)|(\s*$)/g, "")
                .replace(/,/g, '*')
                .replace(/[ ]/g, '*')
                .replace(/，/g, '*')
                .replace(/\t/g, '*')
                .replace(/[|]/g, '*'))
                .split('*');
            if (cardInfo[0] != "") {
                array[i] = cardInfo[0];
            }
            if (cardInfo[1] == undefined) {
                strList_Tmp += cardInfo[0] + "\n";
            } else {
                strList_Tmp += cardInfo[0] + " " + cardInfo[1] + "\n";
            }
        }
    }
    return strList_Tmp.replace(/(^\s*)|(\s*$)/g, "");
};

//验证码状态
var mtime = timer1 = 0;

function codetime(mtime, type) {
    clearInterval(timer1);
    var id = '#mcode';
    if (type == 1) {
        id = '#emcode';
    }
    timer1 = setInterval(function () {
        mtime = mtime - 1;
        if (mtime > 0) {
            $(id).addClass("disabled").text(mtime);
        } else {
            $(id).removeClass("disabled").text("获取验证码");
            clearInterval(timer1);
        }
    }, 1000);
}

$(function () {
    $("body").datatoggle().ajaxsubmit().tooltip();

    /* matte */
    $('[data-toggle="matte"]').on('click', function (event) {
        event.preventDefault();
        if ($(this).is('.disabled, :disabled')) return;
        var selector = $(this).attr('data-target'),
            mask = $(this).attr('data-backdrop');

        if (!selector) {
            selector = $(this).attr('href');
            selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '');
        }
        if (mask == "false") {
            if (!$(this).hasClass('owl')) {
                $('[data-toggle="matte"]').removeClass('owl');
                $('.matte').removeClass('in');
                $(this).addClass('owl');
                $(selector).addClass('in');
            } else {
                $(this).removeClass('owl');
                $(selector).removeClass('in');
            }
        } else {
            if (mask == "content") {
                var backdrop = $('.mycontent').find('#backdrop');
                if (!backdrop.length) {
                    $('#backdrop').remove();
                    $('.mycontent').append('<div class="backdrop in" id="backdrop"></div>');
                }
            } else {
                var backdrop = $('body > #backdrop');
                if (!backdrop.length) {
                    $('#backdrop').remove();
                    $(document.body).append('<div class="backdrop in" id="backdrop"></div>');
                }
            }
            if (!$(this).hasClass('owl')) {
                $('[data-toggle="matte"]').removeClass('owl');
                $('.matte').removeClass('in');
                $(this).addClass('owl');
                $(selector).addClass('in');
                backdrop.addClass('in');
            } else {
                $(this).removeClass('owl');
                $(selector).removeClass('in');
                backdrop.removeClass('in');
            }
            $('#backdrop').on('click', function (event) {
                event.preventDefault();
                $('[data-toggle="matte"]').removeClass('owl');
                $('.matte').removeClass('in');
                $(this).removeClass('in');
            });
        }
    });

    /* data-dismiss="matte" */
    $('[data-dismiss="matte"]').on('click', function (event) {
        event.preventDefault();
        var $this = $(this),
            selector = $this.attr('data-target'),
            backdrop = $('#backdrop');
        if (!selector) {
            selector = $this.attr('href');
            selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '');
        }
        var $parent = $(selector);
        if (!$parent.length) $parent = $this.closest('.matte');
        $('[data-toggle="matte"]').removeClass('owl');
        $parent.removeClass('in');
        if (backdrop.length) {
            backdrop.removeClass('in');
        }
        return false;
    });

    // .accordion
    $('.accordion-header').on('click', function (event) {
        event.preventDefault();
        var $this = $(this),
            selector = $this.next('.accordion-body'),
            alls = $this.parent('.accordion').siblings('.accordion').find('.accordion-body');
        alls = $this.parent('.accordion').siblings('.accordion').find('.accordion-body');
        var $target = $(selector);
        if ($target.is(':visible')) {
            $target.slideUp('fast');
            $this.removeClass('open');
        } else {
            alls.slideUp('fast');
            $target.slideDown('fast');
            $this.addClass('open');
            $this.parent('.accordion').siblings('.accordion').find('.accordion-header').removeClass('open');
        }
        return false;
    });

    //  passeye
    $('.passeye').click(function () {
        var check = $(this).find('input[type=checkbox]'),
            input = $(this).parent('.cell-ft').prev('.cell-bd').find('.form-control');
        if (!input.length) {
            input = $(this).parent('.form-group').find('.form-control');
        }
        if (check.prop("checked")) {
            input.prop("type", "text").focus();
            ;
        } else {
            input.prop("type", "password").focus();
            ;
        }
    });

    // [data-input="clear"]  
    $('[data-input="clear"]').bind('input propertychange focus', function () {
        $('.control-clear').hide();
        var clinput = $(this);
        var clearit = clinput.parent().find('.control-clear');
        if (!clearit.length) {
            clinput.parent().append('<span class="control-clear"><i class="close"></i></span>');
            clearit = clinput.parent().find('.control-clear');
        }
        if (clinput.val() != "") {
            clearit.show();
        } else {
            clearit.hide();
        }
        clearit.click(function () {
            clinput.val("").focus();
            clearit.remove();
        });
    });

    // radio-group > a
    $(".radio-group > a").click(function () {
        if (!$(this).hasClass("active")) {
            $(this).addClass("active").siblings().removeClass("active");
        }
    });

    // invoice
    $("#invoice").click(function () {
        if ($(this).prop("checked")) {
            $("#invoice-info").show();
        } else {
            $("#invoice-info").hide();
        }
    });
    // invoice-type
    $("#invoice-type > a").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        if ($(this).attr("id") == "company") {
            $("#invoice-title").show();
        } else {
            $("#invoice-title").hide();
        }
    });

    // payment-tabs
    $('#payment-tabs input[type=radio]:not(:disabled)').click(function () {
        if ($(this).attr("id") == "unionpay") {
            $("#paytype").val(1);
            $("#payment-banks .backdrop").addClass("in");
            $("#payment-unionpay").addClass("in");
        } else {
            $("#paytype").val(2);
            $("#payment-unionpay").removeClass("in");
            $("#payment-banks .backdrop").removeClass("in");
        }
    });
    $("#payment-banks .close,#payment-banks .backdrop, #payment-banks .grids label").click(function () {
        $("#payment-banks .backdrop").removeClass("in");
        $("#payment-unionpay").removeClass("in");
    });

    // yuepay
    var money = 0;
    var neyue = 0;
    var third = 0;
    $("#moneyset").click(function () {
        var yong = 0;
        neyue = parseFloat(yed);
        third = parseFloat(yhk);
        var usermoney = parseFloat($("#moneyset").val());
        money = parseFloat(remaining);

        if ($(this).prop("checked")) {
            money -= third;
            if (usermoney > money) {
                yong = money;
            } else {
                yong = usermoney;
            }
            money = money - yong + third;
        } else {
            if (neyue > 0) {
                yong = neyue;
            } else {
                yong = 0;
            }
            money = money - neyue;
        }

        $("#moneyYue").text(yong.toFixed(2));
        $("[name='money']").val(yong.toFixed(2));
        $("#moneyNeed").text(money.toFixed(2));

        if (yong <= 0) {
            $("#payment-third").show();
        } else {
            $("#payment-third").hide();
            if (money > 0) {
                $("#payment-third").show();
            }
        }

        if (money != remaining) {
            $("#payment-paypass").show();
        } else {
            $("#payment-paypass").hide();
        }
    });


    // payment-choose li
    $("#payment-choose > li").click(function () {
        if ($(this).attr("id") == "ebank") {
            $("#payment-choose > li").removeClass("active");
            $(this).addClass("active");
            $(".payment-item").hide();
            $("#payment-ebank").show();
            $("#paytype").val(1);
        } else if ($(this).attr("id") == "credit") {
            $("#payment-choose >  li").removeClass("active");
            $(this).addClass("active");
            $(".payment-item").hide();
            $("#payment-credit").show();
            $("#paytype").val(3);
        } else {
            $("#payment-choose > li").removeClass("active");
            $(this).addClass("active");
            $(".payment-item").hide();
            $("#payment-platform").show();
            $("#paytype").val(2);
        }
    });

    function minusclick(bid) {
        if (bid) {
            var parens = $(bid).closest(".shopcart-item"),
                prices = parens.find(".unitmoney").text(),
                sums = parens.find(".sumoney"),
                counts = parseInt(parens.find(".count").val()),
                sercount = parens.find(".service-count");
            if (sercount.length !== 0) {
                sercount.each(function () {
                    $(this).text(counts);
                });
            }
            sums.html((prices * counts).toFixed(2));
            getcount();
        } else {
            var parens = $('[buy="buycard"]').closest("#sell"),
                prices = parens.find("#salePrice").text(),
                sums = parens.find("#tradPrice"),
                counts = parseInt(parens.find(".count").val());
            sums.html((prices * counts).toFixed(2));
        }
    }

    // spinner
    $(".spinner").each(function () {
        var obj = $(this),
            minus = $(this).find(".minus"),
            plus = $(this).find(".plus"),
            count = $(this).find(".count"),
            mins = parseInt(count.val()) || 1,
            maxs = parseInt(count.attr("max"));

        function output(str) {
            maxs = parseInt(count.attr("max"));
            bid = parseInt(count.attr("bid"));
            if (maxs == -1) maxs = 999;
            if (maxs == 0) {
                count.val(mins = 0);
                minus.addClass("disabled");
                plus.addClass("disabled");
            } else {
                mins == 1 && minus.addClass("disabled") || minus.removeClass("disabled");
                mins == maxs && plus.addClass("disabled") || plus.removeClass("disabled");
            }
            if (bid > 0 && str != 1) {
                $.post('/?do=shopcart&id=' + bid + '&num=' + count.val() + '&type=4', function (data) {
                    $("#shopcart-" + bid + " .unitmoney").text(data["price"]);
                    if (data["doing"]) {
                        $("#shopcart-" + bid + " .doing").text(data["doing"]).show();
                    } else {
                        $("#shopcart-" + bid + " .doing").hide();
                    }
                    minusclick("#shopcart-" + bid);
                    data = null;
                }, 'json');
            } else {
                minusclick();
            }
            count.change();
        }

        minus.unbind().click(function () {
            !$(this).is(".disabled") && count.val(--mins), output();
        });
        plus.unbind().click(function () {
            !$(this).is(".disabled") && count.val(++mins), output();
        });
        count.unbind().keyup(function () {
            maxs = parseInt(count.attr("max"));
            if (maxs == -1) maxs = 999;
            i = parseInt(count.val());
            i = i ? i : 1;
            i = i > maxs ? maxs : i;
            count.val(mins = i);
            output();
        });
        output(1);
    });
});

function getcard(obj, str1, id) {
    if (str1 == 3 || str1 == 4) {
        if (formtest(obj, 1)) {
            $.post('/?do=account&act=giftcard&to=' + str1 + '&id=' + id, $("#formcash").serializeArray(), function (data) {
                out_json(data);
            }, 'json');
        }
    } else {
        $.get('/?do=account&act=giftcard&to=' + str1 + '&id=' + id, function (data) {
            $("#modal-dialog").html(data).width(400).modal({
                title: "提取卡券",
                modal: true
            }).ajaxsubmit();
            $("#cardnum").blur(function (data) {
                var cardid = parseFloat(inputbox(this));
                if (str1 == 2) {
                    var saleprice = parseFloat($("#saleprice").text()) * cardid;
                    $("#priceid").text(saleprice.toFixed(2));
                }
            }).blur();
        });
    }
};