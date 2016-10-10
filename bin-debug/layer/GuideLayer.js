var GuideLayer = (function (_super) {
    __extends(GuideLayer, _super);
    function GuideLayer() {
        _super.call(this);
        this.wordIndex = 0;
        this.wordArr = [
            "新同学你好，欢迎来到华中科技大学图书馆，我是这里的管理员华小图，未来几年，我会在这里一直陪着你学习，希望我们能成为朋友。",
            "我们的馆藏文献总量达到1002万册，涵盖理、工、医、文、管等九大学科门类，是国内数字文献最高的高校之一。",
            "作为我最好的朋友，现在我邀请你一起参加图书馆的“跑酷之旅”，其间我们要完成20个任务，回答20道与图书馆基本状况相关的问答题。你愿意和我一起在活动中加深对图书馆的了解吗？"
        ];
        this.skinName = "GuideLayerSkin";
        SoundMgr.playMusicLoop("bg_mp3");
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
        this.jumpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJump, this);
    }
    var d = __define,c=GuideLayer,p=c.prototype;
    p.addStage = function () {
        this.showNextWord();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    p.onTouch = function () {
        this.showNextWord();
    };
    p.onTestNet = function () {
        var data = { aid: 1, level: "easy" };
        var net = new NetHttpSendData(MsgMgr.netData.GetQuestions, data);
        NetHttp.getInstance()._url = "http://127.0.0.1:90/index.php";
        NetHttp.getInstance().sendData(net, "");
    };
    p.onJump = function (touch) {
        touch.stopImmediatePropagation();
        WXJSSDK.getInstance().shareTimeline(); // 分享到朋友圈
        return;
        //this.onTestNet();
        //return;
        SoundMgr.playBtnMusic();
        Director.getInstance().gotoHomeLayer();
    };
    p.showNextWord = function () {
        if (this.wordIndex >= this.wordArr.length) {
            Director.getInstance().gotoHomeLayer();
        }
        else {
            this.word.text = this.wordArr[this.wordIndex];
            this.wordIndex++;
        }
    };
    return GuideLayer;
}(eui.Component));
egret.registerClass(GuideLayer,'GuideLayer');
