class Player extends eui.Component {
    private mc;
    private db;
    public speedX = 0;
    public speedY = 0;

    private rushSpeed = 20;// 加速速度
    public normalSpeed = 10;// 普通速度
    private slowDownSpeed = 7;// 减速速度

    private jumpHeight = 150;
    private id = 0;
    public isJump = false;
    public jumpBeganY = 0;

    private twNode;

    public constructor(roleid) {
        super();
        this.speedX = this.normalSpeed;
        this.width = 50;
        this.height = 220;
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height;
        this.twNode = new eui.Image();
        this.addChild(this.twNode);
        //this.drawLine();
        //this.createMan();
        this.initDB(roleid);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);
    }


    public moveYUp() {
        this.speedY = -5;
    }

    public moveYStop() {
        this.speedY = 0;
    }

    public moveYDown() {
        this.speedY = 5;
    }

    private drawLine() {
        var shp:egret.Shape = new egret.Shape();
        shp.graphics.lineStyle(2, 0x00ff00);
        shp.graphics.moveTo(0, 0);
        shp.graphics.lineTo(this.width, 0);

        shp.graphics.moveTo(this.width, 0);
        shp.graphics.lineTo(this.width, this.height);

        shp.graphics.moveTo(this.width, this.height);
        shp.graphics.lineTo(0, this.height);

        shp.graphics.moveTo(0, this.height);
        shp.graphics.lineTo(0, 0);

        shp.graphics.lineStyle(2, 0x00ffff);
        shp.graphics.moveTo(0, this.height - GameData.trackHeight);
        shp.graphics.lineTo(this.width, this.height - GameData.trackHeight);
        shp.graphics.moveTo(0, this.height + GameData.trackHeight);
        shp.graphics.lineTo(this.width, this.height + GameData.trackHeight);
        shp.graphics.endFill();
        this.addChild(shp);
    }

    private createMan() {
        this.mc = AnimationUtil.makeAni("man");
        this.mc.gotoAndPlay("run", -1);
        this.mc.y = this.height;
        this.mc.x = this.width / 2;
        this.addChild(this.mc);
    }

    private initDB(roleId) {
        var armature:any = null;
        if (roleId == 1) {
            // 男
            armature = AnimationUtil.makeDB("boyAni_json", "textureBoy_json", "textureBoy_png", "Armature");
        } else if (roleId == 2) {
            // 女
            armature = AnimationUtil.makeDB("girlAni_json", "textureGirl_json", "textureGirl_png", "Armature");
        }
        if (armature) {
            armature.addEventListener(dragonBones.AnimationEvent.START, this.onArmStart, this);
            armature.addEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.onArmLoopComplete, this);
            armature.addEventListener(dragonBones.FrameEvent.ANIMATION_FRAME_EVENT, this.onFrameEvent, this);
            this.addChild(armature.display);
            armature.display.x = this.width / 2;
            armature.display.y = this.height;
            armature.display.scaleX = -0.15;
            armature.display.scaleY = 0.15;
            armature.animation.gotoAndPlay("run", -1, -1, 0);

            this.db = armature;

        }
    }

    public setScale(scale) {
        if (this.db) {
            this.db.display.scaleX = -scale;
            this.db.display.scaleY = scale;
        }
    }

    private onArmStart(evt:dragonBones.FrameEvent) {
        console.log("armature 开始播放动画！");
    }

    private onArmLoopComplete(evt:dragonBones.FrameEvent) {
        console.log("armature 动画播放完一轮完成！");
    }

    private onFrameEvent(evt:dragonBones.FrameEvent) {
        console.log("armature 播放到了一个关键帧！ 帧标签为：", evt.frameLabel);
    }

    private removeStage() {
        if (this.db) {
            this.db.removeEventListener(dragonBones.AnimationEvent.START, this.onArmStart, this);
            this.db.removeEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.onArmLoopComplete, this);
            this.db.removeEventListener(dragonBones.FrameEvent.ANIMATION_FRAME_EVENT, this.onFrameEvent, this);
            AnimationUtil.cleanDB(this.db);
        }
    }

    public jump() {
        if (this.isJump == false) {
            this.isJump = true;
            this.jumpBeganY = this.y;

            var tw = egret.Tween.get(this);
            tw.call(function () {
                    this.playJumpAct();
                }, this)
                .to({y: this.jumpBeganY - this.jumpHeight}, 500, egret.Ease.cubicOut)
                .to({y: this.jumpBeganY}, 1500, egret.Ease.cubicIn)
                .call(function () {
                    this.playRunAct();
                    this.jumpBeganY = this.y;
                    this.isJump = false;
                }, this);
        }
    }

    private playJumpAct() {
        //if (this.mc) {
        //    this.mc.gotoAndPlay("jump", 1);
        //}
        if (this.db) {
            this.db.animation.gotoAndPlay("jump", -1, -1, 1);
        }
    }

    private playRunAct() {
        //if (this.mc) {
        //    this.mc.gotoAndPlay("run", -1);
        //}
        if (this.db) {
            this.db.animation.gotoAndPlay("run", -1, -1, 0);
        }
    }

    public idle() {
        if (this.db) {
            this.db.animation.gotoAndPlay("idle", -1, -1, 0);
        }
    }

    public rush() {
        SoundMgr.playMusicOnce("rush_mp3");
        this.speedX = this.rushSpeed;
        this.db.animation.timeScale = 2;
        egret.Tween.removeTweens(this.twNode);
        var tw = egret.Tween.get(this.twNode);
        tw.wait(4000).call(function () {
            this.db.animation.timeScale = 1;
            this.speedX = this.normalSpeed;
        }, this);
    }

    public slowDown() {
        this.speedX = this.slowDownSpeed;
        this.db.animation.timeScale = 0.5;

        egret.Tween.removeTweens(this.twNode);
        var tw = egret.Tween.get(this.twNode);
        tw.wait(4000).call(function () {
            this.db.animation.timeScale = 1;

            this.speedX = this.normalSpeed;
        }, this);
    }
}
