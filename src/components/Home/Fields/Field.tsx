import Image from "next/image"
import React from "react"
const Field=()=>{
    const Fields = [
        {
            icon:<Image src="/icons8-program-50.png" alt="" width={25} height={25} className="text-lamaseconderyblue "/>,
            text:"البرمجة و التطوير",
        },
        
        {
            icon:<Image src="/icons8-design-50.png" alt="" width={25} height={25} className="text-lamaseconderyblue "/>,
            text:"التصميم و الفنوان الإبداعية",
        },
        
        {
            icon:<Image src="/icons8-data-security-64.png" alt="" width={25} height={25} className="text-lamaseconderyblue "/>,
            text:"أمن المعلومات",
        },
        
        {
            icon:<Image src="/icons8-writer-50.png" alt="" width={25} height={25} className="text-lamaseconderyblue "/>,
            text:"الكتابة و الترجمة",
        },
        
        {
            icon:<Image src="/icons8-marketing-40.png" alt="" width={25} height={25} className="text-lamaseconderyblue "/>,
            text:"التسويق الرقمي",
        },
        
        {
            icon:<Image src="/icons8-manager-50.png" alt="" width={25} height={25} className="text-lamaseconderyblue "/>,
            text:"الأعمال الإدارية و الدعم",
        },
        
        {
            icon:<Image src="/icons8-commerce-40.png" alt="" width={25} height={25} className="text-lamaseconderyblue "/>,
            text:"الأعمال التجارية و الإستشارات",
        },
        
        {
            icon:<Image src="/icons8-engineer-50.png" alt="" width={25} height={25} className="text-lamaseconderyblue "/>,
            text:"الهندسة و العمارة",
        },
        
        {
            icon:<Image src="/icons8-video-montage-50.png" alt="" width={25} height={25} className="text-lamaseconderyblue "/>,
            text:"الصوتيات و الفيديو",
        },
    ]
    return(
        <div className=" pt-20 pb-20">
            <div className="w-[80%] mx-auto text-center">
                <h1 className="mt-6 text-2xl md:text-3xl font-bold text-center text-slate-700  ">المجالات التي تدعمها منصة مبدع</h1>
                <div className="grid mt-16 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Fields.map((Fields,index)=>
                    <div key={index} className="flex items-center justify-center p-4 bg-white rounded-lg shadow-md space-x-3">
                        <div className="text-3xl w-14 h-14 bg-gray-800 bg-opacity-10 flex items-center justify-center flex-col rounded-full">
                            <span>{Fields.icon}</span>
                        </div>
                        <span className="font-semibold">{Fields.text}</span>
                    </div>
                    )}
                </div>
            </div>

        </div>
    )
}
export default Field