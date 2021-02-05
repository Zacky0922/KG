
//  整形
/*  元々結合されていたセルについて、コピペの際に下の行が空なら、
    1つ上の行のデータを複製する。
    最初の行だけは、必ず中身があることを確認すること。
*/
function fixJson(json) {
    for (let i = 1; i < json.length; i++) {
        for (let j in ["yobi","grade","class"]) {
            if (json[i][j] == "") {
                json[i][j] = json[i - 1][j];
            }
        }
    }
    return json;
}