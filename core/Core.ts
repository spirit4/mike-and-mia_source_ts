class Core extends createjs.Container
{
    public bg: LayerBg;
    static instance: Core;
    private preloader: Preloader;

    private currentView: View;
    private blind: Blind;

    public model: Model;

    public api: any;
    public ga: any;

    constructor(bg: LayerBg)
    {
        super();
        this.snapToPixel = true;

        this.ga = window["gaTracker"];

        this.bg = bg;
        Core.instance = this;
        this.name = "core";

        this.preloader = new Preloader();
        this.addChild(this.preloader);
        //this.preloader.on(GameEvent.COMPLETE, this.init, this);

        GameAPI.loadAPI(function (apiInstance)
        {
            Core.instance.api = apiInstance;
            Core.instance.preloader.on(GameEvent.COMPLETE, Core.instance.init, Core.instance);
        });
    }

    private init(e: createjs.Event): void
    {
        this.preloader.removeAllEventListeners();
        this.model = new Model();

        ImagesRes.init();
        this.preloader.on(GameEvent.COMPLETE, this.initCompleted, this);
        this.preloader.initProgress();
    }

    private initCompleted(): void
    {
        JSONRes.init();
        this.bg.initAll();

        var sm: SoundManager = new SoundManager();//singleton

        this.model.loadProgress();

        if (this.ga)
            this.ga.send('pageview', "/InitMainMenu");

        //this.startGame();
        this.addView(View.MAIN_MENU);
        SoundManager.instance.setLocation(SoundManager.MUSIC_MENU);

        //remove preloader
        this.preloader.removeAllEventListeners();
        this.removeChild(this.preloader);
        this.preloader = null;
    }

    private restartHandler(e: createjs.Event): void
    {
        Progress.currentStars = 0;

        this.addBlind();
    }

    private completeHandler(e: createjs.Event): void
    {
        Progress.currentLevel++;

        GameAPI.GameBreak.request(GameBranding.adsPause, this.continueGame);
        if (!createjs.Ticker.getPaused())
        {
            this.continueGame();
        }
    }

    private continueGame(): void
    {
        GameBranding.adsResume();
        Core.instance.removeView();
        Core.instance.startGame();
    }

    private setLevel(level: string): void
    {
        if (level != "")
        {
            Progress.currentLevel = +level;  //parse in Level
        }
    }

    private startGame(e: GUIEvent = null): void
    {
        var game: Game = new Game();
        if (this.blind)
        {
            this.addChildAt(game, this.getNumChildren() - 1); // under blind
        }
        else
        {
            this.addChild(game);
        }
        game.createHint();
        game.on(GameEvent.RESTART, this.restartHandler, this);
        game.on(GameEvent.LEVEL_COMPLETE, this.completeHandler, this);

        this.currentView = game;
        game.on(GUIEvent.GOTO_WINDOW, this.gotoHandler, this);
    }

    private addBlind(): void
    {
        if (!this.blind)
        {
            this.blind = new Blind();
            this.addChild(this.blind);

            this.blind.on(GUIEvent.BLIND_CLOSED, this.removeView, this);  //clap
            this.blind.on(GUIEvent.BLIND_CLOSED, this.startGame, this);  //clap
            this.blind.on(GameEvent.COMPLETE, this.removeBlind, this);
        }
    }

    private removeBlind(e: GameEvent): void
    {
        this.blind.removeAllEventListeners();
        this.removeChild(this.blind);
        this.blind.destroy();
        this.blind = null;
    }

    private addView(type: string): void
    {
        this.removeView();

        switch (type)
        {
            case View.MAIN_MENU:
                this.currentView = new MainMenu();
                //this.currentView.name = "MainMenu";
                break;
            case View.CREDITS:
                this.currentView = new Credits();
                //this.currentView.name = "Credits";
                break;
            case View.LEVELS:
                this.currentView = new Levels();
                //this.currentView.name = "Levels";
                this.currentView.on(GameEvent.GOTO_LEVEL, this.gotoLevelHandler, this);
                break;
            case View.INTRO:
                this.currentView = new Intro();
                //this.currentView.name = "Intro";
                break;
            case View.GAME_COMPLETE:
                this.currentView = new GameComplete();
                break;
            default:
                console.log("switch", type);
        }
        this.addChild(this.currentView);
        Main.forceUpdate();

        this.currentView.on(GUIEvent.GOTO_WINDOW, this.gotoHandler, this);
    }

    private removeView(e: GUIEvent = null): void
    {
        Progress.currentStars = 0;

        if (this.currentView)
        {
            this.removeChild(this.currentView);
            this.currentView.removeAllEventListeners();
            this.currentView.destroy();
            this.currentView = null;
        }
    }

    private gotoHandler(e: GUIEvent): void
    {
        if (this.currentView instanceof Game)
        {
            SoundManager.instance.setLocation(SoundManager.MUSIC_MENU);
        }

        this.removeView();

        if (e.window == View.GAME)
        {
            SoundManager.instance.setLocation(SoundManager.MUSIC_GAME);
            this.addBlind();
        }
        else
        {
            this.addView(e.window);
        }
    }

    private gotoLevelHandler(e: GameEvent): void
    {
        this.removeView();

        if (e.objectType != "0")
        {
            SoundManager.instance.setLocation(SoundManager.MUSIC_GAME);
            this.setLevel(e.objectType);
            this.addBlind();
        }
        else
        {
            Progress.currentLevel = 0;
            this.addView(View.INTRO);
        }
    }

    public getView(): View
    {
        return this.currentView;
    }
}  