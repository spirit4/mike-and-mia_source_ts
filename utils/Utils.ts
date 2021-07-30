class Utils
{      static getIndex(localX: number, localY: number): number
    {         var cellX: number = Math.floor(localX / 80);         var cellY: number = Math.floor(localY / 70);         return cellY * 8 + cellX;     }      static getPoint(i: number): createjs.Point
    {         var cellY: number = (Math.floor(i / Config.WIDTH)) * Config.SIZE_W;         var cellX: number = (i - Math.floor(i / Config.WIDTH) * Config.WIDTH) * Config.SIZE_H;         return new createjs.Point(cellX, cellY);     }      static addBitmap(x: number, y: number, type: string, container: createjs.Container, mouseEnabled?: boolean, rot?: number, isRegCenter?: boolean): void;
    static addBitmap(x: number, y: number, bd: HTMLImageElement, container: createjs.Container, mouseEnabled?: boolean, rot?: number, isRegCenter?: boolean): void; 
    static addBitmap(x: number, y: number, value: any, container: createjs.Container, mouseEnabled: boolean = false, rot: number = 0, isRegCenter: boolean = false): void
    {         var bitmap: createjs.Bitmap;         var bd: HTMLImageElement;         if (value && typeof value == "string")
        {
            bd = ImagesRes.getImage(value);
            bitmap = new createjs.Bitmap(bd);
        }
        else if (value && value instanceof HTMLImageElement)
        {
            bd = <HTMLImageElement> value;
            bitmap = new createjs.Bitmap(bd);
        }

        bitmap.snapToPixel = true;         bitmap.mouseEnabled = mouseEnabled;         container.addChild(bitmap);         bitmap.x = x;         bitmap.y = y;         bitmap.rotation = rot;          if (isRegCenter)         {             bitmap.regX = bd.width >> 1;             bitmap.regY = bd.height >> 1;         }     }  }  