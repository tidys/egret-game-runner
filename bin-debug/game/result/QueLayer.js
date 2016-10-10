var QueLayer = (function (_super) {
    __extends(QueLayer, _super);
    function QueLayer() {
        _super.call(this);
        this.data = null;
        this.skinName = "QueLayerSkin";
        this.chooseA.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChooseA, this);
        this.chooseB.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChooseB, this);
        this.chooseC.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChooseC, this);
        this.chooseD.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChooseD, this);
        this.init();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
    }
    var d = __define,c=QueLayer,p=c.prototype;
    p.addStage = function () {
        SoundMgr.playMusicOnce("que_mp3");
        var tw = egret.Tween.get(this.group);
        tw.to({ scaleX: 0.2, scaleY: 0.5 }, 1).to({ scaleX: 1, scaleY: 1 }, 100, egret.Ease.backOut);
    };
    p.init = function () {
        var queid = Util.random(GameData.queIdArr.length);
        var qu = GameData.getQueById(GameData.queIdArr[queid]);
        if (qu) {
            this.data = {
                id: qu['id'],
                titile: qu['question'],
                choose: qu['selection'],
                right: qu['answer']
            };
            this.que.text = this.data.titile;
            var arr = [
                { btn: this.chooseA, label: this.labelA },
                { btn: this.chooseB, label: this.labelB },
                { btn: this.chooseC, label: this.labelC },
                { btn: this.chooseD, label: this.labelD }
            ];
            for (var k in arr) {
                var item = arr[k];
                item.btn.visible = false;
                item.label.visible = false;
            }
            var index = 0;
            var tmp = ["A. ", "B. ", "C. ", "D. "];
            for (var s in this.data.choose) {
                arr[index].btn.visible = true;
                arr[index].label.visible = true;
                arr[index].label.text = tmp[index] + this.data.choose[s];
                index++;
            }
        }
    };
    p.initQue = function () {
        // 在这里填写所有的题目
        GameData.queArr = [
            { question: "下面哪一个不是图书馆的组成部分？", answer: "B", selection: ["主馆", "东区分馆", "西区分馆", "医学分馆"] },
            { question: "下面哪一个不是图书馆的组成部分？", answer: "B", selection: ["主馆", "东区分馆", "西区分馆", "医学分馆"] },
            { question: "去图书馆的必带神器是：", answer: "A", selection: ["校园卡", "书包", "文具盒", "零食"] },
            { question: "校园卡丢失后，应该立即", answer: "B", selection: ["去图书馆总服务台办理挂失和补办", "去校园卡服务中心办理挂失和补办"] },
            { question: "走到图书馆门口，好基友/闺蜜的校园卡忘带了，我可以把自己的借给他/她用吗?", answer: "B", selection: ["YES", "NO"] },
        ];
    };
    p.onChoose = function (index) {
        SoundMgr.playBtnMusic();
        Director.getInstance().popScene();
        if (index == this.data.right) {
            GameData.countRight++;
            if (GameData.countRight + GameData.countError >= GameData.queTotalCount) {
                //回答够20题, 闯关成功
                GameScene.instance.gameOver();
                Director.getInstance().repleaceScene(new PassLayer());
            }
            else {
                // 回答正确,这道题将不会再出现在题目中
                for (var k in GameData.queIdArr) {
                    var item = GameData.queIdArr[k];
                    if (item == this.data['id']) {
                        // 根本不会把所有题目都删除了,因为答对20题就过关了,并且只有答对了才删除该题目
                        Util.removeByElements(GameData.queIdArr, item);
                    }
                }
                EventMgr.getInstance().dispatchEventWith(MsgMgr.data.UpdateNum, false, []);
                Director.getInstance().pushScene(new RightAnswerLayer());
            }
        }
        else {
            GameData.countError++;
            GameData.time += GameData.punishTime; // 增加时间
            if (GameData.countRight + GameData.countError >= GameData.queTotalCount) {
                //回答够20题, 闯关成功
                GameScene.instance.gameOver();
                Director.getInstance().repleaceScene(new PassLayer());
            }
            else {
                EventMgr.getInstance().dispatchEventWith(MsgMgr.data.UpdateNum, false, []);
                Director.getInstance().pushScene(new ErrorAnswerLayer());
            }
        }
    };
    p.onChooseA = function () {
        this.onChoose("A");
    };
    p.onChooseB = function () {
        this.onChoose("B");
    };
    p.onChooseC = function () {
        this.onChoose("C");
    };
    p.onChooseD = function () {
        this.onChoose("D");
    };
    return QueLayer;
}(eui.Component));
egret.registerClass(QueLayer,'QueLayer');
