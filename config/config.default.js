'use strict';

module.exports = appInfo => {
  const config =  {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1509867920864_9393';
  config.wx = {
      appid :'wx34eee755317caf43',
      secret : '42de5f9b23d13b0e3aa9b7c686a7f363'}
  config.dbStr = 'mongodb://isoft-info.com:27017/edu-dev'
  // add your config here
  config.middleware = [];
  //暂时关闭csrf安全防范
    config.security = {
        csrf: {
            enable: false,
        },
    };

    config.view={

        mapping: {
            '.tpl': 'nunjucks',
        },
        defaultViewEngine: 'nunjucks',
    };
  return config;
};


