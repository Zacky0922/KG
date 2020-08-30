import { setHeader } from "./script/header.js";
import { setFooter } from "./script/footer.js";
import { setMenu} from "./script/menu.js";
import { zExportTest } from "../exScripts/test.js";

window.addEventListener('load', (event) => {
    // ヘッダー
    setHeader("kgHeader");
    // フッター
    setFooter("kgFooter");
    // メニュー
    setMenu("KGfesMenuWrap","./");   //最後にやる＝menuを最前面に出すため

    zExportTest();
});

