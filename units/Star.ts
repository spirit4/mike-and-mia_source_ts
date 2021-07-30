class Star implements ICollidable
{
    public view: createjs.DisplayObject;
    public index: number;
    public type: string;

    constructor(sprite: createjs.Sprite, index: number, type:string)
    {
        this.view = sprite;
        this.index = index;
        this.type = type;
    }

} 