class Tile
{
    public x: number;
    public y: number;
    public index: number;

    public objects: createjs.DisplayObject[];
    public types: string[];

    constructor(x: number, y: number, index: number)
    {
        this.x = x;
        this.y = y;
        this.index = index;
        this.objects = [];
        this.types = [];
    }

    public add(type: string, container: createjs.Container, grid: Tile[]= null, isEditor: boolean = false): createjs.DisplayObject
    {
        this.types.push(type);
        var dObject: createjs.DisplayObject = this.getAlignedDO(type);
        this.objects.push(dObject);
        container.addChild(dObject);

        if (isEditor)
        {
            this.setCorrectIndex(dObject, container, grid);    //only EDITOR!
        }

        return dObject;
    }

    private getAlignedDO(type: string): createjs.DisplayObject
    {
        var bd: HTMLImageElement = ImagesRes.getImage(type);
        var dObject: createjs.DisplayObject;
        var sprite: createjs.Sprite;

        switch (type)
        {
            case ImagesRes.HERO + 0:  //editor
            case ImagesRes.HERO + 1:
                dObject = new createjs.Bitmap(bd);
                dObject.x = this.x + (-bd.width + Config.SIZE_W >> 1);                 dObject.y = this.y + Config.SIZE_H - bd.height - 15;
                break;

            case ImagesRes.HERO_ARROW://editor
            case ImagesRes.HOLE_MARK://editor
                dObject = new createjs.Bitmap(bd);
                dObject.x = this.x + (-bd.width + Config.SIZE_W >> 1);                 dObject.y = this.y;
                break;

            case ImagesRes.PRESS + 0:
            case ImagesRes.NUT + 0:
            case ImagesRes.NUT + 1:
                dObject = new createjs.Bitmap(bd);
                dObject.x = this.x + (-bd.width + Config.SIZE_W >> 1);                 dObject.y = this.y + Config.SIZE_H - bd.height - 2;
                break;

            case ImagesRes.PENCIL + 0:
            case ImagesRes.PENCIL + 1:
            case ImagesRes.PENCIL + 2:
            case ImagesRes.PENCIL + 3:
                dObject = new createjs.Bitmap(bd);
                dObject.x = this.x + Config.SIZE_W - bd.width - 10;                 dObject.y = this.y + Config.SIZE_H - bd.height - 5;
                break;

            case ImagesRes.PENCIL2 + 0:
            case ImagesRes.PENCIL2 + 1:
            case ImagesRes.PENCIL2 + 2:
            case ImagesRes.PENCIL2 + 3:
                dObject = new createjs.Bitmap(bd);
                dObject.scaleX = -1;
                dObject.x = this.x + bd.width + 10;                 dObject.y = this.y + Config.SIZE_H - bd.height - 5;
                break;

            case ImagesRes.HOLE + 0:
            case ImagesRes.HOLE + 1:
            case ImagesRes.HOLE + 2:
                dObject = new createjs.Bitmap(bd);
                dObject.x = this.x;                 dObject.y = this.y;
                break;

            case ImagesRes.CORK + 0:
            case ImagesRes.CORK + 1:
                dObject = new createjs.Bitmap(bd);
                dObject.x = this.x + 5;                 dObject.y = this.y - 13;
                break;

            case ImagesRes.ERASER:
                dObject = new createjs.Bitmap(bd);
                dObject.x = this.x + 2;                 dObject.y = this.y + 2;
                break;

            case ImagesRes.STAR:
                sprite = new createjs.Sprite(JSONRes.atlas0, ImagesRes.A0_STAR);
                sprite.framerate = 30;
                sprite.x = this.x + (-sprite.getBounds().width + Config.SIZE_W >> 1);
                sprite.y = this.y + (Config.SIZE_H - sprite.getBounds().height - 20);
                dObject = sprite;
                break;

            case ImagesRes.BARRIER:
                sprite = new createjs.Sprite(JSONRes.atlas0, ImagesRes.A0_BARRIER);
                sprite.framerate = 30;
                sprite.stop();
                sprite.x = this.x + (-sprite.getBounds().width + Config.SIZE_W >> 1);
                sprite.y = this.y + (Config.SIZE_H - sprite.getBounds().height + 30);
                dObject = sprite;
                break;

            default:
                if (type.substr(0, 4) == ImagesRes.LEGO)
                {
                    dObject = new createjs.Bitmap(bd);
                    dObject.x = this.x;                     dObject.y = this.y - 20;
                }
                else
                {
                    dObject = new createjs.Bitmap(bd);
                    dObject.x = this.x;                     dObject.y = this.y - 10;
                }
        }

        dObject.snapToPixel = true;
        return dObject;
    }

