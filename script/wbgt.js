fetch(
  "https://script.google.com/macros/s/AKfycbzvM19FscO7DfbCeHp6-zP9_h5qDQC8WwbXjZygcXhX9hOEHki2-Mm2oA/exec?id=1F1WO_2JpdRg-0Rr6UCVNTF0mMAK5M6meGT7YA-vKago&name=WBGTさいたま"
)
  .then(function (response) {
    // データ取得
    return response.json();
  })
  .then(function (data) {
    // データ整形
    for (let i = 0; i < data.length; i++) {
      data[i] = JSON.parse(data[i]);
    }
    // WBGTは1行しかないので
    return data[0];
  })
  .then(function (data) {
    let WBGT = { wbgt: [] };
    // {id:****,
    //  update:****,
    //  wbgt: [{
    //      date:****,
    //      y:****,
    //      m:**,
    //      d:**,
    //      h:**,
    //      wbgt:**
    //     },
    //      ...]
    // }
    let i = 0;
    for (let key in data) {
      switch (key) {
        case "id":
          WBGT[key] = data[key];
          break;
        case "update":
          WBGT[key] = data[key];
          break;
        default:
          WBGT.wbgt[i] = {
            date: key,
            y: Math.floor(key / 1000000),
            m: Math.floor(key / 10000) % 100,
            d: Math.floor(key / 100) % 100,
            h: key % 100,
            wbgt: data[key] / 10,
          };
          i++;
      }
    }
    console.log(WBGT);
    return WBGT;
  })
  .then(function (data) {
    // 縦形
    let tbl = document.getElementById("WBGT予報");
    let WBGTstyle = [
      { under: 31, color: "#ff2800", title: "危険" },
      { under: 28, color: "#ff9600", title: "厳重警戒" },
      { under: 25, color: "#faf500", title: "警戒" },
      { under: 21, color: "#a0d2ff", title: "注意" },
      { under: 0, color: "#218cff", title: "ほぼ安全" },
    ];

    // ヘッダー
    let thead = document.createElement("thead");
    let tr = document.createElement("tr");
    let th = document.createElement("th");
    th.appendChild(document.createTextNode("時"));
    tr.appendChild(th);
    for (let i = 0; i <= data.wbgt.length; ) {
      let th = document.createElement("th");
      th.innerHTML =
        data.wbgt[i].m +
        "<br/>" +
        "月" +
        "<br/>" +
        data.wbgt[i].d +
        "<br/>" +
        "日";
      i = i + 8;
      tr.appendChild(th);
    }
    thead.appendChild(tr);
    tbl.appendChild(thead);

    // ボディー
    let tbody = document.createElement("tbody");
    let offset = data.wbgt[0].h / 3 - 1;
    for (let i = 0; i < 8; i++) {
      let tr = document.createElement("tr");
      for (let j = 0; j < 4; j++) {
        let td = document.createElement("td");
        let id = (j - 1) * 8 + i - offset;
        if (j == 0) {
          td.appendChild(document.createTextNode((i + 1) * 3));
        } else if (id < 0) {
          td.appendChild(document.createTextNode("-"));
        } else {
          td.appendChild(document.createTextNode(data.wbgt[id].wbgt));
          td.innerHTML =
            '<i class="far ' +
            (data.wbgt[id].wbgt >= 31
              ? "fa-dizzy"
              : data.wbgt[id].wbgt >= 28
              ? "fa-tired"
              : data.wbgt[id].wbgt >= 25
              ? "fa-grimace"
              : data.wbgt[id].wbgt >= 21
              ? "fa-frown"
              : "fa-meh") +
            '" style="font-size:1.5rem;"></i><br/><small>' +
            data.wbgt[id].wbgt +
            "</small>";
          for (let k = 0; k < WBGTstyle.length; k++) {
            if (data.wbgt[id].wbgt >= WBGTstyle[k].under) {
              td.style.background = WBGTstyle[k].color;
              td.setAttribute("data-bs-toggle", "tooltip");
              td.setAttribute("title", WBGTstyle[k].title);
              break;
            }
          }
        }
        tr.appendChild(td);
      }
      thead.appendChild(tr);
    }
    tbl.appendChild(tbody);
    tbl.classList.remove("d-none");
    document.getElementById("WBGT予報spinner").classList.add("d-none");
  })
  .then(function () {
    let tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  });
