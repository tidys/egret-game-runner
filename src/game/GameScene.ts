class GameScene extends eui.Component {
    private setBtn:eui.Image;
    private jumpBtn:eui.Button;
    private preCtrlPoint:egret.Point;
    private ctrlBtn:eui.Image;
    private timeLabel:eui.Label;

    private map:eui.Group;
    private bg1:eui.Image;
    private bg2:eui.Image;

    private player:Player;
    private isStopMove = false;

    private genBlockTimer:egret.Timer = null;
    private gameTimer:egret.Timer = null;

    public static instance:GameScene = null;

    public constructor() {
        super();
        this.skinName = "GameSceneSkin";
        GameScene.instance = this;
        BlockMgr.clean();
        GameData.gameReset();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onUpdate, this);
    }


    private onUpdate() {
        if (this.isStopMove == false) {
            if (this.player) {
                // 地图移动
                this.player.x += this.player.speedX;
                this.player.y += this.player.speedY;
                this.reIndex();
                this.adjustMoveY();
                var point = this.player.parent.localToGlobal(this.player.x, this.player.y);
                var movex = point.x - 200;
                this.map.x -= movex;
                // 背景替换
                this.updateBg();
                //this.updateSky();
            }
            // 碰撞检测
            this.updateCollide();
        }
    }

    // 对z进行重新排序
    private reIndex() {
        var arr = [this.player];
        for (var s in BlockMgr.arr) {
            arr.push(BlockMgr.arr[s]);
        }
        // 排序
        arr.sort(function (a, b) {
            if (a.y > b.y) {
                return 1;
            } else if (a.y < b.y) {
                return -1;
            } else {
                return 0;
            }
        });

        var indexZ = 2;
        for (var k in arr) {
            this.map.addChildAt(arr[k], indexZ);
            //temp.obj.parent.setChildIndex(temp.obj, indexZ);// 必须使用add操作
            indexZ++;
        }
    }

    private adjustMoveY() {
        if (this.player.isJump) {
            // 正在跳,不能上下动
            return false;
        } else {
            var y = this.player.y;
            if (y < 430) {
                this.player.y = 430;
                this.player.moveYStop();
                return false;
            } else if (y > 520) {
                this.player.y = 520;
                this.player.moveYStop();
                return false;
            } else {
                return true;
            }
        }
    }

    private updateSky() {
        //var delX = this.player.speedX / 10;
        //this.sky1.x -= delX;
        //this.sky2.x -= delX;
        //
        //var p1 = this.sky1.parent.localToGlobal(this.sky1.x, this.sky1.y);
        //if (p1.x < -this.sky1.width) {
        //    this.sky1.x = this.sky2.x + this.sky2.width;
        //}
        //
        //var p2 = this.sky2.parent.localToGlobal(this.sky2.x, this.sky2.y);
        //if (p2.x < -this.sky2.width) {
        //    this.sky2.x = this.sky1.x + this.sky1.width;
        //}
    }

    private updateBg() {
        var p1 = this.bg1.parent.localToGlobal(this.bg1.x, this.bg1.y);
        if (p1.x < -this.bg1.width) {
            this.bg1.x = this.bg2.x + this.bg2.width;
        }

        var p2 = this.bg2.parent.localToGlobal(this.bg2.x, this.bg2.y);
        if (p2.x < -this.bg2.width) {
            this.bg2.x = this.bg1.x + this.bg1.width;
        }
    }

    private updateCollide() {
        // 比较y坐标
        for (var k in BlockMgr.arr) {
            var item:Block = BlockMgr.arr[k];
            var playerY = this.player.y;
            var itemY = item.y;
            if (this.player.isJump) {
                playerY = this.player.jumpBeganY;// 如果正在跳,比较的应该是同一跑道上的
            }
            var dis = Math.abs(playerY - itemY);
            if (dis < GameData.trackHeight) {
                // 认为在同一个跑道上
                var b = this.hitTest(this.player, item);
                if (b) {
                    if (item.id == 0) {
                        // 答题
                        this.stop();
                        Director.getInstance().pushScene(new QueLayer());
                    } else if (item.id == 1) {
                        // 减速
                        this.player.slowDown();
                    } else if (item.id == 2) {
                        // 冲
                        this.player.rush();
                    } else if (item.id == 3) {
                        // 增加通关时间

                    }
                    item.clean();
                }
            } else {
                // 不在同一个跑道,查看是否和空中的物品有碰撞
                //if (item.id == 3) {
                //    b = this.hitTest(this.player, item);
                //}
            }

        }
    }

    public  hitTest(obj1:egret.DisplayObject, obj2:egret.DisplayObject):boolean {
        var rect1:egret.Rectangle = new egret.Rectangle(obj1.x, obj1.y, obj1.width, obj1.height);
        var rect2:egret.Rectangle = new egret.Rectangle(obj2.x, obj2.y, obj2.width, obj2.height);
        rect1.x = obj1.x;
        rect1.y = obj1.y;
        rect2.x = obj2.x;
        rect2.y = obj2.y;
        return rect1.intersects(rect2);
    }

    private onTimer() {
        GameData.time++;
        this.updateLabel();
    }

    private updateLabel() {
        this.timeLabel.text = "用时: " + GameData.time + "s" + "/" + GameData.gameTotalTime + "s    "
            + "答对: " + GameData.countRight + "/" + GameData.queTotalCount +
            " 答错: " + GameData.countError;
    }

    private initTimer() {
        this.genBlockTimer = new egret.Timer(2000, 0);
        this.genBlockTimer.addEventListener(egret.TimerEvent.TIMER, this.createBlock, this);
        this.genBlockTimer.start();

        this.gameTimer = new egret.Timer(1000, GameData.gameTotalTime);
        this.gameTimer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.gameTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onComplete, this);
        this.gameTimer.start();
    }

    private onComplete() {
        // 游戏失败结束
        this.gameOver();
        this.isStopMove = true;
        Director.getInstance().repleaceScene(new NoPassLayer());
    }

    private removeStage() {
        EventMgr.getInstance().removeEventListener(MsgMgr.data.BeganGame, this.onBeganGame, this);
        EventMgr.getInstance().removeEventListener(MsgMgr.data.ResumeGame, this.onResumeGame, this);
        EventMgr.getInstance().removeEventListener(MsgMgr.data.ReturnGame, this.onReturnGame, this);
        EventMgr.getInstance().removeEventListener(MsgMgr.data.StopGameTimer, this.onStopAnswerTimer, this);
        EventMgr.getInstance().removeEventListener(MsgMgr.data.UpdateNum, this.updateLabel, this);
        this.gameOver();
    }

    private initEvent() {
        EventMgr.getInstance().addEventListener(MsgMgr.data.BeganGame, this.onBeganGame, this);
        EventMgr.getInstance().addEventListener(MsgMgr.data.ResumeGame, this.onResumeGame, this);
        EventMgr.getInstance().addEventListener(MsgMgr.data.ReturnGame, this.onReturnGame, this);
        EventMgr.getInstance().addEventListener(MsgMgr.data.StopGameTimer, this.onStopAnswerTimer, this);
        EventMgr.getInstance().addEventListener(MsgMgr.data.UpdateNum, this.updateLabel, this);
    }

    private onBeganGame() {
        this.initTimer();
        this.createMan();
    }

    private onResumeGame() {
        this.resume();
    }

    private onReturnGame() {
        this.isStopMove = false;
        this.genBlockTimer.start();
        this.gameTimer.start();
    }

    private initUI() {
        this.timeLabel.text = "用时: " + GameData.time + "s" + "/" + GameData.gameTotalTime + "s    "
            + "答对: " + GameData.countRight + "/" + GameData.queTotalCount +
            " 答错: " + GameData.countError;

        this.jumpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJump, this);
        this.jumpBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            this.jumpBtn.scaleX = this.jumpBtn.scaleY = 0.8;
        }, this);
        this.jumpBtn.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            this.jumpBtn.scaleX = this.jumpBtn.scaleY = 1;
        }, this);
        this.jumpBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, function () {
            this.jumpBtn.scaleX = this.jumpBtn.scaleY = 1;
        }, this);

        this.setBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gamePause, this);

        this.ctrlBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (touch:egret.TouchEvent) {
            this.preCtrlPoint = new egret.Point(touch.stageX, touch.stageY);
        }, this);

        this.ctrlBtn.addEventListener(egret.TouchEvent.TOUCH_MOVE, function (touch:egret.TouchEvent) {
            var delY = touch.stageY - this.preCtrlPoint.y;
            var b = this.adjustMoveY();
            if (b) {
                if (touch.stageY > this.preCtrlPoint.y) {
                    this.player.moveYDown();
                } else if (touch.stageY < this.preCtrlPoint.y) {
                    this.player.moveYUp();
                } else {
                    this.player.moveYStop();
                }
            }
            this.ctrlBtn.y += delY;
            if (this.ctrlBtn.y < 150) {
                this.ctrlBtn.y = 150;
            } else if (this.ctrlBtn.y > 390) {
                this.ctrlBtn.y = 390;
            }
            this.preCtrlPoint = new egret.Point(touch.stageX, touch.stageY);
        }, this);
        this.ctrlBtn.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            this.player.moveYStop();
        }, this);
        this.ctrlBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, function () {
            this.player.moveYStop();
        }, this);

        //------------------------------
        this.chenggong.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            Director.getInstance().repleaceScene(new PassLayer());
        }, this);
        this.shibai.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            Director.getInstance().repleaceScene(new NoPassLayer());
        }, this);
        this.dati.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            Director.getInstance().pushScene(new QueLayer());
        }, this);
    }

    private chenggong:eui.Label;
    private shibai:eui.Label;
    private dati:eui.Label;

    private addStage() {
        this.initEvent();
        //Director.getInstance().pushScene(new BeganLayer());
        this.onBeganGame();
        this.initUI();
    }

    private createMan() {
        this.player = new Player(GameData.roleId);
        this.player.x = 200;
        this.player.y = Display.winSize.height - 90;
        this.map.addChild(this.player);
    }

    private createBlock() {
        var id = Util.random(3);
        var block = new Block(id);
        // 关键就是位置
        var maxX = Display.winSize.width * 2 + Math.abs(this.map.x);
        var minX = Display.winSize.width + Math.abs(this.map.x);
        // x, y 随机一下
        block.x = Util.randomArea(minX + 50, maxX);
        block.y = Util.randomArea(440, 500);
        this.map.addChild(block);
    }

    private onJump() {
        if (this.player) {
            this.player.jump();
            this.player.y = 350;
        }
    }

    private stop() {
        if (this.genBlockTimer) {
            this.genBlockTimer.stop();
        }
        this.isStopMove = true;
    }

    // 当完成答题时,暂停答题计时
    private onStopAnswerTimer() {
        if (this.gameTimer) {
            this.gameTimer.stop();
        }
    }

    private resume() {
        this.isStopMove = false;
        this.genBlockTimer.start();
        this.gameTimer.start();
    }

    public gamePause() {
        SoundMgr.playBtnMusic();

        this.isStopMove = true;
        this.genBlockTimer.stop();
        this.gameTimer.stop();
        Director.getInstance().pushScene(new SetLayer());
    }

    public gameOver() {
        if (this.genBlockTimer) {
            this.genBlockTimer.stop();
            this.genBlockTimer = null;
        }
        if (this.gameTimer) {
            this.gameTimer.stop();
            this.gameTimer = null;
        }
    }
}
