import CharacterState from "./CharacterState";
import spriteIdle from "/assets/spritesheetKnightIdle.png";

class IdleState extends CharacterState { // Solamente cambia de sprite

    public enter = () => {
        this.character.setSprite(spriteIdle); 
    };

    public update =()=> {};
};

export default IdleState;