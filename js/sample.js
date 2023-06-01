
let token;

function get_Token() {

    fetch('../../../../config.txt')
        .then(response => response.json())
        .then(data => {
            // Store the token in local storage
            token3 = decodeURIComponent(data);
            localStorage.setItem('token', token3);
            //   console.log('Token Bhai1:' + token3);
            // Retrieve the token from local storage
            // token = localStorage.getItem('token');
            // console.log('Token Bhai:' + token);

        })
        .catch(error => {
            console.error('Error retrieving token:', error);
        });
}
setInterval(function () {
    get_Token()
}, 70000);

update_time = (() => {
    $.getJSON(master_url_new + "/current?type=servertime", function (t) {
        t = t.split(":"), $(".dtime").html(t[0] + ":" + t[1])
    })
}), closest = ((t, e) => e.reduce((e, a) => {
    let o = Math.abs(e - t),
        r = Math.abs(a - t);
    return o == r ? e > a ? e : a : r < o ? a : e
})),

    market_day = (() => {
        var t = (new Date).getDay();
        return t > 0 && t < 6
    }),
    ts_processor = (t => {
        let e = $(".js-range-slider").data("ionRangeSlider");
        var a = t + " " + moment(e.old_from).format("HH:mm:ss");
        a = moment(a).unix();
        var o = t + " " + moment(e.old_to).format("HH:mm:ss");
        return [a, o = moment(o).unix()]
    }), percentage = ((t, e) => (100 * t / e).toFixed(2)), diff_per = (() => {
        if (0 == dtime_clock()) return 360;
        var t = new Date;
        return 60 * (t.getHours() - 9) + (t.getMinutes() - 30)
    }), sub_days = (t => {
        var e = new Date,
            a = (new Date(t).getTime() - e.getTime()) / 864e5;
        return 0 == Math.ceil(a) ? .5 : Math.ceil(a)
    }), get_curr_time = (() => {
        var t = new Date,
            e = String(t.getHours()),
            a = String(t.getMinutes());
        return e < 10 && (e = "0" + e), a < 10 && (a = "0" + a), e + a
    }), update_max = (() => {
        let t = $(".js-range-slider").data("ionRangeSlider");
        0 != dtime_clock() ? t.update({
            to_max: moment(get_curr_time(), "hhmm").valueOf()
        }) : t.update({
            to_max: moment("1530", "hhmm").valueOf()
        })
    }), irs_update_from = ((t = "0915") => {
        $(".js-range-slider").data("ionRangeSlider").update({
            from: moment(t, "hhmm").valueOf()
        })
    }), fetch_data = (() => {
        update_range_data()
    }), old_date_update_range_data = (() => {
        if (screen.width > 575) var t = $("#change_date_dsk").val();
        else t = $("#change_date_mob").val();
        0 == t ? update_range_data() : update_range_data(!0, !0, ts_processor(t))
    }), update_range_data = ((normal = !0, holiday = !1, recalc_ts = []) => {
        let irs_data = $(".js-range-slider").data("ionRangeSlider");
        if (screen.width > 575) var expiry = $("#js_me_1_res").val();
        else var expiry = $("#js_me_m1_res").val();
        var index = global_index_current,
            from_t = moment(irs_data.old_from).unix(),
            to_t = moment(irs_data.old_to).unix();
        console.log("From: " + from_t)
        console.log("To: " + to_t)
        if (0 == normal) {
            let t = $(".js-range-slider").data("ionRangeSlider"),
                e = $("#oi_compass_select").val();
            var from_t = moment(t.old_to).subtract(e, "minutes").unix(),
                to_t = moment(t.old_to).unix()
        }
        if (1 == holiday) var from_t = recalc_ts[0],
            to_t = recalc_ts[1];

        $.ajax({
            url: master_url_new + "/zoption-new/compare/" + index.replace(" 50", "").toUpperCase() + expiry.replaceAll("-", ""),
            type: "GET",
            data: {
                start: from_t,
                end: to_t
            },
            headers: {
                "AuthorizationToken": localStorage.getItem('token').split('"').join('')
            },
            success: function (data, status) {
                console.log('Compared Data  ' + eval(data))
                if (data = eval(data), data.length < 1 && alert("Data not available for selected Time Range, Please change DateTime"), void 0 === data && alert("Please select valid Range & Expiry"), 0 == data[0][1] && 0 == data[0][2] && 0 == data[0][3] && 0 == data[0][4] || void 0 === data) {
                    console.log(" not enough data");
                    var curr_to_t = moment().unix();
                    $.ajax({
                        url: master_url_new + "/zoption-new/" + index.replace(" 50", "").toUpperCase() + expiry.replaceAll("-", ""),
                        type: "GET",
                        data: {
                            timestamp: curr_to_t
                        },
                        headers: {
                            "AuthorizationToken": localStorage.getItem('token').split('"').join('')
                        },
                        success: function (data, status) {
                            var new_ts = eval(data),
                                temp = new_ts[0][8].split(" ");
                            let irs_data = $(".js-range-slider").data("ionRangeSlider");
                            var a = temp[0] + " " + moment(irs_data.old_from).format("HH:mm:ss");
                            a = moment(a).unix();
                            var b = temp[0] + " " + moment(irs_data.old_to).format("HH:mm:ss");
                            if (b = moment(b).unix(), 0 == normal) {
                                let t = $(".js-range-slider").data("ionRangeSlider"),
                                    e = 15;
                                a = temp[0] + " " + moment(t.old_to).subtract(e, "minutes").format("HH:mm:ss"), a = moment(a).unix(), b = temp[0] + " " + moment(t.old_to).format("HH:mm:ss"), b = moment(b).unix()
                            }
                            $.ajax({
                                url: master_url_new + "/zoption-new/compare/" + index.replace(" 50", "").toUpperCase() + expiry.replaceAll("-", ""),
                                data: {
                                    start: a,
                                    end: b
                                },
                                type: 'GET',
                                headers: {
                                    "AuthorizationToken": localStorage.getItem('token').split('"').join('')
                                },
                                success: function (data, status) {

                                    if (data = eval(data), console.log("revised data"), void 0 === data) alert("Please select valid Range & Expiry");
                                    else {
                                        var strike = [],
                                            call_oi = [],
                                            put_oi = [];
                                        try {
                                            var last_arr = data[data.length - 1]
                                        } catch (t) {
                                            return void console.log("Err: " + t)
                                        }
                                        if ($("#otm_chk").prop("checked") || $("#otm_chk_mob").prop("checked")) try {
                                            for (var atm = "", i = 0; i < data.length - 1; i++) strike.push(data[i][0]), call_oi.push(data[i][1]), put_oi.push(data[i][3]), "atm" == data[i][9] && (atm = data[i][0]);
                                            for (var i = 0; i < call_oi.length; i++) i < 5 && (put_oi[i] = 0), i > 5 && (call_oi[i] = 0)
                                        } catch (t) {
                                            return void console.log("Err: " + t)
                                        } else try {
                                            for (var atm = "", i = 0; i < data.length - 1; i++) strike.push(data[i][0]), call_oi.push(data[i][1]), put_oi.push(data[i][3]), "atm" == data[i][9] && (atm = data[i][0])
                                        } catch (t) {
                                            return void console.log("Err: " + t)
                                        }

                                        update_grouped_barchart(strike, call_oi, put_oi, atm), update_donut_block(last_arr)
                                    }
                                }
                            })
                        }
                    })
                } else {
                    var strike = [],
                        call_oi = [],
                        put_oi = [];
                    try {
                        var last_arr = data[data.length - 1]
                    } catch (t) {
                        return void console.log("Err: " + t)
                    }
                    if ($("#otm_chk").prop("checked") || $("#otm_chk_mob").prop("checked")) try {
                        for (var atm = "", i = 0; i < data.length - 1; i++) strike.push(data[i][0]), call_oi.push(data[i][1]), put_oi.push(data[i][3]), "atm" == data[i][9] && (atm = data[i][0]);
                        for (var i = 0; i < call_oi.length; i++) i < 5 && (put_oi[i] = 0), i > 5 && (call_oi[i] = 0)
                    } catch (t) {
                        return void console.log("Err: " + t)
                    } else try {
                        for (var atm = "", i = 0; i < data.length - 1; i++) strike.push(data[i][0]), call_oi.push(data[i][1]), put_oi.push(data[i][3]), "atm" == data[i][9] && (atm = data[i][0])
                    } catch (t) {
                        return void console.log("Err: " + t)
                    }

                    update_grouped_barchart(strike, call_oi, put_oi, atm), update_donut_block(last_arr)
                }
            }
        }), update_column_barchart()
    }), update_grouped_barchart = ((t, e, a, o = "0") => {
        console.log(t, e, a, o), g_chart1.updateOptions({
            xaxis: {
                categories: t
            },
            annotations: {
                yaxis: [{
                    y: closest(o, t),
                    offsetX: 0,
                    offsetY: -3,
                    borderColor: "#ffffff",
                    label: {
                        style: {
                            color: "#123"
                        },
                        text: "ATM"
                    }
                }]
            }
        }), g_chart1.updateSeries([{
            name: "Call OI",
            data: e
        }, {
            name: "Put OI",
            data: a
        }])
    }), update_donut_block = (t => {
        let e = t[1],
            a = t[0];
        var o = (e / a).toFixed(2);
        $(".total_pe").text(comma(e)), $(".total_ce").text(comma(a)), $(".pcr_net").text(comma(o));
        let r = t[1] - t[3],
            n = t[0] - t[2];
        (r / n).toFixed(2);
        $(".chg_pe").text(comma(r)), $(".chg_ce").text(comma(n));
        let i = [r, n];
        chart1.updateSeries([{
            name: "OI Chg",
            data: i
        }]), chart_m1.updateSeries([{
            name: "OI Chg",
            data: i
        }]), chart2.updateSeries([e, a]), chart_m2.updateSeries([e, a]), global_chng_p = r, global_chng_c = n, update_donut_block_color()
    }), update_donut_block_color = (() => {
        try {
            global_chng_p > 0 ? $("#donutchart path:eq(0)").css("fill", "#00d3c0") : $("#donutchart path:eq(0)").css("fill", "#ff5253"), global_chng_c > 0 ? $("#donutchart path:eq(1)").css("fill", "#ff5253") : $("#donutchart path:eq(1)").css("fill", "#00d3c0"), global_chng_p > 0 ? $("#donutchart_m1 path:eq(0)").css("fill", "#00d3c0") : $("#donutchart_m1 path:eq(0)").css("fill", "#ff5253"), global_chng_c > 0 ? $("#donutchart_m1 path:eq(1)").css("fill", "#ff5253") : $("#donutchart_m1 path:eq(1)").css("fill", "#00d3c0")
        } catch (t) {
            console.log("err caught at fn:update_donut_block_color")
        }
    }), update_column_barchart = ((err = !1) => {
        if (screen.width > 575) var expiry = $("#js_me_1_res").val();
        else var expiry = $("#js_me_m1_res").val();
        var to_t = moment().unix();
        err && (to_t = moment("0925", "hhmm").unix());
        var index = global_index_current;
        $("#col_barchart_name").text(index + " Open Intrest Tracker"),
            $.ajax({
                url: master_url_new + "/zoption-new/" + index.replace(" 50", "").toUpperCase() + expiry.replaceAll("-", ""),
                data: {
                    timestamp: to_t
                },
                type: 'GET',
                headers: {
                    "AuthorizationToken": localStorage.getItem('token').split('"').join('')
                },
                success: function (data, status) {
                    var data = eval(data),
                        strike = [],
                        call_oi = [],
                        put_oi = [];
                    try {
                        var last_upd = data[0][8];
                        last_upd = moment(last_upd).format("MMM-DD HH:mm")
                    } catch (t) {
                        console.log("er_caught col-barchart:" + t)
                    }
                    for (var underlying_price = data[0][7], all_strikes = [], i = 0; i < data.length; i++) all_strikes.push(data[i][0]);
                    var closest_strike = closest(underlying_price, all_strikes),
                        closest_strike_index = all_strikes.indexOf(closest_strike);
                    if (screen.width > 575) {
                        closest_strike_index -= 7;
                        for (var i = closest_strike_index; i < closest_strike_index + 15; i++) strike.push(data[i][0]), call_oi.push(data[i][2]), put_oi.push(data[i][5])
                    } else {
                        closest_strike_index -= 5;
                        for (var i = closest_strike_index; i < closest_strike_index + 11; i++) strike.push(data[i][0]), call_oi.push(data[i][2]), put_oi.push(data[i][5])
                    }
                    var d = new Date,
                        hn = d.getHours(),
                        mn = d.getMinutes() - 1;
                    $.ajax({
                        url: master_url_new + "/current?type=servertime",
                        dataType: 'json',
                        headers: {
                            "AuthorizationToken": localStorage.getItem('token').split('"').join('')
                        },
                        success: function (t) {
                            t = t.split(":");
                            $("#c_chart_last_upd").text("Last Updated : " + t[0] + ":" + t[1]);
                        },
                    }), c_chart.updateOptions({
                        annotations: {
                            xaxis: [{
                                x: closest_strike,
                                offsetX: -1,
                                offsetY: 0,
                                borderColor: "#ffffff",
                                label: {
                                    style: {
                                        color: "#123"
                                    },
                                    orientation: "horizontal",
                                    text: "ATM"
                                }
                            }]
                        },
                        xaxis: {
                            labels: {
                                rotate: -70
                            },
                            categories: strike
                        }
                    }), c_chart.updateSeries([{
                        name: "Call OI",
                        data: call_oi
                    }, {
                        name: "Put OI",
                        data: put_oi
                    }])
                }
            })
    }), $(document).ready(function () {
        global_index_current = "NIFTY 50";
        for (var t = 0; t < working_day.length; t++) {
            let e = moment(working_day[t]).format("MMM-DD");
            $("#change_date_dsk").append('<option value="' + working_day[t] + '">' + e + "</option>"), $("#change_date_mob").append('<option value="' + working_day[t] + '">' + e + "</option>")
        }
        for (t = 0; t < final_expiry.length; t++) {
            let e = moment(final_expiry[t]).format("MMM-DD");
            $("#js_me_1_res").append('<option value="' + final_expiry[t] + '">' + e + "</option>"), $("#js_me_m1_res").append('<option value="' + final_expiry[t] + '">' + e + "</option>"), $("#oc_expiry").append('<option value="' + final_expiry[t] + '">' + e + "</option>"), $("#oc_expiry_mob").append('<option value="' + final_expiry[t] + '">' + e + "</option>")
        }
        if (screen.width < 575 && ($(".remove_mt4").removeClass("mt-4"), $(".remove_mt4").removeClass("m-1"), $(".remove_mt4").addClass("my-2")), dtime_clock()) var e = get_curr_time();
        else e = moment("1530", "hhmm").valueOf();
        $(".js-range-slider").ionRangeSlider({
            skin: "big",
            grid: !0,
            type: "double",
            min: moment("0920", "hhmm").valueOf(),
            max: moment("1530", "hhmm").valueOf(),
            from: moment("0920", "hhmm").valueOf(),
            to: moment(e, "hhmm").valueOf(),
            force_edges: !0,
            grid_num: 12,
            step: 3e5,
            min_interval: 3e5,
            onFinish: function (t) { },
            prettify: function (t) {
                return moment(t).format("HH:mm")
            }
        }), fetch_data(), screen.width < 575 && setInterval(function () {
            get_Token()
            update_donut_block_color()
        }, 2e3), $(window).scroll(function () {
            if (screen.width < 575) try {
                update_donut_block_color()
            } catch (t) {
                console.log("caught onscroll update_donut_block_color err")
            }
        })
    });
