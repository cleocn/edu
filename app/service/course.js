var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');


module.exports = app => {
    class CourseService extends app.Service {

        async findAll(){
            // Connection URL
            var db = await MongoClient.connect('mongodb://isoft-info.com:27017/edu-prd');
            console.log("连接数据库成功");
            // Get the collection
            var col = db.collection('course');


            // Get first documents that match the query
            var docs = await col.find().toArray();
            db.close;
            return docs;
        }
        async findById(id){
            // Connection URL
            var db = await MongoClient.connect('mongodb://isoft-info.com:27017/edu-prd');
            console.log("连接数据库成功");
            // Get the collection
            var col = db.collection('course');

            console.log("where",id);
            // Get first documents that match the query
            var docs = await col.find(id).toArray();
            console.log("连接数据库成功",docs);
            db.close;
            return docs;
        }
    }
    return CourseService;
};
