import React from "react";
import Image from "next/image";
const AnalyitcsFeautures=() =>{
    return(
        <div className="pt-24 pb-16 bg-white text-right">
            {/* define grid */}
            <div className="w-[95%] sm:w-[80%] mx-auto items-center grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Image */}
                <div>
                    <Image src="/images/a.jpg" alt="image" width={500} height={500} className="object-contain"/>

                </div>
                {/* content */}
                <div className="p-6">
                    <h1 className=" text-lg font-semibold text-lamagreen ">لوحة التحكم الاحترافية للمستخدمين</h1>
                    <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold text-gray-600">
                        منصة مبدع تزود كل مستخدم بلوحة تحكم تفاعلية تزوده بإحصائياته الهامة و تمنحه تحكم كامل على حسابه
                    </h1>
                    <ul className="mt-7 space-y-2 text-gray-500">
                        <li className="flex flex-row-reverse items-center font-semibold">
                            <Image src="/icons8-checked-50.png" alt="" width={25} height={25} className="ml-2"/>
                            إحصائيات دقيقة بشكل دوري
                        </li>
                        <li className="flex flex-row-reverse items-center font-semibold">
                            <Image src="/icons8-checked-50.png" alt="" width={25} height={25} className="ml-2"/>
                           تحكم و إحصائيات دقيقة عن العمليات المالية
                        </li>
                        <li className="flex flex-row-reverse items-center font-semibold">
                            <Image src="/icons8-checked-50.png" alt="" width={25} height={25} className="ml-2"/>
                            إحصائيات دقيقة عن الرصيد في المنصة و الأرباح
                        </li>
                        <li className="flex flex-row-reverse items-center font-semibold">
                            <Image src="/icons8-checked-50.png" alt="" width={25} height={25} className="ml-2"/>
                            دردشة تفاعلية مع المستخدمين
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    )
}
export default AnalyitcsFeautures