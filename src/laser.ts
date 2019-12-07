import GameContext from "./GameContext";
import Character from "./Character/Character";
import laserImage from "/assets/laserBueno.png"
import Time from "./Time"
import Engine from "./Engine"
import GameOver from "./Scenes/GameOver"
import Moneda from "./Moneda"

type coords = [number, number];

class laser{

    private position: coords = [0, 0]
    private speed = 250;
    private laser = new Image();
    private axis: number = null;
    private horizontal: boolean = null;
    private busyColumns = new Array(5).fill(false);
    private busyLines = new Array(5).fill(false);
    
    // hitbox
    private RightSide = this.position[0] + this.laser.naturalWidth;
    private LeftSide = this.position[0];
    private TopSide = this.position[1];
    private BottomSide = this.position[1] + this.laser.naturalHeight;

    constructor(){
        this.laser.src = laserImage;
        let [posX, posY] = this.position;

        this.position = [0, 0]

        this.axis = Math.random();

        if(this.axis < .5){
            //Vertial
            let columna = this.random(5);
            while(this.busyColumns[columna]){
                columna = this.random(5);   
            }
            this.busyColumns[columna] = true;
            posX = (columna * 160) + 60
            this.position = [posX, 0]
            this.horizontal = false;
            
        }else{
            //Horizontal
            let line = this.random(5);
            while(this.busyLines[line]){
                line = this.random(5);
            }   
            this.busyLines[line] = true;
            posY = (line * 160) + 60
            this.position = [0, posY]
            this.horizontal = true;
        }
 
    }

    public update = () => {
        const { context } = GameContext;
        const { width } = context.canvas;

        let [posX, posY] = this.position;

        // condicion para voltear hitbox 90 clockwise
        if (!this.horizontal ) {
            this.RightSide = this.position[0] + this.laser.naturalWidth;
            this.LeftSide = this.position[0];
            this.TopSide = this.position[1];
            this.BottomSide = this.position[1] + this.laser.naturalHeight;
        } else if (this.horizontal) {
            this.RightSide = this.position[0];
            this.LeftSide = this.position[0] - this.laser.naturalHeight;
            this.TopSide = this.position[1];
            this.BottomSide = this.position[1] + this.laser.naturalWidth;
        }

        if(this.axis < .5){
            posY = posY + this.speed * Time.deltaTime;
        }else{
            posX = posX + this.speed * Time.deltaTime;
            
        }

        

        this.position = [posX, posY];
        
        
        if(posY != -50 && posX != -50){
            
            if(posY < 0 || posY > width || posX < 0 || posX > width){
                this.speed = 250 + (Math.random() * 50)
                if(this.axis < .5){
                    //Vertical
                    this.busyColumns[posX/160-60] = false;
                    let columna = this.random(5);
                    while(this.busyColumns[columna]){
                        columna = this.random(5);   
                    }
                    this.busyColumns[columna] = true;
                    posX = (columna * 160) + 60
                    this.position = [posX, 0]
                    this.horizontal = false;
                }else{
                    //Horizontal
                    this.busyLines[posY/160-60] = false;
                    let line = this.random(5);
                    while(this.busyLines[line]){
                        line = this.random(5);
                    }   
                    this.busyLines[line] = true;
                    posY = (line * 160) + 60
                    this.position = [0, posY]
                    this.horizontal = true;
                }
            }
        }

    }

    public render = () => {
        const { context } = GameContext;
        let[posX, posY] = this.position;

        context.save();
        context.beginPath();

        if(this.horizontal === false){
            context.drawImage(this.laser, posX, posY);
        }else{
            context.translate(posX, posY)
            context.rotate(90 * Math.PI / 180)
            context.drawImage(this.laser, 0, 0);
        }

        context.closePath();
        context.restore();
    }

    public random(max: number){
        return Math.floor(Math.random() * Math.floor(max))
    }

    public checkCollision = (Character: Character, engine: Engine, Moneda: Moneda) => {
        const mRight = Character.getRightSide();
        const mLeft = Character.getLeftSide();
        const mTop = Character.getTopSide();
        const mBottom = Character.getBottomSide();

        if (this.LeftSide  < mRight && this.RightSide > mLeft && this.TopSide < mBottom && this.BottomSide > mTop) {
            this.position = [-50, -50]
            this.speed = 0;
            Character.CharacterDead();
            Moneda.quitarDelTablero();
        }
    }

    public checkCollisionBool = (Character: Character, engine: Engine) => {
        const mRight = Character.getRightSide();
        const mLeft = Character.getLeftSide();
        const mTop = Character.getTopSide();
        const mBottom = Character.getBottomSide();

        if (this.LeftSide  < mRight && this.RightSide > mLeft && this.TopSide < mBottom && this.BottomSide > mTop) {
            return true;
        }
    }
}

export default laser;