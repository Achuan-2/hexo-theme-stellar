'use strict';

hexo.extend.filter.register('after_render:html', require('./lib/img_lazyload').processSite);
hexo.extend.filter.register('after_render:html', require('./lib/img_onerror').processSite);

function change_image(data) {
    if (this.theme.config.tag_plugins.image.parse_markdown) {
        // Step 1: 删除所有零宽空格字符
        data.content = data.content.replace(/\u200B/g, '');

        // Step 2: 修改正则表达式，只在行首或前面只有空格和缩进时替换图片链接
        data.content = data.content.replace(
            /^(?:\s*)!\[(.*?)\]\((.*?)\s*(?:"(.*?)")?\)/gm,
            '{% image $2 $3 %}'
        );
    }
    return data;
}



hexo.extend.filter.register('before_post_render', change_image, 9);