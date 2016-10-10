var NoPassLayer = (function (_super) {
    __extends(NoPassLayer, _super);
    function NoPassLayer() {
        _super.call(this);
        this.skinName = "NoPassLayerSkin";
        this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShare, this);
        this.replayBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReplay, this);
        this.home.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            SoundMgr.playBtnMusic();
            Director.getInstance().repleaceScene(new HomeLayer());
        }, this);
        this.answerLabel.text = "共答对" + GameData.countRight + "题,耗时" + GameData.time + "s";
        SoundMgr.playMusicOnce("lose_mp3");
    }
    var d = __define,c=NoPassLayer,p=c.prototype;
    p.onShare = function () {
        SoundMgr.playBtnMusic();
        console.log("分享");
    };
    p.onReplay = function () {
        SoundMgr.playBtnMusic();
        Director.getInstance().repleaceScene(new GameScene());
    };
    return NoPassLayer;
}(eui.Component));
egret.registerClass(NoPassLayer,'NoPassLayer');
