class Model {     public grid: Tile[];      constructor()     {         this.grid = new Array<Tile>(Config.WIDTH * Config.HEIGHT);          this.createGrid();     }      private createGrid(): void     {         var xCell: number = 0;         var yCell: number = 0;          var len: number = this.grid.length;         for (var i: number = 0; i < len; i++)         {             yCell = (Math.floor(i / Config.WIDTH)) * Config.SIZE_H;             xCell = (i - Math.floor(i / Config.WIDTH) * Config.WIDTH) * Config.SIZE_W;              this.grid[i] = new Tile(xCell, yCell, i);         }     }      public saveProgress(): void
    {         var progress: any = {};         progress.levelsCompleted = Progress.levelsCompleted;         progress.starsToLevels = Progress.starsToLevels;         progress.sound = SoundManager.instance.getIsMusic() ? "1" : "0";          window.localStorage.setItem(Config.GAME_NAME + Config.GAME_VERSION, JSON.stringify(progress));     }      public loadProgress(): void
    {         var progress: any = window.localStorage.getItem(Config.GAME_NAME + Config.GAME_VERSION);
        if (progress)
        {
            var progress = JSON.parse(progress);
            Progress.levelsCompleted = progress.levelsCompleted;             Progress.starsToLevels = progress.starsToLevels;
            SoundManager.instance.setSaveState(progress.sound, progress.sound);
        }     } } 