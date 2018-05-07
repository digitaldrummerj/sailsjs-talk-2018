module.exports = {
  friendlyName: 'Signup',
  description: 'Sign up for a new user account.',
  inputs: {
    email: {
      required: true,
      type: 'string',
      isEmail: true,
    },
    password: {
      required: true,
      type: 'string',
      maxLength: 200,
    },
  },
  exits: {
    invalid: {
      responseType: 'badRequest',
      description: 'The provided password and/or email address are invalid.',
    },
    emailAlreadyInUse: {
      responseType: 'alreadyInUse',
      description: 'The provided email address is already in use.',
    },
  },
  fn: async function(inputs, exits) {
    sails.log.info('create', inputs.email);
    var newEmailAddress = inputs.email.toLowerCase();

    // Build up data for the new user record and save it to the database.
    // (Also use `fetch` to retrieve the new ID so that we can use it below.)
    var newUserRecord = await User.create(
      Object.assign({
        email: newEmailAddress,
        password: await sails.helpers.passwords.hashPassword(inputs.password),
      })
    )
      .intercept('E_UNIQUE', 'emailAlreadyInUse')
      .intercept({ name: 'UsageError' }, 'invalid')
      .fetch();

    // Store the user's new id in their session.
    this.req.session.userId = newUserRecord.id;

    // Since everything went ok, send our 200 response.
    return exits.success(newUserRecord);
  },
};
