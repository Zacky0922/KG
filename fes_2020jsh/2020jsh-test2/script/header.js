export function setHeader(id, root = "./") {
    /*  section#header
            div.headTitle
                span#KGfesTitle
                span#KGfesPeriod
    */
    let head = document.getElementById(id);

    // タイトル
    let title = document.createElement("div");
    title.id = "KGfesTitle";
    let title_a = document.createElement("a");
    title_a.href = root + "home.html";
    title_a.target = "_self";
    title_a.innerText = "第23回 五峯祭";
    title.appendChild(title_a);
    head.appendChild(title);

    // 期日
    let period = document.createElement("div");
    period.id = "KGfesPeriod";
    period.innerText = "2020.09.12-13(Sat-Sun)";
    head.appendChild(period);

    // メニューラッパー
    let menu = document.createElement("div");
    menu.id = "KGfesMenuWrap";
    head.appendChild(menu);
}
