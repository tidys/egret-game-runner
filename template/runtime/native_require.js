
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/res/res.js",
	"libs/modules/eui/eui.js",
	"libs/modules/tween/tween.js",
	"libs/modules/socket/socket.js",
	"libs/modules/dragonBones/dragonBones.js",
	"libs/modules/weixinapi/weixinapi.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/game/BeganLayer.js",
	"bin-debug/game/Block.js",
	"bin-debug/game/BlockMgr.js",
	"bin-debug/game/GameData.js",
	"bin-debug/game/GameScene.js",
	"bin-debug/game/JsonFileMgr.js",
	"bin-debug/game/Player.js",
	"bin-debug/game/result/ErrorAnswerLayer.js",
	"bin-debug/game/result/NoPassLayer.js",
	"bin-debug/game/result/PassLayer.js",
	"bin-debug/game/result/QueLayer.js",
	"bin-debug/game/result/RightAnswerLayer.js",
	"bin-debug/game/SelectRoleLayer.js",
	"bin-debug/game/SetLayer.js",
	"bin-debug/layer/DescLayer.js",
	"bin-debug/layer/GuideLayer.js",
	"bin-debug/layer/HomeLayer.js",
	"bin-debug/layer/RankItem.js",
	"bin-debug/layer/RankLayer.js",
	"bin-debug/loading/LoadingWithCircle.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/net/MsgMgr.js",
	"bin-debug/net/NetHttp.js",
	"bin-debug/net/NetHttpData.js",
	"bin-debug/Test.js",
	"bin-debug/ThemeAdapter.js",
	"bin-debug/util/AnimationUtil.js",
	"bin-debug/util/Director.js",
	"bin-debug/util/Display.js",
	"bin-debug/util/SoundMgr.js",
	"bin-debug/util/Tips.js",
	"bin-debug/util/Util.js",
	"bin-debug/util/WXJSSDK.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 960,
		contentHeight: 540,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};