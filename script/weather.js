// 前処理
// エリアコード
const areaJson = fetch("https://www.jma.go.jp/bosai/common/const/area.json")
  .then((res) => {
    return res.json();
  })
  .then((json) => {
    // 階層構造明確化
    // centers -> offices -> class10s -> class15s -> class20s
    return [
      json.centers,
      json.offices,
      json.class10s,
      json.class15s,
      json.class20s,
    ];
  });
// 気象コード
const weatherCodes = fetch("./script/weatherCode.json").then((res) => {
  return res.json();
});

Promise.all([areaJson, weatherCodes]).then((val) => {
  const areaJson = val[0];
  const weatherCodes = val[1];
  // セレクトボックス設置
  // parent内のkeys要素のみ抽出
  const setSelect = function (ele, parent, keys, defaultValue = null) {
    // 内容クリア
    ele.innerHTML = "";
    for (let i = 0; i < keys.length; i++) {
      let opt = document.createElement("option");
      opt.value = keys[i];
      opt.innerText = parent[keys[i]].name;
      ele.appendChild(opt);
      if (keys[i] === defaultValue) {
        opt.selected = true;
      }
    }
  };
  // 初期設定：伊奈町
  const initArea = ["010300", "110000", "110010", "110011", "1130100"];
  let selBox = new Array(5);
  for (let i = 0; i < selBox.length; i++) {
    // 要素作成
    selBox[i] = document.createElement("select");
    // 下位セレクタ非表示
    if (i < 3) {
      document.querySelector("#weatherArea").appendChild(selBox[i]);
    }
    // option設定
    setSelect(
      selBox[i],
      areaJson[i],
      // 原則は親要素childrenを参照。centersのみ自身のkeyを参照
      i == 0
        ? Object.keys(areaJson[i])
        : areaJson[i - 1][initArea[i - 1]].children,
      initArea[i]
    );
    // イベント設定
    if (i < 4) {
      selBox[i].addEventListener("change", (e) => {
        setSelect(
          selBox[i + 1],
          areaJson[i + 1],
          areaJson[i][e.target.value].children
        );
        // 子要素も連動でイベント発火
        selBox[i + 1].dispatchEvent(new Event("change"));
      });
    } else if (i == 4) {
      // 最終要素changeでメイン処理実行
      const eventFunc = async function (areaCodes) {
        let forecast = await fetch(
          `https://www.jma.go.jp/bosai/forecast/data/forecast/${areaCodes[1]}.json`
        )
          .then((res) => {
            return res.json();
          })
          .then((json) => {
            console.log(json);
            const info = document.querySelector("#weatherInfo");
            info.innerHTML = "";
            for (
              let arias_i = 0;
              arias_i < json[0].timeSeries[0].areas.length;
              arias_i++
            ) {
              let data = json[0].timeSeries[0].areas[arias_i];
              if (data.area.code == areaCodes[2]  ) {
                info.innerHTML += `${data.area.name}<br/>
                  ${json[0].timeSeries[0].timeDefines[0]}
                  <img src="https://www.jma.go.jp/bosai/forecast/img/${
                    weatherCodes[data.weatherCodes[0]][
                      new Date().getHours() < 17 ? 0 : 1
                    ]
                  }">
                  ${data.weathers[0]}<br/>
                  ${json[0].timeSeries[0].timeDefines[1]}
                  <img src="https://www.jma.go.jp/bosai/forecast/img/${
                    weatherCodes[data.weatherCodes[1]][0]
                  }">
                  ${data.weathers[1]}<br/>
                  ${json[0].timeSeries[0].timeDefines[2]}
                  <img src="https://www.jma.go.jp/bosai/forecast/img/${
                    weatherCodes[data.weatherCodes[2]][0]
                  }">
                    ${data.weathers[2]}<br/>
                    `;
                break;
              }
            }
          });
      };
      selBox[i].addEventListener("change", (e) => {
        // メイン処理！
        eventFunc(
          selBox.map((e) => {
            return e.value;
          })
        );
      });
    }
  }
  // 初期イベント発火
  selBox[4].dispatchEvent(new Event("change"));
});

// weatherCode.json
// https://www.jma.go.jp/bosai/
// DevToolsから
// Forecast.Const.TELOPS
// 20210923取得
