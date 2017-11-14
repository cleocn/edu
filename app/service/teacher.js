var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');
var ObjectID = require('mongodb').ObjectID;


module.exports = app => {
    class TeacherService extends app.Service {

        async findAll(){
            // Connection URL
            var db = await MongoClient.connect('mongodb://isoft-info.com:27017/edu-prd');
            console.log("连接数据库成功");
            // Get the collection
            var col = db.collection('teacher');


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
            var col = db.collection('teacher');

            console.log("where",id);
            // Get first documents that match the query
            var docs = await col.find({"_id":ObjectID(id.id)}).toArray();
            console.log("连接数据库成功",docs);
            db.close;
            return docs;
        }
    }
    return TeacherService;
};
