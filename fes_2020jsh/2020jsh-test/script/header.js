


function setHeader() {
    /*  section#header
            div.headTitle
                span#KGfesTitle
                span#KGfesPeriod
    */
    let head = document.getElementById("header");

    //タイトル表示部
    let title = document.createElement("div");
    title.classList.add("headTitle");
    title.innerHTML = '<div id="KGfesTitle">' +
        '<a href="' + zParam.get("root") + "home.html" + '" target="_self">第23回 五峯祭</a>' +
        '</div>' +
        '<div id="KGfesPeriod">2020.09.12-13(Sat-Sun)</div>' +
        '<div id="KGfesMenuWrap"></div>'
    head.appendChild(title);



}


window.addEventListener('load', (event) => {
    setHeader();

});