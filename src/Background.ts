import Playing from "./Scenes/Playing"
import background from "/assets/PlayingBackground.png";
import GameContext from "./GameContext";
class Background{
    private backgroundImage = new Image ();
    private playingScene: Playing = null;
    
    constructor(playingScene: Playing){
        this.playingScene = playingScene; 
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

export default Background;