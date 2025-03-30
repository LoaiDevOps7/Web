"use client";

import { createPortfolio } from "@/api/portfolio";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserContext } from "@/context/UserContext"
import { portfolioSchema } from "@/utils/portfolioSchema";
import * as React from "react"
import { useContext, useState } from "react"

export default function AddGallery() {
  const [open, setOpen] = useState(false);
  const { user } = useContext(UserContext) || {};

  // دالة التعامل مع إرسال النموذج
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    const formData = new FormData(e.currentTarget);

    console.log("imageUrl field:", formData.get("imageUrl"));

    const dataToValidate = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      projectUrl: formData.get("projectUrl") as string,
      imageUrl: formData.get("imageUrl"),
    };

    try {
      // التحقق من صحة البيانات
      await portfolioSchema.validate(dataToValidate, {
        abortEarly: false,
      });

      await createPortfolio(user.sub, dataToValidate);
      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error saving profile", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-lamagreen text-slate-100">
          إضافة مشروع
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] text-right">
        <DialogHeader>
          <DialogTitle className="text-lamagreen text-center">
            إضافة مشروع جديد
          </DialogTitle>
          <DialogDescription className="text-gray-500 my-3 text-sm text-center">
            بإمكانك إضافة مشروع جديد ليشاهده المستخدمين الآخرين كنموذج
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Input id="name" name="name" className="col-span-3 text-right" />
              <Label htmlFor="name" className="text-right text-slate-600">
                اسم المشروع
              </Label>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="description"
                name="description"
                className="col-span-3 text-right"
              />
              <Label
                htmlFor="description"
                className="text-right text-slate-600"
              >
                وصف المشروع
              </Label>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="projectUrl"
                name="projectUrl"
                className="col-span-3 text-right"
              />
              <Label htmlFor="projectUrl" className="text-right text-slate-600">
                رابط مصدر المشروع
              </Label>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="imageUrl"
                name="imageUrl"
                type="file"
                className="col-span-3 text-right"
              />
              <Label htmlFor="imageUrl" className="text-right text-slate-600">
                صورة للمشروع
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-lamagreen w-[50%] rounded-md text-center mx-auto"
            >
              إضافة
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
