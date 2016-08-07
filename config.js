// 完整demo地址
// https://github.com/JohnSmith0602/meteor-package-for-qiniu-uploader
// http://developer.qiniu.com/code/v6/sdk/javascript.html
var config = {
    'ak': 'xxxxxxxxxxxxxxxxxx',
    'sk': 'xxxxxxxxxxxxxxxxxx',
    'buckets': []
};
// 生成实例
var qiniu = new QiniuSDK(config);
var bucket = {
    name: 'ironman',
    onUploaded: function() {
        console.log('onupload', arguments);
    },
    callbackBody: 'key=$(key)&bucket=$(bucket)&userId=$(x:userId)'
};
// 添加单个 bucket
qiniu.addBucket(bucket); // 可以获取token了，背后设置了 callbackUrl
// 应用配置
qiniu.init();