var options1 = {
    chart: {
        type: "donut",
        width: '250',
        height: '250'
    },
    responsive: [{
        breakpoint: 600,
        options: {
            chart: {
                width: '150',
                height: '150',
            },
            dataLabels: {
                offsetX: 5,
                offsetY: 0,
                style: {
                    fontSize: "10px",
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontWeight: "bold"
                }
            }
        }
    }],
    series: [50, 50],
    labels: ["Total PE OI", "Total CE OI"],
    backgroundColor: "transparent",
    pieHole: .5,
    colors: ["#00d3c0", "#ff5253"],
    pieSliceTextStyle: {
        color: "#ffffff"
    },
    sliceVisibilityThreshold: 0,
    fontSize: 17,
    chartArea: {
        top: 40
    },
    pieSliceTextStyle: {
        fontSize: 12
    },
    pieStartAngle: 50,
    isStacked: !0,
    enableInteractivity: !1,
    pieSliceBorderColor: "transparent",
    legend: {
        show: !1,
        position: "right",
        horizontalAlign: "right",
        labels: {
            colors: "#ffffff",
            useSeriesColors: !1
        },
        itemMargin: {
            horizontal: 10,
            vertical: 20
        },
        fontSize: 15,
        markers: {
            width: 12,
            height: 12,
            radius: 12
        }
    },
    stroke: {
        colors: "trasparant",
        width: 0
    },
    plotOptions: {
        pie: {
            startAngle: 0,
            endAngle: 360,
            expandOnClick: !0,
            offsetX: 0,
            offsetY: 25,
            customScale: 1.1,
            dataLabels: {
                position: "right",
                offset: 0,
                minAngleToShowLabel: 50
            },
            grid: {
                borderColor: "#000000"
            },
            donut: {
                size: "70%",
                labels: {
                    colors: "#ffffff",
                    show: !0,
                    name: {
                        color: "#ffffff",
                        fontSize: 14
                    },
                    value: {
                        color: "#ffffff",
                        fontSize: 14
                    },
                    total: {
                        color: "#ffffff"
                    }
                }
            }
        }
    }
},
    donut_bar = {
        responsive: [{
            breakpoint: 800,
            options: {
                chart: {
                    height: "auto"
                }
            }
        }],
        grid: {
            borderColor: "#2e2e2e"
        },
        colors: ["#00d3c0", "#ff5253"],
        series: [{
            name: "OI Chng",
            data: [44, -10]
        }],
        chart: {
            type: "bar",
            height: "95%",
            toolbar: {
                show: !1
            },
            foreColor: "#ffffff"
        },
        plotOptions: {
            bar: {
                horizontal: !1,
                columnWidth: "45%",
                endingShape: "rounded"
            }
        },
        dataLabels: {
            enabled: !1
        },
        stroke: {
            show: !0,
            width: 2,
            colors: ["transparent"]
        },
        xaxis: {
            categories: ["PE Chg", "CE Chg"]
        },
        yaxis: {
            title: {}
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function (t) {
                    return t
                }
            }
        }
    };
