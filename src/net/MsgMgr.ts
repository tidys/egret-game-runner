class MsgMgr {
    public static data = {
        BeganGame: "BeganGame",
        ResumeGame: "ResumeGame",
        ReturnGame: "ReturnGame",//返回游戏
        StopGameTimer: "StopGameTimer",// 暂停游戏计时
        ResumeGameTimer: "ResumeGameTimer",// 恢复游戏计时
        UpdateNum: "UpdateNum",//更新游戏数据
    };
    public static netData = {
        GameResult: "GameResult",// 游戏结果
        RankList: "RankList",// 排行
        GetQuestions: "GetQuestions",// 获取问题
        GetUserInfo: "GetUserInfo",//获取用户信息
    }
}
