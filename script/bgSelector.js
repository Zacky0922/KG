export class bgSelector {
  // 画像リスト
  #pictList = [
    { title: "color", val: "color" },
    { title: "FIND47", val: "find47" },
    { title: "スタジオジブリ", val: "ghibli" },
  ];

  #find47json = null;
  #find47photos = null;
  #ghibli = [
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

  // 現在表示情報
  #nowDisp = ["color", null, null];

  // サブ選択リスト表示領域
  #selectArea; // ラッパー
  #desc = document.createElement("div");
  #catList = document.createElement("select");
  #colorSel = document.createElement("input");
  #subList = document.createElement("select");
  #photoList = document.createElement("div");
  // 背景設定target
  #target = document.body;

  constructor(target = document.body) {
    this.#target = target;
    // js-cookieモジュールimport
    import(
    "https://cdn.jsdelivr.net/npm/js-cookie@3.0.1/dist/js.cookie.min.mjs"
    );
  }

  setSelector(ele) {
    // subList群設定
    this.#selectArea = ele;
    this.#selectArea.appendChild(this.#desc);
    this.#selectArea.appendChild(this.#catList);
    this.#colorSel.type = "color";
    this.#colorSel.value = "#cccccc";
    this.#selectArea.appendChild(this.#colorSel);
    this.#selectArea.appendChild(this.#subList);
    this.#selectArea.appendChild(this.#photoList);
    for (let i = 0; i < this.#pictList.length; i++) {
      this.#catList.appendChild(
        this.#getOption(this.#pictList[i].title, this.#pictList[i].val)
      );
    }
    // イベント設定
    this.#catList.addEventListener("change", (e) => {
      this.#changeCatList(e);
    });
    this.#subList.addEventListener("change", (e) => {
      this.#changeSubList(e);
    });
    this.#colorSel.addEventListener("change", (e) => {
      this.#changeColor(e);
    });
    this.#photoList.addEventListener("change", (e) => {
      this.#setBg(e);
    });
    // 初期値設定、初期発火
    this.#catList.dispatchEvent(new Event("change"));
    this.#subList.dispatchEvent(new Event("change"));
  }

  #changeCatList(e) {
    this.#nowDisp[0] = e.target.value;
    this.#subList.innerHTML = "";
    this.#photoList.innerHTML = "";
    switch (this.#nowDisp[0]) {
      case "color":
        this.#colorSel.style.display = "inline";
        this.#subList.style.display = "none";
        this.#desc.innerHTML = "";
        return;
        break;
      case "find47":
        // 初期設定
        if (this.#find47json === null) {
          this.#initFind47();
        }
        this.#find47photos.then((json) => {
          for (let i = 0; i < json.length; i++) {
            this.#subList.appendChild(
              this.#getOption(
                `${(json[i][0].prefecture.name_ja + "　　").slice(0, 4)} : ${
                  json[i].length
                }件`,
                json[i][0].prefecture.code - 1
              )
            );
          }
        });
        break;
      case "ghibli":
        for (let i = 0; i < this.#ghibli.length; i++) {
          this.#subList.appendChild(this.#getOption(this.#ghibli[i].title, i));
        }
        break;
    }
    this.#subList.style.display = "inline";
    this.#colorSel.style.display = "none";
  }

  #changeColor(e) {
    this.#nowDisp[1] = e.target.value;
    this.#nowDisp[2] = null;
    this.#target.setAttribute("style", `background:${e.target.value}`);
  }

  #changeSubList(e) {
    console.log("changeSubList");
    this.#nowDisp[1] = e.target.value;
    this.#photoList.innerHTML = "";
    switch (this.#nowDisp[0]) {
      case "color":
        break;
      case "find47":
        this.#find47photos.then((json) => {
          let prefPhotos = json[this.#nowDisp[1]];
          for (let i = 0; i < prefPhotos.length; i++) {
            this.#setImgItem(
              this.#photoList,
              prefPhotos[i].thumb_url,
              prefPhotos[i].id,
              "alt text"
            );
          }
        });
        break;
      case "ghibli":
        for (let i = 0; i < this.#ghibli[this.#nowDisp[1]].imgs; i++) {
          this.#setImgItem(
            this.#photoList,
            `https://www.ghibli.jp/gallery/thumb-${
              this.#ghibli[this.#nowDisp[1]].url + ("000" + (i + 1)).slice(-3)
            }.png`,
            i,
            "alt text"
          );
        }
        break;
    }
  }

  #setBg(e) {
    console.log("setBg");
    this.#nowDisp[2] = e.target.value;
    switch (this.#nowDisp[0]) {
      case "color":
        break;
      case "find47":
        this.#find47json.then((json) => {
          for (let i = 0; i < json.length; i++) {
            // 該当idで背景設定
            if (json[i].id == this.#nowDisp[2]) {
              this.#setBg_(json[i].url);
              this.#desc.innerHTML = `<a href="${json[i].page_url}" target="_blank" rel="noopener noreferrer">
                ${json[i].title}
                </a> ＠${json[i].prefecture.name_ja}
                <br/>
                ${json[i].phtotographer.name} ／
                <a href="https://find47.jp/ja/" target="_blank" rel="noopener noreferrer">FIND/47</a>
                （<a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">
              CC表示4.0 国際</a>）
                `;
              break;
            }
          }
        });
        break;
      case "ghibli":
        this.#setBg_(
          `https://www.ghibli.jp/gallery/${
            this.#ghibli[this.#nowDisp[1]].url
          }${("000" + (Number(this.#nowDisp[2]) + 1)).slice(-3)}.jpg`
        );
        this.#desc.innerHTML = `
        <a href="https://www.ghibli.jp/works/${
          this.#ghibli[this.#nowDisp[1]].url
        }/" target="_blank" rel="noopener noreferrer">
          「${this.#ghibli[this.#nowDisp[1]].title}」
          ${this.#ghibli[this.#nowDisp[1]].copyright}
          </a>`;

        break;
    }
  }

  #setBg_(img_url) {
    console.log("setBg_");
    this.#target.setAttribute(
      "style",
      `background:${
        this.#colorSel.value
      } url("${img_url}") no-repeat border-box center / cover fixed content-box;`
    );
    Cookies.set("bg",img_url);
  }

  // FIND47系処理
  #initFind47() {
    // 一覧リスト生成
    this.#find47json = fetch(
      "https://raw.githubusercontent.com/code4fukui/find47/main/images.json"
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        console.log(json.images);
        return json.images;
      });
    // 都道府県別リスト生成
    this.#find47photos = this.#find47json.then((json) => {
      // 都道府県分類
      let photos = new Array(47);
      for (let i = 0; i < photos.length; i++) {
        photos[i] = [];
      }
      for (let i = 0; i < json.length; i++) {
        photos[json[i].prefecture.code - 1].push(json[i]);
      }
      console.log(photos);
      return photos;
    });
  }

  // 汎用
  // option要素生成
  #getOption(tx, val) {
    let opt = document.createElement("option");
    opt.value = val;
    opt.innerText = tx;
    return opt;
  }
  // 画像リスト要素生成
  #setImgItem(ele, src, value, alt) {
    let radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "bgPhotoList";
    radio.value = value;
    radio.id = "bgPhotoList_" + value;
    let label = document.createElement("label");
    label.setAttribute("for", "bgPhotoList_" + value);
    label.innerHTML = `<img src="${src}" alt="${alt}">`;
    ele.appendChild(radio);
    ele.appendChild(label);
  }
}
