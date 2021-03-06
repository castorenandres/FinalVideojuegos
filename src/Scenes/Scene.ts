abstract class Scene {
    abstract enter = () => {};
    public abstract update = () => {};
    public abstract render = () => {};

    public abstract handleMouseDown = (event: MouseEvent) => {};
    public abstract KeyUpHandler = (event: KeyboardEvent) => {};
    public abstract KeyDownHandler = (event: KeyboardEvent) => {};
};
export default Scene;