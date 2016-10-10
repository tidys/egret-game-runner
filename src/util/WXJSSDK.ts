interface SignPackage {
    appId:string;
    nonceStr:string;
    timestamp:number;
    signature:string;
    url:string;
}

class WXJSSDK {
    private title;
    private desc;
    private link;
    private imgUrl;
    private url = "http://wechat-2a704.codingapp.com/sign.php";// 请求配置的url
    private signPackage:SignPackage;
    private static isSuccess = false;
    public static instance = null;

    public static getInstance() {
        if (WXJSSDK.instance == null) {
            WXJSSDK.instance = new WXJSSDK();

        }
        return WXJSSDK.instance;
    }

    public constructor() {
        //初始化分享内容
        WXJSSDK.instance = this;
        this.title = "【分享】警惕这些身体求救信号";
        this.desc = "困了就要睡觉，渴了就要喝水，累了就要休息，烦了就要发泄……这些我们都明白，其实有时候身体就会向你发出这样一些健康信号，可惜的是，很多人往往不在意！";
        this.link = "http://mp.weixin.qq.com/s?biz=MjM5MTIxMzYxMQ==&mid=207223086&idx=1&sn=08bf703c6750bfc88de4317ee1d2d9e6#rd";
        this.imgUrl = "http://mmbiz.qpic.cn/mmbiz/OvWLC4Ooz2bM8cePicfRaRk0ibWvMH7zvr2ARsDF36D9Q3U2kJuiaAR1FusBKiaCJ7h598NjaNYRuicicQTBpr3dFcbg/640?tp=webp";
    }

    // 获取配置
    public init() {
        var sendData = {aid: getAid()};

        var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(this.url);
        urlloader.load(req);
        req.method = egret.URLRequestMethod.POST;
        var urlVariables:egret.URLVariables = new egret.URLVariables();
        var sendStr = JSON.stringify(sendData);
        console.log("[请求微信配置:] " + sendStr);
        urlVariables.variables = sendStr;// 具体的请求内容
        req.data = urlVariables;
        urlloader.addEventListener(egret.Event.COMPLETE, (e)=> {
            // 返回的数据格式
            //{"appId":"微信应用ID","nonceStr":"随机码","timestamp":时间戳,"url":"动态分享地址,注意去掉#后面的","signature":"生成的签名","rawString":"原生地址串"}
            this.signPackage = <SignPackage>JSON.parse(e.target.data);
            //基本配置
            this.initWxCfg();
            //下面可以加更多接口,可自行扩展
            //this.shareTimeline();//分享朋友圈
            //this.shareAppMessage();//分享朋友
            //this.shareQQ();//分享QQ
            //this.shareWeiBo();//分享到腾讯微博
        }, this);
    }

