import background from "/assets/Prueba1.jpg";
import GameContext from "./GameContext";
import Level2 from "./Scenes/Level2"
class Background2{
    private backgroundImage = new Image ();
    private level2: Level2 = null;
    
    constructor(level2: Level2){
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

export default Background2;