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
    
    // hitbox
    private RightSide = this.position[0] + this.laser.naturalWidth/2;
    private LeftSide = this.position[0];
    private TopSide = this.position[1];
    private BottomSide = this.position[1] + this.laser.naturalHeight/2;

    constructor(){
        this.laser.src = laserImage;
        let [posX, posY] = this.position;

        this.position = [0, 0]

        this.axis = Math.random();

        if(this.axis < .5){
            //Vertial
            posX = (this.random(5) * 160) + 60
            this.position = [posX, 0]
            this.horizontal = false;
        }else{
            //Horizontal
            posY = (this.random(5) * 160) + 60
            this.position = [0, posY]
            this.horizontal = true;
            //Rotate 90 degrees
        }
 
    }

    public update = () => {
        const { context } = GameContext;
        const { width } = context.canvas;

        let [posX, posY] = this.position;

        this.RightSide = this.position[0] + this.laser.naturalWidth;
        this.LeftSide = this.position[0];
        this.TopSide = this.position[1];
        this.BottomSide = this.position[1] + this.laser.naturalHeight;

        if(this.axis < .5){
            posY = posY + this.speed * Time.deltaTime;
        }else{
            posX = posX + this.speed * Time.deltaTime;
            
        }

        

        this.position = [posX, posY];
        
        
        if(posY != -50 && posX != -50){
            if(posY < 0 || posY > width || posX < 0 || posX > width){
                if(this.axis < .5){
                    //Vertial
                    posX = (this.random(5) * 160) + 60
                    this.position = [posX, 0]
                    this.horizontal = false;
                }else{
                    //Horizontal
                    posY = (this.random(5) * 160) + 60
                    this.position = [0, posY]
                    this.horizontal = true;
                    //Rotate 90 degrees
                }
            }
        }

    }

    public render = () => {
        const { context } = GameContext;
        let[posX, posY] = this.position;
        if(this.horizontal === false){
            context.save();
            context.beginPath();
            context.drawImage(this.laser, posX, posY);
            context.closePath();
            context.restore();
        }else{
            context.save();
            context.beginPath();
            context.translate(posX, posY)
            context.rotate(90 * Math.PI / 180)
            context.drawImage(this.laser, 0, 0);
            context.closePath();
            context.restore(); 
        }
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
        const mRight = Character.getRightSide() + 20;
        const mLeft = Character.getLeftSide() + 50;
        const mTop = Character.getTopSide() + 20;
        const mBottom = Character.getBottomSide() - 20;

        if (this.LeftSide  < mRight && this.RightSide > mLeft && this.TopSide < mBottom && this.BottomSide > mTop) {
            return true;
        }
    }
}

export default laser;