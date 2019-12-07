import GameContext from "./GameContext";
import hurtSound from "/assets/hurt.ogg";
import spriteBoss from "/assets/BossSprite.png"
// importar sprite y sonido

type coords = [number, number];

class Boss {
    private position: coords = [0,0];
    private bossWidth: number = 140; 
    private bossHeight: number = 140; 
    private click: boolean = false; // flag for mouse click
    private boss = new Image();

    private spriteBoss = new Image();

    // hitbox
    private RightSide = this.position[0] + this.bossWidth; 
    private LeftSide = this.position[0];
    private TopSide = this.position[1];
    private BottomSide = this.position[1] + this.bossHeight;

    // Sprites and sounds
    private hurtsound = new Audio(hurtSound);

    constructor () {
        // poner sprite y posicion si se ocupa
        this.spriteBoss.src = spriteBoss;
        this.boss = this.spriteBoss;
        this.hurtsound.volume = 1;
        //this.position = [(this.random(5) * 160) + 10, (this.random(5) * 160) + 10];
    }

    public mouseMovementHandler = (event: MouseEvent) => { // Mouse movement for the game
        let [coordx, coordy] = this.position;

        if (event.type === "mousedown") {
            this.click = true;
        } else if (event.type === "mouseup") {
            this.click = false;
        }
        console.log(this.click);

        // Mouse has to be over the boss to hurt him
        if (event.offsetX < this.RightSide  && event.offsetX > this.LeftSide && event.offsetY < this.BottomSide && event.offsetY > this.TopSide) {
            if (this.click) { // If click is true the boss is hurt and changes position
                // call function to change position and play sound
                this.changeBossPosition();
                if(this.hurtsound.paused) {
                    this.hurtsound.play();
                    // aqui va la funcion de cambiar posicion
                    // this.score += 1; counter para vida o sera barra de vida?
                }
            }
        }

    };

    public random(max: number){
        return Math.floor(Math.random() * Math.floor(max))
    }

    public changeBossPosition = () => {
        this.position = [(this.random(5) * 160) + 10 , (this.random(5) * 160) + 10 ]
        console.log(this.position);
    };
     // no se que mas se ocupe

    public update = () => {
        // no se si se ocupe
        const {context} = GameContext;
        const {width, height} = context.canvas;
        // update hitbox
        this.RightSide = this.position[0] + this.bossWidth;
        this.LeftSide = this.position[0];
        this.TopSide = this.position[1];
        this.BottomSide = this.position[1] + this.bossHeight;
    };

    public render = () => {
        const {context} = GameContext;
        let [xpos, ypos] = this.position;
        const {width, height} = context.canvas;

        // Character
        context.save();
        context.beginPath();
        context.drawImage(this.boss, xpos, ypos);
        context.closePath();
        context.restore();
    };
};

export default Boss;