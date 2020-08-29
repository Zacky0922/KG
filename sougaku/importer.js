// import {対象} from "ファイルurl";
/*  ◆対象形式
        関数    func    ()不要
        クラス  class   ()不要
        変数
    ※元ファイルでexport宣言を付ける必要有＝ローカルでも使用可
    複数の場合は、{a,b}などもok

    ◆別名設定、
        import {元の名前 as 新たに設定する名前} from "ファイルurl";
    ◆一括インポート
        import {* as 名前} from "ファイルurl";
    利用には名前が必要
        名前.(クラス・関数・変数名)

    ◆多段インポート
    呼び出したファイルのみで実行可
        a.html  import{b}    {c}は使用不可
        b.js    import{c}
        c.js
    
    ◆その他
    ファイル名に変数使用不可
    ※プリミティブな文字列のみ
*/

// デバッグモードからの遷移は、再度デバッグモードへ自動遷移
if (document.referrer.indexOf("?debug") > -1) {
    if (location.href.indexOf("?debug") == -1) {
        location.href = location.href + "?debug";
    }
}


/*  exScripts library
    https://zacky0922.github.io/exScripts/
    https://exScripts.zacky.ninja-x.jp/
*/

// bootstrap
$.getScript("../../exScripts/ex/bootstrap/js/bootstrap.min.js");

// 個人ライブラリ
$.getScript("../../exScripts/tools/date.js");
$.getScript("../../exScripts/tools/list.js");

$.getScript("../../exScripts/tools/debug/debug.js");
debugTest();
/*
import { * as zDebug } from "http://zacky.ninja-x.jp/exScripts/tools/debug/debug.js";
import { * as zDate } from  "http://zacky.ninja-x.jp/exScripts/tools/date.js";
import { * as zList } from  "http://zacky.ninja-x.jp/exScripts/tools/list.js";
*/
// 基本設定：onloadにしてもよい？
(function () {
    document.title = document.title + " - KG総学2020（中2）WEBサイトを作ろう！";
})();

