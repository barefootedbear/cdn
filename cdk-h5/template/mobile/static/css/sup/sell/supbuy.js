$(function() {
    $("#chongMenu \x3e .tab-item:first").addClass("active");
    $("#chongMenu \x3e .tab-item.active").click()
});

let cardprice = "";

function selectKind(a, d) {
    $(a).addClass("active").siblings().removeClass("active");
    $("#chongCard \x3e .tab-panel").removeClass("active");
    $("#chongCard \x3e #" + d).addClass("active");
    $("#chongCard .chong-group \x3e li").removeClass("active");
    $("#chongCard \x3e #" + d).find(".chong-group \x3e li:first").addClass("active");
    $("#chongCard \x3e #" + d).find(".chong-group \x3e li.active \x3e .chong-card").click();
    selectMore("#chongBackdrop")
}

function selectCard(a, d) {
    let c = $(a).closest(".chong-group");
    c.next(".chong-more");
    let e = $(a).parent("li").index();
    c.hasClass("chong-group-pc") || 3 < e && $(a).parent("li").insertBefore(c.find("li:eq(3)"));
    $(".chong-group \x3e li").removeClass("active");
    $(a).parent("li").addClass("active");
    $("#chongBg").attr("class", "chong-bg chong-bg-" + d);
    $("#accountImg").attr("src", $(a).find("img").attr("src"));
    $("#chongPrimary .form-control").val("");
    selectMore("#chongBackdrop");
    $.get(url, {categoryId: d}, function(b) {
        cardprice = b;
        let a = "";
        $.each(b, function(c, v) {
            a = v.subTitle ? a + '\x3cdiv class\x3d"tab-item" onclick\x3d"selectType(this,\'' + c + "');\"\x3e\x3cspan\x3e" + v.name + "\x3c/span\x3e\x3csmall\x3e" + v.subTitle + "\x3c/small\x3e\x3c/div\x3e" : a + '\x3cdiv class\x3d"tab-item" onclick\x3d"selectType(this,\'' + c + '\');"\x3e\x3cspan class\x3d"nosub"\x3e' + v.name + "\x3c/span\x3e\x3c/div\x3e";
        });
        $("#congTypeTabs").empty().html(a);
        delete a;
        $("[name\x3d'tradid']").val(d);
        $("#chongPrimary").removeClass("chong-primary-loader");
        $("#congTypeTabs \x3e .tab-item:first").addClass("active");
        $("#congTypeTabs \x3e .tab-item.active").click();
        $("#chongFormer").fadeIn()
    }, "json")
}

function selectType(a, d) {
    let c = "";
    const e = cardprice[d];
    const b = e.h5Attributes.split('|');
    $(a).addClass("active").siblings().removeClass("active");
    $("#chongFacer").addClass("chong-facer-loader");
    $.each(e.sKuDtoList, function(a, b) {
        c = c + '\x3cli\x3e\x3ca href\x3d"javascript:;" onclick\x3d"selectFacer(this,' + b.id + ');" val\x3d"' + a + '"\x3e\x3cspan class\x3d"price-value"\x3e' + b.name + '\x3c/span\x3e\x3cspan class\x3d"price-selling"\x3e\u552e\u4ef7\x3cspan\x3e' + b.yuanListingPrice + "\x3c/span\x3e\u5143\x3c/span\x3e\x3c/a\x3e\x3c/li\x3e";
    });
    $("#chongFacerGroup").empty().html(c).removeClass("disabled");
    delete c;
    $("#chongPrimary .form-control").attr({
        reg: b[2],
        placeholder: "\u8bf7\u8f93\u5165" + b[0],
        err: b[0] + "\u683c\u5f0f\u9519\u8bef",
        "null": b[0] + "\u4e0d\u80fd\u4e3a\u7a7a"
    });
    0 == b[1] && $("#chongPrimary .form-control").removeAttr("null");
    "\u624b\u673a\u53f7" == b[0] || "QQ\u53f7\u7801" == b[0] || "\u52a0\u6cb9\u5361\u53f7" == b[0] ? ($("#chongPrimary .form-control").prop("type", "tel"),
    "\u624b\u673a\u53f7" == b[0] && $("#chongPrimary .form-control").attr("maxlength", "11"),
    "QQ\u53f7\u7801" == b[0] && $("#chongPrimary .form-control").attr("maxlength", "10")) : $("#chongPrimary .form-control").prop({
        maxlength: "30",
        type: "text"
    });
    $("[name\x3d'lid']").val(e.id);
    $("#chongFacer").removeClass("chong-facer-loader");
    $("#chongFacerGroup \x3e li:not(.disabled):first").addClass("active");
    $("#chongFacerGroup \x3e li:not(.disabled).active \x3e a").click()
}

function selectFacer(a, d) {
    let c = $(a).attr("max")
        , e = $(a).find(".price-selling \x3e span").text();
    $(a).parent("li").addClass("active").siblings().removeClass("active");
    $('[name\x3d"sid"]').val(d);
    $("#tradPrice").text(e);
    0 == c ? $("#chongBtn").addClass("disabled").prop("disabled", !0) : $("#chongBtn").removeClass("disabled").prop("disabled", !1)
}

function selectMore(a) {
    $(a).hasClass("chong-more") ? $(a).hasClass("open") ? ($(a).removeClass("open"),
        $(a).prev(".chong-group").removeClass("open"),
        $("#chongBackdrop").removeClass("in")) : ($(a).addClass("open"),
        $(a).prev(".chong-group").addClass("open"),
        $("#chongBackdrop").addClass("in")) : $(a).hasClass("in") && ($(a).removeClass("in"),
        $(".chong-more.open").removeClass("open"),
        $(".chong-group.open").removeClass("open"))
}
function foramtPhoneNum(a, d) {
    var c = $(d).val();
    if (/^[\d\s]+$/.test(c)) {
        for (var c = c.replace(/\s*/g, ""), e = [], b = 0; b < c.length; b++)
            3 == b || 7 == b ? e.push(" " + c.charAt(b)) : e.push(c.charAt(b));
        d.value = e.join("")
    } else
        c = c.replace(/[^\d\s]/g, ""),
            $(d).val(c)
}
function paycheck(a, d) {
    $("#modal-prompt").width(550).modal({
        title: "\u8bf7\u5b8c\u6210\u4ed8\u6b3e",
        modal: !0
    });
    $("#newhref").attr("href", a);
    window.location.href = a
}
;