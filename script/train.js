let trainList = [
  { name: "ニューシャトル", line: ["ニューシャトル"] },
  {
    name: "最寄りJR線<br/>(高/宇/SS/UT)",
    line: "宇都宮,高崎,湘南新宿,上野東京".split(","),
  },
  {
    name: "近隣JR<br/>(京浜,埼京,川越)",
    line: "京浜東北,埼京,川越".split(","),
  },
  {
    name: "東武線<br/>(STL/UPL)",
    line: "アーバンパーク,スカイツリー,野田,伊勢崎線".split(","),
  },
];
let tbody = document.getElementById("TrainInfo");
$.getJSON("https://tetsudo.rti-giken.jp/free/delay.json", (data) => {
  let tbody = document.getElementById("TrainInfo").children[2];
  for (let i = 0; i < trainList.length; i++) {
    let html = "<tr><th>" + trainList[i].name + "</th><td>";
    let delayFlag = false;
    for (let j = 0; j < trainList[i].line.length; j++) {
      for (let k in data) {
        if (data[k]["name"].indexOf(trainList[i].line[j]) > -1) {
          html += (delayFlag ? "<br/>" : "") + data[k].name;
          delayFlag = true;
        }
      }
    }
    tbody.innerHTML += html + (delayFlag ? "" : "-") + "</td></tr>";
  }
  // 全運行情報（UNIXタイム＝1970/1/1からの秒数なので注意）
  let update = 0;
  for (let k in data) {
    document.getElementById("TrainModalText").innerHTML +=
      data[k].name +
      "／" +
      data[k].company +
      " (" +
      new Date(data[k].lastupdate_gmt * 1000).toLocaleTimeString() +
      ")<br/>";
    update = update < data[k].lastupdate_gmt ? data[k].lastupdate_gmt : update;
  }
  update = new Date(update * 1000);
  document.getElementById(
    "TrainInfo"
  ).children[1].children[0].children[0].innerHTML =
    "Update：" +
    update.getFullYear() +
    "/" +
    (update.getMonth() + 1) +
    "/" +
    update.getDate() +
    " " +
    update.getHours() +
    ":" +
    update.getMinutes();
});
