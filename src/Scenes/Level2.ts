import Scene from "./Scene";
import Character from "../Character/Character";
import Engine from "../Engine";
import MenuScene from "./MenuScene";
import Background from "../Background2";
import Soundtrack from "/assets/soundtrack.mp3";
import Moneda from "../Moneda"
import Laser from "../laser";
import GameContext from "../GameContext";
import StoryPt3 from "./StoryPt3";

class Level2 extends Scene{

    private lasers: Laser[] = [];
    private character: Character = null;
    private moneda: Moneda = null;
    private background = new Background(this);
    private soundtrack = new Audio(Soundtrack);
    private isPaused = false;
    private optionsPause = ["Press P to resume", "Press ESC to go to main menu"];
    private engine:Engine = Engine.getEngine();
    
    public handleMouseDown = (event: MouseEvent) => {};
    public  KeyUpHandler = (event: KeyboardEvent) => {
        this.character.KeyUpHandler(event);
    };
    public  KeyDownHandler = (event: KeyboardEvent) => {
        const {key} = event;

        this.character.keyDownHandler(event);

        switch(key){ 
            case "p":
                this.isPaused = !this.isPaused;
                break;

            case "Escape":
                this.soundtrack.pause();
                this.engine.setCurrentScene(new MenuScene());
                break;
        }
    };

    enter = () => {
        this.character = new Character();
        this.moneda = new Moneda();
        this.soundtrack.volume = 0.2;
        this.soundtrack.loop = true;
        this.soundtrack.play();
        for(let x = 0; x < 4; x++){
            this.lasers.push(new Laser())
        }
    }

    public update = () => {
        if (!this.isPaused) { // If the game is paused update is paused
            this.character.update();
            this.moneda.update();
            this.character.checkCollisionCoin(this.moneda);
            for(let x = 0; x < 4; x++){
                this.lasers[x].update();
                if(this.lasers[x].checkCollisionBool(this.character)){
                    this.soundtrack.pause();
                }
                this.lasers[x].checkCollision(this.character, this.moneda);
            }

            this.character.checkCollisionCoin(this.moneda);

            if (this.character.getScore() === 15) {
                this.soundtrack.pause();
                this.engine.setCurrentScene(new StoryPt3());
            }
        }
        
    }

    public render =() => {
        const context = GameContext.context;
        const width = context.canvas.width;
        const height = context.canvas.height;

        this.background.render();
        this.character.render();
        this.moneda.render();
        for(let x = 0; x < 4; x++){
            this.lasers[x].render();
        }
        

        if (this.isPaused) { // Paused menu
            context.save();
            context.globalAlpha = 0.5;
            context.rect(200,200,400,400);
            context.fillStyle = "#DB00F5"; 
            context.fill();
            context.restore();

            context.save();
            context.beginPath();
            context.textAlign = "center";
            context.fillStyle = "white"; 
            context.font = "30px sans"
            for (let i = 0; i < this.optionsPause.length; i++){
                context.fillText(this.optionsPause[i], width / 2, height / 2.25 + i * 70);
            }
            context.closePath();
            context.restore();
        }
    }
}

export default Level2;