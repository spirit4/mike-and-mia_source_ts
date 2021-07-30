///<reference path='View.ts'/>
class Credits extends View
{
    private buttonBack: Button;

    constructor()
    {
        super();

        super.addCommonBg(ImagesRes.CREDITS_BG);

        this.createButtons();
    }

    private createButtons(): void
    {
        this.buttonBack = new Button(ImagesRes.BUTTON_BACK, ImagesRes.BUTTON_BACK_OVER);
        this.addChild(this.buttonBack);
        this.buttonBack.y = 560;
        this.buttonBack.x = Config.STAGE_W - this.buttonBack.width >> 1;
        this.buttonBack.name = View.MAIN_MENU;
    }

    public destroy(): void
    {
        super.destroy();

        this.buttonBack = null;
    }
} 