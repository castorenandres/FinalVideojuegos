import Character from "./Character";
import Engine from "../Engine";

abstract class CharacterState {
    protected character: Character = null;
    protected engine:Engine = null;
    constructor (char:Character) {
        this.character = char;
        this.engine = Engine.getEngine();
    }

    public abstract enter = () => {};

    public abstract update = () => {};
};

export default CharacterState;