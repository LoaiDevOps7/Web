"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

const ProjectContent = dynamic(() => import("@/components/ProjectContent"), {
  ssr: false,
  loading: () => <p>جاري تحميل العروض...</p>,
});

export default function SingleProjectPage() {
  return (
    <Suspense fallback={<div>جاري التحميل...</div>}>
      <ProjectContent />
    </Suspense>
  );
}
