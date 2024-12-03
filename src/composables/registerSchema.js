import * as yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(yup);

const registerSchema = {
  // rules
  email: yup.string().required('Email us required').email('Not a valid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .minUppercase(1, 'Password must contain at least 1 uppercase')
    .minLowercase(1, 'Password must contain at least 1 lowercase')
    .minSymbols(1, 'Password must contain at least 1 special character'),
  passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Password must match'),
};

export default registerSchema;

/**
 import * as yup from 'yup';
const registerSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().required('The email is required').email('Not a valid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least 1 lowercase letter')
    .matches(/[\W_]/, 'Password must contain at least 1 special character'),
  passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Password must match'),
});

export default registerSchema;

 */
