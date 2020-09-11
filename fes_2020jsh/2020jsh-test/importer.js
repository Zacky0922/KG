// デバッグモードからの遷移は、再度デバッグモードへ自動遷移
import 'https://code.jquery.com/jquery-3.3.1.min.js';
import { zList, burgerMenu, getGicon, zDebug,zCSV } from "../exScripts/aggregater.js";
import { setHeader } from "./script/header.js";
import { setFooter } from "./script/footer.js";
import { setBGfloater } from "./script/bgFloater.js";
export { zList, burgerMenu, getGicon, zDebug, zCSV, setBGfloater};

// 初期設定
(function () {
    document.title = document.title + " - 五峯祭☆国際学院中高";

})();

window.addEventListener('load', (event) => {
    let root = "./";
    // ヘッダー
    setHeader("kgHeader", root);
    // フッター
    setFooter("kgFooter", root);
    // フッター：GoToTop設定
    $('#ft_gototop').click(function () {
        $('body, html').animate({ scrollTop: 0 }, 500);
        return false;
    });
    // 背景（色つきふわふわ）
    document.body.appendChild(setBGfloater());

    // メニュー
    let img = document.createElement("img");
    img.src = "pict/logo.png";
    let burger = new burgerMenu(img);  //汎用バーガーメニュー生成module：ラベルセット
    burger.addLink(getGicon("home").outerHTML + " Home", root + "home.html");
    burger.addLink(getGicon("tag_faces").outerHTML + " Intro", root + "intro.html");
    burger.addLink(getGicon("event_note").outerHTML + " Events", root + "events.html");
    if (
        (new Date(2020, 9 - 1, 12)).getTime() < (new Date()).getTime() ||
        !zDebug.getOnline()
    ) {
        //当日用・デバッグ
        burger.addLink(
            getGicon("cast").outerHTML + " Live!!",
            root + "live.html",
            "_self",
            null
        );
        burger.addLink(
            getGicon("collections_bookmark").outerHTML + " Gallery",
            root + "gallery.html",
            "_self",
            null
        );
    } else {
        //事前用
        burger.addLink(
            getGicon("cast").outerHTML + " Live!!<br/>(当日のお楽しみ)",
            null,
            null,
            null,
            "inactive_menu"
        );
        burger.addLink(
            getGicon("collections_bookmark").outerHTML + " Gallery<br/>(当日のお楽しみ)",
            null,
            null,
            null,
            "inactive_menu"
        );
    }
    burger.addLink(getGicon("fact_check").outerHTML + " Contest", root + "contest.html");
    burger.addLink(getGicon("info").outerHTML + " Info", root + "info.html");

    // headerメニュー
    document.getElementById("KGfesMenuWrap").appendChild(burger.get());
    // バーガーメニュー
    burger.setBurger();

    // 読込完了処理
    if (!zDebug.getOnline() ||
        (new Date()).getTime() > (new Date(2020, 9 - 1, 12).getTime())
    ) {
        zDebug.setDebugEle();
    }
   
    if (
        !zDebug.getOnline() ||
        (new Date()).getTime() >= (new Date(2020, 9 - 1, 12,10,0)).getTime()
    ) {
         // 当日まで非表示 .preHide
        let ele = document.getElementsByClassName("preHide");
        while(ele.length != 0) {
            ele[0].classList.remove("preHide");
        }
    } else {
        // 当日以降非表示 .proHide
        let ele = document.getElementsByClassName("proHide");
        while (ele.length != 0) {
            ele[0].classList.remove("proHide");
        }
    }
});



// 特定時間に動作
setInterval(function () {

    if ((new Date()).getMinutes == 0) {
        
    }
},60*1000);
