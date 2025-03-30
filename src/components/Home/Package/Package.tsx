import React from "react";
import PackageCard from "./PackageCard";
const Package= ()=>{
    return(
        <div className="pt-16 pb-16 bg-white">
            <h2 className="text-slate-700 mt-6 text-2xl md:text-3xl font-bold text-center">استعن بالباقات للوصول إلى ميزات إضافية</h2>
            <div className="w-[90%] md:w-[80%] mt-20 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 ">
                <div>
                    <PackageCard price={0} plan="الباقة المجانية"/>
                </div>
                <div>
                    <PackageCard price={6} plan="الباقة الذهبية"/>
                </div>
            </div>
        </div>
    )
}
export default Package