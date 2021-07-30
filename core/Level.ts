class Level
{
    private model: Model;
    private container: createjs.Container;

    public heroGirl: Hero;
    public heroBoy: Hero;
    public stars: { [index: number]: ICollidable; };
    public presses: { [index: number]: ICollidable; };     public barriers: { [index: number]: ICollidable; }; 
    constructor(container: createjs.Container, model: Model)
    {
        this.container = container;
        this.model = model;

        this.stars = {};
        this.presses = {};
        this.barriers = {};

        var cells: Object[];
        if (JSONRes.levelFromEditor)
        {
            cells = JSONRes.levelFromEditor;
        }
        else
        {
            cells = JSONRes.levels[Progress.currentLevel];
        }

        var index: number;
        var types: string[];
        for (var i: number = 0; i < cells.length; i++)
        {
            index = cells[i]['index'];

            types = <string[]>cells[i]['types'];

            for (var j: number = 0; j < types.length; j++)
            {
                this.checkCell(index, types[j], types, cells[i]);
            }
        }
    }

    private checkCell(index: number, type: string, types: string[], cell: Object): void
    {
        var bitmap: createjs.Bitmap;
        var sprite: createjs.Sprite;
        var grid: Tile[] = this.model.grid;
        switch (type)
        {
            case ImagesRes.HERO + 0:
                this.heroGirl = new Hero(index, type);
                this.container.addChild(this.heroGirl);
                break;
            case ImagesRes.HERO + 1:
                this.heroBoy = new Hero(index, type);
                this.container.addChild(this.heroBoy);
                break;

            case ImagesRes.PRESS + 0:
                bitmap = <createjs.Bitmap> grid[index].add(type, this.container, grid);

                var press: Press = new Press(bitmap, index, type);

                this.presses[index] = press;
                break;

            case ImagesRes.STAR:
                sprite = <createjs.Sprite> grid[index].add(type, this.container, grid);

                var star: Star = new Star(sprite, index, type);

                this.stars[index] = star;
                break;

            case ImagesRes.BARRIER:
                sprite = <createjs.Sprite> grid[index].add(type, this.container, grid);

                var barrier: Barrier = new Barrier(sprite, index, type);

                this.barriers[index] = barrier;
                break;

            case ImagesRes.DECOR + 0:
            case ImagesRes.DECOR + 1:
            case ImagesRes.DECOR + 2:
            case ImagesRes.DECOR + 3:
                bitmap = <createjs.Bitmap> grid[index].add(type, this.container, grid);
                bitmap.x = cell[type][0];
                bitmap.y = cell[type][1];

                break;

            case ImagesRes.HERO_ARROW:
                grid[index].addType(ImagesRes.LEGO);
                break;

            case ImagesRes.HOLE_MARK:
                grid[index].addType(ImagesRes.HOLE_MARK);
                break;

            default:
                grid[index].add(type, this.container, grid);
        }
    }
} 