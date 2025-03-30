import Image from "next/image";
import UserNotifications from "@/components/UserNotifications";
import UserEarn from "@/components/UserEarn";

const UserPage = () => {
  return (
      <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
        {/* left */}
        <div className="w-full xl:w-2/3 ">
          {/* top */}
          <div className=" flex flex-col lg:flex-col gap-4">
            {/* mdall cards*/}
            <div className="flex-1 flex gap-4 justify-between flex-wrap ">
              {/* card */}
              <div className="w-full bg-white p-4 rounded-md flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%] shadow-md">
                <Image
                  src="/icons8-projects-64.png"
                  alt=""
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <div className="">
                  <h1 className="text-md font-medium ">0</h1>
                  <span className="text-sm text-gray-400">مشاريع منفذة</span>
                </div>
              </div>

              {/* card */}
              <div className="w-full bg-white p-4 rounded-md flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%] shadow-md">
                <Image
                  src="/icons8-request-50.png"
                  alt=""
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <div className="">
                  <h1 className="text-md font-medium ">0</h1>
                  <span className="text-sm text-gray-400">طلبات معلقة</span>
                </div>
              </div>
              {/* card */}
              <div className="w-full bg-white p-4 rounded-md flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%] shadow-md">
                <Image
                  src="/icons8-project-64.png"
                  alt=""
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <div className="">
                  <h1 className="text-md font-medium ">0</h1>
                  <span className="text-sm text-gray-400">
                    مشاريع قيد التنفيذ
                  </span>
                </div>
              </div>
              {/* card */}
              <div className="w-full bg-white p-4 rounded-md flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%] shadow-md">
                <Image
                  src="/icons8-euro-money-50.png"
                  alt=""
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <div className="">
                  <h1 className="text-md font-medium ">0</h1>
                  <span className="text-sm text-gray-400">صافي الأرباح</span>
                </div>
              </div>

              <div className="w-full bg-white p-4 rounded-md flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%] shadow-md">
                <Image
                  src="/icons8-euro-money-50.png"
                  alt=""
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <div className="">
                  <h1 className="text-md font-medium ">0</h1>
                  <span className="text-sm text-gray-400">
                    المبلغ في الحساب
                  </span>
                </div>
              </div>

              <div className="w-full bg-white p-4 rounded-md flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%] shadow-md">
                <Image
                  src="/icons8-euro-money-50.png"
                  alt=""
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <div className="">
                  <h1 className="text-md font-medium ">0</h1>
                  <span className="text-sm text-gray-400">مبلغ قابل للسحب</span>
                </div>
              </div>
            </div>
          </div>
          <UserEarn />
        </div>
        {/* right */}
        <div className="w-full xl:w-1/3 flex flex-col gap-4">
          <div className="bg-white p-4 rounded-md shadow-md">
            <h1 className="text-xl font-semibold text-lamagreen">لمحات</h1>
            <div className="mt-4 flex gap-4 flex-wrap text-s text-slate-400 ">
              <p className="p-3 rounded-md">مبرمج واجهات أمامية</p>
              <p className="p-3 rounded-md">مصمم واجهات المستخدم</p>
              <p className="p-3 rounded-md ">مصمم هويات بصرية</p>
            </div>
          </div>
          {/* <Performance/> */}
          <UserNotifications className="shadow-md" />
        </div>
      </div>
  );
};
export default UserPage;
