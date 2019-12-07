import Scene from "./Scene";
import Engine from "../Engine";
import Soundtrack from "/assets/typewriter.mp3";

abstract class StoryPt2 {
    // Sounds
    private soundtrack = new Audio(Soundtrack);

    abstract enter = () => {
        this.soundtrack.volume = 0.2;
        //this.soundtrack.loop = true; no se si quieras qe siempre se escuche
        this.soundtrack.play();
    };
    public abstract update = () => {};
    public abstract render = () => {};

    public handleMouseDown = (event: MouseEvent) => {};
    public KeyUpHandler = (event: KeyboardEvent) => {};
    public KeyDownHandler = (event: KeyboardEvent) => {};
};
export default StoryPt2;