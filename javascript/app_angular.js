
var http_request = "/angular/";

var appHome = angular.module('appLoadhome', []);
var appKq = angular.module('appLoadkq', []);
var appmatchdetail = angular.module('appLoadchitiettran', []);
var apptipsmatch = angular.module('appLoadchitiettips', []);
apptipsmatch.controller('cLoadchitiettips', function ($scope, $http, $sce) {
    var key_ng = $("#ng-key").val();
    var match_id = $("#match_id_tips").val();
    $scope.toredirecturl_ang = function (matchid, tip) {
        toredirecturl(matchid, tip);
        //0919268006 long
    };
    //var match_id = $.urlParam("msid");
    var widthsceen = $(".hightchartcontainer").width();
    if (widthsceen < 650) {
        var widthsceen_tmp = $(window).width();
        widthsceen = widthsceen_tmp - 30;
    }
    var chart = {
        plotBackgroundColor: '#E9EAED',
        plotBorderWidth: 0,
        plotShadow: false,
        width: widthsceen
    };
    var tooltip = {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    };
    var plotOption = {
        pie: {
            dataLabels: {
                enabled: true,
                distance: -25,
                style: {
                    fontWeight: 'bold',
                    color: '#E9EAED',
                    textShadow: '0px 1px 2px black'
                }
            },
            startAngle: -90,
            endAngle: 90,
            center: ['50%', '75%']
        }
    };

    $http.get(http_request + "chitiettips?key=" + key_ng + "&match_id=" + match_id)

            .success(function (response) {
                time_interval = 5000;
                $scope.renderHtml = function (htmlCode) {
                    return $sce.trustAsHtml(htmlCode);
                };
                $scope.data = response.data;
                $scope.datatran = response.tran.data;
                $scope.flag_doi_hinh = response.tran.flag_doi_hinh;
                $scope.doiA = response.tran.doiA;
                $scope.doiB = response.tran.doiB;
                $scope.dubiA = response.tran.dubiA;
                $scope.dubiB = response.tran.dubiB;
                $scope.event = response.tran.event;
                $(".load_tipsoftheday").hide();
                //setInterval(runeff, 500);
                //
                $(".ng-showload").show();
                $('#container-hightchart-Home').highcharts({
                    chart: chart,
                    title: {
                        text: response.data.HomeName,
                        align: 'center',
                        verticalAlign: 'middle',
                        y: 50
                    },
                    tooltip: tooltip,
                    credits: {
                        enabled: false
                    },
                    plotOptions: plotOption,
                    series: [{
                            type: 'pie',
                            name: 'Tỉ lệ',
                            innerSize: '30%',
                            data: [
                                ['Thắng:' + response.data.homeW, response.data.homeW],
                                ['Hòa:' + response.data.homeD, response.data.homeD],
                                ['Thua:' + response.data.homeL, response.data.homeL]
                            ],
                            color: "red"
                        }]
                });
                //
                $('#container-hightchart-Away').highcharts({
                    chart: chart,
                    title: {
                        text: response.data.AwayName,
                        align: 'center',
                        verticalAlign: 'middle',
                        y: 50
                    },
                    credits: {
                        enabled: false
                    },
                    tooltip: tooltip,
                    plotOptions: plotOption,
                    series: [{
                            type: 'pie',
                            name: 'Tỉ lệ',
                            innerSize: '30%',
                            data: [
                                ['Thắng:' + response.data.awayW, response.data.awayW],
                                ['Hòa:' + response.data.awayD, response.data.awayD],
                                ['Thua:' + response.data.awayL, response.data.awayL]
                            ]
                        }]
                });
                //
            });
    setInterval(function () {
        $(".load_tipsoftheday").show();
        var key_ng = $("#ng-key").val();
        //var match_id = $.urlParam("msid");
        var match_id = $("#match_id_tips").val();
        $http.get(http_request + "chitiettips?key=" + key_ng + "&match_id=" + match_id)
                .success(function (response) {
                    time_interval = 5000;
                    $scope.renderHtml = function (htmlCode) {
                        return $sce.trustAsHtml(htmlCode);
                    };
                     $scope.data = response.data;
                    $scope.datatran = response.tran.data;
                    $scope.flag_doi_hinh = response.tran.flag_doi_hinh;
                    $scope.doiA = response.tran.doiA;
                    $scope.doiB = response.tran.doiB;
                    $scope.dubiA = response.tran.dubiA;
                    $scope.dubiB = response.tran.dubiB;
                    $scope.event = response.tran.event;
                    $(".load_tipsoftheday").hide();
                    //setInterval(runeff, 500);
                    //

                    $('#container-hightchart-Home').highcharts({
                        chart: chart,
                        title: {
                            text: response.data.HomeName,
                            align: 'center',
                            verticalAlign: 'middle',
                            y: 50
                        },
                        tooltip: tooltip,
                        credits: {
                            enabled: false
                        },
                        plotOptions: plotOption,
                        series: [{
                                type: 'pie',
                                name: 'Tỉ lệ',
                                innerSize: '30%',
                                data: [
                                     ['Thắng:' + response.data.homeW, response.data.homeW],
                                ['Hòa:' + response.data.homeD, response.data.homeD],
                                ['Thua:' + response.data.homeL, response.data.homeL]
                                ],
                                color: "red"
                            }]
                    });
                    //
                    $('#container-hightchart-Away').highcharts({
                        chart: chart,
                        title: {
                            text: response.data.AwayName,
                            align: 'center',
                            verticalAlign: 'middle',
                            y: 50
                        },
                        credits: {
                            enabled: false
                        },
                        tooltip: tooltip,
                        plotOptions: plotOption,
                        series: [{
                                type: 'pie',
                                name: 'Tỉ lệ',
                                innerSize: '30%',
                                data: [
                                   ['Thắng:' + response.data.awayW, response.data.awayW],
                                ['Hòa:' + response.data.awayD, response.data.awayD],
                                ['Thua:' + response.data.awayL, response.data.awayL]
                                ]
                            }]
                    });
                    //
                });
        $scope.$apply();
    }, 150000);
});
appHome.controller('cLoadhome', function ($scope, $http, $sce) {
    $scope.toredirecturl_ang = function (matchid, tip) {
        //alert(matchid);
        toredirecturl(matchid, tip);
    };
    $scope.loadleague = function () {
        $("#flag_show_lague").val("");
        $(".hiddent").css("display", "block");
        $(".show_hidden").hide();
    };
    var flag = $("#flag_show_lague").val();
    $http.get(http_request + "loadhome?flag=" + flag)
            .success(function (response) {
                $scope.renderHtml = function (htmlCode) {
                    return $sce.trustAsHtml(htmlCode);
                };
                $scope.league = response.items;
                $scope.mobile = response.mobile;
                $(".load_tipsoftheday").hide();
                $("#tipsoftheday").show();
                // setInterval(runeff, 500);
            });
    setInterval(function () {
        var flag = $("#flag_show_lague").val();
        $(".load_tipsoftheday").show();
        $http.get(http_request + "loadhome?flag=" + flag)
                .success(function (response) {
                    $scope.renderHtml = function (htmlCode) {
                        return $sce.trustAsHtml(htmlCode);
                    };
                    $scope.league = response.items;
                    $scope.mobile = response.mobile;
                    $(".load_tipsoftheday").hide();
                    //$scope.items = response.data.items;
                });
        $scope.$apply();
    }, 1500000);
});

