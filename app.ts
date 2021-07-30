window.onload = () =>
{
    setTimeout("window.scrollTo(0, 1)", 10);

    var main = new Main();
    createjs.Tween.get(main, { ignoreGlobalPause: true }).wait(100).call(main.init, [], main);
};

/// <reference path="../Scripts/typings/spil/GameAPI.d.ts" />
///<reference path="../Scripts/typings/google.analytics/ga.d.ts" />

/// <reference path="../Scripts/typings/easeljs/easeljs.d.ts" />
/// <reference path="../Scripts/typings/createjs/createjs.d.ts" />

///<reference path='../core/source/Core.ts'/>
///<reference path='Preloader.ts'/>
class Main
{
    private bgStage: createjs.Stage;
    private stage: createjs.Stage;

    private core: Core;
    private preloader: Preloader;

    private bg: LayerBg;

    //static text: createjs.Text;
    static prevState: string = "focus";
    static counterVisible: number = 0;

    static s1: createjs.Stage;
    static s2: createjs.Stage;

    constructor()
    {
        Main.s1 = this.bgStage = new createjs.Stage("bgStage");
        Main.s2 = this.stage = new createjs.Stage("mainStage");

        this.bgStage.canvas.width = Config.STAGE_W;
        this.bgStage.canvas.height = Config.STAGE_H_MAX;
        this.stage.canvas.width = Config.STAGE_W;
        this.stage.canvas.height = Config.STAGE_H_MIN;
    }

    public init(): void
    {
        this.bg = new LayerBg();
        this.bgStage.addChild(this.bg);

        this.core = new Core(this.bg);
        this.stage.addChild(this.core);

        this.bgStage.update();
        this.stage.update();

        createjs.Touch.enable(this.stage);
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        createjs.Ticker.setFPS(30);
        createjs.Ticker.on(GameEvent.UPDATE, this.update, this);

        this.resizeHandler();
        window.addEventListener(GUIEvent.RESIZE, () => this.resizeHandler());
        window.addEventListener(GUIEvent.ORIENTATION_CHANGE, () => this.resizeHandler());

        //var text: createjs.Text = new createjs.Text("-", "bold 20px Trebuchet MS", "#000000");
        //this.stage.addChild(text);
        //text.mouseEnabled = false;
        //text.snapToPixel = true;
        //Main.text = text;

        this.addCheckFocus();
    }

    private resizeHandler(): void
    {
        var w: number = window.innerWidth;
        var h: number = window.innerHeight;
        //if (Main.text)
        //{
        //    Main.text.text += window["orientation"] + " | " + w + " | " + h + " | " + screen.width + " | " + screen.height + "\r";
        //}

        var currentW: number = 0;
        var currentH: number = 0;
        var currentBgW: number = 0;
        var currentBgH: number = 0;

        var currentRatio: number = w / h;
        var optimalRatioMin: number = Config.STAGE_W / Config.STAGE_H_MIN;
        var optimalRatioMax: number = Config.STAGE_W / Config.STAGE_H_MAX;

        if (currentRatio >= optimalRatioMin)
        {
            currentBgW = currentW = h * optimalRatioMin;
            currentH = h;
            currentBgH = currentBgW / optimalRatioMax;
        }
        else if (currentRatio < optimalRatioMin)
        {
            if (currentRatio >= optimalRatioMin)
            {
                currentW = w;
                currentH = h;
            }
            else if (currentRatio < optimalRatioMin)
            {
                currentW = w;
                currentH = w / optimalRatioMin;
            }

            if (currentRatio >= optimalRatioMax)
            {
                currentBgW = w;
                currentBgH = w / optimalRatioMax;//h;
            }
            else if (currentRatio < optimalRatioMax)
            {
                currentBgW = w;
                currentBgH = w / optimalRatioMax;
            }

        }

        currentBgW = 0.5 + currentBgW | 0;
        currentBgH = 0.5 + currentBgH | 0;
        currentW = 0.5 + currentW | 0;
        currentH = 0.5 + currentH | 0;

        var container: HTMLElement = document.getElementById("wrapper");
        container.style.marginLeft = ((-currentW * 0.5) + 0.5 | 0) + "px";
        container.style.marginTop = (Math.round(-currentH * 0.5)) + "px";

        this.bgStage.canvas.style.marginTop = -((currentBgH - currentH >> 1) + 0.5 | 0) + "px";

        this.bgStage.canvas.style.width = currentBgW + "px";
        this.bgStage.canvas.style.height = currentBgH + "px";
        this.stage.canvas.style.width = currentW + "px";
        this.stage.canvas.style.height = currentH + "px";

        this.bgStage.update();
        this.stage.update();
    }

    private addCheckFocus(): void
    {
        window['isActive'] = 'visible';

        var hidden = "hidden";

        if (hidden in document)
        {
            document.addEventListener("visibilitychange", this.changeHandler);
        }
        else if ((hidden = "mozHidden") in document)
        {
            document.addEventListener("mozvisibilitychange", this.changeHandler);
        }
        else if ((hidden = "webkitHidden") in document)
        {
            document.addEventListener("webkitvisibilitychange", this.changeHandler);
        }
        else if ((hidden = "msHidden") in document)
        {
            document.addEventListener("msvisibilitychange", this.changeHandler);
        }
        else if ('onfocusin' in document)
        {
            document.onfocusin = document.onfocusout = this.changeHandler;
        }

        window.onpageshow = window.onpagehide = window.onfocus = window.onblur = this.changeHandler;
    }

    private changeHandler(event): void
    {
        var v = 'visible', h = 'hidden',
            evtMap = {
                focus: v, focusin: v, pageshow: v, blur: h, focusout: h, pagehide: h
            };

        event = event || window.event;

        //console.log(evt.type, evtMap[evt.type]);
        //if (Main.text)
        //{
        //    Main.text.text += event.type + " | " + evtMap[event.type] + " | " + Main.prevState + " | " + (Main.prevState == event.type) + "\r";
        //}

        if (event.type in evtMap)
        {
            if (evtMap[event.type] == h && window['isActive'] == v)
            {
                window['isActive'] = h;
                Main.prevState = event.type;
                GameBranding.adsPause();
            }
            else if (evtMap[event.type] == v && window['isActive'] == h)
            {
                window['isActive'] = v;
                Main.prevState = event.type;
                GameBranding.adsResume();
            }
        }
        else
        {
            Main.counterVisible++;

            if (Main.prevState != event.type && window['isActive'] == v &&
                Main.counterVisible == 1)
            {
                window['isActive'] = h;
                Main.prevState = event.type;
                GameBranding.adsPause();
            }
            else if (Main.prevState == event.type && window['isActive'] == h)
            {
                window['isActive'] = v;
                Main.prevState = "focus";
                Main.counterVisible = 0;
                GameBranding.adsResume();
            }
        }
    }

    private update(e: createjs.Event): void
    {

        //if (!Main.globalPause && createjs.Ticker.getPaused())
        //{
        //    Main.globalPause = true;
        //    if (Hero.currentTween)
        //    {
        //        //Hero.currentView.paused = true;
        //        Hero.currentTween.setPaused(true);
        //    }
        //}
        //else if (this.globalPause && !createjs.Ticker.getPaused())
        //{
        //    Main.globalPause = false;

        //    if (Hero.currentTween)
        //    {
        //        //Hero.currentView.paused = false;
        //        Hero.currentTween.setPaused(false);
        //    }
        //}

        //console.log("update", document.hasFocus());
        this.stage.update(e);

    }

    static forceUpdate(): void
    {
        Main.s1.update();
        Main.s2.update();
    }

}
