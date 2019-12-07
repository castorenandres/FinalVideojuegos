import Scene from "./Scene";
import Engine from "../Engine";
import MenuScene from "./MenuScene";
import Background from "../Background3";
import Soundtrack from "/assets/bossfightsong.mp3";
import VicotryScene from "./VictoryScene";
import Boss from "../Boss";
import GameContext from "../GameContext";

class BossFight extends Scene{

    private background = new Background(this);
    private soundtrack = new Audio(Soundtrack);
    private isPaused = false;
    private tutorialInstructions = ["Instructions", "Movement: Mouse", "Objective: hit the boss", "Press P to pause game", "Press T to resume game"];
    private optionsPause = ["Press P to resume", "Press ESC to go to main menu"];
    private engine:Engine = Engine.getEngine();
    private boss: Boss = null;
    private tutorial = true;

    public handleMouseDown = (event: MouseEvent) => {
        this.boss.mouseMovementHandler(event);
    };
    
    public  KeyUpHandler = (event: KeyboardEvent) => {};
    public  KeyDownHandler = (event: KeyboardEvent) => {
        const {key} = event;
        
        //llamar la funcion del keyhandler del boss

        switch(key){ 
            case "t":
                if (this.isPaused === false)
                    this.tutorial = !this.tutorial;
                break;

            case "p":
                if (this.tutorial === false)
                    this.isPaused = !this.isPaused;
                break;
            break;

            case "Escape":
                this.soundtrack.pause();
                this.engine.setCurrentScene(new MenuScene());
                break;
        }
    };

    enter = () => {
        this.boss = new Boss();
        this.soundtrack.volume = 0.2;
        this.soundtrack.loop = true;
        this.soundtrack.play();

    }

    public update = () => {
        if (!this.isPaused  && !this.tutorial) { 
            this.boss.update(); 
            if (this.boss.getClicks() >= 8) {
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
        this.boss.render();

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

export default BossFight;