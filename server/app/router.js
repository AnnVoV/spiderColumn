const Router = require('koa-router');
const column = require('./controller/column');

const router = new Router();
const routerMap = [
    ['get', '/ajax/column/getList', column, 'getList']
];

routerMap.map((route) => {
    const [method, url, controller, action] = route;
    router[method](url, controller[action])
});

module.exports = router;
