"use client";

import * as React from "react";
import { Notification } from "@/types/Notification";
import { connectSocket } from "@/utils/socket";
import { UserContext } from "./UserContext";
import { useToast } from "@/hooks/use-toast";

type NotificationContextType = {
  publicNotifications: Notification[];
  privateNotifications: Notification[];
  markAsRead: (type: "public" | "private", index: number) => void;
  clearNotifications: (type: "public" | "private") => void;
};

const NotificationContext = React.createContext<
  NotificationContextType | undefined
>(undefined);

const saveNotificationsToStorage = (
  key: string,
  notifications: Notification[]
) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(notifications));
  }
};

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { toast } = useToast();
  const { user } = React.useContext(UserContext) || {};
  const [publicNotifications, setPublicNotifications] = React.useState<
    Notification[]
  >([]);
  const [privateNotifications, setPrivateNotifications] = React.useState<
    Notification[]
  >([]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setPublicNotifications(
        JSON.parse(localStorage.getItem("publicNotifications") || "[]")
      );
      setPrivateNotifications(
        JSON.parse(localStorage.getItem("privateNotifications") || "[]")
      );
    }
  }, []);

  React.useEffect(() => {
    saveNotificationsToStorage("publicNotifications", publicNotifications);
    saveNotificationsToStorage("privateNotifications", privateNotifications);
  }, [publicNotifications, privateNotifications]);

  React.useEffect(() => {
    if (!user) return;
    const socket = connectSocket();

    socket.on("connect", () => {
      console.log("Connected to WebSocket");
      socket.emit("join-public");
      socket.emit("join-private", user.sub);
    });

    socket.on("public-notification", (newNotification: Notification) => {
      setPublicNotifications((prev) => [
        { ...newNotification, createdAt: new Date(), read: false },
        ...prev,
      ]);
    });

    socket.on("private-notification", (newNotification: Notification) => {
      setPrivateNotifications((prev) => [
        { ...newNotification, createdAt: new Date(), read: false },
        ...prev,
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [user]);

  const markAsRead = (type: "public" | "private", index: number) => {
    if (type === "public") {
      setPublicNotifications((prev) =>
        prev.map((notif, i) => (i === index ? { ...notif, read: true } : notif))
      );
    } else {
      setPrivateNotifications((prev) =>
        prev.map((notif, i) => (i === index ? { ...notif, read: true } : notif))
      );
    }
  };

  const clearNotifications = (type: "public" | "private") => {
    if (type === "public") {
      localStorage.removeItem("publicNotifications");
      setPublicNotifications([]);
    } else {
      localStorage.removeItem("privateNotifications");
      setPrivateNotifications([]);
    }
    toast({
      title: "تم المسح بنجاح",
      description: "تم مسح جميع الإشعارات",
    });
  };

  return (
    <NotificationContext.Provider
      value={{
        publicNotifications,
        privateNotifications,
        markAsRead,
        clearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = React.useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
};
