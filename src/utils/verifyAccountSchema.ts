import * as yup from "yup";

export const VerifyAccountSchema = yup.object({
  faceImage: yup
    .mixed()
    .test(
      "fileRequired",
      "صورة الوجه مطلوبة",
      (value) => value instanceof File || typeof value === "string"
    ),
  frontIdCardImage: yup
  .mixed()
    .test(
      "fileRequired",
      "صورة البطاقة الأمامية مطلوبة",
      (value) => value instanceof File || typeof value === "string"
    ),
  backIdCardImage: yup
    .mixed()
    .test(
      "fileRequired",
      "صورة البطاقة الخلفية مطلوبة",
      (value) => value instanceof File || typeof value === "string"
    ),
    governmentId: yup.string().max(11).required("الرقم الحكومي مطلوب"),
});
