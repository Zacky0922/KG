

export function setFooter(id, root = "./") {
    let ft = document.getElementById(id);


    ft.innerHTML = "<div id='ft_gototop'><a href='#'>▲GoToTop</a></div>" +
        // バナーエリア
        "<div id='ft_banners'></div>" +
        // caption
        "<div id='ft_kg'>" +
        "第23回 五峯祭 (2020.09.12 Sat.)<br/>" +
        "<a href='https://jsh.kgef.ac.jp/' target='_blank'>国際学院中学校高等学校</a>" +
        "</div>";


    // フッターバナー設定[href, target, img.src, a.class]
    let ftBanner = [
        // クラス動画コンテスト
        [root + "classmovie.html", "_self", root + "pict/ft/classmovie.png","preHide"],
        // 数学研究室
        ["../math-lab/", "_blank", root + "pict/ft/suken.png", "preHide"],
        // ARコンテンツバナー
        [root + "gallery.html#ar_gallery", "_self", root + "pict/ft/ar_banner.png", "preHide"],
        // 0912個別相談
        ["https://jsh.kgef.ac.jp/news/14865/", "_blank", root + "pict/ft/0912soudan.png", null]
    ];
    for (let i = 0; i < ftBanner.length; i++) {
        let a = document.createElement("a");
        a.href = ftBanner[i][0];
        a.target = ftBanner[i][1];
        if (ftBanner[i][3] != null) {
            a.classList.add(ftBanner[i][3]);
        }
        let img = document.createElement("img");
        img.src = ftBanner[i][2];
        a.appendChild(img);
        document.getElementById("ft_banners").appendChild(a);
    }
}

