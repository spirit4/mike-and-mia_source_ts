///<reference path='View.ts'/>
class MainMenu extends View
{
    private buttonSound: Button;
    private buttonMore: Button;
    private buttonPlay: Button;
    private buttonCredits: Button;

    constructor()
    {
        super();

        super.addCommonBg();

        this.createButtons();
    }

    private createButtons(): void
    {
        this.buttonSound = new Button(ImagesRes.BUTTON_SOUND_ON, ImagesRes.BUTTON_SOUND_ON_OVER, ImagesRes.BUTTON_SOUND_OFF, ImagesRes.BUTTON_SOUND_OFF_OVER);
        this.addChild(this.buttonSound);
        this.buttonSound.x = 550;
        this.buttonSound.y = 200 - Config.PADDING;
        this.buttonSound.name = "";

        this.buttonMore = new Button(ImagesRes.BUTTON_MORE, ImagesRes.BUTTON_MORE_OVER);
        this.addChild(this.buttonMore);
        this.buttonMore.x = 250 + (this.buttonMore.width >> 1);
        this.buttonMore.y = 830 - Config.PADDING + (this.buttonMore.height >> 1);
        this.buttonMore.name = View.MORE_GAMES;
        this.buttonMore.regX = this.buttonMore.width >> 1;
        this.buttonMore.regY = this.buttonMore.height >> 1;
        createjs.Tween.get(this.buttonMore, { ignoreGlobalPause: true }).wait(250).from({ scaleX: 0.4, scaleY: 0.4, alpha: 0, y: this.buttonMore.y + 40 }, 300, createjs.Ease.bounceOut);

        this.buttonPlay = new Button(ImagesRes.BUTTON_PLAY, ImagesRes.BUTTON_PLAY_OVER);
        this.addChild(this.buttonPlay);
        this.buttonPlay.x = 20 + (this.buttonPlay.width >> 1);
        this.buttonPlay.y = 710 - Config.PADDING + (this.buttonPlay.height >> 1);
        this.buttonPlay.name = View.LEVELS;
        this.buttonPlay.regX = this.buttonPlay.width >> 1;
        this.buttonPlay.regY = this.buttonPlay.height >> 1;
        createjs.Tween.get(this.buttonPlay, { ignoreGlobalPause: true }).wait(100).from({ scaleX: 0.4, scaleY: 0.4, alpha: 0, y: this.buttonPlay.y + 40 }, 300, createjs.Ease.bounceOut);

        this.buttonCredits = new Button(ImagesRes.BUTTON_CREDITS, ImagesRes.BUTTON_CREDITS_OVER);
        this.addChild(this.buttonCredits);
        this.buttonCredits.x = 370 + (this.buttonCredits.width >> 1);
        this.buttonCredits.y = 830 - Config.PADDING + (this.buttonCredits.height >> 1);
        this.buttonCredits.name = View.CREDITS;
        this.buttonCredits.regX = this.buttonCredits.width >> 1;
        this.buttonCredits.regY = this.buttonCredits.height >> 1;
        createjs.Tween.get(this.buttonCredits, { ignoreGlobalPause: true }).wait(400).from({ scaleX: 0.4, scaleY: 0.4, alpha: 0, y: this.buttonCredits.y + 40 }, 300, createjs.Ease.bounceOut).call(this.startTween, [], this);

    }

    private startTween(): void
    {
        this.buttonPlay.clasp(100);
        this.buttonCredits.clasp(100);
        this.buttonMore.clasp(700);
    }

    public destroy(): void
    {
        createjs.Tween.removeTweens(this.buttonMore);
        createjs.Tween.removeTweens(this.buttonCredits);
        createjs.Tween.removeTweens(this.buttonPlay);

        super.destroy();

        this.buttonCredits = null;
        this.buttonMore = null;
        this.buttonPlay = null;
        this.buttonSound = null;
    }
} 