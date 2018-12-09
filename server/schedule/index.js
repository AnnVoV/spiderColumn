const schedule = require('node-schedule');
const spiderTask = require('../app/spider/index.js');

const j = schedule.scheduleJob('*/3 * * * *', function(){
    console.log(`${new Date()} 正在执行`);
    spiderTask();
});
