"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useRef,
} from "react";
import { Socket } from "socket.io-client";
import { UserContext } from "@/context/UserContext";
import { SOCKET_EVENTS } from "@/lib/socket";
import { connectSocket } from "@/utils/socket";

interface ActivityContextProps {
  isOnline: boolean;
  socket: Socket | null;
  lastActive: Date | null;
  emitPresence: (status: "online" | "away") => void;
}

const ActivityContext = createContext<ActivityContextProps>({
  isOnline: false,
  socket: null,
  lastActive: null,
  emitPresence: () => {},
});

interface ActivityProviderProps {
  children: ReactNode;
}

export const ActivityProvider = ({ children }: ActivityProviderProps) => {
  const { user } = useContext(UserContext) || {};
  const [isOnline, setIsOnline] = useState(false);
  const [lastActive, setLastActive] = useState<Date | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const heartbeatRef = useRef<number | null>(null);

  const ConnectSocket = useCallback(() => {
    if (!user?.sub) return null;

    const socket = connectSocket();
    socketRef.current = socket;

    socket.on(SOCKET_EVENTS.CONNECT, () => {
      setIsOnline(true);
      setLastActive(new Date());
    });

    socket.on(SOCKET_EVENTS.DISCONNECT, () => {
      setIsOnline(false);
    });

    socket.on(SOCKET_EVENTS.ACTIVITY_UPDATE, (newLastActive: Date | string) => {
      // إذا كان الحدث يُرسل تاريخاً كنص، نقوم بتحويله
      setLastActive(new Date(newLastActive));
    });

    socket.on(SOCKET_EVENTS.ERROR, (error: Error) => {
      console.error("Socket error:", error);
    });

    return socket;
  }, [user?.sub]);

  const emitPresence = useCallback(
    (status: "online" | "away") => {
      if (socketRef.current?.connected) {
        socketRef.current.emit(SOCKET_EVENTS.PRESENCE_UPDATE, {
          userId: user?.sub,
          status,
        });
      }
    },
    [user?.sub]
  );

  useEffect(() => {
    const socket = ConnectSocket();
    if (!socket) return;

    const sendHeartbeat = () => {
      if (socket.connected) {
        socket.emit(SOCKET_EVENTS.HEARTBEAT, {
          userId: user?.sub,
          lastActive: new Date(),
        });
      }
    };

    heartbeatRef.current = window.setInterval(sendHeartbeat, 30000);

    return () => {
      if (socket) {
        socket.disconnect();
      }
      if (heartbeatRef.current) {
        window.clearInterval(heartbeatRef.current);
      }
    };
  }, [ConnectSocket, user?.sub]);

  return (
    <ActivityContext.Provider
      value={{
        isOnline,
        socket: socketRef.current,
        lastActive,
        emitPresence,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivity = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error("useActivity must be used within an ActivityProvider");
  }
  return context;
};
