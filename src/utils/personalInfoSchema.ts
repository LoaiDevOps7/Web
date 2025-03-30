import * as yup from "yup";

const today = new Date();
const maxDate = new Date();
maxDate.setFullYear(today.getFullYear() - 18);

export const personalInfoSchema = yup.object({
  username: yup.string().required("اسم المستخدم مطلوب"),
  firstName: yup.string().required("الاسم الأول مطلوب"),
  lastName: yup.string().required("الاسم الأخير مطلوب"),
  description: yup.string(),
  city: yup.string().required("المدينة مطلوبة"),
  country: yup.string().required("الدولة مطلوبة"),
  dateOfBirth: yup.date().when("$isUpdate", (isUpdate: boolean, schema) => {
    return isUpdate
      ? schema.notRequired()
      : schema
          .max(maxDate, "يجب أن يكون عمرك 18 سنة على الأقل")
          .required("تاريخ الميلاد مطلوب");
  }),
  profileImage: yup
    .mixed()
    .test("fileRequired", "صورة الملف الشخصي مطلوبة", (value) => {
      return value instanceof File || typeof value === "string";
    }),
});
