'use strict';

module.exports = app => {
  class HomeController extends app.Controller {
   async index() {
        const { ctx, service } = this;
      var rtn =  await service.user.find();
      this.ctx.body = rtn;
    }
  }
  return HomeController;
};
