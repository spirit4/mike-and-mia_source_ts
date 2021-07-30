class Barrier implements ICollidable
{
    public view: createjs.DisplayObject;
    public index: number;
    public type: string;

    constructor(sprite: createjs.Sprite, index: number, type:string)
    {
        this.view = sprite;
        this.index = index;
        this.type = type;
        sprite.stop();
    }


    public turnOff(): void
    {
        var sprite: createjs.Sprite = <createjs.Sprite> this.view;
        sprite.gotoAndPlay(ImagesRes.A0_BARRIER);
        sprite.framerate = 20;
        sprite.on(GameEvent.ANIMATION_COMPLETE, this.completeHandler, this);
    }

    private completeHandler(e: createjs.Event): void
    {
        this.view.removeAllEventListeners();
        var sprite: createjs.Sprite = <createjs.Sprite> this.view;
        sprite.stop();
    }
} 