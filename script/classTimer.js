// 項目名,h,m
//
let timetbl = {
  "平常": [
    ["-", 0, 0],
    ["SHR", 8, 40],
    ["1限", 8, 55],
    ["1限終わり", 9, 45],
    ["2限", 9, 55],
    ["2限終わり", 10, 45],
    ["3限", 10, 55],
    ["3限終わり", 11, 45],
    ["4限", 11, 55],
    ["4限終わり", 12, 45],
    ["5限", 13, 30],
    ["5限終わり", 14, 20],
    ["6限", 14, 30],
    ["6限終わり", 15, 20],
    ["7限", 15, 30],
    ["7限終わり", 16, 20],
    ["完全下校", 19, 00],
    ["閉門", 20, 00],
  ],
  "40分短縮": [
    ["--", 0, 0],
    ["SHR", 8, 45],
    ["1限開始", 9, 00],
    ["1限終わり", 9, 40],
    ["2限開始", 9, 50],
    ["2限終わり", 10, 30],
    ["3限開始", 10, 40],
    ["3限終わり", 11, 20],
    ["4限開始", 11, 30],
    ["4限終わり", 12, 10],
    ["5限開始", 13, 00],
    ["5限終わり", 13, 40],
    ["6限開始", 13, 50],
    ["6限終わり", 14, 30],
    ["7限開始", 14, 40],
    ["7限終わり", 15, 20],
    ["完全下校", 18, 00],
    ["閉門", 20, 00],
  ],
  "前期末40分短縮": [
    ["--", 0, 0],
    ["SHR", 8, 40],
    ["1限開始", 8, 55],
    ["1限終わり", 9, 35],
    ["2限開始", 9, 45],
    ["2限終わり", 10, 25],
    ["3限開始", 10, 35],
    ["3限終わり", 11, 15],
    ["4限開始", 11, 25],
    ["4限終わり", 12, 05],
    ["5限開始", 12, 50],
    ["5限終わり", 13, 30],
    ["6限開始", 13, 40],
    ["6限終わり", 14, 20],
    ["7限開始", 14, 30],
    ["7限終わり", 15, 10],
    ["完全下校", 19, 00],
    ["閉門", 20, 30],
  ],
}["平常"];
setInterval(function () {
  let now = new Date();
  let time = new Date();
  let time0;
  for (let i = 0; i < timetbl.length; i++) {
    time.setHours(timetbl[i][1], timetbl[i][2], 0, 0);
    if (now > time) {
      time0 = new Date(time);
      if (i == timetbl.length - 1) {
        document.getElementById("授業タイマー見出し").innerHTML = "";
        document
          .getElementById("授業タイマー")
          .setAttribute("style", "width:0;");
        document
          .getElementById("授業タイマー")
          .setAttribute("aria-valuenow", "0");
        break;
      }
      continue;
    } else {
      document.getElementById("授業タイマー見出し").innerHTML =
        timetbl[i][0] +
        "(" +
        timetbl[i][1] +
        ":" +
        ("0" + timetbl[i][2]).slice(-2) +
        ")まで、あと" +
        Math.floor((time.getTime() - now.getTime()) / 1000 / 60) +
        "分";
      let p =
        ((now.getTime() - time0.getTime()) /
          (time.getTime() - time0.getTime())) *
        100;
      document
        .getElementById("授業タイマー")
        .setAttribute("style", "width:" + p + "%;");
      document.getElementById("授業タイマー").setAttribute("aria-valuenow", p);
      break;
    }
  }
}, 1000);

function getTimeList() {
  let tx = "";
  for (let i = 0; i < timetbl.length; i++) {
    tx +=
      timetbl[i][0] +
      "　" +
      timetbl[i][1] +
      ":" +
      ("0" + timetbl[i][2]).slice(-2) +
      "\n";
  }
  alert(tx);
}
