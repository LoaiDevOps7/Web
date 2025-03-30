// import React from "react";
// import { Search } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { useChat } from "@/context/ChatContext";
// import { cn } from "@/lib/utils";
// import { Button } from "../ui/button";
// import { RoomType } from "@/types/RoomType";

// const ChatSidebar = () => {
//   const { availableRooms, setActiveRoom, activeRoom } = useChat();

//   console.log("Available Rooms:", availableRooms);

//   return (
//     <>
//       <div className="relative mb-4">
//         <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//         <Input
//           placeholder="بحث في المحادثات..."
//           className="pl-9 rtl:pr-9 rtl:pl-4"
//         />
//       </div>

//       <ScrollArea className="flex-1">
//         <div className="space-y-2">
//           {availableRooms.length === 0 ? (
//             <p className="text-center py-4 text-muted-foreground">
//               لا توجد غرف متاحة حالياً
//             </p>
//           ) : (
//             availableRooms.map((room) => (
//               <Button
//                 key={room.id}
//                 variant="ghost"
//                 className={cn(
//                   "w-full justify-start",
//                   activeRoom?.projectId === room.project.id && "bg-accent"
//                 )}
//                 onClick={() =>
//                   setActiveRoom({
//                     projectId: room.project.id,
//                     roomType: room.type as RoomType,
//                   })
//                 }
//               >
//                 {room.type === "introduction" && "غرفة التعريف"}
//                 {room.type === "negotiation" && "غرفة التفاوض"}
//                 {room.type === "contract" && "غرفة العقد"}
//                 {room.type === "execution" && "غرفة التنفيذ"}
//               </Button>
//             ))
//           )}
//         </div>
//       </ScrollArea>
//     </>
//   );
// };

// export default ChatSidebar;
