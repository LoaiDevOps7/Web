import Link from "next/link";
import React from "react";
import Image from "next/image";
const navlinks = [
    {
        id:1,
        url:'#Hero',
        label:"الصفحة الرئيسية"
    },
    {
        id:2,
        url:'#About',
        label:"من نحن"
    },
    {
        id:3,
        url:'#Why',
        label:"ميزاتنا"
    },
    {
        id:4,
        url:'#Ana',
        label:"لوحة التحكم"
    },
    {
        id:5,
        url:'#Field',
        label:"مجالاتنا"
    },
    {
        id:6,
        url:'#Package',
        label:"الباقات"
    },
]

type Props ={
    showNav:boolean,
    closeNav:()=>void;
}
const MobNav =({closeNav,showNav}:Props)=>{
    const navOpen = showNav?'translate-x-0':'translate-x-[-100%]';
    return(
        <div>
            {/* over lay */}
            <div className={`fixed ${navOpen} inset-0 transform transition-all duration-500 z-[10000] bg-black opacity-70 w-full h-screen`}></div>
            {/* navlinks */}
            <div className={`text-white  ${navOpen} fixed justify-center flex flex-col h-full transform transition-all duration-500 delay-300 w-[80%]           sm:w-[60%] bg-lamagreen space-y-6 z-[10006]`}>
                      {navlinks.map((link)=>{
                        return <Link href={link.url} key={link.id}>
                            <p className="nav__link text-white text-[20px] ml-12 border-b-[1.5px] pb-1 border-white sm:text-[30px] ">{link.label}</p>
                        </Link>
                        
                    })}
            {/* close icon */}
            <Image src="/icons8-close-30.png" onClick={closeNav} alt="" width={24} height={24} className="absolute top-[0.7rem] right-[1.4rem] sm:w-8 sm:h-8 w-6 h-6"/>
            </div>
           
        </div>
    )
}
export default MobNav