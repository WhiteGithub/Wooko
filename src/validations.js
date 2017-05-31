import I18n from './i18n';

// Validates the length of arr is larger than minimum
export function validatesMinCount(arr, min) {
  if (arr.length < min)
    return false;
  else
    return true;
}

// validate field existence
// return undefined if valid, error message if invalid
export function validateExistence(str) {
  if (!str)
    return I18n.t('validation.existence');
}

// validate email format
// return undefined if valid, error message if invalid
export function validateEmailFormat(str) {
  // format regular expression
  var regex = /^[\w+\-.]+@[a-z\d\-.]+\.[a-z]+$/i;
  if (!regex.test(str))
    return I18n.t('validation.email_format');
}

// validate email format before @
// return undefined if valid, error message if invalid
export function validateEmailFormatPrefix(str) {
  // format regular expression
  var regex = /^[\w+\-.]*$/i;
  if (!regex.test(str))
    return I18n.t('validation.email_format');
}

// validate string minimum length
// return undefined if valid, error message if invalid
export function validateMinLength(str, min) {
  if (str.length < min)
    return I18n.t('validation.min_length', {min:min});
}

export function validateMaxLength(str, max) {
  if (str.length > max)
    return I18n.t('validation.max_length', {max:max});
}

export function validateNumber(str) {
  if (isNaN(str))
    return I18n.t('validation.number');
}

export function validateInteger(str) {
  if (isNaN(str))
    return I18n.t('validation.integer');
  else
    if(+str % 1 != 0)
      return I18n.t('validation.integer');
}

export function validateMinValue(str, min) {
  if (parseFloat(str) < min)
    return I18n.t('validation.min_value', {min:min});
}

export function validateMaxValue(str, max) {
  if (parseFloat(str) > max)
    return I18n.t('validation.max_value', {max:max});
}

export function validatePasswordConfirmationMatch(password_confirmation, password) {
  if (password_confirmation != password)
    return I18n.t('validation.password_confirmation_match');
}
