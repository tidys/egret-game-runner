class DescLayer extends eui.Component {
    private closeBtn:eui.Button;
    private word:eui.Label;

    public constructor() {
        super();
        this.skinName = "DescLayerSkin";
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);

    }

    private addStage() {
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.word.text = "1.在游戏关卡中，需要作答20道题。\n" +
            "2.在答题过程中有计时功能，答错一题，增加5秒答题时间。\n" +
            "3.答题耗时越少，排名越靠前。\n" +
            "4.20道题目，答对15题及15题以上判定为合格。";
    }

    private onClose() {
        SoundMgr.playBtnMusic();
        Director.getInstance().popScene();
    }
}