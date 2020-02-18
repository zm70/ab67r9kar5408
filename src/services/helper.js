import strings from 'src/res/strings.json'

import { checkIsPersian } from "AppFonts";
export const convertToFormdata = (body) => {
  let requestBody = new FormData();
  for (let key in body) {
    requestBody.append(key, `${body[key]}`);
  }
  return requestBody;
};

export const parseErrors = (err) => {
  console.log(err)
if(!err.response){
  return strings.serverErr
}
  if (err.response && err.response.status !== 500) {

    const errorMsg = err.response.data;
    if (errorMsg && errorMsg.errors && typeof (errorMsg.errors) === 'object') {
      const errors = Object.keys(errorMsg.errors)
        .map((errorKey) => {
          if (checkIsPersian(errorMsg.errors[errorKey])) {
            return errorMsg.errors[errorKey]
          }
        })
        .join('\n');
      if (errors) {
        return errors;
      }
    }

  }

  else if (err.response && err.response.status === 404) {
    return strings.searchNotFound;
  } else if (err.message.includes("Network")) {
    return strings.noNet;
  }


  return strings.serverErr;
};
