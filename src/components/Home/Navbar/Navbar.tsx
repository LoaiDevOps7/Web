"use client"
import { keys } from "@mui/system";
import { link } from "fs";
import React, { useEffect, useState } from "react";
import Link from "next/link";  
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
    openNav:()=>void
}
const Nav =({openNav}:Props)=>{
    const[navBg,setNavBg]=useState(false);
    useEffect(()=>{
        const handler = () =>{
            if(window.scrollY>=90) setNavBg(true)
            if(window.scrollY<90) setNavBg(false)
        };
        window.addEventListener('scroll',handler);
        return()=>{
            window.removeEventListener('scroll',handler);

        }
    },[])
    return(
        <div className={` fixed ${navBg ? 'bg-white shadow-md':"fixed"} w-full transition-all duration-200 h-[12vh] z-[1000]`}>
            <div className="flex items-center h-full justify-between w-[90%] xl:w-[80%] mx-auto">
                {/* logo */}
                <h1 className="text-xl md:text-3xl lg:text-3xl font-bold text-lamagreen">مبدع</h1>
                {/* nav */}
                <div className="hidden lg:flex  items-center space-x-10">
                    {navlinks.map((link)=>{
                        return <Link href={link.url} key={link.id}>
                            <p className="nav__link">{link.label}</p>
                        </Link>
                        
                    })}
                </div>
                {/* buttons */}
                <div className="flex items-center space-x-4">
                    <Link href={"/home"} className="md:px-8 md:py-2.5 px-6 py-2 text-white font-semibold text-base bg-lamagreen transition-all duration-200 rounded-full">إنضم إلينا</Link>
                    {/* burger menu */}
                    <Image src="/icons8-menu-24.png" onClick={openNav} alt="" width={30} height={30} className="w-8 h-8 cursor-pointer lg:hidden"/>
                </div>
            </div>
        </div>
    )
}
export default Nav