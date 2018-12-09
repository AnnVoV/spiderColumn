const App = require('./app');
const ColumnService = require('../service/column');

class Column extends App {
    async getList(ctx, next) {
        const columnArr = await ColumnService.getCloumn(20, 1)
        const result = await ColumnService.getArticleAndColumn(columnArr);
        super.success(ctx, result);
    }
}
module.exports = new Column();
