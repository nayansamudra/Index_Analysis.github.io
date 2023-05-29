root = "https://apii.tradingcafeindia.com"

// Expiry API
function call_Expiry_API(script) {
  try {
    $.post(
      root + "/get_running_expiry",
      { script: script, email: "samudragupta201@gmail.com", auth: abc },
      function (data, status) {
        Expiry_data = data;
      }
    ).fail(function (response) {
      console.log('Error: ' + response);
    });
    console.log("API FUNCTION CALL");
    let x = moment.unix(Expiry_data[0][0]).format("MMM-DD");
    let y = moment.unix(Expiry_data[1][0]).format("MMM-DD");
    $("#1st_dropdown_value").attr("value", x);
    $("#2nd_dropdown_value").attr("value", y);
    $("#1st_dropdown_value").text(x + " " + Expiry_data[0][1]);
    $("#2nd_dropdown_value").text(y + " " + Expiry_data[1][1]);
    Nifty_exp_1 = moment.unix(Expiry_data[0][0]).format("DDMMM");
    Nifty_exp_2 = moment.unix(Expiry_data[1][0]).format("DDMMM");
    return [Expiry_data, Nifty_exp_1, Nifty_exp_2];
  } catch (error) {
    console.error()
  }
}

$(document).ready(function () {

  console.log = function () { };

  $.ajaxSetup({ async: false }); // to stop async

  abc = "";
  function Auth_User(auth) {
    $.post(
      root + "/auth",
      { email: auth },
      function (data, status) {
        abc = data 
      }
    ).fail(function (response) {
      console.log('Error: ' + response);
    });
  }
  Auth_User("samudragupta201@gmail.com")
  console.log("User: ", abc)

  call_Expiry_API("NIFTY 50");

  $(".js-range-slider").ionRangeSlider({
    type: "double",
    grid: true,
    min: ((9 * 60) + 20) * 60000,
    max: ((15 * 60) + 30) * 60000,
    from: ((9 * 60) + 20) * 60000, // 9:20 in milliseconds
    to: ((15 * 60) + 30) * 60000, // 15:30 in milliseconds
    force_edges: !0,
    grid_num: 12,
    step: 3e5,
    min_interval: 3e5,
    prettify: function (value) {
      // Convert milliseconds to formatted time string
      let hours = Math.floor((value / (1000 * 60 * 60)) % 24);
      let minutes = Math.floor((value / (1000 * 60)) % 60);
      return hours.toString().padStart(2, "0") + ":" + minutes.toString().padStart(2, "0");
    }
  });

  // On click Function of 3 BUTTONS [NIFTY 50, NIFTY BANK, NIFTY FIN SERVICE]
  $("#nifty_btn").click(function () {
    $('#Candlestick_title').text('Nifty 50')
    compare = 0;
    counter_for_Nifty_3min = 0;
    $("#nifty_btn").addClass("gb_active");
    $("#bnknifty_btn").removeClass("gb_active");
    $("#finnifty_btn").removeClass("gb_active");
    $("#Expiry").prop("selectedIndex", 0);

    call_Expiry_API("NIFTY 50");
  });
  $("#bnknifty_btn").click(function () {
    $('#Candlestick_title').text('Nifty Bank')
    compare = 0;
    counter_for_Nifty_3min = 0;
    $("#nifty_btn").removeClass("gb_active");
    $("#bnknifty_btn").addClass("gb_active");
    $("#finnifty_btn").removeClass("gb_active");
    $("#Expiry").prop("selectedIndex", 0);

    call_Expiry_API("NIFTY BANK");
  });
  $("#finnifty_btn").click(function () {
    $('#Candlestick_title').text('Nifty Fin Service')
    compare = 0;
    counter_for_Nifty_3min = 0;
    $("#nifty_btn").removeClass("gb_active");
    $("#bnknifty_btn").removeClass("gb_active");
    $("#finnifty_btn").addClass("gb_active");
    $("#Expiry").prop("selectedIndex", 0);

    call_Expiry_API("NIFTY FIN SERVICE");
  });
})