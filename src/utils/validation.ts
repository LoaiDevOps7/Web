import * as yup from "yup";

// تعبير عادي للتحقق من كلمة المرور
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .matches(emailRegex, "يرجى إدخال عنوان بريد إلكتروني صالح (على سبيل المثال ، example@domain.com)")
    .required("البريد الإلكتروني مطلوب"),
  password: yup
    .string()
    .min(8, "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل")
    .required("كلمة المرور مطلوبة"),
  termsAccepted: yup
    .boolean()
    .oneOf([true], "يجب عليك قبول الشروط والأحكام")
    .required("يجب عليك قبول الشروط والأحكام"),
});

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .matches(emailRegex, "يرجى إدخال عنوان بريد إلكتروني صالح (على سبيل المثال ، example@domain.com)")
    .required("البريد الإلكتروني مطلوب"),
  password: yup
    .string()
    .min(8, "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل")
    .matches(
      passwordRegex,
      "يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل وحرف صغير واحد ورقم واحد وحرف خاص واحد"
    )
    .required("كلمة المرور مطلوبة"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "يجب أن تتطابق كلمات المرور")
    .required("تأكيد كلمة المرور مطلوبة"),
  termsAccepted: yup
    .boolean()
    .oneOf([true], "يجب عليك قبول الشروط والأحكام")
    .required("يجب عليك قبول الشروط والأحكام"),
});

export const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .matches(
      emailRegex,
      "يرجى إدخال عنوان بريد إلكتروني صالح (على سبيل المثال ، example@domain.com)"
    )
    .required("البريد الإلكتروني مطلوب"),
});

export const resetPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .min(8, "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل")
    .matches(
      passwordRegex,
      "يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل وحرف صغير واحد ورقم واحد وحرف خاص واحد"
    )
    .required("كلمة المرور مطلوبة"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "يجب أن تتطابق كلمات المرور")
    .required("تأكيد كلمة المرور مطلوبة"),
});
