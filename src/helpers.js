export default class Helpers {
  // check if response includes an error code
  //
  // @param [Array] array of errors
  // e.g. [{code:'invalid_user_token'}, {code:'missing_field', field:'email'}]
  // @param [String] error_code
  //
  // @return true if reponse includes error_code, false otherwise
  static includeErrorCode(errors, error_code) {
    if (errors) {
      for (let i = 0; i < errors.length; i++) {
        if (errors[i].code == error_code)
          return true;
      }
    }
    return false;
  }

  static toOneFixed(num) {
    let num_float = parseFloat(num);
    if(!isNaN(num)) {
      if (Helpers._isInt(num_float))
        return num_float;
      else
        return num_float.toFixed(1);
    }else {
      return num;
    }
  }

  static getPreviousRoute(navigator) {
    let routes = navigator.getCurrentRoutes();
    if (routes.length < 2) {
      return null;
    } else {
      return routes[routes.length-2];
    }
  }

  static _isInt(num) {
    return num % 1 === 0;
  }
}
