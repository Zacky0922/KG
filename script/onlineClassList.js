// 日付欄初期値設定
let dateSelector = document.querySelector("#授業検索 > .日付");
dateSelector.value = (function () {
  let today = new Date();
  return `${today.getFullYear()}-${today.getMonth() + 1 < 10 ? "0" : ""}${
    today.getMonth() + 1
  }-${today.getDate() < 10 ? "0" : ""}${today.getDate()}`;
})();
// 時間帯検索
let timeSelector = document.querySelector("#授業検索 .時間");
let timeZone = [
  {
    i: 0,
    start: [0, 00],
    end: [8, 59],
    val: "早朝～ホームルーム",
  },
  { i: 1, start: [9, 00], end: [9, 39], val: "1限" },
  { i: 2, start: [9, 40], end: [10, 29], val: "2限" },
  { i: 3, start: [10, 30], end: [11, 19], val: "3限" },
  { i: 4, start: [11, 20], end: [12, 9], val: "4限" },
  { i: 5, start: [12, 10], end: [13, 39], val: "5限" },
  { i: 6, start: [13, 40], end: [14, 29], val: "6限" },
  {
    i: 7,
    start: [14, 30],
    end: [23, 59],
    val: "7限～",
  },
];
timeSelector.innerHTML += `<option value="-1">全日表示</option>`;
for (let i = 0; i < timeZone.length; i++) {
  timeSelector.innerHTML += `<option value="${timeZone[i].i}">
                              ${timeZone[i].val}
                              (開始予定時刻 ${timeZone[i].start[0]}:${
    timeZone[i].start[1] < 10 ? "0" : ""
  }${timeZone[i].start[1]}
                              ～
                              ${timeZone[i].end[0]}:${
    timeZone[i].end[1] < 10 ? "0" : ""
  }${timeZone[i].end[1]})
                              </option>`;
}

// 教科セレクタ
let subSelector = document.querySelector("#授業検索 .教科");
let subList = [
  {
    i: 0,
    sub: "国語",
    words: ["国語", "現代文", "現文", "古典", "古文"],
  },
  { i: 1, sub: "数学", words: ["数学"] },
  {
    i: 2,
    sub: "地歴公民",
    words: ["地理", "歴", "史", "倫理", "政治", "現代社会", "現社"],
  },
  {
    i: 3,
    sub: "理科",
    words: ["物理", "化学", "地学", "生物"],
  },
  {
    i: 4,
    sub: "英語",
    words: ["英語", "英", "English", "ENGLISH"],
  },
  {
    i: 5,
    sub: "保健体育",
    words: ["保健", "体育", "保", "体"],
  },
  { i: 6, sub: "芸術", words: ["音", "美", "書"] },
//   {
//     i: 7,
//     sub: "その他（検索に引っかからなかったものを含む）",
//   },
];
subSelector.innerHTML += `<option value="-1">全表示</option>`;
for (let i = 0; i < subList.length; i++) {
  subSelector.innerHTML += `<option value="${subList[i].i}">${subList[i].sub}</option>`;
}
let myList = fetch(
  "https://script.google.com/macros/s/AKfycbzvM19FscO7DfbCeHp6-zP9_h5qDQC8WwbXjZygcXhX9hOEHki2-Mm2oA/exec" +
    "?id=1FOnmofRExJbQ36pTaOw3_WQRHZW7LTqI4y6sA3Gwbag" +
    "&name=授業リスト"
)
  .then((data) => {
    return data.json();
  })
  .then((data) => {
    // データ整形
    for (let i = 0; i < data.length; i++) {
      data[i] = JSON.parse(data[i]);
    }
    return data;
  })
  .then((json) => {
    // 時間調整
    for (let i = 0; i < json.length; i++) {
      let tx = json[i].start;
      let date = new Date(
        tx.substr(0, 4),
        tx.substr(5, 2) - 1,
        tx.substr(8, 2),
        // 時差対応
        Number(tx.substr(11, 2)) + 9,
        tx.substr(14, 2)
      );
      json[i].date = date;
    }

    return json;
  });
function classSearch() {
  myList.then((json) => {
    // 検索・抽出
    let disp = [];
    for (let i = 0; i < json.length; i++) {
      // let flag = false;
      // キャンセル済みは除外
      if (json[i].title.indexOf("Canceled:") > -1) {
        continue;
      }
      // 日付一致
      if (
        dateSelector.value.substr(0, 4) == json[i].date.getFullYear() &&
        dateSelector.value.substr(5, 2) == json[i].date.getMonth() + 1 &&
        dateSelector.value.substr(8, 2) == json[i].date.getDate()
      ) {
      } else {
        continue;
      }
      // 時間一致
      if (timeSelector.value >= 0) {
        let span = {
          start: new Date(
            json[i].date.getFullYear(),
            json[i].date.getMonth(),
            json[i].date.getDate(),
            timeZone[timeSelector.value].start[0],
            timeZone[timeSelector.value].start[1]
          ),
          end: new Date(
            json[i].date.getFullYear(),
            json[i].date.getMonth(),
            json[i].date.getDate(),
            timeZone[timeSelector.value].end[0],
            timeZone[timeSelector.value].end[1]
          ),
        };
        if (
          span.start.getTime() <= json[i].date.getTime() &&
          json[i].date.getTime() <= span.end.getTime()
        ) {
        } else {
          continue;
        }
      }
      // 教科一致
      if (subSelector.value >= 0) {
        let flag = false;
        for (let j = 0; j < subList[subSelector.value].words.length; j++) {
          if (json[i].title.indexOf(subList[subSelector.value].words[j]) > -1) {
            flag = true;
            break;
          }
        }
        if (!flag) {
          continue;
        }
      }

      disp.push(json[i]);
    }

    // 表示
    let ele = document.querySelector("#授業リスト");
    ele.innerHTML = ""; // clear
    let tbl = document.createElement("table");
    tbl.classList.add("table", "table-striped");
    tbl.innerHTML = `<thead class="text-center">
                            <th>日時</th>
                            <th>タイトル</th>
                            <th>参加</th>
                            <thead>`;
    let tbody = "";
    let day = ["日", "月", "火", "水", "木", "金", "土"];
    for (let i = 0; i < disp.length; i++) {
      // 会議リンク抽出
      let div = document.createElement("div");
      div.innerHTML = disp[i].memo;
      // 行生成
      tbody += `<tr>
                              <td>${disp[i].date.getDate()}日(${
        day[disp[i].date.getDay()]
      })
                              ${disp[i].date.getHours()}:${
        disp[i].date.getMinutes() < 10 ? "0" : ""
      }${disp[i].date.getMinutes()}
                              </td>
                              <td>${disp[i].title}</td>
                              <td class="d-none">${disp[i].team}</td>
                              <td class="d-none">${disp[i].teacher}</td>
                              <td class="text-center"><a class="btn btn-primary btn-sm" href="${
                                div.querySelector(".me-email-headline").href
                              }" target="_blank">参加</a></td>
                              </tr>`;
    }
    tbl.innerHTML += `<tbody>${tbody}</tbody>`;
    ele.appendChild(tbl);
  });
}

let formEle = document.querySelectorAll("#授業検索 *");
for (let i = 0; i < formEle.length; i++) {
  formEle[i].addEventListener("change", classSearch);
}
