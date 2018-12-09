class App {
    error(ctx, error) {
        // 参见文档：https://github.com/koajs/koa/blob/master/docs/api/context.md
        // ctx.body 指向 ctx.response.body
        // 所有的失败返回都调用这个方法生成结果
        ctx.body = {
            success: false,
            msg: error
        }
    }

    success(ctx, data) {
        // 所有的成功返回都调用这个方法生成结果
        ctx.body = {
            data,
            success: true,
        }
    }
}

module.exports = App;
