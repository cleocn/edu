'use strict';

module.exports = app => {
    class TeacherController extends app.Controller {
        async index() {
            const { ctx, service } = this;
            var rtn =  await service.teacher.findAll();
            this.ctx.body = rtn;
        }

        async show() {
            const {ctx, service} = this;
            console.log("course_show", ctx.params);

            var rtn = await service.teacher.findById(ctx.params);
            this.ctx.body = rtn;
        }
    }
    return TeacherController;
};
