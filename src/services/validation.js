const persianRex = require('persian-rex');
export const userDataValidation = (name, newVal, text) => { };

export function checkmobile(str) {
  const reg = /^[0]?[9]\d{9}$/;
  return reg.test(str);
}

export function cardNumber(str) {
  const reg = /^\d{16}$/;
  return reg.test(str);
}

export function nationalCode(str) {
  const reg = /^\d{10}$/;
  return reg.test(str);
}

export function checkphone(str) {
  const reg = /^[0]\d{10}$/;
  return reg.test(str);
}

export function checkpassword(text) {
  return text.length > 5;
}

export function checkIsPersian(str) {
  // const p = /^[\u0600-\u06FF\s]+$/;
  return persianRex.text.test(str);
}

export function checkemail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export function checkcard(text) {
  return text.length === 16;
}

const sequence = '۰۱۲۳۴۵۶۷۸۹';

export function toEnglishConverter(text) {
  let converted = text;
  for (let i = 0; i < text.length; i += 1) {
    console.log(sequence.indexOf(text[i]))
    if (sequence.indexOf(text[i]) !== -1) {
      converted = converted.replace(text[i], sequence.indexOf(text[i]));
    }
  }
  return converted;
}

