import { useEffect } from "react";
// import { io, Socket } from "socket.io-client";
import { BASE_URL } from "../utils/apiConstant";

const SocketHook = (action: any) => {
  useEffect(() => {
    // const socket = io(BASE_URL);
    // console.log("socket active");
    // socket.on("connnection", (socket: Socket) => {
    //   console.log("connected to server", socket.id);
    // });
    // socket.on("cosmosUpdate", (message: any) => {
    //   console.log("message cosmosUpdate", message);
    //   action();
    // });
    // socket.on("disconnect", () => {
    //   console.log("Socket disconnecting");
    // });
    // return () => {
    //   console.log("unmount relatime");
    //   socket.disconnect();
    // };
  }, []);
};

export default SocketHook;
