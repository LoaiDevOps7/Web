"use client";

import Image from "next/image";
import NotificationButton from "./NotificationButton";
import GlobalNotificationsButton from "./GlobalNotificationsButton";
import { useContext, useEffect, useState } from "react";
import { Profile } from "@/types/Profile";
import { UserContext } from "@/context/UserContext";
import { getKycPersonalInfo } from "@/api/kyc";
import Indicator from "./Indicator";

const Navbar = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const { user } = useContext(UserContext) || {};

  // جلب بيانات الملف الشخصي من الخادم
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      const data = await getKycPersonalInfo(user.sub);
      setProfile(data);
    };
    fetchData();
  }, [user]);

  return (
    <div className="flex items-center justify-between p-4">
      {/* SearchBar */}
      <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
        <Image src="/search.png" alt="Search" width={14} height={14} />
        <input
          type="text"
          placeholder="Search...."
          className="w-[200px] p-2 bg-transparent outline-none"
        />
      </div>
      {/* Icons and User */}
      <div className=" flex items-center gap-6 justify-end w-full">
        <NotificationButton />
        <div className="">
          <GlobalNotificationsButton />
        </div>
        <div className="flex flex-col ">
          <span className="text-xs leading-3 font-medium">
            {profile?.firstName} {profile?.lastName}
          </span>
          {/* The role of the log-in */}
          <span className="text-[10px] text-gray-500  text-right ">
            {user?.roles?.join(" ")}
          </span>
        </div>
        {/* the image of the person */}
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
            className="rounded-full object-cover w-[36px] h-[36px] "
          />
          <Indicator />
          {profile?.user?.kycVerification?.verificationStatus ===
            "verified" && (
            <div className="absolute top-6 right-0 bg-lamagreen rounded-full p-1 z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-2 w-2 text-white"
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
    </div>
  );
};
export default Navbar;
