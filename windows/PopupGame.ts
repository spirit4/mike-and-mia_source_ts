class PopupGame extends createjs.Container
{
    public buttonReset: Button;
    public buttonPlay: Button;
    public buttonMenu: Button;
    public buttonMore: Button;

    private game: Game;

    constructor(game: Game)
    {
        super();
        this.game = game;

        var g: createjs.Graphics = new createjs.Graphics();         var shape: createjs.Shape = new createjs.Shape(g);         g.beginFill('rgba(255,255,255,0.7)');
        g.drawRect(0, 0, Config.STAGE_W, Config.PADDING);
        g.endFill();
        shape.snapToPixel = true;
        Core.instance.bg.addShape(shape);

        g = new createjs.Graphics();         shape = new createjs.Shape(g);         g.beginFill('rgba(255,255,255,0.7)');
        g.drawRect(0, (Config.PADDING + Config.STAGE_H_MIN), Config.STAGE_W, Config.PADDING);
        g.endFill();
        shape.snapToPixel = true;
        Core.instance.bg.addShape(shape);

        g = new createjs.Graphics();         shape = new createjs.Shape(g);         g.beginFill("rgba(255,255,255,0.7)");
        g.drawRect(0, 0, Config.STAGE_W, Config.STAGE_H_MIN);
        g.endFill();
        shape.snapToPixel = true;
        this.addChild(shape);

        GameBranding.addLogo(this);

        this.createButtons();
        this.on(GUIEvent.MOUSE_CLICK, this.clickHandler, this);

        createjs.Ticker.setPaused(true);
    }

    private clickHandler(e: createjs.MouseEvent): void
    {
        e.stopPropagation();
        if (e.target.parent instanceof Button)
        {
            if (e.target.parent.name)
            {
                Hero.currentView = null;
                Hero.currentTween = null;

                if (e.target.parent.name == View.MORE_GAMES)
                {
                    GameBranding.clickMoreHandler(e);
                    return;
                }

                var ev1: GUIEvent;
                var ev2: GameEvent;
                if (e.target.parent.name == View.MAIN_MENU || e.target.parent.name == View.LEVELS)
                {
                    ev1 = new GUIEvent(GUIEvent.GOTO_WINDOW);
                    ev1.window = e.target.parent.name;
                    this.game.dispatchEvent(ev1);
                }
                else if (e.target.parent.name == GameEvent.RESTART)
                {
                    ev2 = new GameEvent(GameEvent.RESTART);
                    this.game.dispatchEvent(ev2);
                }
                else if (e.target.parent.name == GameEvent.LEVEL_COMPLETE)
                {
                    ev2 = new GameEvent(GameEvent.LEVEL_COMPLETE);
                    this.game.dispatchEvent(ev2);
                }
            }

            createjs.Ticker.setPaused(false);

            this.hide();
        }
    }

    public createButtons(y1: number = 445, y2: number = 430, y3: number = 430): void
    {
        this.buttonPlay = new Button(ImagesRes.BUTTON_PLAY_PRE, ImagesRes.BUTTON_PLAY_PRE_OVER);
        this.addChild(this.buttonPlay);
        this.buttonPlay.y = y1;
        this.buttonPlay.x = Config.STAGE_W >> 1;
        this.buttonPlay.regX = this.buttonPlay.width >> 1;
        this.buttonPlay.regY = this.buttonPlay.height >> 1;
        this.buttonPlay.name = "";
        createjs.Tween.get(this.buttonPlay, { ignoreGlobalPause: true }).wait(400).from({ scaleX: 0.4, scaleY: 0.4, alpha: 0, y: y1 + 40 }, 300, createjs.Ease.bounceOut).call(this.startTween, [], this);

        this.buttonReset = new Button(ImagesRes.BUTTON_RESET_BIG, ImagesRes.BUTTON_RESET_BIG_OVER);
        this.addChild(this.buttonReset);
        this.buttonReset.y = y2;
        this.buttonReset.x = this.buttonPlay.x - 160;
        this.buttonReset.regX = this.buttonReset.width >> 1;
        this.buttonReset.regY = this.buttonReset.height >> 1;
        this.buttonReset.name = GameEvent.RESTART;
        createjs.Tween.get(this.buttonReset, { ignoreGlobalPause: true }).wait(100).from({ scaleX: 0.4, scaleY: 0.4, alpha: 0, y: y2 + 40 }, 300, createjs.Ease.bounceOut);

        this.buttonMenu = new Button(ImagesRes.BUTTON_MENU_BIG, ImagesRes.BUTTON_MENU_BIG_OVER);
        this.addChild(this.buttonMenu);
        this.buttonMenu.y = y3;
        this.buttonMenu.x = this.buttonPlay.x + 160;
        this.buttonMenu.regX = this.buttonMenu.width >> 1;
        this.buttonMenu.regY = this.buttonMenu.height >> 1;
        this.buttonMenu.name = View.LEVELS;
        createjs.Tween.get(this.buttonMenu, { ignoreGlobalPause: true }).wait(250).from({ scaleX: 0.4, scaleY: 0.4, alpha: 0, y: y3 + 40 }, 300, createjs.Ease.bounceOut);
    }

    private startTween(): void
    {
        this.buttonPlay.clasp(700);
        this.buttonReset.clasp(100);
        this.buttonMenu.clasp(100);
    }

    private startPause(): void
    {
        createjs.Ticker.setPaused(true);
    }

    private hide(): void
    {
        if (Core.instance.getView() instanceof Game)
        {
            GameBranding.addLogo(Core.instance.getView());
        }

        this.parent.removeChild(this);
        this.destroy();
    }

    public destroy(): void
    {
        createjs.Tween.removeTweens(this.buttonPlay);
        createjs.Tween.removeTweens(this.buttonReset);
        createjs.Tween.removeTweens(this.buttonMenu);

        Core.instance.bg.removeAllShapes();
        this.removeAllEventListeners();
        this.removeAllChildren();

        this.buttonReset = null;
        this.buttonPlay = null;
        this.buttonMenu = null;
        this.buttonMore = null;
        this.game = null;
    }
} 