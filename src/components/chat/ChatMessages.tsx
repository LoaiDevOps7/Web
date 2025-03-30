// import React, { useContext, useEffect } from "react";
// import Image from "next/image";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { useChat } from "@/context/ChatContext";
// import { UserContext } from "@/context/UserContext";
// import { Message } from "@/types/Message";
// import { format } from "date-fns";
// import { arSA } from "date-fns/locale";
// import { getSocket } from "@/utils/socket";

// const ChatMessages = () => {
//   const { messages, activeRoom } = useChat();
//   const { user } = useContext(UserContext) || {};

//   useEffect(() => {
//     if (!activeRoom?.projectId) return;
//     const socket = getSocket();
//     socket.emit("get_chat_history", {
//       projectId: activeRoom.projectId,
//       roomType: activeRoom.roomType,
//       limit: 50,
//     });
//   }, [activeRoom?.projectId, activeRoom?.roomType]);

//   const renderMessageContent = (message: Message) => (
//     <div className="space-y-1">
//       {message.attachmentUrl && (
//         <div className="mt-2">
//           {message.attachmentUrl.match(/\.(jpeg|jpg|gif|png)$/) ? (
//             <Image
//               src={message.attachmentUrl}
//               alt="مرفق"
//               className="max-w-[200px] rounded-lg"
//               width={200}
//               height={200}
//             />
//           ) : (
//             <a
//               href={message.attachmentUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-primary underline"
//             >
//               فتح الملف
//             </a>
//           )}
//         </div>
//       )}
//       <p className="text-sm">{message.content}</p>
//       <div className="flex items-center gap-2 text-xs text-muted-foreground">
//         <span>
//           {format(new Date(message.createdAt), "HH:mm", { locale: arSA })}
//         </span>
//         {message.reactions?.map((reaction) => (
//           <span key={reaction.id} className="text-sm">
//             {reaction.reactionType}
//           </span>
//         ))}
//       </div>
//     </div>
//   );

//   return (
//     <div className="space-y-4">
//       {messages.map((message) => {
//         // تحديد ما إذا كان المستخدم الحالي هو المرسل أو المستلم
//         const isSender = message?.sender?.user?.id === user?.sub;

//         return (
//           <div
//             key={message.id}
//             className={`flex items-start gap-3 ${
//               isSender ? "flex-row-reverse" : ""
//             }`}
//           >
//             <Avatar>
//               <Image
//                 alt="avatar"
//                 width={70}
//                 height={70}
//                 className="rounded-full object-cover"
//                 src={
//                   message?.sender?.personalInfo?.profileImage
//                     ? `${process.env.NEXT_PUBLIC_API_URL_UPLOADS}/${message.sender.personalInfo.profileImage}`
//                     : "/avatar.png"
//                 }
//               />
//               <AvatarFallback>
//                 {/* {message?.sender?.personalInfo?.firstName} */}
//               </AvatarFallback>
//             </Avatar>
//             <div
//               className={`rounded-lg p-3 max-w-[70%] ${
//                 isSender ? "bg-primary text-primary-foreground" : "bg-muted"
//               }`}
//             >
//               <p className="text-sm font-medium mb-1">
//                 {isSender
//                   ? message?.sender?.personalInfo?.firstName
//                   : message?.receiver?.personalInfo?.firstName
//                   }
//               </p>
//               {renderMessageContent(message)}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default ChatMessages;
