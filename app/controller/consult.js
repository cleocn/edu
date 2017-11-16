'use strict';

module.exports = app => {
  class ConsultService extends app.Service {

    // GET
    async index() {
      const { ctx, service } = this;
      console.log('ctx', ctx);
      const rtn = await service.consult.findAll();
      ctx.body = rtn;
    }

    // GET:
    async show() {
      const { ctx, service } = this;
      const rtn = await service.consult.findById(ctx.params);
      ctx.body = rtn;
    }
    // PUT: /class/_id  根据_id更新课程
    async update() {
      const { ctx, service } = this;
      // update(id,更新的值对)
      const rtn = await service.consult.updateById(ctx.params, ctx.query);
      this.ctx.body = rtn;
    }

      // 查询所有留言咨询
    async listConsult() {
      const { ctx, service } = this;
      console.log('listClass', ctx.request.body);
      const rtn = await service.consult.listConsult(ctx.request.body);
      this.ctx.body = rtn;
    }

  // 新增留言咨询*
    async addConsult() {
      const { ctx, service } = this;
      console.log('listClass', ctx.request.body);
      const rtn = await service.consult.addConsult(ctx.request.body);
      this.ctx.body = rtn;
    }

      // 查询所有留言咨询回复
      async listReplyConsult() {
          const { ctx, service } = this;
          console.log('listClass', ctx.request.body);
          const rtn = await service.consult.listReplyConsult(ctx.request.body);
          this.ctx.body = rtn;
      }


      // 新增留言咨询回复
      async addReplyConsult() {
          const { ctx, service } = this;
          console.log('listClass', ctx.request.body);
          const rtn = await service.consult.addReplyConsult(ctx.request.body);
          this.ctx.body = rtn;
      }


  }
  return ConsultService;
};
