var RankItem = (function (_super) {
    __extends(RankItem, _super);
    function RankItem() {
        _super.call(this);
        this.skinName = "RankItemSkin";
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
    }
    var d = __define,c=RankItem,p=c.prototype;
    p.initData = function (data) {
        this.data = data;
        this.initLv(data["rankLv"]);
        this.nameLabel.text = data['name'].toString();
        this.timeLabel.text = data['time'].toString();
    };
    p.initLv = function (lv) {
        if (lv.toString() == "1") {
            this.rankLv.visible = false;
            this.icon.visible = true;
            this.icon.source = "icon_no.01_png";
        }
        else if (lv.toString() == "2") {
            this.rankLv.visible = false;
            this.icon.visible = true;
            this.icon.source = "icon_no.02_png";
        }
        else if (lv.toString() == "3") {
            this.rankLv.visible = false;
            this.icon.visible = true;
            this.icon.source = "icon_no.03_png";
        }
        else {
            this.icon.visible = false;
            this.rankLv.visible = true;
            this.rankLv.text = "第" + lv + "名";
        }
    };
    p.addStage = function () {
    };
    p.setSelf = function () {
        this.bg.source = "ui_common02_png";
    };
    return RankItem;
}(eui.Component));
egret.registerClass(RankItem,'RankItem');
