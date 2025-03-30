import Link from "next/link";
import Image from "next/image";
const menuItems = [
  {
    title: "القائمة الرئيسية",
    items: [
      {
        icon: "/home.png",
        label: "الصفحة الرئيسية",
        href: "/home",
      },
      {
        icon: "/icons8-rating-50.png",
        label: "التقييمات",
        href: "/user/rates",
      },
      {
        icon: "/icons8-subscribe-50.png",
        label: "الاشتراكات",
        href: "/user/subscribtions",
      },
      {
        icon: "/icons8-wallet-50.png",
        label: "المحفظة",
        href: "/user/wallet",
      },
      {
        icon: "/icons8-wallet-50.png",
        label: "الإدارة المالية",
        href: "/user/payments",
      },
      {
        icon: "/icons8-messages-50 (2).png",
        label: "المراسلة",
        href: "/user/chat",
      },

      {
        icon: "/icons8-offers-50.png",
        label: "العروض",
        href: "/user/offers",
      },

      {
        icon: "/icons8-project-64.png",
        label: "المشاريع",
        href: "/user/projects",
      },
    ],
  },
  {
    title: "الإعدادات الجانبية",
    items: [
      {
        icon: "/profile.png",
        label: "الملف الشحصي",
        href: "/user/profile",
      },
      {
        icon: "/setting.png",
        label: "الإعدادات",
        href: "#",
      },
      {
        icon: "/logout.png",
        label: "تسجيل الخروج",
        href: "#",
      },
    ],
  },
];
const UserMenu = () =>{
  return(
    <div className="mt-4 text-sm ">
        {menuItems.map((i)=>(
         <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-600 font-light my-4">{i.title}</span>
          {i.items.map((item)=>(
            
            <Link href={item.href} key={item.label} className="flex items-center justify-center lg:justify-start gap-4 md:px-2 text-gray-500 py-2 rounded-md hover:bg-lamagreen">
            <Image src={item.icon} alt="" width={20} height={20}/>
            <span className="hidden lg:block">{item.label}</span>
            </Link>
            
          ))}
         </div> 
        ))}
    </div>
  )
}
export default UserMenu