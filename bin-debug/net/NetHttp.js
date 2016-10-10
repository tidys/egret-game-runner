var NetHttp = (function () {
    function NetHttp() {
        this._url = null;
        this.URLLoader = null;
        this._url = "http://bookgo.com.cn/api/api/";
        //this._url = "http://meirenji.wicp.net/api/api/";
        //this._url = "http://www.tuling123.com/openapi/api";
        //ths._url = "http://bookgo.com.cn/index.php?s=/api/api/getStudent/openid/obzWcwJ4TaNGAdREKdIVoKs7cfbM";
        this.init();
    }
    var d = __define,c=NetHttp,p=c.prototype;
    p.init = function () {
        this.URLLoader = new egret.URLLoader();
        this.URLLoader.addEventListener(egret.Event.COMPLETE, this.onRecvData, this);
        this.URLLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this);
        this.URLLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
    };
    NetHttp.getInstance = function () {
        if (this.instance == null) {
            this.instance = new NetHttp();
        }
        return this.instance;
    };
    p.sendData = function (data, postfix) {
        if (this.URLLoader) {
            //data.format();
            var urlVariables = new egret.URLVariables();
            var senData = { msg: data.msg, data: data.data };
            var sendStr = JSON.stringify(senData);
            egret.log("[http 发送数据>>:] " + sendStr);
            urlVariables.variables = sendStr; // 具体的请求内容
            var request = new egret.URLRequest();
            request.method = egret.URLRequestMethod.POST; //请求方式
            //request.requestHeaders.push(new egret.URLRequestHeader("Content-Type", "application/x-www-form-urlencoded"));
            request.url = this._url + postfix; // 请求地址
            request.data = urlVariables;
            this.URLLoader.load(request);
        }
    };
    p.onError = function () {
        console.log("服务器响应失败");
    };
    p.onRecvData = function (event) {
        var loader = event.target;
        var text = loader.data;
        egret.log("[http 返回数据<<:] " + text);
        var recvData = new NetHttpRecvData(text);
        if (recvData.msg) {
            EventMgr.getInstance().dispatchEventWith(recvData.msg, false, recvData);
        }
    };
    NetHttp.instance = null;
    return NetHttp;
}());
egret.registerClass(NetHttp,'NetHttp');
