import Image from "next/image";
import Link from "next/link";

const Navigation = () => {
  return (
    <div className=" flex flex-row-reverse w-full mt-5 mr-20">
      <Image
        src="/logo.png"
        alt=""
        width={80}
        height={80}
        className="mr-3 lg:mr-10 md:mr-10"
      />
      <div className="bg-lamagreen w-[80%] lg:w-[40%] md:w-[40%] flex mx-auto rounded-lg flex-row-reverse items-center justify-around text-white text-xl ">
        <Link href="/home">الصفحة الرئيسية</Link>
        <Link href="/projects-explore"> تصفح المشاريع</Link>
        <Link href="/user"> لوحة التحكم الاحترافية</Link>
      </div>
    </div>
  );
};
export default Navigation;
