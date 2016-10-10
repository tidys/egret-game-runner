var SoundMgr = (function () {
    function SoundMgr() {
    }
    var d = __define,c=SoundMgr,p=c.prototype;
    SoundMgr.playBtnMusic = function () {
        var sound = RES.getRes("btnClick_mp3");
        if (sound) {
            sound.play(0, 1);
        }
    };
    SoundMgr.playMusicLoop = function (music) {
        var sound = RES.getRes(music);
        if (sound) {
            sound.play(0, 0);
        }
    };
    SoundMgr.playMusicOnce = function (music) {
        var sound = RES.getRes(music);
        if (sound) {
            sound.play(0, 1);
        }
    };
    SoundMgr.bgSoundChannel = null;
    return SoundMgr;
}());
egret.registerClass(SoundMgr,'SoundMgr');
