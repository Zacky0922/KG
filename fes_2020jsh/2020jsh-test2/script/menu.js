//import {zList,burgerMenu,getGicon,zDebug} from "https://fes.kgef.ac.jp/exScripts/aggregater.js";

function setMenu(id,root = "./") {

    // メニュー
    // burgerメニュー：小画面用アイコンlabel_inner要素
    let label_ = document.createElement("span");
    label_.innerHTML = "KG";
    let img = document.createElement("img");
    img.src = "pict/logo.png";
    let burger = new burgerMenu(img);

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
        burger.addLink(getGicon("fact_check").outerHTML + " Contest", root + "contest.html");
        burger.addLink(getGicon("info").outerHTML + " Info", root + "info.html");
    }
    /*
    if (!zDebug.getOnline()) {
        for (let i = 0; i < 20; i++) {
            burger.addLink("test");
        }
    }
    */
    
    document.getElementById(id).appendChild(burger.get());
    burger.setBurger();
}

class kgMenu{

    constructor() {
    }
    //ラベルの中身生成
    getLabel() {
    }
}

export {kgMenu};