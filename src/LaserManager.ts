class LaserManager{
    private horizontal: boolean [] = [false];
    private vertical: boolean [] = [false];

    constructor(){};
    public setArreglo(sentido:boolean, posicion:number){
        // si sale de forma horizotal
        if(sentido){
            this.horizontal[posicion] = true;
        }
        else{
            this.vertical[posicion] = true;
        }
    }

    public getBoolPosicion(sentido:boolean, posicion:number){
        if(sentido){
            return this.horizontal[posicion];
        }
        else{
            return this.vertical[posicion];
        }

    }

    public setLibre(sentido:boolean, posicion:number){
        if(sentido){
            this.horizontal[posicion] = false;
        }
        else{
            this.vertical[posicion] = false;
        }
    }
}

export default LaserManager;