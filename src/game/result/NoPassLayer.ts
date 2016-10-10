class NoPassLayer extends eui.Component {
    private shareBtn:eui.Image;
    private replayBtn:eui.Image;
    private home:eui.Image;

    private answerLabel:eui.Label;

    public constructor() {
        super();
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

    private onShare() {
        SoundMgr.playBtnMusic();
        console.log("分享");
    }

    private onReplay() {
        SoundMgr.playBtnMusic();
        Director.getInstance().repleaceScene(new GameScene());
    }
}