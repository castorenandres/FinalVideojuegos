import Scene from "./Scene";
import GameContext from "../GameContext";
import Engine from "../Engine";
import Playing from "./Playing";
import Creditos from "./Creditos"

class MenuScene extends Scene {

    private currenOption: number = 0;
    private options = ["Play", "Credits"]


    public enter = () => {};
    public  update = (engine:Engine) => {};
    public  render = () => {
        const context = GameContext.context;
        const width = context.canvas.width;
        const height = context.canvas.height;

        context.save();
        context.rect(0, 0, 800, 800);
        context.fillStyle = "#a61b11"
        context.fill();
        context.restore();

        context.save();
        context.beginPath();
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
    public  KeyUpHandler = (event: KeyboardEvent) => {};
    public  KeyDownHandler = (event: KeyboardEvent, engine: Engine) => {

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
                    engine.setCurrentScene (new Playing());
                }
                if(this.currenOption == 1) {
                    engine.setCurrentScene(new Creditos());
                }
        }
    };
}

export default MenuScene;