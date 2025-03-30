import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import * as React from "react";

export default function AddBusinessDialog() {
  return (
    <Dialog>
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
            إضافة مشروع جديد بحاجة فريلانسرز لتنفيذه
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input id="Projtit" className="col-span-3 text-right" />
            <Label htmlFor="Projtit" className="text-right text-slate-600">
              عنوان المشروع
            </Label>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Input id="projdiscrip" className="col-span-3  text-right" />
            <Label htmlFor="Projdiscrip" className="text-right text-slate-600">
              المطلوب تنفيذه
            </Label>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="picture"
              type="file"
              className="col-span-3  text-right"
            />
            <Label htmlFor="picture">ملحقات إن وجدت</Label>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="money"
              type="number"
              className="col-span-3  text-right"
            />
            <Label htmlFor="money">الميزانية المرصودة</Label>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Input id="time" type="number" className="col-span-3  text-right" />
            <Label htmlFor="time">مدة التسليم بالأيام</Label>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Input id="projskills" className="col-span-3  text-right" />
            <Label htmlFor="Projskills" className="text-right text-slate-600">
              المهارات المطلوبة
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
      </DialogContent>
    </Dialog>
  );
}
