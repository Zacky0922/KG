export function setBGfloater() {
    let ul = document.createElement("ul");
    ul.id = "bgWrap";
    //パーティクル設定（画面幅に比例した数を生成。負荷を考慮してmax30）
    let count = Math.min(Math.round(window.innerWidth / 80), 30);
    let color = Math.round(Math.random() * 360);
    for (let i = 0; i < count * 3; i++) {
        let li = document.createElement("li");
        li.setAttribute("style",
            // floaterサイズ
            "padding:" + Math.round(Math.random() * 60 + 15) + "px;" +
            // 角丸四角の丸み具合
            "border-radius: " + Math.round(Math.random() * 25 + 20) + "%;" +
            // 位置
            "left:" + Math.round(100 / (count + 1) * i) + "%;" +
            // 色
            "background-color:hsl(" + (color = (color + Math.round(Math.random() * 180 + 90)) % 360) + ",100%,80%);" +
            // 速度・時間差
            "animation:floating " + Math.round(Math.random() * 15 + 8) + "s linear " +
            + Math.round(Math.random() * 20) + "s infinite;"
        );
        ul.appendChild(li);
    }
    return ul;
}


