export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};



const sequence = '۰۱۲۳۴۵۶۷۸۹';


export function dateToEnglishConverter(text) {
  let converted = text;

  for (let i = 0; i < text.length; i += 1) {
    if (text[i] !== ' ' && text[i] !== '-' && text[i] !== ':') {
      converted = converted.replace(text[i], sequence.indexOf(text[i]));
    }
  }
  return converted;
}

export const jsCoreDateCreator = (dateString) => {
  // dateString *HAS* to be in this format "YYYY-MM-DD HH:MM:SS"  
  let dateParam = dateString.split(/[\s-:]/)
  dateParam[1] = (parseInt(dateParam[1], 10) - 1).toString()
  return new Date(...dateParam)
}