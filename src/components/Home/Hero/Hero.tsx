import Image from "next/image";
import React from "react";
const Hero =()=>{
    return(
        <div className="w-full pt-[4vh] md:pt-[12vh] h-screen  ">
            <div className="flex justify-center flex-col w-[90%] sm:w-[80%] h-full mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
                    {/* content */}
                    <div className="text-right ">
                        {/* top box */}
                        <div className="flex flex-row-reverse">
                            
                        <div className="w-fit py-1.5 px-2 md:px-5 rounded-full  shadow-md flex flex-row-reverse items-center space-x-5 ">
                            <button className="px-3 py-1 md:px-5 md:py-1 rounded-full bg-lamagreen md:text-base sm:text-sm text-white ">عرض</button>
                            <p className="text-xs sm:text-sm px-2"> للإطلاع على شروط و قوانين استخدام منصة مبدع</p>
                        </div>

                        </div>
                        {/* header */}
                        <h1 className="text-2xl text-slate-700 sm:text-3xl md:text-3xl mt-6 mb-6 font-bold md:leading-[2rem] lg:leading-[3rem]">أهلا بكم في منصة <span className="text-lamagreen">مبدع</span> حيث يجتمع<br/> التطور و الإبداع في مكان واحد</h1>
                        {/* description */}
                        <p className="text-gray-700 text-xl ">منصة مبدع للعمل الحر هي من أول منصات العمل الحر في سوريا و التي ستكون الوسيط بين المختصين بمجالات عديدة و أصحاب المشاريع يسعدنا إنضمامكم إلى عائلة المبدعين </p>
                        {/* social media */}
                        <div className="flex flex-row-reverse mt-8 mb-8 items-center space-x-4">

                            <Image src="/icons8-facebook-50 (1).png" alt="" width={50} height={50} className="mم-5"/>
                            <Image src="/icons8-instagram-logo-48.png" alt="" width={50} height={50}/>
                            
                        </div>
                    </div>
                    {/* image content */}
                    <div className="hidden lg:block">
                        <Image src="/images/hero.png" alt="" width={700} height={700} className=""/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Hero