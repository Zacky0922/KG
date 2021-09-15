export function setMenu(query) {
  let menu = [
    {
      tx: "健康観察",
      href: "#health",
      icon: "fas fa-viruses",
    },
    {
      tx: "便利リンク",
      href: "#links",
      icon: "fas fa-link",
    },
    {
      tx: "気象情報",
      href: "#weather",
      icon: "fas fa-cloud-sun-rain",
    },
    {
      tx: "設定",
      href: "#config",
      icon: "fas fa-cog",
    },
  ];
  let ul = document.querySelector(query);
  ul.classList.add("list-group", "list-group-flush");
  for (let i = 0; i < menu.length; i++) {
    ul.innerHTML += `<li class="list-group-item">
        <i class="${menu[i].icon} fa-fw"></i>
        <a href="${menu[i].href}">${menu[i].tx}</a>
        </li>`;
  }
}
