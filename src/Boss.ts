import GameContext from "./GameContext";
// importar sprite y sonido

type coords = [number, number];

class Boss {
    private position: coords = [0,0];
    private bossWidth: number = 57;
    private bossHeight: number = 80;
    private sWidth = 57; // sprite width
    private sHeight = 80; // sprite height
    private frameCounter = 0;
    private currentCharFrame = 0;
};

export default Boss;