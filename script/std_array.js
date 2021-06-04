
// CSV to array
// http://kentayamamoto.github.io/CSV-parse/
function CSV2array(strData, strDelimiter) {
    strDelimiter = (strDelimiter || ",");
    var objPattern = new RegExp(
        (
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
    );
    var arrData = [[]];
    var arrMatches = null;
    while (arrMatches = objPattern.exec(strData)) {
        var strMatchedDelimiter = arrMatches[1];
        if (
            strMatchedDelimiter.length &&
            (strMatchedDelimiter != strDelimiter)
        ) {
            arrData.push([]);
        }
        if (arrMatches[2]) {
            var strMatchedValue = arrMatches[2].replace(
                new RegExp("\"\"", "g"),
                "\""
            );
        } else {
            var strMatchedValue = arrMatches[3];
        }
        arrData[arrData.length - 1].push(strMatchedValue);
    }
    return (arrData);
}

// CSV to json
function CSV2json(csv) {
    let json = [];
    // 1行目から「項目名」の配列を生成する
    let data = CSV2array(csv, ",");
    let key = data[0];
    // 各行処理
    for (let i = 1; i < data.length; i++) {
        let row = new Object();
        for (let j = 0; j < key.length; j++) {
            row[key[j]] = data[i][j];
        }
        json.push(row);
    }
    return json;
}


// ソート
// 引数：2次元配列、キー列番号
function sort(a, key = 0) {
    let flag;
    let temp;
    while (true) {
        flag = true;
        for (let i = 0; i < a.length - 1; i++) {
            if (Number(a[i][key]) > Number(a[i + 1][key])) {
                temp = a[i];
                a[i] = a[i + 1];
                a[i + 1] = temp;
                flag = false;
            }
        }
        if (flag) { break; }
    }
    return a;
}