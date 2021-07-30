///<reference path='View.ts'/>
class Intro extends View
{
    private buttonNext: Button;
    private frames: createjs.Bitmap[] = [];
    private startingPositions: Object[];
    //private endingPositions: Object[];

    constructor()
    {
        super();

        super.addCommonBg(ImagesRes.INTRO_BG);

        this.createFrames();
        this.createButtons();
    }

    private createFrames(): void
    {
        var bitmap: createjs.Bitmap;
        this.startingPositions = [
            { x: 17, y: 86 },
            { x: 308, y: 111 },
            { x: 13, y: 327 },
        ];
        //this.endingPositions = [
        //    { x: 40, y: (255 - 194), rotate: 0 },
        //    { x: 305, y: (220 - 194), rotate: 0 },
        //    { x: 15, y: (460 - 194), rotate: 0 },
        //];

        bitmap = new createjs.Bitmap(ImagesRes.getImage(ImagesRes.INTRO_ICON + 0));
        this.addChild(bitmap);
        bitmap.x = this.startingPositions[0]['x'];
        bitmap.y = this.startingPositions[0]['y'];
        this.frames.push(bitmap);
        bitmap.alpha = 0;

        bitmap = new createjs.Bitmap(ImagesRes.getImage(ImagesRes.INTRO_ICON + 1));
        this.addChild(bitmap);
        bitmap.x = this.startingPositions[1]['x'];
        bitmap.y = this.startingPositions[1]['y'];
        this.frames.push(bitmap);
        bitmap.alpha = 0;

        bitmap = new createjs.Bitmap(ImagesRes.getImage(ImagesRes.INTRO_ICON + 2));
        this.addChildAt(bitmap, this.getNumChildren() - 1);
        bitmap.x = this.startingPositions[2]['x'];
        bitmap.y = this.startingPositions[2]['y'];
        this.frames.push(bitmap);
        bitmap.alpha = 0;

        this.showNext(0);
        this.on(GUIEvent.MOUSE_CLICK, this.clickIntroHandler, this);
    }

    private createButtons(): void
    {
        this.buttonNext = new Button(ImagesRes.BUTTON_PLAY_PRE, ImagesRes.BUTTON_PLAY_PRE_OVER);
        this.addChild(this.buttonNext);
        this.buttonNext.y = 595;
        this.buttonNext.x = Config.STAGE_W - this.buttonNext.width >> 1;
        this.buttonNext.name = View.GAME;
    }

    private clickIntroHandler(e: createjs.MouseEvent): void
    {
        if (!this.frames)
            return;

        for (var i: number = 0; i < this.frames.length; i++)
        {
            if (this.frames[i].alpha != 1)
            {
                createjs.Tween.removeTweens(this.frames[i]);
                this.frames[i].alpha = 1;
                this.showNext(i + 1);
                return;
            }
        }
    }

    private showNext(currentFrame: any): void
    {
        if (this.frames && this.frames.length > currentFrame)
        {
            createjs.Tween.get(this.frames[currentFrame])
                .to({ alpha: 1 }, 400, createjs.Ease.quartOut)
                .wait(800)
                .call(this.showNext, [currentFrame + 1], this);
        }
    }


    public destroy(): void
    {
        super.destroy();

        this.removeAllEventListeners();

        for (var i: number = 0; i < this.frames.length; i++)
        {
            createjs.Tween.removeTweens(this.frames[i]);
        }

        this.frames.length = 0;
        this.frames = null;

        this.buttonNext = null;
    }
} 