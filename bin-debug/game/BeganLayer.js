var BeganLayer = (function (_super) {
    __extends(BeganLayer, _super);
    function BeganLayer() {
        _super.call(this);
        this.skinName = "BeganLayerSkin";
        this.beganBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.bg.addEventListener(egret.TouchEvent.TOUCH_END, function (event) {
            var point1 = new egret.Point(event.localX, event.localY);
            console.log(point1);
            var point2 = this.localToGlobal(point1.x, point1.y);
            console.log(point2);
        }, this);
    }
    var d = __define,c=BeganLayer,p=c.prototype;
    p.onClose = function () {
        EventMgr.getInstance().dispatchEventWith(MsgMgr.data.BeganGame, false, []);
        Director.getInstance().popScene();
    };
    return BeganLayer;
}(eui.Component));
egret.registerClass(BeganLayer,'BeganLayer');
