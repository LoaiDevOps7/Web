"use client";

import Image from "next/image";
import { useProjects } from "@/context/ProjectContext";
import AddProject from "./AddProject";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";
import { Project } from "@/types/Project";

interface ProjectExploreProps {
  onProjectSelect: (project: Project) => void;
}

const ProjectExplore = ({ onProjectSelect }: ProjectExploreProps) => {
  const router = useRouter();
  const { projects } = useProjects();
  // const { user } = useContext(UserContext) || {};

  const handleProjectClick = (project: Project) => {
    onProjectSelect(project);
    // يمكنك أيضاً التوجيه إلى صفحة العروض إن رغبت:
    router.push(`/projects-explore/SingleProject?projectId=${project.id}`);
  };

  // التحقق مما إذا كان للمستخدم دور "Owner"
  // const canAddProject = user?.roles?.includes("Owner");

  return (
    <div className="bg-white rounded-md text-slate-600 flex flex-col mx-5">
      <h1 className="text-lamagreen my-3 text-center text-2xl">المشاريع</h1>
      <div className="flex flex-wrap justify-around">
        {projects && projects.length > 0 ? (
          projects.map((project: Project) => (
            <div
              key={project.id}
              className="bg-white shadow-md rounded-md mx-3 my-5 p-4 cursor-pointer"
              onClick={() => handleProjectClick(project)}
            >
              <div className="flex flex-row-reverse">
                <Image
                  src={
                    project?.owner?.personalInfo?.profileImage
                      ? `${process.env.NEXT_PUBLIC_API_URL_UPLOADS}/${project?.owner?.personalInfo?.profileImage}`
                      : "/avatar.png"
                  }
                  alt={project.owner?.personalInfo?.firstName || "Avatar"}
                  width={80}
                  height={50}
                  className="mx-2 rounded-full my-2"
                />
                <div className="my-2 text-right">
                  <h1>
                    {project.owner?.personalInfo?.firstName}{" "}
                    {project.owner?.personalInfo?.lastName}
                  </h1>
                  <h2 className="text-xs text-slate-500">
                    {project?.owner?.job?.name || "غير محدد"}
                  </h2>
                  <div className="flex flex-row-reverse text-slate-400 my-1">
                    <p>{project.name}</p>
                    <p className="mx-3">
                      {new Date(project.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="my-3 text-center flex justify-around gap-4 flex-wrap">
                <div>
                  <h1 className="text-lamagreen text-xl">الوصف</h1>
                  <p className="mt-2 text-slate-500">
                    {project.description || "لا يوجد وصف"}
                  </p>
                </div>
                <div>
                  <h1 className="text-lamagreen text-xl">المهارات المطلوبة</h1>
                  <p className="mt-2 text-slate-500">
                    {project?.skills?.join(", ") || "غير محدد"}
                  </p>
                </div>
                <div>
                  <h1 className="text-lamagreen text-xl">مدة التسليم</h1>
                  <p className="mt-2 text-slate-500">
                    {project?.duration
                      ? `${project?.duration} يوم`
                      : "غير محدد"}
                  </p>
                </div>
                <div>
                  <h1 className="text-lamagreen text-xl">الحالة</h1>
                  <p className="mt-2 text-slate-500">
                    {project?.status || "غير محددة"}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">لا توجد مشاريع حالياً</p>
        )}
      </div>
    </div>
  );
};

export default ProjectExplore;
