"use client";

import { useState, useContext, AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { updateKycPersonalInfo } from "@/api/kyc";
import { ProfileContext } from "@/context/ProfileContext";
import { UserContext } from "@/context/UserContext";

const SkillsSection = () => {
  const { userProfile, setUserProfile } = useContext(ProfileContext) || {};
  const [selectedSkill, setSelectedSkill] = useState("");
  const { user } = useContext(UserContext) || {};

  const handleAddSkill = async () => {
    if (!user) return;
    if (!selectedSkill) return;
    // نقوم بتجميع المهارات الجديدة مع الموجودة (يفترض أن userProfile.skills هو مصفوفة من السلاسل النصية)
    const newSkills = userProfile?.skills
      ? [...userProfile.skills, selectedSkill]
      : [selectedSkill];

    try {
      // استدعاء API لتحديث الملف الشخصي مع حقل المهارات فقط
      const updatedProfile = await updateKycPersonalInfo(user.sub, { skills: newSkills });
      setUserProfile(updatedProfile);
      setSelectedSkill("");
    } catch (error) {
      console.error("Failed to update skills", error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-md shadow">
      <h1 className="text-xl font-semibold text-center text-lamagreen">
        المهارات
      </h1>
      <div className="flex flex-1 justify-between">
        <Select onValueChange={(value) => setSelectedSkill(value)}>
          <SelectTrigger className="bg-gray-100 w-64 m-4 flex items-center rounded-2xl">
            <SelectValue
              placeholder="اختر مهارة لإضافتها"
              className="text-right"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="JavaScript">JavaScript</SelectItem>
              <SelectItem value="ReactJs">ReactJs</SelectItem>
              <SelectItem value="NextJs">NextJs</SelectItem>
              <SelectItem value="Figma">Figma</SelectItem>
              <SelectItem value="Wordpress">Wordpress</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          className="bg-lamagreen text-slate-100 m-4"
          onClick={handleAddSkill}
        >
          إضافة المهارة
        </Button>
      </div>
      <div className="mt-4 flex gap-4 flex-wrap text-xs">
        {userProfile?.skills && userProfile.skills.length > 0 ? (
          userProfile.skills.map((skill: string, index: number) => (
            <Link
              key={index}
              href="/"
              className="p-3 rounded-md text-lamathirthblue bg-slate-200 shadow"
            >
              {skill}
            </Link>
          ))
        ) : (
          <p className="text-gray-500">لا توجد مهارات مضافة</p>
        )}
      </div>
    </div>
  );
};

export default SkillsSection;
