let MongoClient = require('mongodb').MongoClient,
  assert = require('assert');


module.exports = app => {
  class ClassService extends app.Service {

    async findAll() {
      // Connection URL
      const db = await MongoClient.connect(app.config.dbStr);
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
      const db = await MongoClient.connect(app.config.dbStr);
      console.log('连接数据库成功');
      // Get the collection
      const col = db.collection('class');
      console.log("where",id)
      // Get first documents that match the query
      const docs = await col.find(id).toArray();
      console.log('连接数据库成功', docs);
      db.close;
      return docs;
    }

    // 先查询是否已参加课程，没有则更新课程人数，并将预约人数加入班级

    async checkClass(params) {
      // Connection URL
      const db = await MongoClient.connect(app.config.dbStr);
      console.log('连接数据库成功 inClass');
      const where = {};
      let status = false;
      // Get the collection
      const col = db.collection('class');
      where.classId = parseInt(params.classId);
      where.courseId = parseInt(params.courseId);
      console.log('where', where);
      // Get first documents that match the query
      const docs = await col.find(where).toArray();
      console.log('连接数据库成功 result', docs);
      console.log("params",params);
      if(docs.length >0){
      for (let i = 0; i < docs[0].enrPeople.length; i++) {
        if (docs[0].enrPeople[i].openId == params.openId) {
          console.log('已经报名');
          status = true;
          db.close();
          return docs;
        }
      }
      }else{ //没有这个课程
        return '';
     }
      if (!status) {
        // 1.课程参加人数+1
        let where = {};
        let col = db.collection('course');
        where.courseId = params.courseId;
        let docs = await col.update(where, { $inc: { sumPeople: 1 } });
        console.log('docs 1', docs);
        // 2.将预约人员加入班级
        col = db.collection('class');
        where = {};
        where.classId = parseInt(params.classId);
        where.courseId = parseInt(params.courseId);
        let opr = {
          $inc: { current: 1 },
          $push: { enrPeople:
                  { name: params.name || '',
                    phone: params.phone || '',
                    nickName: params.nickName || '',
                    avatarUrl: params.avatarUrl || '',
                    openId: params.openId || '',
                    status: '已预约',
                  },
          } };
        docs = await col.update(where, opr);
        console.log('docs 2', docs);
        // 3.更新预约人员自己的课程信息
        col = db.collection('user');
        where = {};
        where.openId = params.openId;
        opr = { $push: {
          class: {
            classId: params.classId,
            courseId: params.courseId,
            status: '已预约',
          },
        } };
        docs = await col.update(where, opr);
        console.log('docs 3', docs);
        db.close();
        return docs;
      }
    }

  }
  return ClassService;

};
