import spriteDead from "/assets/spritesheetKnightDeadNew.png";
import spriteIdle from "/assets/spritesheetKnightIdle.png";
import grabCoin from "/assets/grabCoin.wav";
import GameContext from "../GameContext";
import Moneda from "../Moneda";
import CharState from "./CharacterState";
import IdleState from "./IdleState";

type coords = [number, number];

class Character {
    private position: coords = [0,0];
    private charWidth: number = 57;
    private charHeight: number = 80;
    private sWidth = 57; // sprite width
    private sHeight = 80; // sprite height
    private frameCounter = 0;
    private currentCharFrame = 0;
    private click: boolean = false; // flag for mouse click
    private character = new Image();
    private lastMouseEvent: string = "";
    private currentMouseEvent: string = "";
    private offsetx: number = 62.1;
    private score: number = 0;
    private state: CharState = null;

    // hitbox
    private RightSide = this.position[0] + this.charWidth; 
    private LeftSide = this.position[0];
    private TopSide = this.position[1];
    private BottomSide = this.position[1] + this.charHeight;

    // sprites and sounds
    private sprite = new Image();
    private spritedead = new Image();
    private spriteidle  = new Image();
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

    public setSprite (spriteState) { //checar y como asignar el sprite inicial
        this.sprite.src = spriteState;
    }

    public constructor () {
        const {context} = GameContext;
        const {width, height} = context.canvas;
        this.state = new IdleState(this);
        this.state.enter();
        //this.spriteidle.src = spriteIdle;
        //this.spritedead.src = spriteDead;
        this.coinGrab.volume = 1;

        this.character = this.spriteidle;
        this.position = [(width - this.charWidth) / 2, (height - this.charHeight) / 2 ];
    };

    public  updateSprite = (stateChar: CharState) => {};


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

    public CharacterDead = () => { // sets the sprite to spriteKnightDead and changes the last and current mouse event to run the animation
        this.state = new DeadState(this);
        this.state.enter();
    };

    public keyDownHandler = (event: KeyboardEvent) => {
        const key = event.key;
        const {context} = GameContext;
        const {width, height} = context.canvas;

        switch (key) {
            case "a":
                if (this.position[0] > 80)
                    this.position[0] -= 80;
                break;

            case "d":
                if (this.position[0] < (width - this.charWidth) - 80)
                    this.position[0] += 80;
                break;

            case "w":
                if (this.position[1] > 80)
                    this.position[1] -= 80;
                break;
            
            case "s":
                if (this.position[1] < (height - this.charHeight) - 80)
                    this.position[1] += 80;
        }
    };

    public mouseMovementHandler = (event: MouseEvent) => {
        let [coordx, coordy] = this.position;

        // Mouse has to be over the character to move
        if (event.offsetX < this.RightSide  && event.offsetX > this.LeftSide && event.offsetY < this.BottomSide && event.offsetY > this.TopSide) {
            if (event.type === "mousedown" && (this.currentMouseEvent === "" || this.currentMouseEvent === "mouseup")){
                if(this.soundJump.paused) {
                    this.soundJump.play();
                }
                this.click = true;
                this.lastMouseEvent = this.currentMouseEvent;
                this.currentMouseEvent = "mousedown";
                this.currentCharFrame = 0;
            } else if (event.type === "mouseup" && this.currentMouseEvent === "mousedown") {
                this.click = false;
                this.lastMouseEvent = this.currentMouseEvent;
                this.currentMouseEvent = "mouseup";
                this.currentCharFrame = 0;
            } else if (event.type === "mousedown" && this.currentMouseEvent === "mousedown") {
                this.click = true;
                this.lastMouseEvent = this.currentMouseEvent;
                this.currentMouseEvent = "mousedown";
            }
        }

        if (this.click) { // If click is true, the character moves to the center of the cursor
            coordx = (event.offsetX - this.charWidth / 2);
            coordy = (event.offsetY - this.charHeight / 2);
        }
        this.position = [coordx, coordy]; // updates the new position of the character
    };


    public update = () => {
        this.RightSide = this.position[0] + this.charWidth;
        this.LeftSide = this.position[0];
        this.TopSide = this.position[1];
        this.BottomSide = this.position[1] + this.charHeight;

        this.frameCounter += 1;  
        if (this.frameCounter % 6 === 0) {
            this.currentCharFrame = (this.currentCharFrame + 1) % 10;
        }


       

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