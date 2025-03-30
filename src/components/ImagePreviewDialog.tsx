"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ImagePreviewDialogProps {
  imageSrc: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  onConfirm: () => void;
  onRetake: () => void;
}

export function ImagePreviewDialog({
  imageSrc,
  open,
  setOpen,
  onConfirm,
  onRetake,
}: ImagePreviewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-center">معاينة الصورة</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center p-4">
          <Image
            src={imageSrc}
            alt="Preview"
            width={400}
            height={400}
            className="rounded-md object-cover"
          />
        </div>
        <DialogFooter className="flex justify-around">
          <Button variant="outline" onClick={onRetake}>
            إعادة الالتقاط
          </Button>
          <Button onClick={onConfirm}>تأكيد</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
