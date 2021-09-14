function addCOVID19tbl(title, content) {
  document.getElementById("COVID19infoTbl").children[2].innerHTML +=
    "<tr><th>" +
    title +
    "</th><td class='text-center'>" +
    content +
    "</td></tr>";
}
$.getJSON("https://data.covid19japan.com/summary/latest.json", (data) => {
  // 昨日基準で処理：今日のデータはまだない可能性がある
  let yesterday = new Date();
  yesterday = new Date(
    yesterday.getFullYear(),
    yesterday.getMonth(),
    yesterday.getDate() - 1
  );
  let youbi = "日,月,火,水,木,金,土".split(",");

  // thead
  document.getElementById("COVID19infoTbl").children[0].innerHTML +=
    "" +
    "<tr><td colspan='2' class='text-center'>" +
    yesterday.getFullYear() +
    "/" +
    (yesterday.getMonth() + 1) +
    "/" +
    yesterday.getDate() +
    "(" +
    youbi[yesterday.getDay()] +
    ")の陽性者数" +
    "</td></tr>";

  // tfoot
  let tfootTx = data.updated;
  tfootTx = tfootTx.replace("T", "(").replace("+09:00", "JST)");
  document.getElementById("COVID19infoTbl").children[1].innerHTML +=
    "" +
    "<tr><td colspan='2' class='text-right'>Update：" +
    tfootTx +
    "</td></tr>";
  for (let key in data.prefectures[4]) {
    //addCOVID19tbl(key, data.prefectures[4][key]);
  }

  // 特定抽出市町村（表示名、検索文字列）・・・患者データの分析が必要かも
  let city = [
    { 伊奈町: ["Ina"] },
    { 上尾市: ["Ageo"] },
    {
      さいたま市: ["Saitama", "Saitama city", "Saitama City"],
    },
  ];

  // 都道府県別データ取得
  let tbl = { 陽性者: { 埼玉県: 0, 東京都: 0, 全国: 0 } };
  for (let pref in data.prefectures) {
    // 陽性者記録開始日取得
    let ConfirmedStartDate =
      data.prefectures[pref].dailyConfirmedStartDate.split("-");
    ConfirmedStartDate = new Date(
      Number(ConfirmedStartDate[0]),
      Number(ConfirmedStartDate[1]) - 1,
      Number(ConfirmedStartDate[2])
    );
    // 処理対象日のデータ配列番号取得
    let i =
      (yesterday.getTime() - ConfirmedStartDate.getTime()) /
      (1000 * 60 * 60 * 24);
    switch (data.prefectures[pref].name_ja) {
      case "埼玉県":
        tbl["陽性者"]["埼玉県"] = data.prefectures[pref].dailyConfirmedCount[i];
        break;
      case "東京都":
        tbl["陽性者"]["東京都"] = data.prefectures[pref].dailyConfirmedCount[i];
        break;
      default:
        break;
    }
    tbl["陽性者"]["全国"] += data.prefectures[pref].dailyConfirmedCount[i];
  }
  // table生成
  addCOVID19tbl("埼玉県", tbl["陽性者"]["埼玉県"]);
  addCOVID19tbl("東京都", tbl["陽性者"]["東京都"]);
  addCOVID19tbl("全国", tbl["陽性者"]["全国"]);
});
