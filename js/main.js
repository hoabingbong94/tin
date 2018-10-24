$(document).ready(function () {
    $("#showPopup").click(function () {
        showPopup();
    });
    $("#load-more-news").on('click', function () {
        loadMore("/news/load-more-news");
    });
    $("#load-more-news-ttnn").on('click', function () {
        loadMore("/newsttnn/load-more-news");
    });
    $("#load-more-star").on('click', function () {
        loadMore("/star/load-more-news");
    });
    $("#load-more-video").on('click', function () {
        loadMore("/video/load-more-video");
    });
    $("#load-more-video-categories").on('click', function () {
        var alias = $("#data-page").attr('data-alias');
        loadMore("/video/load-more-video-categories?alias=" + alias);
    });
    $("#load-more-video-categories-pl").on('click', function () {
        var alias = $("#data-page").attr('data-alias');
        loadMore("/video/load-more-video-categories-pl?alias=" + alias);
    });
    $("#load-more-video-related").on('click', function () {
        var id = $("#data-page").attr('data-id');
        loadMore("/video/related?id=" + id);
    });
    var scroll = 0;
    $(document).on('scroll', function () {
        var scrollActive = $(document).scrollTop();
        if (scrollActive > 100) {
            if (scrollActive < scroll) {
                $(".menu").removeClass("menu-fix");
            } else {
                $(".menu").addClass("menu-fix");
            }
            scroll = scrollActive;
        } else {
            $(".menu").removeClass("menu-fix");
        }
    });
    showMessage();

});
function loadMore(link) {
    $("#data-page span").html("Đang tải...");
    var page = parseInt($("#data-page").attr('data-page'));
    $.ajax({
        url: link,
        cache: true,
        type: "GET",
        data: {
            page: page
        },
        success: function (data) {
            $("#append-data").append(data);
            $("#data-page").attr('data-page', page + 1);
            $("#data-page span").html("Xem thêm");
        }
    });
}
function menu() {
    var flag = $("#flagMenu").val();
    if (flag == "1") {
        $(".bg-tran").hide();
        $("body").removeClass("noneOverFlowNone");
        $("#flagMenu").val("0");
        $(".menu-left").hide();
    } else {
        $(".bg-tran").show();
        $("body").addClass('noneOverFlowNone');
        $("#flagMenu").val("1");
        $(".menu-left").show();
    }
    return false;
}
/*
 * Login
 */
function showPopup() {
    $("#popup-profile").modal('show');
}
function checkCaptcha() {

}
function changeCaptcha() {
    var d = new Date();
    var n = d.getTime();
    $("#captchaImg").attr("src", "/auth/gen-captcha?time=" + n);
}
function loginEnabledInput() {
    $("#phoneNumber").attr('disabled', false);
    $("#password").attr('disabled', false);
    $("#text-captcha").attr('disabled', false);
}
function loginDisabledInput() {
    $("#phoneNumber").attr('disabled', true);
    $("#password").attr('disabled', true);
    $("#text-captcha").attr('disabled', true);
}
function loginAction() {
    loginDisabledInput();
    $("#mes-login").html("Đang kiểm tra...");
    var phoneNumber = $("#phoneNumber").val();
    var password = $("#password").val();
    var csrf = $("meta[name=csrf-token]").attr('content');
    var captcha = $("#text-captcha").val();
    if (typeof $("#text-captcha") != "undefined") {
        captcha = $("#text-captcha").val();
    }
    var params = genParams(password, phoneNumber);
    $.ajax({
        url: "/auth/login?param=" + params + "&csrf=" + csrf + "&captcha=" + captcha,
        cache: false,
        type: "GET",
        success: function (response) {
            var data = JSON.parse(response);
            var state = data.state;
            $("#mes-login").html(data.mes);
            if (state == 2) {
                $("#loadCaptcha").html(data.captcha);
            }
            if (state != 1) {
                loginEnabledInput();
            } else {
                setTimeout(function () {
                    window.location.href = "/";
                }, 300);
            }

        }
    });

}
function genParams(password, username) {
    var keyList = ['qaz', 'wsx', 'edc', 'rfv', 'tgb', 'yhn', 'ujm', 'ikl', 'opa'];
    var keyListSe = ['1', '0', '0', '0', '1', '0', '1', '0', '1', '1'];
    var key = keyList[Math.floor(Math.random() * keyList.length)];
    var keySe = keyListSe[Math.floor(Math.random() * keyListSe.length)];
    var encodeP = ["Fv", "Ul", "Zj", "DR", "PT", "Ka", "Hs", "wX", "Qi", "bn"];
    var encodeU = ["cZ", "Ce", "wV", "Bn", "fM", "Sd", "jA", "Lh", "qU", "YT"];
    var listCharPassword = password.split('');
    var listCharUsername = username.split('');
    var lengthStrPassword = password.length;
    var lengthStrUsername = username.length;
    var outPassword = "";
    for (i = 0; i < lengthStrPassword; i++) {
        var flag = listCharPassword[i];
        outPassword += encodeP[flag];
    }
    var outUsername = "";
    for (i = 0; i < lengthStrUsername; i++) {
        var flag = listCharUsername[i];
        outUsername += encodeU[flag];
    }
    var params = "";
    if (keySe == "1") {
        params = base64_encode(outPassword + key + outUsername + keySe + key);
    } else {
        params = base64_encode(outUsername + key + outPassword + keySe + key);
    }
    return params;
}
function base64_encode(data) {
    var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
            ac = 0,
            enc = '',
            tmp_arr = [];
    if (!data) {
        return data;
    }
    do {
        o1 = data.charCodeAt(i++);
        o2 = data.charCodeAt(i++);
        o3 = data.charCodeAt(i++);
        bits = o1 << 16 | o2 << 8 | o3;
        h1 = bits >> 18 & 0x3f;
        h2 = bits >> 12 & 0x3f;
        h3 = bits >> 6 & 0x3f;
        h4 = bits & 0x3f;
        tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
    } while (i < data.length);
    enc = tmp_arr.join('');
    var r = data.length % 3;
    return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
}
function loaddatepicker() {
    $(function () {
        $("#datepicker").datepicker({
            language: 'ru',
            showOn: "button",
            buttonImageOnly: false,
            buttonText: "Chọn Ngày",
            dateFormat: 'dd-mm-yy',
            onSelect: function (dateText) {
                console.log(dateText);
                //actionKQ(1);
                //aaa();
                angular.element(document.getElementById('wap-content-main')).scope().aaa();
                angular.element(document.getElementById('wap-content-main')).scope().$apply();
            }
        });
        $.datepicker.regional['vi'] = {
            closeText: 'Đóng',
            prevText: '&#x3c;Trước',
            nextText: 'Tiếp&#x3e;',
            currentText: 'Hôm nay',
            monthNames: ['Tháng Một', 'Tháng Hai', 'Tháng Ba', 'Tháng Tư', 'Tháng Năm', 'Tháng Sáu',
                'Tháng Bảy', 'Tháng Tám', 'Tháng Chín', 'Tháng Mười', 'Tháng Mười Một', 'Tháng Mười Hai'],
            monthNamesShort: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
                'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
            dayNames: ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'],
            dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
            dayNamesMin: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
            weekHeader: 'Tu',
            dateFormat: 'dd/mm/yy',
            firstDay: 0,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ''};
        $.datepicker.setDefaults($.datepicker.regional['vi']);
    });
}


