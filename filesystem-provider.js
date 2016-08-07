orion.filesystem.providerUpload = function(options, success, failure, progress) {
    var id = options.meta.uploader_id;
    var uploader = QiniuUploader.getUploader(id);

    // success
    uploader.uploader.bind('FileUploaded', function(up, file, info) {
        // 每个文件上传成功后,处理相关的事情
        var domain = up.getOption('domain');
        var res = JSON.parse(info.response);
        var sourceLink = domain + '/' + res.key; //获取上传成功后的文件的Url
        success(sourceLink);
        console.log('上传成功', sourceLink);
    });

    // progress
    uploader.uploader.bind('UploadProgress', function(up, file) {
        Tracker.autorun(function() {
            var percent = file.loaded * 1.0 / file.size * 100;
            if (file) {
                progress(percent);
            }
        });
    });

    // error
    uploader.uploader.bind('Error', function(up, file, info) {
        failure(info);
    });
}

orion.filesystem.providerRemove = function(file, success, failure) {
    // 七牛没有从服务器删除的操作, 因此删除操作总是成功的
    success();
}
