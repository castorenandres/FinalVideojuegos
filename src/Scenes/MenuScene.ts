import Scene from "./Scene";
import GameContext from "../GameContext";
import Engine from "../Engine";
import Creditos from "./Creditos";
import background from "/assets/MenuScene.png"
import StoryPt1 from "./StoryPt1";


class MenuScene extends Scene {
    private backgroundImage = new Image();
    private currenOption: number = 0;
    private options = ["Play", "Credits"]
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
        context.fillStyle = "white";
        context.font = "50px sans"
        context.strokeStyle = "black";
        for (let i = 0; i < this.options.length; i++){
            if (i == this.currenOption){
                context.lineWidth = 5;
                context.strokeText(this.options[i], width / 2, height / 2 + i *70)
            }
            context.fillText(this.options[i], width / 2, height / 2 + i *70);
        }
        context.closePath();
        context.restore();
    };
    public handleMouseDown = (event: MouseEvent) => {};
    public KeyUpHandler = (event: KeyboardEvent) => {};
    public KeyDownHandler = (event: KeyboardEvent) => {

        const key = event.key;

        switch(key){
            case "ArrowUp":
                this.currenOption = (this.currenOption - 1 + this.options.length) % this.options.length;
                break;
            case "ArrowDown":
                this.currenOption = (this.currenOption + 1) % this.options.length;
                break;
            case "Enter":
                if(this.currenOption == 0) {
                    this.engine.setCurrentScene (new StoryPt1());
                }
                if(this.currenOption == 1) {
                    this.engine.setCurrentScene(new Creditos());
                }
        }
    };
}

export default MenuScene;