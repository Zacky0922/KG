

function setBusTime(json, m = null, d = null) {
    // 繰返し行処理
    for (let i = 1; i < json.length; i++) {
        for (let j in json[i]) {
            if (json[i][j] == "〃") {
                json[i][j] = json[i - 1][j];
            }
        }
    }
    if (m == null || d == null) {
        let today = new Date();
        m = today.getMonth() + 1;
        d = today.getDate();
    }
    import('https://zacky0922.github.io/z-jscss/z.js').then((z) => {

        // 初期化
        let ele = document.getElementById("busTime");
        ele.innerHTML = "";
        ele.classList.add("js-scrollable");
        // 該当日の行を検索
        let i = 0;
        for (; i < json.length; i++) {
            if (json[i].month == m &&
                json[i].day == d) {
                break;
            }
        }
        // 表示内容設定
        let tblArr = [
            [(m + "月" + d + "日(" + json[i].yobi + ")"), "上尾", "蓮田"],
            ["朝：駅発", json[i].ageo0, json[i].hasuda0],
            ["帰：学校発", json[i].ageo1, json[i].hasuda1]
        ];
        let tbl = z.zTable.array2table(tblArr, { "row": true, "col": true });
        tbl.classList.add("table", "table-bordered", "border-secondary", "text-nowrap");
        document.getElementById("busTime").appendChild(tbl);

        new ScrollHint('.js-scrollable', {
            "suggestiveShadow": true,
            "i18n": {
                "scrollable": 'スクロールできます'
            }
        });
    });


}
window.addEventListener("load", function () {
    $.ajax({
        "type": "GET", "async": true,
        "url": "https://script.google.com/macros/s/AKfycbygYn92oqaOVmzjdtv9Tug4jGebaOq9oYW6mKIM2Foiasqbd_hTJdVnuw/exec"
    }).then(
        // 通信success
        data => {
            console.log("Ajax通信success - schoolbus");
            console.log(data);
            // 時刻表処理
            setBusTime(data.time);
        },
        // 通信error
        error => {
            console.log("Ajax通信error - schoolbus");
            console.log(error);
        }
    );
});