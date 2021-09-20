(function () {
  let wrap = document.querySelector("#weatherInfo");
  // エリアセレクタ
  // centers -> offices -> class10s -> class15s -> class20s
  const area = wrap.querySelectorAll(".weatherInfo_select");

  fetch("https://www.jma.go.jp/bosai/common/const/area.json")
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      console.log(json);

      const setSelect = function (lv, code) {
        let list = new Array(
          Object.keys(json.centers),
          json.centers,
          json.offices,
          json.class10s,
          json.class15s,
          json.class20s
        );
        area[lv].innerHTML = "";
        for (let i in list[lv][code].children) {
          let id = list[lv][code].children[i];
          let opt = document.createElement("option");
          opt.value = id;
          opt.innerText = list[lv + 1][id].name;
          area[lv + 1].appendChild(opt);
        }
      };

      // 地域選択：地方(初期設定)
      for (let i in json.centers) {
        let opt = document.createElement("option");
        opt.value = i;
        opt.innerText = json.centers[i].name;
        area[0].appendChild(opt);
      }
      let initArea = ["010300", "110000", "110010", "110011", "1130100"];
      for (let i = 0; i < initArea.length; i++) {
        area[i].value = initArea[i];
        setSelect(i, initArea[i]);
      }
        area[4].value = initArea[4];
      return;
      // // 地域選択：都道府県
      // area[0].addEventListener("change", (e) => {
      //   setSelect(0, e.target.value);
      // });
      // // 地域選択：県内エリア
      // area[1].addEventListener("change", (e) => {
      //   setSelect(1, e.target.value);
      // });
      // // 地域選択：県内エリア2
      // area[2].addEventListener("change", (e) => {
      //   setSelect({
      //     selObj: area[3],
      //     keys: json.class10s[e.target.value].children,
      //     json: json.class15s,
      //   });
      // });
      // // 地域選択：市区町村
      // area[3].addEventListener("change", (e) => {
      //   setSelect();
      // });
    });
  // fetch(
  //   "https://www.jma.go.jp/bosai/forecast/data/forecast/1130100.json"
  // ).then(res => {
  //     return res.json();
  // }).then(json => {
  //     console.log(json);
  // });
})();
