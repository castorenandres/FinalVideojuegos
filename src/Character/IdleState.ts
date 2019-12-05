import CharacterState from "./CharacterState";
import Character from "./Character";
import Engine from "../Engine";
import spriteIdle from "/assets/spritesheetKnightIdle.png";

class IdleState extends CharacterState { // Solamente cambia de sprite
    private spriteidle  = new Image();
    private character = new Image();
    private charWidth: number = 57;
    private charHeight: number = 80;
    private sWidth = 57; // sprite width
    private sHeight = 80; // sprite height

    public updateSprite = (character: Character) => {
        character.sprite = 
    };
};

export default IdleState;