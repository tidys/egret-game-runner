class SetLayer extends eui.Component {
    private replay:eui.Image;
    private began:eui.Image;
    private home:eui.Image;

    public constructor() {
        super();
        this.skinName = "SetLayerSkin";
        this.replay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReplay, this);
        this.began.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBegan, this);
        this.home.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            SoundMgr.playBtnMusic();
            Director.getInstance().repleaceScene(new HomeLayer());
        }, this);
    }

    private onReplay() {
        SoundMgr.playMusicOnce("");
        Director.getInstance().repleaceScene(new GameScene());
    }

    private onBegan() {
        SoundMgr.playBtnMusic();
        Director.getInstance().popScene();
        EventMgr.getInstance().dispatchEventWith(MsgMgr.data.ReturnGame, false, []);
    }
}