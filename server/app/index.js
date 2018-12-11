const Koa = require('koa');
const Static = require('koa-static');
const config = require('./config');

const router = require('./router');
const {url} = config.db;

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(url, {useNewUrlParser: true});

const app = new Koa();

// if (process.env.NODE_ENV === 'prod') {
    app.use(Static(__dirname + '/dist'));
// }

app
.use(router.routes())
.use(router.allowedMethods());

app.listen(config.port);
