var SelectRoleLayer = (function (_super) {
    __extends(SelectRoleLayer, _super);
    function SelectRoleLayer() {
        _super.call(this);
        this.skinName = "SelectRoleLayerSkin";
        this.began.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEnterGame, this);
        this.createBoy();
        this.createGirl();
        this.onSelectRole(0);
    }
    var d = __define,c=SelectRoleLayer,p=c.prototype;
    p.onSelectRole1 = function () {
        SoundMgr.playBtnMusic();
        this.onSelectRole(1);
    };
    p.onSelectRole2 = function () {
        SoundMgr.playBtnMusic();
        this.onSelectRole(2);
    };
    p.onSelectRole = function (index) {
        GameData.roleId = index;
        if (index == 1) {
            this.roleSelectBoard1.visible = true;
            this.roleSelectBoard2.visible = false;
        }
        else if (index == 2) {
            this.roleSelectBoard1.visible = false;
            this.roleSelectBoard2.visible = true;
        }
        else {
            this.roleSelectBoard1.visible = false;
            this.roleSelectBoard2.visible = false;
        }
    };
    p.onEnterGame = function () {
        SoundMgr.playBtnMusic();
        if (GameData.roleId != 0) {
            Director.getInstance().gotoGame();
        }
        else {
            new Tips().show("请选择角色!");
        }
    };
    p.createBoy = function () {
        this.boy = new Player(1);
        this.boy.x = 266;
        this.boy.idle();
        this.boy.setScale(0.2);
        this.boy.y = 472;
        this.addChild(this.boy);
        this.boy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelectRole1, this);
    };
    p.createGirl = function () {
        this.girl = new Player(2);
        this.girl.x = 765;
        this.girl.idle();
        this.girl.setScale(0.2);
        this.girl.y = 472;
        this.girl.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelectRole2, this);
        this.addChild(this.girl);
    };
    return SelectRoleLayer;
}(eui.Component));
egret.registerClass(SelectRoleLayer,'SelectRoleLayer');
