export { Icon } from './icons';
export { default as fontStyles } from './styles';
export { TextInputBold } from './TextInputBold';
export { ButtonBold } from './ButtonBold';
export { ButtonLoading } from './ButtonLoading';
export { TextBold } from './TextBold';
export { ValidationTextInput } from './validationTextInput';

const persianRex = require('persian-rex');

export function checkIsPersian(str) {
  // const p = /^[\u0600-\u06FF\s]+$/;
  return persianRex.hasLetter.test(str);
}
