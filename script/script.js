
// 汎用ローダー
let scripts = [
  // github button
  "https://buttons.github.io/buttons.js",
  "https://cdn.jsdelivr.net/npm/js-cookie@3.0.1/dist/js.cookie.min.js"
];
for (let i = 0; i < scripts.length; i++) {
  let script = document.createElement("script");
  script.src = scripts[i];
  document.head.appendChild(script);
}
// 初期設定
// window.addEventListener("DOMContentLoaded", () => {
window.addEventListener("load", () => {
  // メニュー生成
  import("./common/menu.js").then((m) => {
    m.setMenu("#menu");
  });

  // Materialize init
  // action button
  let elems = document.querySelectorAll(".fixed-action-btn");
  let instances = M.FloatingActionButton.init(elems, {
    direction: "left",
    hoverEnabled: false,
  });
  

  // お遊び
  fetch("https://picsum.photos/?landscape,sea,lake,mountain/info")
    .then(data => {
      return data.text();
    })
    .then(json => {
      // document.head.style.backgroundImage = json.url;
    }
    
  )
});
// test
