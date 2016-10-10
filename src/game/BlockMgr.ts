class BlockMgr {
    public static arr = [];

    public static removeItem(item) {
        Util.removeByElements(this.arr, item);
    }

    public static clean() {
        this.arr = [];
    }
}