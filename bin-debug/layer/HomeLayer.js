var HomeLayer = (function (_super) {
    __extends(HomeLayer, _super);
    function HomeLayer() {
        _super.call(this);
        this.skinName = "HomeLayerSkin";
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);
    }
    var d = __define,c=HomeLayer,p=c.prototype;
    p.removeStage = function () {
        EventMgr.getInstance().removeEventListener(MsgMgr.netData.GetQuestions, this.onNet, this);
    };
    p.addStage = function () {
        this.rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoRankLayer, this);
        this.descBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showDeacLayer, this);
        this.beganBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoBeganGame, this);
        EventMgr.getInstance().addEventListener(MsgMgr.netData.GetQuestions, this.onNet, this);
        this.initNet();
        //this.getStudent();
    };
    // 获取题库
    p.onNet = function (para) {
        var data = (para.data);
        if (data.code == 1) {
            GameData.setQue(data.data);
        }
        else if (data.code == 0) {
            console.log(data.data);
        }
    };
    p.initNet = function () {
        var school = getAid();
        if (school) {
        }
        else {
            school = "20";
        }
        var data = { aid: school, level: "easy" };
        var net = new NetHttpSendData(MsgMgr.netData.GetQuestions, data);
        NetHttp.getInstance().sendData(net, "getQuestions");
    };
    p.getStudent = function () {
        var data = { openid: GameData.openid };
        var net = new NetHttpSendData(MsgMgr.netData.GetUserInfo, data);
        NetHttp.getInstance().sendData(net, "getStudent");
    };
    p.gotoRankLayer = function () {
        SoundMgr.playBtnMusic();
        Director.getInstance().pushScene(new RankLayer());
    };
    p.gotoBeganGame = function () {
        SoundMgr.playBtnMusic();
        Director.getInstance().gotoSelectRoleLayer();
        return;
        // 有角色就直接进入游戏,没有进入选择角色界面
        if (GameData.roleId == 0) {
            Director.getInstance().repleaceScene(new SelectRoleLayer());
        }
        else {
            Director.getInstance().repleaceScene(new GameScene());
        }
    };
    p.showDeacLayer = function () {
        SoundMgr.playBtnMusic();
        Director.getInstance().pushScene(new DescLayer());
    };
    return HomeLayer;
}(eui.Component));
egret.registerClass(HomeLayer,'HomeLayer');
