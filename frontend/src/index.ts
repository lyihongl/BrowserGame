import { Engine, Loader, DisplayMode } from "excalibur";
import { LevelOne } from "./scenes/level-one/level-one";
import { Player } from "./actors/player/player";
import { Resources } from "./resources";
import io from "socket.io-client";
import SocketIOClient from "socket.io-client";

/**
 * Managed game class
 */
class Game extends Engine {
  private player: Player;
  private levelOne: LevelOne;
  private socket: typeof SocketIOClient.Socket;

  constructor() {
    super({ displayMode: DisplayMode.FullScreen });
  }

  public start() {
    // Create new scene with a player
    this.levelOne = new LevelOne(this);
    this.player = new Player();
    this.levelOne.add(this.player);
    this.socket = io("http://localhost:3000/socket.io");

    this.socket.emit("notice", "testing");
    console.log(this.socket);

    //this.socket.open();

    game.add("levelOne", this.levelOne);

    // Automatically load all default resources
    const loader = new Loader(Object.values(Resources));

    //const socket = io("http://localhost:8000")

    return super.start(loader);
  }
}

const game = new Game();
game.start().then(() => {
  game.goToScene("levelOne");
});
