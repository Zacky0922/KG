loadJScounter_loaded++;




function KGfes_init(dir) {
    let ele = document.createElement("div");
    ele.classList.add("z工事中", "debug");
    ele.innerHTML = "準備中";
    document.body.prepend(ele);


    let myHeader = document.createElement("header");
    myHeader.innerHTML = '<span id="KGfesTitle">第23回 五峯祭</span>（サイト下書き）<br />' +
        '<span id="KGfesPeriod">2020.09.12-13(Sat-Sun)</span >';
    document.body.prepend(myHeader);

    //burger menu setting
    let menuUl = createMenuUl([
        [getGicon("home").outerHTML + " Top", dir+"index2.html"],
        [getGicon("tag_faces").outerHTML + " Intro", dir + "intro.html"],
        [getGicon("event_note").outerHTML + " Events", dir + "events.html"],
        [getGicon("collections_bookmark").outerHTML + " Gallery", dir + "gallery/index.html"],
        [getGicon("fact_check").outerHTML + " Contest", dir + "contest.html"],
        [getGicon("cast").outerHTML + " Live!", dir +"live.html"],
        [getGicon("star_border").outerHTML + " Special", dir +"special.html"]
    ]);
    menuUl.classList.add("KGfesMenu");
    myHeader.appendChild(
        setBurgerMenu(menuUl)
    );
    myHeader.getElementsByTagName("img")[0].src = (location.href.indexOf("https://fes.kgef.ac.jp/2020jsh/") > -1 ?
        "https://fes.kgef.ac.jp/2020jsh/" :
        "https://fes.kgef.ac.jp/2020jsh-test/")+"scripts/pict/logo.png";
    let myFooter = document.createElement("footer");
    myFooter.innerHTML = '(C) <a href="https://jsh.kgef.ac.jp/">Kokusai Gakuin Junior & Senior High School</a> 2020';
    document.body.appendChild(myFooter);




    //ページトップへ戻るボタン
    let toGoUp = document.createElement("a");
    toGoUp.innerHTML = getGicon("arrow_circle_up").outerHTML;
    toGoUp.id = "toGoUp";
    toGoUp.classList.add("zUndisp");
    toGoUp.href = "#";
    document.body.appendChild(toGoUp);

}




$(function () {
    $(window).scroll(function () {
        toGoUpDisp();
    });
    
    function toGoUpDisp() {
        $("#toGoUp").each(function () {
            if ($(window).scrollTop() <= 300) {
                this.classList.add("zUndisp");
            } else if ($(window).scrollTop() > 300) {
                this.classList.remove("zUndisp");
            };
        });
    };


});