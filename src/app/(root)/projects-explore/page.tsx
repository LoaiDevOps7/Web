"use client";

import Navigation from "@/components/Navigation";
import ProjectExplore from "@/components/ProjectExplore";
import { Project } from "@/types/Project";
import { useState } from "react";

const ProjectsExplore = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="bg-[#f7f8fa]">
      {/* nav */}
      <Navigation />
      <div className="mx-auto  flex flex-1 justify-around flex-col  md:flex-row-reverse lg:flex-row-reverse ">
        <div className=" w-[90%] lg:w-[25%] flex flex-col flex-wrap my-20 text-right  mx-3">
          <h1 className="text-2xl text-slate-600 font-bold mb-5">
            تصفح المشاريع
          </h1>
          <div className=" mx-10">
            <h1 className="text-xl text-lamagreen ">: المجالات المقترحة</h1>
            <div>
              <ul>
                <li className="text-xl lg:text-lg text-slate-600 mb-1.5">
                  <a href="">برمجة و تطوير الويب و التطبيقات </a>
                </li>
                <li className="text-xl lg:text-lg text-slate-600 mb-1.5">
                  <a href="">تطوير الألعاب </a>
                </li>
                <li className="text-xl lg:text-lg text-slate-600 mb-1.5">
                  <a href="">أمن المعلومات </a>
                </li>
                <li className="text-xl lg:text-lg text-slate-600 mb-1.5">
                  <a href="">الذكاء الاصطناعي </a>
                </li>
                <li className="text-xl lg:text-lg text-slate-600 mb-1.5">
                  <a href="">قواعد البيانات </a>
                </li>
                <li className="text-xl lg:text-lg text-slate-600 mb-1.5">
                  <a href=""> التصميم الجرافيكي و الصور</a>
                </li>
                <li className="text-xl lg:text-lg text-slate-600 mb-1.5">
                  <a href="">تصميم واجهات المستخدم </a>
                </li>
                <li className="text-xl lg:text-lg text-slate-600 mb-1.5">
                  <a href="">الرسوم المتحركة</a>
                </li>
                <li className="text-xl lg:text-lg text-slate-600 mb-1.5">
                  <a href="">كتابة المحتوى </a>
                </li>
                <li className="text-xl lg:text-lg text-slate-600 mb-1.5">
                  <a href="">الترجمة اللغوية </a>
                </li>
                <li className="text-xl lg:text-lg text-slate-600 mb-1.5">
                  <a href="">التدقيق اللغوي </a>
                </li>
                <li className="text-xl lg:text-lg text-slate-600 mb-1.5">
                  <a href="">التسويق الرقمي </a>
                </li>
                <li className="text-xl lg:text-lg text-slate-600 mb-1.5">
                  <a href="">الأعمال الإدارية و الدعم </a>
                </li>
                <li className="text-xl lg:text-lg text-slate-600 mb-1.5">
                  <a href="">الأعمال التجارية و الإستشارات</a>
                </li>
                <li className="text-xl lg:text-lg text-slate-600 mb-1.5">
                  <a href="">الصوتيات و الفيديو </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-white rounded-md shadow-md text-center h-[200px] mt-3">
            <h1 className="text-xl text-red-500 my-3 text-center">
              تنويه من منصة مبدع
            </h1>
            <p className="my-2 mx-3 text-lg text-slate-700">
              هنا يظهر أحدث المشاريع المعروضة بمجالات متنوعة للوصول إلى مشاريع
              باختصاصات معينة عليك باستخدام الفلتر في الأعلى لتعرض لك المنصة
              المشاريع ذات الصلة بالاختصاص الذي اخترته
            </p>
          </div>
        </div>
        <div className="w-[90%] lg:w-[70%] my-20  mx-auto md:mx-5 lg:mx-5 rounded-md h-[800px] overflow-y-scroll  bg-white shadow-md">
          <ProjectExplore onProjectSelect={setSelectedProject} />
        </div>
      </div>
    </div>
  );
};
export default ProjectsExplore;
