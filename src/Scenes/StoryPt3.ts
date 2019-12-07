import Scene from "./Scene";
import Engine from "../Engine";
import Soundtrack from "/assets/typewriter.mp3";
import GameContext from "../GameContext"
import BossFight from "./BossFight";

class StoryPt3 extends Scene {
    private soundtrack = new Audio(Soundtrack);

    private fraseOriginal = 'Lorien cometió el inocente error de tirar un vaso de vino en uno de\nlos invitados del señor, después de que el aristócrata le gritara\nque era una inútil sin motivo alguno para estar viva, uno de los\nguardias en el salón la derribó de un golpe solo para seguir\npateándola en el piso.\n\nEn ese momento el único sentimiento que tenía era odio y rencor puro\na todos los que hacían de nuestras vidas miserables sin que nosotros\ntuviéramos poder alguno para cambiarlo. Recordé como mis padres me\nabandonaron y vendieron para que ellos pudieran sobrevivir, como cada\nvez que salía a la arena miles de personas deseaban que me tropezara\no me descuidara para ver mi sangre correr por el piso, me imaginé la\ncara del aristócrata y el guardia mientras hacían sentir miserable a\nLorien; y en ese momento fue en el que decidí que tenía que hacer\nalgo.\n\nRetaría  al campeón y guardia personal de Lord Anduin apostando mi\nvida a cambio de mi libertad y la de Lorien.\n\n\n\n\n\n\n\n\n\n\n\n                                    Presione espacio para continuar'   
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
                this.engine.setCurrentScene(new BossFight())
        }
    };
};
export default StoryPt3;