class Block extends eui.Component {
    public id = 0;

    public constructor(id) {
        super();
        this.id = id;
        this.init();
        //this.drawLine();
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
        shp.graphics.endFill();
        this.addChild(shp);
    }

    private init() {
        var imgArr = ["item1_png", "item2_png", "item3_png"];
        var texture = RES.getRes(imgArr[this.id]);
        var block = new eui.Image();
        block.texture = texture;
        this.width = texture.textureWidth;
        this.anchorOffsetX = texture.textureWidth / 2;
        this.anchorOffsetY = texture.textureHeight;
        this.height = texture.textureHeight;
        block.name = "block";
        block.anchorOffsetY = texture.textureHeight;
        block.y = this.height;
        this.x = this.width / 2;

        /*
         var temp = new eui.Rect();
         temp.width = this.width;
         temp.height = this.height;
         var arrColor = [0xff0000, 0x00ff00, 0x0000ff];
         temp.fillColor = arrColor[this.id];
         this.addChild(temp);
         */

        this.addChild(block);
        BlockMgr.arr.push(this);
    }

    public clean() {
        BlockMgr.removeItem(this);
        var tw = egret.Tween.get(this);
        tw.to({scaleX: 0.5, scaleY: 0.5}, 300).call(function () {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }, this);
    }
}