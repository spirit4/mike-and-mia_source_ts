class SoundManager
{
    //music
    static MUSIC_MENU: string = 'musicMenu';
    static MUSIC_GAME: string = 'musicGame';

    static instance: SoundManager;

    //false = true;
    private isSFX: boolean = true;
    private isMusic: boolean = true;

    private currentButton: Button;
    private currentLocation: string = ""; //menu or game

    private musicInstances: { [index: string]: createjs.SoundInstance; } = {};
    private musicPositions: { [index: string]: number; } = {};


    constructor()
    {
        SoundManager.instance = this;
    }

    public setLocation(type: string): void
    {
        if (this.isMusic)
        {
            if (type != this.currentLocation)
            {
                this.stopMusicTrack();

                this.musicPositions[SoundManager.MUSIC_GAME] = 0;
                this.musicPositions[SoundManager.MUSIC_MENU] = 0;

                this.currentLocation = type;
                this.playMusicTrack();
            }
        }
        else
        {
            this.currentLocation = type;
        }
    }

    private playMusicTrack(): void
    {
        if (!this.musicPositions[this.currentLocation])
        {
            this.musicPositions[this.currentLocation] = 0;
        }

        this.musicInstances[this.currentLocation] = createjs.Sound.play(this.currentLocation, "none", 0, this.musicPositions[this.currentLocation], -1);
    }

    private stopMusicTrack(): void
    {
        if (this.currentLocation == "")
        {
            return;
        }

        this.musicPositions[this.currentLocation] = this.musicInstances[this.currentLocation].getPosition();
        this.musicInstances[this.currentLocation].stop();
    }

    public muteOnOff(): void
    {
        if (this.isMusic == this.isSFX)
        {
            this.setIsMusic(!this.isMusic);
            this.setIsSFX(this.isMusic);


            if (this.currentButton)
            {
                this.currentButton.setState();
            }
        }
    }

    public getIsSFX(): boolean
    {
        return this.isSFX;
    }

    public setIsSFX(value: boolean): void
    {
        this.isSFX = value;
    }

    public getIsMusic(): boolean
    {
        return this.isMusic;
    }

    public setIsMusic(value: boolean): void
    {
        this.isMusic = value;

        if (this.isMusic)
        {
            this.playMusicTrack();
        }
        else
        {
            this.stopMusicTrack();
        }
    }

    public setSavingState(state: boolean): void
    {
        this.isMusic = state;
        this.isSFX = state;
    }

    public setCurrentButton(value: Button): void
    {
        this.currentButton = value;
    }

    public setSaveState(sound: string, music: string): void
    {
        if (sound == "0")
        {
            this.isSFX = false;
        }
        if (music == "0")
{
            this.isMusic = false;
        }
    }
} 