// "use client";

// import { createContext, useContext, useState, useEffect, useCallback } from "react";
// import { UserContext } from "./UserContext";
// import { getSocket, initSocket } from "../utils/socket";
// import Cookies from "js-cookie";
// import { Message } from "@/types/Message";
// import { Profile } from "@/types/Profile";
// import { ChatRoom } from "@/types/ChatRoom";
// import { RoomType } from "@/types/RoomType";

// interface ChatContextType {
//   activeRoom: {
//     projectId: string;
//     roomType: string;
//   } | null;
//   availableRooms: ChatRoom[];
//   messages: Message[];
//   onlineUsers: Profile[];
//   typingUsers: string[];
//   setActiveRoom: (
//     room: { projectId: string; roomType: RoomType } | null
//   ) => void;
//   setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
//   sendMessage: (content: string, file?: File) => Promise<void>;
//   sendTypingIndicator: () => void;
//   markMessageAsRead: (messageId: string) => void;
// }

// const ChatContext = createContext<ChatContextType>({
//   activeRoom: null,
//   availableRooms: [],
//   messages: [],
//   onlineUsers: [],
//   typingUsers: [],
//   setActiveRoom: () => {},
//   setMessages: () => {},
//   sendMessage: async () => {},
//   sendTypingIndicator: () => {},
//   markMessageAsRead: () => {},
// });

// export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const { user } = useContext(UserContext) || {};
//   const [availableRooms, setAvailableRooms] = useState<ChatRoom[]>([]);
//   const [activeRoom, setActiveRoom] = useState<{
//     projectId: string,
//     roomType: RoomType
//   } | null>(null);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [onlineUsers, setOnlineUsers] = useState<Profile[]>([]);
//   const [typingUsers, setTypingUsers] = useState<string[]>([]);

//   const sendTypingIndicator = () => {
//     if (activeRoom) {
//       const socket = getSocket();
//       socket.emit("user_typing", { projectId: activeRoom.projectId });
//     }
//   };

//   const markMessageAsRead = (messageId: string) => {
//     const socket = getSocket();
//     socket.emit("mark_as_read", { messageId });
//   };

//   const sendMessage = useCallback(
//     async (content: string, file?: File) => {
//       if (!activeRoom) return;

//       const socket = getSocket(); 
//       let fileUrl = "";

//       try {
//         if (file) {
//           const formData = new FormData();
//           formData.append("file", file);
//           const response = await fetch("/api/upload", {
//             method: "POST",
//             body: formData,
//           });
//           const data = await response.json();
//           fileUrl = data.url;
//         }

//         socket.emit("send_message", {
//           projectId: activeRoom.projectId,
//           content,
//           ...(fileUrl && {
//             fileUrl,
//             fileType: file?.type.split("/")[0] || "file",
//           }),
//         });
//       } catch (error) {
//         console.error("Failed to send message:", error);
//       }
//     },
//     [activeRoom]
//   );

//   useEffect(() => {
//     if (!user || !activeRoom) return;

//     const authToken = Cookies.get("authToken");
//     console.log(authToken)
//     const socket = initSocket(authToken);

//     // الانضمام إلى الغرفة المناسبة
//     const joinRoom = () => {
//       switch (activeRoom.roomType) {
//         case "introduction":
//           socket.emit("join_introduction_chat", activeRoom.projectId);
//           break;
//         case "negotiation":
//           socket.emit("join_offer_chat", activeRoom.projectId);
//           break;
//         case "contract":
//           socket.emit("join_contract_chat", activeRoom.projectId);
//           break;
//         default:
//           socket.emit("join_project_chat", { projectId: activeRoom.projectId });
//       }
//     };

//     socket.on("connect", joinRoom);

//     // معالجة الأحداث
//     socket.on("chat_history", (history: Message[]) => {
//       setMessages(history);
//     });

//     socket.on("new_message", (message: Message) => {
//       setMessages((prev) => [...prev, message]);
//     });

//     socket.on("user_typing", (userId: string) => {
//       setTypingUsers((prev) => [...prev, userId]);
//       setTimeout(() => {
//         setTypingUsers((prev) => prev.filter((id) => id !== userId));
//       }, 3000);
//     });

//     socket.on("presence_update", (users: Profile[]) => {
//       setOnlineUsers(users);
//     });

//     return () => {
//       socket.off("connect", joinRoom);
//       socket.disconnect();
//     };
//   }, [user, activeRoom]);

//   useEffect(() => {
//   // if (!activeRoom?.projectId) return;

//   const authToken = Cookies.get("authToken");
//   const socket = initSocket(authToken); 
  
//   const handleRooms = (rooms: ChatRoom[]) => {
//     // تصفية الغرف غير المرغوبة
//     const filteredRooms = rooms.filter(room => 
//       room.type === 'introduction' || 
//       room.type === 'negotiation' || 
//       room.type === 'contract'
//     );
//     setAvailableRooms(filteredRooms);
//   };

//   socket.emit("get_available_rooms");
//   socket.on("available_rooms", handleRooms);

//   return () => {
//     socket.off("available_rooms", handleRooms);
//   };
// }, [activeRoom?.projectId]);

//   return (
//     <ChatContext.Provider
//       value={{
//         activeRoom,
//         availableRooms,
//         messages,
//         onlineUsers,
//         typingUsers,
//         setActiveRoom,
//         setMessages,
//         sendMessage,
//         sendTypingIndicator,
//         markMessageAsRead,
//       }}
//     >
//       {children}
//     </ChatContext.Provider>
//   );
// };

// export const useChat = () => useContext(ChatContext);
