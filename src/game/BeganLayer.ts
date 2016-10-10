class BeganLayer extends eui.Component {
    private beganBtn:eui.Button;
    private bg:eui.Image;

    public constructor() {
        super();
        this.skinName = "BeganLayerSkin";

        this.beganBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.bg.addEventListener(egret.TouchEvent.TOUCH_END, function (event:egret.TouchEvent) {
            var point1 = new egret.Point(event.localX, event.localY);
            console.log(point1);
            var point2 = this.localToGlobal(point1.x, point1.y);
            console.log(point2);
        }, this);
    }

    private onClose() {
        EventMgr.getInstance().dispatchEventWith(MsgMgr.data.BeganGame, false, []);
        Director.getInstance().popScene();
    }
}