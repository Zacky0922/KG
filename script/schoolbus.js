function setBusRow(tbody, th_tx, td_tx = null) {
  let tr0 = document.createElement("tr");
  let th = document.createElement("th");
  th.innerText = th_tx;
  tr0.appendChild(th);
  tbody.appendChild(tr0);
  if (td_tx != null) {
    let tr1 = document.createElement("tr");
    let td = document.createElement("td");
    td.innerText = td_tx;
    tr1.appendChild(td);
    tbody.appendChild(tr1);
  }
}
function fixBusTime(time) {
  for (let i = 1; i < time.length; i++) {
    for (let j in time[i]) {
      if (time[i][j] == "〃") {
        time[i][j] = time[i - 1][j];
      }
    }
  }
  return time;
}
$.ajax({
  type: "GET",
  async: true,
  url: "https://script.google.com/macros/s/AKfycbygYn92oqaOVmzjdtv9Tug4jGebaOq9oYW6mKIM2Foiasqbd_hTJdVnuw/exec",
  // exec or dev
}).then(
  // 通信success
  (data) => {
    console.log("Ajax通信success");
    console.log(data);
    let timeTbl = data.time;
    timeTbl = fixBusTime(timeTbl);
    // let passTbl = data.pass;
    // 時刻表処理
    let tbl = document.getElementById("schoolBusTbl");
    tbl.innerHTML = ""; // 初期化
    let tbody = document.createElement("tbody");
    // 今日の日付行取得
    let d = 0;
    let today = new Date();
    for (; d < timeTbl.length; d++) {
      if (
        timeTbl[d].month == today.getMonth() + 1 &&
        timeTbl[d].day == today.getDate()
      ) {
        setBusRow(
          tbody,
          timeTbl[d].month +
            "月" +
            timeTbl[d].day +
            "日(" +
            timeTbl[d].yobi +
            ")",
          timeTbl[d].remark
        );
        setBusRow(tbody, timeTbl[0].ageo0, timeTbl[d].ageo0);
        setBusRow(tbody, timeTbl[0].hasuda0, timeTbl[d].hasuda0);
        setBusRow(tbody, timeTbl[0].ageo1, timeTbl[d].ageo1);
        setBusRow(tbody, timeTbl[0].hasuda1, timeTbl[d].hasuda1);
        break;
      }
    }
    tbl.appendChild(tbody);
  },
  // 通信error
  (error) => {
    console.log("Ajax通信error");
    console.log(error);
  }
);
