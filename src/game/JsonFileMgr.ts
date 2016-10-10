class JsonFileMgr {
    public static getRightWordByIndex(index) {
        var json = RES.getRes("tipsWord_json");
        for (var k in json) {
            var item = json[k];
            if (item['type'] == "right" && item['index'] == index) {
                return item['word'];
            }
        }
        return null;
    }

    public static getErrorWordByIndex(index) {
        var json = RES.getRes("tipsWord_json");
        for (var k in json) {
            var item = json[k];
            if (item['type'] == "error" && item['index'] == index) {
                return item['word'];
            }
        }
        return null;
    }
}