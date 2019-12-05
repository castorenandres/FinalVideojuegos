import CharacterState from "./CharacterState";
import Character from "./Character";
import spriteIdle from "/assets/spritesheetKnightIdle.png";

class IdleState extends CharacterState { // Solamente cambia de sprite

    public updateSprite = (character: Character) => {
        character.setState(spriteIdle); 
    };
};

export default IdleState;