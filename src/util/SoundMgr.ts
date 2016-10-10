class SoundMgr {
    private static bgSoundChannel:egret.SoundChannel = null;

    public static playBtnMusic() {
        var sound:egret.Sound = RES.getRes("btnClick_mp3");
        if (sound) {
            sound.play(0, 1);
        }
    }

    public static playMusicLoop(music) {
        var sound:egret.Sound = RES.getRes(music);
        if (sound) {
            sound.play(0, 0);
        }
    }

    public static playMusicOnce(music) {
        var sound:egret.Sound = RES.getRes(music);
        if (sound) {
            sound.play(0, 1);
        }
    }
}
