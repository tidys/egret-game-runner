class GuideLayer extends eui.Component {
    private word:eui.Label;
    private jumpBtn:eui.Image;

    private wordIndex = 0;
    private wordArr = [
        "新同学你好，欢迎来到华中科技大学图书馆，我是这里的管理员华小图，未来几年，我会在这里一直陪着你学习，希望我们能成为朋友。",
        "我们的馆藏文献总量达到1002万册，涵盖理、工、医、文、管等九大学科门类，是国内数字文献最高的高校之一。",
        "作为我最好的朋友，现在我邀请你一起参加图书馆的“跑酷之旅”，其间我们要完成20个任务，回答20道与图书馆基本状况相关的问答题。你愿意和我一起在活动中加深对图书馆的了解吗？"
    ];

    public constructor() {
        super();
        this.skinName = "GuideLayerSkin";
        SoundMgr.playMusicLoop("bg_mp3");
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
        this.jumpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJump, this);
    }

    private addStage() {
        this.showNextWord();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    }

    private onTouch() {
        this.showNextWord();
    }

    private onTestNet() {
        var data = {aid: 1, level: "easy"};
        var net = new NetHttpSendData(MsgMgr.netData.GetQuestions, data);
        NetHttp.getInstance()._url = "http://127.0.0.1:90/index.php"
        NetHttp.getInstance().sendData(net, "");
    }

    private onJump(touch:egret.TouchEvent) {
        touch.stopImmediatePropagation();
        WXJSSDK.getInstance().shareTimeline();// 分享到朋友圈
        return;

        //this.onTestNet();
        //return;
        SoundMgr.playBtnMusic();
        Director.getInstance().gotoHomeLayer();
    }
    private showNextWord() {
        if (this.wordIndex >= this.wordArr.length) {
            Director.getInstance().gotoHomeLayer();
        } else {
            this.word.text = this.wordArr[this.wordIndex];
            this.wordIndex++;
        }
    }
}