chart1 = new ApexCharts(document.querySelector("#donutchart"), donut_bar), chart1.render(),
    chart2 = new ApexCharts(document.querySelector("#donutchart1"), options1), chart2.render(),
    chart_m1 = new ApexCharts(document.querySelector("#donutchart_m1"), donut_bar), chart_m1.render(),
    chart_m2 = new ApexCharts(document.querySelector("#donutchart_m2"), options1), chart_m2.render();
var options = {
    grid: {
        borderColor: "#2e2e2e"
    },
    responsive: [{
        breakpoint: 800,
        options: {
            dataLabels: {},
            plotOptions: {
                bar: {
                    horizontal: !1,
                    columnWidth: "50%",
                    endingShape: "rounded"
                }
            }
        }
    }],
    colors: ["#ff5253", "#00d3c0"],
    legend: {
        fontSize: "16px",
        labels: {
            colors: ["#ffffff"]
        }
    },
    series: [{
        name: "Put OI",
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
    }, {
        name: "Call OI",
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
    }],
    chart: {
        toolbar: {
            show: !1
        },
        toolbar: {
            show: !0,
            tools: {
                download: !1,
                selection: !0,
                zoom: !0,
                zoomin: !0,
                zoomout: !0,
                pan: !0,
                reset: 1,
                customIcons: []
            }
        },
        foreColor: "#ffffff",
        type: "bar",
        height: 530
    },
    plotOptions: {
        bar: {
            horizontal: !1,
            columnWidth: "30%",
            endingShape: "rounded"
        }
    },
    dataLabels: {
        enabled: !1
    },
    stroke: {
        show: !0,
        width: 2,
        colors: ["transparent"]
    },
    xaxis: {
        tickPlacement: "on",
        categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
        title: {
            style: {
                fontSize: "1rem",
                fontWeight: 600,
                cssClass: "apexcharts-xaxis-title"
            }
        }
    },
    yaxis: {
        title: {
            text: "Open Intrest",
            style: {
                fontSize: "1rem",
                fontWeight: 600,
                cssClass: "apexcharts-xaxis-title"
            }
        }
    },
    fill: {
        opacity: 1
    },
    tooltip: {
        y: {
            formatter: function (t) {
                return t
            }
        }
    }
};
c_chart = new ApexCharts(document.querySelector("#column_chart"), options), c_chart.render();
var options = {
    grid: {
        show: !1
    },
    responsive: [{
        breakpoint: 800,
        options: {
            dataLabels: {
                offsetX: 40
            },
            xaxis: {
                labels: {
                    rotate: -25,
                    rotateAlways: !0
                }
            }
        }
    }],
    colors: ["#ff5253", "#00d3c0"],
    series: [{
        name: "Call OI",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }, {
        name: "Put OI",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }],
    chart: {
        events: {
            click: (event, chartContext, dataPointIndex) => {
                let temp = dataPointIndex['dataPointIndex']
                let strike = dataPointIndex['config']['xaxis']['categories'][temp];
                // console.log("strike = ", strike)

                let temp_1 = dataPointIndex['seriesIndex']
                let value_name = dataPointIndex['globals']['initialSeries'][temp_1]['data'][temp];
                // console.log("value_name = ", value_name)
                var p_c = ''
                var idx = ''

                if (temp_1 == 0) { console.log("Name = CE"); p_c = 'CALL' }
                else if (temp_1 == 1) { console.log("Name = PE"); p_c = 'PUT' }

                let exp = $("#js_me_1_res").val()
                exp = (moment(exp).format("DD MMM")).toUpperCase()

                if (global_index_current.toLowerCase() == "nifty 50") { idx = 'NIFTY' }
                else if (global_index_current.toLowerCase() == "banknifty") { idx = 'BANKNIFTY' }


                let symbol = idx + " " + exp + " " + strike + " " + p_c
                console.log(idx, exp, strike, p_c, " ", symbol)
                tw_charts(symbol)



            }
        },
        toolbar: {
            show: !1,
            tools: {
                download: !0,
                selection: !0,
                zoom: !0,
                zoomin: !0,
                zoomout: !0,
                pan: !0,
                reset: 1,
                customIcons: []
            }
        },
        foreColor: "#ffffff",
        type: "bar",
        height: "690px"
    },
    legend: {
        show: !1,
        labels: {
            colors: ["#ffffff"]
        }
    },
    plotOptions: {
        bar: {
            horizontal: !0,
            barHeight: "80%",
            dataLabels: {
                position: "top"
            }
        }
    },
    dataLabels: {
        enabled: !0,
        offsetX: 35,
        formatter: function (t, e) {
            return 0 == t ? "" : t
        },
        style: {
            fontSize: "12px",
            colors: ["#fff"]
        }
    },
    stroke: {
        show: !1,
        width: 1,
        colors: ["#ffffff"]
    },
    tooltip: {
        shared: !1,
        intersect: !0
    },
    xaxis: {
        tickPlacement: "on",
        categories: [16200, 16250, 16300, 16350, 16400, 16450, 16500, 16550, 16600, 16650, 16700],
        colors: ["#fff"],
        labels: {
            style: {
                fontSize: "14px"
            }
        }
    },
    yaxis: {
        labels: {
            formatter: function (t) {
                return Math.floor(t)
            },
            style: {
                fontSize: "14px"
            }
        }
    }
};
g_chart1 = new ApexCharts(document.querySelector("#grouped_barchart"), options), g_chart1.render();
var yummy = [
    ["15.30 EOD", "12,65,125", "-1,58,125", "35195.95", "-50.95", "-76450", "Long unwinding"]
],
    dummy = [
        ["0", "1", "2", "3", "00", "10%", "60", "0.5%", "17050", "0.5%", "60", "10%", "00", "3", "2", "1", "0"]
    ];
