class ImagesRes
{
    //tiles
    static NONE: string = 'none';
    static HERO: string = 'hero';
    static LEGO: string = 'lego';
    static HOLE: string = 'hole';
    static HOLE_MARK: string = 'hmark';
    static PRESS: string = 'press';
    static NUT: string = 'nut';
    static ERASER: string = 'eraser';
    static PENCIL: string = 'pencil';
    static PENCIL2: string = 'pencil9';
    static CORK: string = 'cork';
    static STUD: string = 'stud';
    static STAR: string = 'star';
    static BARRIER: string = 'barrier';

    static DECOR: string = 'Decor';

    //gui
    static HERO_ARROW: string = 'Arrow';

    static MAIN_BG: string = 'MainBack';
    static CREDITS_BG: string = 'GreditsBack';
    static LEVEL_SELECT_BG: string = 'LSBack';
    static GAME_BG: string = 'GameBack';
    static INTRO_BG: string = 'IntroBack';
    static GAME_COMPLETE_BG: string = 'GameComplete';

    static PRELOADER_BG: string = 'PreloaderBG';

    static GAME_FIELD: string = 'field';

    static LS_STAR: string = 'StarLS';
    static LS_STAR_OVER: string = 'StarLSActiv';

    static INTRO_ICON: string = 'intro';

    static ACHIEVEMENS_TITLE: string = 'Achievemens';
    static VICTORY_TITLE: string = 'LevelComplete';
    static STAR_VICTORY: string = 'StarLC';

    static ICON_ACH: string = 'IconAch';
    static RAYS_ACH: string = 'Luchi';

    static HELP: string = 'help';
    static HELP_POINTER: string = 'HelpPointer';

    static OOPS: string = "oops";

    static BUTTON_CREDITS: string = 'ButtonCredits';
    static BUTTON_CREDITS_OVER: string = 'ButtonCreditsActiv';
    static BUTTON_MORE: string = 'ButtonMoreGames';
    static BUTTON_MORE_OVER: string = 'ButtonMoreGamesActiv';
    static BUTTON_PLAY: string = 'ButtonPlay';
    static BUTTON_PLAY_OVER: string = 'ButtonPlayActiv';
    static BUTTON_SOUND_ON: string = 'ButtonSoundOn';
    static BUTTON_SOUND_ON_OVER: string = 'ButtonSoundOnActiv';
    static BUTTON_SOUND_OFF: string = 'ButtonSoundOff';
    static BUTTON_SOUND_OFF_OVER: string = 'ButtonSoundOffActiv';
    static BUTTON_PLAY_PRE: string = 'ButtonPlayPre';
    static BUTTON_PLAY_PRE_OVER: string = 'ButtonPlayPreActiv';
    static BUTTON_BACK: string = 'CreditsButtonBack';
    static BUTTON_BACK_OVER: string = 'CreditsButtonBackActiv';
    static BUTTON_LS: string = 'ButtonLS';
    static BUTTON_LS_OVER: string = 'ButtonLSActiv';
    static BUTTON_LS_LOCK: string = 'ButtonLSLock';
    static BUTTON_MENU: string = 'ButtonMenu';
    static BUTTON_MENU_OVER: string = 'ButtonMenuActiv';
    static BUTTON_MENU_BIG: string = 'ButtonMenuBig';
    static BUTTON_MENU_BIG_OVER: string = 'ButtonMenuBigActiv';
    static BUTTON_RESET: string = 'ButtonRestart';
    static BUTTON_RESET_OVER: string = 'ButtonRestartActiv';
    static BUTTON_RESET_BIG: string = 'ButtonRestartBig';
    static BUTTON_RESET_BIG_OVER: string = 'ButtonRestartBigActiv';

    static ACH_DISABLE: string = 'ButtonAch';
    static ACH_ENABLE: string = 'ButtonAchActiv';

    //animations
    static A0_BOY_IDLE: string = 'MikeStand';
    static A0_BOY_MOVE: string = 'MikeJump';
    static A0_BOY_FALL: string = 'MikeHole';
    static A0_GIRL_MOVE: string = 'MiaJump';
    static A0_BARRIER: string = 'Gate';
    static A0_STAR: string = 'Star';
    static A1_GIRL_IDLE: string = 'MiaStand';
    static A1_GIRL_FALL: string = 'MiaHole';
    static A1_STAR_GET: string = 'StarUp';

    static numberImages: { [index: string]: number; } = {};
    static loader: createjs.LoadQueue;

