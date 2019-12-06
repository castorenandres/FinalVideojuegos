import Scene from "./Scene";
import GameContext from "../GameContext";
import Engine from "../Engine";
import MenuScene from "./MenuScene";
import Creditos from "./Creditos";
import background from "/assets/victoriaBG.jpg";

class VicotryScene extends Scene {
    private backgroundImage = new Image();
    private currentOption: number = 0;
    private options = ["menu", "credits"];
    private engine:Engine = Engine.getEngine();

    public enter = () => {};
    public  update = () => {};
    public  render = () => {
        const context = GameContext.context;
        const width = context.canvas.width;
        const height = context.canvas.height;
        this.backgroundImage.src = background;
        const naturalWidth = this.backgroundImage.naturalWidth;
        const naturalHeight = this.backgroundImage.naturalHeight;


        context.save();
        context.beginPath();
        context.drawImage(this.backgroundImage, 0, 0, naturalWidth, naturalHeight);
        context.textAlign = "center";
        context.fillStyle = "teal";
        context.font = "25px sans-serif";
        context.strokeStyle = "teal";
        context.fillText(this.options[0], width - 750, height - 35);
        context.fillText(this.options[1], width - 650, height - 35);
        for (let i = 0; i < this.options.length; i++) {
            if (i === this.currentOption && i === 0) {
                context.strokeText(this.options[i], width - 750, height - 35);
            } else if (i === this.currentOption && i === 1) {
                context.strokeText(this.options[i], width - 650, height - 35);
            }
        }
        context.closePath();
        context.restore();
    };
    public handleMouseDown = (event: MouseEvent) => {};
    public KeyUpHandler = (event: KeyboardEvent) => {};
    public KeyDownHandler = (event: KeyboardEvent) => {
        const key = event.key;

        switch(key) {
            case "ArrowUp":
                this.currentOption = (this.currentOption - 1 + this.options.length) % this.options.length;
                break;
            
            case "ArrowDown":
                this.currentOption = (this.currentOption + 1) % this.options.length;
                break;

            case "Enter":
                if (this.currentOption === 0){
                    this.engine.setCurrentScene(new MenuScene());
                } else if (this.currentOption === 1) { 
                    this.engine.setCurrentScene(new Creditos());
                }
                break;
        };
    };
};

export default VicotryScene;