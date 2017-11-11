'use strict';

module.exports = app => {
    class UserController extends app.Controller {
        async wxLogin() {
            const { ctx, service } = this;
            console.log(ctx.query);
            var rtn =  await service.user.wxLogin(ctx.query);
            this.ctx.body = rtn;
        }

        async index() {
            const { ctx, service } = this;
            var rtn =  await service.user.index();
            this.ctx.body = rtn;
        }

        async show() {
            const { ctx, service } = this;
            var rtn =  await service.user.show();
            this.ctx.body = rtn;
        }

        async update() {
            const { ctx, service } = this;
            var rtn =  await service.user.update();
            this.ctx.body = rtn;
        }


    }
    return UserController;
};
