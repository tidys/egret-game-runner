// 发送消息结构
class NetHttpSendData {
    public msg:string = "";
    public data = {};

    public constructor(msg:string, data) {
        this.msg = msg;
        this.data = data;
    }

    public format() {
        this.data = JSON.stringify(this.data);
    }
}

// 接受消息结构
class NetHttpRecvData {
    public msg:string = "";
    public code:number = 0;
    public data = {};

    public constructor(retData) {
        var json = JSON.parse(retData);
        this.msg = json["msg"];
        this.code = json["code"];
        this.data = json["data"];
    }
}

// 事件管理
class EventMgr extends egret.EventDispatcher {
    public static instance:EventMgr = null;

    public static getInstance() {
        if (this.instance == null) {
            this.instance = new EventMgr();
        }
        return this.instance;
    }
}
