const port = process.env.NODE_ENV === 'prod' ? '8889' : '3000'
module.exports = {
    zhihu: {
        root: 'https://www.zhihu.com'
    },
    port: port,
    db: {
        url: 'mongodb://localhost:27017/zhihu',
    },
    page: {
        pageSize: 20
    }
}
