import { Suspense } from "react";
import dynamic from "next/dynamic";

const ProjectOffers = dynamic(() => import("@/components/ProjectOffers"), {
  ssr: false,
  loading: () => <p>جاري تحميل العروض...</p>,
});

const POffers = () => {
  return (
    <Suspense fallback={<div>جاري التحميل...</div>}>
      <ProjectOffers />
    </Suspense>
  );
};
export default POffers;