    static init(): void
    {

        var manifest = [
            { src: "images/ui/Flag.png", id: ImagesRes.HELP_POINTER},
            { src: "images/ui/Help-0.png", id: ImagesRes.HELP + '0' },
            { src: "images/ui/Help-1.png", id: ImagesRes.HELP + '1' },
            { src: "images/ui/Help-2.png", id: ImagesRes.HELP + '2' },
            { src: "images/ui/Help-3.png", id: ImagesRes.HELP + '3' },
            { src: "images/ui/Help-4.png", id: ImagesRes.HELP + '4' },

            { src: "images/tiles/Arrow.png", id: ImagesRes.HERO_ARROW },
            { src: "images/tiles/Field.png", id: ImagesRes.GAME_FIELD },

            { src: "images/ui/LevelComplete.png", id: ImagesRes.VICTORY_TITLE },
            { src: "images/ui/StarLC.png", id: ImagesRes.STAR_VICTORY },
            { src: "images/ui/StarLS.png", id: ImagesRes.LS_STAR },
            { src: "images/ui/StarLSActiv.png", id: ImagesRes.LS_STAR_OVER },
            { src: "images/ui/MainBack.png", id: ImagesRes.MAIN_BG },
            { src: "images/ui/CreditsBack.png", id: ImagesRes.CREDITS_BG },
            { src: "images/ui/LSBack.png", id: ImagesRes.LEVEL_SELECT_BG },
            { src: "images/ui/GameBg.png", id: ImagesRes.GAME_BG },
            { src: "images/ui/IntroBack.png", id: ImagesRes.INTRO_BG },
            { src: "images/ui/GameComplete.png", id: ImagesRes.GAME_COMPLETE_BG },
            { src: "images/ui/oops.png", id: ImagesRes.OOPS },
            
            { src: "images/ui/Intro-0.png", id: ImagesRes.INTRO_ICON + '0' },
            { src: "images/ui/Intro-1.png", id: ImagesRes.INTRO_ICON + '1' },
            { src: "images/ui/Intro-2.png", id: ImagesRes.INTRO_ICON + '2' },

            { src: "music/menu.ogg", type: createjs.LoadQueue.SOUND, id: SoundManager.MUSIC_MENU },
            { src: "music/game.ogg", type: createjs.LoadQueue.SOUND, id: SoundManager.MUSIC_GAME },

            { src: "images/ui/ButtonCredits.png", id: ImagesRes.BUTTON_CREDITS },
            { src: "images/animations/atlas0.png", id: "atlas0" },
            { src: "images/animations/atlas1.png", id: "atlas1" },
            { src: "images/ui/ButtonCreditsActiv.png", id: ImagesRes.BUTTON_CREDITS_OVER },
            { src: "images/ui/ButtonMoreGames.png", id: ImagesRes.BUTTON_MORE },
            { src: "images/ui/ButtonMoreGamesActiv.png", id: ImagesRes.BUTTON_MORE_OVER },
            { src: "images/ui/ButtonPlay.png", id: ImagesRes.BUTTON_PLAY },
            { src: "images/ui/ButtonPlayActiv.png", id: ImagesRes.BUTTON_PLAY_OVER },
            { src: "images/ui/ButtonSoundOn.png", id: ImagesRes.BUTTON_SOUND_ON },
            { src: "images/ui/ButtonSoundOnActiv.png", id: ImagesRes.BUTTON_SOUND_ON_OVER },
            { src: "images/ui/ButtonSoundOff.png", id: ImagesRes.BUTTON_SOUND_OFF },
            { src: "images/ui/ButtonSoundOffActiv.png", id: ImagesRes.BUTTON_SOUND_OFF_OVER },
            { src: "images/ui/ButtonPlayLC.png", id: ImagesRes.BUTTON_PLAY_PRE },
            { src: "images/ui/ButtonPlayLCActiv.png", id: ImagesRes.BUTTON_PLAY_PRE_OVER },
            { src: "images/ui/ButtonBack.png", id: ImagesRes.BUTTON_BACK },
            { src: "images/ui/ButtonBackActiv.png", id: ImagesRes.BUTTON_BACK_OVER },
            { src: "images/ui/ButtonLS.png", id: ImagesRes.BUTTON_LS },
            { src: "images/ui/ButtonLSActiv.png", id: ImagesRes.BUTTON_LS_OVER },
            { src: "images/ui/ButtonLSLock.png", id: ImagesRes.BUTTON_LS_LOCK },
            { src: "images/ui/ButtonGameMenu.png", id: ImagesRes.BUTTON_MENU },
            { src: "images/ui/ButtonGameMenuActiv.png", id: ImagesRes.BUTTON_MENU_OVER },
            { src: "images/ui/ButtonMenuLC.png", id: ImagesRes.BUTTON_MENU_BIG },
            { src: "images/ui/ButtonMenuLCActiv.png", id: ImagesRes.BUTTON_MENU_BIG_OVER },
            { src: "images/ui/ButtonGameRestart.png", id: ImagesRes.BUTTON_RESET },
            { src: "images/ui/ButtonGameRestartActiv.png", id: ImagesRes.BUTTON_RESET_OVER },
            { src: "images/ui/ButtonRestartLC.png", id: ImagesRes.BUTTON_RESET_BIG },
            { src: "images/ui/ButtonRestartLCActiv.png", id: ImagesRes.BUTTON_RESET_BIG_OVER },

            { src: "images/tiles/Boy.png", id: ImagesRes.HERO + '0' },
            { src: "images/tiles/Girl.png", id: ImagesRes.HERO + '1' },
            { src: "images/tiles/Lego-0.png", id: ImagesRes.LEGO + '0' },
            { src: "images/tiles/Lego-1.png", id: ImagesRes.LEGO + '1' },
            { src: "images/tiles/Lego-2.png", id: ImagesRes.LEGO + '2' },
            { src: "images/tiles/Lego-3.png", id: ImagesRes.LEGO + '3' },
            { src: "images/tiles/Lego-4.png", id: ImagesRes.LEGO + '4' },
            { src: "images/tiles/Lego-5.png", id: ImagesRes.LEGO + '5' },
            { src: "images/tiles/Lego-6.png", id: ImagesRes.LEGO + '6' },
            { src: "images/tiles/Lego-7.png", id: ImagesRes.LEGO + '7' },
            { src: "images/tiles/Lego-8.png", id: ImagesRes.LEGO + '8' },
            { src: "images/tiles/Lego-9.png", id: ImagesRes.LEGO + '9' },
            { src: "images/tiles/Lego-10.png", id: ImagesRes.LEGO + '10' },
            { src: "images/tiles/Lego-11.png", id: ImagesRes.LEGO + '11' },
            { src: "images/tiles/Lego-12.png", id: ImagesRes.LEGO + '12' },
            { src: "images/tiles/Lego-13.png", id: ImagesRes.LEGO + '13' },
            { src: "images/tiles/Lego-14.png", id: ImagesRes.LEGO + '14' },
            { src: "images/tiles/Lego-15.png", id: ImagesRes.LEGO + '15' },
            { src: "images/tiles/Lego-16.png", id: ImagesRes.LEGO + '16' },
            { src: "images/tiles/Lego-17.png", id: ImagesRes.LEGO + '17' },
            { src: "images/tiles/Button-Up.png", id: ImagesRes.PRESS + '0' },
            { src: "images/tiles/Button-Down.png", id: ImagesRes.PRESS + '1' },
            { src: "images/tiles/Gaika-0.png", id: ImagesRes.NUT + '0' },
            { src: "images/tiles/Gaika-1.png", id: ImagesRes.NUT + '1' },
            { src: "images/tiles/Lastik.png", id: ImagesRes.ERASER },
            { src: "images/tiles/Pencel-0.png", id: ImagesRes.PENCIL + '0' },
            { src: "images/tiles/Pencel-1.png", id: ImagesRes.PENCIL + '1' },
            { src: "images/tiles/Pencel-2.png", id: ImagesRes.PENCIL + '2' },
            { src: "images/tiles/Pencel-3.png", id: ImagesRes.PENCIL + '3' },
            { src: "images/tiles/Probka-0.png", id: ImagesRes.CORK + '0' },
            { src: "images/tiles/Probka-1.png", id: ImagesRes.CORK + '1' },
            { src: "images/tiles/Pugovica-0.png", id: ImagesRes.STUD },
            { src: "images/tiles/Yama-0.png", id: ImagesRes.HOLE + '0' },
            { src: "images/tiles/Yama-1.png", id: ImagesRes.HOLE + '1' },
            { src: "images/tiles/Yama-2.png", id: ImagesRes.HOLE + '2' },
            { src: "images/tiles/hole.png", id: ImagesRes.HOLE_MARK },

            { src: "images/fonts/levels.png", id: "atlasLevelsFont" },
            { src: "images/fonts/game.png", id: "atlasGameFont" },
        ];

        ImagesRes.loader = new createjs.LoadQueue(false, "", true);
        ImagesRes.loader.installPlugin(createjs.Sound);
        createjs.Sound.alternateExtensions = ["m4a"];
        ImagesRes.loader.loadManifest(manifest);
    }

    static getImage(imageName: string): HTMLImageElement
    {

        var name: string = imageName.substr(0, 7) == ImagesRes.PENCIL2 ? ImagesRes.PENCIL + imageName.substr(7, 1) : imageName;
        var bd: HTMLImageElement;
        var index: number = 0;
        if (ImagesRes.numberImages[name])
        {
            index = Math.floor(Math.random() * ImagesRes.numberImages[name]);
            bd = <HTMLImageElement> ImagesRes.loader.getResult(name + index);
        }
        else
        {
            bd = <HTMLImageElement> ImagesRes.loader.getResult(name);
        }

        return bd;
    }
} 