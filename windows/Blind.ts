class Blind extends createjs.Container
{
    //private bitmaps: Array<createjs.Bitmap> = [];
    //private coords: Array<Array<number>> =
    //[
    //    [342, 340, 2],
    //    [101, 92, 0],
    //    [243, 144, 1],
    //    [185, 486, 0],
    //    [423, 230, 0],
    //    [140, 343, 1],
    //    [23, 239, 2],
    //    [288, 511, 1],
    //    [327, 76, 2],
    //    [55, 432, 0],
    //    [179, 30, 1],
    //    [180, 163, 3],
    //];


    constructor()
    {
        super();

        //this.addBitmap();
        createjs.Tween.get(this).wait(10).call(this.addBitmap, [], this);
    }

    private addBitmap(): void
    {
        //var index = this.bitmaps.length;
        //if (index == this.coords.length)
        //{
        this.dispatchEvent(new GUIEvent(GUIEvent.BLIND_CLOSED, false, false)); 
        //    createjs.Tween.get(this).wait(200).call(this.removeBitmap, [], this);
        //    return;
        //}

        //var bd: HTMLImageElement = ImagesRes.getImage(ImagesRes.BLIND_ITEM + this.coords[index][2]);
        //var bitmap: createjs.Bitmap = new createjs.Bitmap(bd);
        //bitmap.mouseEnabled = false;
        //bitmap.snapToPixel = true;
        //this.addChild(bitmap);
        //bitmap.x = this.coords[index][0];
        //bitmap.y = this.coords[index][1];
        //this.bitmaps.push(bitmap);

        //createjs.Tween.get(this).wait(30).call(this.addBitmap, [], this);
        createjs.Tween.get(this).wait(10).call(this.removeBitmap, [], this);
    }

    private removeBitmap(): void
    {
        //if (this.bitmaps.length == 0)
        //{
            this.dispatchEvent(new GameEvent(GameEvent.COMPLETE, false, false));
        //    return;
        //}

        //var bitmap: createjs.Bitmap = this.bitmaps.pop();
        //this.removeChild(bitmap);
        //createjs.Tween.get(bitmap).wait(30).call(this.removeBitmap, [], this);
    }


    public destroy(): void
    {
        //this.coords.length = 0;
        //this.coords = null;

        //this.bitmaps.length = 0;
        //this.bitmaps = null;
    }
} 