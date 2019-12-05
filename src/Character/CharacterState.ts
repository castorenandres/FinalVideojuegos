import Character from "./Character";
import IdleState from "./IdleState";

abstract class CharacterState {
    public abstract updateSprite = (character: Character) => {};
};

export default CharacterState;