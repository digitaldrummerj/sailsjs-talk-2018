/**
 * alreadyInUse.js
 *
 * A custom response.
 *
 * Example usage:
 * ```
 *     return res.alreadyInUse();
 *     // -or-
 *     return res.alreadyInUse(optionalData);
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       somethingHappened: {
 *         responseType: 'alreadyInUse'
 *       }
 *     }
 * ```
 *
 * ```
 *     throw 'somethingHappened';
 *     // -or-
 *     throw { somethingHappened: optionalData }
 * ```
 */

module.exports = function alreadyInUse(optionalData) {
  // Get access to `req` and `res`
  var req = this.req;
  var res = this.res;

  // Define the status code to send in the response.
  var statusCodeToSet = 409;

  if (optionalData === undefined) {
    return res
      .status(statusCodeToSet)
      .send('Email address is already taken by another user, please try again.');
  } else if (_.isError(optionalData)) {
    if (!_.isFunction(optionalData.toJSON)) {
      if (process.env.NODE_ENV === 'production') {
        return res.sendStatus(statusCodeToSet);
      } else {
        return res.status(statusCodeToSet).send(optionalData.stack);
      }
    }
  } else {
    return res.status(statusCodeToSet).send(optionalData);
  }
};
