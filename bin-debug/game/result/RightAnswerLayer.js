var Direction = eui.Direction;
var RightAnswerLayer = (function (_super) {
    __extends(RightAnswerLayer, _super);
    function RightAnswerLayer() {
        _super.call(this);
        EventMgr.getInstance().dispatchEventWith(MsgMgr.data.StopGameTimer, false, []);
        this.skinName = "RightAnswerLayerSkin";
        this.bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.text.text = JsonFileMgr.getRightWordByIndex(GameData.countRight);
        this.timer = new egret.Timer(1000, 3);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onClose, this);
        this.timer.start();
    }
    var d = __define,c=RightAnswerLayer,p=c.prototype;
    p.onClose = function () {
        if (this.timer) {
            this.timer.stop();
            this.timer = null;
        }
        Director.getInstance().popScene();
        EventMgr.getInstance().dispatchEventWith(MsgMgr.data.ResumeGame, false, []);
    };
    return RightAnswerLayer;
}(eui.Component));
egret.registerClass(RightAnswerLayer,'RightAnswerLayer');
