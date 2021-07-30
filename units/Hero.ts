class Hero extends createjs.Container
{
    //states
    static IDLE: string = 'idle';
    static MOVE: string = 'move';
    static MOVE_IDLE: string = 'moveIdle';
    static FALL: string = 'fall';

    private grid: Tile[];

    private directionIndex: number = 0;
    private directionX: number = 0;
    private directionY: number = 0;

    private currentState: string = 'idle';

    private currentIndex: number;
    private pointMove: createjs.Point;
    private timeMove: number;
    private SPEED: number = 300;

    private view: createjs.Sprite;
    private arrows: createjs.Container;

    static currentTween: createjs.Tween;
    static currentView: createjs.Sprite;

    public type: string;
    private lastStateIsActive: boolean = false;
    private allLen: number = 0;
    private step: number = 0;

    private partner: Hero;
    private callbackIdle: Function;

    constructor(index: number, type: string)
    {
        super();
        this.grid = Core.instance.model.grid;
        this.currentIndex = index;
        this.type = type;

        var arr: Array<any> = this.getAnimation(Hero.IDLE);
        Hero.currentView = this.view = new createjs.Sprite(arr[0], arr[1]);
        this.view.snapToPixel = true;
        this.view.framerate = 45;

        this.x = this.grid[index].x;         this.y = this.grid[index].y;
        this.view.x = Config.SIZE_W - 100 >> 1;         this.view.y = Config.SIZE_H - 195;

        Hero.currentTween = createjs.Tween.get(this).wait(30).call(this.addHeroView, [], this);
    }

    private addHeroView(): void
    {
        this.addChild(this.view);

        this.arrows = new createjs.Container();
        this.parent.addChild(this.arrows);
        this.arrows.snapToPixel = true;
        this.arrows.visible = false;

        var w: number = 80;
        var h: number = 100;
        var bd: HTMLImageElement = ImagesRes.getImage(ImagesRes.HERO_ARROW);
        var delta: number = 10;
        Utils.addBitmap(w >> 1, (-bd.height * 0.5 - delta), bd, this.arrows, false, 0, true);
        Utils.addBitmap(w >> 1, h + bd.height * 0.5 + delta, bd, this.arrows, false, 180, true);

        Utils.addBitmap(w + bd.width * 0.5 + delta, h >> 1, bd, this.arrows, false, 90, true);
        Utils.addBitmap(-bd.width * 0.5 - delta, h >> 1, bd, this.arrows, false, 270, true);

        this.arrows.mouseChildren = false;
        this.arrows.mouseEnabled = false;

        var arr: Array<any> = this.getAnimation(Hero.IDLE);
        this.view.gotoAndPlay(arr[1]);
    }

    public moveToCell(directionX: number, directionY: number, len: number, step: number): void
    {
        this.directionIndex = step * len + this.currentIndex;
        this.allLen = len;
        this.step = step;

        this.directionX = directionX;
        this.directionY = directionY;

        var index: number = this.currentIndex;
        var time: number = 0;

        if (this.grid[index].isContainType(ImagesRes.PRESS + 0))
        {
            index += step;
            time += this.SPEED;
        }

        while (true)
        {
            if (!this.isPossibility(index, step, time))
                break;

            if (index == this.directionIndex)
            {
                this.currentIndex = this.directionIndex;
                this.timeMove = time;
                this.move();
                return;
            }

            this.allLen--;
            index += step;
            time += this.SPEED;
        }
    }

    private isPossibility(index: number, step: number, time: number): boolean
    {
        var x: number = 0;
        var y: number = 0;

        if (((step == 1 || step == -1) && (index < 0 || index >= this.grid.length ||
            (index != this.currentIndex && this.grid[index].y != this.grid[index - step].y))) ||
            ((step == Config.WIDTH || step == -Config.WIDTH) && (index < 0 || index >= this.grid.length)))
        {
            this.currentIndex = index - step;
            this.timeMove = time;
            this.move();

            return false;
        }
        else if (this.grid[index].isContainType(ImagesRes.LEGO) || this.grid[index].isContainType(ImagesRes.BARRIER))
        {
            if (this.allLen < 1)
            {
                this.moveIdle();
            }
            else
            {
                this.currentIndex = index - step;
                this.timeMove = time;
                this.move();
            }
            return false;
        }
        else if (this.grid[index].isContainType(ImagesRes.STAR))
        {
            this.currentIndex = index;
            this.timeMove = time;

            this.move(true);
            return false;
        }
        else if (this.grid[index].isContainType(ImagesRes.HOLE_MARK))
        {
            this.currentIndex = index - step;
            this.timeMove = time - this.SPEED;
            this.move(true);
            return false;
        }
        else if (this.grid[index].isContainType(ImagesRes.PRESS + 0))
        {
            this.currentIndex = index;
            this.timeMove = time;

            this.move(true);
            return false;
        }

        return true;
    }

    private changeView(): void
    {
        if (!this.view)        //game complete
        {
            return;
        }

        if (this.currentState == Hero.IDLE)
        {
            var arr: Array<any> = this.getAnimation(Hero.IDLE);
            this.view.spriteSheet = arr[0];
            this.view.gotoAndPlay(arr[1]);
        }
        else if (this.currentState == Hero.MOVE || this.currentState == Hero.MOVE_IDLE)
        {
            var arr: Array<any> = this.getAnimation(Hero.MOVE);
            this.view.spriteSheet = arr[0];
            this.view.gotoAndPlay(arr[1]);
        }
        else if (this.currentState == Hero.FALL)
        {
            var arr: Array<any> = this.getAnimation(Hero.FALL);
            this.view.spriteSheet = arr[0];
            this.view.gotoAndPlay(arr[1]);
            this.view.framerate = 20;
            this.view.y = Config.SIZE_H - 200;
            this.view.on(GameEvent.ANIMATION_COMPLETE, this.die, this);

            var bd: HTMLImageElement = ImagesRes.getImage(ImagesRes.OOPS);
            var bitmap: createjs.Bitmap = new createjs.Bitmap(bd);
            this.parent.addChild(bitmap);
            bitmap.x = Config.STAGE_W >> 1;
            bitmap.y = 350;
            bitmap.regX = bd.width >> 1;
            bitmap.regY = bd.height >> 1;
            createjs.Tween.get(bitmap).from({ scaleX: 0.2, scaleY: 0.2, alpha: 0 }, 400, createjs.Ease.bounceOut);
        }
    }

    //-------actions---------------------------------
    private idle(): void
    {
        if (this.directionX == -1 || this.directionY == -1) //left | top
        {
            this.grid[this.currentIndex].setIndex(this, false);
        }

        if (this.directionX == 1 || this.directionY == 1)
        {
            this.grid[this.currentIndex].setIndex(this);
        }

        if (this.currentIndex == this.partner.index ||
            this.currentIndex - 1 == this.partner.index ||
            this.currentIndex + 1 == this.partner.index ||
            this.currentIndex - Config.WIDTH == this.partner.index ||
            this.currentIndex + Config.WIDTH == this.partner.index)
        {
            if ((this.x == this.partner.x || this.y == this.partner.y) &&
                (this.partner.state == Hero.IDLE || this.partner.state == Hero.MOVE_IDLE))
            {
                this.levelComplete();
            }

        }

        if (this.partner.state == Hero.MOVE_IDLE)
        {
            this.partner.stopMoveIdle();
        }

        this.directionIndex = 0;
        this.currentState = Hero.IDLE;

        if (this.lastStateIsActive)
        {
            this.arrows.x = this.x + this.view.x + 10;
            this.arrows.y = this.y + this.view.y + 65;
            this.arrows.visible = true;
        }
        this.changeView();

        if (this.callbackIdle)
            this.callbackIdle(this.parent);
    }

    private levelComplete(): void
    {

        this.view.removeAllEventListeners();
        this.dispatchEvent(new GameEvent(GameEvent.LEVEL_COMPLETE, false, false));
    }

    private move(isContinue: boolean = false): void
    {
        var handler: any = !isContinue ? this.idle : this.keepMove;

        if (this.directionX == 1 || this.directionY == 1)
        {
            this.grid[this.currentIndex].setIndex(this);
        }

        this.currentState = Hero.MOVE;
        Hero.currentTween = createjs.Tween.get(this).to({ x: this.grid[this.currentIndex].x, y: this.grid[this.currentIndex].y }, this.timeMove, createjs.Ease.linear).call(handler, [], this);

        this.timeMove = -1;
        this.arrows.visible = false;
        this.changeView();
    }

    private keepMove(): void
    {
        var ev: GameEvent = new GameEvent(GameEvent.COLLISION, true);
        ev.index = this.currentIndex;

        if (this.directionX == -1 || this.directionY == -1) //left | top
            this.grid[this.currentIndex].setIndex(this, false);

        var isSkipStep: boolean = false;
        if (this.grid[this.currentIndex].isContainType(ImagesRes.PRESS + 0))
        {
            ev.objectType = ImagesRes.PRESS;
            this.dispatchEvent(ev);

            this.moveToCell(this.directionX, this.directionY, this.allLen, this.step);
        }
        else if (this.grid[this.currentIndex].isContainType(ImagesRes.STAR))
        {
            ev.objectType = ImagesRes.STAR;
            this.dispatchEvent(ev);

            this.moveToCell(this.directionX, this.directionY, this.allLen, this.step);
        }
        else if (this.grid[this.currentIndex + this.step].isContainType(ImagesRes.HOLE_MARK))
        {
            this.currentIndex = this.currentIndex + this.step;
            this.timeMove = this.SPEED;
            Hero.currentTween = createjs.Tween.get(this).to({ x: this.grid[this.currentIndex].x, y: this.grid[this.currentIndex].y }, this.timeMove, createjs.Ease.linear);

            if (this.directionX == 1 || this.directionY == 1)
            {
                this.grid[this.currentIndex].setIndex(this);
            }

            this.currentState = Hero.FALL;
            this.changeView();
        }
        else
        {
            this.idle();
        }
    }

    private moveIdle(): void
    {
        if (this.partner.state == Hero.MOVE_IDLE)
        {
            this.partner.stopMoveIdle();
            return;
        }

        this.currentState = Hero.MOVE_IDLE;
        this.changeView();
    }

    public stopMoveIdle(): void
    {
        this.currentState = Hero.IDLE;
        this.changeView();
    }

    private die(e:GameEvent): void
    {
        this.parent.removeChildAt(this.parent.getNumChildren() - 1);//oops

        this.view.stop();
        this.dispatchEvent(new GameEvent(GameEvent.RESTART, true));
    }

    public activate(): void
    {
        this.arrows.x = this.x + this.view.x + 10;
        this.arrows.y = this.y + this.view.y + 65;
        this.lastStateIsActive = this.arrows.visible = true;
    }

    public deactivate(): void
    {
        this.lastStateIsActive = this.arrows.visible = false;
    }

    public destroy(): void
    {
        this.removeAllEventListeners();
        createjs.Tween.removeTweens(this);
        this.removeAllChildren();

        this.pointMove = null;
        Hero.currentTween = null;
        Hero.currentView = null;
        this.view = null;
    }

    //-------get and set---------------------------------
    public get index(): number
    {
        return this.currentIndex;
    }

    public get state(): string
    {
        return this.currentState;
    }

    private getAnimation(type: string): Array<any>
    {
        if (this.type == ImagesRes.HERO + 0) // Boy
        {
            switch (type)
            {
                case Hero.IDLE:
                    return [JSONRes.atlas0, ImagesRes.A0_BOY_IDLE];
                    break;
                case Hero.MOVE:
                    return [JSONRes.atlas0, ImagesRes.A0_BOY_MOVE];
                    break;
                case Hero.FALL:
                    return [JSONRes.atlas0, ImagesRes.A0_BOY_FALL];
                    break;

            }
        }
        else
        {
            switch (type)
            {
                case Hero.IDLE:
                    return [JSONRes.atlas1, ImagesRes.A1_GIRL_IDLE];
                    break;
                case Hero.MOVE:
                    return [JSONRes.atlas0, ImagesRes.A0_GIRL_MOVE];
                    break;
                case Hero.FALL:
                    return [JSONRes.atlas1, ImagesRes.A1_GIRL_FALL];
                    break;

            }
        }

        return ["incorrect", "animation"];
    }

    public isActive(): boolean
    {
        return this.arrows.visible;
    }

    public setPartner(hero: Hero): void
    {
        this.partner = hero;
    }

    public setIdleCallback(callback: Function): void
    {
        this.callbackIdle = callback;
    }
}