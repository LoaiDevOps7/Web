import React from "react";
import WhyChooseCard from "./WhyChooseCard";
const WhyChoose=()=>{
    return(
        <div className="pt-16 pb-16 bg-white ">
            <h1 className="mt-6 text-2xl md:text-3xl font-bold text-center text-slate-700">لماذا تختار منصة مبدع ؟</h1>
            <div className="mt-20 grid w-[90%] mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
                <div>
                    <WhyChooseCard image="/images/i1.png" title="إنشاء حساب مجاني بالكامل" discription="منصة مبدع هي منصة مجانية مئة بالمئة يمكنك إنشاء حسابك بشكل مجاني و الاستفادة من كافة الميزات" linkText="إنضم إلينا"/>
                </div>
                <div>
                    <WhyChooseCard image="/images/i2.png" title="لوحة تحكم مليئة بالإحصائيات الشخصية" discription="في منصة مبدع يملك كل مستخدم لوحة تحكم إحترافية تمكنه من التحكم يحسابه و تزوده بإحصائيات دقيقة عنه" linkText="إنضم إلينا"/>
                </div>
                <div>
                    <WhyChooseCard image="/images/i3.png" title="الحماية و الوثوقية" discription="منصة مبدع مزودة بأحدث أساليب الحماية ضد الاختراق و تشفير عالي المستوى للبيانات" linkText="إنضم إلينا"/>
                </div>
                <div>
                    <WhyChooseCard image="/images/i4.png" title="دعم عملاء سريع" discription="في منصة مبدع يوجد فريق لدعم العملاء وهو متاح على مدار الساعة للرد على أي استفسار للمستخدمين" linkText="إنضم إلينا"/>
                </div>
            </div>
        </div>
    )
}
export default WhyChoose