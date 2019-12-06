import CharacterState from "./CharacterState";
import spriteDead from "/assets/spritesheetKnightDeadNew.png";
import GameOver from "../Scenes/GameOver";

class DeadState extends CharacterState { // Solamente cambia de sprite

    private framecounter = 0;
    private currentFrame = 0;


    public enter = () => {
        this.character.setSprite(spriteDead); 
    };

    public update =()=> { // checar si se arma singltone sino mandar engine
        this.framecounter ++;

        if (this.framecounter >= 11) {
            this.engine.setCurrentScene(new GameOver());
        }
        
    }
};

export default DeadState;