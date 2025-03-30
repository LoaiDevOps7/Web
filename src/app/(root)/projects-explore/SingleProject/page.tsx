"use client";

import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import AddOfferDialog from "@/components/AddOfferDialog";
import { Project } from "@/types/Project";
import { UserContext } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { getProjectById } from "@/api/project";
import { ClipboardCopy } from "lucide-react";
import { toast } from "sonner";
import ProjectOffers from "@/components/ProjectOffers";

const SingleProject = () => {
  const searchParams = useSearchParams();
  const projectIdStr = searchParams.get("projectId");
  const { user } = useContext(UserContext) || {};
  const [project, setProject] = useState<Project | null>(null);
  const [currentURL, setCurrentURL] = useState<string>("");


   useEffect(() => {
     if (projectIdStr) {
       getProjectById(projectIdStr)
         .then((data) => setProject(data))
         .catch((error) => console.error("Error fetching project:", error));
     }
   }, [projectIdStr]);

    useEffect(() => {
      if (typeof window !== "undefined") {
        setCurrentURL(window.location.href);
      }
    }, []);

    const copyToClipboard = () => {
      navigator.clipboard.writeText(currentURL);
      toast("تم نسخ رابط المشروع!");
    };

  if (!project) {
    return (
      <div className="text-center my-20">جاري تحميل بيانات المشروع...</div>
    );
  }

  const isOwner = user?.sub === project?.owner?.id;

  return (
    <div>
      <div className="mx-2">
        <Navigation />
      </div>

      <div className="flex flex-col lg:flex-row-reverse">
        <div className="w-[90%] my-20 lg:w-[70%]">
          <div className="md:mx-auto sm:mx-auto mx-auto lg:mx-5 rounded-md overflow-y-scroll bg-white shadow-md">
            {/* Header */}
            <div className="flex flex-row-reverse justify-between">
              <div className="flex flex-row-reverse">
                <Image
                  src={
                    project?.owner.personalInfo?.profileImage
                      ? `${process.env.NEXT_PUBLIC_API_URL_UPLOADS}/${project?.owner.personalInfo.profileImage}`
                      : "/avatar.png"
                  }
                  alt={project?.owner.personalInfo?.firstName || "Avatar"}
                  width={80}
                  height={50}
                  className="mx-2 rounded-full my-2"
                />
                <div className="my-2 text-right">
                  <h1>
                    {project?.owner.personalInfo?.firstName || "مجهول"}{" "}
                    {project?.owner.personalInfo?.lastName}
                  </h1>
                  <h2 className="text-xs text-slate-500">
                    {project?.owner.job?.name || "غير محدد"}
                  </h2>
                  <div className="flex flex-row-reverse text-slate-400 my-1">
                    <p>{project?.name}</p>
                    <p className="mx-3">
                      {new Date(project.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="my-auto mx-3">
                {isOwner ? (
                  <Button className="bg-lamagreen text-center rounded-md w-[30%] mx-[35%] my-6 text-xl text-white">
                    الانتقال للعروض
                  </Button>
                ) : (
                  <AddOfferDialog
                    projectId={project?.id}
                    ownerId={project?.owner.id}
                  />
                )}
              </div>
            </div>

            {/* Project Description */}
            <div className="my-5 text-right mx-3">
              <h1 className="text-xl font-bold text-gray-700 my-3">
                المطلوب إنجازه
              </h1>
              <p className="text-slate-600 mx-2 text-lg">
                {project?.description || "لا يوجد وصف للمشروع في الوقت الحالي"}
              </p>
            </div>

            {/* Attachments */}
            {/* <h1 className="text-right text-xl font-bold my-5 mx-3 text-gray-700">
              الملحقات
            </h1> */}
            
          </div>
          <ProjectOffers />
        </div>


        {/* Project Card */}
        <div className="flex flex-col w-[100%] md:w-[100%] lg:w-[28%] text-right">
          <div className="lg:mt-20 sm:mt-5 md:mt-5 bg-white rounded-md shadow-md mx-[5%] lg:mx-3">
            <h1 className="text-xl text-lamagreen font-bold text-center my-5">
              بطاقة المشروع
            </h1>
            <div className="mx-4">
              <div className="flex flex-row-reverse mb-5">
                <h1 className="text-gray-700 font-bold ml-3 text-lg">
                  : اسم صاحب المشروع
                </h1>
                <p className="text-slate-600 text-lg">
                  {project.owner.personalInfo?.firstName || "مجهول"}{" "}
                  {project.owner.personalInfo?.lastName}
                </p>
              </div>

              <div className="flex flex-row-reverse mb-5">
                <h1 className="text-gray-700 font-bold ml-3 text-lg">
                  : مجال المشروع
                </h1>
                <p className="text-slate-600 text-lg">
                  {project.category.name || "غير محدد"}
                </p>
              </div>

              <div className="flex flex-row-reverse mb-5">
                <h1 className="text-gray-700 font-bold ml-3 text-lg">
                  : حالة المشروع
                </h1>
                <p className="text-slate-600 text-lg">
                  {project.status || "غير معروف"}
                </p>
              </div>

              <div className="flex flex-row-reverse mb-5">
                <h1 className="text-gray-700 font-bold ml-3 text-lg">
                  : تاريخ طرح المشروع
                </h1>
                <p className="text-slate-600 text-lg">
                  {new Date(project.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex flex-row-reverse mb-5">
                <h1 className="text-gray-700 font-bold ml-3 text-lg">
                  : ميزانية المشروع
                </h1>
                <p className="text-slate-600 text-lg">
                  {project.budget || "غير محددة"}
                </p>
              </div>

              <div className="flex flex-row-reverse mb-5">
                <h1 className="text-gray-700 font-bold ml-3 text-lg">
                  : مدة تنفيذ المشروع
                </h1>
                <p className="text-slate-600 text-lg">
                  {project.duration || "غير محددة"}
                </p>
              </div>

              <div className="flex flex-row-reverse mb-10">
                <h1 className="text-gray-700 font-bold ml-3 text-lg">
                  : عدد المتقدمين
                </h1>
                <p className="text-slate-600 text-lg">
                  {project.bids?.length || 0}
                </p>
              </div>
            </div>
          </div>

          {/* Share Section */}
          <div className="bg-white shadow-md rounded-md mx-[5%] lg:mx-3 my-5">
            <h1 className="text-xl font-bold text-lamagreen mx-4 mt-3">
              مشاركة هذا المشروع
            </h1>
            <div className="my-4 flex flex-row-reverse mx-2">
              <h1 className="text-lg mx-2 font-bold text-gray-700">
                : رابط المشروع
              </h1>
              <Button
                onClick={copyToClipboard}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                <ClipboardCopy size={18} />
                نسخ الرابط
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProject;
