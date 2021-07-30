///<reference path='../windows/View.ts'/>
class Game extends View
{     private grid: Tile[];     private model: Model;      private buttonMenu: Button;     private buttonSound: Button;     private buttonRestart: Button;      private currentLevel: Level;     private heroGirl: Hero;
    private heroBoy: Hero;     private currentHero: Hero;     private stars: { [index: number]: ICollidable; };     private presses: { [index: number]: ICollidable; };     private barriers: { [index: number]: ICollidable; };      private point: createjs.Point;     public help: createjs.Bitmap;     public pointer: createjs.Bitmap;      constructor()
    {         super();         this.model = Core.instance.model;         this.grid = this.model.grid;          this.x = Config.STAGE_W - Config.WIDTH * Config.SIZE_W >> 1;         this.y = Config.MARGIN_TOP;          super.addCommonBg(ImagesRes.GAME_BG);         this.createGUI();          this.currentLevel = new Level(this, this.model);         this.heroGirl = this.currentLevel.heroGirl;         this.heroBoy = this.currentLevel.heroBoy;         this.stars = this.currentLevel.stars;         this.presses = this.currentLevel.presses;         this.barriers = this.currentLevel.barriers;          this.heroBoy.setPartner(this.heroGirl);         this.heroBoy.setIdleCallback(this.createHintForIndex);         this.heroGirl.setPartner(this.heroBoy);         this.heroGirl.setIdleCallback(this.createHintForIndex);          this.on(GUIEvent.MOUSE_DOWN, this.movedownHandler, this);                  this.on(GameEvent.COLLISION, this.collisionProcess, this);         this.heroBoy.on(GameEvent.LEVEL_COMPLETE, this.showVictory, this);         this.heroGirl.on(GameEvent.LEVEL_COMPLETE, this.showVictory, this);          if (Core.instance.ga)
            Core.instance.ga.send('pageview', "/StartLevel-"+ (Progress.currentLevel + 1));     }      private movedownHandler(e: createjs.MouseEvent): void
    {         var point: createjs.Point = this.globalToLocal(e.stageX, e.stageY);                  if (e.target.parent instanceof Hero && !(<Hero> e.target.parent).isActive())
        {             this.currentHero = <Hero> e.target.parent;             if (this.currentHero.state != Hero.IDLE)
{                 return;                 }              this.heroGirl.deactivate();                 this.heroBoy.deactivate();                           this.currentHero.activate();                            this.removeHint();              this.createHintAfterAction();         }         else if (this.currentHero && this.currentHero.state == Hero.IDLE)
        {             var index: number = Utils.getIndex(point.x, point.y);              if (this.grid.length > index && index >= 0)
            {                 //this.removeHint();                  this.point = point;                 var pointTile: createjs.Point = new createjs.Point(this.grid[index].x, this.grid[index].y);                 this.checkPath(pointTile, index);             }         }              }      private checkPath(point: createjs.Point, indexPoint: number): void
    {         if (point.x == this.currentHero.x && point.y == this.currentHero.y)
        {
            return;
        }

        var index: number = indexPoint;
        var directionX: number = 0;
        var directionY: number = 0;
        var step: number = 0;

        if ((point.y == this.currentHero.y || point.y == this.currentHero.y - Config.SIZE_H) && point.x > this.currentHero.x)
        {
            step = 1;
            directionX = 1;

            if (point.y == this.currentHero.y - Config.SIZE_H)
            {
                index += Config.WIDTH;
            }
        }
        else if ((point.y == this.currentHero.y || point.y == this.currentHero.y - Config.SIZE_H) && point.x < this.currentHero.x)
        {
            step = -1;
            directionX = -1;

            if (point.y == this.currentHero.y - Config.SIZE_H)
            {
                index += Config.WIDTH;
            }
        }
        else if (point.x == this.currentHero.x && point.y > this.currentHero.y)
        {
            step = Config.WIDTH;
            directionY = 1;
        }
        else if (point.x == this.currentHero.x && point.y < this.currentHero.y)
        {
            step = -Config.WIDTH;
            directionY = -1;
        }         else
{             return;             }          var curIndex: number = this.currentHero.index;         for (var len: number = 0; curIndex != index; len++)
        {             curIndex += step;             }          if (directionX != 0)
        {             if (this.currentHero == this.heroGirl)
            {                 this.heroGirl.moveToCell(directionX, directionY, len, step);                     this.heroBoy.moveToCell(-directionX, directionY, len, -step);              }
            else if (this.currentHero == this.heroBoy)
            {                 this.heroBoy.moveToCell(directionX, directionY, len, step);                  this.heroGirl.moveToCell(-directionX, directionY, len, -step);             }         }         else
        {             this.heroGirl.moveToCell(directionX, directionY, len, step);              this.heroBoy.moveToCell(directionX, directionY, len, step);         }          this.removeHint();      }      private collisionProcess(e: GameEvent): void
    {         e.stopPropagation();         if (e.objectType == ImagesRes.STAR)
        {             var star: createjs.Sprite = <createjs.Sprite> this.stars[e.index].view;             delete this.stars[e.index];              this.grid[e.index].removeType(ImagesRes.STAR);             this.grid[e.index].removeObject(star);              star.spriteSheet = JSONRes.atlas1;             star.gotoAndPlay(ImagesRes.A1_STAR_GET);  //just change animation             star.x -= 10;             star.y -= 20;             star.on(GameEvent.ANIMATION_COMPLETE, this.animationCompleteHandler, this);             star.name = ImagesRes.STAR;              Progress.currentStars++;             //AchController.instance.addParam(AchController.STAR_COLLECTED);         }         else if (e.objectType == ImagesRes.PRESS)
        {             var press: Press = <Press> this.presses[e.index];             press.turnOff();             this.grid[e.index].removeType(ImagesRes.PRESS + 0);              for (var index in this.barriers)
{                 (<Barrier> this.barriers[index]).turnOff();                 this.grid[index].removeType(ImagesRes.BARRIER);             }         }     }      private animationCompleteHandler(e: GameEvent): void
    {         var mc: createjs.Sprite = <createjs.Sprite> e.currentTarget;         mc.removeAllEventListeners();         this.removeChild(mc);     }      private createGUI(): void
    {         Utils.addBitmap(0, 0, ImagesRes.GAME_FIELD, this, true);                  var container: createjs.Container = new createjs.Container();         this.addChild(container);         container.y = -100;          this.buttonSound = new Button(ImagesRes.BUTTON_SOUND_ON, ImagesRes.BUTTON_SOUND_ON_OVER, ImagesRes.BUTTON_SOUND_OFF, ImagesRes.BUTTON_SOUND_OFF_OVER);
        container.addChild(this.buttonSound);
        this.buttonSound.x = Config.STAGE_W - this.buttonSound.width - 20;
        this.buttonSound.name = "";           this.buttonMenu = new Button(ImagesRes.BUTTON_MENU, ImagesRes.BUTTON_MENU_OVER);
        container.addChild(this.buttonMenu);
        this.buttonMenu.x = this.buttonSound.x - this.buttonMenu.width - 20;
        this.buttonMenu.name = "";         this.buttonMenu.on(GUIEvent.MOUSE_CLICK, this.menuClickHandler, this);                  this.buttonRestart = new Button(ImagesRes.BUTTON_RESET, ImagesRes.BUTTON_RESET_OVER);
        container.addChild(this.buttonRestart);
        this.buttonRestart.x = this.buttonMenu.x - this.buttonRestart.width - 20;
        this.buttonRestart.name = "";         this.buttonRestart.on(GUIEvent.MOUSE_CLICK, this.restartClickHandler, this);            var level: createjs.BitmapText = new createjs.BitmapText((Progress.currentLevel + 1).toString(), JSONRes.atlasGameFont);
        this.addChild(level);
        level.mouseEnabled = false;
        level.snapToPixel = true;
        level.x = 150;
        level.y = -88;     }      private menuClickHandler(e: createjs.MouseEvent): void
    {         var ev: GUIEvent = new GUIEvent(GUIEvent.GOTO_WINDOW);
        ev.window = View.LEVELS;
        this.dispatchEvent(ev);     }      private restartClickHandler(e: createjs.MouseEvent): void
    {         this.dispatchEvent(new GameEvent(GameEvent.RESTART));     }      public createHint(): void
    {         if (!Hints.texts[Progress.currentLevel])             return;          var params: Array<number> = Hints.texts[Progress.currentLevel]; 
        var bitmap: createjs.Bitmap = new createjs.Bitmap(ImagesRes.getImage(ImagesRes.HELP + params[2]));
        bitmap.mouseEnabled = false;
        bitmap.snapToPixel = true;
        Core.instance.addChildAt(bitmap, Core.instance.getNumChildren());         this.help = bitmap;         bitmap.x = params[0];         bitmap.y = params[1];     }      private  createHintAfterAction(): void     {         if (!Hints.textsAfterAction[Progress.currentLevel])             return;          //huck         if (Progress.currentLevel == 0 && this.currentHero.y == 210)             return;          var params: { [index: string]: number } = Hints.textsAfterAction[Progress.currentLevel]; 
        var bitmap: createjs.Bitmap = new createjs.Bitmap(ImagesRes.getImage(ImagesRes.HELP + params['type' + this.currentHero.type.substr(4, 1)]));
        bitmap.mouseEnabled = false;
        bitmap.snapToPixel = true;
        Core.instance.addChildAt(bitmap, Core.instance.getNumChildren());         this.help = bitmap;         bitmap.x = params['x' + this.currentHero.type.substr(4, 1)];         bitmap.y = params['y' + this.currentHero.type.substr(4, 1)];          if (!Hints.pointerAfterAction[Progress.currentLevel])             return;          params = Hints.pointerAfterAction[Progress.currentLevel]; 
        bitmap = new createjs.Bitmap(ImagesRes.getImage(ImagesRes.HELP_POINTER));
        bitmap.mouseEnabled = false;
        bitmap.snapToPixel = true;
        Core.instance.addChildAt(bitmap, Core.instance.getNumChildren()-1);         this.pointer = bitmap;         bitmap.x = params['x' + this.currentHero.type.substr(4, 1)];         bitmap.y = params['y' + this.currentHero.type.substr(4, 1)];     }      private createHintForIndex(game:Game): void
    {          game.removeHint();          if (Progress.currentLevel != 0 || !Hints.textsForIndex[game.currentHero.index])             return;          var params: number[] = Hints.textsForIndex[game.currentHero.index]; 
        var bitmap: createjs.Bitmap = new createjs.Bitmap(ImagesRes.getImage(ImagesRes.HELP + params[2]));
        bitmap.mouseEnabled = false;
        bitmap.snapToPixel = true;
        Core.instance.addChildAt(bitmap, Core.instance.getNumChildren());          game.help = bitmap;         bitmap.x = params[0];         bitmap.y = params[1];          if (!Hints.pointerAfterAction[Progress.currentLevel])             return;          params = Hints.pointerForIndex[game.currentHero.index]; 
        bitmap = new createjs.Bitmap(ImagesRes.getImage(ImagesRes.HELP_POINTER));
        bitmap.mouseEnabled = false;
        bitmap.snapToPixel = true;
        Core.instance.addChildAt(bitmap, Core.instance.getNumChildren() - 1);         game.pointer = bitmap;         bitmap.x = params[0];         bitmap.y = params[1];     }      public removeHint(): void
    {          if (this.help)
        {             Core.instance.removeChild(this.help);             this.help = null;         }          if (this.pointer)
        {             Core.instance.removeChild(this.pointer);             this.pointer = null;         }     }      private showVictory(e: GameEvent): void
    {         if (Core.instance.ga)
        {             Core.instance.ga.send('pageview', "/LevelComplete-" + (Progress.currentLevel + 1) + "_Stars-" + Progress.currentStars);         }          this.heroBoy.removeAllEventListeners();         this.heroGirl.removeAllEventListeners();         if (Progress.currentLevel < Progress.starsToLevels.length - 1)
        {             this.parent.addChild(new Victory(this));         }         else
        {             var ev:GUIEvent = new GUIEvent(GUIEvent.GOTO_WINDOW);
            ev.window = View.GAME_COMPLETE;
            this.dispatchEvent(ev);         }     }      public destroy(): void
    {         this.removeAllEventListeners(GUIEvent.MOUSE_DOWN);         this.removeAllEventListeners(GameEvent.COLLISION);          this.buttonMenu.removeAllEventListeners();         this.buttonRestart.removeAllEventListeners();         this.buttonSound.removeAllEventListeners();          this.heroGirl.destroy();         this.heroBoy.destroy();         this.removeAllEventListeners();          this.removeHint();          var grid: Tile[] = this.grid;         var len: number = grid.length;         for (var i: number = 0; i < len; i++)
        {
            grid[i].clear();
        }          this.removeAllChildren();          this.stars = null;         this.heroGirl = null;         this.heroBoy = null;         this.grid = null;         this.model = null;         this.currentLevel = null;         this.point = null;          this.buttonMenu = null;         this.buttonSound = null;         this.buttonRestart = null;     }  } 