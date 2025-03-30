import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import UserMenu from "@/components/UserMenu";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen  flex">
      {/*LEFT*/}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%]  p-4 bg-white">
        <Link
          href="/home"
          className="flex items-center justify-center lg:justify-start gap-2"
        >
          <Image
            src="/Logo.png"
            alt=""
            width={60}
            height={60}
            className="mr-3 lg:mr-10 md:mr-10"
          />
        </Link>
        <UserMenu />
      </div>

      {/*RIGHT*/}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%]  bg-[#f7f8fa] overflow-scroll flex flex-col ">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
