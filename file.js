ReactiveTemplates.onRendered('attribute.qiniu_file', function() {
    Session.set('uploadProgress' + this.data.name, null);
    Session.set('isUploading' + this.data.name, false);
    Session.set('file' + this.data.name, this.data.value);
});

ReactiveTemplates.events('attribute.qiniu_file', {
    'click .btn-remove': function(event, template) {
        var file = Session.get('file' + template.data.name);
        if (file && file.fileId) {
            orion.filesystem.remove(file.fileId);
        }
        Session.set('file' + template.data.name, null);
    },
});

ReactiveTemplates.helpers('attribute.qiniu_file', {
    progress: function() {
        return Session.get('uploadProgress' + this.name);
    },
    isUploading: function() {
        return Session.get('isUploading' + this.name);
    },
    file: function() {
        return Session.get('file' + this.name);
    }
});

// 为了解决多次上传的问题，因此加了一个div节点包裹，每次都重新init
Template.qiniuAttributesFileUploadInput.onRendered(function() {

    var self = this.data;
    var id = self.atts.id;

    QiniuUploader.init(id, id + '-pickfiles', function(up, files) {
        var upload = orion.filesystem.upload({
            fileList: files,
            name: files[0].name,
            uploader: 'qiniu_file-attribute',
            meta: {
                uploader_id: id
            }
        });

        Session.set('isUploading' + self.name, true);
        Session.set('uploadProgress' + self.name, 0);

        Tracker.autorun(function() {
            if (upload.ready()) {
                if (upload.error) {
                    Session.set('file' + self.name, null);
                    alert(upload.error.reason);
                } else {
                    Session.set('file' + self.name, {
                        fileId: upload.fileId,
                        url: upload.url
                    });
                }
                Session.set('isUploading' + self.name, false);
            }
        });
        Tracker.autorun(function() {
            Session.set('uploadProgress' + self.name, upload.progress());
        });
    });

});
