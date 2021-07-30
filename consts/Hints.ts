class Hints
{
    /**x,y,type*/
    static texts: { [index: number]: number[]; } = {
        0: [160, 540, 0],
        3: [130, 380, 3],
        7: [40, 350, 2],
    };

     /**level: {x0,y0,x1,y1}*/
    static textsAfterAction: { [index: number]: { [index: string]: number } } = {
        0: { 'x0': 120, 'y0': 370, 'x1': 365, 'y1': 370, 'type0': 1, 'type1': 4},
    };
    /**x,y,type*/
    static textsForIndex: { [index: number]: number[]; } = {
        25: [280, 370, 1],
        30: [205, 370, 4],
    };

    //x0,y0,x1,y1,time0,time1
    static pointer: { [index: number]: number[]; } = {
        //0: [380, 280, 350, 250, 100, 2000],
    };

    /**level: {x0,y0,x1,y1}*/
    static pointerAfterAction: { [index: number]: { [index: string]: number } } = {
        0: { 'x0': 90, 'y0': 290, 'x1': 490, 'y1': 290 },
    };
    /**x,y*/
    static pointerForIndex: { [index: number]: number[]; } = {
        25: [250, 290],
        30: [330, 290],
    };
} 