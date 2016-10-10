class Test extends eui.Component {
    private img1;
    private img2;
    private img3;

    private prePoint;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
    }

    private addStage() {
        this.img1 = new eui.Image("btn-play-game_png");
        this.img1.y = 200;
        this.addTouch(this.img1);
        this.addChild(this.img1);

        this.img2 = new eui.Image("btn-play-game_png");
        this.img2.x = 400;
        this.addTouch(this.img2);
        this.addChild(this.img2);

        this.img3 = new eui.Image("btn-play-game_png");
        this.img3.x = 200;
        this.addTouch(this.img3);
        this.addChild(this.img3);

        this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
    }

    private addTouch(obj) {
        obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (touch:egret.TouchEvent) {
            this.prePoint = new egret.Point(touch.stageX, touch.stageY);
        }, this);
        obj.addEventListener(egret.TouchEvent.TOUCH_MOVE, function (touch:egret.TouchEvent) {
            obj.x += touch.stageX - this.prePoint.x;
            obj.y += touch.stageY - this.prePoint.y;
            this.prePoint = new egret.Point(touch.stageX, touch.stageY);
        }, this);
        obj.addEventListener(egret.TouchEvent.TOUCH_END, function (touch:egret.TouchEvent) {
            this.prePoint = new egret.Point(touch.stageX, touch.stageY);
        }, this);
    }

    private update() {
        var arr = [{obj: this.img1, y: this.img1.y},
            {obj: this.img2, y: this.img2.y},
            {obj: this.img3, y: this.img3.y}];
        // 排序
        arr.sort(function (a, b) {
            if (a.y > b.y) {
                return 1;
            }
            return 0;
        });
        var indexZ = 0;
        for (var s in arr) {
            var temp = arr[s];
            temp.obj.parent.setChildIndex(temp.obj, indexZ);
            indexZ++;
        }
    }

    public  hitTest(obj1:egret.DisplayObject, obj2:egret.DisplayObject):boolean {
        var rect1:egret.Rectangle = obj1.getBounds();
        var rect2:egret.Rectangle = obj2.getBounds();
        rect1.x = obj1.x;
        rect1.y = obj1.y;
        rect2.x = obj2.x;
        rect2.y = obj2.y;
        return rect1.intersects(rect2);
    }

}