import background from "/assets/PlayingBackground.png";
import GameContext from "./GameContext";
import BossFight from "./Scenes/BossFight.ts"
class Background3{
    private backgroundImage = new Image ();
    private level2: BossFight = null;
    
    constructor(level2: BossFight){
        this.level2 = level2; 
    }
    
    public render = () =>{
        this.backgroundImage.src = background;

        const {context} = GameContext;
        const height = context.canvas.height;
        const naturalHeight = this.backgroundImage.naturalHeight;
        const naturalWidth = this.backgroundImage.naturalWidth;
        
        const finalImageWidth = ((naturalWidth*height)/naturalHeight);
        const finalImageHeight = height;

        context.drawImage(this.backgroundImage, 0, 0, finalImageWidth, finalImageHeight);
    }
}

export default Background3;