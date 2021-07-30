///<reference path='View.ts'/>
class Levels extends View
{
    private buttonBack: Button;

    constructor()
    {
        super();

        super.addCommonBg(ImagesRes.LEVEL_SELECT_BG);

        this.createButtons();
    }

    private createButtons(): void
    {
        var lock: createjs.Bitmap;
        var lvl: LevelButton;
        var col: number;
        var row: number;

        for (var i: number = 0; i < Progress.starsToLevels.length; i++)
        {
            col = i % 5;
            row = (i - col) / 5;

            if (i < Progress.levelsCompleted)
            {
                lvl = new LevelButton(i + 1, Progress.starsToLevels[i])

                this.addChild(lvl);
                lvl.x = 45 + col * 115;
                lvl.y = 185 + row * 104;

                lvl.name = i.toString();
                lvl.snapToPixel = true;
            }
            else
            {
                lock = new createjs.Bitmap(ImagesRes.getImage(ImagesRes.BUTTON_LS_LOCK));
                this.addChild(lock);
                lock.x = 45 + col * 115;
                lock.y = 185 + row * 104;
                lock.mouseEnabled = false;
                lock.snapToPixel = true;
            }
        }

        this.buttonBack = new Button(ImagesRes.BUTTON_BACK, ImagesRes.BUTTON_BACK_OVER);
        this.addChild(this.buttonBack);
        this.buttonBack.x = Config.STAGE_W - this.buttonBack.width >> 1;
        this.buttonBack.y = 595;
        this.buttonBack.name = View.MAIN_MENU;
    }

    public destroy(): void
    {
        super.destroy();

        this.buttonBack = null;
    }
} 