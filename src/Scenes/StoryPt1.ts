import Scene from "./Scene";
import Engine from "../Engine";
import GameContext from "../GameContext"
import Soundtrack from "/assets/typewriter.mp3";

 class StoryPt1 extends Scene { // no se tiene que usar todo lo puedes dejar asi como esta
    // Sounds
    private soundtrack = new Audio(Soundtrack);

    enter = () => {
        this.soundtrack.volume = 0.2;
        //this.soundtrack.loop = true; no se si quieras qe siempre se escuche
        this.soundtrack.play();
        this.typeEffect();
    };
    public update = () => {};
    public render = () => {
        const context = GameContext.context;
        const canvas = context.canvas;
        const width = canvas.width;
        const height = canvas.height;
        
        context.fillStyle = "black"
        context.rect(0,0, width, height);
        context.fill();
    };

    private typeEffect() {
        const context = GameContext.context;
        const canvas = context.canvas;
        const width = canvas.width;
        const height = canvas.height;
        let X = 30
        let Y = 30
        let speed = 75
    
        context.fillStyle = 'red';
        context.font = '20px consolas'
    
    
        let element = 'Desde que era niño mi vida ha sido solitaria… \n El pueblo donde vivía era un lugar frio y desolado donde la desesperanza y decepción era claramente visible. Recuerdo muy bien el momento en el que mis padres decidieron venderme para pagar sus deudas.\nAl día siguiente mi padre me llevo al castillo de Lord Anduin, el dueño de la arena mas grande del imperio. Cuando aceptó las monedas a cambio de mi vida solo me dijo -Lo siento niño, a todos nos toca vivir cosas diferentes -\n.Cuando entré a la arena y no vi a nadie más, la imagen que había hecho en mi cabeza de un rival grande y fuerte se desvaneció rápidamente al ver el primer hechizo ir directamente hacia mí…'   
        var i = 0;
        var timer = setInterval(function(){
          if(i < element.length){
            if(X > canvas.width-30){
              Y += 25 ;
              X = 25;
            }
             X +=  (context.measureText(String(element.charAt(i))).width);
             console.log(element.charAt(i))
            context.fillText(String(element.charAt(i)), X, Y)     
            i++;
          }else{
            clearInterval(timer);
          }
        }, 50)
        
    }

    public handleMouseDown = (event: MouseEvent) => {};
    public KeyUpHandler = (event: KeyboardEvent) => {};
    public KeyDownHandler = (event: KeyboardEvent) => {};
};
export default StoryPt1;