'use strict';

hexo.extend.filter.register('after_render:html', require('./lib/img_lazyload').processSite);
hexo.extend.filter.register('after_render:html', require('./lib/img_onerror').processSite);

function change_image(data) {
    if (this.theme.config.tag_plugins.image.parse_markdown) {
        // 使用正则表达式匹配行首(^)或者任意空白字符(\s*)后跟图片链接的模式
        data.content = data.content.replace(
            /^(?:\s*)!\[(.*?)\]\((.*?)\s*(?:"(.*?)")?\)/gm,
            '{% image $2 $3 %}'
        );
    }
    return data;
}


hexo.extend.filter.register('before_post_render', change_image, 9);