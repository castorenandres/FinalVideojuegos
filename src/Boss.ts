import GameContext from "./GameContext";
import hurtSound from "/assets/hurt.ogg";
// importar sprite y sonido

type coords = [number, number];

class Boss {
    private position: coords = [0,0];
    private bossWidth: number = 57; // pendiente
    private bossHeight: number = 80; // pendiente
    private sWidth = 57; // sprite width // pendiente
    private sHeight = 80; // sprite height // pendiente
    private offsetx: number = 62.1; // Sprite offset // pendiente
    private click: boolean = false; // flag for mouse click

    // hitbox
    private RightSide = this.position[0] + this.bossWidth; 
    private LeftSide = this.position[0];
    private TopSide = this.position[1];
    private BottomSide = this.position[1] + this.bossHeight;

    // Sprites and sounds
    private hurtsound = new Audio(hurtSound);

    constructor () {
        // poner sprite y posicion si se ocupa
    }

    public mouseDownHandler = (event: MouseEvent) => { // checks if the player click the mouse
        if (event.type === "mousedown") {
            this.click = true;
        } else if (event.type === "mouseup") {
            this.click = false;
        }
    };

    public mouseMovementHandler = (event: MouseEvent) => { // Mouse movement for the game
        let [coordx, coordy] = this.position;

        // Mouse has to be over the boss to hurt him
        if (event.offsetX < this.RightSide  && event.offsetX > this.LeftSide && event.offsetY < this.BottomSide && event.offsetY > this.TopSide) {
            if (this.click) { // If click is true the boss is hurt and changes position
                // call function to change position and play sound
                if(this.hurtsound.paused) {
                    this.hurtsound.play();
                    // aqui va la funcion de cambiar posicion
                    // this.score += 1; counter para vida o sera barra de vida?
                }
            }
        }

    };

    public changeBossPosition = () => {}; // no se que mas se ocupe

    public update = () => {
        // no se si se ocupe
        const {context} = GameContext;
        const {width, height} = context.canvas;
        // update hitbox
        this.RightSide = this.position[0] + this.bossWidth;
        this.LeftSide = this.position[0];
        this.TopSide = this.position[1];
        this.BottomSide = this.position[1] + this.bossHeight;

        // update posicion y vida/counter de clicks al boss
    };

    public render = () => {
        const {context} = GameContext;
        let [xpos, ypos] = this.position;
        const sy = 0;

        // Character
        context.save();
        context.beginPath();
        context.translate(xpos, ypos);
        context.drawImage(this.character,this.currentCharFrame * this.offsetx, sy, this.sWidth, this.sHeight, 0, 0,this.charWidth,this.charHeight);
        context.closePath();
        context.restore();
    };
};

export default Boss;