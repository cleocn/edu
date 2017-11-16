const MongoClient = require('mongodb').MongoClient,
  assert = require('assert');


module.exports = app => {
  class ConsultService extends app.Service {
    // 查询所有留言咨询
    async listConsult() {
      // Connection URL
      const db = await MongoClient.connect(app.config.dbStr);
      console.log('连接数据库成功class');
      // Get the collection
      const col = db.collection('consult');
      // Get first documents that match the query
      const docs = await col.find().toArray();
      db.close;
      return docs;
    }
    // 新增留言咨询*
    async addConsult(params) {
      // Connection URL
      const db = await MongoClient.connect(app.config.dbStr);
      console.log('连接数据库成功');
      // Get the collection
      const col = db.collection('consult');
      console.log('params', params);
      const docs = await col.insert(params);
      //  console.log('连接数据库成功', docs);
      db.close;
      return docs;
    }

    // 查询所有留言咨询回复
    async listReplyConsult(params) {
      // Connection URL
      const db = await MongoClient.connect(app.config.dbStr);
      console.log('连接数据库成功class');
      // Get the collection
      let col = db.collection('replyConsult');
      let where = {};
      if (params.mainSeq) {
        where.mainSeq = params.mainSeq;
      }
      // Get first documents that match the query
      const result = {};
      const replyConsult = await col.find(where).toArray();
      result.replyConsult = replyConsult;

      where = {};
      where.seq = params.mainSeq;
      col = db.collection('consult');
      const consult = await col.find(where).toArray();
      result.consult = consult;
      //   console.log("result:",result);
      db.close;
      return result;
    }

    // 新增留言咨询回复
    async addReplyConsult(params) {
      // Connection URL
      const db = await MongoClient.connect(app.config.dbStr);
      // Get the collection
      let col = db.collection('replyConsult');
   //   console.log('replyConsult params', params);
      let docs = await col.insert(params);
    //  console.log('连接数据库成功 replyConsult insert:', docs);
      // 如果新增失败则直接返回结果
      if (docs.result.ok || docs.result.ok != 1) {
        db.close;
        return docs;
      }
      const where = {};
      where.seq = params.mainSeq;
      col = db.collection('consult');
      docs = await col.update(where, { $inc: { replyCount: 1 } });

      db.close;
      return docs;
    }
  }
  return ConsultService;

};
