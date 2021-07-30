class Button extends createjs.Container
{
    public width: number;
    public height: number;

    private bitmap: createjs.Bitmap;
    private typeOver: string;
    private typeOut: string;

    private typeOverOff: string;
    private typeOutOff: string;

    public currentState: boolean = true;

    constructor(out: string, over: string, outOff: string = "", overOff: string= "")
    {
        super();

        this.snapToPixel = true;

        this.typeOver = over;
        this.typeOut = out;
        this.typeOverOff = overOff;
        this.typeOutOff = outOff;

        var bd: HTMLImageElement = ImagesRes.getImage(out);
        this.width = bd.width;
        this.height = bd.height;
        this.bitmap = new createjs.Bitmap(bd);
        this.addChild(this.bitmap);

        this.on(GUIEvent.MOUSE_DOWN, this.overHandler, this);
        this.on(GUIEvent.MOUSE_UP, this.outHandler, this);

        if (outOff != "")
        {
            this.on(GUIEvent.MOUSE_CLICK, this.clickHandler, this);
            this.setState();
            SoundManager.instance.setCurrentButton(this);
        }
    }

    public overHandler(e:createjs.MouseEvent = null): void
    {
        if (e)
        {
            e.stopPropagation();
        }
        
        var type: string = this.currentState ? this.typeOver : this.typeOverOff;

        var w: number = this.bitmap.image.width;
        var h: number = this.bitmap.image.height;
        var bd: HTMLImageElement = ImagesRes.getImage(type);
        this.bitmap.image = bd;
        this.bitmap.x = w - bd.width >> 1;
        this.bitmap.y = h - bd.height >> 1;
    }

    public outHandler(e: createjs.MouseEvent = null): void
    {
        if (e)
        {
            e.stopPropagation();
        }
        var type: string = this.currentState ? this.typeOut : this.typeOutOff;

        this.bitmap.image = ImagesRes.getImage(type);
        this.bitmap.x = 0;
        this.bitmap.y = 0;
    }

    private clickHandler(e: createjs.MouseEvent): void
    {
        this.currentState = !this.currentState;
        this.outHandler();
        SoundManager.instance.muteOnOff();
    }

    public setState(): void
    {
        this.currentState = SoundManager.instance.getIsMusic();
        this.outHandler()
	}

    /**delay:number*/
    public clasp(delay:any): void
    {
        createjs.Tween.get(this, { ignoreGlobalPause: true }).wait(delay).to({ scaleX: 0.95, scaleY: 1.05 }, 600, createjs.Ease.quadInOut).call(this.unclasp, [], this);
    }

    private unclasp(): void
    {
        createjs.Tween.get(this, { ignoreGlobalPause: true }).to({ scaleX: 1.05, scaleY: 0.95 }, 600, createjs.Ease.quadInOut).call(this.clasp, [0], this);
    }
}