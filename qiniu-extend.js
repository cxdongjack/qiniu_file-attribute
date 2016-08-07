// 缓存所有的uploader
QiniuUploader._cache = {};
QiniuUploader.registUploader = function(id, uploader) {
    QiniuUploader._cache[id] = uploader;
};
QiniuUploader.getUploader = function(id) {
    return QiniuUploader._cache[id];
};

// 提供了一个入口函数
QiniuUploader.init = function(id, buttonId, upload) {
    var settings = {
        bucket: 'ironman', // 必选 bucket 名字
        browse_button: buttonId, // 必选 上传按钮的 css id
        domain: 'http://ob8kwkvlk.bkt.clouddn.com', // 可选 bucket 域名，提供下载链接
        bindListeners: { // 上传状态和结果监听
            'FilesAdded': upload,
        }
    };

    var uploader = new QiniuUploader(settings);
    QiniuUploader.registUploader(id, uploader);
    uploader.init();
}
