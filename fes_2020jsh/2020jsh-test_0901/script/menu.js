
window.addEventListener('load', (event) => {


    // メニュー
    // burgerメニュー：小画面用アイコンlabel_inner要素
    let label_ = document.createElement("span");
    label_.innerHTML = "KG";
    let img = document.createElement("img");
    img.src = "pict/logo.png";
    let burger = new burgerMenu(img);
    with (burger) {
        addLink(getGicon("home").outerHTML + " Home", zParam.get("root") + "home.html");
        addLink(getGicon("tag_faces").outerHTML + " Intro", zParam.get("root") + "intro.html");
        addLink(getGicon("event_note").outerHTML + " Events", zParam.get("root") + "events.html");
        if (
            (new Date(2020, 9 - 1, 12)).getTime() < (new Date()).getTime() ||
            !zDebug.getOnline()
        ) {
            //当日用・デバッグ
            addLink(
                getGicon("cast").outerHTML + " Live!!",
                zParam.get("root") + "live.html",
                "_self",
                null
            );
            addLink(
                getGicon("collections_bookmark").outerHTML + " Gallery",
                zParam.get("root") + "gallery.html",
                "_self",
                null
            );
        } else {
            //事前用
            addLink(
                getGicon("cast").outerHTML + " Live!!",
                null,
                null,
                null,
                "inactive_menu"
            );
            addLink(
                getGicon("collections_bookmark").outerHTML + " Gallery",
                null,
                null,
                null,
                "inactive_menu"
            );
        }
        addLink(getGicon("fact_check").outerHTML + " Contest", zParam.get("root") + "contest.html");
        addLink(getGicon("info").outerHTML + " Info", zParam.get("root") + "info.html");
    }
    /*
    if (!zDebug.getOnline()) {
        for (let i = 0; i < 20; i++) {
            burger.addLink("test");
        }
    }
    */
    document.getElementById("KGfesMenuWrap").appendChild(burger.get());
    burger.setBurger();

});