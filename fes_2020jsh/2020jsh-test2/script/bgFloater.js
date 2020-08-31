export function setBGfloater() {
    let ul = document.createElement("ul");
    ul.id = "bgWrap";
    //パーティクル設定（画面幅に比例した数を生成。負荷を考慮してmax30）
    let count = Math.min(Math.round(window.innerWidth / 80), 30);
    for (let i = 0; i < count * 3; i++) {
        let li = document.createElement("li");
        li.setAttribute("style",
            "padding:" + Math.round(Math.random() * 60 + 15) + "px;" +
            "border-radius: " + Math.round(Math.random() * 25 + 20) + "%;" +
            "left:" + Math.round(100 / (count + 1) * i) + "%;" +
            "background-color:hsl(" + Math.round(Math.random() * 360) + ",100%,80%);" +
            "animation:floating " + Math.round(Math.random() * 15 + 5) + "s linear " +
            + Math.round(Math.random() * 10) + "s infinite;"
        );
        ul.appendChild(li);
    }
    return ul;
}


