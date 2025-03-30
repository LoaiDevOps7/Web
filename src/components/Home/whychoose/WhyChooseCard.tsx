import React from "react"
import Image from "next/image"
type Props={
    title:string,
    image:string,
    discription:string,
    linkText:string
}
const WhyChooseCard = ({image,title,discription,linkText}:Props) =>{
    return(
        <div>
            <Image src={image} alt={title} width={80} height={80} className="object-contain mx-auto"/>
            <h1 className="text-center text-lg mt-5 mb-5 font-semibold text-gray-800">{title}</h1>
            <p className="text-gray-600 text-center font-medium text-sm mb-7 ">{discription}</p>
            <p className="text-center font-semibold text-lamagreen hover:text-slate-600 transition-all duration-200 cursor-pointer">{linkText}&#8594;</p>
        </div>
    )
}
export default WhyChooseCard