///<reference path='PopupGame.ts'/>
class Victory extends PopupGame
{
    private stars: createjs.Bitmap[] = [];

    constructor(game: Game)
    {
        super(game);

        var bd: HTMLImageElement = ImagesRes.getImage(ImagesRes.VICTORY_TITLE);
        var bitmap: createjs.Bitmap = new createjs.Bitmap(bd);
        bitmap.mouseEnabled = false;
        bitmap.snapToPixel = true;
        this.addChild(bitmap);
        bitmap.x = Config.STAGE_W >> 1;
        bitmap.y = 355;
        bitmap.regX = bd.width >> 1;
        bitmap.regY = bd.height >> 1;
        createjs.Tween.get(bitmap, { ignoreGlobalPause: true }).from({ scaleX: 0.5, scaleY: 0.5, alpha: 0.5 }, 400, createjs.Ease.linear);

        this.createStars();
    }

    private createStars(): void
    {
        var bitmap: createjs.Bitmap;
        var bd: HTMLImageElement = ImagesRes.getImage(ImagesRes.STAR_VICTORY);
        for (var i: number = 0; i < Progress.currentStars; i++)
        {
            bitmap = new createjs.Bitmap(bd);
            this.addChild(bitmap);
            bitmap.regX = bd.width >> 1;
            bitmap.regY = bd.height >> 1;
            bitmap.x = 190 + bitmap.regX + 95 * i;
            bitmap.y = 70 + bitmap.regY;

            if (i == 1)
            {
                bitmap.y -= 20;
            }
            this.stars.push(bitmap);
            createjs.Tween.get(bitmap, { ignoreGlobalPause: true }).wait((i + 1) * 300).from({ scaleX: 0.4, scaleY: 0.4, alpha: 0, y: bitmap.y + 20 }, 300, createjs.Ease.bounceOut).call(this.rotateLeft, [i], this);
        }

        if (Progress.starsToLevels[Progress.currentLevel] < Progress.currentStars)
        {
            Progress.starsToLevels[Progress.currentLevel] = Progress.currentStars;
        }

        if (Progress.starsToLevels.length > Progress.levelsCompleted && Progress.currentLevel + 1 == Progress.levelsCompleted)
        {
            Progress.levelsCompleted++;
        }

        Core.instance.model.saveProgress();

        Progress.currentStars = 0;
    }

    public createButtons(): void
    {
        super.createButtons(650, 635, 635);

        this.buttonPlay.name = GameEvent.LEVEL_COMPLETE;

        this.buttonMore = new Button(ImagesRes.BUTTON_MORE, ImagesRes.BUTTON_MORE_OVER);
        this.addChild(this.buttonMore);
        this.buttonMore.y = 180;
        this.buttonMore.x = 75;
        this.buttonMore.regX = this.buttonMore.width >> 1;
        this.buttonMore.regY = this.buttonMore.height >> 1;
        this.buttonMore.name = View.MORE_GAMES;
        createjs.Tween.get(this.buttonMore, { ignoreGlobalPause: true }).wait(550).from({ scaleX: 0.4, scaleY: 0.4, alpha: 0, y: 220 }, 300, createjs.Ease.bounceOut);
    
    }

    public rotateLeft(i:any): void
    {
        createjs.Tween.get(this.stars[i], { ignoreGlobalPause: true }).to({ scaleX: -1 }, 900, createjs.Ease.quadInOut).call(this.roteteRight, [i], this);
    }

    private roteteRight(i:any): void
    {
        createjs.Tween.get(this.stars[i], { ignoreGlobalPause: true }).to({ scaleX: 1 }, 900, createjs.Ease.quadInOut).call(this.rotateLeft, [i], this);
    }

    public destroy(): void
    {
        for (var i: number = 0; i < this.stars.length; i++)
        {
            createjs.Tween.removeTweens(this.stars[i]);
        }
        this.stars.length = 0;
        this.stars = null;

        super.destroy();
    }
} 