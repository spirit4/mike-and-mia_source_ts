class LayerBg extends createjs.Container
{
    private bgTypes: string[] = [
        ImagesRes.MAIN_BG,
        ImagesRes.CREDITS_BG,
        ImagesRes.GAME_BG,
        ImagesRes.GAME_COMPLETE_BG,
        ImagesRes.INTRO_BG,
        ImagesRes.LEVEL_SELECT_BG,
    ];

    private bgs: { [index: string]: createjs.Bitmap; } = {};
    private preloaderBg: createjs.Bitmap;

    constructor()
    {
        super();
        this.snapToPixel = true;
    }

    public initAll(): void
    {
        for (var i: number = 0; i < this.bgTypes.length; i++)
        {
            var bitmap: createjs.Bitmap = new createjs.Bitmap(ImagesRes.getImage(this.bgTypes[i]));
            bitmap.snapToPixel = true;
            this.addChild(bitmap);
            bitmap.visible = false;

            this.bgs[this.bgTypes[i]] = bitmap;
        }
    }

    public addBg(type:string, bitmap:createjs.Bitmap = null): void
    {
        if (type == ImagesRes.PRELOADER_BG)
        {
            bitmap.snapToPixel = true;
            this.addChild(bitmap);
            this.preloaderBg = bitmap;
        }
        else
        {
            this.bgs[type].visible = true;
        }

        this.update();
    }

    public removeBg(type:string): void
    {
        if (type == ImagesRes.PRELOADER_BG)
        {
            this.removeChild(this.preloaderBg);
            this.preloaderBg = null;
        }

        this.update();
    }

    public removeAllBg(): void
    {
        for (var type in this.bgs)
        {
            this.bgs[type].visible = false;
        }

        this.update();
    }

    private update(): void
    {
        this.getStage().update();
    }

    public addShape(shape: createjs.Shape): void
    {
        this.addChild(shape);
        this.update();
    }

    public removeAllShapes(): void
    {
        var len: number = this.getNumChildren() - 1;
        for (var i: number = len; i >= 0; i--)
        {
            if (this.getChildAt(i) instanceof createjs.Shape)
            {
                this.removeChild(this.getChildAt(i));
            }
        }
        this.update();
    }
} 