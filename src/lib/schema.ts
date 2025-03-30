import { z } from 'zod'

export const FormDataSchema = z.object({
  firstName: z.string().min(3, 'First name is required'),
  lastName: z.string().min(3, 'Last name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  country: z.string().min(1, 'Country is required'),
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  PaymentCompany: z.string().min(1,'Payment company name is required'),
  AccountName: z.string().min(1,'Account name is required'),
  AccountId: z.string().min(1,'Account id is required'),
  AccountPassword: z.string().min(8,'Password is required'),
})