appKq.controller('cLoadkq', function ($scope, $http, $sce) {

    var url = window.location.href;
   
    var action = $.urlParam("action");
    if (action == null) {
        action = "10";
    }
    var paramdate = "";

    $scope.toredirecturl_ang = function (matchid, tip) {
        //alert(matchid);
        toredirecturl(matchid, tip);
    };
    $scope.aaa = function () {
        var datetime = $("#datepicker").val();
        if (datetime != "") {
            paramdate = "&datetime=" + datetime;
        }
        $(".load_event").show();
        var action = $.urlParam("action");
        if (action == null) {
            action = "10";
        }
        var openFlag = $("#openflag").val();
        $http.get(http_request + "kq?action=" + action + paramdate + "&openflag=" + openFlag)
                .success(function (response) {
                    $scope.renderHtml = function (htmlCode) {
                        return $sce.trustAsHtml(htmlCode);
                    };
                    $scope.data = response.data;
                    $scope.showtips = response.show_tips;
                    $scope.report = response.report;
                    //$scope.items = response.data.items;
                    $(".load_event").hide();
                });
    };
    $scope.changeurl = function (action) {
        $("#firstLoad").val("1");
        var datetime = $("#datepicker").val();
        if (datetime != "") {
            paramdate = "&datetime=" + datetime;
        }
        $("#load_event_" + action).show();
        $(".kqactive").removeClass('active');
        $(".kqaaction" + action).addClass('active');
        var urlfull = window.location.href;
        var dataurl = urlfull.split("?");
        var openFlag = $("#openflag").val();
        var firstLoad = $("#firstLoad").val();
        window.history.replaceState({}, 'action', dataurl[0] + '?action=' + action + paramdate);
        $http.get(http_request + "kq?action=" + action + paramdate)
                .success(function (response) {
                    $scope.renderHtml = function (htmlCode) {
                        return $sce.trustAsHtml(htmlCode);
                    };
                    $scope.data = response.data;
                    $scope.report = response.report;
                    $scope.showtips = response.show_tips;
                    $("#openflag").val(response.list_open_first);
                    $("#load_event_" + action).hide();
                    //setInterval(runeff, 500);
                    $("#firstLoad").val("0");
                });
    };

    //var action = $("#action_load").val();
    var openFlag = $("#openflag").val();
    var firstLoad = $("#firstLoad").val();
    $http.get(http_request + "kq?action=" + action + "&openflag=" + openFlag + "&first_load=" + firstLoad)
            .success(function (response) {
                $scope.renderHtml = function (htmlCode) {
                    return $sce.trustAsHtml(htmlCode);
                };
                $scope.data = response.data;
                $scope.report = response.report;
                $scope.showtips = response.show_tips;
                $("#openflag").val(response.list_open_first);
                //setInterval(runeff, 700);
                $(".load_event").hide();
                $("#firstLoad").val("0");
                $("#kqcontent").show();
            });
//    setInterval(function () {
//        var datetime = $("#datepicker").val();
//        if (datetime != "") {
//            paramdate = "&datetime=" + datetime;
//        }
//        $(".load_event").show();
//        var action = $.urlParam("action");
//        if (action == null) {
//            action = "10";
//        }
//        var openFlag = $("#openflag").val();
//        var firstLoad = $("#firstLoad").val();
//        $http.get(http_request + "kq?action=" + action + paramdate + "&openflag=" + openFlag + "&first_load=" + firstLoad)
//                .success(function (response) {
//                    $scope.renderHtml = function (htmlCode) {
//                        return $sce.trustAsHtml(htmlCode);
//                    };
//                    $scope.data = response.data;
//                    $scope.report = response.report;
//                    $scope.showtips = response.show_tips;
//                    //$scope.items = response.data.items;
//                    $(".load_event").hide();
//                });
//        $scope.$apply();
//    }, 15000);
});
$(document).ready(function () {
    setInterval(runeff, 500);
    //runeff();
});

function runeff() {
    var findObj = $("span.live-score");
    var dataColor = findObj.attr("data-color");
    if (dataColor === "main") {
        findObj.attr("data-color", "newcolor");
    } else {
        findObj.attr("data-color", "main");
    }
}
$.urlParam = function (name) {
    var results = new RegExp('[\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    } else {
        return results[1] || 0;
    }
}
