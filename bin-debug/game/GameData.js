var GameData = (function () {
    function GameData() {
    }
    var d = __define,c=GameData,p=c.prototype;
    GameData.gameReset = function () {
        this.time = 0;
        this.countRight = 0;
        this.countError = 0;
        for (var k in this.queArr) {
            var item = this.queArr[k];
            this.queIdArr.push(item['id']);
        }
    };
    GameData.setQue = function (que) {
        this.queArr = que;
    };
    GameData.getQueById = function (id) {
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
    };
    GameData.roleId = 1; // 选择的角色id 1男 2女
    GameData.punishTime = 5; // 答错惩罚时间
    GameData.countRight = 0; // 答对题目的数目
    GameData.countError = 0; // 答错题目的数目
    GameData.hegeNum = 15; // 合格num
    GameData.queTotalCount = 20; // 需要回答题目数目
    GameData.gameTotalTime = 500; //游戏总时长
    GameData.time = 0; // 花费的事件
    GameData.trackHeight = 20; // 跑道宽度
    GameData.openid = "obzWcwJ4TaNGAdREKdIVoKs7cfbM";
    GameData.queIdArr = []; // 存放回答问题的数组
    GameData.queArr = []; //存放从服务器获取的所有问题
    return GameData;
}());
egret.registerClass(GameData,'GameData');
