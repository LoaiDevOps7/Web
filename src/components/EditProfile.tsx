"use client";

import React, { useState, useEffect, useContext } from "react";
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
import { createKycPersonalInfo, getKycPersonalInfo, updateKycPersonalInfo } from "@/api/kyc";
import { UserContext } from "@/context/UserContext";
import { Profile } from "@/types/Profile";
import { personalInfoSchema } from "@/utils/personalInfoSchema";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerDemoProps {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
}

export function DatePickerDemo({
  selectedDate,
  setSelectedDate,
}: DatePickerDemoProps) {
  // حساب التاريخ الذي يجب ألا يتجاوزه المستخدم (اليوم - 18 سنة)
  const today = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(today.getFullYear() - 18);

  return (
    <div className="w-[300px]">
      <DatePicker
        selected={selectedDate}
        onChange={(date: Date | null) => {
          setSelectedDate(date || undefined);
        }}
        dateFormat="yyyy-MM-dd"
        maxDate={maxDate}
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={100}
        placeholderText="ادخل تاريخ ميلادك"
        className="w-full border p-2 rounded"
      />
    </div>
  );
}


export default function ProfileDialog() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const { user } = useContext(UserContext) || {};

  // جلب بيانات الملف الشخصي من الخادم عند توفر المستخدم
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      const data = await getKycPersonalInfo(user.sub);
      setProfile(data);
    };
    fetchData();
  }, [user]);

  // دالة التعامل مع إرسال النموذج
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    const formData = new FormData(e.currentTarget);

    // جمع بيانات النموذج
    const dataToValidate = {
      username: formData.get("user") as string,
      firstName: formData.get("firstname") as string,
      lastName: formData.get("lastname") as string,
      description: formData.get("discrip") as string,
      city: formData.get("city") as string,
      country: formData.get("country") as string,
      jobName: formData.get("jobName") as string,
      dateOfBirth: selectedDate,
      profileImage: formData.get("profileImage"),
    };

    try {
      // التحقق من صحة البيانات
      await personalInfoSchema.validate(dataToValidate, {
        abortEarly: false,
        context: { isUpdate: Boolean(profile) },
      });


      // في حال الإنشاء، نضيف قيمة تاريخ الميلاد إلى FormData
      if (!profile && selectedDate) {
        const formattedDate = selectedDate.toISOString().slice(0, 10);
        formData.set("dateOfBirth", formattedDate);
      }

      if (profile) {
        // إذا كانت بيانات الملف الشخصي موجودة نقوم بالتحديث
        await updateKycPersonalInfo(user.sub, dataToValidate);
      } else {
        // إذا لم تكن موجودة نقوم بإنشائها
        await createKycPersonalInfo(user.sub, dataToValidate);
      }
      // تحديث حالة الملف الشخصي بعد الإرسال
      const newProfile = await getKycPersonalInfo(user.sub);
      setProfile(newProfile);
      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error saving profile", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          variant="outline"
          className="bg-lamagreen text-slate-100"
        >
          {profile ? "تعديل ملفك الشخصي" : "إنشاء ملف شخصي"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] text-right">
        <DialogHeader>
          <DialogTitle className="text-lamagreen text-center">
            {profile ? "تعديل معلومات الملف الشخصي" : "إنشاء ملف شخصي"}
          </DialogTitle>
          <DialogDescription className="text-red-600 my-5 text-sm text-center">
            {profile
              ? "في حال تعديل بياناتك فأنت ستفقد توثيقك وستضطر لإعادة طلب التوثيق مرة أخرى."
              : "يرجى إدخال بياناتك الموجودة في البظاقة الشخصية لإنشاء ملف شخصي جديد."}
          </DialogDescription>
        </DialogHeader>
        {/* تغليف المحتوى داخل نموذج ليتم التعامل مع الإرسال */}
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* صورة الملف الشخصي */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="profileImage"
                name="profileImage"
                type="file"
                className="col-span-3 text-right"
              />
              <Label
                htmlFor="profileImage"
                className="text-right text-slate-600"
              >
                صورة الملف الشخصي
              </Label>
            </div>
            {/* الاسم الأول */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="firstname"
                name="firstname"
                defaultValue={profile?.firstName || ""}
                className="col-span-3 text-right"
              />
              <Label htmlFor="firstname" className="text-right text-slate-600">
                الاسم الأول
              </Label>
            </div>
            {/* الاسم الأخير */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="lastname"
                name="lastname"
                defaultValue={profile?.lastName || ""}
                className="col-span-3 text-right"
              />
              <Label htmlFor="lastname" className="text-right text-slate-600">
                الاسم الأخير
              </Label>
            </div>
            {/* اسم المستخدم */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="user"
                name="user"
                defaultValue={profile?.username || ""}
                className="col-span-3 text-right"
              />
              <Label htmlFor="user" className="text-right text-slate-600">
                اسم المستخدم
              </Label>
            </div>
            {/* المسمى الوظيفي */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="jobName"
                name="jobName"
                defaultValue={profile?.job?.name || ""}
                className="col-span-3 text-right"
              />
              <Label htmlFor="job" className="text-right text-slate-600">
                المسمى الوظيفي
              </Label>
            </div>

            {/* النبذة التعريفية */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="discrip"
                name="discrip"
                defaultValue={profile?.description || ""}
                className="col-span-3 text-right"
              />
              <Label htmlFor="discrip" className="text-right text-slate-600">
                النبذة التعريفية
              </Label>
            </div>
            {/* اختيار الدولة */}
            <div className="grid grid-cols-4 items-center gap-4">
              {/* إذا أردت جمع بيانات الدولة عبر input يمكنك إضافته باسم "country" */}
              <Input
                id="country"
                name="country"
                defaultValue={profile?.country || ""}
                className="col-span-3 text-right"
              />
              <Label htmlFor="country" className="text-right text-slate-600">
                الدولة
              </Label>
            </div>
            {/* المدينة */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="city"
                name="city"
                defaultValue={profile?.city || ""}
                className="col-span-3 text-right"
              />
              <Label htmlFor="city" className="text-right text-slate-600">
                المدينة
              </Label>
            </div>
            {/* تاريخ الميلاد يظهر فقط عند إنشاء ملف شخصي جديد */}
            {!profile && (
              <div className="grid grid-cols-4 items-center gap-4">
                <DatePickerDemo
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-lamagreen w-[50%] rounded-md text-center mx-auto"
            >
              {profile ? "حفظ" : "إنشاء"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
