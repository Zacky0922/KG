function setMenu(id, contents) {
    let ul = document.createElement("ul");
    ul.id = "pills-tab";
    ul.classList.add("nav", "nav-pills", "container-fluid", "d-flex");
    ul.setAttribute("role", "tablist");
    document.getElementById(id).appendChild(ul);
    for (let i = 0; i < contents.length; i++) {
        let li = document.createElement("li");
        li.classList.add("nav-item", "flex-fill");
        if (contents[i].ex_class != undefined) {
            for (let j in contents[i].ex_class) {
                li.classList.add(contents[i].ex_class[j]);
            }
        }
        li.setAttribute("role", "presentation");
        let a = document.createElement("a");
        a.id = "pills-" + contents[i].id + "-tab";
        a.classList.add("nav-link");
        if (i == 0) {
            a.classList.add("active");
        }
        a.href = "#pills-" + contents[i].id;
        a.setAttribute("data-bs-toggle", "pill");
        a.setAttribute("role", "tab");
        a.setAttribute("aria-controls", "pills-" + contents[i].id);
        a.setAttribute("aria-selected", (i == 0 ? "true" : "false"));
        li.appendChild(a);
        ul.appendChild(li);

        let icon = document.createElement("span");
        icon.classList.add("material-icons");
        icon.innerHTML = contents[i].icon;
        a.appendChild(icon);

        let tx = document.createElement("span");
        //tx.classList.add("d-none", "d-sm-block", "d-md-inline");
        tx.classList.add("d-block", "d-sm-block", "d-md-inline");
        tx.innerHTML = contents[i].text;
        a.appendChild(tx);
    }

}