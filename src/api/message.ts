import { Conversation, Message, Reaction } from "@/types/Message";
import axiosClient from "../lib/axiosClient";


export const CreateConversation = async (
  receiverId: number,
  content: string,
  isImportant?: boolean
) => {
  const response = await axiosClient.post("/chat/conversations", {
    receiverId,
    content,
    isImportant,
  });
  return response.data;
};

export const GetConversations = async () => {
  const response = await axiosClient.get("/chat/conversations");
  return response.data;
};

export const GetMessages = async (
  conversationId: string
) => {
  const response = await axiosClient.get(`/chat/messages/${conversationId}`);
  return response.data;
};

// export const SendMessage = async (data: {
//   conversationId: string;
//   content?: string;
//   receiverId: number;
// }): Promise<Message> => {
//   const response = await axiosClient.post("/chat/messages", data);
//   return response.data;
// };

export const UploadFile = async (file: File, userId: number): Promise<{ fileUrl: string }> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosClient.post(`/chat/upload/${userId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const SearchMessages = async (
  conversationId: string,
  query: string
): Promise<Message[]> => {
  const response = await axiosClient.get(
    `/chat/search?conversationId=${conversationId}&q=${encodeURIComponent(
      query
    )}`
  );
  return response.data;
};

export const EditMessage = async (
  messageId: string,
  content: string
): Promise<Message> => {
  const response = await axiosClient.post(`/chat/edit/${messageId}`, {
    content,
    userId: JSON.parse(localStorage.getItem("user") || "{}").id,
  });
  return response.data;
};

export const DeleteMessage = async (
  messageId: string
): Promise<{ message: string }> => {
  const response = await axiosClient.post(`/chat/delete/${messageId}`, {
    userId: JSON.parse(localStorage.getItem("user") || "{}").id,
  });
  return response.data;
};

export const AddReaction = async (
  messageId: string,
  reactionType: string
): Promise<Reaction> => {
  const response = await axiosClient.post("/chat/react", {
    messageId,
    userId: JSON.parse(localStorage.getItem("user") || "{}").id,
    reactionType,
  });
  return response.data;
};
