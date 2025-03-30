import { Message } from "./Message";
import { Project } from "./Project";

export interface ChatRoom {
  id: string;
  type: string;
  createdAt: Date;
  messages: Message[];
  project: Project;
}
