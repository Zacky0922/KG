// 初期設定
(function () {
  // フォーム部品取得
  let form = document.querySelector("#bgSetting");
  let bg_category = form.querySelector("#bg_category");
  let bg_color = form.querySelector("#bg_color");
  let bg_sublist = form.querySelector("#bg_sublist");
  let bg_photo = form.querySelector("#bg_photoList");

  // 各種画像リスト取得
  const pictList = [
    { title: "color", val: "color" },
    { title: "FIND47", val: "find47" },
    { title: "スタジオジブリ", val: "ghibli" },
  ];
  let find47json = null;
  let find47photos = null;
  const setBg_color = function () {
    document.body.setAttribute("style", `background:${bg_color.value}`);
    Cookies.remove("img_url");
    Cookies.remove("copyright");
    Cookies.set("bgColor", bg_color.value);
  };
  let ghibli = [
    {
      title: "風の谷のナウシカ",
      copyright: "© 1984 Studio Ghibli・H",
      url: "nausicaa",
      imgs: 50,
    },
    {
      title: "天空の城ラピュタ",
      copyright: "© 1986 Studio Ghibli",
      url: "laputa",
      imgs: 50,
    },

    {
      title: "となりのトトロ",
      copyright: "© 1988 Studio Ghibli",
      url: "totoro",
      imgs: 50,
    },

    {
      title: "魔女の宅急便",
      copyright: "© 1989 角野栄子・Studio Ghibli・N",
      url: "majo",
      imgs: 50,
    },
    {
      title: "おもひでぽろぽろ",
      copyright: "© 1991 岡本螢・刀根夕子・Studio Ghibli・NH",
      url: "omoide",
      imgs: 50,
    },
    {
      title: "紅の豚",
      copyright: "© 1992 Studio Ghibli・NN",
      url: "porco",
      imgs: 50,
    },
    {
      title: "海がきこえる",
      copyright: "© 1993 氷室冴子・Studio Ghibli・N",
      url: "umi",
      imgs: 50,
    },
    {
      title: "平成狸合戦ぽんぽこ",
      copyright: "© 1994 畑事務所・Studio Ghibli・NH",
      url: "tanuki",
      imgs: 50,
    },
    {
      title: "耳をすませば",
      copyright: "© 1995 柊あおい/集英社・Studio Ghibli・NH",
      url: "mimi",
      imgs: 50,
    },
    {
      title: "On Your Mark",
      copyright: "© 1995 Studio Ghibli",
      url: "onyourmark",
      imgs: 28,
    },
    {
      title: "もののけ姫",
      copyright: "© 1997 Studio Ghibli・ND",
      url: "mononoke",
      imgs: 50,
    },
    {
      title: "ホーホケキョ となりの山田くん",
      copyright: "© 1999 いしいひさいち・畑事務所・Studio Ghibli・NHD",
      url: "yamada",
      imgs: 50,
    },
    {
      title: "千と千尋の神隠し",
      copyright: "© 2001 Studio Ghibli・NDDTM",
      url: "chihiro",
      imgs: 50,
    },
    {
      title: "猫の恩返し",
      copyright: "© 2002 猫乃手堂・Studio Ghibli・NDHMT",
      url: "baron",
      imgs: 50,
    },

    {
      title: "ギブリーズepisode２",
      copyright: "© 2002 TS・Studio Ghibli・NDHMT",
      url: "ghiblies",
      imgs: 50,
    },
    {
      title: "ハウルの動く城",
      copyright: "© 2004 Studio Ghibli・NDDMT",
      url: "howl",
      imgs: 50,
    },
    {
      title: "ゲド戦記",
      copyright: "© 2006 Studio Ghibli・NDHDMT",
      url: "ged",
      imgs: 50,
    },
    {
      title: "崖の上のポニョ",
      copyright: "© 2008 Studio Ghibli・NDHDMT",
      url: "ponyo",
      imgs: 50,
    },
    {
      title: "借りぐらしのアリエッティ",
      copyright: "© 2010 Studio Ghibli・NDHDMTW",
      url: "karigurashi",
      imgs: 50,
    },
    {
      title: "コクリコ坂から",
      copyright: "© 2011 高橋千鶴・佐山哲郎・Studio Ghibli・NDHDMT",
      url: "kokurikozaka",
      imgs: 50,
    },
    {
      title: "風立ちぬ",
      copyright: "© 2013 Studio Ghibli・NDHDMTK",
      url: "kazetachinu",
      imgs: 50,
    },
    {
      title: "かぐや姫の物語",
      copyright: "© 2013 畑事務所・Studio Ghibli・NDHDMTK",
      url: "kaguyahime",
      imgs: 50,
    },
    {
      title: "思い出のマーニー",
      copyright: "© 2014 Studio Ghibli・NDHDMTK",
      url: "marnie",
      imgs: 50,
    },
    {
      title: "レッドタートル ある島の物語",
      copyright:
        "© 2016 Studio Ghibli - Wild Bunch - Why Not Productions - Arte France Cinéma - CN4 Productions - Belvision - Nippon Television Network - Dentsu - Hakuhodo DYMP - Walt Disney Japan - Mitsubishi - Toho",
      url: "redturtle",
      imgs: 50,
    },
  ];

  // 画像一覧生成func
  const setImgList = function ({ value, img_url, alt }) {
    let radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "bgPhotoList";
    radio.value = value;
    radio.id = "bgPhotoList_" + value;
    let label = document.createElement("label");
    label.setAttribute("for", "bgPhotoList_" + value);
    label.innerHTML = `<img src="${img_url}" 
            alt="${alt}">`;
    bg_photo.appendChild(radio);
    bg_photo.appendChild(label);
  };
  // 背景設定
  const setBg = function ({ img_url, copyright }) {
    // copyright表示
    document.querySelector("#nowBg").innerHTML = copyright;
    // 背景表示
    document.body.setAttribute(
      "style",
      `background:#fff url("${img_url}") no-repeat border-box center
        /cover fixed content-box;`
    );
    Cookies.set("img_url", img_url);
    Cookies.set("copyright", copyright);
  };
  window.addEventListener("load", () => {
    setBg({
      img_url: Cookies.get("img_url"),
      copyright: Cookies.get("copyright"),
    });
    console.log(Cookies.get());
  });

  // 背景category設定
  for (let i = 0; i < pictList.length; i++) {
    let opt = document.createElement("option");
    opt.innerText = pictList[i].title;
    opt.value = pictList[i].val;
    bg_category.appendChild(opt);
  }
  bg_category.addEventListener("change", (e) => {
    // クリアしてからリスト設定
    bg_sublist.innerHTML = "";
    bg_photo.innerHTML = "";
    switch (e.target.value) {
      case "color":
        bg_color.style.display = "inline";
        bg_sublist.style.display = "none";
        bg_photo.style.display = "none";
        setBg_color();
        return;
      case "find47":
        // 初回読み込み時のみ
        if (find47json == null) {
          find47json = fetch(
            "https://raw.githubusercontent.com/code4fukui/find47/main/images.json"
          )
            .then((res) => {
              return res.json();
            })
            .then((json) => {
              console.log(json.images[0]);
              return json.images;
            });
          find47photos = find47json.then((json) => {
            // 都道府県分類
            let photos = new Array(47);
            for (let i = 0; i < photos.length; i++) {
              photos[i] = [];
            }
            for (let i = 0; i < json.length; i++) {
              photos[json[i].prefecture.code - 1].push(json[i]);
            }
            return photos;
          });
        }
        find47photos.then((photos) => {
          for (let i = 0; i < photos.length; i++) {
            let opt = document.createElement("option");
            opt.value = photos[i][0].prefecture.code - 1;
            opt.innerText =
              (photos[i][0].prefecture.name_ja + "　").slice(0, 4) +
              ` [${photos[i].length}件]`;
            bg_sublist.appendChild(opt);
          }
        });
        break;
      case "ghibli":
        for (let i = 0; i < ghibli.length; i++) {
          let opt = document.createElement("option");
          opt.value = i;
          opt.innerText = ghibli[i].title;
          bg_sublist.appendChild(opt);
        }
        break;
    }
    bg_color.style.display = "none";
    bg_sublist.style.display = "inline";
    bg_photo.style.display = "block";
  });

  // 色セレクタ設定
  bg_color.addEventListener("change", (e) => {
    setBg_color();
  });

  // 画像カテゴリ設定
  bg_sublist.addEventListener("change", (e) => {
    bg_photo.innerHTML = "";
    switch (bg_category.value) {
      case "find47":
        find47photos.then((photos) => {
          // 都道府県リスト選択時の処理
          let i = e.target.value; // 都道府県コード(-1)取得
          // 写真リスト再生成
          for (let j = 0; j < photos[i].length; j++) {
            setImgList({
              value: photos[i][j].id,
              img_url: photos[i][j].thumb_url,
              alt: photos[i][j].title + "\n" + photos[i][j].phtotographer,
            });
          }
        });
        break;
      case "ghibli":
        for (let i = 0; i < ghibli[e.target.value].imgs; i++) {
          setImgList({
            value: i + 1,
            img_url: `https://www.ghibli.jp/gallery/thumb-${
              ghibli[e.target.value].url + ("000" + (i + 1)).slice(-3)
            }.png`,
            alt:
              ghibli[e.target.value].title +
              "\n" +
              ghibli[e.target.value].copyright,
          });
        }
        break;
    }
  });

  // 画像リスト選択時の処理
  bg_photo.addEventListener("change", (e) => {
    switch (bg_category.value) {
      case "find47":
        // setBg_find47(e.target.value); // id指定
        find47json.then((json) => {
          // 画像抽出
          for (let i = 0; i < json.length; i++) {
            if (json[i].id == e.target.value) {
              json = json[i];
              break;
            }
          }
          setBg({
            img_url: json.url,
            copyright: `<div><a href="${json.page_url}" target="_blank" rel="noopener noreferrer">
                ${json.title} ／ ${json.phtotographer.name}
              </a>
              （<a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">
              CC表示4.0 国際</a>）</div>
              <div><a href="https://find47.jp/ja/" target="_blank" rel="noopener noreferrer">FIND/47</a></div>`,
          });
        });
        break;
      case "ghibli":
        setBg({
          img_url: `https://www.ghibli.jp/gallery/${
            ghibli[bg_sublist.value].url
          }${("000" + e.target.value).slice(-3)}.jpg`,
          copyright: `<div><a href="https://www.ghibli.jp/works/${
            ghibli[bg_sublist.value].url
          }/" target="_blank" rel="noopener noreferrer">
            ${ghibli[bg_sublist.value].title}
            </a></div>
            <div>${ghibli[bg_sublist.value].copyright}</div>`,
        });
        break;
    }
  });
})();
