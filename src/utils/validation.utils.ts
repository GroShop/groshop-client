import {z} from 'zod';

const loginScheme = z.object({
  email: z.string().email('Invalid Email').nonempty('Please Enter Email'),
  password: z
    .string()
    .min(6, {message: 'Invalid Email'})
    .nonempty('Please Enter Password'),
});

const SignInScheme = z.object({
  name: z.string().nonempty('Please Enter Name'),
  email: z.string().email('Invalid Email').nonempty('Please Enter Email'),
  password: z
    .string()
    .min(6, {message: 'maximal password must be at least 6 characters'})
    .nonempty('Please Enter Password'),
  confirm_password: z
    .string()
    .min(6, {message: 'Mismatch password'})
    .nonempty('Please Enter Confirm Password'),
});
