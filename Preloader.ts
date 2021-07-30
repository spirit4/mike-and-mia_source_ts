class Preloader extends createjs.Container
{
    private loader: createjs.LoadQueue;
    private progress: createjs.Bitmap;

    private progressWidth: number;
    private text: createjs.Text;

    static a10logo: HTMLImageElement;

    private texts: string[] = [
        "Warming up for jumping...",
        "Counting hearts...",
        "Putting on best smile...",
        "Coloring the letter M...",
    ];

    constructor()
    {
        super();

        var manifest = [
            { src: "images/preloader/PreloaderBack.png", id: ImagesRes.PRELOADER_BG },
            { src: "images/preloader/Bar.png", id: "progress" },
        ];

        this.loader = new createjs.LoadQueue(false, "", true);
        this.loader.on(GameEvent.COMPLETE, this.completeHandler, this);
        this.loader.loadManifest(manifest);
    }

    private completeHandler(): void
    {
        this.loader.removeAllEventListeners();

        var zibboLogo: any = document.createElement("img");
        zibboLogo.crossOrigin = "Anonymous";
        zibboLogo.src = Core.instance.api.Branding.getLogo().image;

        Preloader.a10logo = <HTMLImageElement> zibboLogo;

        var bd: HTMLImageElement;
        bd = <HTMLImageElement> this.loader.getResult(ImagesRes.PRELOADER_BG);
        var bitmap: createjs.Bitmap = new createjs.Bitmap(bd);
        Core.instance.bg.addBg(ImagesRes.PRELOADER_BG, bitmap);

        bd = <HTMLImageElement> this.loader.getResult("progress");
        this.progressWidth = bd.width;

        this.progress = new createjs.Bitmap(bd);
        this.addChild(this.progress);
        this.progress.x = 125;
        this.progress.y = 524 - Config.PADDING;
        this.progress.sourceRect = new createjs.Rectangle(0, 0, 1, bd.height);
        this.progress.mouseEnabled = false;

        GameBranding.addLogo(this);

        this.addText();

        this.dispatchEvent(new createjs.Event(GameEvent.COMPLETE, false, false));
    }

    public initProgress(): void              
    {
        ImagesRes.loader.on(GameEvent.PROGRESS, this.progressHandler, this);
    }

    private progressHandler(e: GameEvent): void
    {
        this.progress.sourceRect.width = e.progress * this.progressWidth;

        if (e.progress == 1)
        {
            ImagesRes.loader.removeAllEventListeners();

            createjs.Tween.removeTweens(this.text);
            this.text.text = "";
            this.removeChild(this.text);
            this.text = null;
            this.texts.length = 0;
            this.texts = null;

            var play: Button = new Button(ImagesRes.BUTTON_PLAY_PRE, ImagesRes.BUTTON_PLAY_PRE_OVER);
            this.addChild(play);
            play.x = Config.STAGE_W - play.width >> 1;
            play.y = 400;
            play.on(GUIEvent.MOUSE_CLICK, this.clickHandler, this);

            GameBranding.addSplash();
        }
    }

    private clickHandler(e: createjs.MouseEvent): void
    {
        e.currentTarget.removeAllEventListeners();

        Core.instance.bg.removeBg(ImagesRes.PRELOADER_BG);
        this.dispatchEvent(new createjs.Event(GameEvent.COMPLETE, false, false));

        this.removeAllChildren();
        this.loader.removeAll();
        this.progress = null;
        this.loader = null;
    }

    private addText(): void
    {
        var text: createjs.Text = new createjs.Text(this.texts[0], "bold 30px Trebuchet MS", "#0888B5");
        this.addChild(text);
        text.mouseEnabled = false;
        text.snapToPixel = true;
        text.y = 400;
        this.text = text;

        this.changeText(0);
    }

    private changeText(index:any): void
    {
        this.text.text = this.texts[index];
        this.text.regX = this.text.getBounds().width >> 1;
        this.text.x = Config.STAGE_W >> 1;
        createjs.Tween.get(this.text).wait(5000).call(this.changeText, [(index + 1 >= this.texts.length ? 0 :(index + 1))], this);
    }
} 