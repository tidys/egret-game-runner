var MsgMgr = (function () {
    function MsgMgr() {
    }
    var d = __define,c=MsgMgr,p=c.prototype;
    MsgMgr.data = {
        BeganGame: "BeganGame",
        ResumeGame: "ResumeGame",
        ReturnGame: "ReturnGame",
        StopGameTimer: "StopGameTimer",
        ResumeGameTimer: "ResumeGameTimer",
        UpdateNum: "UpdateNum",
    };
    MsgMgr.netData = {
        GameResult: "GameResult",
        RankList: "RankList",
        GetQuestions: "GetQuestions",
        GetUserInfo: "GetUserInfo",
    };
    return MsgMgr;
}());
egret.registerClass(MsgMgr,'MsgMgr');
