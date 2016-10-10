var DescLayer = (function (_super) {
    __extends(DescLayer, _super);
    function DescLayer() {
        _super.call(this);
        this.skinName = "DescLayerSkin";
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
    }
    var d = __define,c=DescLayer,p=c.prototype;
    p.addStage = function () {
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.word.text = "1.在游戏关卡中，需要作答20道题。\n" +
            "2.在答题过程中有计时功能，答错一题，增加5秒答题时间。\n" +
            "3.答题耗时越少，排名越靠前。\n" +
            "4.20道题目，答对15题及15题以上判定为合格。";
    };
    p.onClose = function () {
        SoundMgr.playBtnMusic();
        Director.getInstance().popScene();
    };
    return DescLayer;
}(eui.Component));
egret.registerClass(DescLayer,'DescLayer');
