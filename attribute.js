orion.attributes.registerAttribute('qiniu_file', {
    template: 'qiniuAttributesFileUpload',
    previewTemplate: 'qiniuAttributesFileUploadColumn',
    getSchema: function(options) {
        var subSchema = new SimpleSchema({
            url: {
                type: String
            },
            fileId: {
                type: String,
                optional: true,
            },
            meta: {
                type: Object,
                blackbox: true,
                optional: true,
            }
        });
        return {
            type: subSchema
        };
    },
    valueOut: function() {
        // this.attr 选择节点属性
        return Session.get('file' + this.attr('data-schema-key'));
    },
});
