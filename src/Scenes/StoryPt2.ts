import Scene from "./Scene";
import Engine from "../Engine";
import Soundtrack from "/assets/typewriter.mp3";
import level2 from "./Level2";
import GameContext from "../GameContext"

 class StoryPt2 extends Scene {
    private soundtrack = new Audio(Soundtrack);

    private fraseOriginal = 'Esa fue mi vida durante los siguientes meses, tres veces a la semana\nsalía a la arena para que las personas se entretuvieran con la\nincógnita si esta sería la vez que moriría.\n\nLa única persona con la que hablaba era Lorien, ella servía dentro\ndel castillo pues era muy hermosa y educada, desde que Lord Anduin\nmató a sus padres se vio forzada a trabajar para el.\n\nLorien me llevaba agua y comida dos veces al día, y así fue como me\nfui enamorando de ella poco a poco. Era algo tonto y estúpido; yo no\nsabía en qué momento podía entrar a la arena caminando y salir siendo\ncargado por 3 brutos totalmente inmóvil, y ella estaba condenada a\nservir de por vida al tirano que gobernaba estas tierras.\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n                                   Presione espacio para continuar'   
    private i = 0;
    private fraseCopia: string = "";
    private X = 30;
    private Y = 30;
    private framecounter = 0;
    private engine: Engine = Engine.getEngine();


    enter = () => {
        this.soundtrack.volume = 0.2;
        this.soundtrack.loop = true; 
        this.soundtrack.play();
    };
    public update = () => {
        const context = GameContext.context;
        const canvas = context.canvas;
        const width = canvas.width;
        const height = canvas.height;
        this.framecounter++;
        if(this.framecounter % 3 == 0){
            this.fraseCopia = this.fraseCopia + this.fraseOriginal.charAt(this.i);
                this.i++; 
        } 

    };
    public render = () => {
        const context = GameContext.context;
        const canvas = context.canvas;
        const width = canvas.width;
        const height = canvas.height;
        
        context.save();
        context.fillStyle = "black"
        context.rect(0,0, width, height);
        context.fill();
        context.restore();

        context.save();
        context.fillStyle = 'white';
        context.font = '20px consolas'
        let corte = this.fraseCopia.split("\n")
        for(let i = 0; i < corte.length; i++){
            context.fillText(corte[i], 25, this.Y + i*25)
        }
        if(corte.length == 30 ){
            this.soundtrack.pause();
        }
        context.restore();
    };



    public handleMouseDown = (event: MouseEvent) => {};
    public KeyUpHandler = (event: KeyboardEvent) => {};
    public KeyDownHandler = (event: KeyboardEvent) => {
        const key = event.code
        switch(key){
            case "Space":
                this.soundtrack.pause();
                this.engine.setCurrentScene(new level2())
        }
    };
};
export default StoryPt2;