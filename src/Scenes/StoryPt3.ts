import Scene from "./Scene";
import Engine from "../Engine";
import Soundtrack from "/assets/typewriter.mp3";

class StoryPt3 extends Scene {
    // Sounds
    private soundtrack = new Audio(Soundtrack);

    enter = () => {
        this.soundtrack.volume = 0.2;
        //this.soundtrack.loop = true;
        this.soundtrack.play();
    };
    public update = () => {};
    public render = () => {};

    public handleMouseDown = (event: MouseEvent) => {};
    public KeyUpHandler = (event: KeyboardEvent) => {};
    public KeyDownHandler = (event: KeyboardEvent) => {};
};
export default StoryPt3;