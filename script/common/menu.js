export function setMenu(query) {
  let menu = [
    {
      tx: "健康観察",
      href: "#health",
      class: "material-icons",
      text: "health_and_safety",
    },
    {
      tx: "便利リンク",
      href: "#links",
      class: "material-icons",
      text: "link",
    },
    {
      tx: "気象情報",
      href: "#weather",
      class: "material-icons",
      text: "wb_sunny",
    },
    {
      tx: "設定",
      href: "#setting",
      class: "material-icons",
      text: "settings",
    },
  ];
  let ul = document.querySelector(query);
  // ul.classList.add("collection");
  for (let i = 0; i < menu.length; i++) {
    ul.innerHTML += `<li class="waves-effect waves-dark">
        <a href="${menu[i].href}">
          <span class="sidebar_icon">
            <i class="${menu[i].class}">${menu[i].text}</i>
          </span>
          <span class="sidebar_content">${menu[i].tx}</span>
        </a>
        </li>`;
  }
}
