import { io } from "socket.io-client";

const socketUrl = new URL(import.meta.env.BASE_API_URL).origin;

export const socket = io(socketUrl, {
  withCredentials: true,
  autoConnect: false
});
