var PassLayer = (function (_super) {
    __extends(PassLayer, _super);
    function PassLayer() {
        _super.call(this);
        this.skinName = "PassLayerSkin";
        this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShare, this);
        this.replayBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReplay, this);
        this.home.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            SoundMgr.playBtnMusic();
            Director.getInstance().repleaceScene(new HomeLayer());
        }, this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);
        SoundMgr.playMusicOnce("win_mp3");
    }
    var d = __define,c=PassLayer,p=c.prototype;
    p.addStage = function () {
        var tw = egret.Tween.get(this.light, { loop: true });
        tw.to({ rotation: 360 }, 2500);
        this.answerLabel.text = this.scoreLabel.text = "";
        EventMgr.getInstance().addEventListener(MsgMgr.netData.GameResult, this.onNet, this);
        // student_id 微信用户唯一标识
        var aid = getAid();
        var data = {
            aid: aid,
            openid: GameData.openid,
            time: GameData.time,
            right: GameData.countRight,
            error: GameData.countError
        };
        var net = new NetHttpSendData(MsgMgr.netData.GameResult, data);
        NetHttp.getInstance().sendData(net, "postResult");
        if (GameData.countRight >= GameData.hegeNum) {
            // 合格
            this.hegeIcon.source = "ui_qualified_png";
        }
        else {
            // 不合格
            this.hegeIcon.source = "ui_fail_png";
        }
    };
    p.removeStage = function () {
        EventMgr.getInstance().removeEventListener(MsgMgr.netData.GameResult, this.onNet, this);
    };
    p.onNet = function (para) {
        var data = (para.data);
        if (data.code == 1) {
            var d = {
                "title": 1,
                "score": 10
            };
            var title = parseInt(data.data['title'].toString());
            //0未通过关卡
            //1我是新生（答题正确0-10题）
            //2游戏小能手（答题正确11-14题）
            //3平衡木少年（答题正确15-17题）
            //4我要当学霸（答题正确18-19题）
            //5最强新人王（答题正确20题）
            var iconArr = ["", "icon_gName_png", "icon_gName02_png", "icon_gName03_png", "icon_gName04_png", "icon_gName05_png"];
            this.titleIcon.source = iconArr[title];
            this.initResult(data.data['score']);
        }
        else if (data.code == 0) {
            console.log(data.data);
        }
    };
    p.initResult = function (score) {
        this.answerLabel.text = "共答对" + GameData.countRight + "题,耗时" + GameData.time + "s";
        this.scoreLabel.text = "本次获得" + score + "积分";
    };
    p.onShare = function () {
        SoundMgr.playBtnMusic();
        console.log("分享");
    };
    p.onReplay = function () {
        SoundMgr.playBtnMusic();
        Director.getInstance().repleaceScene(new GameScene());
    };
    return PassLayer;
}(eui.Component));
egret.registerClass(PassLayer,'PassLayer');
