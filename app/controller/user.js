'use strict';

module.exports = app => {
    class UserController extends app.Controller {
        async wxLogin() {
            const { ctx, service } = this;
            console.log(ctx.query);
            var rtn =  await service.user.wxLogin(ctx.query);
            ctx.body = rtn;
        }

        // GET: /user   查询所有用户
        async index() {
            const { ctx, service } = this;
            var rtn =  await service.user.findAll();
            ctx.body = rtn;
        }
       // GET: /user/_id 根据_id查询单个用户
        async show() {
            const { ctx, service } = this;
            var rtn =  await service.user.findById(ctx.params);
            ctx.body = rtn;
        }
       // PUT: /user/_id  根据_id更新用户
        async update() {
            const { ctx, service } = this;
            //update(id,更新的值对)
            var rtn =  await service.user.updateById(ctx.params,ctx.query);
            this.ctx.body = rtn;
        }


    }
    return UserController;
};
