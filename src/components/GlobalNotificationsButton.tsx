"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import GlobalNotifications from "./ClobalNotifications";
import { useNotifications } from "@/context/NotificationContext";

export default function GlobalNotificationsButton() {
  const { publicNotifications } = useNotifications();
  const unreadCount = publicNotifications.filter((n) => !n.read).length;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <Image
            src="/icons8-offers-50.png"
            alt="Message"
            width={20}
            height={20}
          />
          {unreadCount > 0 && (
            <span className="absolute-top-1 -right-1 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              {unreadCount}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogTitle></DialogTitle>
        <GlobalNotifications />
      </DialogContent>
    </Dialog>
  );
}
