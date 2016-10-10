// 发送消息结构
var NetHttpSendData = (function () {
    function NetHttpSendData(msg, data) {
        this.msg = "";
        this.data = {};
        this.msg = msg;
        this.data = data;
    }
    var d = __define,c=NetHttpSendData,p=c.prototype;
    p.format = function () {
        this.data = JSON.stringify(this.data);
    };
    return NetHttpSendData;
}());
egret.registerClass(NetHttpSendData,'NetHttpSendData');
// 接受消息结构
var NetHttpRecvData = (function () {
    function NetHttpRecvData(retData) {
        this.msg = "";
        this.code = 0;
        this.data = {};
        var json = JSON.parse(retData);
        this.msg = json["msg"];
        this.code = json["code"];
        this.data = json["data"];
    }
    var d = __define,c=NetHttpRecvData,p=c.prototype;
    return NetHttpRecvData;
}());
egret.registerClass(NetHttpRecvData,'NetHttpRecvData');
// 事件管理
var EventMgr = (function (_super) {
    __extends(EventMgr, _super);
    function EventMgr() {
        _super.apply(this, arguments);
    }
    var d = __define,c=EventMgr,p=c.prototype;
    EventMgr.getInstance = function () {
        if (this.instance == null) {
            this.instance = new EventMgr();
        }
        return this.instance;
    };
    EventMgr.instance = null;
    return EventMgr;
}(egret.EventDispatcher));
egret.registerClass(EventMgr,'EventMgr');