$.fn.dataTable.ext.errMode = "none", index_table_1 = $("#index_table_1").DataTable({
    lengthMenu: [
        [-1],
        ["All"]
    ],
    lengthChange: !1,
    bPaginate: !1,
    scrollX: !0,
    bInfo: !1,
    ordering: !1,
    language: {
        searchPlaceholder: "Search Stock"
    },
    data: yummy,
    rowCallback: function (t, e) {
        "Long Buildup" == e[6] ? $("td:eq(6)", t).attr("style", "background-color:green !important") : "Long Unwinding" == e[6] ? $("td:eq(6)", t).attr("style", "background-color:#0a0aab !important") : "Short Buildup" == e[6] ? $("td:eq(6)", t).attr("style", "background-color:red !important") : "Short Covering" == e[6] && $("td:eq(6)", t).attr("style", "background-color:#c98200 !important")
    }
}), index_table_2 = $("#index_table_2").DataTable({
    lengthMenu: [
        [-1],
        ["All"]
    ],
    ordering: !1,
    lengthChange: !1,
    bPaginate: !1,
    scrollX: !0,
    columnDefs: [{
        targets: 2,
        render: console.log("")
    }],
    bInfo: !1,
    language: {
        searchPlaceholder: "Search Stock"
    },
    data: dummy,
    rowCallback: function (t, e) {
        try {
            if (screen.width > 660) {
                var a = percentage(e[6], global_higest_call_oi),
                    o = percentage(e[10], global_higest_put_oi);
                e[8] < snap_atm && ($("td:nth-child(n):nth-last-child(n+10)", t).attr("style", "background-color:#4c4b4b !important;"), $("td:eq(6)", t).attr("style", 'background: url("./images/hz_red.png"),#4c4b4b !important; background-size: ' + a + "% 55% !important; background-repeat: no-repeat !important; background-position: left !important;"), $("td:eq(10)", t).attr("style", 'background: url("./images/hz_green.png") !important; background-size: ' + o + "% 55% !important; background-repeat: no-repeat !important; background-position: right !important;")), e[8] == snap_atm && ($(t).attr("style", "background-color:#2e2e2e !important;"), $("td:eq(6)", t).attr("style", 'background: url("./images/hz_red.png") !important; background-size: ' + a + "% 55% !important; background-repeat: no-repeat !important; background-position: left !important;"), $("td:eq(10)", t).attr("style", 'background: url("./images/hz_green.png") !important; background-size: ' + o + "% 55% !important; background-repeat: no-repeat !important; background-position: right !important;")), e[8] > snap_atm && ($("td:nth-child(n+10):nth-last-child(n)", t).attr("style", "background-color:#4c4b4b !important;"), $("td:eq(6)", t).attr("style", 'background: url("./images/hz_red.png") !important; background-size: ' + a + "% 55% !important; background-repeat: no-repeat !important; background-position: left !important;"), $("td:eq(10)", t).attr("style", 'background: url("./images/hz_green.png"),#4c4b4b !important; background-size: ' + o + "% 55% !important; background-repeat: no-repeat !important; background-position: right !important;"))
            } else {
                a = percentage(e[6], global_higest_call_oi), o = percentage(e[10], global_higest_put_oi);
                e[8] < snap_atm && ($("td:nth-child(n):nth-last-child(n+10)", t).attr("style", "background-color:#4c4b4b !important;"), $("td:eq(6)", t).attr("style", 'background: url("./images/hz_red_mob.png"),#4c4b4b !important; background-size: ' + a + "% 100% !important; background-repeat: no-repeat !important; background-position: left !important;"), $("td:eq(10)", t).attr("style", 'background: url("./images/hz_green_mob.png") !important; background-size: ' + o + "% 100% !important; background-repeat: no-repeat !important; background-position: right !important;")), e[8] == snap_atm && ($(t).attr("style", "background-color:#2e2e2e !important;"), $("td:eq(6)", t).attr("style", 'background: url("./images/hz_red_mob.png") !important; background-size: ' + a + "% 100% !important; background-repeat: no-repeat !important; background-position: left !important;"), $("td:eq(10)", t).attr("style", 'background: url("./images/hz_green.png") !important; background-size: ' + o + "% 100% !important; background-repeat: no-repeat !important; background-position: right !important;")), e[8] > snap_atm && ($("td:nth-child(n+10):nth-last-child(n)", t).attr("style", "background-color:#4c4b4b !important;"), $("td:eq(6)", t).attr("style", 'background: url("./images/hz_red_mob.png") !important; background-size: ' + a + "% 100% !important; background-repeat: no-repeat !important; background-position: left !important;"), $("td:eq(10)", t).attr("style", 'background: url("./images/hz_green_mob.png"),#4c4b4b !important; background-size: ' + o + "% 100% !important; background-repeat: no-repeat !important; background-position: right !important;"))
            }
        } catch (t) { }
    }
}), $(document).ready(function () {
    get_Token();
    check_message(), livequotei(), update_time();
    try {
        document.querySelector("#updates_btn").addEventListener("click", function () {
            chat_update_manual()
        })
    } catch (t) { }
}), setInterval(function () {
    get_Token();
    check_message()

}, 25e3), setInterval(function () {
    get_Token();
    0 != dtime_clock() && update_time()
}, 5e4), setInterval(function () {
    get_Token();
    0 != dtime_clock() && livequotei()
}, 45e3), setInterval(function () {
    get_Token();
    0 != dtime_clock() && update_column_barchart()
}, 48e3);

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


//this fn should be called on onclick event
function tw_charts(symbol) {
    setCookie('email', user, 1)
    setCookie('script', symbol, 1)
    $.post("https://tredcode.tradingcafeindia.com/dhan/get_token", function (response) {
        // redirect to the URL returned by the endpoint
        console.log(response)
        if (response == "Unauthorised") { console.log("unauth"); return }
        // window.location.href = response;
        window.open(response, "_blank")
    });
}