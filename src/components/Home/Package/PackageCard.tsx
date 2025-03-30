import React from "react";
import Image from "next/image";
import { number } from "zod";
type Props={
    price:number,
    plan:string
}
const PackageCard=({plan,price}:Props)=>{
    return(
        <div className="bg-white p-12 rounded-lg shadow-lg">
            <p className="mt-8 text-xl font-semibold text-lamagreen text-center">{plan}</p>
            <div className="font-medium text-3xl mt-4 text-center">
                $<span className="text-5xl font-bold ">{price}</span>/mo
            </div>
            <p className="mt-2 text-gray-600 text-center ">سيكون المستخدم قادر على</p>
            <div className="mt-10 ">
                <div className="text-center mb-4 flex flex-row-reverse items-center space-x-3">
                    <div className="text-center w-8 h-8 bg-gray-300 rounded-full justify-center flex  items-center flex-col mx-3">
                        <Image src="/icons8-checked-50.png" alt="" width={25} height={25} className=""/>
                    </div>
                    <p className="text-sm  font-semibold text-gray-500 m "> التحكم بحسابه على المنصة </p>
                </div>
                <div className="text-center mb-4 flex flex-row-reverse items-center space-x-3">
                    <div className="text-center w-8 h-8 bg-gray-300 rounded-full justify-center flex  items-center flex-col mx-3">
                        <Image src="/icons8-checked-50.png" alt="" width={25} height={25} className=""/>
                    </div>
                    <p className="text-sm  font-semibold text-gray-500 m ">الوصول إلى إحصائيات عن حسابه </p>
                </div>
                <div className="text-center mb-4 flex flex-row-reverse items-center space-x-3">
                    <div className="text-center w-8 h-8 bg-gray-300 rounded-full justify-center flex  items-center flex-col mx-3">
                        <Image src="/icons8-checked-50.png" alt="" width={25} height={25} className=""/>
                    </div>
                    <p className="text-sm  font-semibold text-gray-500 m ">تقديم العروض على المشاريع بمقدار خمسة عشر عرضآ في اليوم </p>
                </div>
                <div className="text-center mb-4 flex flex-row-reverse items-center space-x-3">
                    <div className="text-center w-8 h-8 bg-gray-300 rounded-full justify-center flex  items-center flex-col mx-3">
                        <Image src="/icons8-checked-50.png" alt="" width={25} height={25} className=""/>
                    </div>
                    <p className="text-sm  font-semibold text-gray-500 m ">طرح المشاريع لإيجاد فريلانسرز ينفذوها </p>
                </div>
                <div className="mt-8 ">
                    <button className="block w-full p-4 text-base md:text-lg  text-white font-bold hover:bg-green-400 transition-all duration-300 bg-lamagreen rounded-md">إنضمام الآن</button>
                </div>
            </div>
        </div>
    )
}
export default PackageCard