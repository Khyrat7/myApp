export default class LoginValidation {
  // checking the length of the input and removing the spaces (using trim)
  static isValidPassword = term => {
    let length = term.trim().length;

    return length > 7 ? true : false;
  };

  // checking the validity of the email
  static isValidEmail = term => {
    const expression = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let isValid = expression.test(String(term).toLowerCase());
    return isValid;
  };
}
