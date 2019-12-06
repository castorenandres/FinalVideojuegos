import Character from "./Character";
import IdleState from "./IdleState";
import DeadState from "./DeadState";

abstract class CharacterState {
    protected character: Character = null;
    constructor (char:Character) {
        this.character = char;
    }

    public abstract enter = () => {};

    public abstract update = () => {};
};

export default CharacterState;