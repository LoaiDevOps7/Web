import React from "react";
import Image from "next/image";
const About=() =>{
    return(
        <div className="pt-24 pb-16 bg-white text-right">
            {/* define grid */}
            <div className="w-[95%] sm:w-[80%] mx-auto items-center grid grid-cols-1 lg:grid-cols-2 gap-20">
                
                {/* content */}
                <div className="p-6 mr-10">
                    <h1 className=" text-3xl font-semibold text-lamagreen ">ما هي منصة مبدع</h1>
                    <h1 className="mt-4 text-lg sm:text-xl md:text-2xl font-bold text-gray-600">
                      منصة مبدع هي أول منصات العمل الحر و المباشر في سوريا و هي  مساحة رقمية تهدف إلى ربط العاملين المستقلين الفريلانسرز مع العملاء الذين يحتاجون إلى خدماتهم في مجالات متنوعة مثل البرمجة، التصميم، التسويق، الكتابة، والترجمة. تُسهِّل هذه المنصات إيجاد فرص عمل مؤقتة أو مشاريع قصيرة المدى عبر الإنترنت، مع توفير أدوات لإدارة المهام، التواصل الآمن، وتنفيذ الدفع الإلكتروني بكفاءة 
</h1>
                </div>
                {/* Image */}
                <div className="flex flex-row-reverse ">
                    <Image src="/logo.png" alt="image" width={400} height={400} className="object-contain"/>

                </div>
            </div>
        </div>
    )
}
export default About