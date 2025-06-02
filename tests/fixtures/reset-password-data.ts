export const resetPasswordData = [
  {
    description: 'F-01 Click Forgot your password and enter a valid email',
    email: 'may.atmayanti@gmail.com',
    isValid: true,
  },
  {
    description: 'F-02 Click Forgot your password and enter an unregistered email',
    email: 'may.atmayanti999@gmail.com',
    isValid: false,
    expectedResult: 'This email is not valid'
  }, 
  {
    description: 'F-03 Click Forgot your password and enter a invalid email',
    email: 'may.atmayanti9999@ushu',
    isValid: false,
    expectedResult: 'Invalid email format'
  }, 
  {
    description: 'F-04 Click Forgot your password and submit without input email',
    email: '',
    isValid: false,
    expectedResult: 'Please fill out this field.'
  }
];
