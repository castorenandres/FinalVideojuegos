import Scene from "./Scene"
import Character from "../Character/Character";
import Engine from "../Engine";
import MenuScene from "./MenuScene";
import Background from "../Background";
import Soundtrack from "/assets/soundtrack.mp3";
import Moneda from "../Moneda"
import Laser from "../laser";
import VicotryScene from "./VictoryScene";
import GameContext from "../GameContext";

class Playing extends Scene {
    private lasers: Laser[] = [];
    private character: Character = null;
    private moneda: Moneda = null;
    private background = new Background(this);
    private soundtrack = new Audio(Soundtrack);
    private isPaused = false;
    private tutorial = true;
    private optionsPause = ["Press P to resume", "Press ESC to go to main menu"];
    private tutorialInstructions = ["Movement: WASD", "Dodge spells"]
    
    public  KeyUpHandler = (event: KeyboardEvent) => {};
    public  KeyDownHandler = (event: KeyboardEvent, engine: Engine) => {
        const {key} = event;

        this.character.keyDownHandler(event);

        switch(key){ 
            case "p":
                if (this.tutorial === false)
                    this.isPaused = !this.isPaused;
                break;
            
            case "t":
                this.tutorial = !this.tutorial;
                break;

            case "Escape":
                this.soundtrack.pause();
                engine.setCurrentScene(new MenuScene());
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

    public update = (engine:Engine) => {
        if (!this.isPaused && !this.tutorial) {
            this.character.update();
            this.moneda.update();
            this.character.checkCollisionCoin(this.moneda);
            for(let x = 0; x < 4; x++){
                this.lasers[x].update();
                if(this.lasers[x].checkCollisionBool(this.character, engine)){
                    this.soundtrack.pause();
                }
                this.lasers[x].checkCollision(this.character, engine, this.moneda);
            }

            this.character.checkCollisionCoin(this.moneda);

            if (this.character.getScore() === 10) {
                this.soundtrack.pause();
                engine.setCurrentScene(new VicotryScene());
            }
        }
        
    }

    public render =() => {
        const context = GameContext.context;

        this.background.render();
        this.character.render();
        this.moneda.render();
        for(let x = 0; x < 4; x++){
            this.lasers[x].render();
        }
        
        if (this.tutorial) {
            context.save();
            //context.globalAlpha = 0.5;
            context.rect(200,200,400,400);
            context.fillStyle = "cyan";
            context.fill();
            context.restore();
            
            context.save();
            context.textAlign = "center";
            context.fillStyle = "white";
            context.font = "50px sans"
            context.strokeStyle = "black";
        }

        if (this.isPaused) {
            context.save();
            context.globalAlpha = 0.5;
            context.rect(200,200,400,400);
            context.fillStyle = "white";
            context.fill();
            context.restore();
        }
    }
}

export default Playing;
