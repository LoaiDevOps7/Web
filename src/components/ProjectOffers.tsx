"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { getBidsForProject } from "@/api/bids";
import { acceptBid, rejectBid } from "@/api/project";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { Bid } from "@/types/Bid";
import { Button } from "./ui/button";
import { UserContext } from "@/context/UserContext";
import { Project } from "@/types/Project";

const ProjectOffers = () => {
   const router = useRouter();
   const searchParams = useSearchParams();
   const { user } = useContext(UserContext) || {};
   const projectIdStr = searchParams.get("projectId");
   const [bids, setBids] = useState<Bid[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState("");
   const [processing, setProcessing] = useState<string | null>(null);
    const [project, setProject] = useState<Project | null>(null);

   const isOwner = user?.sub === project?.owner?.id;

  useEffect(() => {
    if (!projectIdStr) return;

    const fetchBids = async () => {
      try {
        setLoading(true);
        const data = await getBidsForProject(projectIdStr);
        setBids(data);
      } catch (err) {
        setError("فشل في جلب العروض.");
      } finally {
        setLoading(false);
      }
    };

    fetchBids();
  }, [projectIdStr]);

  const handleBidAction = async (
    bidId: string,
    action: "accept" | "reject"
  ) => {
    if (!projectIdStr) return;

    setProcessing(bidId); // تحديد العملية الجارية

    try {
      if (action === "accept") {
        await acceptBid(projectIdStr, bidId);
      } else {
        // استخدام دالة rejectBid من ملف API
        await rejectBid(projectIdStr, bidId);
      }

      // تحديث الحالة بعد نجاح العملية
      setBids((prevBids) => prevBids.filter((bid) => bid.id !== bidId));
    } catch (error) {
      console.error(`فشل ${action === "accept" ? "قبول" : "رفض"} العرض`, error);
    } finally {
      setProcessing(null);
    }
  };

  if (loading)
    return <p className="text-center text-slate-600">جارٍ تحميل العروض...</p>;

  if (error) return <p className="text-center text-red-500">{error}</p>;

  if (!bids || bids.length === 0)
    return (
      <p className="text-center text-slate-600">لا توجد عروض لهذا المشروع.</p>
    );

  return (
    <div className="bg-white rounded-md text-slate-600 flex flex-col mx-5">
      <h1 className="text-lamagreen my-3 text-center text-2xl">العروض</h1>
      {bids.map((bid) => (
        <div
          key={bid.id}
          className="bg-white shadow-md rounded-md mx-3 my-5 p-3"
        >
          <div className="flex flex-row-reverse">
            <Image
              src={
                bid?.freelancer?.personalInfo?.profileImage
                  ? `${process.env.NEXT_PUBLIC_API_URL_UPLOADS}/${bid.freelancer.personalInfo.profileImage}`
                  : "/avatar.png"
              }
              alt="صورة المستخدم"
              width={80}
              height={50}
              className="mx-2 rounded-full my-2"
            />
            <div className="my-2 text-right">
              <h1>
                {bid.freelancer.personalInfo.firstName}{" "}
                {bid.freelancer.personalInfo.lastName}
              </h1>
              <h2 className="text-xs text-slate-500">Freelancer</h2>
              <p className="mx-3">{bid.submittedAt || "غير متوفر"}</p>
            </div>
          </div>
          <p className="text-slate-600 text-right mx-3">
            {bid.description.length > 100
              ? bid.description.substring(0, 100) + "..."
              : bid.description}
          </p>
          <div className="my-3 text-center flex justify-around flex-wrap">
            <div>
              <h1 className="text-lamagreen text-xl">مدة التسليم</h1>
              <p className="mt-2 text-slate-500">
                {(bid as any).deliveryTime || "غير متوفر"}
              </p>
            </div>
            <div>
              <h1 className="text-lamagreen text-xl">التكلفة</h1>
              <p className="mt-2 text-slate-500">
                {bid.amount || "غير متوفر"}$
              </p>
            </div>
          </div>
          <div className="flex flex-1 text-center justify-around flex-wrap my-3">
            {project && isOwner ? (
              <>
                <Button className="w-[30%] bg-lamagreen text-white text-center rounded-md">
                  مراسلة
                </Button>
                <Button
                  className="w-[30%] bg-lamagreen text-white text-center rounded-md"
                  onClick={() => handleBidAction(bid.id, "accept")}
                  disabled={processing === bid.id}
                >
                  {processing === bid.id ? "جارٍ القبول..." : "قبول"}
                </Button>
                <Button
                  className="w-[30%] bg-red-700 text-white text-center rounded-md"
                  onClick={() => handleBidAction(bid.id, "reject")}
                  disabled={processing === bid.id}
                >
                  {processing === bid.id ? "جارٍ الرفض..." : "رفض"}
                </Button>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectOffers;
