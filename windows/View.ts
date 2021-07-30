class View extends createjs.Container
{
    static MAIN_MENU: string = "mainMenu";
    static LEVELS: string = "levels";
    static GAME: string = "game";
    static CREDITS: string = "credits";
    static WALKTHROUGH: string = "walkthrough";
    static INTRO: string = "intro";
    static GAME_COMPLETE: string = "gameComplete";

    static MORE_GAMES: string = "more";

    static currentBg: string = "";

    constructor()
    {
        super();

        this.on(GUIEvent.MOUSE_CLICK, this.clickHandler, this);
    }

    private clickHandler(e: createjs.MouseEvent): void
    {
        e.stopPropagation();
        if (e.target.parent.name)
        {
            var ev1: GameEvent;
            var ev2: GUIEvent;

            if (e.target.parent.name == View.MORE_GAMES)
            {
                GameBranding.clickMoreHandler(e);
                return;
            }

            if (e.target.parent instanceof LevelButton)
            {
                ev1 = new GameEvent(GameEvent.GOTO_LEVEL);
                ev1.objectType = e.target.parent.name;
                this.dispatchEvent(ev1);
            }
            else
            {
                ev2 = new GUIEvent(GUIEvent.GOTO_WINDOW);
                ev2.window = e.target.parent.name;
                this.dispatchEvent(ev2);
            }
        }
    }

    public addCommonBg(type: string = ImagesRes.MAIN_BG): void
    {
        if (View.currentBg != type)
        {
            Core.instance.bg.removeAllBg();

            View.currentBg = type;
            Core.instance.bg.addBg(type);

            GameBranding.addLogo(this);
        }
    }

    public destroy(): void
    {
        this.removeAllEventListeners();
        this.removeAllChildren();
    }
} 