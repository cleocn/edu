var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');


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
                    $inc: {loginCount:1}
                },
                {
                    new: true,
                    upsert: true
                }
            );

            delete rtn.value.session_key;
            rtn.rtn_code = 0;
            db.close;
            return rtn;
        }

        async index(where) {
            // Connection URL
            var db = await MongoClient.connect('mongodb://isoft-info.com:27017/edu-prd');
            console.log("连接数据库成功");
            /// Get the collection
            var col = db.collection('user');
            //
            var docs = await col.find(where).toArray();
            return docs;
        }

        async show(where) {
            // Connection URL
            var db = await MongoClient.connect('mongodb://isoft-info.com:27017/edu-prd');
            console.log("连接数据库成功");
            /// Get the collection
            var col = db.collection('user');
            //
            var docs = await col.find(where).toArray();
            return docs;
        }

        async update() {
            // Connection URL
            var db = await MongoClient.connect('mongodb://isoft-info.com:27017/edu-prd');
            console.log("连接数据库成功");
            /// Get the collection
            var col = db.collection('user');
            //
            var docs = await col.find(where).toArray();
            return docs;
        }
    }

    return UserService;
};
