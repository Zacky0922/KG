// デバッグモードからの遷移は、再度デバッグモードへ自動遷移

import { setHeader } from "./script/header.js";
import { setFooter } from "./script/footer.js";
import { setMenu } from "./script/menu.js";
import { setBGfloater } from "./script/bgFloater.js";
//import { zExportTest } from "https://fes.kgef.ac.jp/exScripts/aggregater.js";

// 初期設定
(function () {
    document.title = document.title + " - 国際学院中高「五峯祭2020」";
})();

window.addEventListener('load', (event) => {
    // ヘッダー
    setHeader("kgHeader", "./");
    // フッター
    setFooter("kgFooter", "./");
    // 背景（色つきふわふわ）
    document.body.appendChild(setBGfloater());
    // メニュー
    setMenu("KGfesMenuWrap","./");   //最後にやる＝menuを最前面に出すため

    //zExportTest();
});

