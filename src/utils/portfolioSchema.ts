import * as yup from "yup";

export const portfolioSchema = yup.object({
  name: yup.string().required("اسم المشروع مطلوب"),
  description: yup.string(),
  projectUrl: yup
    .string()
    .url("يجب أن يكون رابط المشروع صالحًا"),
  imageUrl: yup
    .mixed()
    .test("fileRequired", "يجب رفع صورة للمشروع", (value) => {
      return value instanceof File;
    }),
});
