(function () {
  fetch("https://www.jma.go.jp/bosai/common/const/area.json")
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      console.log(json);
      // select表示
      const selectBox = new Array(5);
      for (let i = 0; i < selectBox.length; i++) {
        selectBox[i] = document.createElement("select");
        document.querySelector("#weatherArea").appendChild(selectBox[i]);
        if (i >= 2) {
          selectBox[i].style.display = "none";
        }
      }
      // selectリスト設定
      const setSelect = function (lv, code) {
        // エリアセレクタ
        // centers -> offices -> class10s -> class15s -> class20s
        let list = new Array(
          json.centers,
          json.offices,
          json.class10s,
          json.class15s,
          json.class20s
        );
        // 対応レベルのoption設定
        selectBox[lv].innerHTML = "";
        if (lv == 0) {
          let id = Object.keys(list[0]);
          for (let i = 0; i < id.length; i++) {
            let opt = document.createElement("option");
            opt.value = id[i];
            opt.innerText = list[0][id[i]].name;
            selectBox[lv].appendChild(opt);
          }
        } else {
          for (let i = 0; i < list[lv - 1][code].children.length; i++) {
            let id = list[lv - 1][code].children[i];
            let opt = document.createElement("option");
            opt.value = id;
            opt.innerText = list[lv][id].name;
            selectBox[lv].appendChild(opt);
          }
        }
      };
      // エリア決定時の処理
      const getWeather = function (codes) {
        return fetch(
          `https://www.jma.go.jp/bosai/forecast/data/forecast/${codes[1]}.json`
        ).then((res) => {
          return res.json();
        });
      };

      // 初期設定：伊奈町
      let initArea = ["010300", "110000", "110010", "110011", "1130100"];
      for (let i = 0; i < initArea.length; i++) {
        // リスト設定
        setSelect(i, i == 0 ? 0 : initArea[i - 1]);
        // 初期値設定
        selectBox[i].value = initArea[i];
        // イベント設定
        selectBox[i].addEventListener("change", (e) => {
          let code = e.target.value;
          let codes = [
            selectBox[0].value,
            selectBox[1].value,
            selectBox[2].value,
            selectBox[3].value,
            selectBox[4].value,
          ];
          switch (i) {
            case 0:
              // 選択値リスト、新リスト作成、新リスト[0]抽出、とりあえず値設定
              codes[0] = code;
              setSelect(1, code);
              code = json.centers[selectBox[0].value].children[0];
              selectBox[1].value = code;
            case 1:
              codes[1] = code;
              setSelect(2, code);
              code = json.offices[selectBox[1].value].children[0];
              selectBox[2].value = code;
            case 2:
              codes[2] = code;
              setSelect(3, code);
              code = json.class10s[selectBox[2].value].children[0];
              selectBox[3].value = code;
            case 3:
              codes[3] = code;
              setSelect(4, code);
              code = json.class15s[selectBox[3].value].children[0];
              selectBox[4].value = code;
            case 4:
              codes[4] = code;
              // 最終項目確定時の処理
              getWeather(codes).then((json) => {
                console.log(json);
                const info = document.querySelector("#weatherInfo");
                info.innerHTML = "";
                for (let i = 0; i < json[0].timeSeries[2].areas.length; i++) {
                  let area = json[0].timeSeries[2].areas[i];
                  info.innerHTML += `${area.area.name}<br/>
                  <span class="tempMin">${area.temps[0]}</span> / 
                  <span class="tempMax">${area.temps[1]}</span>
                  <br/>`;
                }
              });
          }
        });
      }
      return;
    });
})();
