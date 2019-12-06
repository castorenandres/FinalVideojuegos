import Engine from "../Engine";
import GameContext from "../GameContext";
import MenuScene from "./MenuScene";
import credits from "/assets/creditos.png";
import Scene from "./Scene";

class Creditos extends Scene {
    private creditos = new Image();
    private currentOption: number = 0;
    private options = ["menu: click enter"];
    private engine:Engine = Engine.getEngine();

    enter = () => {};
    public update = () => {};
    public render = () => {
        this.creditos.src = credits;
        const context = GameContext.context;
        const width = context.canvas.width;
        const height = context.canvas.height;

        context.save();
        context.beginPath();
        context.drawImage(this.creditos,0,0);
        context.closePath();
        context.restore();

        context.save();
        context.beginPath();
        context.textAlign = "center";
        context.fillStyle = "lime";
        context.font = "20px sans-serif";
        context.strokeStyle = "black";
        context.strokeText(this.options[0], width - 50, height - 10);
        context.fillText(this.options[0], width -95, height -10);
        context.closePath();
        context.restore();
    };

    public handleMouseDown = (event: MouseEvent) => {};
    public KeyUpHandler = (event: KeyboardEvent) => {};
    public KeyDownHandler = (event: KeyboardEvent) => {
        const key = event.key;

        switch(key) {
            case "Enter":
                if (this.currentOption === 0){
                    this.engine.setCurrentScene(new MenuScene());
                }
                break;
        };
    };
};
export default Creditos;