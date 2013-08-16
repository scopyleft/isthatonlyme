function slugify(value) {
    var rExps=[{re:/[\xC0-\xC6]/g,ch:'A'},{re:/[\xE0-\xE6]/g,ch:'a'},{re:/[\xC8-\xCB]/g,ch:'E'},{re:/[\xE8-\xEB]/g,ch:'e'},{re:/[\xCC-\xCF]/g,ch:'I'},{re:/[\xEC-\xEF]/g,ch:'i'},{re:/[\xD2-\xD6]/g,ch:'O'},{re:/[\xF2-\xF6]/g,ch:'o'},{re:/[\xD9-\xDC]/g,ch:'U'},{re:/[\xF9-\xFC]/g,ch:'u'},{re:/[\xC7-\xE7]/g,ch:'c'},{re:/[\xD1]/g,ch:'N'},{re:/[\xF1]/g,ch:'n'}];

    for (var i = 0, len = rExps.length; i < len; i++)
        value = value.replace(rExps[i].re, rExps[i].ch);

    return value.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .replace(/\-{2,}/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
};

exports.slugify = slugify;
