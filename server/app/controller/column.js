const App = require('./app');
const ColumnService = require('../service/column');

class Column extends App {
    async getList(ctx, next) {
        console.log(ctx.query);
        const { pageSize, startIndex} = ctx.query;
        const columnArr = await ColumnService.getCloumn(Number(pageSize), Number(startIndex));
        const result = await ColumnService.getArticleAndColumn(columnArr);
        result.sort((a, b) => -(a.contentUpdateTime - b.contentUpdateTime));
        super.success(ctx, result);
    }
}
module.exports = new Column();
