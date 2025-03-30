"use client";

import Image from "next/image";
import { Share_Tech_Mono } from "next/font/google";
import WalletList from "@/components/WalletList";
import { useWallet } from "@/context/WalletContext";

// const shareTechMono = Share_Tech_Mono({
//   weight: "400",
//   subsets: ["latin"],
// });

const UserWallet = () => {
  // const { wallet, isLoading, error } = useWallet();

  // if (isLoading) return <p>جاري تحميل بيانات المحفظة...</p>;
  // if (error) return <p>حدث خطأ أثناء تحميل بيانات المحفظة.</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      ...قريبا
      {/* <div
        className={`${shareTechMono.className} mx-auto lg:w-[500px] md:w-[80%] h-[270px] bg-gradient-to-tr rounded-2xl flex content-center items-center justify-center from-lamagreen to-lamaseconderyblue my-10 `}
      >
        <div className="p-8 md:w-[80%] h-full">
          <div className="relative w-full h-full">
            <Image
              className="absolute"
              alt=""
              src="/mastercard.svg"
              width={70}
              height={24}
            />
            <Image
              className="absolute right-0 bottom-0 top-0 my-auto"
              alt=""
              src="/chip.svg"
              width={40}
              height={30}
            />
            <div className="flex flex-col w-full h-full justify-end gap-4">
              <p className="text-xm">{wallet?.id}</p>
              <div className="flex gap-28">
                <p className="text-lg uppercase">{wallet?.user.email}</p>
                <p className="text-lg uppercase">
                  {wallet?.createdAt &&
                    (() => {
                      const date = new Date(wallet.createdAt);
                      const year = date.getFullYear().toString().slice(-2);
                      const month = date.getMonth() + 1; // لإضافة 1 لأن الشهور تبدأ من 0
                      return (
                        <p className="text-lg uppercase">
                          {month}/{year}
                        </p>
                      );
                    })()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex-col flex gap-4 justify-between flex-wrap content-center mb-10 ">
        <div className="w-full bg-white p-4 rounded-md flex gap-4 md:w-[80%] xl:w-[500px] 2xl:w-[500px] shadow-md">
          <Image
            src="/icons8-euro-money-50.png"
            alt=""
            width={24}
            height={24}
            className="w-6 h-6"
          />
          <div className="">
            <h1 className="text-md font-medium ">{wallet?.balance}</h1>
            <span className="text-sm text-gray-400">المبلغ في الحساب</span>
          </div>
        </div>
        <div className="w-full bg-white p-4 rounded-md flex gap-4 md:w-[80%] xl:w-[500px] 2xl:w-[500px] shadow-md">
          <Image
            src="/icons8-euro-money-50.png"
            alt=""
            width={24}
            height={24}
            className="w-6 h-6"
          />
          <div className="">
            <h1 className="text-md font-medium ">{wallet?.availableBalance}</h1>
            <span className="text-sm text-gray-400">صافي الأرباح</span>
          </div>
        </div>
      </div>

      <WalletList /> */}
    </div>
  );
};
export default UserWallet;
