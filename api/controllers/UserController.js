/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  findOne: async function findOneFn(req, res) {
    sails.log.debug('user controller findOne', req.param('id'), req.session.userId);
    if (parseInt(req.param('id')) !== parseInt(req.session.userId)) {
      return res.badRequest('Nice try.');
    }

    var id = req.session.userId;
    var user = await User.findOne({
      id: id,
    }).populate('todoItems');

    if (!user) {
      return res.notFound();
    }

    res.ok(user);
  },
};