    private setCorrectIndex(dObject: createjs.DisplayObject, container: createjs.Container, grid: Tile[]): void
    {
        var displayIndex: number = 0;
        var len: number = grid.length;
        for (var i: number = 0; i < len; i++)
        {
            displayIndex += grid[i].objects.length;
            if (i == this.index)
            {
                container.addChildAt(dObject, displayIndex);
                break;
            }
        }
    }

    public remove(type: string): void
    {
        var index: number = this.types.indexOf(type);

        if (index != -1)
        {
            var dObject: createjs.DisplayObject = this.objects[index];
            dObject.parent.removeChild(dObject);
            this.objects.splice(index, 1);
            this.types.splice(index, 1);
        }
    }

    public addType(type: string): void
    {
        var index: number = this.types.indexOf(type);

        if (index == -1)
        {
            this.types.push(type);
        }
    }

    public removeType(type: string): void
    {
        var index: number = this.types.indexOf(type);

        if (index != -1)
        {
            this.types.splice(index, 1);
        }
    }

    public removeObject(dObject: createjs.DisplayObject): void
    {
        var index: number = this.objects.indexOf(dObject);

        if (index != -1)
        {
            this.objects.splice(index, 1);
        }
    }

    public getObject(type: string): createjs.DisplayObject
    {
        var index: number = this.types.indexOf(type);

        if (index != -1)
        {
            return this.objects[index];
        }

        return null;
    }

    public isContainType(type: string): boolean
    {
        var index: number = this.types.indexOf(type);
        if (index != -1)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    public isContainTypes(type: string): boolean
    {
        var index0: number = this.types.indexOf(type + 0);
        var index1: number = this.types.indexOf(type + 1);
        var index2: number = this.types.indexOf(type + 2);
        var index3: number = this.types.indexOf(type + 3);
        if (index0 != -1 || index1 != -1 || index2 != -1 || index3 != -1)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    public clear(): void
    {
        for (var i: number = 0; i < this.objects.length; i++)
        {
            this.objects[i].parent.removeChild(this.objects[i]);
        }
        this.objects.length = 0;
        this.types.length = 0;
    }

    public getFirstIndex(): number
    {
        if (this.objects.length == 0)
        {
            return -1;
        }

        return this.objects[0].parent.getChildIndex(this.objects[0]);
    }


    public getLastIndex(container: createjs.Container): number
    {
        var grid: Tile[] = Core.instance.model.grid;
        var index: number = this.index;

        var objects: createjs.DisplayObject[] = grid[index].objects;

        while (objects.length == 0)
        {
            index--;
            
            if (index == -1)
            {
                return 2;  //gui + grid
            }
            objects = grid[index].objects;
        }


        return container.getChildIndex(objects[0]) + objects.length - 1;
    }

    public getIndex(type: string): number //-1 if no exist
    {
        var arrayIndex: number = this.types.indexOf(type);

        if (arrayIndex == -1)
            return -1;

        var container: createjs.Container = <createjs.Container> this.objects[arrayIndex].parent;
        return container.getChildIndex(this.objects[arrayIndex]);
    }

    public setIndex(dObject: createjs.Container, isHeroUnder: boolean = true): void
    {

        var index: number;

        index = this.getLastIndex(dObject.parent);

        dObject.parent.addChildAt(dObject, index + 1);

    }
}  
