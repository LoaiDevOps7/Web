// "use client";

// import React from "react";
// import { Card } from "@/components/ui/card";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Separator } from "@/components/ui/separator";
// import ChatSidebar from "./ChatSidebar";
// import ChatMessages from "./ChatMessages";
// import ChatInput from "./ChatInput";
// import { useChat } from "@/context/ChatContext";
// import { cn } from "@/lib/utils";

// const ChatContainer = () => {
//   const { activeRoom, onlineUsers } = useChat();

//   const getOtherUser = () => {
//     if (!activeRoom) return null;
//     return onlineUsers.find((u) => u.id === activeRoom.projectId);
//   };

//   const isUserOnline = !!getOtherUser();

//   return (
//     <div className="flex h-[calc(100vh-4rem)] gap-4 p-4 max-w-[1400px] mx-auto">
//       <Card className="w-80 h-full p-4 flex flex-col">
//         <ChatSidebar />
//       </Card>

//       <Card className="flex-1 h-full flex flex-col">
//         {activeRoom ? (
//           <>
//             <div className="p-4 border-b">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h2 className="font-semibold">
//                     محادثة مع {getOtherUser()?.firstName || "مستخدم"}
//                   </h2>
//                   <div className="flex items-center gap-2 mt-1">
//                     <span
//                       className={cn(
//                         "w-2 h-2 rounded-full",
//                         isUserOnline ? "bg-green-500" : "bg-gray-400"
//                       )}
//                     />
//                     <p className="text-sm text-muted-foreground">
//                       {isUserOnline ? "متصل الآن" : "غير متصل"}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <ScrollArea className="flex-1 p-4">
//               <ChatMessages />
//             </ScrollArea>

//             <Separator />
//             <div className="p-4">
//               <ChatInput />
//             </div>
//           </>
//         ) : (
//           <div className="flex-1 flex items-center justify-center text-muted-foreground">
//             اختر غرفة لبدء الدردشة
//           </div>
//         )}
//       </Card>
//     </div>
//   );
// };

// export default ChatContainer;
