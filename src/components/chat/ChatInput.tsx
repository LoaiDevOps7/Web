// "use client";

// import React, { useState } from "react";
// import { Paperclip, Send } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useChat } from "@/context/ChatContext";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { getSocket } from "@/utils/socket";

// const ChatInput = () => {
//   const [message, setMessage] = useState("");
//   const [file, setFile] = useState<File | null>(null);
//   const [isSending, setIsSending] = useState(false);
//   const { activeRoom } = useChat();

//   const handleSend = (e: React.FormEvent) => {
//     e.preventDefault();
//     if ((!message.trim() && !file) || !activeRoom) return;

//     setIsSending(true);
//     const socket = getSocket();

//     socket.emit(
//       "send_message",
//       {
//         projectId: activeRoom,
//         content: message,
//         file: file, // You need backend handling for files
//       },
//       () => {
//         setIsSending(false);
//         setMessage("");
//         setFile(null);
//       }
//     );
//   };

//   return (
//     <form
//       onSubmit={handleSend}
//       className="flex items-center gap-2"
//     >
//       <div className="flex gap-2">
//         <Tooltip>
//           <TooltipTrigger asChild>
//             <label className="cursor-pointer">
//               <input
//                 type="file"
//                 className="hidden"
//                 onChange={handleSend}
//                 accept=".pdf,.doc,.docx,image/*"
//                 disabled={isSending}
//               />
//               <Button
//                 variant="ghost"
//                 type="button"
//                 size="icon"
//                 className="h-10 w-10"
//                 disabled={isSending}
//               >
//                 <Paperclip className="h-5 w-5" />
//               </Button>
//             </label>
//           </TooltipTrigger>
//           <TooltipContent>إرفاق ملف (PDF, DOC, صور)</TooltipContent>
//         </Tooltip>
//       </div>

//       <Input
//         placeholder="اكتب رسالتك هنا..."
//         className="flex-1"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         onKeyPress={(e) => e.key === "Enter" && handleSend}
//         disabled={isSending}
//       />

//       <Button
//         className="h-10 px-6"
//         type="submit"
//         disabled={(!message && !file) || isSending}
//         aria-disabled={isSending}
//       >
//         {isSending ? (
//           <div className="animate-spin">...</div>
//         ) : (
//           <>
//             <Send className="h-5 w-5 ml-2" />
//             إرسال
//           </>
//         )}
//       </Button>
//     </form>
//   );
// };

// export default ChatInput;
