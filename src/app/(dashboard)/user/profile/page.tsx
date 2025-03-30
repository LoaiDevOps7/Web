"use client";

import UserGallery from "@/components/UserGallery";
import Image from "next/image";
import Performance from "@/components/Performance";
import UserNotifications from "@/components/UserNotifications";
import EditProfile from "@/components/EditProfile";
import AddGallery from "@/components/AddGallery";
import VerifyAccount from "@/components/VerifyAccount";
import { Button } from "@/components/ui/button";
import { usePortfolio } from "@/context/PortfolioContext";
import { useProfile } from "@/context/ProfileContext";
import {
  addSkillsToPersonalInfo,
  removeSkillFromPersonalInfo,
} from "@/api/kyc";
import { useContext, useState } from "react";
import SkillInput from "@/components/SkillInput";
import { changeRoleToOwner } from "@/api/user";
import { User, UserContext } from "@/context/UserContext";

const UserProfile = () => {
  const { profile, isLoading, error } = useProfile();
  const { user, setUser } = useContext(UserContext) || {};
  const { portfolio } = usePortfolio();
  const [skills, setSkills] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingRole, setIsLoadingRole] = useState(false);

  if (isLoading) return <p>جاري تحميل البيانات...</p>;
  if (error) return <p>حدث خطأ أثناء تحميل الملف الشخصي.</p>;

  // إذا لم يكن هناك ملف شخصي، يعرض زر إنشاء الملف الشخصي فقط
  if (!profile) {
    return (
      <div className="flex justify-center p-4">
        <EditProfile />
      </div>
    );
  }

  const toggleRole = async () => {
    setIsLoadingRole(true);
    try {
      // تغيير الدور إلى Owner أو Freelancer حسب الحالة الحالية
      await changeRoleToOwner(profile.user.id);

      if (setUser && user) {
        // التأكد من وجود setUser و user
        const currentRoles = user.roles || []; // استخدام بيانات المستخدم من السياق
        const newRoles = currentRoles.includes("Owner")
          ? currentRoles.filter((role) => role !== "Owner")
          : [...currentRoles, "Owner"];

        // إنشاء كائن مستخدم محدث مع جميع الخصائص المطلوبة
        const updatedUser: User = {
          ...user, // نسخ جميع خصائص المستخدم الحالية
          roles: newRoles, // تحديث الأدوار فقط
        };

        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error("فشل تحديث الدور:", error);
    } finally {
      setIsLoadingRole(false);
    }
  };

  const handleSkillsChange = (newSkills: string[]) => {
    setSkills(newSkills);
  };

  const handleSaveSkills = async () => {
    setIsSaving(true);
    try {
      await addSkillsToPersonalInfo(profile.id, skills);
      window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const removeSkill = async (skill: string) => {
    try {
      await removeSkillFromPersonalInfo(profile.id, skill);

      const newSkills = Array.isArray(profile?.job?.skills)
        ? profile?.job?.skills.filter((s) => s !== skill)
        : [];
      setSkills(newSkills); // تحديث القائمة المعروضة
      window.location.reload();
    } catch (error) {
      console.error("فشل في حذف المهارة", error);
    }
  };

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* القسم الأيسر */}
      <div className="w-full xl:w-2/3 ">
        <div className="flex flex-col lg:flex-col gap-4">
          <div className="shadow py-6 px-4 rounded-md flex gap-4 bg-white">
            <div className="w-4/5 flex flex-col justify-between gap-4 text-right">
              <h1 className="text-lg font-semibold text-slate-700">
                {profile.firstName} {profile.lastName}
              </h1>
              <p className="text-sm text-gray-600">
                {profile.description ||
                  "لم يتم إضافة نبذة تعريفية عن الملف الشخصي"}
              </p>
              <div className="flex justify-between gap-4 flex-wrap text-sm font-medium">
                <div className="w-[30%]">
                  <h1 className="text-lamagreen">:الاسم الاخير</h1>
                  <p className="text-gray-600">{profile.lastName}</p>
                </div>
                <div className="w-[30%]">
                  <h1 className="text-lamagreen">:الاسم الأول</h1>
                  <p className="text-gray-600">{profile.firstName}</p>
                </div>
                <div className="w-[30%]">
                  <h1 className="text-lamagreen">:اسم المستخدم</h1>
                  <p className="text-gray-600">{profile.username}</p>
                </div>
                <div className="w-[30%]">
                  <h1 className="text-lamagreen">:تاريخ الميلاد</h1>
                  <p className="text-gray-600">
                    {profile.dateOfBirth
                      ? new Date(profile.dateOfBirth).toLocaleDateString()
                      : ""}
                  </p>
                </div>
                <div className="w-[30%]">
                  <h1 className="text-lamagreen">:الدولة</h1>
                  <p className="text-gray-600">{profile.country}</p>
                </div>
                <div className="w-[30%]">
                  <h1 className="text-lamagreen">:المدينة</h1>
                  <p className="text-gray-600">{profile.city}</p>
                </div>
              </div>
            </div>
            <div className="relative inline-block ml-5">
              <Image
                src={
                  profile?.profileImage
                    ? `${process.env.NEXT_PUBLIC_API_URL_UPLOADS}/${profile.profileImage}`
                    : "/avatar.png"
                }
                alt="avatar"
                width={1000}
                height={1000}
                className="rounded-full object-cover w-[70px] h-[70px] "
              />
              {profile?.user?.kycVerification?.verificationStatus ===
                "approved" && (
                <div className="absolute top-12 right-0 bg-lamagreen rounded-full p-1 z-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* أزرار تعديل الملف الشخصي */}
          <div className="flex flex-1 justify-around">
            <EditProfile />
            <Button
              disabled={isLoadingRole}
              onClick={toggleRole}
              className="bg-lamagreen text-slate-100"
            >
              {profile.user.roles?.includes("Owner")
                ? "التحويل إلى Freelancer"
                : "التحويل إلى Owner"}
            </Button>
            {profile.user.kycVerification?.verificationStatus !== "pending" &&
              profile.user.kycVerification?.verificationStatus !==
                "approved" && <VerifyAccount />}
          </div>

          {/* باقي الكود - البطاقات الصغيرة */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            <div className="w-full bg-white p-4 rounded-md flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%] shadow">
              <Image
                src="/singleAttendance.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div>
                <h1 className="text-lg font-semibold">90%</h1>
                <span className="text-sm text-gray-400">
                  خطوات توثيق الحساب
                </span>
              </div>
            </div>
            <div className="w-full bg-white p-4 rounded-md flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%] shadow">
              <Image
                src="/singleAttendance.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div>
                <h1 className="text-lg font-semibold">{portfolio.length}</h1>
                <span className="text-sm text-gray-400">أعمال في المعرض</span>
              </div>
            </div>
            <div className="w-full bg-white p-4 rounded-md flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%] shadow">
              <Image
                src="/singleAttendance.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div>
                <h1 className="text-lg font-semibold">
                  {profile?.job?.skills.length || 0}
                </h1>
                <span className="text-sm text-gray-400">مهارات</span>
              </div>
            </div>
            <div className="w-full bg-white p-4 rounded-md flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%] shadow">
              <Image
                src="/singleAttendance.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div>
                <h1 className="text-lg font-semibold">
                  {profile.user.ratingsReceived || 0}
                </h1>
                <span className="text-sm text-gray-400">تقييمات</span>
              </div>
            </div>
          </div>
        </div>

        {/* قسم معرض الأعمال */}
        <div className="mt-4 bg-white rounded-md p-4 h-[500px] flex flex-col overflow-y-scroll shadow">
          <div className="text-center">
            <div className="text-right my-3">
              <AddGallery />
            </div>
            <h1 className="text-xl text-lamagreen">معرض الأعمال</h1>
            <p className="text-lg text-slate-500 my-3">
              ...نماذج من أعمالك يستطيع العملاء مشاهدتها
            </p>
          </div>
          <div>
            <UserGallery />
          </div>
        </div>
      </div>

      {/* القسم الأيمن */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md shadow">
          <h1 className="text-xl font-semibold text-center text-lamagreen">
            المهارات
          </h1>
          <div className="flex flex-1 justify-between">
            <SkillInput onChange={handleSkillsChange} initialSkills={skills} />
            <Button
              onClick={handleSaveSkills}
              disabled={isSaving}
              className="mt-4 bg-lamagreen text-white py-2 px-4 rounded"
            >
              {isSaving ? "جاري الحفظ..." : "حفظ المهارات"}
            </Button>
          </div>
          <div className="mt-4 flex gap-4 flex-wrap text-xs">
            {Array.isArray(profile?.job?.skills) &&
            profile?.job?.skills.length > 0 ? (
              profile?.job?.skills.map((skill, index) => (
                <p key={index} className="p-3 rounded-md bg-slate-200 shadow">
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="ml-2 text-red-600"
                  >
                    ×
                  </button>
                </p>
              ))
            ) : (
              <p className="text-gray-500">لا توجد مهارات مضافة بعد.</p>
            )}
          </div>
        </div>
        <Performance />
        <UserNotifications />
      </div>
    </div>
  );
};

export default UserProfile;
