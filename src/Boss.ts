import GameContext from "./GameContext";
import hurtSound from "/assets/hurt.ogg";
import spriteBoss from "/assets/BossSprite.png"

type coords = [number, number];

class Boss {
    private position: coords = [-200,-200];
    private bossWidth: number = 140; 
    private bossHeight: number = 140; 
    private click: boolean = false; // flag for mouse click
    private boss = new Image();
    private frameCounter = 0;
    private checkClick: boolean = false;
    private clickCounter = 0;
    private checkSound: boolean = false; // flag to play sound

    private spriteBoss = new Image();

    // hitbox
    private RightSide = this.position[0] + this.bossWidth; 
    private LeftSide = this.position[0];
    private TopSide = this.position[1];
    private BottomSide = this.position[1] + this.bossHeight;

    // Sprites and sounds
    private hurtsound = new Audio(hurtSound);

    constructor () {
        this.spriteBoss.src = spriteBoss;
        this.boss = this.spriteBoss;
        this.hurtsound.volume = 1;
        this.position = [(this.random(5) * 160) + 10, (this.random(5) * 160) + 10];
    }

    public getClicks () {
        return this.clickCounter;
    }

    public mouseMovementHandler = (event: MouseEvent) => { // Mouse movement for the game
        let [coordx, coordy] = this.position;

        if (event.type === "mousedown") {
            this.click = true;
        } else if (event.type === "mouseup") {
            this.click = false;
        }

        // Mouse has to be over the boss to hurt him
        if (event.offsetX < this.RightSide  && event.offsetX > this.LeftSide && event.offsetY < this.BottomSide && event.offsetY > this.TopSide) {
            if (this.click) { // If click is true the boss is hurt and changes position
                this.checkClick = !this.checkClick; // use on update
                this.checkSound = !this.checkSound; // use on update
            }
        }

    };

    public random(max: number){
        return Math.floor(Math.random() * Math.floor(max))
    }

    public changeBossPosition = () => {
            this.position = [(this.random(5) * 160) + 10 , (this.random(5) * 160) + 10 ];
    };

    public update = () => {
        // update hitbox
        this.RightSide = this.position[0] + this.bossWidth;
        this.LeftSide = this.position[0];
        this.TopSide = this.position[1];
        this.BottomSide = this.position[1] + this.bossHeight;

        this.frameCounter++;
        if (this.frameCounter >= 45) {
            this.changeBossPosition();
            this.frameCounter = 0;
        }

        if (this.checkClick) {
            this.changeBossPosition();
            this.frameCounter = 0;
            this.clickCounter++;
            this.checkClick = !this.checkClick;
        }

        if (this.checkSound) {
            if(this.hurtsound.paused) {
                this.hurtsound.play();
            }
            this.checkSound = !this.checkSound;
        }
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