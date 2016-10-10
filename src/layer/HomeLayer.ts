class HomeLayer extends eui.Component {
    private rankBtn:eui.Button;
    private descBtn:eui.Button;
    private beganBtn:eui.Button;

    public constructor() {
        super();
        this.skinName = "HomeLayerSkin";
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);
    }

    private removeStage() {
        EventMgr.getInstance().removeEventListener(MsgMgr.netData.GetQuestions, this.onNet, this);
    }

    private addStage() {
        this.rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoRankLayer, this);
        this.descBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showDeacLayer, this);
        this.beganBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoBeganGame, this);

        EventMgr.getInstance().addEventListener(MsgMgr.netData.GetQuestions, this.onNet, this);
        this.initNet();
        //this.getStudent();
    }

    // 获取题库
    private onNet(para) {
        var data:NetHttpRecvData = <NetHttpRecvData>(para.data);
        if (data.code == 1) {
            GameData.setQue(data.data);
        } else if (data.code == 0) {
            console.log(data.data);
        }
    }

    private initNet() {
        var school = getAid();
        if (school) {

        } else {
            school = "20";
        }
        var data = {aid: school, level: "easy"};
        var net = new NetHttpSendData(MsgMgr.netData.GetQuestions, data);
        NetHttp.getInstance().sendData(net, "getQuestions");
    }

    private getStudent() {
        var data = {openid: GameData.openid};
        var net = new NetHttpSendData(MsgMgr.netData.GetUserInfo, data);
        NetHttp.getInstance().sendData(net, "getStudent");
    }

    private gotoRankLayer() {
        SoundMgr.playBtnMusic();
        Director.getInstance().pushScene(new RankLayer());
    }

    private gotoBeganGame() {
        SoundMgr.playBtnMusic();
        Director.getInstance().gotoSelectRoleLayer();
        return;
        // 有角色就直接进入游戏,没有进入选择角色界面
        if (GameData.roleId == 0) {
            Director.getInstance().repleaceScene(new SelectRoleLayer());
        } else {
            Director.getInstance().repleaceScene(new GameScene());
        }
    }

    private showDeacLayer() {
        SoundMgr.playBtnMusic();
        Director.getInstance().pushScene(new DescLayer());
    }
}
