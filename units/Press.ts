class Press implements ICollidable
{
    public view: createjs.Bitmap;
    public index: number;
    public type: string;

    constructor(bitmap: createjs.Bitmap, index: number, type: string)
    {
        this.view = bitmap;
        this.index = index;
        this.type = type;
    }

    public turnOff(): void
    {
        var bitmap: createjs.Bitmap = <createjs.Bitmap> this.view;
        bitmap.image = ImagesRes.getImage(ImagesRes.PRESS + 1);
    }
} 