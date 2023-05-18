import {z} from 'zod';

const Validation: any = {
  loginScheme: z.object({
    email: z.string().nonempty('Please Enter Email').email('Invalid Email'),
    password: z
      .string()
      .min(6, {message: 'Invalid Email'})
      .nonempty('Please Enter Password'),
  }),
  signInScheme: z.object({
    username: z.string().nonempty('Please Enter Full Name'),
    email: z.string().email('Invalid Email').nonempty('Please Enter Email'),
    password: z
      .string()
      .nonempty('Please Enter Password')
      .min(6, {message: 'at least 6 characters'}),
    confirm_password: z
      .string()
      .nonempty('Please Enter Confirm Password')
  }).refine(data => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"], // path of error
  }),
};

export default Validation;
