import Scene from "./Scene";
import Engine from "../Engine";
import GameContext from "../GameContext"
import Soundtrack from "/assets/typewriter.mp3";
import level1 from "./Level1"

 class StoryPt1 extends Scene { // no se tiene que usar todo lo puedes dejar asi como esta
    // Sounds
    private soundtrack = new Audio(Soundtrack);

    private fraseOriginal = 'Desde que era niño mi vida ha sido solitaria… \n \nEl pueblo donde vivía era un lugar frio y desolado donde la \ndesesperanza y decepción era claramente visible. Recuerdo muy bien \nel momento en el que mis padres decidieron venderme para pagar \nsus deudas.\n \nAl día siguiente mi padre me llevo al castillo de Lord Anduin, \nel dueño de la arena mas grande del imperio. Cuando aceptó las \nmonedas a cambio de mi vida solo me dijo -Lo siento niño, a todos \nnos toca vivir cosas diferentes -. \n\nCuando entré a la arena y no vi a nadie más, la imagen que había \nhecho en mi cabeza de un rival grande y fuerte se desvaneció \nrápidamente al ver el primer hechizo ir directamente hacia mí…\n\n\n\n\n\n\n\n\n\n\n\n\n\n                                      Presione espacio para continuar'   
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
        //this.typeEffect();
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
        if(corte.length == 29 ){
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
                this.engine.setCurrentScene(new level1())
        }
    };
};
export default StoryPt1;