var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');
var ObjectID = require('mongodb').ObjectID;

// mongodb关于对表的操作参见文档：
//http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html
module.exports = app => {
    class UserService extends app.Service {
        // 1. 小程序发来的code请求wxapi换取openid和session_key；
        // 2. 根据拿到的openid查询user表看是否已经存在，没有则注册；
        // 3. 返回用户ID给小程序；
        async wxLogin(parm) {
            var ctx = this;
            var jscode = parm.code;
            var appid = app.config.wx.appid;
            var secret = app.config.wx.secret;
            var domain = "https://api.weixin.qq.com";
            var url = "/sns/jscode2session?appid=" + appid + "&secret=" + secret + "&js_code=" + jscode + "&grant_type=authorization_code"
            const result = await app.curl(domain + url, {
                dataType: 'json',
            });
            // Connection URL
            var db = await MongoClient.connect(app.config.dbStr);
            console.log("连接数据库成功");
            // Get the collection
            var col = db.collection('user');
            // Get first the documents that match the query
            var where = {};
            where.openid = result.data.openid;
            var update = parm;
                update.openid = result.data.openid;
                update.session_key = result.data.session_key;
            var rtn = await col.findAndModify(
                {openid: where.openid},
                [["openid", 1]],
                {
                    $set: update,
                    $inc: {loginCount:1}//increment 增加 1
                },
                {
                    new: true,   //返回更新后的记录
                    upsert: true //没有则插入
                }
            );

            delete rtn.value.session_key;
            rtn.rtn_code = 0;
            db.close;
            return rtn;
        }


        async findAll() {
            // Connection URL
            var db = await MongoClient.connect(app.config.dbStr);
            console.log("连接数据库成功");
            /// Get the collection
            var col = db.collection('user');
            //
            var docs = await col.find().toArray();
            return docs;
        }

        async findById(id) {
            // Connection URL
            var db = await MongoClient.connect(app.config.dbStr);
            console.log("连接数据库成功");
            // Get the collection
            var col = db.collection('user');
            var docs = await col.find({"_id":ObjectID(id.id)}).toArray();
            return docs;
        }

        async updateById(id,document) {
            // Connection URL
            var db = await MongoClient.connect(app.config.dbStr);
            console.log("连接数据库成功");
            /// Get the collection
            var col = db.collection('user');


            var docs = await col.update({"_id":ObjectID(id.id)},
                {$set:document}, //不能直接用document，否则会将整条记录覆盖为document，使用set操作符，只更新set的字段，没有该字段则创建。
                {upsert:true}); // 没有则插入
            return docs;
        }
    }

    return UserService;
};
