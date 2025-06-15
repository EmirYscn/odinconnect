import { useSocket } from "@/contexts/SocketContext";
import { useEffect } from "react";

export function useSocketMessageEvents() {
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    const handleConnect = () => {
      console.log("Socket connected:", socket.id);
    };
    const handleMessage = (data: string) => {
      console.log("New message received:", data);
    };

    socket.on("connect", handleConnect);
    socket.on("message", handleMessage);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("message", handleMessage);
    };
  }, [socket]);
}
