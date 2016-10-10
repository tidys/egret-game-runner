var SetLayer = (function (_super) {
    __extends(SetLayer, _super);
    function SetLayer() {
        _super.call(this);
        this.skinName = "SetLayerSkin";
        this.replay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReplay, this);
        this.began.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBegan, this);
        this.home.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            SoundMgr.playBtnMusic();
            Director.getInstance().repleaceScene(new HomeLayer());
        }, this);
    }
    var d = __define,c=SetLayer,p=c.prototype;
    p.onReplay = function () {
        SoundMgr.playMusicOnce("");
        Director.getInstance().repleaceScene(new GameScene());
    };
    p.onBegan = function () {
        SoundMgr.playBtnMusic();
        Director.getInstance().popScene();
        EventMgr.getInstance().dispatchEventWith(MsgMgr.data.ReturnGame, false, []);
    };
    return SetLayer;
}(eui.Component));
egret.registerClass(SetLayer,'SetLayer');
