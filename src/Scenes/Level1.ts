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
    private tutorialInstructions = ["Instructions", "Movement: WASD", "Dodge spells", "Collect coins", "Press T to resume game"]
    private engine:Engine = Engine.getEngine();
    
    public  KeyUpHandler = (event: KeyboardEvent) => {
        this.character.KeyUpHandler(event);
    };
    public  KeyDownHandler = (event: KeyboardEvent) => {
        const {key} = event;

        this.character.keyDownHandler(event);

        switch(key){ 
            case "p":
                if (this.tutorial === false)
                    this.isPaused = !this.isPaused;
                break;
            
            case "t":
                if (this.isPaused === false)
                    this.tutorial = !this.tutorial;
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
        if (!this.isPaused && !this.tutorial) { // If it is in tutorial or paused update is paused
            this.character.update();
            this.moneda.update();
            this.character.checkCollisionCoin(this.moneda);
            for(let x = 0; x < 4; x++){
                this.lasers[x].update();
                if(this.lasers[x].checkCollisionBool(this.character, this.engine)){
                    this.soundtrack.pause();
                }
                this.lasers[x].checkCollision(this.character, this.engine, this.moneda);
            }

            this.character.checkCollisionCoin(this.moneda);

            if (this.character.getScore() === 10) {
                this.soundtrack.pause();
                this.engine.setCurrentScene(new VicotryScene());
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
        
        if (this.tutorial) { // Tutorial text
            context.save();
            context.globalAlpha = 0.5;
            context.rect(200,200,400,400);
            context.fillStyle = "#1E63B3"; // buscar que color queda mejor con el fondo
            context.fill();
            context.restore();
            
            context.save();
            context.beginPath();
            context.textAlign = "center";
            context.fillStyle = "white"; // buscar que color queda mejor con el cuadro y fondo
            context.font = "30px sans"
            for (let i = 0; i < this.tutorialInstructions.length; i++){
                context.fillText(this.tutorialInstructions[i], width / 2, height / 3 + i * 70);
            }
            context.closePath();
            context.restore();
        }

        if (this.isPaused) { // Paused menu
            context.save();
            context.globalAlpha = 0.5;
            context.rect(200,200,400,400);
            context.fillStyle = "#DB00F5"; // buscar que color queda mejor con el fondo
            context.fill();
            context.restore();

            context.save();
            context.beginPath();
            context.textAlign = "center";
            context.fillStyle = "white"; // buscar que color queda mejor con el cuadro y fondo
            context.font = "30px sans"
            for (let i = 0; i < this.optionsPause.length; i++){
                context.fillText(this.optionsPause[i], width / 2, height / 2.25 + i * 70);
            }
            context.closePath();
            context.restore();
        }
    }
}

export default Playing;
