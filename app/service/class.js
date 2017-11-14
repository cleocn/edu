var MongoClient = require('mongodb').MongoClient,
  assert = require('assert');


module.exports = app => {
  class CourseService extends app.Service {

    async findAll() {
      // Connection URL
      const db = await MongoClient.connect('mongodb://isoft-info.com:27017/edu-prd');
      console.log('连接数据库成功class');
      // Get the collection
      const col = db.collection('class');


      // Get first documents that match the query
      const docs = await col.find().toArray();
      db.close;
      return docs;
    }
    async findById(id) {
      // Connection URL
      const db = await MongoClient.connect('mongodb://isoft-info.com:27017/edu-prd');
      console.log('连接数据库成功');
      // Get the collection
      const col = db.collection('class');

      console.log('where', id);
      // Get first documents that match the query
      const docs = await col.find(id).toArray();
      console.log('连接数据库成功', docs);
      db.close;
      return docs;
    }
  }
  return CourseService;
};
