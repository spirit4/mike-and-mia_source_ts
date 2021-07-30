class GameBranding
{
    static logo: createjs.Container;
    static isSound: boolean = false;

    constructor()
    {

    }

    static addLogo(container: createjs.Container, newX: number = -10, newY: number = 10)
    {
        var w: number = (Preloader.a10logo.width > 100) ? Preloader.a10logo.width : 202;
        var h: number = (Preloader.a10logo.height > 30) ? Preloader.a10logo.height : 50;
        var x: number = Config.STAGE_W - w - newX;
        var y: number = Config.STAGE_H_MIN - h - newY;
        if (GameBranding.logo)
        {
            if (container instanceof Game)
            {
                x = 180;
                y = newY - 70;
            }
            else
            {
                x = Config.STAGE_W - w - newX;
                y = Config.STAGE_H_MIN - h - newY;
            }

            GameBranding.logo.x = x;
            GameBranding.logo.y = y;
            container.addChild(GameBranding.logo);
            return;
        }

        var box: createjs.Container = new createjs.Container();
        container.addChild(box);
        var logo: createjs.Bitmap = new createjs.Bitmap(Preloader.a10logo);
        box.addChild(logo);
        logo.mouseEnabled = false;
        box.x = x;
        box.y = y;

        //----IE9 crossOrigin fix----------------------
        var wShape: number = Preloader.a10logo.width > 100 ? Preloader.a10logo.width : 202;
        var hShape: number = Preloader.a10logo.height > 30 ? Preloader.a10logo.height : 50;
        var g: createjs.Graphics = new createjs.Graphics();         var shape: createjs.Shape = new createjs.Shape(g);         g.beginFill("rgba(255,255,255, 0.01)");
        g.drawRect(0, 0, wShape, hShape);
        g.endFill();
        shape.snapToPixel = true;
        box.addChild(shape);
        //----IE9 crossOrigin fix----------------------

        box.on(GUIEvent.MOUSE_CLICK, GameBranding.clickLogoHandler, this);
        GameBranding.logo = box;
    }

    static clickLogoHandler(e: createjs.MouseEvent): void
    {
        var logoData: any = Core.instance.api.Branding.getLogo();
        logoData.action();
    }

    static clickMoreHandler(e: createjs.MouseEvent): void
    {
        var buttonProperties: any = Core.instance.api.Branding.getLink('more_games');
        buttonProperties.action();
    }

    static addSplash(): void
    {
        var splashData: any = Core.instance.api.Branding.displaySplashScreen(GameBranding.removeSplash);

        //if (!splashData || !splashData.show || !splashData.action)
        //    return;

        //var splashScreen = document.getElementById('spilgames-splash-screen');
        //splashScreen.addEventListener('click', splashData.action);
        //splashScreen.className = '';

        //createjs.Tween.get(splashScreen).wait(3000).call(GameBranding.removeSplash);
    }

    static removeSplash(): void
    {
        //var splashScreen = document.getElementById('spilgames-splash-screen');
        //splashScreen.className = 'spilgames-splash-screen-gone';
    }

    static adsPause(): void
    {
        createjs.Ticker.setPaused(true);

        if (SoundManager.instance && SoundManager.instance.getIsMusic())
        {
            SoundManager.instance.muteOnOff();
            GameBranding.isSound = true;
        }
    }

    static adsResume(): void
    {
        createjs.Ticker.setPaused(false);

        if (SoundManager.instance && GameBranding.isSound)
        {
            SoundManager.instance.muteOnOff();
            GameBranding.isSound = false;
        }
    }
} 