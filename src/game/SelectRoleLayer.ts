class SelectRoleLayer extends eui.Component {
    private began:eui.Image;

    private role1:eui.Image;
    private role2:eui.Image;

    private roleSelectBoard1:eui.Image;
    private roleSelectBoard2:eui.Image;

    private boy;
    private girl;

    public constructor() {
        super();
        this.skinName = "SelectRoleLayerSkin";
        this.began.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEnterGame, this);
        this.createBoy();
        this.createGirl();
        this.onSelectRole(0);
    }

    private onSelectRole1() {
        SoundMgr.playBtnMusic();
        this.onSelectRole(1);
    }

    private onSelectRole2() {
        SoundMgr.playBtnMusic();
        this.onSelectRole(2);
    }

    private onSelectRole(index) {
        GameData.roleId = index;
        if (index == 1) {
            this.roleSelectBoard1.visible = true;
            this.roleSelectBoard2.visible = false;
        } else if (index == 2) {
            this.roleSelectBoard1.visible = false;
            this.roleSelectBoard2.visible = true;
        } else {
            this.roleSelectBoard1.visible = false;
            this.roleSelectBoard2.visible = false;
        }
    }

    private onEnterGame() {
        SoundMgr.playBtnMusic();
        if (GameData.roleId != 0) {
            Director.getInstance().gotoGame();
        } else {
            new Tips().show("请选择角色!");
        }
    }

    private createBoy() {
        this.boy = new Player(1);
        this.boy.x = 266;
        this.boy.idle();
        this.boy.setScale(0.2);
        this.boy.y = 472;
        this.addChild(this.boy);
        this.boy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelectRole1, this);

    }

    private createGirl() {
        this.girl = new Player(2);
        this.girl.x = 765;
        this.girl.idle();
        this.girl.setScale(0.2);
        this.girl.y = 472;
        this.girl.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelectRole2, this);
        this.addChild(this.girl);
    }
}