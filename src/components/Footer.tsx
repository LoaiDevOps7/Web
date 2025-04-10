import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-white py-10 ">
      <div className="w-[90%] mx-auto px-5 sm:px-6 lg:px-8 ">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* logo and discrip */}
          <div>
            {/* logo */}
            <Link href="/">
              <Image
                src="/logo.png"
                alt="logo"
                width={80}
                height={80}
                className="mx-auto"
              />
            </Link>
            {/* description */}
            <p className="mt-4 text-sm font-medium leading-[2rem] w-[80%] text-gray-600 text-center mx-auto">
              أهلا و سهلا بكم في منصة مبدع حيث يجتمع التطور و الإبداع في مكان
              واحد
            </p>
          </div>
          {/* about us links */}
          <div className="text-right">
            <h3 className="text-lg font-semibold text-gray-800 ">من نحن</h3>
            <ul className="mt-4 space-y-4 text-sm font-semibold text-gray-500">
              <li>
                <Link href="">مركز الدعم و المساعدة</Link>
              </li>
              <li>
                <Link href="">خدمة العملاء</Link>
              </li>
              <li>
                <Link href="">من نحن</Link>
              </li>
              <li>
                <Link href="">حقوق النسخ و النشر</Link>
              </li>
              <li>
                <Link href="">أسئلة شائعة</Link>
              </li>
            </ul>
          </div>
          {/* our categorizes */}
          <div className="text-right">
            <h3 className="text-lg font-semibold text-gray-800 ">
              مجالات مقترحة
            </h3>
            <ul className="mt-4 space-y-4 text-sm font-semibold text-gray-500">
              <li>
                <Link href="">البرمجة و التطوير </Link>
              </li>
              <li>
                <Link href="">التصميم و الفنون الإبداعية</Link>
              </li>
              <li>
                <Link href="">أمن المعلومات</Link>
              </li>
              <li>
                <Link href="">الكتابة و الترجمة</Link>
              </li>
              <li>
                <Link href="">التسويق الرقمي</Link>
              </li>
              <li>
                <Link href="">الأعمال الإدارية و الدعم</Link>
              </li>
              <li>
                <Link href="">الأعمال التجارية و الاستشارات</Link>
              </li>
              <li>
                <Link href="">الهندسة و العمارة</Link>
              </li>
              <li>
                <Link href="">الصوتيات و الفيديو</Link>
              </li>
            </ul>
          </div>
          {/*contact */}
          <div className="text-right">
            <h3 className="text-lg font-semibold text-gray-800 ">
              معلومات التواصل
            </h3>
            <ul className="mt-4 space-y-4 text-sm font-semibold text-gray-500">
              <li>
                <Link href="">mobdeeplatform@gmail.com </Link>
              </li>
              <li>
                <Link href="">(+963) 997853599</Link>
              </li>
              <li>
                <Link
                  href="https://www.facebook.com/share/158pKMzF2Z/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  حسابنا على فيسبوك
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.instagram.com/mobdee_platform_2025?igsh=MWNzaHRjZ3NzaGd6MA=="
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  حسابنا على إنستقرام
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
