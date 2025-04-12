"use client";

import { useContext } from "react";
import Navigation from "@/components/Navigation";
import Image from "next/image";
import { useNotifications } from "@/context/NotificationContext";
import { useProfile } from "@/context/ProfileContext";
import { useWallet } from "@/context/WalletContext";
import { UserContext } from "@/context/UserContext";
import { Bid } from "@/types/Bid";
import Link from "next/link";

const Home = () => {
  const { publicNotifications, privateNotifications } = useNotifications();
  const { profile } = useProfile();
  const { wallet } = useWallet();
  const { userProfile } = useContext(UserContext) || {};

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
      <div className="mx-3">
        <Navigation />
      </div>
      <div className="text-right m-10">
        <h2 className="text-slate-400">الصفحة الرئيسية</h2>
        <h1 className="text-gray-700 text-2xl my-2">لوحة التحكم</h1>
      </div>
      <div className=" flex flex-1 flex-col lg:flex-row-reverse gap-4">
        <div className="flex flex-col gap-5 w-[90%] mx-auto lg:w-[40%] lg:mx-10  ">
          <div className="bg-white w-full rounded-md shadow-md h-[240px]">
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
            <div className="w-[97%] mx-auto rounded-md h-[5px] bg-gray-300 mt-5"></div>
            <div className="  text-lamagreen font-bold w-[70%] lg:w-[50%] md:w-[50%] mx-auto rounded-md my-3 text-center h-[30px] text-xl ">
              <Link href="/user/profile">الذهاب للملف الشخصي</Link>
            </div>
          </div>
          <div className=" bg-white rounded-md shadow-md w-full h-[230px]">
            <h1 className="text-center  text-gray-700 text-2xl mt-5">
              رسائل واردة
            </h1>
            <p className="my-2 text-slate-400 text-center font-bold text-[40px]">
              0
            </p>
            <div className="w-[97%] mx-auto rounded-md h-[5px] bg-gray-300 mt-5"></div>
            <div className="w-[80%] mx-auto flex flex-1 justify-between my-3">
              <div className="text-center">
                <h1 className="  text-lg text-lamagreen font-bold">
                  رسائل خاصة
                </h1>
                <p className="text-[20px] text-slate-600">
                  {privateNotifications.filter((n) => !n.read).length}
                </p>
              </div>
              <div className="text-center">
                <h1 className="  text-lg text-lamagreen font-bold">
                  رسائل عامة
                </h1>
                <p className="text-[20px] text-slate-600">
                  {" "}
                  {publicNotifications.filter((n) => !n.read).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-md shadow-md w-full h-[155px] items-center flex">
            <div className="flex flex-1 justify-around w-[90%] mx-auto ">
              <Image
                src="/dollar.png"
                alt="ss"
                width={1000}
                height={1000}
                className="w-[90px] h-[90px]"
              />
              <p className="text-center m-3">
                نود إعلامكن بأنا قد قمنا بتخفيض عمولة المنصة إلى نسبة 10% وذلك
                بمناسبة افتتاح منصة مبدع
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 w-[90%] mx-auto lg:w-[60%] lg:ml-10  ">
          <div className="bg-white rounded-md shadow-md w-full h-[250px] ">
            <div className="w-[90%]  flex flex-1 justify-between mx-auto">
              <div className="my-9 text-center">
                <h1 className="text-gray-700 text-2xl">الرصيد المتاح</h1>
                <p className="mt-2 text-slate-500 text-[25px]">
                  {wallet?.availableBalance || 0}$
                </p>
              </div>
              <div className="my-9 text-center">
                <h1 className="text-gray-700 text-2xl">الرصيد الكلي</h1>
                <p className="mt-2 text-slate-500 text-[25px]">
                  {" "}
                  {wallet?.balance || 0}$
                </p>
              </div>
            </div>
            <div className="w-[97%] mx-auto rounded-md h-[5px] bg-gray-300 "></div>
            <p className="text-center text-lamagreen font-bold text-xl mt-3 mb-3">
              لا يمكن سحب كامل الرصيد حيث يتم التحفظ على نسبة من المال{" "}
            </p>
          </div>
          <div className="bg-white rounded-md shadow-md w-full h-full lg:h-[400px] mb-3">
            <div className="flex flex-1 flex-col lg:justify-between lg:flex-row-reverse gap-4 lg:gap-8 w-[95%] mx-auto">
              <div className="text-center mt-14 lg:my-auto w-[95%] sm:w-[40%] mx-auto h-[150px]">
                <h1 className="text-gray-700 text-2xl">العروض المتاحة لليوم</h1>
                <p className="my-2 text-slate-400 text-center font-bold text-[40px]">
                  {userProfile?.remainingBids || 0}
                </p>
                <p className="text-lamagreen font-bold">
                  هذه العروض تتجدد بشكل يومي
                </p>
              </div>
              <div className="flex flex-1 justify-between gap-2 flex-wrap mt-10 mb-5 lg:mb-0 lg:w-[50%] w-[95%] ">
                <div className="bg-white shadow-md rounded-md text-center lg:w-[40%] md-[47%] w-[95%] h-[95px] mx-auto lg:mx-0 ">
                  <p className="my-2 text-slate-400 text-center text-3xl font-bold">
                    {userProfile?.remainingBids || 0}
                  </p>
                  <h1 className="">العروض المتاحة</h1>
                </div>

                <div className="bg-white shadow-md rounded-md text-center lg:w-[40%] md-[47%] w-[95%] h-[95px] mx-auto lg:mx-0 ">
                  <p className="my-2 text-slate-400 text-center text-3xl font-bold">
                    0
                  </p>
                  <h1 className="">عروض إضافية</h1>
                </div>

                <div className="bg-white shadow-md rounded-md text-center lg:w-[40%] md-[47%] w-[95%] h-[95px] mx-auto lg:mx-0 ">
                  <p className="my-2 text-slate-400 text-center text-3xl font-bold">
                    {pendingBids}
                  </p>
                  <h1 className=""> بانتظار الرد</h1>
                </div>

                <div className="bg-white shadow-md rounded-md text-center lg:w-[40%] md-[47%] w-[95%] h-[95px] mx-auto lg:mx-0 ">
                  <p className="my-2 text-slate-400 text-center text-3xl font-bold">
                    {activeBids}
                  </p>
                  <h1 className="">قيد التنفيذ</h1>
                </div>

                <div className="bg-white shadow-md rounded-md text-center lg:w-[40%] md-[47%] w-[95%] h-[95px] mx-auto lg:mx-0 ">
                  <p className="my-2 text-slate-400 text-center text-3xl font-bold">
                    {acceptedBids}
                  </p>
                  <h1 className="">مكتملة</h1>
                </div>

                <div className="bg-white shadow-md rounded-md text-center lg:w-[40%] md-[47%] w-[95%] h-[95px] mx-auto lg:mx-0 ">
                  <p className="my-2 text-slate-400 text-center text-3xl font-bold">
                    {rejectedBids}
                  </p>
                  <h1 className="text-red-500">مرفوضة</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
