var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');
var ObjectID = require('mongodb').ObjectID;


module.exports = app => {
    class CourseService extends app.Service {

        async findAll(){
            // Connection URL
            const db = await MongoClient.connect(app.config.dbStr);
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
            const db = await MongoClient.connect(app.config.dbStr);
            console.log("连接数据库成功");
            // Get the collection
            var col = db.collection('course');

            console.log("where",id);
            // Get first documents that match the query
            var docs = await col.find({"_id":ObjectID(id.id)}).toArray();
            console.log("连接数据库成功",docs);
            db.close;
            return docs;
        }
    }
    return CourseService;
};
