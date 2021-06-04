
// テーマ切替
document.getElementById("settings_theme_form").addEventListener('change', function () {
    let pgbar = document.getElementById("settings_theme_progressbar");
    pgbar.classList.remove("d-none");
    let css = {
        "7": "https://unpkg.com/7.css",
        "XP": "https://unpkg.com/xp.css",
        "98": "https://unpkg.com/98.css"
    };
    setTimeout(function (key) {
        document.getElementById("themeCSS").href = css[key];
        console.log("Change Theme to " + key);
        pgbar.classList.add("d-none");
    }, 1500, this.value);
});

// 壁紙切替
function setWP(data) {
    document.body.background = data.url_image;
    document.getElementById("wallpaperInfo").innerHTML = "Data Source:" + "<br/>" +
        "<a href='" + data.url + "' target='_blank'>" +
        data.title + " ／ " + data.pref + "</a><br/>" +
        (data.authoerurl == undefined ? data.author :
            "<a href='" + data.authoerurl + "' target='_blank'>" +
            data.author + "</a>");
}
getXML("https://code4fukui.github.io/find47/find47images.csv", function (r) {
    let json = sort(CSV2json(r), "pref_code");
    console.log("Loaded - 壁紙リスト");
    console.log(json);

    // リスト設定
    let DD = document.getElementById("settings_theme_form_wallpaper");
    for (let i = 0; i < json.length; i++) {
        let optgr = document.createElement("optgroup");
        optgr.label = json[i].pref;
        for (; optgr.label == json[i].pref; i++) {
            let opt = document.createElement("option");
            opt.innerText = json[i].title;
            opt.value = i;
            optgr.appendChild(opt);
            if (i == json.length - 1) {
                break;
            }
        }
        DD.appendChild(optgr);
    }

    document.getElementById("settings_theme_form_wallpaper").addEventListener('change',
        function () {
            document.getElementById("settings_theme_form_WPrandom").checked = false;
            if (this.value == "なし") {
                document.body.background = "none";
                document.getElementById("wallpaperInfo").innerHTML = "";
                return;
            }
            let data = json[this.value];
            setWP(data);
        });

    // ランダム設定
    document.getElementById("settings_theme_form_WPrandom").addEventListener('change',
        function () {
            let data = json[Math.round(Math.random() * json.length)];
            setWP(data);
        });
    setInterval(function () {
        if (!document.getElementById("settings_theme_form_WPrandom").checked) {
            return;
        }
        let data = json[Math.round(Math.random() * json.length)];
        setWP(data);
    }, 30 * 1000);
}, false);