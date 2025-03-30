"use client";

import { useContext, useState } from "react";
import Navigation from "@/components/Navigation";
import Image from "next/image";
import ProjectExplore from "@/components/ProjectExplore";
import { useNotifications } from "@/context/NotificationContext";
import { usePortfolio } from "@/context/PortfolioContext";
import { useRatings } from "@/context/RatingsContext";
import { useProfile } from "@/context/ProfileContext";
import { useWallet } from "@/context/WalletContext";
import { UserContext } from "@/context/UserContext";
import { Bid } from "@/types/Bid";
import Link from "next/link";
import { Project } from "@/types/Project";

const Home = () => {
  const { publicNotifications, privateNotifications } = useNotifications();
  const { profile } = useProfile();
  const { portfolio } = usePortfolio();
  const { ratings } = useRatings();
  const { wallet } = useWallet();
  const { userProfile } = useContext(UserContext) || {};
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // حساب عدد العروض بحسب الحالة إذا كانت موجودة
  const pendingBids =
    userProfile?.bids?.filter((bid: Bid) => bid.status === "pending").length ||
    0;
  const activeBids =
    userProfile?.bids?.filter((bid: Bid) => bid.status === "active").length ||
    0;
  const rejectedBids =
    userProfile?.bids?.filter((bid: Bid) => bid.status === "rejected").length ||
    0;
  const acceptedBids =
    userProfile?.bids?.filter((bid: Bid) => bid.status === "accepted").length ||
    0;

  return (
    <div className="bg-[#f7f8fa]">
      {/* navigation */}
      <Navigation />
      <div className="text-right m-10">
        <h2 className="text-slate-400">الصفحة الرئيسية</h2>
        <h1 className="text-gray-700 text-2xl my-2">لوحة التحكم</h1>
      </div>
      <div className=" flex flex-col flex-1 justify-between lg:flex-row-reverse md:flex-row-reverse ">
        {/* الانتقال للملف الشخصي */}
        <div className="bg-white shadow-md lg:w-[30%] md:w-[40%] w-[90%] mx-auto lg:mx-5 md:mx-5 rounded-md">
          <Image
            src={
              profile?.profileImage
                ? `${process.env.NEXT_PUBLIC_API_URL_UPLOADS}/${profile.profileImage}`
                : "/avatar.png"
            }
            alt="avatar"
            width={1000}
            height={1000}
            className="rounded-full mx-auto my-3 w-[80px] h-[80px] "
          />
          <h1 className=" text-center text-slate-500 text-xl">
            {profile?.firstName} {profile?.lastName}
          </h1>
          <div className="bg-lamagreen  text-slate-100 w-[70%] lg:w-[50%] md:w-[50%] mx-auto rounded-md my-3 text-center h-[30px] text-xl ">
            <Link href="/user/profile">الذهاب للملف الشخصي</Link>
          </div>
        </div>
        {/* الرصيد */}
        <div className="bg-white lg:w-[65%] md:w-[55%] w-[90%]  mx-5 rounded-md shadow-md flex flex-1 justify-around my-5 md:my-0 lg:my-0">
          <div className="flex-flex-col text-center my-auto">
            <h1 className="text-gray-500 text-2xl mb-3">
              {wallet?.balance || 0}
            </h1>
            <p className="text-lamagreen text-lg ">رصيد في الحساب</p>
          </div>
          <div className="flex-flex-col text-center my-auto">
            <h1 className="text-gray-500 text-2xl mb-3">
              {wallet?.availableBalance || 0}
            </h1>
            <p className="text-lamagreen text-lg ">رصيد قابل للسحب</p>
          </div>
        </div>
      </div>
      {/* السطر الثاني */}
      <div className="flex flex-col justify-between md:flex-row lg:flex-row ">
        {/* القسم الأول */}
        <div className="flex flex-col w-[100%] lg:w-[45%] md:w-[45%] ">
          {/* إحصائيات */}
          <div className="flex flex-col lg:flex-row md:flex-row flex-1 justify-between flex-wrap lg:h-[300px] md:h-[300px] mx-5">
            <div className="bg-white shadow-md rounded-md w-[80%] mx-auto lg:w-[40%] md:w-[40%] my-3 text-center h-[100px] lg:mx-0 md:mx-0 ">
              <p className="text-slate-500 mt-5">
                {publicNotifications.filter((n) => !n.read).length}
              </p>
              <h1 className="text-lamagreen mt-2">رسائل عامة واردة</h1>
            </div>
            <div className="bg-white shadow-md rounded-md w-[80%] mx-auto lg:w-[40%] md:w-[40%] my-3 text-center h-[100px] lg:mx-0 md:mx-0 ">
              <p className="text-slate-500 mt-5">
                {privateNotifications.filter((n) => !n.read).length}
              </p>
              <h1 className="text-lamagreen mt-2">رسائل خاصة واردة</h1>
            </div>
            <div className="bg-white shadow-md rounded-md w-[80%] mx-auto lg:w-[40%] md:w-[40%] my-3 text-center h-[100px] lg:mx-0 md:mx-0 ">
              <p className="text-slate-500 mt-5">{portfolio.length}</p>
              <h1 className="text-lamagreen mt-2">أعمال في المعرض</h1>
            </div>
            <div className="bg-white shadow-md rounded-md w-[80%] mx-auto lg:w-[40%] md:w-[40%] my-3 text-center h-[100px] lg:mx-0 md:mx-0 ">
              <p className="text-slate-500 mt-5">{ratings.length}</p>
              <h1 className="text-lamagreen mt-2">تقييمات</h1>
            </div>
          </div>
          {/* مشاريع */}
          <div className="shadow-md bg-white mx-5">
            <ProjectExplore onProjectSelect={setSelectedProject} />
            <button className="w-[70%] md:w-[50%] lg:w-[50%] items-end bg-lamagreen text-center mx-[25%] my-3 rounded-md h-[30px] text-white">
              إظهار المزيد
            </button>
          </div>
        </div>
        <div className="flex flex-col w-[90%] lg:w-[50%] md:w-[50%]  my-3 mx-5">
          {/*العرروض  */}
          <div className="bg-white rounded-md shadow-md  md:h-[600px] lg:h-[600px] ">
            <h1 className="text-lamagreen text-center text-2xl my-10">
              العروض
            </h1>

            <div className="flex flex-col justify-around md:flex-row-reverse lg:flex-row-reverse gap-4 mx-3 flex-wrap ">
              <div className="bg-white shadow-md rounded-md w-[80%] mx-auto lg:w-[40%] md:w-[40%] my-3 text-center h-[100px] lg:mx-0 md:mx-0 ">
                <p className="text-slate-500 mt-5">
                  {userProfile?.remainingBids || 0}
                </p>
                <h1 className="text-lamagreen mt-2">عروض متاحة</h1>
              </div>
              <div className="bg-white shadow-md rounded-md w-[80%] mx-auto lg:w-[40%] md:w-[40%] my-3 text-center h-[100px] lg:mx-0 md:mx-0 ">
                <p className="text-slate-500 mt-5">0</p>
                <h1 className="text-lamagreen mt-2">عروض إضافية</h1>
              </div>
              <div className="bg-white shadow-md rounded-md w-[80%] mx-auto lg:w-[40%] md:w-[40%] my-3 text-center h-[100px] lg:mx-0 md:mx-0 ">
                <p className="text-slate-500 mt-5">{pendingBids}</p>
                <h1 className="text-lamagreen mt-2">عروض بانتظار الرد</h1>
              </div>
              <div className="bg-white shadow-md rounded-md w-[80%] mx-auto lg:w-[40%] md:w-[40%] my-3 text-center h-[100px] lg:mx-0 md:mx-0 ">
                <p className="text-slate-500 mt-5">{activeBids}</p>
                <h1 className="text-lamagreen mt-2">قيد التنفيذ</h1>
              </div>
              <div className="bg-white shadow-md rounded-md w-[80%] mx-auto lg:w-[40%] md:w-[40%] my-3 text-center h-[100px] lg:mx-0 md:mx-0 ">
                <p className="text-slate-500 mt-5">{acceptedBids}</p>
                <h1 className="text-lamagreen mt-2">مكتملة</h1>
              </div>
              <div className="bg-white shadow-md rounded-md w-[80%] mx-auto lg:w-[40%] md:w-[40%] my-3 text-center h-[100px] lg:mx-0 md:mx-0 ">
                <p className="text-slate-500 mt-5">{rejectedBids}</p>
                <h1 className="text-red-500 mt-2">عروض مستبعدة</h1>
              </div>
            </div>
          </div>
          {/* تنويه */}
          {/* <div className="bg-white rounded-md mx-5 text-center h-[250px] my-3 shadow-md">
            <h1 className="text-lamagreen text-2xl my-10">تنويه من مبدع</h1>
            <p className="text-red-600 my-2 text-lg">
              نود إعلامكم أنا قد قمنا بتخفيض نسبة العمولة إلى 10% وذلك بمناسبة
              افتتاح منصة مبدع و كل عام و أنتم بخير بمناسبة حلول رمضان المبارك
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default Home;
