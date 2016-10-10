class GameData {
    public static roleId = 1;// 选择的角色id 1男 2女
    public static punishTime = 5;// 答错惩罚时间
    public static countRight = 0;// 答对题目的数目
    public static countError = 0;// 答错题目的数目
    public static hegeNum = 15;// 合格num
    public static queTotalCount = 20;// 需要回答题目数目
    public static gameTotalTime = 500;//游戏总时长
    public static time = 0;// 花费的事件
    public static trackHeight = 20;// 跑道宽度
    public static openid = "obzWcwJ4TaNGAdREKdIVoKs7cfbM";
    public static queIdArr = [];// 存放回答问题的数组

    public static gameReset() {
        this.time = 0;
        this.countRight = 0;
        this.countError = 0;
        for (var k in this.queArr) {
            var item = this.queArr[k];
            this.queIdArr.push(item['id']);
        }
    }

    public static queArr = [];//存放从服务器获取的所有问题
    public static setQue(que) {
        this.queArr = que;
    }

    public static getQueById(id) {
        for (var k in this.queArr) {
            var item = this.queArr[k];
            if (item['id'] == id) {
                return item;
            }
        }
        // 没有找到该id的问题,就返回第一个问题
        if (this.queArr.length > 0) {
            return this.queArr[0];
        }
        // 否则返回空
        return null;
    }
}