function toredirecturl(matchId, tips) {
    var url_notice = "http://bongnhanh.vn";
    var link = url_notice + "/match/redirect-score?match=" + matchId + "&tips=1";
    $(location).attr('href', link);
}
function show_comfirm(msisdn, packageName, price, packageId) {
    if (msisdn != '') {
        $("#popup-confirm").modal('show');
        $("#packageId").val(packageId);
        var mes = 'Đăng ký dịch vụ ' + packageName + ' với giá ' + price + '. Trừ tài khoản gốc thuê bao ' + msisdn + '.';
        $("#confirm-package-info").html(mes);
    }
}
function show_confirm_last() {
    $("#popup-confirm").modal('hide');
    $("#info-last").html($("#confirm-package-info").html());
    $("#popup-confirm-last").modal('show');
    var packageId = $("#packageId").val();
    var link = "/package/redirect-register?package=" + packageId;
    $("#submit-register").attr('href', link);
    $.ajax({
        url: "/package/ticket?package=" + packageId + "&syntax=DK",
        cache: false,
        type: "GET",
        success: function (response) {
            var data = JSON.parse(response);
            var href = $("#submit-register").attr('href') + "&ticket=" + data.ticket + "&requestId=" + data.requestId;
            $("#submit-register").attr('href', href);
        }
    });
}
function hideModal() {
    $(".modal").modal('hide');
}
function confirmUnSub(package) {
    $("#popup-confirm-unSub").modal('show');
    var link = "/package/redirect-un-register?packageId=" + package;
    $("#submit-un-register").attr('href', link);
}
function showMessage() {
    var status = $("#message").val();
    var message = "";
    switch (status) {
        case "0":
            message = "Đăng ký gói dịch vụ không thành công.";
            break
        case "1":
            message = "Chào mừng Quý khách đến với dịch vụ Vũ điệu sân cỏ.";
            break;
        case "2":
            message = "Phiên làm việc của bạn không hợp lệ.";
            break;
        case "3":
            message = "Đăng ký dịch vụ không thành công do quý khách đang sử dụng gói dịch vụ này.<br/>Xin cảm ơn!";
            break;
        case "7":
            message = "Quý khách đã hủy thành công gói dịch vụ vũ điều sân cỏ.";
            break;
        case "8":
            message = "Phiên làm việc của bạn không hợp lệ.";
            break;
        case "9":
            message = "Hủy dịch vụ không thành công.";
            break;
        case "10":
            message = "Hủy dịch vụ không thành công. Do quý khách chưa đăng ký sử dụng gói dịch vụ này.</br>Xin cảm ơn!";
            break;
        case "login":
            message = "Bạn hãy đăng ký gói DV vũ điệu sân cỏ để sử dụng chức năng này.<br/>Xin cảm ơn!";
            break;
    }
    if (message != "") {
        $("#message-popup-content").html(message);
        $("#popup-message").modal('show');
        $.ajax({
            url: "/package/remove-message",
            cache: false,
            type: "GET",
            success: function (response) {
            }
        });
    }
}
function playAlbumVideo(k) {
    $(document).scrollTop(0);
    var objData = $("#itemPlay" + k);
    var sourceVideo = objData.attr('data-video');
    var title = objData.attr('data-title');
    var poster = objData.attr('data-thumb');
    $("#title-detail-video").text(title);
    $("#list-item-video li").removeClass('active');
    objData.addClass('active');
    var objVideo = $("#videoPlayer");
    objVideo.attr('src', sourceVideo);
    objVideo.attr('poster', poster);
    objVideo.get(0).play();
}
function moreFooter() {
    $(".footerMore").show();
    $("#btnMoreFooter").hide();
}