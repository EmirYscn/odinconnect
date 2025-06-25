import { useSocket } from "@/contexts/SocketContext";
import { Post } from "@shared/types/types";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export function useSocketPostEvents() {
  const socket = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;

    const handlePostCreated = (data: Post) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["posts"],
        exact: false,
      });
    };

    socket.on("post:created", handlePostCreated);

    return () => {
      socket.off("post:created", handlePostCreated);
    };
  }, [socket, queryClient]);
}
