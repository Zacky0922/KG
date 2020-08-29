


function setFooter() {
    let ft = document.createElement("section");
    ft.id = "footer";
    ft.setAttribute("style", "grid-area:footer");
    ft.innerHTML = "<div id='ft_gototop'><a href='#'>▲GoToTop</a></div>" +
        // バナーエリア
        "<div id='ft_banners'></div>" +
        // caption
        "<div id='ft_kg'>" +
        "第23回 五峯祭 (2020.09.12 Sat.)<br/>" +
        "<a href='https://jsh.kgef.ac.jp/' target='_blank'>国際学院中学校高等学校</a>" +
        "</div>";

    document.body.appendChild(ft);

    // フッターバナー設定[href, target, img.src]
    let ftBanner = [
        // クラス動画コンテスト
        [zParam.get("root") + "classmovie.html", "_self", zParam.get("root") + "pict/ft/classmovie.png"],
        // ARコンテンツバナー
        [zParam.get("root") + "gallery.html#ar_gallery", "_self", zParam.get("root") + "pict/ft/ar_banner.png"],
        // 0912個別相談
        ["https://jsh.kgef.ac.jp/news/14865/", "_blank", zParam.get("root") + "pict/ft/0912soudan.png"]
    ];
    for (let i = 0; i < ftBanner.length; i++) {
        let a = document.createElement("a");
        a.href = ftBanner[i][0];
        a.target = ftBanner[i][1];
        let img = document.createElement("img");
        img.src = ftBanner[i][2];
        a.appendChild(img);
        document.getElementById("ft_banners").appendChild(a);
    }


    // 先頭に戻る際の
    var gototop = $('#ft_gototop');
    gototop.click(function () {
        $('body, html').animate({ scrollTop: 0 }, 500);
        return false;
    });
}


window.addEventListener('load', (event) => {
    setFooter();
});