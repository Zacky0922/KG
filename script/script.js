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
  ul.classList.add("collection");
  for (let i = 0; i < menu.length; i++) {
    ul.innerHTML += `<li class="waves-effect waves-teal">
        <a href="${menu[i].href}">
        <i class="${menu[i].icon} fa-fw"></i>
        <span class="d-none d-sm-inline">${menu[i].tx}</span></a>
        </li>`;
  }
}
