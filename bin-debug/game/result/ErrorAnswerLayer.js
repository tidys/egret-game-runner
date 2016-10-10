var ErrorAnswerLayer = (function (_super) {
    __extends(ErrorAnswerLayer, _super);
    function ErrorAnswerLayer() {
        _super.call(this);
        EventMgr.getInstance().dispatchEventWith(MsgMgr.data.StopGameTimer, false, []);
        this.skinName = "ErrorAnswerLayerSkin";
        this.bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.text.text = JsonFileMgr.getErrorWordByIndex(GameData.countError);
        this.timer = new egret.Timer(1000, 3);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onClose, this);
        this.timer.start();
    }
    var d = __define,c=ErrorAnswerLayer,p=c.prototype;
    p.onClose = function () {
        if (this.timer) {
            this.timer.stop();
            this.timer = null;
        }
        Director.getInstance().popScene();
        EventMgr.getInstance().dispatchEventWith(MsgMgr.data.ResumeGame, false, []);
    };
    return ErrorAnswerLayer;
}(eui.Component));
egret.registerClass(ErrorAnswerLayer,'ErrorAnswerLayer');
