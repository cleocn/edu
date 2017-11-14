'use strict';

module.exports = app => {
  class ClassService extends app.Service {

    // GET: /class   查询所有课程
    async index() {
console.log("class.index");
      const { ctx, service } = this;
      console.log("ctx",ctx);
      const rtn = await service.class.findAll();
      ctx.body = rtn;
    }

    // GET: /class/_id 根据_id查询单个课程
    async show() {
        console.log("class.show");
      const { ctx, service } = this;
      const rtn = await service.class.findById(ctx.params);
      ctx.body = rtn;
    }
    // PUT: /class/_id  根据_id更新课程
    async update() {
      const { ctx, service } = this;
      // update(id,更新的值对)
      const rtn = await service.class.updateById(ctx.params, ctx.query);
      this.ctx.body = rtn;
    }

    //支持多个参数同时索引  post {"courseId":100002,"classId": 100011,..}
      async listClass() {
          const { ctx, service } = this;
          console.log("listClass",ctx.request.body);
          var rtn =  await service.class.findById(ctx.request.body);
          this.ctx.body = rtn;
      }

  }
  return ClassService;
};
