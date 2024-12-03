import * as yup from 'yup';

const articleSchema = {
  game: yup.string().required('Game name is required'),
  title: yup.string().required().min(10, 'Make title longer').max(40, 'Make title shorter'),
  excerpt: yup.string().required().min(100, 'Make excerpt longer').max(300, 'Make excerpt shorter'),
  editor: yup.string().required().min(10, 'Make the title longer'),
  rating: yup.string().required('Rating is required'),
  image: yup.string().required('Image is required').url('Is this a valid url?'),
};

export default articleSchema;

/*
  const formSchema = yup.object({
    // rules
    email: yup.string().required('The email us required').email('Not a valid email'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .minUppercase(1, 'Password must contain at least 1 uppercase')
      .minLowercase(1, 'Password must contain at least 1 lowercase')
      .minSymbols(1, 'Password must contain at least 1 special character'),
    passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Password must match'),
  });
  */
