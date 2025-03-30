import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = () => {
  return io(process.env.NEXT_PUBLIC_WS_URL, {
    path: "/socket.io",
    transports: ["websocket"],
  });
};

// export const initSocket = (token?: string) => {
//   if (!socket) {
//     socket = io("http://localhost:5000/chat", {
//       auth: { token },
//     });
//   }
//   return socket;
// };

// export const getSocket = () => {
//   if (!socket) {
//     throw new Error("Socket not initialized!");
//   }
//   return socket;
// };