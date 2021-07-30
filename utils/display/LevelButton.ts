///<reference path='Button.ts'/>
class LevelButton extends Button
{
    private tf: createjs.BitmapText;
    private starsOut: createjs.Container;
    private starsOver: createjs.Container;

    constructor(num: number, stars: number)
    {
        super(ImagesRes.BUTTON_LS, ImagesRes.BUTTON_LS_OVER);

        var level = new createjs.BitmapText(num.toString(), JSONRes.atlasLevelsFont);
        this.addChild(level);
        level.mouseEnabled = false;
        level.snapToPixel = true;
        level.regX = level.getBounds().width >> 1;
        level.regY = level.getBounds().height >> 1
        level.x = this.width >> 1;
        level.y = 31;
        this.tf = level;

        this.starsOut = new createjs.Container();
        this.starsOver = new createjs.Container();
        this.addChild(this.starsOut);
        this.addChild(this.starsOver);
        this.starsOut.x = 18;
        this.starsOut.y = 60;
        this.starsOver.x = 15;
        this.starsOver.y = 61;
        this.starsOver.visible = false;

        var bitmap: createjs.Bitmap;
        for (var i: number = 0; i < stars; i++)
        {
            bitmap = new createjs.Bitmap(ImagesRes.getImage(ImagesRes.LS_STAR));
            this.starsOut.addChild(bitmap);
            bitmap.x = 18 * i;

            if (i == 1)
            {
                bitmap.y = 7;
            }

            bitmap = new createjs.Bitmap(ImagesRes.getImage(ImagesRes.LS_STAR_OVER));
            this.starsOver.addChild(bitmap);
            bitmap.x = 19 * i;

            if (i == 1)
            {
                bitmap.y = 7;
            }
        }
    }

    public overHandler(): void
    {
        super.overHandler();
        this.tf.scaleX = this.tf.scaleY = 1.2;
        this.starsOver.visible = true;
        this.starsOut.visible = false;
    }

    public outHandler(): void
    {
        super.outHandler();
        this.tf.scaleX = this.tf.scaleY = 1;
        this.starsOver.visible = false;
        this.starsOut.visible = true;
    }

}