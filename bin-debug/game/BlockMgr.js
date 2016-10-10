var BlockMgr = (function () {
    function BlockMgr() {
    }
    var d = __define,c=BlockMgr,p=c.prototype;
    BlockMgr.removeItem = function (item) {
        Util.removeByElements(this.arr, item);
    };
    BlockMgr.clean = function () {
        this.arr = [];
    };
    BlockMgr.arr = [];
    return BlockMgr;
}());
egret.registerClass(BlockMgr,'BlockMgr');
