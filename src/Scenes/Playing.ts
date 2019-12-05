import Scene from "./Scene"
import Character from "../Character/Character";
import Engine from "../Engine";
import MenuScene from "./MenuScene";
import Background from "../Background";
import Soundtrack from "/assets/soundtrack.mp3";
import Moneda from "../Moneda"
import Laser from "../laser";
import VicotryScene from "./VictoryScene";

class Playing extends Scene {
    private lasers: Laser[] = [];
    private character: Character = null;
    private moneda: Moneda = null;
    private background = new Background(this);
    private soundtrack = new Audio(Soundtrack);
    

    public handleMouseDown = (event: MouseEvent) => {
        this.character.mouseMovementHandler(event); 
    };

    public  KeyUpHandler = (event: KeyboardEvent) => {};
    public  KeyDownHandler = (event: KeyboardEvent, engine: Engine) => {
        const {key} = event;

        switch(key){ // pause/reset game
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

    public render =() => {
        this.background.render();
        this.character.render();
        this.moneda.render();
        for(let x = 0; x < 4; x++){
            this.lasers[x].render();
        }
    }
}

export default Playing;
