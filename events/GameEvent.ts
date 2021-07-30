class GameEvent extends createjs.Event
{
    static GOTO_LEVEL: string = "gotoLevel";
    static UPDATE: string = "tick";

    static COMPLETE: string = "complete";
    static ANIMATION_COMPLETE: string = "animationend";
    static PROGRESS: string = "progress";

    static LEVEL_COMPLETE: string = "levelComplete";
    static RESTART: string = "restart";
    static COLLISION: string = "collision";
    static EDITOR_ON_OFF: string = "editorOnOff";

	public index: number;
	public objectType: string;

	constructor(type:string, bubbles:boolean = false,cancelable:boolean = false)
	{
		super(type, bubbles, cancelable);
	}
}