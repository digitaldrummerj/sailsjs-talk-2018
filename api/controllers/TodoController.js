/**
 * TodoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  findOne: async function findOneFn(req, res) {
    sails.log.debug('todo controller findOne', req.session.userId, req.param('id'));

    var todoItem = await Todo.findOne({
      id: req.param('id'),
      owner: req.session.userId
    });

    if (!todoItem) {
      return res.notFound();
    }

    res.ok(todoItem);
  },
};
