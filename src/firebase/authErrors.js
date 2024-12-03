const authErrors = (code) => {
  // default message
  let message = 'Sorry, try again later';

  switch (code) {
    case 'auth/user-not-found':
      message = 'User not found';
      break;
    case 'auth/email-already-in-use':
      message = 'Email is already in use';
      break;
    case 'auth/wrong-password':
      message = 'You entered wrong password';
      break;
    case 'auth/invalid-credential':
      message = 'Invalid credentials';
      break;
    default:
      message = code;
  }
  return message;
};

export default authErrors;
