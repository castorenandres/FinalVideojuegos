import GameContext from "./GameContext";
// importar sprite y sonido

type coords = [number, number];

class Boss {
    private position: coords = [0,0];
    private bossWidth: number = 57;
    private bossHeight: number = 80;
    private sWidth = 57; // sprite width
    private sHeight = 80; // sprite height
    private offsetx: number = 62.1; // Sprite offset
    private frameCounter = 0;
    private currentCharFrame = 0;
    private click: boolean = false; // flag for mouse click

    // hitbox
    private RightSide = this.position[0] + this.bossWidth; 
    private LeftSide = this.position[0];
    private TopSide = this.position[1];
    private BottomSide = this.position[1] + this.bossHeight;

    public mouseDownHandler = (event: MouseEvent) => {
        if (event.type === "mousedown") {
            this.click = true;
        } else if (event.type === "mouseup") {
            this.click = false;
        }
    };

    public mouseMovementHandler = (event: MouseEvent) => { // se puede usar esto con el boss
        let [coordx, coordy] = this.position;

        // Mouse has to be over the boss to hurt him
        if (event.offsetX < this.RightSide  && event.offsetX > this.LeftSide && event.offsetY < this.BottomSide && event.offsetY > this.TopSide) {
            //
        }

        if (this.click) { // If click is true...se ocupa?
            coordx = (event.offsetX - this.bossWidth / 2);
            coordy = (event.offsetY - this.bossHeight / 2);
        }
    };
};

export default Boss;