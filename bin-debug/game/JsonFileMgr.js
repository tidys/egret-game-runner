var JsonFileMgr = (function () {
    function JsonFileMgr() {
    }
    var d = __define,c=JsonFileMgr,p=c.prototype;
    JsonFileMgr.getRightWordByIndex = function (index) {
        var json = RES.getRes("tipsWord_json");
        for (var k in json) {
            var item = json[k];
            if (item['type'] == "right" && item['index'] == index) {
                return item['word'];
            }
        }
        return null;
    };
    JsonFileMgr.getErrorWordByIndex = function (index) {
        var json = RES.getRes("tipsWord_json");
        for (var k in json) {
            var item = json[k];
            if (item['type'] == "error" && item['index'] == index) {
                return item['word'];
            }
        }
        return null;
    };
    return JsonFileMgr;
}());
egret.registerClass(JsonFileMgr,'JsonFileMgr');
