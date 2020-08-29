loadJScounter_loaded++;

function eventList_init(id) {
    
    let events = document.getElementById(id).children;
    
    //初期整形
    for (let i = 0; i < events.length; i++){
        //初期化（一度、中身を空に）
        let ele = new Array();
        ele["イベント名"] = events[i].children[0].innerHTML;
        ele["団体名"] = events[i].children[1].innerHTML;
        ele["画像"] = events[i].children[2].src;
        ele["紹介文"] = events[i].children[3].innerHTML;
        events[i].innerHTML = "";
        events[i].classList.add("eventArticles");

        //時間／WEBギャラリー判定・要素追加
        let time = document.createElement("div");
        time.setAttribute("style","grid-area:event-time");
        for (let c = 0; c < events[i].classList.length; c++){
            if (events[i].classList[c].indexOf("bc_") > -1) {
                time.innerText = events[i].classList[c].replace("bc_", "");
                events[i].appendChild(time);
                break;
            } else if (events[i].classList[c].indexOf("webGallery") > -1) {
                time.innerText = "WEBギャラリー";
                events[i].appendChild(time);
                break;
            }
        }

        let title = document.createElement("div");
        title.setAttribute("style", "grid-area:event-title");
        title.appendChild(
            document.createTextNode(ele["イベント名"])
        );
        title.appendChild(
            document.createElement("br")
        );
        title.appendChild(
            document.createTextNode(ele["団体名"])
        );
        events[i].appendChild(title);

        let img = document.createElement("img");
        img.setAttribute("style", "grid-area:event-img");
        img.src = ele["画像"];
        events[i].appendChild(img);

        let text = document.createElement("div");
        text.setAttribute("style", "grid-area:event-text");
        text.innerHTML = ele["紹介文"];
        events[i].appendChild(text);


    }


    //日付順並べ替え
    let sort_flag = false;
    while (true) {
        sort_flag = true;
        for (let i = 0; i < events.length - 1; i++){
            //if(events[i])
        }

        if (sort_flag) {
            break;
        }
    }
};

