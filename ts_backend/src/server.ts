import * as express from "express";
import * as cors from "cors";
import * as http from "http";
import SocketIO = require("socket.io");

export class Server {
  public static readonly PORT: number = 3000;
  private app: express.Application;
  private server: http.Server;
  private io: SocketIO.Server;
  private port: string | number;

  constructor() {
    this.createApp();
    this.config();
    this.createServer();
    this.sockets();
    this.listen();
  }
  private createApp(): void {
    this.app = express();
    this.app.use(cors());
  }
  private createServer(): void {
    this.server = http.createServer(this.app);
  }
  private config(): void {
    this.port = process.env.PORT || Server.PORT;
  }
  private sockets(): void {
    this.io = require("socket.io").listen(this.server, { origins: "*:*" });
  }
  private listen(): void {
    this.server.listen(this.port, () => {
      console.log("Running server on port %s", this.port);
    });
    this.io.on("connect", (socket: any) => {
      console.log("connected client on port %s.", this.port);

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });
  }
}
