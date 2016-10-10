class RankLayer extends eui.Component {
    private group:eui.Group;
    private closeBtn:eui.Button;
    private selfRank:RankItem;

    public constructor() {
        super();
        this.skinName = "RankLayerSkin";
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);
    }

    private initNet() {
        var school = getAid();
        if (school) {

        } else {
            school = "20";
        }
        var net = new NetHttpSendData(MsgMgr.netData.RankList, {aid: school});
        NetHttp.getInstance().sendData(net, "getRank");
    }

    private onNet(para) {
        var data:NetHttpRecvData = <NetHttpRecvData>para.data;
        if (data.code == 0) {
            var netData = data.data;
            // 所有排行
            var all = netData['all'];
            for (var i = 0; i < all.length; i++) {
                var item = new RankItem();
                item.initData(all[i]);
                this.group.addChild(item);
            }

            // 自己
            this.selfRank.setSelf();
            var selfData = netData['self'];
            if (selfData && selfData['rankLv'] && selfData['name'] && selfData['time']) {
                this.selfRank.initData(selfData);
            } else {
                console.log("没有玩家自己的数据");
            }
        }

    }

    private addStage() {
        EventMgr.getInstance().addEventListener(MsgMgr.netData.RankList, this.onNet, this);
        this.initNet();
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
    }

    private removeStage() {
        EventMgr.getInstance().removeEventListener(MsgMgr.netData.RankList, this.onNet, this);
    }

    private testData() {
        var dataArr = [
            {rankLv: 1, name: "华小图1", time: "9'10"},
            {rankLv: 2, name: "华小图2", time: "10'10"},
            {rankLv: 3, name: "华小图3", time: "11'10"},
            {rankLv: 4, name: "华小图4", time: "12'10"},
            {rankLv: 5, name: "华小图5", time: "13'10"},
            {rankLv: 6, name: "华小图6", time: "14'10"},
            {rankLv: 7, name: "华小图7", time: "15'10"},
            {rankLv: 8, name: "华小图8", time: "16'10"},
            {rankLv: 9, name: "华小图9", time: "17'10"},
            {rankLv: 10, name: "华小图10", time: "18'10"},
        ];
        for (var i = 0; i < dataArr.length; i++) {
            var item = new RankItem();
            item.initData(dataArr[i]);
            this.group.addChild(item);
        }
        this.selfRank.setSelf();
        this.selfRank.initData({rankLv: 108, name: "华小图1002", time: "88'10"});
    }

    private onClose() {
        SoundMgr.playBtnMusic();
        Director.getInstance().popScene();
    }
}