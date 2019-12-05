import GameEngine from "./Engine";
import GameContext from "./GameContext";

const canvas = document.getElementById("game-area") as HTMLCanvasElement;
const context = canvas.getContext("2d");

GameContext.context = context;

const engine = new GameEngine();
engine.start();


canvas.addEventListener("mousedown", engine.handleMouseDown);
canvas.addEventListener("mouseup", engine.handleMouseDown);
canvas.addEventListener("mousemove", engine.handleMouseDown);
canvas.addEventListener("mouseenter", engine.handleMouseDown);
canvas.addEventListener("mouseout", engine.handleMouseDown);
canvas.addEventListener("keydown", engine.keydownHandler);
canvas.addEventListener("keyup", engine.keyupHandler);