import {z} from 'zod';
import {phoneRegex} from './functions.utils';

const Validation: any = {
  loginScheme: z.object({
    email: z.string().nonempty('Please Enter Email').email('Invalid Email'),
    password: z
      .string()
      .min(6, {message: 'Invalid Email'})
      .nonempty('Please Enter Password'),
  }),

  signInScheme: z
    .object({
      username: z.string().nonempty('Please Enter Full Name'),
      email: z.string().email('Invalid Email').nonempty('Please Enter Email'),
      password: z
        .string()
        .nonempty('Please Enter Password')
        .min(6, {message: 'at least 6 characters'}),
      confirmPassword: z.string().nonempty('Please Enter Confirm Password'),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'], // path of error
    }),

  forgotScheme: z.object({
    email: z.string().nonempty('Please Enter Email').email('Invalid Email'),
  }),

  resetScheme: z
    .object({
      password: z
        .string()
        .nonempty('Please Enter Password')
        .min(6, {message: 'at least 6 characters'}),
      confirmPassword: z.string().nonempty('Please Enter Confirm Password'),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'], // path of error
    }),

  addressScheme: z.object({
    name: z.string().nonempty('Please Enter Name'),
    phone_number: z
      .string()
      .regex(phoneRegex, 'Invalid Number!')
      .max(10, 'Phone number at least 10 ')
      .min(10, 'Phone number at least 10 '),
    place: z.string().nonempty('Please Enter Place'),
    address: z.string().nonempty('Please Enter Address'),
  }),

  profileScheme: z.object({
    username: z.string().nonempty('Please Enter Name'),
    phone_number: z
      .string()
      .regex(phoneRegex, 'Invalid Number!')
      .max(10, 'Phone number at least 10 ')
      .min(10, 'Phone number at least 10 ')
      .optional()
      .or(z.literal('')),
  }),
};

export default Validation;
