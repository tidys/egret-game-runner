var WXJSSDK = (function () {
    function WXJSSDK() {
        this.url = "http://wechat-2a704.codingapp.com/sign.php"; // 请求配置的url
        //初始化分享内容
        WXJSSDK.instance = this;
        this.title = "【分享】警惕这些身体求救信号";
        this.desc = "困了就要睡觉，渴了就要喝水，累了就要休息，烦了就要发泄……这些我们都明白，其实有时候身体就会向你发出这样一些健康信号，可惜的是，很多人往往不在意！";
        this.link = "http://mp.weixin.qq.com/s?biz=MjM5MTIxMzYxMQ==&mid=207223086&idx=1&sn=08bf703c6750bfc88de4317ee1d2d9e6#rd";
        this.imgUrl = "http://mmbiz.qpic.cn/mmbiz/OvWLC4Ooz2bM8cePicfRaRk0ibWvMH7zvr2ARsDF36D9Q3U2kJuiaAR1FusBKiaCJ7h598NjaNYRuicicQTBpr3dFcbg/640?tp=webp";
    }
    var d = __define,c=WXJSSDK,p=c.prototype;
    WXJSSDK.getInstance = function () {
        if (WXJSSDK.instance == null) {
            WXJSSDK.instance = new WXJSSDK();
        }
        return WXJSSDK.instance;
    };
    // 获取配置
    p.init = function () {
        var _this = this;
        var sendData = { aid: getAid() };
        var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(this.url);
        urlloader.load(req);
        req.method = egret.URLRequestMethod.POST;
        var urlVariables = new egret.URLVariables();
        var sendStr = JSON.stringify(sendData);
        console.log("[请求微信配置:] " + sendStr);
        urlVariables.variables = sendStr; // 具体的请求内容
        req.data = urlVariables;
        urlloader.addEventListener(egret.Event.COMPLETE, function (e) {
            // 返回的数据格式
            //{"appId":"微信应用ID","nonceStr":"随机码","timestamp":时间戳,"url":"动态分享地址,注意去掉#后面的","signature":"生成的签名","rawString":"原生地址串"}
            _this.signPackage = JSON.parse(e.target.data);
            //基本配置
            _this.initWxCfg();
            //下面可以加更多接口,可自行扩展
            //this.shareTimeline();//分享朋友圈
            //this.shareAppMessage();//分享朋友
            //this.shareQQ();//分享QQ
            //this.shareWeiBo();//分享到腾讯微博
        }, this);
    };
    /**
     * 获取微信配置
     */
    p.initWxCfg = function () {
        /*
         * 注意：
         * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
         * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
         * 3. 完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
         *
         * 如有问题请通过以下渠道反馈：
         * 邮箱地址：weixin-open@qq.com
         * 邮件主题：【微信JS-SDK反馈】具体问题
         * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
         * 确认签名算法正确，可用 http://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=jsapisign 页面工具进行校验。
         */
        //配置参数
        var bodyConfig = new BodyConfig();
        bodyConfig.debug = true; // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        bodyConfig.appId = this.signPackage.appId; // 必填，公众号的唯一标识
        bodyConfig.timestamp = this.signPackage.timestamp; // 必填，生成签名的时间戳
        bodyConfig.nonceStr = this.signPackage.nonceStr; // 必填，生成签名的随机串
        bodyConfig.signature = this.signPackage.signature; // 必填，签名，见附录1
        bodyConfig.jsApiList = [
            // 所有要调用的 API 都要加到这个列表中
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'hideMenuItems',
            'showMenuItems',
            'hideAllNonBaseMenuItem',
            'showAllNonBaseMenuItem',
            'translateVoice',
            'startRecord',
            'stopRecord',
            'playVoice',
            'pauseVoice',
            'stopVoice',
            'uploadVoice',
            'downloadVoice',
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage',
            'getNetworkType',
            'openLocation',
            'getLocation',
            'hideOptionMenu',
            'showOptionMenu',
            'closeWindow',
            'scanQRCode',
            'chooseWXPay',
            'openProductSpecificView',
            'addCard',
            'chooseCard',
            'openCard' //查看微信卡包中的卡券接口
        ];
        wx.config(bodyConfig);
        wx.ready(function (a, b) {
            // 验证成功
            WXJSSDK.isSuccess = true;
            console.log("微信配置成功");
        });
        wx.error(function () {
            // 验证失败
            WXJSSDK.isSuccess = false;
            console.log("微信配置失败");
        });
    };
    /**
     * 获取微信分享到朋友圈
     */
    p.shareTimeline = function () {
        if (WXJSSDK.isSuccess == false) {
            console.log("微信配置失败,不能分享");
            return;
        }
        var bodyMenuShareTimeline = new BodyMenuShareTimeline();
        bodyMenuShareTimeline.title = this.title;
        bodyMenuShareTimeline.link = this.link;
        bodyMenuShareTimeline.imgUrl = this.imgUrl;
        bodyMenuShareTimeline.trigger = function () {
            alert('用户点击分享到朋友圈');
        };
        bodyMenuShareTimeline.success = function () {
            alert('已分享');
        };
        bodyMenuShareTimeline.cancel = function () {
            alert('已取消');
        };
        bodyMenuShareTimeline.fail = function (res) {
            alert(JSON.stringify(res));
        };
        bodyMenuShareTimeline.trigger = function () {
            alert("trigger");
        };
        wx.onMenuShareTimeline(bodyMenuShareTimeline);
        //alert('已注册获取“分享到朋友圈”状态事件');
    };
    ;
    /**
     * 获取微信分享到朋友
     */
    p.shareAppMessage = function () {
        if (WXJSSDK.isSuccess == false) {
            console.log("微信配置失败,不能分享");
            return;
        }
        var bodyMenuShareAppMessage = new BodyMenuShareAppMessage();
        bodyMenuShareAppMessage.title = this.title;
        bodyMenuShareAppMessage.desc = this.desc;
        bodyMenuShareAppMessage.link = this.link;
        bodyMenuShareAppMessage.imgUrl = this.imgUrl;
        bodyMenuShareAppMessage.trigger = function () {
            alert('用户点击发送给朋友');
        };
        bodyMenuShareAppMessage.success = function () {
            alert('已分享');
        };
        bodyMenuShareAppMessage.cancel = function () {
            alert('已取消');
        };
        bodyMenuShareAppMessage.fail = function (res) {
            alert(JSON.stringify(res));
        };
        wx.onMenuShareAppMessage(bodyMenuShareAppMessage);
        //alert('已注册获取“发送给朋友”状态事件');
    };
    ;
    /**
     * 获取微信分享到QQ
     */
    p.shareQQ = function () {
        if (WXJSSDK.isSuccess == false) {
            console.log("微信配置失败,不能分享");
            return;
        }
        var bodyMenuShareQQ = new BodyMenuShareQQ();
        bodyMenuShareQQ.title = this.title;
        bodyMenuShareQQ.desc = this.desc;
        bodyMenuShareQQ.link = this.link;
        bodyMenuShareQQ.imgUrl = this.imgUrl;
        bodyMenuShareQQ.trigger = function () {
            alert('用户点击分享到QQ');
        };
        bodyMenuShareQQ.complete = function (res) {
            alert(JSON.stringify(res));
        };
        bodyMenuShareQQ.success = function () {
            alert('已分享');
        };
        bodyMenuShareQQ.cancel = function () {
            alert('已取消');
        };
        bodyMenuShareQQ.fail = function (res) {
            alert(JSON.stringify(res));
        };
        wx.onMenuShareQQ(bodyMenuShareQQ);
        //alert('已注册获取“分享到QQ”状态事件');
    };
    /**
     * 获取微信分享到腾讯微博
     */
    p.shareWeiBo = function () {
        if (WXJSSDK.isSuccess == false) {
            console.log("微信配置失败,不能分享");
            return;
        }
        var bodyMenuShareWeibo = new BodyMenuShareWeibo();
        bodyMenuShareWeibo.title = this.title;
        bodyMenuShareWeibo.desc = this.desc;
        bodyMenuShareWeibo.link = this.link;
        bodyMenuShareWeibo.imgUrl = this.imgUrl;
        bodyMenuShareWeibo.trigger = function () {
            alert('用户点击分享到微博');
        };
        bodyMenuShareWeibo.complete = function (res) {
            alert(JSON.stringify(res));
        };
        bodyMenuShareWeibo.success = function () {
            alert('已分享');
        };
        bodyMenuShareWeibo.cancel = function () {
            alert('已取消');
        };
        bodyMenuShareWeibo.fail = function (res) {
            alert(JSON.stringify(res));
        };
        wx.onMenuShareWeibo(bodyMenuShareWeibo);
        //alert('已注册获取“分享到微博”状态事件');
    };
    WXJSSDK.isSuccess = false;
    WXJSSDK.instance = null;
    return WXJSSDK;
}());
egret.registerClass(WXJSSDK,'WXJSSDK');