    /**
     * 获取微信配置
     */
    private initWxCfg() {
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
        bodyConfig.debug = true;// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        bodyConfig.appId = this.signPackage.appId;// 必填，公众号的唯一标识
        bodyConfig.timestamp = this.signPackage.timestamp;// 必填，生成签名的时间戳
        bodyConfig.nonceStr = this.signPackage.nonceStr;// 必填，生成签名的随机串
        bodyConfig.signature = this.signPackage.signature;// 必填，签名，见附录1
        bodyConfig.jsApiList = [// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            // 所有要调用的 API 都要加到这个列表中
            'checkJsApi',//判断当前客户端是否支持指定JS接口
            'onMenuShareTimeline',//获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
            'onMenuShareAppMessage',//获取“分享给朋友”按钮点击状态及自定义分享内容接口
            'onMenuShareQQ',//获取“分享到QQ”按钮点击状态及自定义分享内容接口
            'onMenuShareWeibo',//获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
            'hideMenuItems',//批量隐藏功能按钮接口
            'showMenuItems',//批量显示功能按钮接口
            'hideAllNonBaseMenuItem',//隐藏所有非基础按钮接口
            'showAllNonBaseMenuItem',//显示所有功能按钮接口
            'translateVoice',//识别音频并返回识别结果接口
            'startRecord',//开始录音接口
            'stopRecord',//停止录音接口
            'playVoice',//播放语音接口
            'pauseVoice',//暂停播放接口
            'stopVoice',//停止播放接口
            'uploadVoice',//上传语音接口
            'downloadVoice',//下载语音接口
            'chooseImage',//拍照或从手机相册中选图接口
            'previewImage',//预览图片接口
            'uploadImage',//上传图片接口
            'downloadImage',//下载图片接口
            'getNetworkType',//获取网络状态接口
            'openLocation',//使用微信内置地图查看位置接口
            'getLocation',//获取地理位置接口
            'hideOptionMenu',//隐藏右上角菜单接口
            'showOptionMenu',//显示右上角菜单接口
            'closeWindow',//关闭当前网页窗口接口
            'scanQRCode',//调起微信扫一扫接口
            'chooseWXPay',//发起一个微信支付请求
            'openProductSpecificView',//跳转微信商品页接口
            'addCard',//批量添加卡券接口
            'chooseCard',//调起适用于门店的卡券列表并获取用户选择列表
            'openCard'//查看微信卡包中的卡券接口
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
    }

    /**
     * 获取微信分享到朋友圈
     */
    public shareTimeline() {
        if (WXJSSDK.isSuccess == false) {
            console.log("微信配置失败,不能分享");
            return;
        }
        var bodyMenuShareTimeline = new BodyMenuShareTimeline();
        bodyMenuShareTimeline.title = this.title;
        bodyMenuShareTimeline.link = this.link;
        bodyMenuShareTimeline.imgUrl = this.imgUrl;
        bodyMenuShareTimeline.trigger = ()=> {
            alert('用户点击分享到朋友圈');
        };
        bodyMenuShareTimeline.success = ()=> {
            alert('已分享');
        };
        bodyMenuShareTimeline.cancel = ()=> {
            alert('已取消');
        };
        bodyMenuShareTimeline.fail = (res)=> {
            alert(JSON.stringify(res));
        };
        bodyMenuShareTimeline.trigger = ()=> {
            alert("trigger");
        };
        wx.onMenuShareTimeline(bodyMenuShareTimeline);
        //alert('已注册获取“分享到朋友圈”状态事件');
    };

    /**
     * 获取微信分享到朋友
     */
    public shareAppMessage() {
        if (WXJSSDK.isSuccess == false) {
            console.log("微信配置失败,不能分享");
            return;
        }
        var bodyMenuShareAppMessage = new BodyMenuShareAppMessage();
        bodyMenuShareAppMessage.title = this.title;
        bodyMenuShareAppMessage.desc = this.desc;
        bodyMenuShareAppMessage.link = this.link;
        bodyMenuShareAppMessage.imgUrl = this.imgUrl;
        bodyMenuShareAppMessage.trigger = ()=> {
            alert('用户点击发送给朋友');
        };
        bodyMenuShareAppMessage.success = ()=> {
            alert('已分享');
        };
        bodyMenuShareAppMessage.cancel = ()=> {
            alert('已取消');
        };
        bodyMenuShareAppMessage.fail = (res)=> {
            alert(JSON.stringify(res));
        };
        wx.onMenuShareAppMessage(bodyMenuShareAppMessage);
        //alert('已注册获取“发送给朋友”状态事件');
    };

    /**
     * 获取微信分享到QQ
     */
    public shareQQ() {
        if (WXJSSDK.isSuccess == false) {
            console.log("微信配置失败,不能分享");
            return;
        }
        var bodyMenuShareQQ = new BodyMenuShareQQ();
        bodyMenuShareQQ.title = this.title;
        bodyMenuShareQQ.desc = this.desc;
        bodyMenuShareQQ.link = this.link;
        bodyMenuShareQQ.imgUrl = this.imgUrl;
        bodyMenuShareQQ.trigger = ()=> {
            alert('用户点击分享到QQ');
        };
        bodyMenuShareQQ.complete = (res)=> {
            alert(JSON.stringify(res));
        };
        bodyMenuShareQQ.success = ()=> {
            alert('已分享');
        };
        bodyMenuShareQQ.cancel = ()=> {
            alert('已取消');
        };
        bodyMenuShareQQ.fail = (res)=> {
            alert(JSON.stringify(res));
        };
        wx.onMenuShareQQ(bodyMenuShareQQ);
        //alert('已注册获取“分享到QQ”状态事件');
    }

    /**
     * 获取微信分享到腾讯微博
     */
    public shareWeiBo() {
        if (WXJSSDK.isSuccess == false) {
            console.log("微信配置失败,不能分享");
            return;
        }
        var bodyMenuShareWeibo = new BodyMenuShareWeibo();
        bodyMenuShareWeibo.title = this.title;
        bodyMenuShareWeibo.desc = this.desc;
        bodyMenuShareWeibo.link = this.link;
        bodyMenuShareWeibo.imgUrl = this.imgUrl;
        bodyMenuShareWeibo.trigger = ()=> {
            alert('用户点击分享到微博');
        };
        bodyMenuShareWeibo.complete = (res)=> {
            alert(JSON.stringify(res));
        };
        bodyMenuShareWeibo.success = ()=> {
            alert('已分享');
        };
        bodyMenuShareWeibo.cancel = ()=> {
            alert('已取消');
        };
        bodyMenuShareWeibo.fail = (res)=> {
            alert(JSON.stringify(res));
        };
        wx.onMenuShareWeibo(bodyMenuShareWeibo);
        //alert('已注册获取“分享到微博”状态事件');
    }
}