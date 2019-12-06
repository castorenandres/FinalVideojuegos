import CharacterState from "./CharacterState";
import spriteDeadfghdh from "/assets/spritesheetKnightDeadNew.png";

class DeadState extends CharacterState { // Solamente cambia de sprite

    private framecounter = 0;
    private currentFrame = 0;


    public enter = () => {
        this.character.setSprite(spriteDead); 
    };

    public update =()=> { // checar si se arma singltone sino mandar engine
        this.framecounter ++;

        if (this.framecounter >= 60) {
            // cambia escena
        }
        
    }
};

export default DeadState;