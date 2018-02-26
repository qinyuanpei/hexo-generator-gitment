var front = require('../hexo-front-matter');
var fs = require('../hexo-fs');

/*
 * Hexo过滤器扩展定义
 */
hexo.extend.filter.register('before_post_render',function(data){
    issueId = loadIssueId(data);
    if(issueId != 'undefined') return data
    var config = hexo.config.issues
    data = initIssues(data,config)
    return data
});

/*
 * 从Markdown文件中加载issueId
 * @param data: 元数据
 */
function loadIssueId(data) {
    var match = data.content.match(/issueId:.*\n/);
    console.log(match)
    if (match) return match[0].split(':')[1].trim();
    return 'undefined';
}

/*
 * 通过Github API为博客初始化Issues
 * @param data：元数据
 */
var logic = require('./lib/logic')
function initIssues(data,config){
    return logic(data,config)
}