const url = require('url');
const ColumnModel = require('../model/column');
const ImageModel = require('../model/columnImage');
const ContentModel = require('../model/content');
const COLUMN_LIMIT_COUNT = 3;

module.exports = {
    // 根据页数返回专栏数据
    /**
     * 按照startIndex 为当前为第几页（从0开始），每一页pageSize 个
     * @param pageSize
     * @param startIndex
     * @returns {Promise<void>}
     */
    getCloumn(pageSize = 20, startIndex = 0) {
        // 参考资料：https://segmentfault.com/q/1010000002466535
        // 每次查询limit 条数据，跳过前面skipNum条数据
        // 参考：https://mongoosejs.com/docs/promises.html 调用exec 方法之后才是promise
        const skipNum = startIndex * pageSize;
        const query = ColumnModel
                                .find({})
                                .limit(pageSize)
                                .skip(skipNum);
        return query.exec();
    },
    getArticle(column) {
        const query = ContentModel
                                .find({columnId: column._id})
                                .limit(COLUMN_LIMIT_COUNT)
                                .sort({updated: -1});
        return query.exec();
    },
    async getColumnImage(key) {
        const imageUrl = await ImageModel
                                        .find({key})
                                        .exec();
        return imageUrl;
    },
    async getArticleAndColumn(columnArr) {
        // 拼接专栏内容，专栏的content 增加3篇专栏文章
        const promiseArr = columnArr.map(async (column) => {
            let contentArr = await this.getArticle(column);
            contentArr = await this.wrapContent(contentArr);
            const contentUpdateTime = this.getClosestUpdateTime(contentArr);

            // 【注】https://segmentfault.com/a/1190000011403756
            // 如果不加这个会把其他属性也打印出来
            column = column.toJSON({getters: true});
            return {
                base64Img: url.parse(column.image_url).pathname,
                contentArr,
                contentUpdateTime,
                ...column,
            };
        });
        return await Promise.all(promiseArr);
    },
    judgeIsNew(article) {
        // 判断是否为新素材
        const timeStamp = article.updated * 1000;
        const DAY = 24 * 60 * 60;
        // 只有文章更新时间<20天的才算新文章
        return (Date.now() - timeStamp) < 20 * DAY * 1000;
    },
    wrapContent(contentArr) {
        const res = contentArr.map(async (content) => {
            content = content.toJSON({getters: true});
            content.isNew = this.judgeIsNew(content);
            content.authorImg = url.parse(content.author.avatar_url).pathname; // 作者头像
            content.contentImg = url.parse(content.image_url).pathname; // 文章内容图像
            return content;
        });

        return Promise.all(res);
    },
    getClosestUpdateTime(contentArr) {
        contentArr.sort((a, b) => -(a.updated - b.updated)); // 将内容数组按照updated时间降序排列
        return contentArr[0].updated; // 获取最近更新的一篇内容的时间
    }
};
