var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');


module.exports = app => {
  class UserService extends app.Service {

     async find(where){
         // Connection URL
         var db = await MongoClient.connect('mongodb://isoft-info.com:27017/edu-prd');
         console.log("连接数据库成功");
         // Get the collection
         var col = db.collection('user');

         // Get first two documents that match the query
         var docs = await col.find(where).toArray();
         return docs;
     }


  }
  return UserService;
};
