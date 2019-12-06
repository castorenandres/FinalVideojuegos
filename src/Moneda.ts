import spriteMoneda from "/assets/spritesheet.png"
import GameContext from "./GameContext"

type coords = [number, number];

class Moneda {
    private position : coords = [0, 0];
    private monedaWidth: number = 29;
    private monedaHeight: number = 29;
    private frameCounter = 0;
    private currentCharFrame = 0;
    private moneda = new Image();

    private spritemoneda = new Image();

    // hitbox
    private RightSide = this.position[0] + this.monedaWidth;
    private LeftSide = this.position[0];
    private TopSide = this.position[1];
    private BottomSide = this.position[1] + this.monedaHeight;

    public getRightSide () {
        return this.RightSide;
    }

    public getLeftSide () {
        return this.LeftSide;
    }
    
    public getTopSide () {
        return this.TopSide;
    }
    
    public getBottomSide () {
        return this.BottomSide;
    }

    public constructor () {
        this.spritemoneda.src = spriteMoneda;
        this.moneda = this.spritemoneda;

        this.position = [(this.random(5) * 160) + 55, (this.random(5) * 160) + 55];
    }

    public update = () => {
        this.RightSide = this.position[0] + this.monedaWidth;
        this.LeftSide = this.position[0];
        this.TopSide = this.position[1];
        this.BottomSide = this.position[1] + this.monedaHeight;

        this.frameCounter +=1;
        if(this.frameCounter % 3 == 0) { // rotate animation
            this.currentCharFrame = (this.currentCharFrame + 1) % 9;
        }
    }
    public render = () => {
        const {context} = GameContext;
        let [xpos, ypos] = this.position;
        const offsetX = 34;
        const sy = 0;
        const sWidth = 29;
        const sHeight = 29;

        context.save();
        context.beginPath();
        context.translate(xpos, ypos);
        context.scale(1.5,1.5)
        context.drawImage(this.moneda, this.currentCharFrame * offsetX, sy, sWidth, sHeight, 0, 0, this.monedaWidth, this.monedaHeight);
        context.closePath();
        context.restore();
    }

    public random(max: number){
        return Math.floor(Math.random() * Math.floor(max))
    }

    public changeCoinPosition(){
        this.position = [(this.random(5) * 160) + 80 - this.monedaWidth, (this.random(5) * 160) + 80 - this.monedaHeight]
        
    }

    public quitarDelTablero(){
        this.position = [ -50, -50];
    }

    
}

export default Moneda;