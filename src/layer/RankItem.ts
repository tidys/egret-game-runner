class RankItem extends eui.Component {
    private rankLv:eui.Label;
    private timeLabel:eui.Label;
    private nameLabel:eui.Label;
    private icon:eui.Image;
    private bg:eui.Image;

    private data;

    public constructor() {
        super();
        this.skinName = "RankItemSkin";
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
    }

    public initData(data) {
        this.data = data;
        this.initLv(data["rankLv"]);
        this.nameLabel.text = data['name'].toString();
        this.timeLabel.text = data['time'].toString();
    }

    private initLv(lv) {
        if (lv.toString() == "1") {
            this.rankLv.visible = false;
            this.icon.visible = true;
            this.icon.source = "icon_no.01_png";
        } else if (lv.toString() == "2") {
            this.rankLv.visible = false;
            this.icon.visible = true;
            this.icon.source = "icon_no.02_png";
        } else if (lv.toString() == "3") {
            this.rankLv.visible = false;
            this.icon.visible = true;
            this.icon.source = "icon_no.03_png";
        } else {
            this.icon.visible = false;
            this.rankLv.visible = true;
            this.rankLv.text = "第" + lv + "名";
        }
    }

    private addStage() {

    }

    public setSelf() {
        this.bg.source = "ui_common02_png";
    }
}