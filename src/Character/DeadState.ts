import CharacterState from "./CharacterState";
import spriteDead from "/assets/spritesheetKnightDeadNew.png";
import GameOver from "../Scenes/GameOver";

class DeadState extends CharacterState { // Solamente cambia de sprite

    private framecounter = 0;
    private currentFrame = 0;


    public enter = () => {
        this.character.setSprite(spriteDead);
        this.character.setOffset(87.1);
        this.character.setCurrentFrame(0);
        this.character.setSpriteW(85);
        this.character.setSpriteH(69);
        this.character.setCharH(69);
        this.character.setCharW(87.1);   
    };

    public update =()=> { 
        this.framecounter ++;

        if (this.framecounter >= 60) {
            this.engine.setCurrentScene(new GameOver());
        }
        
    }
};

export default DeadState;