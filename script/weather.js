// API from https://weather.tsukumijima.net/
$.getJSON(
  "https://weather.tsukumijima.net/api/forecast/city/110010",
  (data) => {
    //sample
    // console.log(`id=${data.id}, name=${data.name}, email=${data.email}`);

    // 詳細モーダル設定
    let m = document.getElementById("WeatherForecastDetail");
    m.children[0].children[0].children[0].children[0].innerHTML = data.title;
    m.children[0].children[0].children[1].innerText =
      data.description.text +
      "\n\n気象庁予報発表日時：" +
      data.description.publicTime_format;
    m.children[0].children[0].children[1].innerHTML +=
      "<p class='text-right'>" +
      '<a href="' +
      data.link +
      '">[気象庁詳細ページ]</a>' +
      "</p>";

    // 3日間予報
    let weekday = "日,月,火,水,木,金,土".split(",");

    document.getElementById("WeatherForecast1").innerHTML =
      data.location.area +
      " " +
      data.location.prefecture +
      " " +
      data.location.city +
      "<br>" +
      data.publicTime_format +
      "発表";

    for (let i = 0; i < 3; i++) {
      // 表示日の日付処理
      let date = data.forecasts[i].date.split("-");
      date = new Date(date[0], date[1] - 1, date[2]);
      // 表示設定
      document.getElementById("WeatherForecast2").innerHTML +=
        "" +
        (i == 0
          ? '<div class="col-12 col-md-4 col-xl-12">'
          : '<div class="col-12 col-sm-6 col-md-4 col-xl-12">') +
        '<div class="card h-100">' +
        '<div class="card-header text-center">' +
        data.forecasts[i].dateLabel +
        " " +
        date.getDate() +
        "日(" +
        weekday[date.getDay()] +
        ")" +
        "</div>" +
        '<div class="card-body">' +
        '<div class="row mb-2">' +
        (i == 0
          ? '<div class="text-center align-self-center" style="width:' +
            data.forecasts[i].image.width +
            'px;">'
          : '<div class="col-12 text-center align-self-center">') +
        '<img src="' +
        data.forecasts[i].image.url +
        '"' +
        'width="' +
        data.forecasts[i].image.width +
        '" ' +
        'height="' +
        data.forecasts[i].image.height +
        '" />' +
        "</div>" +
        '<div class="col text-center align-self-center">' +
        (data.forecasts[i].telop == null ? "未配信" : data.forecasts[i].telop) +
        // 明後日の最低・最高気温は取得できない
        (data.forecasts[i].temperature.max == null
          ? ""
          : "<br/>" +
            data.forecasts[i].temperature.max.celsius +
            // 今日の最低気温は取得できない
            (data.forecasts[i].temperature.min == null
              ? ""
              : "／" + data.forecasts[i].temperature.min.celsius) +
            "℃") +
        "</div>" +
        "</div>" +
        // 明後日の降水確率は取得できない
        (i == 2
          ? ""
          : '<ul class="list-group card-text">' +
            '<li class="list-group-item text-center">降水確率</li>' +
            '<li class="list-group-item d-flex justify-content-between">' +
            "<span>00-06</span>" +
            "<span>" +
            data.forecasts[i].chanceOfRain["00-06"] +
            "</span>" +
            "</li>" +
            '<li class="list-group-item d-flex justify-content-between">' +
            "<span>06-12</span>" +
            "<span>" +
            data.forecasts[i].chanceOfRain["06-12"] +
            "</span>" +
            "</li>" +
            '<li class="list-group-item d-flex justify-content-between">' +
            "<span>12-18</span>" +
            "<span>" +
            data.forecasts[i].chanceOfRain["12-18"] +
            "</span>" +
            "</li>" +
            '<li class="list-group-item d-flex justify-content-between">' +
            "<span>18-24</span>" +
            "<span>" +
            data.forecasts[i].chanceOfRain["18-24"] +
            "</span>" +
            "</li>" +
            "</ul>") +
        "</div>" +
        "</div>" +
        "</div>";
    }
  }
);
