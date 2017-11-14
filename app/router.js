'use strict';

module.exports = app => {
  app.get('/', 'home.index');

    /********************************************************************************
     * EDU API version 1.0
     */
    //微信登录：
    // 1. 小程序前端发来code，请求wx api获取openid，session_key；
    // 2. 根据openid判断是否第一次登录，是则创建user记录；
    // 3. 返回user记录。
    app.get('/api/v1/wxLogin', 'user.wxLogin');
    app.post('/api/v1/listUser', 'user.listUser');




    /*********************************************************************
     * 快速在一个路径上生成 RESTful风格的CRUD 路由结构。
     * app.resources('routerName', 'pathMatch', controller)
     *
     * 示例：
     * Method	Path	Route Name	Controller.Action
     GET	/posts	posts	app.controllers.posts.index
     GET	/posts/new	new_post	app.controllers.posts.new
     GET	/posts/:id	post	app.controllers.posts.show
     ;     GET	/posts/:id/edit	edit_post	app.controllers.posts.edit
     POST	/posts	posts	app.controllers.posts.create
     PUT	/posts/:id	post	app.controllers.posts.update
     DELETE	/posts/:id	post	app.controllers.posts.destroy
     */
    app.resources('user', '/api/v1/user', 'user');
    app.resources('course', '/api/v1/course', 'course');
    app.resources('class', '/api/v1/class', 'class');
    app.resources('teacher','/api/v1/teacher','teacher');
}
