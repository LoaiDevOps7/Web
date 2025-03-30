"use client";

import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface NativeWebcamCaptureProps {
  onCapture: (dataUrl: string | null) => void;
}

export default function NativeWebcamCapture({
  onCapture,
}: NativeWebcamCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    async function initCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: "user",
          },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
        toast("تم فتح الكاميرا بنجاح!");
      } catch (error) {
        console.error("Error accessing webcam:", error);
        toast("فشل في فتح الكاميرا");
      }
    }
    initCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const captureImage = () => {
    if (!videoRef.current) {
      toast("فشل في التقاط الصورة");
      return;
    }
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg");
      onCapture(dataUrl);
      toast("تم التقاط الصورة بنجاح!");
    } else {
      toast("فشل في التقاط الصورة");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <video ref={videoRef} className="rounded-md w-full max-w-md" />
      <Button onClick={captureImage}>التقاط الصورة</Button>
    </div>
  );
}
