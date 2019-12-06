import GameContext from "./GameContext";
import Time from "./Time";
import Scene from "./Scenes/Scene";
import MenuScene from "./Scenes/MenuScene";

class Engine{
    private currentScene: Scene = null;
    private static engine:Engine = new Engine();

    private constructor() {};

    public static getEngine(){
        return this.engine;
    }

    public start = () => {
        this.init();
        requestAnimationFrame(this.tick);
    };

    public setCurrentScene = (scene: Scene) => {
        this.currentScene = scene;
        this.currentScene.enter();
      };

    public handleMouseDown = (event: MouseEvent) => {
        this.currentScene.handleMouseDown(event);
    };

    public keydownHandler = (event: KeyboardEvent) => {
        this.currentScene.KeyDownHandler(event);
      };
    
    public keyupHandler = (event: KeyboardEvent) => {
        this.currentScene.KeyUpHandler(event);
    };

    public clearScreen = () => {
        const context = GameContext.context;
        const canvas = context.canvas;
        const width = canvas.width;
        const height = canvas.height;

        context.save();
        context.beginPath();
        context.fillStyle = "white";
        context.fillRect(0,0,width,height);
        context.closePath();
        context.restore();
    };

    public changeScene = (scene: Scene) => {
        this.currentScene = scene;
        this.currentScene.enter();
    };

    public init = () => {
       this.currentScene = new MenuScene();
       this.currentScene.enter();

    };

    public tick = () => {
        this.clearScreen();
        Time.update();
        this.currentScene.update();
        this.currentScene.render(); 
        requestAnimationFrame(this.tick);
    };
}

export default Engine;