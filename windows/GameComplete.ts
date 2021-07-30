///<reference path='View.ts'/>
class GameComplete extends View
{
    public buttonMenu: Button;

    constructor()
    {
        super();

        super.addCommonBg(ImagesRes.GAME_COMPLETE_BG);

        this.createButtons();
    }

    private createButtons(): void
    {
        this.buttonMenu = new Button(ImagesRes.BUTTON_MENU_BIG, ImagesRes.BUTTON_MENU_BIG_OVER);
        this.addChild(this.buttonMenu);
        this.buttonMenu.x = (Config.STAGE_W >> 1);
        this.buttonMenu.y = 590;
        this.buttonMenu.regX = this.buttonMenu.width >> 1;
        this.buttonMenu.regY = this.buttonMenu.height >> 1;
        this.buttonMenu.name = View.LEVELS;
        createjs.Tween.get(this.buttonMenu, { ignoreGlobalPause: true }).wait(10).from({ scaleX: 0.4, scaleY: 0.4, alpha: 0, y: 630 }, 300, createjs.Ease.bounceOut);
    }

    public destroy(): void
    {
        super.destroy();

        this.buttonMenu = null;
    }
} 