import grabCoin from "/assets/grabCoin.wav";
import GameContext from "../GameContext";
import Moneda from "../Moneda";
import CharState from "./CharacterState";
import IdleState from "./IdleState";
import DeadState from "./DeadState";

type coords = [number, number];

class Character {
    private position: coords = [0,0];
    private charWidth: number = 62.1;
    private charHeight: number = 75;
    private sWidth = 62.1; // sprite width
    private sHeight = 75; // sprite height
    private offsetx: number = 62.1; // Sprite offset
    private frameCounter = 0;
    private currentCharFrame = 0;
    private character = new Image();
    private score: number = 0;
    private state: CharState = null;
    private currentMovement; // either W, A, S, or D
    private charSpeed = 160;   
    private dead: boolean = false; 

    // hitbox
    private RightSide = this.position[0] + this.charWidth; 
    private LeftSide = this.position[0];
    private TopSide = this.position[1];
    private BottomSide = this.position[1] + this.charHeight;

    // sprites and sounds
    private sprite = new Image();
    private coinGrab = new Audio(grabCoin);

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

    public getScore() {
        return this.score;
    }

    public setSprite (spriteState) { 
        this.sprite.src = spriteState;
    }

    public setOffset (spriteOffset) {
        this.offsetx = spriteOffset;
    }

    public setCurrentFrame (currentF) {
        this.currentCharFrame = currentF;
    }

    public setCharW (charw) {
        this.charWidth = charw;
    }

    public setCharH (charh) {
        this.charHeight = charh;
    }

    public setSpriteW (widthS) {
        this.sWidth = widthS;
    }

    public setSpriteH (heightS) {
        this.sHeight = heightS;
    }

    public getDead () {
        return this.dead;
    }


    public constructor () {
        const {context} = GameContext;
        const {width, height} = context.canvas;
        this.state = new IdleState(this);
        this.state.enter();
        this.coinGrab.volume = 1;

        this.character = this.sprite;
        this.position = [(width - this.charWidth) / 2, (height - this.charHeight) / 2 ];
    };


    public checkCollisionCoin = (moneda: Moneda) => { 
        const mRight = moneda.getRightSide() + 20;
        const mLeft = moneda.getLeftSide() - 20;
        const mTop = moneda.getTopSide() + 20;
        const mBottom = moneda.getBottomSide() - 20;

        if (this.LeftSide  < mRight && this.RightSide > mLeft && this.TopSide < mBottom && this.BottomSide > mTop) {
            // changes coin's position and increments score by one
            if(this.coinGrab.paused) {
                this.coinGrab.play();
                moneda.changeCoinPosition();
                this.score += 1;
            }
            
        }
    };

    public CharacterDead = () => { // sets the sprite to spriteKnightDead and stops character from moving
        if(!this.dead) {
            this.state = new DeadState(this);
            this.state.enter();
            this.dead = !this.dead;
        }
    };

    public  KeyUpHandler = (event: KeyboardEvent) => {
        const key = event.key;

        switch (key) {
            case "a":
                this.currentMovement = "";
                break;

            case "d":
                this.currentMovement = "";
                break;

            case "w":
                this.currentMovement = "";
                break;
            
            case "s":
                this.currentMovement = "";
                break;
        }
    };

    public keyDownHandler = (event: KeyboardEvent) => {
        const key = event.key;
        

        switch (key) {
            case "a":
                this.currentMovement = "a";
                break;

            case "d":
                this.currentMovement = "d";
                break;

            case "w":
                this.currentMovement = "w";
                break;
            
            case "s":
                this.currentMovement = "s";
                break;
        }
    };

    public animation = () => {
        this.frameCounter += 1;  
        if (this.frameCounter % 6 === 0) {
            this.currentCharFrame = (this.currentCharFrame + 1) % 10; 
        }
    };

    public update = () => {
        const {context} = GameContext;
        const {width, height} = context.canvas;

        this.RightSide = this.position[0] + this.charWidth;
        this.LeftSide = this.position[0];
        this.TopSide = this.position[1];
        this.BottomSide = this.position[1] + this.charHeight;

        if (!this.dead) {
            if (this.position[0] > 80 && this.currentMovement === "a") {
                this.position[0] -= this.charSpeed;
                this.currentMovement = "";
            } else if (this.position[0] < (width - this.charWidth) - 80 && this.currentMovement === "d") {
                this.position[0] += this.charSpeed;
                this.currentMovement = "";
            } else if (this.position[1] > 80 && this.currentMovement === "w") {
                this.position[1] -= this.charSpeed;
                this.currentMovement = "";
            } else if (this.position[1] < (height - this.charHeight) - 80 && this.currentMovement === "s") {
                this.position[1] += this.charSpeed;
                this.currentMovement = "";
            }
        }

        this.state.update();
        this.animation();
        
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

        // Score
        context.save();
        context.beginPath();
        context.font = "50px Arial";
        context.fillStyle = "yellow";
        context.fillText(this.score.toString(),380,60);
        context.closePath();
        context.restore();
    };

};

export default Character;