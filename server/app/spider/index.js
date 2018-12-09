const request = require('request-promise-native');
const cheerio = require('cheerio');
const https = require('https');
const mongoose = require('mongoose');
const config = require('../config');

const ImageModel = require('../model/columnImage');
const ColumnModel = require('../model/column');
const ContentModel = require('../model/content');

const USER_NAME = 'anran-0423';
const pageSize = config.page.pageSize;
// db start
const {url} = config.db;
mongoose.Promise = global.Promise;

/**
 * 连接mongodb 数据库
 */
const connectMongoDB = () => {
    mongoose.connect(url, {useNewUrlParser: true})
    .catch((err) => {
        console.log(err);
    });
}

/**
 * 获取知乎专栏相关的数据
 * @param offset
 * @param limit
 * @returns {Promise<[any]>}
 */
const exploreColumns = async (offset, limit) => {
    // 获取我offset页开始的 每页limit的专栏数据
    const paramObj = [`offset=${offset}`, `limit=${limit}`].join('&');
    const options = {
        method: 'GET',
        uri: `https://www.zhihu.com/api/v4/members/${USER_NAME}/following-columns?${paramObj}`,
        json: true,
    };
    const rsData = await request(options);
    const promiseArr = rsData.data.map(async (column) => {
        return ColumnModel
        .findOneAndUpdate({id: column.id}, column, {upsert: true, new: true})
        .exec();
        // 存储专栏相关的数据 这里涉及到findOneAndUpdate 与 update 方法的区别
        // https://segmentfault.com/a/1190000009706886,
        // Mongoose: findOneAndUpdate doesn't return updated document
        // https://stackoverflow.com/questions/32811510/mongoose-findoneandupdate-doesnt-return-updated-document
    });
    return Promise.all(promiseArr);
};

/**
 * 获取专栏下文章相关数据
 * @param column
 * @returns {Promise<any>}
 */
const getArticledData = (column) => {
    // 获取专栏里的最新的一篇文章数据
    return new Promise((resolve, reject) => {
        const uri = `https://zhuanlan.zhihu.com/api2/columns/${column.id}/articles`;
        const options = {
            uri,
            json: true,
        };
        request(options)
        .then((res) => {
            // 取每个文章的前3个
            const result = res.data.slice(0, 3).map((arr) => {
                arr.columnId = column.id;
                return arr;
            });
            resolve(result);
        });
    });
};

/**
 * 获取用户一共关注了几个专栏
 * @returns {Promise<any>}
 */
const getPageSize = () => {
    return new Promise((resolve) => {
        // 获取关注的专栏的页码数
        request('https://www.zhihu.com/people/anran-0423/following/columns')
        .then((res) => {
            const $ = cheerio.load(res);
            const jsonData = JSON.parse($('#js-initialData').html());
            const data = jsonData.initialState.entities.users;
            resolve(data[USER_NAME].followingColumnsCount);
        })
        .catch((err) => {
            console.log(err);
        });
    });
};

/**
 * 保存知乎图片到本地数据库
 * @param url
 * @returns {Promise<any>}
 */
const saveImageToLocal = (url) => {
    const checkIsSaved = async (url) => {
        const data = await ImageModel.find({key: url}).exec();
        return !!data;
    };

    return new Promise((resolve, reject) => {
        try {
            if (!url || checkIsSaved(url)) resolve('');
            let data = '';
            https.get(url, (res) => {
                data = `data: ${res.headers['content-type']};base64,`;
                res.setEncoding('base64');
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    ImageModel.create({
                        key: url,
                        value: data,
                    }, (err, res) => {
                        resolve(res);
                    });
                });
            });
        }catch(err) {
            console.log(err);
        }

    });
};

/**
 * 保存知乎专栏下的文章
 * @param articleArr
 * @param column
 * @returns {Promise<[any]>}
 */
const saveArticles = (articleArr, column) => {
    const promiseArr = articleArr.map(async (article) => {
        await saveImageToLocal(column.image_url);
        article.columnId = column._id;
        ContentModel
        .updateOne({id: article.id}, article, {upsert: true})
        .exec();
    });
    return Promise.all(promiseArr);
};

const init = async () => {
    const allNum = await getPageSize();
    const pageCount = Math.ceil(allNum / pageSize);
    let pageArr = Array.from(new Array(pageCount), (val, index) => index);

    connectMongoDB();
    pageArr = pageArr.map(async (cur) => {
        const startPage = cur * pageSize;
        const endPage = cur * pageSize + pageSize;
        const columns = await exploreColumns(startPage, endPage);
        const articleArrs = columns.map(async (column) => {
            const articleArr = await getArticledData(column);
            return saveArticles(articleArr, column);
        });
        return Promise.all(articleArrs);
    });

    Promise.all(pageArr)
    .then(() => {
        console.log('抓取数据成功!');
    })
    .catch((err) => {
        console.log(err);
    });
};

// init();
module.exports = init;
