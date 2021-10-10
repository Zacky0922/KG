export class JMA {
  // ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
  // UI設定
  // ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
  // 地域セレクタ
  selBox = new Array(5);

  // ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
  // 設定変数
  // ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
  // DB処理
  areaJsons; // エリアコード一覧
  weatherCodes; // 気象コード一覧
  // 処理中の地域(areaJsons[lv=1]準拠)の気象データjson
  areaWeather; // 全json
  areaWeatherFiltered; // lv=2絞込み済みjson
  #weatherAreaCode = null; // areaCode[lv=2]
  // 地域選択レベル
  #areaLv = 3;
  // メインイベント
  f = function () {};

  // ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
  // コンストラクタ
  // ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
  constructor() {}

  // ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
  // 初期化処理
  // 必ずawaitで呼び出すこと！
  // ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
  async init() {
    // 並列でjson取得
    // https://ja.javascript.info/promise-api
    await Promise.all([
      fetch("https://www.jma.go.jp/bosai/common/const/area.json"),
      fetch("./script/weatherCode.json"),
    ])
      .then((res) => {
        return Promise.all(res.map((res) => res.json()));
      })
      .then((jsons) => {
        // 地域コード取得
        // 階層構造明確化
        this.areaJsons = [
          jsons[0].centers,
          jsons[0].offices,
          jsons[0].class10s,
          jsons[0].class15s,
          jsons[0].class20s,
        ];
        console.log(this.areaJsons);

        // 気象コード
        // weatherCode.json
        // https://www.jma.go.jp/bosai/
        // DevToolsから
        // Forecast.Const.TELOPS
        // 20210923取得
        this.weatherCodes = jsons[1];
        console.log(this.weatherCodes);
      });
  }

  // ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
  // 地域セレクタフォーム設置
  // ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
  setSelectboxes(
    ele,
    // 初期値：伊奈町
    initArea = ["010300", "110000", "110010", "110011", "1130100"]
  ) {
    for (let i = 0; i < this.selBox.length; i++) {
      // 要素作成
      this.selBox[i] = document.createElement("select");
      // 表示レベル設定
      if (i >= this.#areaLv) {
        this.selBox[i].style.display = "none";
      }
      ele.appendChild(this.selBox[i]);

      // 初期オプション生成
      this.#setSelectboxOptions(i, initArea[i == 0 ? 0 : i - 1], initArea[i]);

      // イベントリスナー
      this.selBox[i].addEventListener("change", (e) => {
        switch (i) {
          case 4:
            // 最終要素変更時（子要素がない時）のメイン処理
            this.f();
            this.setWeather(document.querySelector("#weatherInfo"));
            break;
          default:
            // 子要素設定・連動発火
            this.#setSelectboxOptions(i + 1, e.target.value);
            this.selBox[i + 1].dispatchEvent(new Event("change"));
        }
      });
    }
  }

  // 地域セレクタoption設定
  #setSelectboxOptions(lv, parentKey = null, defaultValue = null) {
    // 内容クリア
    this.selBox[lv].innerHTML = "";
    //
    let json = this.areaJsons[lv];
    let keys =
      lv == 0 ? Object.keys(json) : this.areaJsons[lv - 1][parentKey].children;
    for (let i = 0; i < keys.length; i++) {
      let opt = document.createElement("option");
      opt.value = keys[i];
      // opt.innerText = json[keys[i]].name;
      opt.innerText = json[keys[i]].name + `(${keys[i]})`;
      this.selBox[lv].appendChild(opt);
      if (keys[i] === defaultValue) {
        opt.selected = true;
      }
    }
  }

  // ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
  // 気象情報取得
  // ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
  async getWeather(areaCodes) {
    // 現在と違うエリア[lv=1]だけfetchしたい
    await new Promise((resolve, reject) => {
      // lv=1の変更有無を確認
      if (this.#weatherAreaCode == areaCodes[1]) {
        // 新たにfetchする必要なし
        reject();
      } else {
        // 新たにfetchする必要あり
        resolve();
      }
    })
      .then(() => {
        return fetch(
          `https://www.jma.go.jp/bosai/forecast/data/forecast/${areaCodes[1]}.json`
        );
      })
      .then((res) => {
        console.log(`GET ${areaCodes[1]}.json`);
        return res.json();
      })
      .then((json) => {
        console.log(json);
        this.areaWeather = json;
        this.#weatherAreaCode = areaCodes[1];
      })
      .catch(() => {
        console.log("新規fetchせず、フィルタのみ実行");
      });
      // フィルタ処理
      await this.getWeatherFilter(areaCodes);
  }
  async getWeatherFilter(areaCodes) {
    // ディープコピーで元jsonを保護
    let json = JSON.parse(JSON.stringify(this.areaWeather));
    // 指定地域(areaJson[lv=2]準拠)抽出
    for (let i = json[0].timeSeries[0].areas.length - 1; i >= 0; i--) {
      if (json[0].timeSeries[0].areas[i].area.code == areaCodes[2]) {
        // 3日間予報から地域抽出
        json[0].timeSeries[0].areas = json[0].timeSeries[0].areas[i];
        // 天気・降水確率
        json[0].timeSeries[1].areas = json[0].timeSeries[1].areas[i];
        break;
      }
    }
    // 拠点気温：未実装
    // なんで基本はJMA独自？コードなのに、拠点気温だけ地方公共団体コードなんだろう…
    // 処理変数保存
    this.areaWeatherFiltered = json;
    console.log(json);
  }
  // ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
  // 基本イベント
  // ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
  async setWeather(ele) {
    // 気象情報取得
    await this.getWeather(this.selBox.map((x) => x.value));
    // 表示設定
    let weather = this.areaWeatherFiltered[0].timeSeries[0];
    let rain = this.areaWeatherFiltered[0].timeSeries[1].areas;
    let wday = ["日", "月", "火", "水", "木", "金", "土"];
    // 表示
    ele.innerHTML = weather.areas.area.name;
    for (let i = 0; i < weather.areas.weathers.length; i++) {
      // 時間フォーマット
      let d = new Date(weather.timeDefines[i]);
      // 表示
      ele.innerHTML += `<div>
        ${d.getMonth() + 1}/${d.getDate()}(${wday[d.getDay()]})
        <br/>
        <img src="https://www.jma.go.jp/bosai/forecast/img/${
          this.weatherCodes[weather.areas.weatherCodes[i]][0]
        }">
        <br/>
        ${weather.areas.weathers[i]}
        </div>`;
    }
  }
}
