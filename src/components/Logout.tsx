"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/useLogout";

export default function LogoutButton({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logout, isLoading } = useLogout();
  const [open, setOpen] = useState(false);

  const handleConfirmLogout = async () => {
    await logout();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div onClick={() => setOpen(true)}>{children}</div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>تأكيد تسجيل الخروج</DialogTitle>
          <DialogDescription>
            هل أنت متأكد من رغبتك في تسجيل الخروج؟
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <div className="flex gap-4 mt-4">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              إلغاء
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmLogout}
              disabled={isLoading}
            >
              {isLoading ? "جاري الخروج..." : "تأكيد الخروج"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
