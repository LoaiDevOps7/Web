"use client";

import Rating from "@mui/material/Rating";
import { useRatings } from "@/context/RatingsContext";

const RatesList = () => {
  const { ratings, average, isLoading, error } = useRatings();

  if (isLoading) return <p>جاري تحميل التقييمات...</p>;
  if (error) return <p>حدث خطأ أثناء تحميل التقييمات.</p>;

  return (
    <div className="w-full flex-1 flex gap-4 justify-between flex-wrap text-right">
      {ratings.length > 0 ? (
        ratings.map((rate) => (
          <div
            key={rate.id}
            className="w-[350px] bg-white shadow flex flex-col"
          >
            {/* حاوية التعريف */}
            <div className="mx-2 my-3 text-slate-500">
              <h1>
                <span className="text-lamagreen">المقيم: </span>
                {rate.rater?.kyc || "غير متوفر"}
              </h1>
              <h1>
                <span className="text-lamagreen">رسالة التقييم: </span>
                {rate.comment || "لا يوجد تعليق"}
              </h1>
            </div>
            {/* عرض المعدل الموزون */}
            <div className="mx-2 my-3 text-slate-500">
              <h2>المعدل الموزون: {average.toFixed(1)}</h2>
              <Rating
                name="average-rating"
                value={average}
                precision={0.1}
                readOnly
              />
            </div>
            {/* حاوية المراجعة */}
            <div className="mt-3 flex-row flex justify-between">
              {/* التقييمات */}
              <div className="mx-3">
                <h1>التقييمات</h1>
                <div className="my-2">
                  <Rating
                    name="half-rating-read"
                    defaultValue={rate.ratingProfessionalism || 0}
                    precision={0.5}
                    readOnly
                  />
                </div>
                <div className="my-2">
                  <Rating
                    name="half-rating-read"
                    defaultValue={rate.ratingCommunication || 0}
                    precision={0.5}
                    readOnly
                  />
                </div>
                <div className="my-2">
                  <Rating
                    name="half-rating-read"
                    defaultValue={rate.ratingQuality || 0}
                    precision={0.5}
                    readOnly
                  />
                </div>
                <div className="my-2">
                  <Rating
                    name="half-rating-read"
                    defaultValue={rate.ratingExpertise || 0}
                    precision={0.5}
                    readOnly
                  />
                </div>
                <div className="my-2">
                  <Rating
                    name="half-rating-read"
                    defaultValue={rate.ratingTimeliness || 0}
                    precision={0.5}
                    readOnly
                  />
                </div>
                <div className="my-2">
                  <Rating
                    name="half-rating-read"
                    defaultValue={rate.ratingRepeat || 0}
                    precision={0.5}
                    readOnly
                  />
                </div>
              </div>

              {/* المعايير */}
              <div className="text-right mr-2 w-[80%] text-nowrap">
                <h1>المعايير</h1>
                <div className="text-slate-500">
                  <p className="my-3">الاحترافية بالعمل</p>
                  <p className="my-3">التواصل و المتابعة</p>
                  <p className="my-3">جودة العمل</p>
                  <p className="my-3">الخبرة بالمجال</p>
                  <p className="my-3">التسليم بالموعد</p>
                  <p className="my-3">معاودة التعامل</p>
                </div>
              </div>
            </div>

            {/* حاوية الرد
            <div className="mx-2 my-3">
              <h1 className="text-lamagreen">:بإمكانك الرد على من تقيمك</h1>
              <div className="flex flex-row justify-around my-3">
                <button className="bg-lamagreen rounded-md w-[50px] text-slate-100">
                  إرسال
                </button>
                <input
                  type="text"
                  className="bg-slate-200 rounded-md text-right w-[150px]"
                />
              </div>
            </div> */}

            {/* تاريخ التقييم */}
            <div className="mx-2 my-3">
              <p className="text-xs text-slate-400">
                {new Date(rate.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>لا توجد تقييمات</p>
      )}
    </div>
  );
};

export default RatesList;