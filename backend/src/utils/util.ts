/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } if (typeof value !== 'number' && value === '') {
    return true;
  } if (typeof value === 'undefined' || value === undefined) {
    return true;
  } if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } 
    return false;
  
};