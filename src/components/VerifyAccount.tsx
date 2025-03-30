"use client";

import * as React from "react";
import { useContext, useState } from "react";
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
import { VerifyAccountSchema } from "@/utils/verifyAccountSchema";
import { UserContext } from "@/context/UserContext";
import { createKycVerification } from "@/api/kyc";
import NativeWebcamCapture from "./NativeWebcamCapture";
import { ImagePreviewDialog } from "./ImagePreviewDialog";
import { toast } from "sonner";

function dataURLtoFile(dataUrl: string, filename: string): File {
  const arr = dataUrl.split(",");
  const mimeMatch = arr[0].match(/:(.*?);/);
  if (!mimeMatch) throw new Error("Invalid data URL");
  const mime = mimeMatch[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

export default function VerifyAccountDialog() {
  const [open, setOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [capturedFile, setCapturedFile] = useState<File | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const { user } = useContext(UserContext) || {};

  const handleCapture = (dataUrl: string | null) => {
    if (dataUrl) {
      setCapturedImage(dataUrl);
      setPreviewOpen(true);
    }
  };

  const handlePreviewConfirm = () => {
    if (capturedImage) {
      const file = dataURLtoFile(capturedImage, "live_face.jpg");
      setCapturedFile(file);
    }
    setPreviewOpen(false);
  };

  const handlePreviewRetake = () => {
    setCapturedImage(null);
    setCapturedFile(null);
    setPreviewOpen(false);
  };

  // دالة التعامل مع إرسال النموذج
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    const formData = new FormData(e.currentTarget);

    // إذا تم التقاط صورة الوجه الحية، نضيف الملف إلى FormData
    if (capturedFile) {
      formData.set("faceImage", capturedFile);
    }

    // جمع بيانات النموذج للتحقق منها
    const dataToValidate = {
      faceImage: capturedFile,
      frontIdCardImage: formData.get("frontIdCardImage"),
      backIdCardImage: formData.get("backIdCardImage"),
      governmentId: formData.get("governmentId") as string,
    };

    try {
      // التحقق من صحة البيانات باستخدام Yup
      await VerifyAccountSchema.validate(dataToValidate, { abortEarly: false });
      // لإنشاء توثيق الحساب
      await createKycVerification(user.sub, dataToValidate);
      setOpen(false);
      toast("تم حفظ بيانات التوثيق بنجاح!");
      window.location.reload();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "خطأ غير معروف";
      toast("حدث خطأ أثناء حفظ بيانات التوثيق" + " " + errorMessage);
      console.error("Error saving verification data", error);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            className="bg-lamathirthblue text-slate-100 w-[130px]"
          >
            توثيق الحساب
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] text-right">
          <DialogHeader>
            <DialogTitle className="text-lamagreen text-center">
              توثيق الحساب
            </DialogTitle>
            <DialogDescription className="text-gray-500 my-3 text-sm text-center">
              وثق حسابك لزيادة ثقة المستخدمين الآخرين بك ورفع مستوى ظهورك في
              عمليات البحث.
            </DialogDescription>
          </DialogHeader>
          {/* تغليف المحتوى داخل نموذج مع onSubmit */}
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              {/* صورة الوجه الأمامية */}
              <div>
                <NativeWebcamCapture onCapture={handleCapture}  />
                <Label htmlFor="faceImage" className="text-right">
                  صورة وجه أمامية
                </Label>
              </div>
              {/* صورة البطاقة الأمامية */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Input
                  id="frontIdCardImage"
                  name="frontIdCardImage"
                  type="file"
                  className="col-span-3 text-right"
                />
                <Label htmlFor="frontIdCardImage" className="text-right">
                  صورة أمامية للهوية
                </Label>
              </div>
              {/* صورة البطاقة الخلفية */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Input
                  id="backIdCardImage"
                  name="backIdCardImage"
                  type="file"
                  className="col-span-3 text-right"
                />
                <Label htmlFor="backIdCardImage" className="text-right">
                  صورة خلفية للهوية
                </Label>
              </div>
              {/* الرقم الوطني */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Input
                  id="governmentId"
                  name="governmentId"
                  type="number"
                  className="col-span-3 text-right"
                />
                <Label htmlFor="governmentId" className="text-right">
                  الرقم الوطني
                </Label>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className="bg-lamagreen w-[50%] rounded-md text-center mx-auto"
              >
                توثيق
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      {capturedImage && (
        <ImagePreviewDialog
          imageSrc={capturedImage}
          open={previewOpen}
          setOpen={setPreviewOpen}
          onConfirm={handlePreviewConfirm}
          onRetake={handlePreviewRetake}
        />
      )}
    </>
  );
}
