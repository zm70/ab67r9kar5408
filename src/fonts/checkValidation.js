import {
  checkIsPersian,
  checkcard,
  checkemail,
  checkmobile,
  checkpassword,
  checkphone,
  cardNumber,
  nationalCode
} from '../services/validation';
import strings from 'src/res/strings.json';

export const checkValidation = (text, validation) => {
  if (!validation) {
    return [];
  }
  let error = [];
  validation.forEach((condition) => {
    if (condition === 'require' || text.length > 0) {
      if (condition === 'require' && text.length === 0) {
        error.push(strings.nameEmptyValidation);
      } else if (condition === 'persian' && !checkIsPersian(text)) {
        error.push(strings.nameValidation);
      }
      else if (condition === 'password' && !checkpassword(text)) {
        error.push(strings.passValidation);
      }
      // else if (condition === 'persian' && !checon(text)) {
      //   error.push(strings.nameValidation);
      // }
      else if (condition === 'cardnumber' && !cardNumber(text)) {
        error.push(strings.cardValidation);
      } else if (condition === 'nationalCode' && !nationalCode(text)) {
        error.push(strings.nationalValidation);
      } else if (condition === 'mobile' && !checkmobile(text)) {
        error.push(strings.invalidPhone);
      } else if (condition === 'phone' && !checkphone(text)) {
        error.push(strings.invalidPhone2);
      } else if (condition === 'password' && !checkpassword(text)) {
        error.push(strings.passValidation);
      } else if (condition === 'email' && !checkemail(text)) {
        error.push(strings.emailValidation);
      } else if (condition === 'card' && !checkcard(text)) {
        error.push(strings.cardValidation);
      }
    }
  });
  return error;
};
