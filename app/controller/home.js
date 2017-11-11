'use strict';

module.exports = app => {
  class HomeController extends app.Controller {
   async index() {
        const { ctx, service } = this;

      this.ctx.render('index.html');
    }
  }
  return HomeController;
};
