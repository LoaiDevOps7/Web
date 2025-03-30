import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Wallet = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      ...قريبا
      {/* <main className="flex flex-col items-center justify-center w-full flex-1 text-center ">
        <div className="p-4 flex gap-4 flex-col md:flex-row bg-white  ">
          sign up section
          <div className="w-full lg:w-5/5  ">
            <div className="text-center font-bold">
              <span className="text-green-500">المحفظة</span>
            </div>
            <div className="py-10">
              <div className="flex justify-between my-2">
                <div className="rounded-md flex flex-col justify-between bg-gray-100 w-[47%]">
                  <h1 className=" text-lamagreen mt-2">المبلغ في الحساب</h1>
                  <p className=" text-xs mb-2">1200$</p>
                </div>
                <div className="rounded-md flex flex-col justify-between bg-gray-100 w-[47%]">
                  <h1 className="text-lamagreen mt-2">المبلغ القابل للسحب</h1>
                  <p className="text-xs  mb-2">1000$</p>
                </div>
              </div>

              <p className="text-gray-400 mt-5 ">
                لسحب الأموال أو إيداعها املأ البيانات المطلوبة
              </p>
              <div className="flex flex-col items-center ">
                <div className="">
                  <Select>
                    <SelectTrigger className="bg-gray-100 w-64 m-4 flex items-center rounded-2xl">
                      <SelectValue placeholder="اختر البنك المناسب" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>اختر البنك المناسب</SelectLabel>
                        <SelectItem value="apple">البركة</SelectItem>
                        <SelectItem value="banana">العقاري</SelectItem>
                        <SelectItem value="blueberry">التجاري</SelectItem>
                        <SelectItem value="grapes">بيمو</SelectItem>
                        <SelectItem value="pineapple">
                          البنك الإسلامي
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="">
                  <Select>
                    <SelectTrigger className="bg-gray-100 w-64 m-4 flex items-center rounded-2xl">
                      <SelectValue placeholder="اختر العملية المطلوبة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>اختر العملية المطلوبة</SelectLabel>
                        <SelectItem value="apple">سحب</SelectItem>
                        <SelectItem value="banana">إيداع</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-gray-100 w-64 m-4 flex items-center rounded-2xl">
                  <input
                    type="number"
                    name="money"
                    placeholder="ادخل المبلغ المطلوب"
                    className="bg-gray-100 outline-none text-sm p-3 "
                    required
                  />
                </div>
                <div className="bg-gray-100 w-64 m-4 flex items-center rounded-2xl">
                  <input
                    type="number"
                    name="cradnumber"
                    placeholder="ادخل رقم الحساب"
                    className="bg-gray-100 outline-none text-sm p-3 "
                    required
                  />
                </div>
                <div className="bg-gray-100 w-64 m-4 flex items-center rounded-2xl">
                  <input
                    type="password"
                    name="cardpassword"
                    placeholder="ادخل كلمة سر الحساب"
                    className="bg-gray-100 outline-none text-sm p-3 "
                    required
                  />
                </div>

                <a
                  href="#"
                  className="border-2 border-green-500 rounded-full px-12 py-2 inline-block font-semibold text-green-500 hover:bg-green-500 hover:text-white"
                >
                  إرسال الطلب
                </a>
              </div>
            </div>
          </div>
        </div>
      </main> */}
    </div>
  );
};
export default Wallet;
