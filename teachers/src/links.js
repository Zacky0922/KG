
function setLinks(id,links) {
    let ul = document.getElementById(id);
    ul.classList.add("d-flex","flex-wrap");
    for (let i = 0; i < links.length; i++) {
        let li = document.createElement("li");
        li.classList.add("flex-fill", "p-2");
        li.classList.add("d-flex");    // 子要素のために
        let a = document.createElement("a");
        a.href = links[i].href;
        a.target = "_blank";
        a.classList.add("btn", "btn-outline-primary");   // ボタン設定
        a.classList.add("flex-fill");   // レイアウト（左右一杯、）
        a.classList.add("d-flex", "align-items-center", "justify-content-center");     // テキスト：左右・上下中央
        a.innerHTML = links[i].text;
        li.appendChild(a);
        ul.appendChild(li);
    }
};